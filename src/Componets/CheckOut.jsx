import React from 'react';
import { Button, Modal } from 'antd';
import styles from "./CheckOut.module.css";

const CheckOut = (props) => {
  const [cart, setCart] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [isSubmit,setIsSubmit] = React.useState(false);
  const [okTextName , setOkTextName] = React.useState("Place Your Order");

  React.useEffect(() => {
    setCart(props.checkboxArray);
    calculateTotalPrice(props.checkboxArray);
  }, [props.checkboxArray]);

  const calculateTotalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0);
    setTotalPrice(totalPrice);
  };
  console.log("cart",cart)
  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item !== product);
    setCart(updatedCart);
    props.setCheckboxArray(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const incrementQuantity = (product) => {
    product.totalQuantity += 1;
    product.totalPrice = product.totalQuantity * product.productTotalPrice;
    setCart([...cart]);
    props.setCheckboxArray([...cart]);
    calculateTotalPrice([...cart]);
  };

  const decrementQuantity = (product) => {
    if (product.totalQuantity > 1) {
      product.totalQuantity -= 1;
      product.totalPrice = product.totalQuantity * product.productTotalPrice;
      setCart([...cart]);
      props.setCheckboxArray([...cart]);
      calculateTotalPrice([...cart]);
    }
  };
  const onHandelOk = () => {
    // setCart([{name : "Order Placed Successfully !"}])
    
    if(isSubmit){
      props.setOpen(false);
    }else{
      setIsSubmit(true);
      props.setCheckboxArray([]);
      setOkTextName("Close");
    }
  }

  return (
    <Modal
      title={<h3>Your cart</h3>}
      centered
      open={props.open}
      onOk={() => onHandelOk()}
      onCancel={() => props.setOpen(false)}
      width={1200}
      okText={okTextName}
      cancelButtonProps={{ style: isSubmit ? { display: 'none' } : {display: 'inline-block'} }}
    >
      {!isSubmit ? (
        <div>
        <table className={styles.product_table}>
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>CUSTOMIZED BOX</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => (
              <tr key={product._id}>
                <td><img src={product.isCustomized ? product.image : product.item[0].image} alt={product.item[0].name} /></td>
                <td>{product.isCustomized ? product.name : product.item[0].name}</td>
                {/* {console.log("item",product.item.map(product => product.name).join(', '))} */}
                <td style={{width:"150px"}}>{product.isCustomized ? product.item.map(product => product.name).join(', ') : "NOT A CUSTOMIZED BOX"}</td>
                <td>
                  <div className={styles.quantity_controls}>
                    <button onClick={() => incrementQuantity(product)}>+</button>
                    <span>{product.totalQuantity}</span>
                    <button onClick={() => decrementQuantity(product)}>-</button>
                  </div>
                </td>
                <td>${product.totalPrice.toFixed(2)}</td> {/* Format the total price with two decimal places */}
                <td><button className={styles.remove_button} onClick={() => removeFromCart(product)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Total Price */}
        <div className={styles.total_price}>
          Total Price: ${totalPrice.toFixed(2)} {/* Format the total price with two decimal places */}
        </div>
      </div>
      ) : (<>
      <h2>Order Placed Successfully !</h2>
      </>)}
      
    </Modal>
  );
};

export default CheckOut;
