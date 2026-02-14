import { ReactNode } from 'react';
import { BoxArrowLeft } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

import { EditState } from '@/types/crud';

import styles from './EditLayout.module.css';

interface EditLayoutProps extends EditState {
  children: ReactNode;
  onSave: () => void;
}

export const EditLayout: React.FC<EditLayoutProps> = ({ 
  children, 
  onSave, 
  setShowEdit,
}) => {
  const { t } = useTranslation('components/EditLayout');

  const handleSaveButton = () => {
    onSave();
    setShowEdit(false);
  };

  const handleExit = () => {
    setShowEdit(false);
  };

  return (
    <div className={styles.container}>      
      <header className={styles.header}>
        <span className={styles.headerTitle}>{t('edit')}</span>
        
        <button 
          className={styles.iconBtn} 
          onClick={handleExit} 
          aria-label={t('exit')}
        >
          <BoxArrowLeft size={24} />
        </button>
      </header>

      <main className={styles.content}>{children}</main>

      <footer className={styles.footer}>
        <button 
          className={styles.editButton} 
          onClick={handleSaveButton}
        >
          {t('save')}
        </button>
      </footer>
    </div>
  );
};
