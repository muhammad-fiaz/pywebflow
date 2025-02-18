import axios from 'axios';

export const getConfig = async () => {
  const response = await axios.get('/api/config');
  return response.data;
};
