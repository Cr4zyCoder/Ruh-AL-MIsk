import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ShoppingBag, Search, Filter,
    ChevronLeft, Clock, CheckCircle,
    Truck, Package, ExternalLink
} from 'lucide-react';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/orders');
            setOrders(data);
        } catch (error) {
            console.error("Error fetching ordres:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`/orders/${id}/status`, { status });
            fetchOrders();
        } catch (error) {
            alert("Failed to update order status.");
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order._id.includes(searchTerm);
        const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--navy-obsidian)' }}>
            <div className="shimmer-text" style={{ letterSpacing: '0.4em' }}>TRACKING ACQUISITIONS...</div>
        </div>
    );

    const statusColors = {
        'Pending': '#f59e0b',
        'Processing': '#3b82f6',
        'Shipped': '#8b5cf6',
        'Delivered': '#10b981',
        'Cancelled': '#ef4444'
    };

    return (
        <div className="section-spacing" style={{ background: 'var(--navy-obsidian)', minHeight: '100vh', paddingTop: '10rem' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
                    <div>
                        <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-primary)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                            <ChevronLeft size={14} /> Admin Hub
                        </Link>
                        <h1 className="shimmer-text" style={{ fontSize: '3rem' }}>Order Acquisitions</h1>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <div style={{ position: 'relative' }}>
                            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
                            <input
                                type="text"
                                placeholder="Search client or Order ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="lux-input"
                                style={{ paddingLeft: '3rem', width: '300px' }}
                            />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="lux-input"
                            style={{ width: '150px' }}
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {filteredOrders.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '5rem', textAlign: 'center' }}>
                            <ShoppingBag size={48} className="gold-text" style={{ opacity: 0.3, marginBottom: '1.5rem' }} />
                            <p style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}>NO ACQUISITIONS RECORDED</p>
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-panel"
                                style={{ padding: '2.5rem', borderLeft: `4px solid ${statusColors[order.status]}` }}
                            >
                                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', gap: '3rem' }}>
                                    {/* Order Info */}
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                            <span style={{ color: 'var(--gold-primary)', fontWeight: '700', fontSize: '0.8rem' }}>#{order._id.slice(-6).toUpperCase()}</span>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '0.5rem' }}>{order.user?.name}</h3>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{order.shippingAddress.phone}</p>
                                    </div>

                                    {/* Items Preview */}
                                    <div>
                                        <p style={{ fontSize: '0.7rem', color: 'var(--gold-muted)', letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase' }}>Items ({order.orderItems.length})</p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {order.orderItems.slice(0, 2).map((item, idx) => (
                                                <p key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{item.name} <span style={{ color: 'var(--text-muted)' }}>× {item.quantity}</span></p>
                                            ))}
                                            {order.orderItems.length > 2 && <p style={{ fontSize: '0.75rem', color: 'var(--gold-primary)' }}>+ {order.orderItems.length - 2} more items</p>}
                                        </div>
                                    </div>

                                    {/* Financials */}
                                    <div>
                                        <p style={{ fontSize: '0.7rem', color: 'var(--gold-muted)', letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase' }}>Total Amount</p>
                                        <p style={{ fontSize: '1.5rem', color: 'var(--gold-primary)', fontWeight: '700' }}>₹{order.totalPrice.toLocaleString()}</p>
                                        <p style={{ fontSize: '0.7rem', color: '#10b981', marginTop: '0.5rem' }}>Method: {order.paymentMethod}</p>
                                    </div>

                                    {/* Status Controls */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end' }}>
                                        <div style={{
                                            padding: '0.4rem 1.2rem',
                                            borderRadius: '100px',
                                            fontSize: '0.7rem',
                                            fontWeight: '700',
                                            background: `${statusColors[order.status]}20`,
                                            color: statusColors[order.status],
                                            border: `1px solid ${statusColors[order.status]}`
                                        }}>
                                            {order.status.toUpperCase()}
                                        </div>

                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {order.status === 'Pending' && <button onClick={() => updateStatus(order._id, 'Processing')} className="btn-icon-lux" title="Process"><Clock size={16} /></button>}
                                            {order.status === 'Processing' && <button onClick={() => updateStatus(order._id, 'Shipped')} className="btn-icon-lux" title="Ship"><Truck size={16} /></button>}
                                            {order.status === 'Shipped' && <button onClick={() => updateStatus(order._id, 'Delivered')} className="btn-icon-lux" title="Deliver"><CheckCircle size={16} /></button>}
                                            <a href={`https://wa.me/${order.shippingAddress.phone}`} target="_blank" rel="noreferrer" className="btn-icon-lux" title="Contact Client"><ExternalLink size={16} /></a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
