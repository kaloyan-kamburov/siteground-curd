import { useEffect, useState } from "react";
import { useAddProductMutation } from "../state/slices/products.slice";
import { useFormInput } from "../hooks/useFormInput";
import { Product } from "../types/Product.type";
import { useGetPermissionsQuery } from "../state/slices/permissions.slice";

const productInitialValues: Product = {
  name: "",
  price: 0,
  currency: "",
};

const ProductCreateForm = () => {
  const [formVisible, setFormVisible] = useState(false);
  const { formValue, onChange, resetForm } = useFormInput(productInitialValues);
  const [createProduct, { isSuccess, isLoading }] = useAddProductMutation();
  const { data: permissions } = useGetPermissionsQuery();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProduct({
      name: formValue.name,
      price: formValue.price,
      currency: formValue.currency,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setFormVisible(false);
      resetForm();
    }
  }, [isSuccess]);

  return permissions?.includes("CREATE") ? (
    formVisible ? (
      <div className="modal-mask">
        <div className="modal-content">
          <h2>Create product</h2>
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
              disabled={isLoading}
              onClick={() => setFormVisible(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    ) : (
      <button onClick={() => setFormVisible(true)}>Create</button>
    )
  ) : null;
};

export default ProductCreateForm;
