import React, { useEffect, useState } from "react";
import Card from "../Components/Card/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import toast from "react-hot-toast";
import TabBar from "../Components/TabBar";

const URL = import.meta.env.VITE_REACT_DBURL;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const initNewProduct = {
    user: "",
    product: "",
    size: "",
    color: "",
    quantity: 0,
  };
  const [newProduct, setNewProduct] = useState(initNewProduct);
  const [productList, setProductList] = useState([]);
  const [userList, setUserList] = useState([]);

  const loadData = async () => {
    let res;
    if (selectedCategory === "all") {
      res = await axios.post(
        `${URL}/userproduct/getall`,
        {
          id: user._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      res = await axios.post(
        `${URL}/userproduct/bycategory`,
        {
          id: user._id,
          category: selectedCategory,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    if (res.data.success === true) {
      setProducts(res.data.products);
    }

    res = await axios.get(`${URL}/product/getall`);
    if (res.data.success === true) {
      setProductList(res.data.products);
    }

    res = await axios.get(`${URL}/user/getall`);
    if (res.data.success === true) {
      setUserList(res.data.users);
    }

    res = await axios.get(`${URL}/category/getall`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.success === true) {
      setCategoryList(res.data.categories);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const handleClick = (id) => {
    navigate(`/userproduct/${id}`);
  };

  const handleAddProduct = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newProduct.user === "") {
      toast.error("Please select user", { duration: 3000 });
    } else if (newProduct.product === "") {
      toast.error("Please select product", { duration: 3000 });
    } else if (newProduct.size === "") {
      toast.error("Please enter size or Enter none", { duration: 3000 });
    } else if (newProduct.color === "") {
      toast.error("Please enter color", { duration: 3000 });
    } else if (newProduct.quantity === 0) {
      toast.error("Please enter quantity", { duration: 3000 });
    } else {
      const response = await axios.post(`${URL}/userproduct/add`, newProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success === true) {
        toast.success(response.data.message, { duration: 3000 });
        loadData();
        setNewProduct(initNewProduct);
      } else {
        toast.error(response.data.message, { duration: 3000 });
      }
      setIsModalOpen(false);
    }
  };

  const handleSelectedCategory = (cat) => {
    setSelectedCategory(cat);
  };

  return (
    <>
    <div className="mx-6">
      <TabBar 
        list={categoryList} 
        onClick={handleSelectedCategory} 
        selected={selectedCategory}
      />
    </div>
      {products.length !== 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product._id}
              image={
                "https://cdn.shopify.com/s/files/1/0070/7032/files/how_20to_20start_20a_20clothing_20brand.png?v=1693935729"
              }
              name={product.product.name}
              quantity={product.quantity}
              available={product.available}
              price={product.product.price}
              size={product.size}
              color={product.color}
              styleNo={product.product.styleNo}
              onClick={() => handleClick(product._id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-xl text-gray-500 flex justify-center items-center w-full h-96 rounded-lg">
          <h1>No Products Found</h1>
        </div>
      )}
      <div>
        <Tooltip title="Add your product">
          <button
            onClick={handleAddProduct}
            className="bg-button hover:bg-button-hover text-white font-bold py-4 px-6 fixed bottom-10 right-14 flex justify-center items-center rounded-full"
          >
            +
          </button>
        </Tooltip>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl max-[768px]:mx-4">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="product"
                >
                  User
                </label>
                <select
                  id="user"
                  name="user"
                  value={newProduct.user}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, user: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>
                    Select a user
                  </option>
                  {userList.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="product"
                >
                  Product
                </label>
                <select
                  id="product"
                  name="product"
                  value={newProduct.product}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, product: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>
                    Select a product
                  </option>
                  {productList.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name} : {product.styleNo}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="size"
                >
                  Size
                </label>
                <input
                  id="size"
                  type="text"
                  value={newProduct.size}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, size: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="color"
                >
                  Color
                </label>
                <input
                  id="color"
                  type="text"
                  value={newProduct.color}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, color: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="quantity"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-button hover:bg-button-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
