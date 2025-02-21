import axios from 'axios';

export const fetchHtmlContent = async () => {
  try {
    const response = await axios.get('/api/html');
    return response.data.content;
  } catch (error) {
    console.error('Error fetching HTML content:', error);
    return [];
  }
};
