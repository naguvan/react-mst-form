import "reflect-metadata";

import * as React from "react";
import { render } from "react-dom";

import App from "./layout/views/components/App";

async function main() {
  render(<App />, document.getElementById("root") as HTMLElement);
}

(async () => {
  try {
    await main();
  } catch (ex) {
    // tslint:disable-next-line:no-console
    console.error(ex);
  }
})();
