/// <reference types="@fastly/js-compute" />
import indexPage from "./index.html";
import baseStyle from "./style.css";
import darkStyle from "./dark.css";
import lightStyle from "./light.css";

// https://github.com/w3ctag/design-reviews/issues/632
// https://web.dev/user-preference-media-features-headers/
fastly.enableDebugLogging(true);
addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  const req = event.request;
  const prefersColorScheme = req.headers.get("Sec-CH-Prefers-Color-Scheme");

  console.log(prefersColorScheme);

  const url = new URL(req.url);
  console.log(url.pathname);

  const headers = new Headers({
    "ACCEPT-CH": "Sec-CH-Prefers-Color-Scheme",
    "CRITICAL-CH": "Sec-CH-Prefers-Color-Scheme",
    VARY: "Sec-CH-Prefers-Color-Scheme",
  });

  if (url.pathname == "/") {
    headers.set("Content-Type", "text/html; charset=utf-8");
    return new Response(indexPage, {
      status: 200,
      headers,
    });
  } else if (url.pathname.endsWith("style.css")) {
    headers.set("Content-Type", "text/css; charset=utf-8");
    return new Response(baseStyle, {
      status: 200,
      headers,
    });
  } else if (url.pathname.endsWith("color-scheme.css")) {
    console.info(`Prefers color scheme: ${prefersColorScheme}`);
    let style = prefersColorScheme == "dark" ? darkStyle : lightStyle;
    headers.set("Content-Type", "text/css; charset=utf-8");
    return new Response(style, {
      status: 200,
      headers,
    });
  }

  // Catch all other requests and return a 404.
  return new Response("The page you requested could not be found", {
    status: 404,
  });
}
