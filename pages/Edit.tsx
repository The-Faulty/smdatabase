import { Head, Header } from "./mod.ts";

/* https://developer.digikey.com/products/product-information-v4/productsearch/productdetails */

type PartProps = {
  partNum: string;
};

export const EditPart = ({ partNum }: PartProps) => {
  return (
    <>
      <Head />

      <body>
        <Header />

        <h1>Edit part {partNum}</h1>
        <table>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Location</th>
          </tr>
          <tr>
            <td>Test1</td>
            <td>This is a test item</td>
            <td>100</td>
            <td>Home</td>
            <td>
              <a href="/parts/edit?part=test1">Edit</a>
            </td>
          </tr>
          <form>
            <tr>
              <td>
                <input placeholder={"Item name"} />
              </td>
              <td>
                <input placeholder={"Description"} />
              </td>
              <td>
                <input placeholder={"100"} />
              </td>
              <td>Home</td>
            </tr>
          </form>
        </table>
      </body>
    </>
  );
};
