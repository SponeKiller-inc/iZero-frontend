import { ReactNode } from 'react';
import { BoxArrowLeft } from 'react-bootstrap-icons';

import ModuleLayout from '../ModuleLayout';

import styles from '@/components/ui/css/crud/CrudLayout.module.css';

interface CrudLayoutProps {
  actionType: string;
  children: ReactNode;
  footerActions?: ReactNode;
  onExit: () => void;
}

export const CrudLayout: React.FC<CrudLayoutProps> = ({
  actionType,
  children, 
  footerActions,
  onExit,
}) => {

  return (
    <ModuleLayout>
      <div className={styles.container}>      
        <header className={styles.header}>
          <span className={styles.headerTitle}>{actionType}</span>
          
          <button 
            className={styles.iconBtn} 
            onClick={onExit}
          >
            <BoxArrowLeft size={24} />
          </button>
        </header>

        <main className={styles.content}>{children}</main>

        {footerActions && (
          <footer className={styles.footer}>
            {footerActions}
          </footer>
        )}
      </div>
    </ModuleLayout>
  );
};