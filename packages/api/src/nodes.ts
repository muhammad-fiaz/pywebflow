import axios from 'axios';

export const getNodes = async () => {
  const response = await axios.get('/api/nodes');
  return response.data;
};
