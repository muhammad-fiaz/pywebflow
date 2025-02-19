import axios from 'axios';

export interface Metadata {
  title: string;
  description?: string;
  keywords?: string;
  author?: string;
  viewport?: string;
  charset?: string;
  robots?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
}

const getMetadata = async (): Promise<Metadata> => {
  const response = await axios.get<Metadata>('/api/metadata');
  return response.data;
};

export default getMetadata;
