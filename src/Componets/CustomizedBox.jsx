import React from "react";
import styles from "./CustomizedBox.module.css";
import { Button, message, Space } from "antd";

const CustomizedBox = ({
  data,
  setData,
  setCheckboxArray,
  checkboxArray,
  setIsChecked,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState("");
  const [totalPrice, setTotalPrice] = React.useState(0);

  console.log(data);
  React.useEffect(() => {
    setItems(data);
  }, [data]);
  React.useEffect(() => {
    // Calculate the total price when items change
    let newTotalPrice = 0;

    for (const product of items) {
      newTotalPrice += product.ProductPrice;
    }
    setTotalPrice(newTotalPrice);
  }, [items]);

  const handleAddItem = (id) => {
    if (getTotalQuantity() < 8) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id && item.quantity < 8
            ? {
                ...item,
                quantity: item.quantity + 1,
                ProductPrice: item.ProductPrice + item.price,
              }
            : item
        )
      );
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id && item.quantity < 8
            ? {
                ...item,
                quantity: item.quantity + 1,
                ProductPrice: (item.quantity + 1) * item.price,
              }
            : item
        )
      );
      setError("");
    } else {
      setError("Total number of items cannot exceed 8.");
      messageApi.open({
        type: 'warning',
        content: "Total number of items cannot exceed 8.",
      });
    }
  };

  const handleRemoveItem = (id) => {
    setItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === id && item.quantity > 0
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  ProductPrice: (item.quantity - 1) * item.price,
                }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );

    setData(
      (prevData) =>
        prevData
          .map((item) =>
            item.id === id && item.quantity > 0
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  ProductPrice: (item.quantity - 1) * item.price,
                }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );

    setError("");

  };

  const getTotalQuantity = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };
  const addToCartFun = (itemArr) => {
    // console.log(itemArr)
    // console.log(checkboxArray)
    let temp = {
      _id: checkboxArray.length + 101,
      item: itemArr,
      isCustomized: true,
      image:
        "https://static.toiimg.com/thumb/msid-80752819,width-400,resizemode-4/80752819.jpg",
      name: "Customized Chocolate Box",
      totalQuantity: 1,
      totalPrice: totalPrice,
      productTotalPrice: totalPrice,
    };
    setCheckboxArray([...checkboxArray, temp]);
    setData([]);
    setIsChecked(false);
  };
  const removeCartFun = () => {
    setItems([]);
    setData([]);
    setIsChecked(false);
  };

  return (
    <div
      style={{
        border: "2px solid #08255f",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {contextHolder}
      <div>
        <h4 className={styles.item_header}>Customized Box</h4>
      </div>
      {items.length > 0 ? (
        <div className={styles.item_container}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={`Item ${item.id}`} />
              <div className={styles.quantity}>
                <button onClick={() => handleAddItem(item.id)}>+</button>
                {item.quantity}
                <button onClick={() => handleRemoveItem(item.id)}>-</button>
              </div>
            </div>
          ))}
          <div className={styles.total_images}>
            <div style={{ display: "flex" }}>
              <p style={{ marginRight: "20px", fontWeight: "500" }}>
                Total Number of Images: {getTotalQuantity()}
              </p>
              <p style={{ fontWeight: "500" }}>
                Total Price: {totalPrice.toFixed(2)}
              </p>
            </div>
            {items.length > 0 && (
              <div>
                <button
                  className={styles.add_to_cart_button_cus}
                  onClick={() => removeCartFun()}
                >
                  Cancel
                </button>
                <button
                  className={styles.add_to_cart_button_cus}
                  onClick={() => addToCartFun(items)}
                >
                  Add To Cart
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2>No Item Added</h2>
          <button
            className={styles.add_to_cart_button_cus}
            style={{ float: "right", margin: "10px" }}
            onClick={() => removeCartFun()}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomizedBox;
