import ProductsComp from "../Components/ProductsComp";
import Title from "../Components/Title";

export default function Products() {
  return (
    <div className="container">
    <Title Title1="Our" Title2="Products"/>
        <ProductsComp/>
    </div>
  )
}
