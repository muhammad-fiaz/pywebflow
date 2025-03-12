import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import axios from 'axios';
import App from './App'; // Dynamic component
import { Node, Edge } from '@xyflow/react';
import { create } from 'zustand';

const NotFound = lazy(() => import('./NotFound.tsx'));

interface PageData {
  metadata?: {
    title?: string;
  };
  nodes: Node[];
  edges: Edge[];
}

interface PageStore {
  pages: Record<string, PageData>;
  router: ReturnType<typeof createBrowserRouter> | null;
  setPages: (pages: Record<string, PageData>) => void;
  setRouter: (router: ReturnType<typeof createBrowserRouter>) => void;
}

const usePageStore = create<PageStore>((set) => ({
  pages: {},
  router: null,
  setPages: (pages) => set(() => ({ pages })),
  setRouter: (router) => set(() => ({ router })),
}));

const useDynamicRoutes = () => {
  const {router, setPages, setRouter } = usePageStore();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get<Record<string, PageData>>('/api/pages');
        const fetchedPages = response.data;
        setPages(fetchedPages);

        const dynamicRoutes: RouteObject[] = Object.keys(fetchedPages).map((path) => ({
          path,
          element: <App pageData={fetchedPages[path]} />,
        }));

        if (!fetchedPages['/']) {
          dynamicRoutes.unshift({ path: '/', element: <NotFound /> });
        }

        const newRouter = createBrowserRouter([
          ...dynamicRoutes,
          { path: '*', element: <NotFound /> },
        ]);

        setRouter(newRouter);
      } catch (error) {
        console.error('Failed to fetch pages', error);
      }
    };

    fetchPages();
  }, [setPages, setRouter]);

  return router;
};

export default useDynamicRoutes;
