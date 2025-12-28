import React from 'react';
import { motion } from 'framer-motion';
import styles from './Welcome.module.css';

const Welcome = ({ onStart }) => {
  return (
    <motion.div 
      className={styles.welcomeScreen}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Kavya's Grievance Portal 💌
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Where your complaints are heard with love ❤️
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 2 }}
        whileTap={{ scale: 0.9 }}
        onClick={onStart}
        className={styles.startButton}
      >
        Start Filing My Complaint
      </motion.button>
    </motion.div>
  );
};

export default Welcome;
