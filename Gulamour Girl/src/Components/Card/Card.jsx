import * as React from "react";
import '../../style.css'
export default function Card({
  image,
  name,
  quantity,
  available,
  price,
  size,
  color,
  styleNo,
  onClick
}) {
  return (
    <div className="bg-card-header max-w-sm max-h-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg shadow-lg hover:shadow-custom-card overflow-hidden m-8 transition-shadow duration-300" onClick={onClick}>
      <img src={image} alt={name} className="w-full h-52 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold px-4">{name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          <p className="text-gray-600">Quantity: {quantity}</p>
          <p
            className={available ? "text-green-600 flex" : "text-red-600 flex"}
          >
            Available:{" "}
            {available ? (
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

          <p className="text-gray-600">Price: {price}</p>
          <p className="text-gray-600">Size: {size}</p>
          <p className="text-gray-600">Color: {color}</p>
          <p className="text-gray-600">Style No.: {styleNo}</p>
          {/* Add more inventory information here */}
        </div>
      </div>
    </div>
  );
}
