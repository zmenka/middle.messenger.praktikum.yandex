import { JSDOM } from 'jsdom';

const dom = new JSDOM(
  `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Test</title>
  </head>
  <body>
    <main class="app"></main>
  </body>
</html>
`,
  { url: 'http://localhost/sign-up' }
);

// @ts-expect-error: because of using global
global.window = dom.window;
global.document = dom.window.document;
