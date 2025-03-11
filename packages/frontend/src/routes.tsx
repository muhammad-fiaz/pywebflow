import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { lazy, useEffect, useState } from 'react';
import axios from 'axios';
import App from './App'; // Dynamic component
import { Node, Edge } from '@xyflow/react'; // Import Node and Edge from @xyflow/react

const NotFound = lazy(() => import('./NotFound.tsx'));

interface PageData {
  metadata?: {
    title?: string;
  };
  nodes: Node[];
  edges: Edge[];
}

const useDynamicRoutes = () => {
  const [router, setRouter] = useState<ReturnType<
    typeof createBrowserRouter
  > | null>(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response =
          await axios.get<Record<string, PageData>>('/api/pages');
        const pages = response.data;

        const dynamicRoutes: RouteObject[] = Object.keys(pages).map((path) => ({
          path,
          element: (
            <App
              metadata={pages[path].metadata}
              nodes={pages[path].nodes}
              edges={pages[path].edges}
            />
          ),
        }));

        if (!pages['/']) {
          dynamicRoutes.unshift({ path: '/', element: <NotFound /> });
        }

        const router = createBrowserRouter([
          ...dynamicRoutes,
          { path: '*', element: <NotFound /> },
        ]);
        setRouter(router);
      } catch (error) {
        console.error('Failed to fetch pages', error);
      }
    };

    fetchPages();
  }, []);

  return router;
};

export default useDynamicRoutes;
