import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const URL = import.meta.env.VITE_REACT_DBURL;

const ProductOverview = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [userProductList, setUserProductList] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditable(true);
  };
  const handleBackClick = () => {
    setIsEditable(false);
  };
  const handleDoneClick = () => {
    setIsEditable(false);
  };
  const handleDeleteClick = () => {
    setIsEditable(false);
  };

  const loadData = async () => {
    let res = await axios.post(
      `${URL}/product/getbyid`,
      {
        id: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.success == true) {
      setProduct(res.data.product);
      setUserProductList(res.data.user);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {product ? (
        <div>
          <div className="max-w-4xl mx-auto max-[468px]:mx-4 max-[468px]:mt-16 bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl max-[1024px]:mx-4 mt-10">
            <div className="md:flex">
              <div className="">
                <img
                  className="h-full :h-52 w-full object-cover md:w-72"
                  src="https://cdn.shopify.com/s/files/1/0070/7032/files/how_20to_20start_20a_20clothing_20brand.png?v=1693935729"
                  alt="Picture"
                />
              </div>
              <div className="p-8 grid grid-rows-2">
                <div className="uppercase tracking-wide text-lg text-indigo-500 font-extrabold">
                  {product.name}
                </div>
                <p className="mt-2 text-gray-500">
                  Supplier : {product.supplier.name}
                </p>
                <p className="mt-2 text-gray-500">
                  Style No : {product.styleNo}
                </p>
                <p className="mt-2 text-gray-500">
                  Discription : {product.description}
                </p>
                <p className="mt-2 text-gray-500">Price : {product.price}</p>
                <p className="mt-2 text-gray-500">
                  Total Quantity : {product.Totalquantity}
                </p>
              </div>
            </div>
          </div>
          <div>
            <button
              className="bg-button hover:bg-button-hover text-white px-4 py-4 rounded-full left-14 max-[468px]:top-20 max-[1126px]:left-5 max-[468px]:px-2 max-[468px]:py-2 top-28 fixed flex justify-center items-center"
              onClick={() => {
                navigate("../products");
              }}
            >
              <span className="sr-only">Back</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-xl text-gray-500 flex justify-center items-center w-full h-96 rounded-lg">
          <h1>Loading.....</h1>
        </div>
      )}
      {userProductList.length != 0 &&
        userProductList.map((userProduct, index) => (
          <div
            key={index}
            className="max-w-4xl mx-auto max-[468px]:mx-4 bg-gray-200 rounded-xl shadow-md overflow-hidden md:max-w-4xl max-[1024px]:mx-4 mt-10"
          >
            <div className="md:flex">
              <div className="p-8 grid grid-rows-2">
                <div className="uppercase tracking-wide text-lg text-indigo-500 font-extrabold">
                  {userProduct.user.name}
                </div>
                <p className="mt-2 text-gray-500">
                  Quantity: {userProduct.quantity}
                </p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ProductOverview;
