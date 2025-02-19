'use client';

import React, { useEffect, useState } from 'react';
import { getServerStatus } from '@pywebflow/api/src/status.ts';

const Status: React.FC = () => {
  const [status, setStatus] = useState('Checking...');
  const [isOnline, setIsOnline] = useState(false);

  const checkServerStatus = async () => {
    const serverStatus = await getServerStatus();
    setStatus(serverStatus.message);
    setIsOnline(serverStatus.status === 'online');
  };

  useEffect(() => {
    checkServerStatus(); // Initial check
    const interval = setInterval(checkServerStatus, 5000); // Check every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-lg shadow-md 
                    text-white text-lg font-semibold transition-all duration-500 ease-in-out
                    ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
    >
      {isOnline ? '🟢 Online' : '🔴 Disconnected'} - {status}
    </div>
  );
};

export default Status;
