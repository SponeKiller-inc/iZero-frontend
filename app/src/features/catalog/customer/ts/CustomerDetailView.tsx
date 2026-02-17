import { useTranslation } from 'react-i18next';

import { Field } from '@/components/ui/ts/Field';
import { DetailViewProps } from '@/types/crud'; 

import styles from '../css/CustomerDetailView..module.css';


export const CustomerDetailView: React.FC<DetailViewProps> = ({ formData, mode, onChange }) => {
    const { t } = useTranslation('pages/catalog/customer');

    return (
      <>
        {/* Personal */}
        <div className={styles.row}>
          <Field 
            label={t('name')} 
            value={formData.name} 
            onChange={onChange} 
            name="name"
            mode={mode}
          />
          <Field 
            label={t('surname')} 
            value={formData.surname} 
            onChange={onChange} 
            name="surname"
            mode={mode}
          />
        </div>

        {/* Identification */}
        <div className={styles.row}>
          <Field 
            label={t('birthday')} 
            value={formData.birthday} 
            onChange={onChange} 
            type="date"
            name="birthday"
            mode={mode}
          />
        </div>

        {/* Contact */}
        <div className={styles.row}>
          <Field 
            label={t('phone')} 
            value={formData.phone} 
            onChange={onChange} 
            type="tel"
            name="phone"
            mode={mode}
          />
          <Field 
            label={t('email')} 
            value={formData.email} 
            onChange={onChange} 
            type="email"
            name="email"
            mode={mode}
          />
        </div>
      </>
  );
};
