/// <reference types="@fastly/js-compute" />
import indexPage from "./index.html";

// https://github.com/w3ctag/design-reviews/issues/632
// https://web.dev/user-preference-media-features-headers/
fastly.enableDebugLogging(true);
addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  const req = event.request;
  const prefersColorScheme = req.headers.get("Sec-CH-Prefers-Color-Scheme");

  // console.log(prefersColorScheme);

  const url = new URL(req.url);
  const pathname = url.pathname;
  const isCssResource = url.pathname.endsWith('.css'));

  if (url.pathname == "/") {
    return new Response(indexPage, {
      status: 200,
      headers: new Headers({
        "Content-Type": "text/html; charset=utf-8",
        "ACCEPT-CH": "Sec-CH-Prefers-Color-Scheme",
        "CRITICAL-CH": "Sec-CH-Prefers-Color-Scheme",
        VARY: "Sec-CH-Prefers-Color-Scheme",
      }),
    });
  }

  if (isCssResource) {
    const resource = pathname.split(".")[1];
    console.info(`RESOURCE ${resource}`);

    headers.set("Content-Type", "text/css; charset=utf-8");

    return new Response("hello", {
      status: 200,
      headers,
    });
  }
}
