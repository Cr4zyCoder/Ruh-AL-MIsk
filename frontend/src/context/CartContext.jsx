import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('ruh_al_misk_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('ruh_al_misk_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, size = '6ml', qty = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id && item.selectedSize === size);

            if (existingItem) {
                return prevItems.map(item =>
                    item._id === product._id && item.selectedSize === size
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            }

            return [...prevItems, { ...product, selectedSize: size, quantity: qty }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id, size) => {
        setCartItems(prevItems => prevItems.filter(item => !(item._id === id && item.selectedSize === size)));
    };

    const updateQuantity = (id, size, delta) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item._id === id && item.selectedSize === size) {
                    const newQuantity = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const clearCart = () => setCartItems([]);

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + (item.newPrice * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            cartCount,
            cartTotal,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
