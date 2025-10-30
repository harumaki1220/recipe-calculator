'use client';
import { useState } from 'react';
import styles from './page.module.css';

type Recipe = {
  [key: string]: { amount: number; unit: string };
};

export default function Home() {
  const [baseRecipe, setBaseRecipe] = useState<Recipe>({
    薄力粉: { amount: 100, unit: 'g' },
    砂糖: { amount: 50, unit: 'g' },
    卵: { amount: 1, unit: '個' },
    塩: { amount: 2, unit: '小さじ' },
  });
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [calculatedRecipe, setCalculatedRecipe] = useState<Recipe>(baseRecipe);
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    amount: 1,
    unit: '',
  });

  const calcRecipe = (base: Recipe, num: number): Recipe => {
    const newRecipe: Recipe = {};
    if (!isNaN(num) && num > 0) {
      for (const ingredient in base) {
        const baseAmount = base[ingredient];
        const calculatedAmount = baseAmount.amount * num;
        newRecipe[ingredient] = { amount: calculatedAmount, unit: baseAmount.unit };
      }
      return newRecipe;
    } else {
      return baseRecipe;
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    if (!isNaN(num) && num > 0) {
      const newRecipe = calcRecipe(baseRecipe, num);
      setCalculatedRecipe(newRecipe);
      setNumberOfPeople(num);
    } else {
      const newRecipe = calcRecipe(baseRecipe, 1);
      setCalculatedRecipe(newRecipe);
      setNumberOfPeople(1);
    }
  };

  const handleAddNewIngredient = () => {
    if (!newIngredient.name) return;
    const newBaseRecipe: Recipe = {
      ...baseRecipe,
      [newIngredient.name]: {
        amount: newIngredient.amount,
        unit: newIngredient.unit,
      },
    };
    setBaseRecipe(newBaseRecipe);
    const newCalculatedRecipe = calcRecipe(newBaseRecipe, numberOfPeople);
    setCalculatedRecipe(newCalculatedRecipe);
    setNewIngredient({ name: '', amount: 1, unit: '' });
  };

  const handleDeleteIngredient = (ingredientName: string) => {
    const newBaseRecipe = { ...baseRecipe };
    delete newBaseRecipe[ingredientName];
    setBaseRecipe(newBaseRecipe);
    const newCalculatedRecipe = calcRecipe(newBaseRecipe, numberOfPeople);
    setCalculatedRecipe(newCalculatedRecipe);
  };

  const formatAmount = (amount: number, unit: string): string => {
    if (unit === '小さじ' && amount >= 3) {
      const oosaji = Math.floor(amount / 3);
      const kosaji = amount % 3;
      if (kosaji === 0) {
        return `大さじ ${oosaji}`;
      } else {
        return `大さじ ${oosaji} 小さじ ${kosaji}`;
      }
    }
    if (unit === '小さじ' || unit === '大さじ') {
      return `${unit} ${amount}`;
    }
    return `${amount} ${unit}`;
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>レシピ計算機</h1>
        <div>
          <label>人数: </label>
          <input type="number" value={numberOfPeople} onChange={handleNumberChange} min="1" />
          <ul>
            {Object.entries(calculatedRecipe).map(([ingredient, { amount, unit }]) => (
              <li key={ingredient}>
                {ingredient}: {formatAmount(amount, unit)}
                <button onClick={() => handleDeleteIngredient(ingredient)}>削除</button>
              </li>
            ))}
          </ul>
          <div>
            <input
              type="text"
              placeholder="材料名"
              value={newIngredient.name}
              onChange={(e) => {
                setNewIngredient({
                  ...newIngredient,
                  name: e.target.value,
                });
              }}
            />
            <input
              type="number"
              placeholder="量"
              value={newIngredient.amount}
              onChange={(e) => {
                setNewIngredient({
                  ...newIngredient,
                  amount: parseInt(e.target.value, 10),
                });
              }}
            />
            <input
              type="text"
              placeholder="単位(g, 個など)"
              value={newIngredient.unit}
              onChange={(e) => {
                setNewIngredient({
                  ...newIngredient,
                  unit: e.target.value,
                });
              }}
            />
            <button onClick={handleAddNewIngredient}>追加</button>
          </div>
        </div>
      </main>
    </div>
  );
}
