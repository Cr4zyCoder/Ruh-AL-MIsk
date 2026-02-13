import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Check } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeGender, setActiveGender] = useState('All');

    const categories = ['All', 'Oudh', 'Musky', 'Floral', 'Woody', 'Citrus', 'Oriental', 'Spicy', 'Fresh'];
    const genders = ['All', 'Male', 'Female', 'Unisex'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/products');
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;

        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        if (activeGender !== 'All') {
            result = result.filter(p => p.gender === activeGender);
        }

        setFilteredProducts(result);
    }, [activeCategory, activeGender, products]);

    return (
        <>
            <Hero />

            <section className="section-spacing" style={{ background: 'var(--navy-obsidian)', position: 'relative' }}>
                <div className="container">
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <span className="hero-subtitle" style={{ fontSize: '0.8rem' }}>Discovery</span>
                        <h2 className="shimmer-text" style={{ fontSize: '4rem', marginTop: '1rem' }}>
                            The Collection
                        </h2>
                    </div>

                    {/* Luxury Filter Bar */}
                    <div className="discovery-filters" style={{ marginBottom: '5rem', display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>

                        {/* Categories */}
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: '0.8rem 1.5rem',
                                        color: activeCategory === cat ? 'var(--gold-primary)' : 'var(--text-muted)',
                                        fontSize: '0.75rem',
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        transition: 'all 0.4s ease'
                                    }}
                                >
                                    {cat}
                                    {activeCategory === cat && (
                                        <motion.div
                                            layoutId="cat-underline"
                                            style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '1px', background: 'var(--gold-primary)' }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Genders */}
                        <div className="glass-panel" style={{ padding: '0.5rem', borderRadius: '100px', display: 'flex', gap: '0.5rem' }}>
                            {genders.map(gender => (
                                <button
                                    key={gender}
                                    onClick={() => setActiveGender(gender)}
                                    style={{
                                        border: 'none',
                                        padding: '0.7rem 2rem',
                                        borderRadius: '100px',
                                        background: activeGender === gender ? 'var(--gold-primary)' : 'transparent',
                                        color: activeGender === gender ? 'var(--navy-obsidian)' : 'var(--text-secondary)',
                                        fontSize: '0.7rem',
                                        letterSpacing: '0.1em',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.4s ease'
                                    }}
                                >
                                    {gender}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '10rem', color: 'var(--gold-primary)' }}>
                            <div style={{ letterSpacing: '0.5em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                                Brewing Excellence...
                            </div>
                        </div>
                    ) : (
                        <>
                            {filteredProducts.length > 0 ? (
                                <AnimatePresence mode="popLayout">
                                    <motion.div
                                        layout
                                        className="product-grid"
                                    >
                                        {filteredProducts.map(product => (
                                            <ProductCard key={product._id} product={product} />
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '10rem', color: 'var(--text-muted)' }}>
                                    <p style={{ letterSpacing: '0.2rem', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                                        No scents matching your criteria.
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    <div style={{ textAlign: 'center', marginTop: '8rem' }}>
                        <button className="btn-outline-lux">View Perpetual Inventory</button>
                    </div>
                </div>
            </section>

            {/* Heritage Section */}
            <section className="section-spacing" style={{ borderTop: '1px solid var(--glass-border)', background: 'linear-gradient(to bottom, var(--navy-obsidian), var(--navy-dark))' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
                        <div>
                            <h2 className="shimmer-text" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>Our Heritage</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem', fontWeight: '300' }}>
                                Rooted in centuries-old traditions, Ruh Al-Misk celebrates the soul of pure oils.
                                Every bottle carries the whisper of the East, processed with uncompromised ethics and modern precision.
                            </p>
                            <button className="btn-lux">Read Our Story</button>
                        </div>

                        <div className="glass-panel" style={{ aspectRatio: '1', position: 'relative', overflow: 'hidden', padding: '1px' }}>
                            <img
                                src="https://images.unsplash.com/photo-1547881338-64674330681b?auto=format&fit=crop&w=1200&q=80"
                                alt="Heritage"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
