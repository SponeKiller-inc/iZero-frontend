import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField } from '@/components/ui/ts/FormFields';
import { getBankLabel } from '@/utils/bankUtils';
import DetailsDialog from '../DetailsDialog';
import DetailsList from '../DetailsList';
import LoadFailed from '../LoadFailed';
import useBankAccount from './hooks/useBankAccount';
import sharedStyles from '../shared.module.css';

const BankAccountDialog = ({ onClose }: {
  onClose: () => void;
}) => {
  const { t } = useTranslation('pages/AccountSettings');
  const banksListId = useId();
  const {
    account,
    catalogue,
    banks,
    form,
    fieldErrors,
    saveStatus,
    isSaving,
    isAdding,
    isFormOpen,
    canSubmit,
    selectedBank,
    handleChange,
    handleBlur,
    handleSubmit,
    startEdit,
    cancelEdit,
  } = useBankAccount();

  const hasFormError = saveStatus !== 'idle' && saveStatus !== 'saving';
  const stored = account.data;

  const getTitle = () => {
    if (isAdding) {
      return t('bankAccount.addTitle');
    }
    return isFormOpen ? t('bankAccount.editTitle') : t('bankAccount.title');
  };

  const renderContent = () => {
    if (account.status === 'loading') {
      return <p>{ t('details.loading') }</p>;
    }

    if (account.status === 'error') {
      return <LoadFailed message={t('details.loadError')} onRetry={account.retry} onCancel={onClose} />;
    }

    if (!isFormOpen && stored) {
      return (
        <>
          <DetailsList
            rows={[
              { label: t('bankAccount.fields.bank'), value: stored.bank.name },
              { label: t('bankAccount.fields.bankCode'), value: stored.bank.code },
              { label: t('bankAccount.fields.ownerName'), value: stored.ownerName },
              { label: t('bankAccount.fields.accountPrefix'), value: Number(stored.accountPrefix) ? stored.accountPrefix : null },
              { label: t('bankAccount.fields.accountNumber'), value: stored.accountNumber },
              { label: t('bankAccount.fields.iban'), value: stored.iban },
            ]}
          />
          <div className={sharedStyles.actions}>
            <button type="button" className={sharedStyles.secondaryBtn} onClick={onClose}>
              { t('details.cancel') }
            </button>
            <button type="button" className={sharedStyles.primaryBtn} onClick={startEdit}>
              { t('details.edit') }
            </button>
          </div>
        </>
      );
    }

    if (catalogue.status === 'loading') {
      return <p>{ t('details.loading') }</p>;
    }

    if (catalogue.status === 'error') {
      return (
        <LoadFailed
          message={t('bankAccount.catalogueError')}
          onRetry={catalogue.retry}
          onCancel={isAdding ? onClose : cancelEdit}
        />
      );
    }

    return (
      <form className={sharedStyles.form} onSubmit={handleSubmit} noValidate>
        {hasFormError && (
          <p className={sharedStyles.error}>
            { t(`bankAccount.errors.${saveStatus}`) }
          </p>
        )}

        <fieldset className={sharedStyles.fieldset} disabled={isSaving}>
          <TextField
            name="bank"
            label={t('bankAccount.fields.bank')}
            value={form.bank}
            list={banksListId}
            error={fieldErrors.bank}
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <datalist id={banksListId}>
            {banks.map((bank) => (
              <option key={bank.id} value={getBankLabel(bank)} />
            ))}
          </datalist>
          <TextField
            name="bankCode"
            label={t('bankAccount.fields.bankCode')}
            value={selectedBank?.code ?? ''}
            readOnly
          />
          <TextField
            name="ownerName"
            label={t('bankAccount.fields.ownerName')}
            value={form.ownerName}
            error={fieldErrors.ownerName}
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            name="accountPrefix"
            label={t('bankAccount.fields.accountPrefix')}
            value={form.accountPrefix}
            inputMode="numeric"
            error={fieldErrors.accountPrefix}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            name="accountNumber"
            label={t('bankAccount.fields.accountNumber')}
            value={form.accountNumber}
            inputMode="numeric"
            error={fieldErrors.accountNumber}
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            name="iban"
            label={t('bankAccount.fields.iban')}
            value={form.iban}
            error={fieldErrors.iban}
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </fieldset>

        <div className={sharedStyles.actions}>
          <button
            type="button"
            className={sharedStyles.secondaryBtn}
            onClick={isAdding ? onClose : cancelEdit}
            disabled={isSaving}
          >
            { t('details.cancel') }
          </button>
          <button type="submit" className={sharedStyles.primaryBtn} disabled={!canSubmit}>
            { isSaving ? t('details.saving') : t('details.save') }
          </button>
        </div>
      </form>
    );
  };

  return (
    <DetailsDialog title={getTitle()} isBusy={isSaving} onClose={onClose}>
      { renderContent() }
    </DetailsDialog>
  );
};

export default BankAccountDialog;
