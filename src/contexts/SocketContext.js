'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // إنشاء اتصال WebSocket
        const socketInstance = io('http://localhost:3001', {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socketInstance.on('connect', () => {
            console.log('✅ Connected to WebSocket server');
            setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
            console.log('❌ Disconnected from WebSocket server');
            setIsConnected(false);
        });

        socketInstance.on('connect_error', (err) => {
            console.error('WebSocket connection error:', err);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
}
