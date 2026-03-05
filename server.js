import express, { text } from "express";
import axios from "axios";
import dotenv from "dotenv";
import { setWebhook, TELEGRAM_API } from "./telegram.js";

dotenv.config();
const { PORT, SERVER_URL, URI } = process.env;
const app = express();
app.use(express.json());

// intercept requests from telegram bot
app.post(URI, (req, res) => {
  // if it is an inline request
  if (req.body.inline_query) {
    const Iquery = req.body.inline_query;
    console.log(Iquery.from.username);
    console.log(Iquery.query);

    // process query
    // get results
    const results = [
      {
        type: "article",
        id: "1",
        title: Iquery.query,
        input_message_content: {
          message_text: Iquery.query,
        },
      },

      {
        type: "article",
        id: "2",
        title: Iquery.query + 168,
        input_message_content: {
          message_text: Iquery.query + 168,
        },
      },
    ];

    // send results
    axios.post(`${TELEGRAM_API}/answerInlineQuery`, {
      inline_query_id: Iquery.id,
      results: results,
    });

    return res.send();
  }

  // if it is a chat request
  if (req.body.message) {
    const { id, first_name, username } = req.body.message.chat;
    const { text } = req.body.message;

    axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: id,
      text: text,
    });

    return res.send();
  }
});

// test server
app.get("/", (req, res) => {
  const response = {
    port: PORT,
    server: SERVER_URL,
  };

  res.send(response);
});

app.post("/", (req, res) => {
  res.send("hello, post!!!");
});

app.listen(PORT, () => {
  setWebhook();
  console.log(`server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
});
