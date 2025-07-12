import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  const { t } = useTranslation('pages/NotFoundPage');
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.text}>
          { t('notFound') }
        </p>
        <Link to="/" className={styles.link}>
          { t('returnHomepage') }
        </Link>
      </div>
    </div>
  );
}
