'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title} />
        <div>
          <label>人数: </label>
          <input
            type="number"
            value={numberOfPeople}
            onChange={(e) => {
              const num = parseInt(e.target.value, 10);
              if (!isNaN(num) && num > 0) {
                setNumberOfPeople(num);
              } else {
                setNumberOfPeople(1);
              }
            }}
            min="1"
          />
        </div>
      </main>
    </div>
  );
}
