import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private url: string; 

  constructor(url: string) {
    this.url = url; 
  }

  connect(accessToken: string): void {
    if (this.socket && this.socket.connected) {
      console.log('Already connected to socket server:', this.url);
      return; 
    }

    // Disconnect existing socket if any
    if (this.socket) {
      this.socket.disconnect();
    }
    console.log('Connecting to socket server:', this.url);
    this.socket = io(`${this.url}/socket`, {
      transports: ["websocket"],
      auth: {
        token: accessToken,
      },
      forceNew: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.onAny((eventName, eventData) => {
      if (eventName !== "pong") {
        console.log(`Event: ${eventName}`, eventData);
      }
    });

    // this.socket.onAnyOutgoing((eventName, eventData) => {
    //   console.log(`Outgoing Event: ${eventName}`, eventData);
    // });

    this.socket.on("connect", () => {
      console.log('Socket connected successfully');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected, reason:', reason);
      
      // Only set socket to null if it's a manual disconnect
      if (reason === 'io client disconnect') {
        this.socket = null;
      } 
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }

  public handleAuthChange(accessToken: string | null): void {
    if (accessToken) {
      this.connect(accessToken);
    } else {
      this.disconnect();
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log('Manually disconnected from socket server');
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  addEventHandler(event: string, handler: (data: any) => void): void {
    if (this.socket) {
      this.socket.on(event, handler);
      // console.log(`Event handler added for event: ${event}`);
    }
  }

  removeEventHandler(event: string, handler: (data: any) => void): void {
    if (this.socket) {
      this.socket.off(event, handler);
      // console.log(`Event handler removed for event: ${event}`);
    }
  }

  emit(event: string, data: any): void {
    if (this.socket) {
      this.socket.emit(event, data);
      // console.log(`Event emitted: ${event}`, data);
    } else {
      console.error('Socket is not connected. Cannot emit event:', event);
    }
  }
}
const url = import.meta.env.VITE_API_ENDPOINT || "https://staging-api.scrooge.casino";
const socketService = new SocketService(url);
export default socketService;