import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import useDynamicRoutes from './routes'; // Import the hook to get the dynamic routes
import Loading from './components/Loading';
import { getServerStatus } from '@pywebflow/api/src/status';

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [serverConnected, setServerConnected] = useState(true);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const router = useDynamicRoutes(); // Use the hook to get the router

  useEffect(() => {
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);

      if (currentProgress >= 80) {
        clearInterval(interval);
        setCheckingStatus(true);
        checkServerStatus();
      }
    }, 50); // 2% every 50ms → Reaches 80% in ~3 seconds

    return () => clearInterval(interval);
  }, []);

  const checkServerStatus = async () => {
    try {
      const status = await getServerStatus();
      if (status.status === 'online') {
        setServerConnected(true);
        setTimeout(() => {
          setProgress(100);
          setTimeout(() => setIsLoading(false), 1000);
        }, 1000);
      } else {
        setServerConnected(false);
        setTimeout(checkServerStatus, 3000); // Retry every 3 seconds
      }
    } catch {
      setServerConnected(false);
      setTimeout(checkServerStatus, 3000);
    }
  };

  if (isLoading || !router) {
    return (
      <Loading
        progress={progress}
        isServerConnected={serverConnected}
        showServerMessage={checkingStatus && !serverConnected}
      />
    );
  }

  return <RouterProvider router={router} />;
}
