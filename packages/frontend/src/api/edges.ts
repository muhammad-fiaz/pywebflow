import axios from 'axios';

export const getEdges = async () => {
  const response = await axios.get('/api/edges');
  return response.data;
};