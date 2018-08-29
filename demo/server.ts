import express from "express";

const app = express();

app.use(express.static("./demo"));

app.listen(3000, "localhost", (err: string) => {
  if (err) {
    console.error(err);
    return;
  }
  console.info("Listening at http://localhost:3000");
});
