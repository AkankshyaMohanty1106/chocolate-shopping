import React from "react";
import "./App.css";
import CustomizedBox from "./Componets/CustomizedBox";
import Footer from "./Componets/Footer";
import NavBar from "./Componets/NavBar";
import ProductContainer from "./Componets/ProductContainer";


const productItem = [
  {
    id: 1,
    name: "Product 1",
    price: 10.99,
    ProductPrice : 10.99,
    imageSrc:
      "https://sugermint.com/wp-content/uploads/2022/04/Cadbury-Temptation-Rum-and-Raisin-Chocolate.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 19.99,
    ProductPrice : 19.99,
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJXHwFMj2SlNPGfwwpFCouXfbMmQCWlI8VEsScqVRHqHFdPeX49L8WwFwh4bYqw7Evu6k&usqp=CAU",
  },
  {
    id: 3,
    name: "Product 3",
    price: 19.99,
    ProductPrice : 19.99,
    imageSrc:
      "https://asset20.ckassets.com/blog/wp-content/uploads/sites/5/2021/06/Ferrero-Rocher-Moments.jpg",
  },
  {
    id: 4,
    name: "Product 4",
    price: 19.99,
    ProductPrice : 19.99,
    imageSrc:
      "https://www.momjunction.com/wp-content/uploads/2020/11/Cadbury-Bournville-Rich-Cocoa-Dark-Chocolate.jpg",
  },
  {
    id: 5,
    name: "Product 5",
    price: 19.99,
    ProductPrice : 19.99,
    imageSrc:
      "https://asset20.ckassets.com/blog/wp-content/uploads/sites/5/2021/06/Cadbury-Dairy-Milk-Silk-Fruit-and-Nut-Chocolate-Bar-1024x512.jpg",
  },
  {
    id: 6,
    name: "Product 6",
    price: 19.99,
    ProductPrice : 19.99,
    imageSrc:
      "https://i.pinimg.com/564x/5c/97/52/5c9752414caa0fdd46010d3d68cf9494.jpg",
  },
  {
    id: 7,
    name: "Product 7",
    price: 19.99,
    ProductPrice : 19.99,
    imageSrc:
      "https://i.pinimg.com/474x/2f/a8/1b/2fa81b6c85d39affa0ea8b4dbe4c999f.jpg",
  },
  {
    id: 8,
    name: "Product 8",
    price: 19.99,
    ProductPrice : 19.99,
    imageSrc:
      "https://i.pinimg.com/564x/82/79/0a/82790a5634e57fe66edde8f964e210d6.jpg",
  },
  {
    id: 9,
    name: "Product 9",
    price: 19.99,
    ProductPrice : 19.99,
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Qz2B1qexc11MHLk0upX-TeQT4qGPzF__pwy21tr__oFSyWCUK2rbKNh98-l6CPsMYq4&usqp=CAU",
  },
  {
    id: 10,
    name: "Product 10",
    ProductPrice : 19.99,
    price: 19.99,
    imageSrc:
      "https://i.pinimg.com/564x/e9/53/b2/e953b2e01759d77b850ee9b118f510d3.jpg",
  },
  // Add more product data here
]
function App() {
  const [products,setProducts] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [customizedBoxItems, setCustomizedBoxItems] = React.useState([]);
  const [checkboxArray, setCheckboxArray] = React.useState([]);

  React.useEffect(()=>{
    setProducts(productItem);
  },[products])
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="App">
      <NavBar checkboxArray={checkboxArray} setCheckboxArray={setCheckboxArray} products={products} setProducts={setProducts} productItem={productItem}/>
      <div className="scrollable-div">
        <div style={{ height: "50px" }}>
          <label style={{ float: "right", marginRight: "30px" }}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <strong>Show Customized Box</strong>
          </label>
        </div>
        {isChecked && (
          <div style={{ marginLeft: "10px" }}>
            <CustomizedBox
              data={customizedBoxItems}
              setData={setCustomizedBoxItems}
              setCheckboxArray={setCheckboxArray}
              checkboxArray={checkboxArray}
              setIsChecked={setIsChecked}
              // isChecked={isChecked}
            />
          </div>
        )}
        <div style={{ marginTop: "10px" }}>
          <ProductContainer
            products={products}
            isChecked={isChecked}
            setCustomizedBoxItems={setCustomizedBoxItems}
            customizedBoxItems={customizedBoxItems}
            actualItem={checkboxArray}
            setActualItem={setCheckboxArray}
            setIsChecked={setIsChecked}
            // setCheckboxArray={setCheckboxArray}
            // checkboxArray={checkboxArray}
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
