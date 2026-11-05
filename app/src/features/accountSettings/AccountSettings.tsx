import ModuleLayout from '@/components/ui/ts/ModuleLayout';
import BankAccount from './components/BankAccount/BankAccount';
import ChangePassword from './components/ChangePassword/ChangePassword';
import DeleteAccount from './components/DeleteAccount/DeleteAccount';
import PersonDetails from './components/PersonDetails/PersonDetails';

import styles from './AccountSettings.module.css';

const AccountSettings = () => {
  return (
    <ModuleLayout>
      <div className={styles.page}>
        <PersonDetails />
        <BankAccount />
        <ChangePassword />
        <DeleteAccount />
      </div>
    </ModuleLayout>
  );
};

export default AccountSettings;
