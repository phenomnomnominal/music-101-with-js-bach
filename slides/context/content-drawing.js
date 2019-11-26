import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { update } from '../state';
import { DRAWING } from '../styles.variables';
import { useWindowWidth } from './use-window-width';

const Drawing = styled.canvas`
  position: absolute;
  z-index: ${DRAWING};
`;

export function ContentDrawing() {
  const [width, height] = useWindowWidth();

  const ref = useRef(null);
  useEffect(() => {
    if (ref && ref.current) {
      const canvasEl = ref.current;
      update({ canvas: canvasEl.getContext('2d') });
      canvasEl.width = width;
      canvasEl.height = height;
    }
  }, [width, height]);

  return <Drawing ref={ref}></Drawing>;
}
