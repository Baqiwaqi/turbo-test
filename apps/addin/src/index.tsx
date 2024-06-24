import { initializeIcons } from "@fluentui/font-icons-mdl2";
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

/* global document, Office,  */

initializeIcons();

const title = "Contoso Task Pane Add-in";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const render = (Component: typeof App) => {
  createRoot(document.getElementById("container") as HTMLElement).render(
    <React.StrictMode>
      <Component title={title} />
    </React.StrictMode>
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  render(App);
});
