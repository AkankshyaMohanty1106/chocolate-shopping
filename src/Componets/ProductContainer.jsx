import React from "react";
import styles from "./ProductContainer.module.css";
import { Button, message, Space } from 'antd';

const ProductContainer = ({
  products,
  isChecked,
  setCustomizedBoxItems,
  customizedBoxItems,
  actualItem,
  setActualItem,
  setIsChecked,
  setCheckboxArray,
  checkboxArray,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const addToCartFun = (product) => {
    
    const existingItemIndex = actualItem.findIndex(
      (item) => item._id === product.id
    );

    if (existingItemIndex !== -1) {
      // If the product exists, update its quantity and price
      const updatedActualItem = [...actualItem];
      updatedActualItem[existingItemIndex].totalQuantity += 1;
      updatedActualItem[existingItemIndex].totalPrice += product.price;
      setActualItem(updatedActualItem);
    } else {
      // If the product doesn't exist, add a new object
      const newItem = {
        _id: product.id,
        item: [
          {
            name: product.name,
            image: product.imageSrc,
          },
        ],
        totalQuantity: 1,
        totalPrice: product.ProductPrice,
        productTotalPrice : product.price,
        // image: product.imageSrc,
        // quantity: 1,
        // name: product.name,
        // price: product.price,
      };
      setActualItem([...actualItem, newItem]);
    }
  };

  const addToCustomizedBoxFun = (product) => {
    if (customizedBoxItems.length < 1 && isChecked === false) {
      setIsChecked(true);
    }
    if (isChecked === false) {
      setIsChecked(true);
    }
    // if (isChecked) {
    const existingItemIndex = customizedBoxItems.findIndex(
      (item) => item.id === product.id
    );

    const totalQuantity = customizedBoxItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    if (existingItemIndex !== -1) {
      // If the product exists, update its quantity and price if total quantity is less than 8
      if (totalQuantity + 1 <= 8) {
        const updatedCustomizedBoxItems = [...customizedBoxItems];
        updatedCustomizedBoxItems[existingItemIndex].quantity += 1;
        updatedCustomizedBoxItems[existingItemIndex].ProductPrice += product.price;
        setCustomizedBoxItems(updatedCustomizedBoxItems);
      } else {
        // Handle the case where the total quantity exceeds 8 (e.g., show a message to the user).
        console.log("You can't increase the quantity, total exceeds 8.");
        messageApi.open({
          type: 'warning',
          content: "You can't increase the quantity, total exceeds 8.",
        });
      }
    } else {
      // If the product doesn't exist, add a new object if the total quantity is less than 8
      if (totalQuantity + 1 <= 8) {
        const newItem = {
          id: product.id,
          image: product.imageSrc,
          quantity: 1,
          name: product.name,
          price: product.price,
          ProductPrice : product.ProductPrice,
        };
        setCustomizedBoxItems([...customizedBoxItems, newItem]);
      } else {
        // Handle the case where the total quantity exceeds 8 (e.g., show a message to the user).
        console.log("You can't add more than 8 items to the cart.");
        messageApi.open({
          type: 'warning',
          content: "You can't add more than 8 items to the cart.",
        });
      }
    }
    // }
  };

  return (
    <>
    {contextHolder}
   
    <div className={styles.product_container}>
      
      {products.map((product) => (
        <div className={styles.product_card} key={product.id}>
          <img
            className={styles.product_image}
            src={product.imageSrc}
            alt={product.name}
          />
          <h3 className={styles.product_name}>{product.name}</h3>
          <p className={styles.product_price}>${product.price.toFixed(2)}</p>
          <div>
            <button
              className={styles.add_to_cart_button}
              onClick={() => addToCartFun(product)}
            >
              Add to Cart
            </button>
            <button
              className={styles.add_to_cart_button}
              onClick={() => addToCustomizedBoxFun(product)}
            >
              Add to CustomizedBox
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default ProductContainer;
