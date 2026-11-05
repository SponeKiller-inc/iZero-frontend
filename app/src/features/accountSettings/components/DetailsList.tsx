import { Fragment } from 'react';

import styles from './DetailsList.module.css';

/**
 * Read-only list of stored details, a missing value is shown as a dash
 * @param rows - translated label and value of each row
 */
const DetailsList = ({ rows }: {
  rows: { label: string; value: string | null }[];
}) => (
  <dl className={styles.list}>
    {rows.map(({ label, value }) => (
      <Fragment key={label}>
        <dt>{ label }</dt>
        <dd>{ value || '–' }</dd>
      </Fragment>
    ))}
  </dl>
);

export default DetailsList;
