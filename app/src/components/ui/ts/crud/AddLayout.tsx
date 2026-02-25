import { ReactNode, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { CrudLayout } from './CrudLayout';

import styles from '@/components/ui/css/crud/AddLayout.module.css';


interface AddLayoutProps {
  children: ReactNode;
  setShowAdd: (state: boolean) => void;
  onAdd: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const AddLayout: React.FC<AddLayoutProps> = ({ 
  children, 
  onAdd, 
  setShowAdd,
}) => {
  const { t } = useTranslation('components/AddLayout');

  const handleAddButton = (e: MouseEvent<HTMLButtonElement>) => {
    onAdd(e);
    setShowAdd(false);
  };

  const handleExit = () => {
    setShowAdd(false);
  };

  return (
    <CrudLayout
      actionType={t('add')}
      onExit={handleExit}
      footerActions={
        <button 
          className={styles.addButton} 
          onClick={handleAddButton}
        >
          {t('addButton')}
        </button>
      }
    >
      {children}
    </CrudLayout>
  );
};
