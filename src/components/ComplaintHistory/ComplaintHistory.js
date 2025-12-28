import React from 'react';
import { motion } from 'framer-motion';
import styles from './ComplaintHistory.module.css';

const ComplaintHistory = ({ complaints }) => {
  return (
    <div className={styles.historyContainer}>
      <h2>Complaint History</h2>
      <div className={styles.cardGrid}>
        {complaints.map((complaint, index) => (
          <motion.div
            key={index}
            className={styles.card}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3>{complaint.title}</h3>
            <p className={styles.date}>{complaint.date}</p>
            <p>{complaint.description}</p>
            <div className={styles.cardFooter}>
              <span>Mood: {complaint.mood}</span>
              <span>Status: {complaint.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintHistory;
