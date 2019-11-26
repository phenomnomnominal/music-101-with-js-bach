import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Flow } from 'vexflow';

const StaveWrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 0 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

export function AChromaticPythagoras() {
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
    function getFreqAnnotation(note) {
      return new Flow.Annotation(note).setVerticalJustification(
        Flow.Annotation.VerticalJustify.TOP
      );
    }

    function createNote(note, name, freq) {
      return new Flow.StaveNote({
        clef: 'treble',
        keys: [note],
        duration: '1',
        auto_stem: true
      })
        .addAnnotation(0, getNoteAnnotation(name))
        .addAnnotation(0, getFreqAnnotation(`${freq}Hz`));
    }

    const notes = [
      createNote('a/4', 'A', 440),
      createNote('bb/4', 'Bb', 463.54).addAccidental(
        0,
        new Flow.Accidental('b')
      ),
      createNote('b/4', 'B', 495),
      createNote('c/5', 'C', 521.48),
      createNote('c#/5', 'C#', 556.88).addAccidental(
        0,
        new Flow.Accidental('#')
      ),
      createNote('d/5', 'D', 586.66),
      createNote('eb/5', 'Eb', 618.05).addAccidental(
        0,
        new Flow.Accidental('b')
      ),
      createNote('d#/5', 'D#', 626.48).addAccidental(
        0,
        new Flow.Accidental('#')
      ),
      createNote('e/5', 'E', 660),
      createNote('f/5', 'F', 695.3),
      createNote('f#/5', 'F#', 742.5).addAccidental(
        0,
        new Flow.Accidental('#')
      ),
      createNote('g/5', 'G', 782.22),
      createNote('g#/5', 'G#', 835.31).addAccidental(
        0,
        new Flow.Accidental('#')
      ),
      createNote('a/5', 'A', 880)
    ];

    const N_BEATS = 14;
    const voice = new Flow.Voice({ beat_value: 1, num_beats: N_BEATS });
    voice.addTickables(notes);

    new Flow.Formatter()
      .joinVoices([voice])
      .format([voice], width * (N_BEATS / (N_BEATS + 1)));

    voice.draw(context, stave);
  }, [height, width, container, vf]);

  return <StaveWrapper id="a-chromatic-pythagoras" ref={container} />;
}
