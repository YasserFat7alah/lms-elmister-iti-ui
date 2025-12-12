import { useEffect, useRef, useState } from 'react';

export function useWebRTC(socket, user, roomId) {
    const [peers, setPeers] = useState({}); // { userId: { connection, stream } }
    const [localStream, setLocalStream] = useState(null);
    const peersRef = useRef({});
    const localStreamRef = useRef(null);

    // إعدادات ICE servers (STUN/TURN)
    const iceServers = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
        ]
    };

    // الحصول على stream المحلي
    useEffect(() => {
        const getLocalStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    },
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true
                    }
                });

                setLocalStream(stream);
                localStreamRef.current = stream;
                console.log('✅ Got local stream:', stream.id);
            } catch (error) {
                console.error('❌ Error getting local stream:', error);
                alert('يرجى السماح بالوصول للكاميرا والميكروفون');
            }
        };

        getLocalStream();

        return () => {
            // تنظيف
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // إنشاء peer connection جديد
    const createPeerConnection = (targetUserId, targetSocketId, isInitiator) => {
        console.log(`🔗 Creating peer connection with ${targetUserId} (initiator: ${isInitiator})`);

        const peerConnection = new RTCPeerConnection(iceServers);

        // إضافة local stream
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => {
                peerConnection.addTrack(track, localStreamRef.current);
            });
        }

        // استقبال remote stream
        peerConnection.ontrack = (event) => {
            console.log(`📺 Received remote track from ${targetUserId}`);
            const remoteStream = event.streams[0];

            setPeers(prev => ({
                ...prev,
                [targetUserId]: {
                    ...prev[targetUserId],
                    stream: remoteStream,
                    connection: peerConnection
                }
            }));

            peersRef.current[targetUserId] = {
                stream: remoteStream,
                connection: peerConnection,
                socketId: targetSocketId
            };
        };

        // ICE candidates
        peerConnection.onicecandidate = (event) => {
            if (event.candidate && socket) {
                console.log(`📤 Sending ICE candidate to ${targetUserId}`);
                socket.emit('webrtc_ice_candidate', {
                    targetSocketId,
                    candidate: event.candidate,
                    fromUserId: user.id
                });
            }
        };

        // حالة الاتصال
        peerConnection.onconnectionstatechange = () => {
            console.log(`🔌 Connection state with ${targetUserId}:`, peerConnection.connectionState);

            if (peerConnection.connectionState === 'disconnected' ||
                peerConnection.connectionState === 'failed') {
                // إعادة المحاولة أو تنظيف
                console.log(`❌ Connection with ${targetUserId} ${peerConnection.connectionState}`);
            }
        };

        return peerConnection;
    };

    // معالجة انضمام مستخدم جديد
    useEffect(() => {
        if (!socket || !user || !localStream) return;

        const handleUserJoined = async ({ userId, socketId, user: joinedUser }) => {
            if (userId === user.id) return; // تجاهل نفسك

            console.log(`👤 User joined: ${joinedUser.name}`);

            // إنشاء peer connection وإرسال offer
            const peerConnection = createPeerConnection(userId, socketId, true);

            try {
                const offer = await peerConnection.createOffer();
                await peerConnection.setLocalDescription(offer);

                console.log(`📤 Sending offer to ${userId}`);
                socket.emit('webrtc_offer', {
                    targetSocketId: socketId,
                    offer: offer,
                    fromUserId: user.id
                });

                peersRef.current[userId] = {
                    connection: peerConnection,
                    socketId: socketId
                };
            } catch (error) {
                console.error('❌ Error creating offer:', error);
            }
        };

        socket.on('user_joined', handleUserJoined);

        return () => {
            socket.off('user_joined', handleUserJoined);
        };
    }, [socket, user, localStream]);

    // معالجة استقبال offer
    useEffect(() => {
        if (!socket || !user || !localStream) return;

        const handleOffer = async ({ offer, fromSocketId, fromUserId }) => {
            console.log(`📥 Received offer from ${fromUserId}`);

            const peerConnection = createPeerConnection(fromUserId, fromSocketId, false);

            try {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);

                console.log(`📤 Sending answer to ${fromUserId}`);
                socket.emit('webrtc_answer', {
                    targetSocketId: fromSocketId,
                    answer: answer,
                    fromUserId: user.id
                });

                peersRef.current[fromUserId] = {
                    connection: peerConnection,
                    socketId: fromSocketId
                };
            } catch (error) {
                console.error('❌ Error handling offer:', error);
            }
        };

        socket.on('webrtc_offer', handleOffer);

        return () => {
            socket.off('webrtc_offer', handleOffer);
        };
    }, [socket, user, localStream]);

    // معالجة استقبال answer
    useEffect(() => {
        if (!socket || !user) return;

        const handleAnswer = async ({ answer, fromSocketId, fromUserId }) => {
            console.log(`📥 Received answer from ${fromUserId}`);

            const peer = peersRef.current[fromUserId];
            if (peer && peer.connection) {
                try {
                    await peer.connection.setRemoteDescription(new RTCSessionDescription(answer));
                } catch (error) {
                    console.error('❌ Error setting remote description:', error);
                }
            }
        };

        socket.on('webrtc_answer', handleAnswer);

        return () => {
            socket.off('webrtc_answer', handleAnswer);
        };
    }, [socket, user]);

    // معالجة استقبال ICE candidates
    useEffect(() => {
        if (!socket || !user) return;

        const handleIceCandidate = async ({ candidate, fromSocketId, fromUserId }) => {
            console.log(`📥 Received ICE candidate from ${fromUserId}`);

            const peer = peersRef.current[fromUserId];
            if (peer && peer.connection) {
                try {
                    await peer.connection.addIceCandidate(new RTCIceCandidate(candidate));
                } catch (error) {
                    console.error('❌ Error adding ICE candidate:', error);
                }
            }
        };

        socket.on('webrtc_ice_candidate', handleIceCandidate);

        return () => {
            socket.off('webrtc_ice_candidate', handleIceCandidate);
        };
    }, [socket, user]);

    // معالجة مغادرة مستخدم
    useEffect(() => {
        if (!socket) return;

        const handleUserLeft = ({ userId }) => {
            console.log(`👋 User left: ${userId}`);

            const peer = peersRef.current[userId];
            if (peer) {
                if (peer.connection) {
                    peer.connection.close();
                }
                delete peersRef.current[userId];

                setPeers(prev => {
                    const newPeers = { ...prev };
                    delete newPeers[userId];
                    return newPeers;
                });
            }
        };

        socket.on('user_left', handleUserLeft);

        return () => {
            socket.off('user_left', handleUserLeft);
        };
    }, [socket]);

    // تنظيف عند الخروج
    useEffect(() => {
        return () => {
            Object.values(peersRef.current).forEach(peer => {
                if (peer.connection) {
                    peer.connection.close();
                }
            });
        };
    }, []);

    return {
        localStream,
        peers,
        peersRef
    };
}
