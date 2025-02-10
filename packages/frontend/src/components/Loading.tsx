'use client';

import React from 'react';
import { Progress } from './ui/progress.tsx';

type LoadingProps = {
  progress: number;
  isServerConnected: boolean;
};

const Loading: React.FC<LoadingProps> = ({ progress, isServerConnected }) => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center">
      <h1 className="text-7xl font-extrabold tracking-wider font-[cursive]">
        PyWebflow
      </h1>

      {/* Loading Progress Bar */}
      <div className="absolute bottom-[20%] w-80 flex flex-col items-center">
        <Progress
          value={progress}
          className="w-full h-4 rounded-full overflow-hidden transition-all duration-500 ease-out"
        />

        {/* Server disconnect message appears below without shifting progress */}
        {!isServerConnected && (
          <p className="mt-2 text-sm text-red-500 font-medium animate-pulse text-center absolute top-full">
            Oh no! It looks like the server is not started... Retrying again.
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;
