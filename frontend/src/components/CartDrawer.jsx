import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
    const { cartItems, cartTotal, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mobile-overlay"
                        onClick={() => setIsCartOpen(false)}
                        style={{ zIndex: 1100 }}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="mobile-side-menu glass-panel"
                        style={{ right: 0, left: 'auto', width: '100%', maxWidth: '500px', zIndex: 1200, display: 'flex', flexDirection: 'column' }}
                    >
                        <div className="cart-header" style={{ padding: '2rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <ShoppingBag className="gold-text" size={24} />
                                <h2 className="shimmer-text" style={{ fontSize: '1.5rem', letterSpacing: '0.1em' }}>Your Collection</h2>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="cart-items" style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                            {cartItems.length === 0 ? (
                                <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        <ShoppingBag size={64} style={{ opacity: 0.1, color: 'var(--gold-primary)' }} />
                                    </motion.div>
                                    <p style={{ marginTop: '2rem', color: 'var(--text-muted)', letterSpacing: '0.1em', fontSize: '0.9rem' }}>
                                        Your library is currently empty.
                                    </p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="btn-outline-lux"
                                        style={{ marginTop: '2rem', width: 'auto', padding: '1rem 2.5rem' }}
                                    >
                                        Discover Scents
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    {cartItems.map((item) => (
                                        <motion.div
                                            key={`${item._id}-${item.selectedSize}`}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="cart-item"
                                            style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '1.5rem' }}
                                        >
                                            <div className="glass-panel" style={{ height: '120px', overflow: 'hidden' }}>
                                                <img src={item.images[0]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-primary)' }}>{item.name}</h3>
                                                        <button
                                                            onClick={() => removeFromCart(item._id, item.selectedSize)}
                                                            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', letterSpacing: '0.1em', marginTop: '0.2rem' }}>
                                                        {item.category} • {item.selectedSize}
                                                    </p>
                                                </div>

                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }}>
                                                        <button onClick={() => updateQuantity(item._id, item.selectedSize, -1)} style={{ background: 'none', border: 'none', color: 'var(--gold-primary)', cursor: 'pointer' }}><Minus size={14} /></button>
                                                        <span style={{ fontSize: '0.9rem', fontWeight: '600', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item._id, item.selectedSize, 1)} style={{ background: 'none', border: 'none', color: 'var(--gold-primary)', cursor: 'pointer' }}><Plus size={14} /></button>
                                                    </div>
                                                    <span style={{ fontWeight: '600', color: 'var(--gold-primary)' }}>₹{(item.newPrice * item.quantity).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="cart-footer" style={{ padding: '2rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(2, 6, 23, 0.4)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                    <span style={{ color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>SUBTOTAL</span>
                                    <span style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--gold-primary)' }}>₹{cartTotal.toLocaleString()}</span>
                                </div>

                                <Link
                                    to="/checkout"
                                    onClick={() => setIsCartOpen(false)}
                                    className="btn-lux"
                                    style={{ width: '100%', padding: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', textDecoration: 'none' }}
                                >
                                    <span>Initiate Checkout</span>
                                    <ArrowRight size={20} />
                                </Link>

                                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
                                    Complimentary signature packaging included.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
