import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import { LoadingPage } from './components/loader.tsx';
import axios from 'axios';

const NotFound = lazy(() => import('./NotFound.tsx'));

const fetchRoutes = async () => {
  try {
    const response = await axios.get('/api/routes'); // Fetch route config from API
    return response.data;
  } catch (error) {
    console.error('Failed to fetch routes', error);
    return [];
  }
};

const DynamicRoutes = () => {
  const [routes, setRoutes] = useState<RouteObject[]>([]);

  useEffect(() => {
    fetchRoutes().then((data) => {
      const mappedRoutes = data.map((route: any) => ({
        path: route.path,
        element: (
          <Suspense fallback={<LoadingPage />}>
            <route.component />
          </Suspense>
        ),
      }));
      setRoutes(mappedRoutes);
    });
  }, []);

  return createBrowserRouter([...routes, { path: '*', element: <NotFound /> }]);
};

const router = DynamicRoutes();
export default router;
