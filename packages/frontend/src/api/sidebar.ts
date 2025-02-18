import axios from 'axios';

export interface SidebarItem {
  title: string;
  url: string;
  icon: string;
}

export interface SidebarResponse {
  visible: boolean;
  label: string;
  default_open: boolean;
  items: SidebarItem[];
}

export const getSidebarItems = async (): Promise<SidebarResponse> => {
  try {
    const response = await axios.get<SidebarResponse>('/api/sidebar');
    return response.data;
  } catch (error) {
    console.error('Error fetching sidebar items:', error);
    return { visible: false, label: '', default_open: false, items: [] };
  }
};
