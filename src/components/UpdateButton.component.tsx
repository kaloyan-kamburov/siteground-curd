import { FC } from "react";
import { useDispatch } from "react-redux";
import { Product } from "../types/Product.type";

import { setProductEdit } from "../state/slices/products.slice";

interface Props {
  product: Product;
}

const UpdateButton: FC<Props> = (product) => {
  const dispatch = useDispatch();
  return (
    <>
      <button onClick={() => dispatch(setProductEdit(product))}>Update</button>
    </>
  );
};

export default UpdateButton;
