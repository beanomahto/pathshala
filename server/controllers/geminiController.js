const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({});

const chat = async (req, res) => {
  try {
    const { question } = req.body;
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: question,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    res.json({ answer: result.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = chat;
