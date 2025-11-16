"use client";

import { useMemo, useState, useEffect } from 'react';
import { generateIdeas, type Idea } from '../lib/generator';

function parseItems(input: string): string[] {
  return input
    .split(/,|\n|\r|\t|\u2022|\u2023|\u25E6|\u2043|\u2219/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function shareUrl(items: string[]): string {
  const url = new URL(typeof window !== 'undefined' ? window.location.href : 'https://example.com');
  url.searchParams.set('items', items.join(','));
  return url.toString();
}

export default function Page() {
  const [input, setInput] = useState('rope, coin, broken DVD player');
  const items = useMemo(() => parseItems(input), [input]);
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const itemsParam = url.searchParams.get('items');
    if (itemsParam) {
      const parsed = parseItems(itemsParam);
      if (parsed.length) setInput(parsed.join(', '));
    }
  }, []);

  useEffect(() => {
    setIdeas(generateIdeas(items));
  }, [items]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl(items));
    alert('Shareable link copied!');
  };

  return (
    <div className="container">
      <div className="header" style={{ marginBottom: 16 }}>
        <h1 className="title">Idea Studio</h1>
      </div>
      <p className="subtitle" style={{ marginTop: 0, marginBottom: 24 }}>
        Creative uses for everyday items. Deterministic results; tweak items to explore.
      </p>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="inputRow">
          <input
            className="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., rope, coin, broken DVD player"
          />
          <button className="button" onClick={() => setIdeas(generateIdeas(items))}>Generate</button>
          <button className="button secondary" onClick={handleCopy}>Share</button>
        </div>
      </div>

      <div className="grid">
        {ideas.map((idea, idx) => (
          <div key={idx} className="card">
            <span className="badge">{idea.category}</span>
            <h3 className="ideaTitle">{idea.title}</h3>
            <p className="ideaDesc">{idea.description}</p>
          </div>
        ))}
      </div>

      <div className="footer">
        Built for prompt: <code>what would you do with a rope, a coin and a broken dvdplayer?</code>
      </div>
    </div>
  );
}
