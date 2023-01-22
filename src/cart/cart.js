// Description: This is the main file for the cart module. It is responsible for local storage and the cart page.

import { useEffect, useState } from 'react';

export function useCart() {
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem('cart');
    return localCart ? JSON.parse(localCart) : [];
  });

  function addToCart(product, quantity) {
    quantity = Number(quantity);
    // if the product is not in the cart yet, add it
    const incart = cart.find((cartitem) => cartitem._id === product._id);
    if (incart) {
      updateCart(product._id, quantity);
    } else {
      const newCart = [...cart, { ...product, quantity }];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  }

  // if the product is already in the cart, update the quantity
  function updateCart(id, quantity) {
    quantity = Number(quantity);
    const newCart = cart.map((cartitem) => {
      if (cartitem._id === id) {
        return { ...cartitem, quantity };
      }
      return cartitem;
    });
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  function removeFromCart(id) {
    const newCart = cart.filter((cartitem) => cartitem._id !== id);
    setCart(newCart);

    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  function clearCart() {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
  }

  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // }, [cart]);

  return { cart, addToCart, updateCart, removeFromCart, clearCart };
}
