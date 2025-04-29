// import { Server } from 'socket.io';

// export const setupWebSocket = (io: Server) => {
//   io.on('connection', (socket) => {
//     console.log('Client connected:', socket.id);

//     socket.on('disconnect', () => {
//       console.log('Client disconnected:', socket.id);
//     });

//     // Add your WebSocket event handlers here
//     socket.on('message', (data) => {
//       console.log('Received message:', data);
//       // Broadcast the message to all connected clients
//       io.emit('message', data);
//     });
//   });
// }; 