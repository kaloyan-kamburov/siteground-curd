import { FC } from "react";
import { useDeleteProductMutation } from "../state/slices/products.slice";

interface Props {
  id: number;
}

const DeleteButton: FC<Props> = ({ id }) => {
  const [deleteProduct] = useDeleteProductMutation();
  return <button onClick={() => deleteProduct(id)}>Delete</button>;
};

export default DeleteButton;
