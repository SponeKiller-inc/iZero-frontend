import { ReactNode, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { CrudLayout } from './CrudLayout';

import styles from '../css/DeleteLayout.module.css';


interface DeleteLayoutProps {
  children: ReactNode;
  setShowDelete: (state: boolean) => void;
  onDelete: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const DeleteLayout: React.FC<DeleteLayoutProps> = ({ 
  children, 
  onDelete, 
  setShowDelete,
}) => {
  const { t } = useTranslation('components/DeleteLayout');

  const handleDeleteButton = (e: MouseEvent<HTMLButtonElement>) => {
    onDelete(e);
    setShowDelete(false);
  };

  const handleExit = () => {
    setShowDelete(false);
  };

  return (
    <CrudLayout
      actionType={t('delete')}
      onExit={handleExit}
      footerActions={
        <button 
          className={styles.deleteButton} 
          onClick={handleDeleteButton}
        >
          {t('deleteButton')}
        </button>
      }
    >
      {children}
    </CrudLayout>
  );
};
