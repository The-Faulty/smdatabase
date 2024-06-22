import { PageProps } from "$fresh/server.ts";

export default function App({ Component, state }: PageProps) {
  // do something with state here
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
