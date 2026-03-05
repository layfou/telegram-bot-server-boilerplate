import dotenv from "dotenv";
dotenv.config();

const { TOKEN, SERVER_URL, URI } = process.env;
export const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

export function setWebhook() {
  fetch(`${TELEGRAM_API}/setWebhook?url=${SERVER_URL}/${URI}`)
    .then((res) => res.json())
    .then((data) => console.log(data));
}
