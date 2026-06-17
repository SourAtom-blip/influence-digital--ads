import React, { useState, useEffect, useRef } from 'react';

function parseValue(str) {
  const s = String(str ?? '');
  // Match optional leading non-digits, then a number, then optional trailing non-digits
  const match = s.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { num: null, prefix: '', suffix: s };
  return { num: parseFloat(match[2]), prefix: match[1], suffix: match[3] };
}

export default function CounterNumber({ value, className, duration = 2000 }) {
  const { num, prefix, suffix } = parseValue(value);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (num === null) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  useEffect(() => {
    if (!started || num === null) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, num, duration]);

  if (num === null) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
