import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useUpdateProductMutation,
  useGetSingleProductQuery,
  clearProductEdit,
} from "../state/slices/products.slice";
import { useFormInput } from "../hooks/useFormInput";

interface Props {
  id: number;
}

const ProductUpdateForm: FC<Props> = ({ id }) => {
  const [updateProduct] = useUpdateProductMutation();
  const { data: product, isLoading } = useGetSingleProductQuery(id);
  const dispatch = useDispatch();

  const { formValue, setInitialValues, onChange } = useFormInput({
    name: "",
    price: 0,
    currency: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, price, currency } = formValue;
    if (product?.id) {
      updateProduct({ id: product?.id, product: { name, price: price, currency } });
    }
  };

  useEffect(() => {
    if (product) {
      setInitialValues({
        name: product.name,
        price: product.price,
        currency: product.currency,
      });
    }
  }, [product]);

  return (
    <div className="modal-mask">
      <div className="modal-content">
        <h2>Update product</h2>
        <br />
        <form onSubmit={onSubmit}>
          <label>
            <span className="label-text">Name: </span>
            <input type="text" name="name" value={formValue.name} onChange={onChange} />
          </label>
          <br />
          <label>
            <span className="label-text">Price: </span>
            <input
              type="number"
              name="price"
              value={formValue.price}
              onChange={onChange}
            />
          </label>
          <br />
          <label>
            <span className="label-text">Currency: </span>
            <input
              type="text"
              name="currency"
              value={formValue.currency}
              onChange={onChange}
            />
          </label>
          <br />
          <button type="submit" disabled={isLoading}>
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch(clearProductEdit());
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdateForm;
