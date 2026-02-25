import React, { useState } from 'react';
import { IoAddCircleSharp } from "react-icons/io5";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import ModuleLayout from '../ModuleLayout';
import SearchBar from '../SearchBar';
import { CrudItem, CrudState } from '@/types/crud';

import styles from '@/components/ui/css/crud/Crud.module.css';

interface CrudProps extends CrudState  {
  data: Array<CrudItem>;
}

const Crud: React.FC<CrudProps> = ({
  data,
  onAdd,
  onEdit,
  onDelete,
  onView,
}) => {
  const [results, setResults] = useState<Array<CrudItem>>([{}]);
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
              onClick={() => onAdd()}
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
                onClick={() => onView(row)}
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
                      onEdit(row);
                    }}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className={`${styles.iconButton} ${styles.delete}`}
                    type="button"
                    onClick={(e) =>   {
                      e.stopPropagation();
                      onDelete(row);
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
