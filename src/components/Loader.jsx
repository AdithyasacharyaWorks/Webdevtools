import React, { useEffect } from 'react';
import { dotWave } from 'ldrs';

const DotWaveComponent = () => {
  useEffect(() => {
    dotWave.register();
  }, []);

  return (
    <l-dot-wave
      size="47"
      speed="1"
      color="black"
    ></l-dot-wave>
  );
};

export default DotWaveComponent;