// server.js
const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from your current assets directory
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));

// Serve index.html
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
