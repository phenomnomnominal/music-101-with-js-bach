import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Flow } from 'vexflow';

import { useScale } from './context/use-scale';
import * as Notes from './context/notes';

const StaveWrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 0 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  cursor: pointer;
`;

export function AChromaticWell() {
  const toggle = useScale([
    Notes.A3,
    Notes.ASharp3,
    Notes.B3,
    Notes.C4,
    Notes.CSharp4,
    Notes.D4,
    Notes.DSharp4,
    Notes.E4,
    Notes.F4,
    Notes.FSharp4,
    Notes.G4,
    Notes.GSharp4,
    Notes.A4,
    Notes.GSharp4,
    Notes.G4,
    Notes.FSharp4,
    Notes.F4,
    Notes.E4,
    Notes.DSharp4,
    Notes.D4,
    Notes.CSharp4,
    Notes.C4,
    Notes.B3,
    Notes.ASharp3,
    Notes.A3
  ]);

  const width = 1000;
  const height = 125;

  const container = useRef();
  const vf = useRef();

  useEffect(() => {
    if (container.current == null) {
      return;
    }
    if (vf.current == null) {
      vf.current = new Flow.Renderer(
        container.current,
        Flow.Renderer.Backends.SVG
      );
    }

    const renderer = vf.current;
    renderer.resize(width, height);
    const context = renderer.getContext();
    context
      .setFillStyle('white')
      .setStrokeStyle('white')
      .setFont('Arial', 12, '');

    const stave = new Flow.Stave(0, 0, width);
    stave.addClef('treble');

    stave.setContext(context).draw();

    function getWellAnnotation(note) {
      return new Flow.Annotation(note).setVerticalJustification(
        Flow.Annotation.VerticalJustify.TOP
      );
    }
    function getPythAnnotation(note) {
      return new Flow.Annotation(note).setVerticalJustification(
        Flow.Annotation.VerticalJustify.BOTTOM
      );
    }

    function createNote(note, well, pyth) {
      return new Flow.StaveNote({
        clef: 'treble',
        keys: [note],
        duration: '1',
        auto_stem: true
      })
        .addAnnotation(0, getWellAnnotation(`${well}Hz`))
        .addAnnotation(0, getPythAnnotation(`${pyth}Hz`));
    }

    const notes = [
      createNote('a/4', 440, 440),
      createNote('bb/4', 466.16, 463.54).addAccidental(
        0,
        new Flow.Accidental('b')
      ),
      createNote('b/4', 493.88, 495),
      createNote('c/5', 523.25, 521.48),
      createNote('c#/5', 554.36, 556.88).addAccidental(
        0,
        new Flow.Accidental('#')
      ),
      createNote('d/5', 587.33, 586.66),
      createNote('eb/5', 622.25, 618.05).addAccidental(
        0,
        new Flow.Accidental('b')
      ),
      createNote('d#/5', 622.25, 626.48).addAccidental(
        0,
        new Flow.Accidental('#')
      ),
      createNote('e/5', 659.25, 660),
      createNote('f/5', 698.46, 695.3),
      createNote('f#/5', 739.99, 742.5).addAccidental(
        0,
        new Flow.Accidental('#')
      ),
      createNote('g/5', 783.99, 782.22),
      createNote('g#/5', 830.61, 835.31).addAccidental(
        0,
        new Flow.Accidental('#')
      ),
      createNote('a/5', 880, 880)
    ];

    const N_BEATS = 14;
    const voice = new Flow.Voice({ beat_value: 1, num_beats: N_BEATS });
    voice.addTickables(notes);

    new Flow.Formatter()
      .joinVoices([voice])
      .format([voice], width * (N_BEATS / (N_BEATS + 1)));

    voice.draw(context, stave);
  }, [height, width, container, vf]);

  return (
    <StaveWrapper
      id="a-chromatic-well"
      ref={container}
      onClick={() => toggle()}
    />
  );
}
