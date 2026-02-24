import { ReactNode, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { CrudLayout } from './CrudLayout';

import styles from '../css/EditLayout.module.css';


interface EditLayoutProps {
  children: ReactNode;
  setShowEdit: (state: boolean) => void;
  onSave: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const EditLayout: React.FC<EditLayoutProps> = ({ 
  children, 
  onSave, 
  setShowEdit,
}) => {
  const { t } = useTranslation('components/EditLayout');

  const handleSaveButton = (e: MouseEvent<HTMLButtonElement>) => {
    onSave(e);
    setShowEdit(false);
  };

  const handleExit = () => {
    setShowEdit(false);
  };

  return (
    <CrudLayout
      actionType={t('edit')}
      onExit={handleExit}
      footerActions={
        <button 
          className={styles.editButton} 
          onClick={handleSaveButton}
        >
          {t('editButton')}
        </button>
      }
    >
      {children}
    </CrudLayout>
  );
};
