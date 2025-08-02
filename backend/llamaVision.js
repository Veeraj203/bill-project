require('dotenv').config();
const axios = require('axios');

async function analyzeBill(base64Image) {
  const resp = await axios.post(
    'https://api.together.xyz/v1/chat/completions',
    {
      model: 'meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo',
      messages: [
        { role: 'system', content: 'You extract receipt items.' },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Extract receipt items as "name - price".' },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 500,
      temperature: 0.0
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return resp.data.choices[0].message.content;
}

module.exports = analyzeBill;
