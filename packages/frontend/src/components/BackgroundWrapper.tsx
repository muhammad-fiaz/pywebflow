import React from 'react';
import { Background, BackgroundVariant } from '@xyflow/react';

const BackgroundWrapper: React.FC = () => {
  return (
    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
  );
};

export default BackgroundWrapper;