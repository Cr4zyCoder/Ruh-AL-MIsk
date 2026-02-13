import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ShoppingBag, ChevronRight, Package,
    Truck, CheckCircle, Clock, ChevronLeft
} from 'lucide-react';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyOrders = async () => {
            try {
                const { data } = await axios.get('/orders/myorders');
                setOrders(data);
            } catch (error) {
                console.error("Error fetching your acquisitions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyOrders();
    }, []);

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--navy-obsidian)' }}>
            <div className="shimmer-text" style={{ letterSpacing: '0.4em' }}>RECALLING ACQUISITIONS...</div>
        </div>
    );

    const statusIcons = {
        'Pending': <Clock size={16} />,
        'Processing': <Package size={16} />,
        'Shipped': <Truck size={16} />,
        'Delivered': <CheckCircle size={16} />
    };

    return (
        <div className="section-spacing" style={{ background: 'var(--navy-obsidian)', minHeight: '100vh', paddingTop: '10rem' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <div style={{ marginBottom: '4rem' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-primary)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                        <ChevronLeft size={14} /> Back to Collection
                    </Link>
                    <h1 className="shimmer-text" style={{ fontSize: '3rem' }}>Your Acquisitions</h1>
                </div>

                {orders.length === 0 ? (
                    <div className="glass-panel" style={{ padding: '5rem', textAlign: 'center' }}>
                        <ShoppingBag size={48} className="gold-text" style={{ opacity: 0.2, marginBottom: '2rem' }} />
                        <h3 className="gold-text" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Your Journey Begins Here</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You haven't added any fragrances to your collection yet.</p>
                        <Link to="/" className="btn-lux">Explore Collection</Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {orders.map((order) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-panel"
                                style={{ padding: '2.5rem' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem' }}>
                                    <div>
                                        <p style={{ fontSize: '0.7rem', color: 'var(--gold-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Order Identified</p>
                                        <p style={{ color: 'white', fontWeight: '700', fontSize: '1rem' }}>#{order._id.slice(-8).toUpperCase()}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.8rem',
                                            color: order.status === 'Delivered' ? '#10b981' : 'var(--gold-primary)',
                                            fontSize: '0.8rem',
                                            fontWeight: '700',
                                            letterSpacing: '0.1em'
                                        }}>
                                            {statusIcons[order.status]}
                                            {order.status.toUpperCase()}
                                        </div>
                                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {order.orderItems.map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                            <div style={{ width: '60px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ color: 'white', fontSize: '1rem' }}>{item.name}</h4>
                                                <p style={{ color: 'var(--gold-muted)', fontSize: '0.75rem' }}>{item.selectedSize} × {item.quantity}</p>
                                            </div>
                                            <span style={{ color: 'var(--gold-primary)', fontWeight: '600' }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Acquisition Total</span>
                                    <span style={{ color: 'var(--gold-primary)', fontSize: '1.4rem', fontWeight: '700' }}>₹{order.totalPrice.toLocaleString()}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
