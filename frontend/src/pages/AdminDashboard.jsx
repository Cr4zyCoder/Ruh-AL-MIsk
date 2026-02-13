import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Search, ExternalLink, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/products');
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to remove this fragrance from the collection?")) {
            try {
                await axios.delete(`/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                alert("Failed to delete product.");
            }
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="section-spacing" style={{ background: 'var(--navy-obsidian)', minHeight: '100vh', paddingTop: '10rem' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                    <div>
                        <span className="hero-subtitle" style={{ fontSize: '0.8rem' }}>House of Misk</span>
                        <h1 className="shimmer-text" style={{ fontSize: '3rem', marginTop: '0.5rem' }}>Management Console</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <Link to="/admin/analytics" className="btn-lux" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem 2.5rem', background: 'transparent', border: '1px solid var(--gold-muted)' }}>
                            Store Intelligence
                        </Link>
                        <Link to="/admin/orders" className="btn-lux" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem 2.5rem', background: 'transparent', border: '1px solid var(--gold-muted)' }}>
                            View Acquisitions
                        </Link>
                        <Link to="/admin/product/new" className="btn-lux" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem 2.5rem' }}>
                            <Plus size={20} />
                            Add New Fragrance
                        </Link>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '2rem', marginBottom: '4rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <Search size={20} className="gold-text" />
                    <input
                        type="text"
                        placeholder="Search collection by name or family..."
                        className="lux-input"
                        style={{ border: 'none', background: 'transparent', padding: '0.5rem' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '10rem' }} className="shimmer-text">Loading Inventory...</div>
                ) : (
                    <div className="glass-panel" style={{ overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
                                    <th style={{ textAlign: 'left', padding: '2rem', color: 'var(--gold-primary)', fontWeight: '600', fontSize: '0.8rem', letterSpacing: '0.1em' }}>FRAGRANCE</th>
                                    <th style={{ textAlign: 'left', padding: '2rem', color: 'var(--gold-primary)', fontWeight: '600', fontSize: '0.8rem', letterSpacing: '0.1em' }}>CATEGORY</th>
                                    <th style={{ textAlign: 'left', padding: '2rem', color: 'var(--gold-primary)', fontWeight: '600', fontSize: '0.8rem', letterSpacing: '0.1em' }}>INVENTORY</th>
                                    <th style={{ textAlign: 'left', padding: '2rem', color: 'var(--gold-primary)', fontWeight: '600', fontSize: '0.8rem', letterSpacing: '0.1em' }}>STATUS</th>
                                    <th style={{ textAlign: 'right', padding: '2rem', color: 'var(--gold-primary)', fontWeight: '600', fontSize: '0.8rem', letterSpacing: '0.1em' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {filteredProducts.map((product) => (
                                        <motion.tr
                                            key={product._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.3s ease' }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <td style={{ padding: '1.5rem 2rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                                    <div className="glass-panel" style={{ width: '60px', height: '60px', overflow: 'hidden', flexShrink: 0 }}>
                                                        <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </div>
                                                    <div>
                                                        <h4 style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{product.name}</h4>
                                                        <span style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontWeight: '600' }}>₹{product.newPrice}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1.5rem 2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{product.category}</td>
                                            <td style={{ padding: '1.5rem 2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{product.stock} Units</td>
                                            <td style={{ padding: '1.5rem 2rem' }}>
                                                <span style={{
                                                    padding: '0.4rem 1rem',
                                                    borderRadius: '100px',
                                                    fontSize: '0.7rem',
                                                    fontWeight: '600',
                                                    background: product.isActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                    color: product.isActive ? '#10b981' : '#ef4444',
                                                    border: `1px solid ${product.isActive ? '#10b981' : '#ef4444'}33`
                                                }}>
                                                    {product.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                                    <Link to={`/admin/product/edit/${product._id}`} className="nav-icon-btn" style={{ padding: '0.7rem' }}><Edit size={18} /></Link>
                                                    <button onClick={() => handleDelete(product._id)} className="nav-icon-btn" style={{ padding: '0.7rem', color: '#ef4444' }}><Trash2 size={18} /></button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>

                        {filteredProducts.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
                                <Package size={48} style={{ opacity: 0.1, marginBottom: '1.5rem' }} />
                                <p>No fragrances matches your search.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
