const { Server } = require('socket.io');
const http = require('http');

// خادم WebSocket منفصل
const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// تخزين البيانات
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('🔌 New client connected:', socket.id);

    // الانضمام لغرفة
    socket.on('join_room', ({ roomId, user }) => {
        socket.join(roomId);

        if (!rooms.has(roomId)) {
            rooms.set(roomId, {
                participants: [],
                messages: [],
                whiteboard: null
            });
        }

        const room = rooms.get(roomId);
        const existingUserIndex = room.participants.findIndex(p => p.id === user.id);

        if (existingUserIndex === -1) {
            room.participants.push({ ...user, socketId: socket.id, isOnline: true });
        } else {
            room.participants[existingUserIndex].socketId = socket.id;
            room.participants[existingUserIndex].isOnline = true;
        }

        // إرسال تحديث للمشاركين
        io.to(roomId).emit('room_participants', {
            roomId,
            participants: room.participants
        });

        // إخبار المستخدمين الآخرين بالمستخدم الجديد
        socket.to(roomId).emit('user_joined', {
            userId: user.id,
            socketId: socket.id,
            user: user
        });

        console.log(`👤 ${user.name} joined room ${roomId}`);
    });

    // ✅ WebRTC Signaling - إرسال Offer
    socket.on('webrtc_offer', ({ targetSocketId, offer, fromUserId }) => {
        console.log(`📤 Sending offer from ${fromUserId} to ${targetSocketId}`);
        io.to(targetSocketId).emit('webrtc_offer', {
            offer,
            fromSocketId: socket.id,
            fromUserId
        });
    });

    // ✅ WebRTC Signaling - إرسال Answer
    socket.on('webrtc_answer', ({ targetSocketId, answer, fromUserId }) => {
        console.log(`📤 Sending answer from ${fromUserId} to ${targetSocketId}`);
        io.to(targetSocketId).emit('webrtc_answer', {
            answer,
            fromSocketId: socket.id,
            fromUserId
        });
    });

    // ✅ WebRTC Signaling - إرسال ICE Candidate
    socket.on('webrtc_ice_candidate', ({ targetSocketId, candidate, fromUserId }) => {
        console.log(`📤 Sending ICE candidate from ${fromUserId} to ${targetSocketId}`);
        io.to(targetSocketId).emit('webrtc_ice_candidate', {
            candidate,
            fromSocketId: socket.id,
            fromUserId
        });
    });

    // إرسال رسالة
    socket.on('send_message', (message) => {
        const roomId = message.roomId;
        const room = rooms.get(roomId);

        if (room) {
            room.messages.push(message);
            io.to(roomId).emit('new_message', { message });
        }
    });

    // تحديث السبورة
    socket.on('whiteboard_update', (data) => {
        const { roomId, userId, ...updateData } = data;
        const room = rooms.get(roomId);

        if (room) {
            room.whiteboard = updateData;
            // إرسال لجميع المستخدمين عدا المرسل
            socket.to(roomId).emit('whiteboard_update', updateData);
        }
    });

    // تحديث الوسائط
    socket.on('media_update', (data) => {
        const { roomId, userId, type, state } = data;
        // إرسال للمستخدمين الآخرين فقط
        socket.to(roomId).emit('user_media_update', {
            userId,
            type,
            state
        });
    });

    // مغادرة الغرفة
    socket.on('leave_room', ({ roomId, userId }) => {
        const room = rooms.get(roomId);

        if (room) {
            const userIndex = room.participants.findIndex(p => p.id === userId);
            if (userIndex !== -1) {
                room.participants[userIndex].isOnline = false;

                // إرسال تحديث للمشاركين
                io.to(roomId).emit('room_participants', {
                    roomId,
                    participants: room.participants
                });

                // إخبار الآخرين بمغادرة المستخدم
                socket.to(roomId).emit('user_left', { userId });
            }
        }

        socket.leave(roomId);
        console.log(`👋 User ${userId} left room ${roomId}`);
    });

    // قطع الاتصال
    socket.on('disconnect', () => {
        console.log('❌ Client disconnected:', socket.id);

        // تحديث حالة المستخدمين في جميع الغرف
        rooms.forEach((room, roomId) => {
            const userIndex = room.participants.findIndex(p => p.socketId === socket.id);
            if (userIndex !== -1) {
                const userId = room.participants[userIndex].id;
                room.participants[userIndex].isOnline = false;

                io.to(roomId).emit('room_participants', {
                    roomId,
                    participants: room.participants
                });

                // إخبار الآخرين بقطع الاتصال
                io.to(roomId).emit('user_left', { userId });
            }
        });
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`🚀 WebSocket server running on port ${PORT}`);
    console.log(`📡 WebRTC signaling enabled`);
});

module.exports = { io, rooms };
