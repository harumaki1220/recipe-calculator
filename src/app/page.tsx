'use client';
import { useState } from 'react';
import styles from './page.module.css';

type Recipe = {
  [key: string]: number;
};

const baseRecipe: Recipe = {
  薄力粉: 100,
  砂糖: 50,
  卵: 1,
};

export default function Home() {
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [calculatedRecipe, setCalculatedRecipe] = useState<Recipe>(baseRecipe);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>レシピ計算機</h1>
        <div>
          <label>人数: </label>
          <input
            type="number"
            value={numberOfPeople}
            onChange={(e) => {
              const num = parseInt(e.target.value, 10);
              const newRecipe: Recipe = {};
              if (!isNaN(num) && num > 0) {
                for (const ingredient in baseRecipe) {
                  const baseAmount = baseRecipe[ingredient];
                  const calculatedAmount = baseAmount * num;
                  newRecipe[ingredient] = calculatedAmount;
                }
                setCalculatedRecipe(newRecipe);
                setNumberOfPeople(num);
              } else {
                setCalculatedRecipe(baseRecipe);
                setNumberOfPeople(1);
              }
            }}
            min="1"
          />
          <ul>
            {Object.entries(calculatedRecipe).map(([ingredient, amount]) => (
              <li key={ingredient}>
                {ingredient}: {amount}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
