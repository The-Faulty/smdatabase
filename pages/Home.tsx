import { Head, Header } from "./mod.ts";

export const Home = () => {
  return (
    <>
      <Head />

      <body>
        <Header path="home" />

        <h1>Home</h1>
        {/* Add part usage statistics and recent additions */}
      </body>
    </>
  );
};
