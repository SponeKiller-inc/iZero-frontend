import ModuleLayout from '@/components/ui/ts/ModuleLayout';
import ChangePassword from './components/ChangePassword/ChangePassword';
import DeleteAccount from './components/DeleteAccount/DeleteAccount';

import styles from './AccountSettings.module.css';

const AccountSettings = () => {
  return (
    <ModuleLayout>
      <div className={styles.page}>
        <ChangePassword />
        <DeleteAccount />
      </div>
    </ModuleLayout>
  );
};

export default AccountSettings;
