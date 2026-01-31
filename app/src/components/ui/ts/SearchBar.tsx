import { useState, useMemo, useEffect } from 'react';
import Fuse from "fuse.js";

import styles from '../css/SearchBar.module.css'

type SearchBarProps = {
  items: Array<{ [key: string]: string }>;
  onResults: (results: Array<{ [key: string]: string }>) => void;
};

export default function SearchBar({ items, onResults }: SearchBarProps) {
  const [q, setQ] = useState('');

  const keys = Object.keys(items[0]);

  // Make Fuse
  const fuse = useMemo(
    () =>
      new Fuse<{[key: string]: string}>(items, {
        keys: keys,
        threshold: 0.45,
        ignoreLocation: true,
      }),
    [items]
  );


  // Find match or return input array
  const results = useMemo(() => {
    if (!q.trim()) return items;

    return fuse.search(q).map(result => result.item);
  }, [q, fuse, items]);


  // return match
  useEffect(() => {
    onResults(results);
  }, [results, onResults]);

  return (
    <div className={styles.searchBox}>
      <input
        className={styles.searchInput}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
}

