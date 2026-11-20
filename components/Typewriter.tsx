import React, { useEffect, useState } from 'react';
import { prefersReduced } from './motion';

interface Props {
  words: string[];
  className?: string;
  startDelay?: number;
}

/** Escreve e apaga as palavras em loop, com cursor piscando. */
const Typewriter: React.FC<Props> = ({ words, className = '', startDelay = 900 }) => {
  const [text, setText] = useState(prefersReduced() ? words[0] : '');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setIndex(0);
    setDeleting(false);
    setText(prefersReduced() ? words[0] : '');
  }, [words]);

  useEffect(() => {
    if (prefersReduced()) return;
    const t = window.setTimeout(() => setStarted(true), startDelay);
    return () => window.clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || prefersReduced()) return;
    const word = words[index % words.length];
    let delay = deleting ? 45 : 95;
    if (!deleting && text === word) delay = 2200; // pausa com a palavra completa
    if (deleting && text === '') delay = 350;

    const t = window.setTimeout(() => {
      if (!deleting && text === word) return setDeleting(true);
      if (deleting && text === '') {
        setDeleting(false);
        return setIndex((i) => i + 1);
      }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, index, started, words]);

  return (
    <span className={`typewriter ${className}`}>
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden="true">{text}</span>
      <span className="typewriter-caret" aria-hidden="true" />
    </span>
  );
};

export default Typewriter;
