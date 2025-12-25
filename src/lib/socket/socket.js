import { BASE_URL, SOCKET_URL } from "@/constants";
import { io } from "socket.io-client";

let socket;

// Check if we're in production
const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';

export const connectSocket = (token) => {
    // Disable socket connection in production
    if (isProduction) {
        console.warn("Real-time features are disabled in production environment");
        return null;
    }

    if (!socket) {
        const apiUrl = BASE_URL;
        const socketUrl = SOCKET_URL || (apiUrl ? new URL(apiUrl).origin : undefined);
        socket = io(socketUrl, {
            auth: { token },
            transports: ["websocket", "polling"], // Use polling for Vercel compatibility
            path: '/socket.io',
        });
        // Debug logging
        socket.on("connect", () => console.debug("Socket connected to", socketUrl));
        socket.on("connect_error", (err) => console.error("Socket connect_error:", err));
        socket.on("disconnect", (reason) => console.debug("Socket disconnected:", reason));
    }
    return socket;
};

export const getSocket = () => socket;

export const isProductionEnvironment = () => isProduction;
