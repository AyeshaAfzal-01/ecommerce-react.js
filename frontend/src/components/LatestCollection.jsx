import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { useState } from "react";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  // getting product data using context api
  const { products } = useContext(ShopContext);
  // getting latest products
  const [latestProduct, setLatestProduct] = useState([]);
  // loading latest products
  useEffect(() => {
    setLatestProduct(products.slice(0, 10)); // get first 10 products from the products array
  }, []);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi culpa
          provident ducimus.{" "}
        </p>
      </div>

      {/* {rendering products} */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct.map((item, index) => {
  return (
    <ProductItem
      key={index}
      id={item._id}
      image={item.image}
      name={item.name}
      price={item.price}
    />
  );
})}

      </div>
    </div>
  );
};

export default LatestCollection;
