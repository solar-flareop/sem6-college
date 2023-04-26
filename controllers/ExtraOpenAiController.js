const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//CONTACT EXTRACTOR
const contactExtractorController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      // prompt: `${text}`,// will not work on client
      prompt: `Extract the name and mailing address from this email:\n${text}`,
      temperature: 0.3,
      max_tokens: 800,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    if (data) {
      if (data.choices[0].text) {
        res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: err.message,
    });
  }
};

//CODE EXPLAINER
const codeExplainController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Explain the following code in multiple points:\n${text}`,
      // prompt: `class Log:\n${text}`,
      temperature: 0.5,
      max_tokens: 700,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ['"""'],
    });
    if (data) {
      if (data.choices[0].text) {
        res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: err.message,
    });
  }
};

//SQL GENERATOR
const sqlController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Create sql code to \n${text}`,
      temperature: 0.1,
      max_tokens: 800,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    if (data) {
      if (data.choices[0].text) {
        res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: err.message,
    });
  }
};

//CODE TRANSLATOR
const translateCodeController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Translate code from \n${text}`,
      temperature: 0.1,
      max_tokens: 800,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["###"],
    });
    if (data) {
      if (data.choices[0].text) {
        res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: err.message,
    });
  }
};

//js converter
const javascriptConverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Convert these instructions into javascript code \n${text}`,
      max_tokens: 1000,
      temperature: 0.1,
    });
    if (data) {
      if (data.choices[0].text) {
        res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: err.message,
    });
  }
};

//SIGNATURE DETECT
const signatureController = async (req, res) => {
  try {
    const { photo } = req.body;
    const newPhoto = photo.substring(22);
    const doc_base64 = newPhoto;
    const output_format = "snippets";
    const req_id = uuidv4();
    const resp = await fetch(
      "https://ping.arya.ai/api/v1/signature-detection",
      {
        method: "POST",
        headers: {
          token: process.env.SIGN_API,
          "content-type": "application/json",
        },
        body: JSON.stringify({ output_format, doc_base64, req_id }),
      }
    );
    const data = await resp.json();
    res.status(200).json({
      success: true,
      message: "api success",
      data,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      success: false,
      message: "sign api failed",
      error,
    });
  }
};

module.exports = {
  codeExplainController,
  contactExtractorController,
  translateCodeController,
  sqlController,
  javascriptConverterController,
  signatureController,
};
