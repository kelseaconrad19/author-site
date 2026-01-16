const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_PATH = path.join(__dirname, "data", "posts.json");

function readPosts() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/posts", (req, res) => {
  const posts = readPosts();
  res.json(posts);
});

app.get("/api/posts/:slug", (req, res) => {
  const posts = readPosts();
  const post = posts.find((entry) => entry.slug === req.params.slug);

  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.json(post);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Blog API running on http://localhost:${PORT}`);
});
