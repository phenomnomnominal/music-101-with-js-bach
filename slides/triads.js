import React from 'react';
import styled from 'styled-components';

import { useAudio } from './context/use-audio';
import { Button } from './components/button';

const TR = styled.tr`
  padding: 2px;
  background: rgba(0, 0, 0, 0.25);
`;

const TD = styled.td`
  padding: 0 1rem;
  border-bottom: 1px solid gold;
`;

const TRIAD = styled.td`
  padding: 0 1rem;
  border-bottom: 1px solid gold;
  color: gold;
`;

export function Triads() {
  const { audio, analyser } = useAudio();

  function makeTriad(frequency1, frequency2, frequency3) {
    const f1 = audio.createOscillator();
    f1.frequency.value = frequency1;
    const f2 = audio.createOscillator();
    f2.frequency.value = frequency2;
    const f3 = audio.createOscillator();
    f3.frequency.value = frequency3;
    const gain = audio.createGain();
    f1.start(audio.currentTime + 0.1);
    f1.stop(audio.currentTime + 1.1);
    f2.start(audio.currentTime + 0.1);
    f2.stop(audio.currentTime + 1.1);
    f3.start(audio.currentTime + 0.1);
    f3.stop(audio.currentTime + 1.1);
    gain.gain.setValueAtTime(0, audio.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.5, audio.currentTime + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 1.1);
    f1.connect(gain);
    f2.connect(gain);
    f3.connect(gain);
    gain.connect(analyser);
  }

  return (
    <table>
      <tbody>
        <TR>
          <TRIAD>
            <Button onClick={() => makeTriad(261.6256, 329.6276, 391.9954)}>
              Major I
            </Button>
          </TRIAD>
          <TD>C - E - G </TD>
          <TD>261.62Hz</TD>
          <TD>329.62Hz</TD>
          <TD>391.99Hz</TD>
        </TR>
        <TR>
          <TRIAD>
            <Button onClick={() => makeTriad(293.6648, 349.2282, 440.0)}>
              Minor II
            </Button>
          </TRIAD>
          <TD>D - F - A</TD>
          <TD>293.66Hz</TD>
          <TD>349.23Hz</TD>
          <TD>440Hz</TD>
        </TR>
        <TR>
          <TRIAD>
            <Button onClick={() => makeTriad(329.6276, 391.9954, 493.8833)}>
              Minor III
            </Button>
          </TRIAD>
          <TD>E - G - B</TD>
          <TD>329.63Hz</TD>
          <TD>391.99Hz</TD>
          <TD>493.88Hz</TD>
        </TR>
        <TR>
          <TRIAD>
            <Button onClick={() => makeTriad(349.2282, 440, 523.2511)}>
              Major IV
            </Button>
          </TRIAD>
          <TD>F - A - C</TD>
          <TD>349.23Hz</TD>
          <TD>440Hz</TD>
          <TD>523.25Hz</TD>
        </TR>
        <TR>
          <TRIAD>
            <Button onClick={() => makeTriad(391.9954, 493.8833, 587.3295)}>
              Major V
            </Button>
          </TRIAD>
          <TD>G - B - D</TD>
          <TD>391.99Hz</TD>
          <TD>493.88Hz</TD>
          <TD>587.33Hz</TD>
        </TR>
        <TR>
          <TRIAD>
            <Button onClick={() => makeTriad(440, 523.2511, 659.2551)}>
              Minor VI
            </Button>
          </TRIAD>
          <TD>A - C - E</TD>
          <TD>440Hz</TD>
          <TD>523.25Hz</TD>
          <TD>659.25Hz</TD>
        </TR>
        <TR>
          <TRIAD>
            <Button onClick={() => makeTriad(493.8833, 587.3295, 698.4565)}>
              Diminished VII
            </Button>
          </TRIAD>
          <TD>B - D - F</TD>
          <TD>493.88Hz</TD>
          <TD>587.33Hz</TD>
          <TD>698.45Hz</TD>
        </TR>
        <TR>
          <TRIAD>
            <Button onClick={() => makeTriad(523.2511, 659.2551, 783.9909)}>
              Major VIII
            </Button>
          </TRIAD>
          <TD>C - E - G</TD>
          <TD>523.25Hz</TD>
          <TD>659.25Hz</TD>
          <TD>783.99Hz</TD>
        </TR>
      </tbody>
    </table>
  );
}
