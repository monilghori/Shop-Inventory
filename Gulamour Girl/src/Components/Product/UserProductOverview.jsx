import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../Button";
import toast from "react-hot-toast";


const URL = import.meta.env.VITE_REACT_DBURL;

const UserProductOverview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditable, setIsEditable] = useState(false);
  const [product, setProduct] = useState({
    product: {
      supplier: {},
    },
  });
  const user = JSON.parse(localStorage.getItem('user'))
  //const availableSizes = ['S', 'M', 'L', 'XL', 'XXL']

  const loadProduct = async () => {
    const res = await axios.post(
      `${URL}/userproduct/id`,
      {
        id: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.success === true) {
      setProduct(res.data.product);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const handleEditClick = () => {
    setIsEditable(true);
  };
  const handleBackClick = () => {
    setIsEditable(false);
  };
  const handleDoneClick = async () => {
    
    if(product.color == "")
      {
        toast.error("Color is required", { duration: 3000 });
        return
      }
    if(product.size == "")
      {
        toast.error("Size is required", { duration: 3000 });
        return
      }
    if(!product.quantity)
      {
        //toast.error("Quantity is required", { duration: 3000 });
        product.quantity = 0;
      }
      setIsEditable(false);
    const res = await axios.post(
      `${URL}/userproduct/update`,
      {
        _id : product._id,
        size : product.size,
        color : product.color,
        quantity : product.quantity
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.success === true) {
      setProduct(res.data.product);
      toast.success(res.data.message, { duration: 3000 });
    } else {
      toast.error(res.data.message, { duration: 3000 });
    }
  };
  const handleDeleteClick = async () => {
    let res = await axios.post(
      `${URL}/userproduct/delete`,
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
      navigate("../");
      toast.success(res.data.message, { duration: 3000 });
    }
  };
  return (
    <>
    <div className="max-w-4xl mx-auto max-[468px]:mx-4 bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl max-[1024px]:mx-4 max-[468px]:mt-16 mt-10">
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
            {product.product.name}
          </div>
          <p
            className={
              product.available
                ? "text-green-600 flex mt-2"
                : "text-red-600 flex mt-2"
            }
          >
            Available :{" "}
            {product.available ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#41B06E"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FF0000"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            )}
          </p>
          <p className="mt-2 text-gray-500">
            Supplier : {product.product.supplier.name}
          </p>
          <p className="mt-2 text-gray-500">
            Style No : {product.product.styleNo}
          </p>
          <p className="mt-2 text-gray-500">
            Discription : {product.product.description}
          </p>
          {isEditable ? (
            <div className="mt-2">
              <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="color">
                  Color
                </label>
              <input
                type="text"
                value={product.color}
                onChange={(e) =>
                  setProduct({ ...product, color: e.target.value })
                }
                placeholder="Color"
                className="border border-gray-300 p-2 rounded-md w-full mt-1"
                required
              />
              {/* <select
                value={product.size}
                onChange={(e) =>
                  setProduct({ ...product, size: e.target.value })
                }
                placeholder="Size"
                className="border border-gray-300 p-2 rounded-md w-full mt-2"
              >
                {availableSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select> */}
              <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="size">
                  Size
                </label>
              <input
                type="text"
                value={product.size}
                onChange={(e) =>
                  setProduct({ ...product, size: e.target.value })
                }
                placeholder="Size"
                className="border border-gray-300 p-2 rounded-md w-full mt-1"
                required
              />
              <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="quantity">
                  Quantity
                </label>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => {
                  const newQuantity = Math.max(0, parseInt(e.target.value, 10));
                  setProduct({ ...product, quantity: newQuantity });
                }}
                placeholder="Quantity"
                className="border border-gray-300 p-2 rounded-md w-full mt-1"
                required 
              />
              {/* <input
                type="number"
                value={product.product.price}
                onChange={(e) =>
                  setProduct({ ...product, product: { price: e.target.value } })
                }
                placeholder="Price"
                className="border border-gray-300 p-2 rounded-md w-full mt-2"
              /> */}
              <div className="mt-4">
                <span className="text-gray-400 text-lg">$ </span>
                <span className="text-gray-900 text-xl font-bold">
                  {product.product.price}
                </span>
              </div>
              <div className="mt-6 flex space-x-2">
                <Button text="Back" onClick={handleBackClick}></Button>
                <Button text="Done" onClick={handleDoneClick}></Button>
                
              </div>
            </div>
          ) : (
            <div>
              <p className="mt-2 text-gray-500">Color : {product.color}</p>
              <p className="mt-2 text-gray-500">Size : {product.size}</p>

              <p className="mt-2 text-gray-500">
                Quantity : {product.quantity}
              </p>

              <div className="mt-4">
                <span className="text-gray-400 text-lg">$ </span>
                <span className="text-gray-900 text-xl font-bold">
                  {product.product.price}
                </span>
              </div>
              <div className="mt-6 flex space-x-2">
                <Button text="Edit" onClick={handleEditClick}></Button>
                <Button text="Delete" onClick={handleDeleteClick}></Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <div>

    <button className="bg-button hover:bg-button-hover text-white px-4 py-4 rounded-full left-14 max-[468px]:top-20 max-[1126px]:left-5 max-[468px]:px-2 max-[468px]:py-2 top-28 fixed flex justify-center items-center" onClick={()=>{navigate("../")}}>
    <span className="sr-only">Back</span>
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
    </button>
    </div>
    </>
  );
};

export default UserProductOverview;
