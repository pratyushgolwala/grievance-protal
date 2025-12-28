import React from 'react';
import styles from './RewardCenter.module.css';

const RewardCenter = () => {
  const rewards = [
    { item: '1 Ice Cream 🍨', id: 1 },
    { item: '1 Movie Date 🎬', id: 2 },
    { item: '1 Dinner Out 🍝', id: 3 },
  ];

  return (
    <div className={styles.rewardCenter}>
      <h2>Reward Center</h2>
      <p>Things you owe her for being the best girlfriend!</p>
      <ul>
        {rewards.map(reward => (
          <li key={reward.id}>{reward.item}</li>
        ))}
      </ul>
    </div>
  );
};

export default RewardCenter;
