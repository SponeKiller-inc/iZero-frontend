import React, { useState } from 'react';
import { IoAddCircleSharp } from "react-icons/io5";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import ModuleLayout from './ModuleLayout';
import SearchBar from './SearchBar';

import styles from '../css/CrudLayout.module.css';

interface CrudProps {
  header: string[];
  data: Array<string[]>;
}

const CrudLayout: React.FC<CrudProps> = ({ header, data }) => {
  const [results, setResults] = useState<Array<string[]>>([[]]);

  return (
    <ModuleLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <nav className={styles.toolbar}>
            <SearchBar items={data} onResults={setResults}/>
            <button className={`${styles.iconButton} ${styles.add}`} type="button">
              <IoAddCircleSharp />
            </button>
          </nav>

          <div className={styles.headRow}>
            {header.map((element, index) => (
              <div className={styles.headCell} key={index}>{element}</div>
            ))}
          </div>
        </header>


        <main className={styles.main}>
          <ul className={styles.rows}>
            {results.map((row, rIndex) => (
              <li className={styles.row} key={rIndex}>
                <div className={styles.grid}>
                  {row.map((value, cIndex) => (
                    <div className={styles.cell} key={cIndex}>
                      {value}
                    </div>
                  ))}
                </div>
                <div className={styles.actions}>
                  <button
                    className={`${styles.iconButton} ${styles.edit}`}
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className={`${styles.iconButton} ${styles.delete}`}
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BsFillTrash3Fill />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </ModuleLayout>
  );
};

export default CrudLayout;
