import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import Confetti from 'react-confetti';
import styles from './GrievanceForm.module.css';

const GrievanceForm = ({ onComplaintSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mood: '😐',
  });
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const form = useRef();
  const fileInputRef = useRef();

  // EmailJS config (read from environment)
  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_udcqq8s';
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_YOUR_TEMPLATE_ID';
  const USER_ID = process.env.REACT_APP_EMAILJS_USER_ID || process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'user_YOUR_USER_ID';

  useEffect(() => {
    if (USER_ID && !USER_ID.includes('YOUR_USER_ID')) {
      try {
        emailjs.init(USER_ID);
      } catch (err) {
        console.warn('emailjs.init failed', err);
      }
    }
  }, [USER_ID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'description' && value.toLowerCase().includes('forgive')) {
      setEasterEgg(true);
    } else {
      setEasterEgg(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      file,
      name: file.name,
      id: Date.now() + Math.random() // Simple ID generation
    }));
    setAttachedFiles(prev => [...prev, ...newFiles]);
    // Clear the input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (fileId) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // use top-level EmailJS configuration constants

    // Build structured payload for the email template
    const templateParams = {
      title: formData.title,
      description: formData.description,
      mood: formData.mood,
      date: new Date().toLocaleString(),
      attached_files: attachedFiles.map(f => f.name).join(', ') || 'None'
    };

    // If the user hasn't configured template/user IDs, log and show an alert
    if (TEMPLATE_ID.includes('YOUR_TEMPLATE_ID') || USER_ID.includes('YOUR_USER_ID')) {
      console.warn('EmailJS template ID or user ID not set. Set REACT_APP_EMAILJS_TEMPLATE_ID and REACT_APP_EMAILJS_USER_ID in your environment.');
      // Still attempt send with placeholders so devs can replace quickly
    }

    console.log('Sending email with params:', { SERVICE_ID, TEMPLATE_ID, USER_ID, templateParams });

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then((result) => {
          console.log('Email sent:', result && result.text ? result.text : result);
          setIsSending(false);
          setShowSuccess(true);
          setShowConfetti(true);
          onComplaintSubmit({ ...formData, date: templateParams.date, status: 'Pending Apology' });
          setFormData({ title: '', description: '', mood: '😐' });
          setAttachedFiles([]);
          setTimeout(() => {
            setShowSuccess(false);
            setShowConfetti(false);
          }, 5000);
      })
      .catch((error) => {
          // Log as much useful info as possible to help debugging
          console.error('EmailJS error (catch):', error);
          try {
            if (error && typeof error === 'object') {
              console.error('error.status:', error.status);
              console.error('error.text:', error.text);
              console.error('error.statusText:', error.statusText);
              console.error('error.response:', error.response);
            }
          } catch (e) {
            console.error('Error while logging EmailJS error details', e);
          }
          // If EmailJS returned a response body, try to print it
          if (error && error.text) {
            try {
              console.error('Error text (parsed):', JSON.parse(error.text));
            } catch (e) {
              console.error('Error text (raw):', error.text);
            }
          }
          setIsSending(false);
          alert('Failed to send email. Check console for detailed error.');
      });
  };

  return (
    <div className={styles.formContainer}>
      {showConfetti && <Confetti />}
      {easterEgg && <div className={styles.easterEgg}>🤗</div>}
      <button onClick={onBack} className={styles.backButton}>
        ← Back
      </button>
      <motion.form
        ref={form}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.form}
      >
        <h2>File a New Grievance</h2>
        <input
          type="text"
          name="title"
          placeholder="Complaint Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Tell him what he did this time 👀"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <div className={styles.moodSelector}>
          <span>Mood:</span>
          <select name="mood" value={formData.mood} onChange={handleChange}>
            <option>😡</option>
            <option>😐</option>
            <option>😅</option>
            <option>❤️</option>
          </select>
        </div>
        
        <div className={styles.fileUploadSection}>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className={styles.hiddenFileInput}
            accept="image/*,video/*,.pdf,.doc,.docx"
          />
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={styles.fileUploadButton}
          >
            📎 Attach Files
          </button>
          
          {attachedFiles.length > 0 && (
            <div className={styles.attachedFiles}>
              <h4>Attached Files:</h4>
              {attachedFiles.map((attachedFile) => (
                <div key={attachedFile.id} className={styles.attachedFile}>
                  <span className={styles.fileName}>{attachedFile.name}</span>
                  <button 
                    type="button"
                    onClick={() => removeFile(attachedFile.id)}
                    className={styles.removeFileButton}
                    aria-label={`Remove ${attachedFile.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSending}
        >
          {isSending ? 'Sending...' : 'Submit Grievance 💔'}
        </motion.button>
      </motion.form>
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.successMessage}
        >
          Complaint received! Boyfriend under review 🕵️‍♂️💘
        </motion.div>
      )}
    </div>
  );
};

export default GrievanceForm;
