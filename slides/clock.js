import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ClockWrapper = styled.pre`
  color: gold;
`;

export function Clock() {
  const now = new Date();
  const [hours, setHours] = useState(pad(now.getHours()));
  const [minutes, setMinutes] = useState(pad(now.getMinutes()));
  const [seconds, setSeconds] = useState(pad(now.getSeconds()));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = pad(now.getHours());
      const minutes = pad(now.getMinutes());
      const seconds = pad(now.getSeconds());
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <ClockWrapper>
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    </ClockWrapper>
  );
}

function pad(n) {
  return n.toString().padStart(2, '0');
}
