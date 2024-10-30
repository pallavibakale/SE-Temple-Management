import React from "react";

const Footer = () => {
  
  const styles = {
        backgroundColor: "#8f0000",
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        padding: "20px 0",
        bottom: "0",
        width: "100%"
  }

  return (
    <footer className="footer" style={styles}>
      <p>&copy; 2024 Omkaar Temple. All rights reserved.</p>
    </footer>
  );
};

export default Footer;