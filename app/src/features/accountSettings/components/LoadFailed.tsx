import { useTranslation } from 'react-i18next';

import sharedStyles from './shared.module.css';

/**
 * Failed loading with an option to try again
 * @param message - translated description of what failed
 * @param onRetry - called when the user wants to try again
 * @param onCancel - called when the user gives up
 */
const LoadFailed = ({ message, onRetry, onCancel }: {
  message: string;
  onRetry: () => void;
  onCancel: () => void;
}) => {
  const { t } = useTranslation('pages/AccountSettings');

  return (
    <>
      <p className={sharedStyles.error}>
        { message }
      </p>
      <div className={sharedStyles.actions}>
        <button type="button" className={sharedStyles.secondaryBtn} onClick={onCancel}>
          { t('details.cancel') }
        </button>
        <button type="button" className={sharedStyles.primaryBtn} onClick={onRetry}>
          { t('details.retry') }
        </button>
      </div>
    </>
  );
};

export default LoadFailed;
