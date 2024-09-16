import React, { useState } from 'react';

type Props = {
  name: string;
  image?: string;
  width?: number;
  height?: number;
};

const AvatarParticipants = (props: Props) => {
  const [error, setError] = useState(false);
  const { name, image, width = 24, height = 24 } = props;
  return (
    <>
      {!error ? (
        <img
          src={image || ''}
          width={width}
          height={height}
          onError={() => {
            setError(true);
          }}
          alt={name}
        />
      ) : (
        <div
          className={`rounded-full border border-blue-100 `}
          style={{
            width: `${width}px`,
            height: `${height}px`
          }}
        />
      )}
    </>
  );
};

export default AvatarParticipants;
