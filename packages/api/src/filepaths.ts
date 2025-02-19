import axios from 'axios';

export const loadAssets = async () => {
  try {
    const response = await axios.get('/api/filepaths');
    return response.data;
  } catch (error) {
    console.error('Error loading assets:', error);
    return {};
  }
};
