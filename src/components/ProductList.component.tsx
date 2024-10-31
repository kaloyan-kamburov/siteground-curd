import { useGetPermissionsQuery } from "../state/slices/permissions.slice";
import { useGetProductsQuery } from "../state/slices/products.slice";
import DeleteButton from "./DeleteButton.component";

import { Product } from "../types/Product.type";
import UpdateButton from "./UpdateButton.component";

const ProductList = () => {
  const { data: permissions } = useGetPermissionsQuery();
  const { data: products = [] } = useGetProductsQuery();

  return permissions?.includes("READ") ? (
    <table cellPadding={5}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Currency</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {(products as Product[]).map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.currency}</td>
            <td>{product.price}</td>
            <td>
              {permissions?.includes("DELETE") && product.id && (
                <DeleteButton id={product.id} />
              )}
              {permissions?.includes("UPDATE") && product.id && (
                <UpdateButton product={product} />
              )}
              {/* {permissions?.includes("DELETE") && <button>Delete</button>} */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>You don't have READ premission</p>
  );
};

export default ProductList;
