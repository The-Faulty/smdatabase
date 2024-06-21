import { Head } from "$fresh/runtime.ts";

export const DefaultHead = () => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="style.css" />
    </Head>
  );
};
