import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ShopContext = createContext(); // created a context variable named shopcontext

const ShopContextProvider = (props) => {
  // context provider func

  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [products, setProducts] = useState([])
  const [token, setToken] = useState('') // user register and login token

  // for search bar
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false); // if it is ture then we gonna display the search bar and vice versa
  // for cart
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate()

  const addToCart = async (itemId, size) => {
    if (!size) {
      // if size data is not available
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItems); // make a copy of cartItems state --> since it is an object therefore we will use structuredClone
    if (cartData[itemId]) {
      // if this cartData have any property available in this itemId then
      if (cartData[itemId][size]) {
        // if this cartData have any product available in this itemId and size then we will just increase the product quantitly by one
        cartData[itemId][size] += 1; // product entry of this size already in cart
      } else {
        // when we don't have a product entry of this size
        cartData[itemId][size] = 1; // a new entry
      }
    } else {
      // if in this cartData we don't have any entry of this id -> then will create a new entry
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  };

  // to update the count on cart icon
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      // iterate items
      for (const item in cartItems[items]) {
        // iterate size
        try {
          if (cartItems[items][item] > 0) {
            // increase count
            totalCount += cartItems[items][item];
          }
        } catch (error) { }
      }
    }
    return totalCount;
  };

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  // to update cart data -> e.g to delete a product from cart
  const updateQuantity = async (itemId, size, quantity) => {
    // for this itemId for this size, quantity will be updated
    let cartData = structuredClone(cartItems); // copy
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items)
      if (!itemInfo) continue; // if product with this id does'nt exist
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item]
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }
    return totalAmount
  }

  const getProductsFromBackend = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setProducts(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getUserCartDataFromDB = async (token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
      if (response.data.success) {
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    getProductsFromBackend()
    if (token) {
      getUserCartDataFromDB(localStorage.getItem('token'))
    }
  }, [])

  useEffect(() => { // when page refreshes state becomes null so token also becomes null thats why page refresh takes to the  login page to solve this I am taking the token from local storage
    if (!token && localStorage.getItem('token')) { // if token state is null but there is token in local storage
      setToken(localStorage.getItem('token'))
      getUserCartDataFromDB(localStorage.getItem('token'))
    }
  }, [])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken  // using context api we can access these in any component
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

// {
//   burger001: {
//     large: 2,
//     small: 1
//   },
//   pizza003: {
//     medium: 1
//   }
// }
