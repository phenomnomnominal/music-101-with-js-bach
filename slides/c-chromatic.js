import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Flow } from 'vexflow';

import { useAudio } from './context/use-audio';
import { useTimer } from './context/use-timer';

const StaveWrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 0 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

export function CChromatic() {
  const { audio, analyser } = useAudio();
  const timerRef = useTimer();

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

    function getAnnotation(note) {
      return new Flow.Annotation(note).setVerticalJustification(
        Flow.Annotation.VerticalJustify.BOTTOM
      );
    }

    function createNote(note, name) {
      return new Flow.StaveNote({
        clef: 'treble',
        keys: [note],
        duration: '1',
        auto_stem: true
      }).addAnnotation(0, getAnnotation(name));
    }

    const notes = [
      createNote('c/4', 'C'),
      createNote('c#/4', 'C#').addAccidental(0, new Flow.Accidental('#')),
      createNote('d/4', 'D'),
      createNote('d#/4', 'D#').addAccidental(0, new Flow.Accidental('#')),
      createNote('e/4', 'E'),
      createNote('f/4', 'F'),
      createNote('f#/4', 'F#').addAccidental(0, new Flow.Accidental('#')),
      createNote('g/4', 'G'),
      createNote('g#/4', 'G#').addAccidental(0, new Flow.Accidental('#')),
      createNote('a/4', 'A'),
      createNote('a#/4', 'A#').addAccidental(0, new Flow.Accidental('#')),
      createNote('b/4', 'B'),
      createNote('c/5', 'C')
    ];

    const N_BEATS = 13;
    const voice = new Flow.Voice({ beat_value: 1, num_beats: N_BEATS });
    voice.addTickables(notes);

    new Flow.Formatter()
      .joinVoices([voice])
      .format([voice], width * (N_BEATS / (N_BEATS + 1)));

    voice.draw(context, stave);
  }, [height, width, container, vf]);

  useEffect(() => {
    const notes = [
      261.6256,
      277.1826,
      293.6648,
      311.127,
      329.6276,
      349.2282,
      369.9944,
      391.9954,
      415.3047,
      440.0,
      466.1638,
      493.8833,
      523.2511,
      493.8833,
      466.1638,
      440.0,
      415.3047,
      391.9954,
      369.9944,
      349.2282,
      329.6276,
      311.127,
      293.6648,
      277.1826
    ];
    const played = [];

    const timer = timerRef.current;
    function metronome(bpm, callback) {
      timer.onmessage = scheduler;
      timer.postMessage('start');

      let nextBeat = audio.currentTime;
      let secondsPerBeat = 60.0 / bpm;
      let nextNote = notes.shift();

      function scheduler() {
        while (nextBeat < audio.currentTime + 0.1) {
          secondsPerBeat = 60.0 / bpm;
          callback(nextBeat, secondsPerBeat, nextNote);
          nextBeat += secondsPerBeat;
          played.push(nextNote);
          if (notes.length === 0) {
            notes.push.apply(notes, played);
            played.length = 0;
          }
          nextNote = notes.shift();
        }
      }
    }

    function beat(time, secondsPerBeat, note) {
      const osc = audio.createOscillator();
      osc.frequency.value = note;
      const gain = audio.createGain();
      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + secondsPerBeat);
      osc.connect(gain);
      gain.connect(analyser);
      osc.start(time);
      osc.stop(time + secondsPerBeat * 2);
    }

    return timer && metronome(120, beat);
  }, [audio, analyser, timerRef]);

  return <StaveWrapper id="c-chromatic" ref={container} />;
}
