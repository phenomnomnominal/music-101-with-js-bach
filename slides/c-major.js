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

export function CMajor() {
  const toggle = useScale([
    Notes.C3,
    Notes.D3,
    Notes.E3,
    Notes.F3,
    Notes.G3,
    Notes.A3,
    Notes.B3,
    Notes.C4,
    Notes.B3,
    Notes.A3,
    Notes.G3,
    Notes.F3,
    Notes.E3,
    Notes.D3,
    Notes.C3
  ]);

  const width = 600;
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

    function createNote(note, annotation) {
      return new Flow.StaveNote({
        clef: 'bass',
        keys: [note],
        duration: '1',
        auto_stem: true
      }).addAnnotation(0, getNoteAnnotation(annotation));
    }

    const notes = [
      createNote('c/3', 'C'),
      createNote('d/3', 'D'),
      createNote('e/3', 'E'),
      createNote('f/3', 'F'),
      createNote('g/3', 'G'),
      createNote('a/3', 'A'),
      createNote('b/3', 'B'),
      createNote('c/4', 'C')
    ];

    const N_BEATS = 8;
    const voice = new Flow.Voice({ beat_value: 1, num_beats: N_BEATS });
    voice.addTickables(notes);

    new Flow.Formatter()
      .joinVoices([voice])
      .format([voice], width * (N_BEATS / (N_BEATS + 1)));

    voice.draw(context, stave);
  }, [height, width, container, vf]);

  return <StaveWrapper id="c-major" ref={container} onClick={() => toggle()} />;
}
