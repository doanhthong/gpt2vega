const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors');
require('dotenv').config();


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

// openai.apiKey = process.env.OPENAI_API_KEY;

const openaiClient  = new OpenAIApi(configuration);



const app = express();
app.use(bodyParser.json());

app.use(cors());

app.post('/api/generate-chart', async (req, res) => {
  const { prompt } = req.body;

  console.log(prompt);

   // Validate input data
   if (!prompt || typeof prompt !== 'string') {
    res.status(422).json({ error: 'Invalid input data' });
    return;
  }

  try {
    // Generate VegaLite chart data based on user's prompt using GPT
    const chartData = await generateVegaLiteChartData(prompt);
    res.json(chartData);
  } catch (error) {
    console.error('Error generating chart data:', error);
    res.status(500).json({ error: 'An error occurred while generating chart data.' });
  }

});



async function generateVegaLiteChartData(prompt) {
    try {
          // Call GPT-3 API with the provided prompt
        const gptResponse = await openaiClient.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: `Generate a VegaLite chart configuration for the following prompt: ${prompt}`}],
            // messages: [{role: "user", content: "Hello world"}],
            max_tokens: 1000,
            n: 1,
            stop: null,
            temperature: 1.0,
            top_p: 1.0
        });


        // Extract the chart configuration from the GPT-3 response
        const chartConfig = extractVegaLiteConfig(gptResponse.data.choices[0].message.content.trim());

        console.log(gptResponse.data.choices[0].message);


        // // Test Data
        // const gptResponse = "Here's a VegaLite chart configuration for the prompt:\n\n```\n{\n  \"$schema\": \"https://vega.github.io/schema/vega-lite/v5.json\",\n  \"data\": {\"values\": [\n    {\"gender\": \"female\", \"count\": 50},\n    {\"gender\": \"male\", \"count\": 100}\n  ]},\n  \"mark\": \"arc\",\n  \"encoding\": {\n    \"theta\": {\"field\": \"count\", \"type\": \"quantitative\", \"stack\": true},\n    \"color\": {\"field\": \"gender\", \"type\": \"nominal\", \"scale\": {\"range\": [\"#FFB6C1\", \"#FF6347\"]}},\n    \"tooltip\": [{\"field\": \"gender\", \"type\": \"nominal\"}, {\"field\": \"count\", \"type\": \"quantitative\"}]\n  }\n}\n```\n\nThis configuration sets the data to the provided gender and count values, and creates a pie chart with two arcs–one for female and one for male, as specified in the data. The `theta` encoding is used to determine the size of the arcs based on count, using the `stack` option to ensure they add up to 360 degrees. The `color` encoding sets female to `#FFB6C1` (a light pink color) and male to `#FF6347` (a darker red color), as per the request to use warm colors. Finally, `tooltip` is used to display the gender and count for each arc when the user hovers over it";

        // const chartConfig = extractVegaLiteConfig(gptResponse.trim());


        // Parse the chart configuration as JSON
        const chartData = JSON.parse(chartConfig);
        
        

        console.log(chartData);

        return chartData;
        
    } catch (error) {
        console.error('Error generating chart data:', error);
        if (error.response && error.response.data) {
        console.error('Error response body:', error.response.data);
        }
        throw error;    
    }

}

function extractVegaLiteConfig(responseText) {
    const regex = /```([\s\S]*?)```/g;
    const match = regex.exec(responseText);
  
    if (match && match[1]) {
      return match[1].trim();
    } else {
      throw new Error("VegaLite configuration not found in the response");
    }
  }

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
