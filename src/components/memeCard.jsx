import React, { useState } from "react";
import { motion } from "framer-motion";
import "./MemeCard.css";

export default function MemeCard({ meme }) {
  const [copied, setCopied] = useState(false);

  if (!meme) return null;

  const handleCopy = () => {
    // Attempt to copy the meme's title (or URL, if you switch to that)
    navigator.clipboard
      .writeText(meme.title)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // Show "Copied!" for 1.5s
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <motion.div
      className="meme-card"
      // Use tap to trigger the copy function
      onTap={handleCopy}
      whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(0,0,0,0.25)" }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <div className="meme-image-container">
        <img
          src={meme.img}
          alt={meme.title}
          loading="lazy" // Add lazy loading for performance
        />
      </div>

      <div className="meme-content">
        {copied ? (
          <h3 className="copied-message">✅ Copied Title!</h3>
        ) : (
          <h3>{meme.title}</h3>
        )}
        <p className="tag">
          #{meme.category.toLowerCase().replace(/\s|\//g, "")}
        </p>
        <span className="copy-hint">Click to Copy</span>
      </div>
    </motion.div>
  );
}
