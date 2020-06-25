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
    Notes.A4,
    Notes.ASharp4,
    Notes.B4,
    Notes.C5,
    Notes.CSharp5,
    Notes.D5,
    Notes.DSharp5,
    Notes.E5,
    Notes.F5,
    Notes.FSharp5,
    Notes.G5,
    Notes.GSharp5,
    Notes.A5,
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

    function getNoteAnnotation(note) {
      return new Flow.Annotation(note).setVerticalJustification(
        Flow.Annotation.VerticalJustify.BOTTOM
      );
    }

    function createNote(note, name) {
      return new Flow.StaveNote({
        clef: 'treble',
        keys: [note],
        duration: '1',
        auto_stem: true,
      }).addAnnotation(0, getNoteAnnotation(name));
    }

    const notes = [
      createNote('a/4', 'A'),
      createNote('a#/4', 'A#').addAccidental(0, new Flow.Accidental('#')),
      createNote('b/4', 'B'),
      createNote('c/5', 'C'),
      createNote('c#/5', 'C#').addAccidental(0, new Flow.Accidental('#')),
      createNote('d/5', 'D'),
      createNote('d#/5', 'D#').addAccidental(0, new Flow.Accidental('#')),
      createNote('e/5', 'E'),
      createNote('f/5', 'F'),
      createNote('f#/5', 'F#').addAccidental(0, new Flow.Accidental('#')),
      createNote('g/5', 'G'),
      createNote('g#/5', 'G#').addAccidental(0, new Flow.Accidental('#')),
      createNote('a/5', 'A'),
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
