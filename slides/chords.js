import React from 'react';
import styled from 'styled-components';

import { useAudio } from './context/use-audio';
import { Button } from './components/button';

import * as Notes from './context/notes';

const TR = styled.tr`
  padding: 2px;
  background: rgba(0, 0, 0, 0.25);
`;

const TD = styled.td`
  padding: 0 1rem;
  border-bottom: 1px solid gold;
`;

const CHORD = styled.td`
  padding: 0 1rem;
  border-bottom: 1px solid gold;
  color: gold;
`;

export function Chords() {
  const { audio, analyser } = useAudio();

  function makeChord(frequency1, frequency2, frequency3, frequency4) {
    const f1 = audio.createOscillator();
    f1.frequency.value = frequency1;
    const f2 = audio.createOscillator();
    f2.frequency.value = frequency2;
    const f3 = audio.createOscillator();
    f3.frequency.value = frequency3;
    const f4 = audio.createOscillator();
    f4.frequency.value = frequency4;
    const gain = audio.createGain();
    f1.start(audio.currentTime + 0.1);
    f1.stop(audio.currentTime + 1.1);
    f2.start(audio.currentTime + 0.1);
    f2.stop(audio.currentTime + 1.1);
    f3.start(audio.currentTime + 0.1);
    f3.stop(audio.currentTime + 1.1);
    f4.start(audio.currentTime + 0.1);
    f4.stop(audio.currentTime + 1.1);
    gain.gain.setValueAtTime(0, audio.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.5, audio.currentTime + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 1.1);
    f1.connect(gain);
    f2.connect(gain);
    f3.connect(gain);
    f4.connect(gain);
    gain.connect(analyser);
  }

  return (
    <table>
      <tbody>
        <TR>
          <CHORD>
            <Button
              onClick={() => makeChord(Notes.C4, Notes.E4, Notes.G4, Notes.C5)}
            >
              C major
            </Button>
          </CHORD>
          <TD>C - E - G - C</TD>
        </TR>
        <TR>
          <CHORD>
            <Button
              onClick={() =>
                makeChord(Notes.C4, Notes.E4, Notes.G4, Notes.BFlat4)
              }
            >
              C Dominant 7
            </Button>
          </CHORD>
          <TD>C - E - G - Bb</TD>
        </TR>
        <TR>
          <CHORD>
            <Button
              onClick={() =>
                makeChord(Notes.C4, Notes.EFlat4, Notes.G4, Notes.BFlat4)
              }
            >
              C Minor 7
            </Button>
          </CHORD>
          <TD>C - Eb - G - Bb</TD>
        </TR>
        <TR>
          <CHORD>
            <Button
              onClick={() =>
                makeChord(Notes.C4, Notes.E4, Notes.GFlat4, Notes.C5)
              }
            >
              C flat 5
            </Button>
          </CHORD>
          <TD>C - E - Gb - C</TD>
        </TR>
      </tbody>
    </table>
  );
}
