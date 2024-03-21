// index.js
const express = require("express");
const OpenAI = require("openai");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
    apiKey: "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"
});

app.get('/getResponse', async (req, res) => {
    try {
        const { message } = req.query;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            messages: [{ "role": "user", "content": message }],
            max_tokens: 100
        });
        
        res.json(response.choices[0].message.content);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
