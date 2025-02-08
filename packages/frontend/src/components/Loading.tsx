import React, { Suspense } from 'react';

// Preload the DotLottieReact module immediately.
const preloadDotLottie = import('@lottiefiles/dotlottie-react');

// Use React.lazy with the preloaded promise.
const DotLottieReact = React.lazy(() =>
  preloadDotLottie.then((mod) => ({ default: mod.DotLottieReact })),
);

const Loading: React.FC = () => {
  return (
    <div className="loading-container flex justify-center items-center h-screen">
      <Suspense fallback={null}>
        <DotLottieReact
          src="/assets/loading.lottie"
          loop
          autoplay
          style={{ width: '200px', height: '200px' }}
        />
      </Suspense>
    </div>
  );
};

export default Loading;
