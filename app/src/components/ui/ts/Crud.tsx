import React, { useState } from 'react';
import { IoAddCircleSharp } from "react-icons/io5";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import ModuleLayout from './ModuleLayout';
import SearchBar from './SearchBar';
import { ViewState, EditState, DeleteState, AddState } from '@/types/crud';

import styles from '../css/Crud.module.css';

interface CrudProps extends ViewState, EditState, DeleteState, AddState {
  data: Array<{ [key: string]: string }>;
}

const Crud: React.FC<CrudProps> = ({
  data,
  setShowAdd,
  setShowEdit,
  setShowDelete,
  setShowView,
}) => {
  const [results, setResults] = useState<Array<{[key: string]: string}>>([{}]);
  const header = Object.keys(data[0]);

  return (
    <ModuleLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <nav className={styles.toolbar}>
            <SearchBar items={data} onResults={setResults}/>
            <button 
              className={`${styles.iconButton} ${styles.add}`} 
              type="button" 
              onClick={() => setShowAdd(true)}
            >
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
              <li 
                className={styles.row}
                key={rIndex}
                onClick={() => {
                  setShowView(true)
                }}
              >
                <div className={styles.grid}>
                  {Object.values(row).map((value, cIndex) => (
                    <div className={styles.cell} key={cIndex}>
                      {value}
                    </div>
                  ))}
                </div>
                <div className={styles.actions}>
                  <button
                    className={`${styles.iconButton} ${styles.edit}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEdit(true);
                    }}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className={`${styles.iconButton} ${styles.delete}`}
                    type="button"
                    onClick={(e) =>   {
                      e.stopPropagation();
                      setShowDelete(true);
                    }}
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

export default Crud;
