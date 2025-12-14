import { io } from "socket.io-client";

let socket;

export const connectSocket = (token) => {
    if (!socket) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || (apiUrl ? new URL(apiUrl).origin : undefined);
        socket = io(socketUrl, {
            auth: { token },
            transports: ["websocket"],
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
