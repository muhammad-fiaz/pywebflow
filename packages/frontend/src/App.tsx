import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes.tsx';
import { LoadingPage } from './components/loader.tsx';

export default function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
