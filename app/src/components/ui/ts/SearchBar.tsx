import { useState, useMemo, useEffect } from 'react';
import Fuse from "fuse.js";

import styles from '../css/SearchBar.module.css'

type SearchBarProps = {
  items: string[][];
  onResults: (results: string[][]) => void;
};

type IndexedRow = {
  row: string[];
  search: string;
};

export default function SearchBar({ items, onResults }: SearchBarProps) {
  const [q, setQ] = useState('');

  // Transform input to object
  const indexed = useMemo<IndexedRow[]>(
    () =>
      items.map(row => ({
        row,
        search: row.join(" ").toLowerCase(),
      })),
    [items]
  );

  // Make Fuse
  const fuse = useMemo(
    () =>
      new Fuse<IndexedRow>(indexed, {
        keys: ["search"],
        threshold: 0.45,
        ignoreLocation: true,
      }),
    [indexed]
  );


  // Find match or return input array
  const results = useMemo(() => {
    if (!q.trim()) return items;

    return fuse.search(q).map(r => r.item.row);
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

