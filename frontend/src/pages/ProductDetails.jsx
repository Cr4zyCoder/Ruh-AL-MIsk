import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ShoppingCart, Clock, Wind,
    Beaker, ShieldCheck, Truck, Star,
    ChevronRight, Info
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('6ml');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/products/${id}`);
                setProduct(data);
                if (data.images && data.images.length > 0) setActiveImage(0);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--navy-obsidian)' }}>
            <div className="shimmer-text" style={{ letterSpacing: '0.5em', textTransform: 'uppercase' }}>Distilling Essence...</div>
        </div>
    );

    if (!product) return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--navy-obsidian)' }}>
            <h2 className="shimmer-text">Essence Not Found</h2>
            <Link to="/" className="btn-lux" style={{ marginTop: '2rem' }}>Return to Gallery</Link>
        </div>
    );

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product, selectedSize);
        }
    };

    return (
        <div className="section-spacing" style={{ background: 'var(--navy-obsidian)', minHeight: '100vh', paddingTop: '10rem' }}>
            <div className="container">
                {/* Breadcrumbs */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '4rem', textTransform: 'uppercase' }}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Collection</Link>
                    <ChevronRight size={12} />
                    <span style={{ color: 'var(--gold-primary)' }}>{product.category}</span>
                    <ChevronRight size={12} />
                    <span style={{ color: 'var(--text-primary)' }}>{product.name}</span>
                </nav>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '6rem', alignItems: 'start' }}>
                    {/* Left: Immersive Media Gallery */}
                    <div style={{ position: 'sticky', top: '10rem' }}>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            {/* Thumbnails */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className="glass-panel"
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            padding: '2px',
                                            cursor: 'pointer',
                                            border: activeImage === idx ? '1px solid var(--gold-primary)' : '1px solid var(--glass-border)',
                                            opacity: activeImage === idx ? 1 : 0.5,
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </button>
                                ))}
                            </div>

                            {/* Main Stage */}
                            <div className="glass-panel" style={{ flex: 1, aspectRatio: '4/5', overflow: 'hidden', position: 'relative' }}>
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeImage}
                                        src={product.images[activeImage]}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </AnimatePresence>
                                <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', padding: '0.8rem 1.5rem', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                                    AUTHENTIC ATTAR
                                </div>
                            </div>
                        </div>

                        {/* Performance Matrix Viz */}
                        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--gold-primary)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                                        <Clock size={16} /> LONGEVITY
                                    </span>
                                    <span style={{ color: 'white', fontWeight: '600', fontSize: '1rem' }}>{product.longevity}h+</span>
                                </div>
                                <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(product.longevity / 12) * 100}%` }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        style={{ height: '100%', background: 'var(--gold-primary)' }}
                                    />
                                </div>
                            </div>
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--gold-primary)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                                        <Wind size={16} /> SIILAGE
                                    </span>
                                    <span style={{ color: 'white', fontWeight: '600', fontSize: '1rem' }}>{product.projection}</span>
                                </div>
                                <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: product.projection === 'Strong' ? '90%' : '60%' }}
                                        transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                                        style={{ height: '100%', background: 'var(--gold-primary)' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Olfactory Poetry & Acquisition */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="hero-subtitle" style={{ fontSize: '0.9rem' }}>{product.gender} • {product.category}</span>
                            <h1 className="shimmer-text" style={{ fontSize: '4rem', marginTop: '1rem', lineHeight: '1.1' }}>{product.name}</h1>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '2.5rem' }}>
                                <span style={{ fontSize: '2.5rem', color: 'var(--gold-primary)', fontWeight: '700' }}>₹{product.newPrice.toLocaleString()}</span>
                                {product.oldPrice && (
                                    <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{product.oldPrice.toLocaleString()}</span>
                                )}
                                <div className="glass-panel" style={{ padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '100px' }}>
                                    <span style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em' }}>AVAILABLE NOW</span>
                                </div>
                            </div>

                            <p style={{ marginTop: '3rem', fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', fontStyle: 'italic' }}>
                                "{product.description}"
                            </p>

                            {/* Scent Pyramid Breakdown */}
                            <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div className="glass-panel" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Beaker size={18} className="gold-text" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 className="gold-text" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Top Notes</h4>
                                        <p style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{product.notes.top.join(' • ')}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div className="glass-panel" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Star size={18} className="gold-text" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 className="gold-text" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Heart Essence</h4>
                                        <p style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{product.notes.heart.join(' • ')}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div className="glass-panel" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <ShieldCheck size={18} className="gold-text" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 className="gold-text" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Base Foundation</h4>
                                        <p style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{product.notes.base.join(' • ')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Acquisition Controls */}
                            <div className="glass-panel" style={{ marginTop: '5rem', padding: '3rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div className="form-group">
                                        <label className="gold-text" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '1rem', display: 'block' }}>CHOOSE DIMENSION</label>
                                        <select
                                            value={selectedSize}
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                            className="lux-input"
                                            style={{ background: 'rgba(255,255,255,0.02)' }}
                                        >
                                            <option value="3ml">3ml (Sample)</option>
                                            <option value="6ml">6ml (Standard)</option>
                                            <option value="12ml">12ml (Tola)</option>
                                            <option value="24ml">24ml (Double Tola)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="gold-text" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '1rem', display: 'block' }}>QUANTITY</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', padding: '0.5rem 1.5rem' }}>
                                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ background: 'none', border: 'none', color: 'var(--gold-primary)', cursor: 'pointer', fontSize: '1.5rem' }}>-</button>
                                            <span style={{ fontSize: '1.1rem', fontWeight: '600', minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
                                            <button onClick={() => setQuantity(quantity + 1)} style={{ background: 'none', border: 'none', color: 'var(--gold-primary)', cursor: 'pointer', fontSize: '1.2rem' }}>+</button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="btn-lux"
                                    style={{ width: '100%', marginTop: '3rem', padding: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}
                                >
                                    <ShoppingCart size={20} />
                                    <span>Add to Collection</span>
                                </button>
                            </div>

                            {/* Value Props */}
                            <div style={{ marginTop: '3rem', display: 'flex', gap: '3rem', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                                    <ShieldCheck size={14} className="gold-text" />
                                    <span>Purity Guaranteed</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                                    <Truck size={14} className="gold-text" />
                                    <span>Nationwide Curation</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                                    <Info size={14} className="gold-text" />
                                    <span>Artisan Packaging</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
