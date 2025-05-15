import { io } from 'socket.io-client';
import { serverUrl } from './client';

const socket = io(serverUrl, {
  transports: ['websocket'], 
});

export default socket;