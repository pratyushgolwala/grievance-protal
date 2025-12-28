import React from 'react';
import { motion } from 'framer-motion';
import styles from './FloatingHearts.module.css';

const FloatingHearts = () => {
  const hearts = Array.from({ length: 20 });

  const heartVariants = {
    initial: {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: 0,
    },
    animate: (i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: [0, 0.8, 0],
      transition: {
        delay: i * 0.2,
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: "easeInOut",
        repeatDelay: 0,
      },
    }),
  };

  return (
    <div className={styles.heartsContainer}>
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className={styles.heart}
          style={{
            fontSize: `${Math.random() * 20 + 10}px`,
          }}
          variants={heartVariants}
          initial="initial"
          animate="animate"
          custom={i}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
