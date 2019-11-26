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

export function AChromatic() {
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
    stave.addClef('bass');

    stave.setContext(context).draw();

    function getNoteAnnotation(note) {
      return new Flow.Annotation(note).setVerticalJustification(
        Flow.Annotation.VerticalJustify.BOTTOM
      );
    }

    function createNote(note, name) {
      return new Flow.StaveNote({
        clef: 'bass',
        keys: [note],
        duration: '1',
        auto_stem: true
      }).addAnnotation(0, getNoteAnnotation(name));
    }

    const notes = [
      createNote('a/2', 'A'),
      createNote('a#/2', 'A#').addAccidental(0, new Flow.Accidental('#')),
      createNote('b/2', 'B'),
      createNote('c/3', 'C'),
      createNote('c#/3', 'C#').addAccidental(0, new Flow.Accidental('#')),
      createNote('d/3', 'D'),
      createNote('d#/3', 'D#').addAccidental(0, new Flow.Accidental('#')),
      createNote('e/3', 'E'),
      createNote('f/3', 'F'),
      createNote('f#/3', 'F#').addAccidental(0, new Flow.Accidental('#')),
      createNote('g/3', 'G'),
      createNote('g#/3', 'G#').addAccidental(0, new Flow.Accidental('#')),
      createNote('a/3', 'A')
    ];

    const N_BEATS = 13;
    const voice = new Flow.Voice({ beat_value: 1, num_beats: N_BEATS });
    voice.addTickables(notes);

    new Flow.Formatter()
      .joinVoices([voice])
      .format([voice], width * (N_BEATS / (N_BEATS + 1)));

    voice.draw(context, stave);
  }, [height, width, container, vf]);

  return (
    <StaveWrapper id="a-chromatic" ref={container} onClick={() => toggle()} />
  );
}
