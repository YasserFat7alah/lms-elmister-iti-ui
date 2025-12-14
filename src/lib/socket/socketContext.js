'use client';
import { BASE_URL, SOCKET_URL } from '@/constants';
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const socketRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    // Only depend on auth/token and user id/role — not on the `socket` state itself
    if (!userInfo?.accessToken) {
      if (socketRef.current) {
        console.log('🔌 Disconnecting socket - no auth token');
        socketRef.current.disconnect();
        socketRef.current = null;
      }

      if (mountedRef.current) {
        setSocket(null);
        setConnected(false);
      }
      return;
    }

    const userId = userInfo.user?.user || userInfo.user?._id;
    const userName = userInfo.user?.name;
    const userRole = userInfo.user?.role;

    console.log('🔌 Initializing socket for user:', {
      userId,
      userName,
      userRole,
      apiUrl: BASE_URL,
      socketUrl: SOCKET_URL
    });

    const apiUrl = BASE_URL;
    const socketUrl = SOCKET_URL || (apiUrl ? new URL(apiUrl).origin : 'http://localhost:5000');

    // If we already have a socket with same token and url, keep it
    if (socketRef.current) {
      try {
        const existingToken = socketRef.current?.auth?.token;
        const existingUrl = socketRef.current?.io?.uri || socketRef.current?.io?.opts?.path;
        if (existingToken === userInfo.accessToken && (existingUrl?.includes(socketUrl) || socketRef.current.connected)) {
          console.log('🔁 Reusing existing socket (no re-init needed).');
          socketRef.current.emit('joinRoom', { role: userRole, userId });
          setSocket(socketRef.current);
          setConnected(socketRef.current.connected);
          return;
        }
      } catch (err) {
        // ignore and create a new one
      }

      socketRef.current.disconnect();
      socketRef.current = null;
      if (mountedRef.current) setSocket(null);
      setConnected(false);
    }

    const newSocket = io(socketUrl, {
      auth: { token: userInfo.accessToken },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      path: '/socket.io'
    });

    socketRef.current = newSocket;

    newSocket.on('connect', () => {
      console.log('✅ Socket connected:', newSocket.id);
      if (mountedRef.current) setConnected(true);
      console.log('📍 Joining room for user:', userId);
      newSocket.emit('joinRoom', { role: userRole, userId });
    });

    newSocket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      if (mountedRef.current) setConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error.message);
      if (mountedRef.current) setConnected(false);
    });

    newSocket.on('errorMessage', (error) => console.error('❌ Socket error message:', error));
    newSocket.on('reconnect', (attemptNumber) => console.log('🔄 Socket reconnected after', attemptNumber, 'attempts'));

    if (mountedRef.current) setSocket(newSocket);

    return () => {
      console.log('🧹 Cleaning up socket connection');
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      if (mountedRef.current) {
        setSocket(null);
        setConnected(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.accessToken, userInfo?.user?._id, userInfo?.user?.role]);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used within SocketProvider');
  return context;
};