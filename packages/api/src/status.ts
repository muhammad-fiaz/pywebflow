import axios from 'axios';

const SERVER_URL = '/api/status';

export interface ServerStatus {
  status: 'online' | 'offline';
  message: string;
}

export const getServerStatus = async (): Promise<ServerStatus> => {
  try {
    const response = await axios.get<{ message: string }>(SERVER_URL, {
      timeout: 3000,
    });
    return { status: 'online', message: response.data.message };
  } catch {
    return { status: 'offline', message: 'Server Disconnected' };
  }
};
