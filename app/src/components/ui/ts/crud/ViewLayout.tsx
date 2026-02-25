import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { CrudLayout } from './CrudLayout';


interface ViewLayoutProps {
  children: ReactNode;
  setShowView: (state: boolean) => void;
}

export const ViewLayout: React.FC<ViewLayoutProps> = ({ 
  children, 
  setShowView,
}) => {
  const { t } = useTranslation('components/ViewLayout');

  const handleExit = () => {
    setShowView(false);
  };

  return (
    <CrudLayout
      actionType={t('view')}
      onExit={handleExit}
    >
      {children}
    </CrudLayout>
  );
};
