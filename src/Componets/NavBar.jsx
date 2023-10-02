import React, { useState ,useEffect} from 'react';
import CheckOut from './CheckOut';
import styles from "./Navbar.module.css";
import cartImage from "../Assets/add-to-cart.png"

const NavBar = ({checkboxArray,products,setProducts,productItem,setCheckboxArray}) => {
    const [cartItemCount, setCartItemCount] = useState(0);
    const [openCheckoutModal,setOpenCheckoutModal] = useState(false);

    useEffect(()=>{
      console.log(checkboxArray)
      setCartItemCount(checkboxArray.length);
    },[checkboxArray])

  // Dummy user details (replace with actual user data);
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  // Dummy function to add items to the shopping bag
  const addToCart = () => {
    // setCartItemCount(cartItemCount + 1);
    // <CheckOut/>
    setOpenCheckoutModal(true);
    
  };
  const onchangeSearchBar = (e) => {
    const filteredNames = products.filter((list) =>
    list.name.toLowerCase().includes(e.toLowerCase())
    );
    console.log(filteredNames)
    
    if(filteredNames.length === 0){
      setProducts(productItem);
    }else{
      setProducts(filteredNames);
    }
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <h1>Chocolate Delights</h1>
      </div>
      <div className={styles.navbar__search}>
        <input type="text" placeholder="Search..." onChange={(e)=>onchangeSearchBar(e.target.value)}/>
      </div>
      {/* <div className={styles.navbar__user}>
        {user ? (
          <div className={styles.user_details}>
            <p>Welcome, {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <button>Login</button>
        )}
      </div> */}
      <div className={styles.navbar__cart}>
        <img
          src={cartImage} // Replace with your shopping bag image URL
          alt="Shopping Bag"
          onClick={addToCart}
        />
        {cartItemCount > 0 && (
          <span className={styles.cart_count}>{cartItemCount}</span>
        )}
      </div>
      {openCheckoutModal && (
        <CheckOut
        open={openCheckoutModal}
        setOpen={setOpenCheckoutModal}
        checkboxArray={checkboxArray}
        setCheckboxArray={setCheckboxArray}
        />
      )}
    </nav>
  )
}

export default NavBar