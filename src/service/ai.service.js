require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


async function generateCaption(base64ImageFile){

    const interaction = await ai.interactions.create({
        model: "gemini-2.5-flash",

        input: [
            {
                type: "text",
                text: `
                You are an expert in generating captions for image.
                Generate a single short and concise caption.
                Use hashtags and emojis.
                Generate caption in tapori language.
                Create aesthetic caption.
                Make it dark humor.
                `
            },
            {
                type: "image",
                data: base64ImageFile,
                mime_type: "image/jpeg"
            }
        ]
    });

    return interaction.output_text;
}


module.exports = generateCaption;



