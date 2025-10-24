import React from "react";
import { motion } from "framer-motion";

const Card = ({
  children,
  className = "",
  hover = true,
  padding = "p-6",
  ...props
}) => {
  const baseClasses = `card ${padding} ${className}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -5 } : {}}
      transition={{ duration: 0.3 }}
      className={baseClasses}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
