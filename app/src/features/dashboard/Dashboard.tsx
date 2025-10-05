import ModuleLayout from '@/components/ui/ts/ModuleLayout';

import styles from './Dashboard.module.css';

const DashboardPage = () => {
  return (
      <div className={styles.dashboardContent}>
        <section className={styles.dashboardWidgets}>
          <div className={styles.widget}>
            <h2>Welcome Back!</h2>
            <p>Here's a quick overview of your account.</p>
          </div>

          <div className={styles.widget}>
            <h2>Recent Activity</h2>
            <p>No recent activity.</p>
          </div>

          <div className={styles.widget}>
            <h2>Statistics</h2>
            <p>Your stats will appear here.</p>
          </div>
        </section>
      </div>
  );
};

const Dashboard = () => {
  return (
    <ModuleLayout>
      <DashboardPage />
    </ModuleLayout>
  );
};

export default Dashboard;
