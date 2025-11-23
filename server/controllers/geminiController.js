const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const chat = async (req, res) => {
  try {
    const { question } = req.body;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You must always reply in short, fast, compact answers.
Keep it under 2–3 sentences. Avoid long explanations.

User: ${question}`,
            },
          ],
        },
      ],
    });

    res.json({ answer: result.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error in gemini controller" });
  }
};

module.exports = chat;
