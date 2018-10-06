// tslint:disable:no-console

import express from "express";

const app = express();

app.use(express.static("./src"));

app.listen(4000, "localhost", (err: string) => {
  if (err) {
    console.error(err);
    return;
  }
  console.info("Listening at http://localhost:4000");
});
