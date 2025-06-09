import React from 'react';
import { useTranslation } from 'react-i18next';
import { BoxArrowLeft } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import { GoogleButton } from '@/components/ui/ts/GoogleButton';
import { useHandlers } from './hooks/useHandlers';
import styles from './Registration.module.css';

const Registration: React.FC = () => {
  const { t } = useTranslation('pages/Registration');
  const { formData, errorMessage, message, handleChange, handleSubmit } = useHandlers({
    email: '',
    password: '',
  });

  return (
    <div className={styles.registrationPage}>
      <div className={styles.logoWrapper}>
        <Link to='/' className={styles.logoLink}>
          <img src='iZero-logo.png' width='100' alt='Project Zero logo' />
        </Link>
      </div>

      <div className={styles.formContainer}>
        <Link to='/' className={styles.exitIcon}>
          <BoxArrowLeft className={styles.exitSvg} />
        </Link>

        <form onSubmit={handleSubmit} className={styles.registrationForm}>
          <h2 className={styles.formTitle}>{ t('title') }</h2>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              { t('email') }
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={ t('emailHelp') }
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              { t('password') }
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={ t('passwordHelp') }
              required
              className={styles.formInput}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            { t('signUp') }
          </button>
           <p className={styles.orText}>OR</p>
          <GoogleButton />
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          {message && <p className={styles.successMessage}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Registration;
