import React from 'react'

const TabBar = ({ list , onClick, selected }) => {
  return (
    <div className="flex items-center space-x-2 mt-6 flex-wrap">
        <div
          onClick={() => onClick("all")}
          className={`text-xl text-gray-600 flex justify-center items-center p-2 px-4 rounded-2xl hover:bg-category-hover hover:shadow-lg m-2 ${
            selected === "all" ? "bg-category-selected" : "bg-slate-200"
          }`}
        >
          <h1>all</h1>
        </div>

        {list &&
          list.map((item) => (
            <div
              key={item._id}
              onClick={() => onClick(item._id)}
              className={`text-xl text-gray-600 flex justify-center items-center p-2 px-4 m-2 rounded-2xl hover:bg-category-hover hover:shadow-lg ${
                selected === item._id ? "bg-category-selected" : "bg-slate-200"
              }`}
            >
              <h1>{item.name}</h1>
            </div>
          ))}
      </div>
  )
}

export default TabBar