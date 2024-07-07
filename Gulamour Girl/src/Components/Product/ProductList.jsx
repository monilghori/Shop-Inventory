import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import toast from "react-hot-toast";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import TabBar from "../TabBar";

const URL = import.meta.env.VITE_REACT_DBURL;

const ProductList = () => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#DDDDDD",
    "&:hover": {
      backgroundColor: "#DDDDDD",
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "24ch",
        "&:focus": {
          width: "30ch",
        },
      },
    },
  }));

  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [supplierList, setSupplierList] = useState([]);
  const navigate = useNavigate();
  const init = {
    name: "",
    price: "",
    description: "",
    image: "",
    styleNo: "",
    supplier: "",
    category: "",
  };
  const [newProduct, setNewProduct] = useState(init);

  const loadData = async () => {
    try {
      let res;
      if (selectedCategory === "all") {
        res = await axios.get(`${URL}/product/getall`);
      } else {
        res = await axios.post(
          `${URL}/product/getbycategory`,
          { category: selectedCategory },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      if (res.data.success) {
        setProductList(res.data.products);
      }
      res = await axios.get(`${URL}/category/getall`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        setCategoryList(res.data.categories);
      }
      res = await axios.get(`${URL}/supplier/getall`);
      if (res.data.success) {
        setSupplierList(res.data.suppliers);
      }
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedCategory]); 

  const handleAddProduct = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newProduct.name === "") {
        toast.error("Name is required", { duration: 3000 });
        return;
      } else if (newProduct.category === "") {
        toast.error("Category is required", { duration: 3000 });
      } else if (newProduct.supplier === "") {
        toast.error("Supplier is required", { duration: 3000 });
      } else if (newProduct.styleNo === "") {
        toast.error("Style No is required", { duration: 3000 });
      } else if (newProduct.description === "") {
        toast.error("Description is required", { duration: 3000 });
      } else if (newProduct.price === "") {
        toast.error("Price is required", { duration: 3000 });
      }

      const res = await axios.post(`${URL}/product/add`, newProduct);
      if (res.data.success) {
        setProductList([...productList, newProduct]);
        setNewProduct(init);
        setIsModalOpen(false);
        loadData();
        toast.success(res.data.message, { duration: 3000 });
      }
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  const handleSearch = () => {};
  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };
  const handleSelectedCategory = (cat) => {
    setSelectedCategory(cat);
  };

  return (
    <>
      <div className="m-4">
        <div className="flex bg-gray-200 p-5 rounded-xl w-full justify-between items-center sticky top-20">
          <span className="text-xl font-bold">Product List</span>
          <div className="flex items-center justify-center space-x-2">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Button text="Search" onClick={handleSearch} />
          </div>
        </div>
        <TabBar
        list={categoryList}
        onClick={handleSelectedCategory}
        selected={selectedCategory}
      />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {productList.length != 0 &&
            productList.map((product, index) => {
              return (
                <div
                  className="bg-white p-4 shadow-md rounded-md mt-2 hover:bg-blue-100"
                  key={index}
                  onClick={() => handleClick(product._id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">{product.name}</span>
                    <span className="text-sm text-gray-400">
                      Price : {product.price}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-400">
                      Category : {product.category && product.category.name}
                    </span>
                    <span className="text-sm text-gray-400">
                      Style No. : {product.styleNo}
                    </span>
                    <span className="text-sm text-gray-400">
                      Total Quantity : {product.Totalquantity}
                    </span>
                  </div>
                </div>
              );
            })
            }
        </div>
      </div>
      {
        productList.length === 0 && (
          <div className="flex justify-center items-center h-[80vh]">
            <span className="text-2xl font-bold text-gray-400">No products found</span>
          </div>
        )
      }
      <Tooltip title="Add new product">
        <button
          onClick={handleAddProduct}
          className="bg-button hover:bg-button-hover text-white font-bold py-4 px-6 fixed bottom-10 right-14 flex justify-center items-center rounded-full"
        >
          +
        </button>
      </Tooltip>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl max-[768px]:mx-4">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="quantity"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="category"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categoryList.map((category, index) => (
                    <option key={index} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="supplier"
                >
                  Supplier
                </label>
                <select
                  id="supplier"
                  name="supplier"
                  value={newProduct.supplier}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, supplier: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>
                    Select a supplier
                  </option>
                  {supplierList &&
                    supplierList.map((supplier, index) => (
                      <option key={index} value={supplier._id}>
                        {supplier.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="quantity"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="size"
                >
                  Style NO
                </label>
                <input
                  id="styleNo"
                  type="text"
                  value={newProduct.styleNo}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, styleNo: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  Image
                </label>
                <input
                  id="image"
                  type="text"
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
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

export default ProductList;
