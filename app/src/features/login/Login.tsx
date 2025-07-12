import React from 'react';
import { useTranslation } from 'react-i18next';
import { BoxArrowLeft } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import { GoogleButton } from '@/components/ui/ts/GoogleButton';
import { useHandlersLocal } from './hooks/useHandlersLocal';
import { useHandlersGoogle } from './hooks/useHandlersGoogle';
import { LoginService } from './services/loginService';
import { LocalStorageService } from '@/services/localStorage';

import styles from './Login.module.css';

const Login: React.FC = () => {
  const { t } = useTranslation('pages/Login');
  const storageService = new LocalStorageService()
  const loginService = new LoginService(storageService)
  const localHandlers = useHandlersLocal(loginService, {
    username: '',
    password: '',
  });
  const googleHandlers = useHandlersGoogle(loginService, '')

  return (
    <div className={styles.loginPage}>
      <div className={styles.logoWrapper}>
        <Link to='/' className={styles.logoLink}>
          <img src='iZero-logo.png' width='100' alt='Project Zero logo' />
        </Link>
      </div>

      <div className={styles.formContainer}>
        <Link to='/' className={styles.exitIcon}>
          <BoxArrowLeft className={styles.exitSvg} />
        </Link>

        <form onSubmit={localHandlers.handleSubmit} className={styles.loginForm}>
          <h2 className={styles.formTitle}>{ t('title') }</h2>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              { t('email') }
            </label>
            <input
              type="email"
              id="email"
              name="username"
              value={localHandlers.formData.username}
              onChange={localHandlers.handleChange}
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
              value={localHandlers.formData.password}
              onChange={localHandlers.handleChange}
              placeholder={ t('passwordHelp') }
              required
              className={styles.formInput}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            { t('signin') }
          </button>

          {/* Login via Google */}

          <p className={styles.orText}>{ t('or') }</p>
          <GoogleButton onRegister={googleHandlers.handleSubmit} mode='login'/>

          {/* Local Messages */}
          {
            localHandlers.errorMessage && (
              <p className={styles.errorMessage}>
                {localHandlers.errorMessage}
              </p>
            )
          }
          {
            localHandlers.message && (
              <p className={styles.successMessage}>
                {localHandlers.message}
              </p>
            )
          }

          {/* Google Messages */}
          {
            googleHandlers.errorMessage && (
              <p className={styles.errorMessage}>
                {localHandlers.errorMessage}
              </p>
            )
          }
          {
            googleHandlers.message && (
              <p className={styles.successMessage}>
                {localHandlers.message}
              </p>
            )
          }
        </form>
      </div>
    </div>
  );
};

export default Login;
