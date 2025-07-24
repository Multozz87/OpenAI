import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = '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'; // вставь сюда свой ключ

app.post('/proxy', async (req, res) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка прокси' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy запущен на порту ${PORT}`));
