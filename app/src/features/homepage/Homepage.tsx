import { FC } from "react";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from "./Homepage.module.css";
import Navbar from "@/components/ui/ts/Navbar";
import Footer from "@/components/ui/ts/Footer";

const Homepage: FC = () => {
  const { t } = useTranslation('pages/Homepage');

  return (
    <div className={styles.container}>
        <Navbar />
      <div className={styles.homepage}>
      
        <header className={styles.heroSection}>
          <h1>{ t('hero.title') }</h1>
          <p>{ t('hero.subtitle') }</p>
          <Link to="/register" className={styles.ctaButton}>
            { t('hero.ctaButton') }
          </Link>
        </header>

        <section id="features" className={styles.features}>
          <h2>{ t('sections.title') }</h2>
          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <h3>{ t('sections.section1.subtitle') }</h3>
              <p>{ t('sections.section1.description') }</p>
            </div>
            <div className={styles.featureItem}>
              <h3>{ t('sections.section2.subtitle') }</h3>
              <p>{ t('sections.section2.description') }</p>
            </div>
            <div className={styles.featureItem}>
              <h3>{ t('sections.section3.subtitle') }</h3>
              <p>{ t('sections.section3.description') }</p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
