import { useSelector } from "react-redux";
import ProductCreateForm from "./components/ProductCreateForm.component";
import ProductList from "./components/ProductList.component";
import ProductUpdateForm from "./components/ProductUpdateForm.component";

import { selectProductEdit } from "./state/slices/products.slice";
import { selectErrorMessage } from "./state/slices/error.slice";

function App() {
  const errorMessage = useSelector(selectErrorMessage);
  const productEdit = useSelector(selectProductEdit);
  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}
      <ProductList />
      <ProductCreateForm />
      {productEdit?.id && <ProductUpdateForm id={productEdit.id} />}
    </>
  );
}

export default App;
