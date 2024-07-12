import express from "express";
import helmet from "helmet";
import path from 'path'

const app = express();

// Use Helmet!
app.use(helmet());

app.get("*", (req, res) => {
  const reqPath = req.path;
  const root = path.join(import.meta.dirname, './static')
  const filePath = req.path.endsWith('devtools-detector.js') ? path.join(root, '../../../lib/devtools-detector.js') : path.join(root, reqPath)

  console.log(root, reqPath, filePath)

  res.sendFile(filePath);
});

app.listen(8001);
