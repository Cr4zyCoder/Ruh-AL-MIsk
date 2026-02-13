import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Clock, Wind, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState('6ml');
    const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);

    const handleCardClick = () => {
        navigate(`/product/${product._id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product, selectedSize);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            onClick={handleCardClick}
            className="product-card-lux"
            style={{ cursor: 'pointer' }}
        >
            <div className="product-img-wrapper">
                <img src={product.images[0]} alt={product.name} />
                <div className="product-badges">
                    {product.isFeatured && <motion.span initial={{ x: -10 }} animate={{ x: 0 }} className="badge featured">Featured</motion.span>}
                    {product.isBestseller && <motion.span initial={{ x: -10 }} animate={{ x: 0 }} className="badge bestseller">Bestseller</motion.span>}
                </div>

                <div className="product-hover-actions">
                    <button onClick={handleAddToCart} className="btn-icon-lux"><ShoppingCart size={20} /></button>
                </div>
            </div>

            <div className="product-info" style={{ padding: '2rem' }}>
                <div className="product-header">
                    <span className="product-category" style={{ letterSpacing: '0.3em', fontWeight: '500' }}>
                        {product.category}
                    </span>
                    <div className="product-price">
                        {product.oldPrice && <span className="old-price" style={{ opacity: 0.5, textDecoration: 'line-through', marginRight: '0.8rem', fontSize: '0.8rem' }}>₹{product.oldPrice}</span>}
                        <span className="new-price" style={{ color: 'var(--gold-primary)', fontWeight: '600' }}>₹{product.newPrice}</span>
                    </div>
                </div>

                <h3 className="product-name" style={{ fontSize: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    {product.name}
                </h3>

                {/* Size Selection */}
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                    <button
                        onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
                        style={{
                            width: '100%',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--glass-border)',
                            padding: '0.6rem 1rem',
                            color: 'var(--text-secondary)',
                            fontSize: '0.75rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        Size: {selectedSize}
                        <ChevronDown size={14} />
                    </button>
                    {isSizeDropdownOpen && (
                        <div className="glass-panel" style={{ position: 'absolute', top: '100%', left: 0, width: '100%', zIndex: 50, borderTop: 'none' }}>
                            {['3ml', '6ml', '12ml', '24ml'].map(size => (
                                <button
                                    key={size}
                                    onClick={() => {
                                        setSelectedSize(size);
                                        setIsSizeDropdownOpen(false);
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem 1rem',
                                        textAlign: 'left',
                                        background: 'none',
                                        border: 'none',
                                        color: selectedSize === size ? 'var(--gold-primary)' : 'var(--text-secondary)',
                                        fontSize: '0.75rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Elegant Performance metrics */}
                <div className="performance-metrics" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.1)', paddingTop: '1.5rem' }}>
                    <div className="metric">
                        <Clock size={14} className="gold-text" />
                        <div className="scale-bar" style={{ flex: 1, height: '2px', background: 'rgba(212, 175, 55, 0.1)', position: 'relative' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${product.longevity * 10}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="scale-fill"
                                style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'var(--gold-primary)' }}
                            />
                        </div>
                    </div>
                    <div className="metric">
                        <Wind size={14} className="gold-text" />
                        <span className="metric-text" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                            {product.projection}
                        </span>
                    </div>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="btn-add-cart-lux"
                    style={{
                        width: '100%',
                        marginTop: '2rem',
                        padding: '1.2rem',
                        border: '1px solid var(--gold-muted)',
                        background: 'transparent',
                        color: 'var(--gold-primary)',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        transition: 'all 0.4s ease',
                        cursor: 'pointer'
                    }}
                >
                    Add to Collection
                </button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
