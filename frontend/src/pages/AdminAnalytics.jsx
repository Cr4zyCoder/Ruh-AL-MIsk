import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    TrendingUp, Users, ShoppingBag,
    ArrowUpRight, Target, Award,
    ChevronLeft, Calendar
} from 'lucide-react';

const AdminAnalytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data } = await axios.get('/analytics/summary');
                setData(data);
            } catch (error) {
                console.error("Error fetching business intelligence:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--navy-obsidian)' }}>
            <div className="shimmer-text" style={{ letterSpacing: '0.4em' }}>ANALYZING STORE RADIANCE...</div>
        </div>
    );

    const kpiCards = [
        { label: 'Total Volume', val: `₹${data.kpis.totalRevenue.toLocaleString()}`, icon: <TrendingUp size={24} />, trend: '+12%', sub: 'Total Revenue' },
        { label: 'Acquisitions', val: data.kpis.totalOrders, icon: <ShoppingBag size={24} />, trend: '+5%', sub: 'Total Orders' },
        { label: 'House Items', val: data.kpis.totalProducts, icon: <Target size={24} />, trend: 'N/A', sub: 'Active Fragrances' },
        { label: 'AVG Value', val: `₹${parseFloat(data.kpis.averageOrderValue).toLocaleString()}`, icon: <Award size={24} />, trend: '+8%', sub: 'Per Acquisition' }
    ];

    return (
        <div className="section-spacing" style={{ background: 'var(--navy-obsidian)', minHeight: '100vh', paddingTop: '10rem' }}>
            <div className="container" style={{ maxWidth: '1400px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem' }}>
                    <div>
                        <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-primary)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                            <ChevronLeft size={14} /> Management Hub
                        </Link>
                        <h1 className="shimmer-text" style={{ fontSize: '3.5rem' }}>Store Analytics</h1>
                    </div>
                    <div className="glass-panel" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
                        <Calendar size={16} className="gold-text" />
                        <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>LAST 30 DAYS PERFORMANCE</span>
                    </div>
                </div>

                {/* KPI Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
                    {kpiCards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-panel"
                            style={{ padding: '2.5rem' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                <div style={{ background: 'rgba(212, 175, 55, 0.05)', borderRadius: '12px', padding: '1rem', color: 'var(--gold-primary)' }}>{card.icon}</div>
                                <span style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: '700', display: 'flex', alignItems: 'center' }}>
                                    {card.trend} <ArrowUpRight size={14} />
                                </span>
                            </div>
                            <h3 style={{ fontSize: '2.2rem', color: 'white', marginBottom: '0.5rem' }}>{card.val}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{card.sub}</p>
                        </motion.div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem' }}>
                    {/* Top Sellers */}
                    <div className="glass-panel" style={{ padding: '3rem' }}>
                        <h3 className="gold-text" style={{ fontSize: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '3rem' }}>Most Coveted Fragrances</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {data.topSellers.map((prod, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden' }}>
                                        <img src={prod.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ color: 'white', fontSize: '1.1rem' }}>{prod.name}</h4>
                                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{prod.sales} Units Manifested</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)' }}>₹{prod.revenue.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div style={{ width: '150px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                                        <div style={{ width: `${(prod.revenue / data.topSellers[0].revenue) * 100}%`, height: '100%', background: 'var(--gold-primary)', borderRadius: '10px' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Category Distribution */}
                    <div className="glass-panel" style={{ padding: '3rem' }}>
                        <h3 className="gold-text" style={{ fontSize: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '3rem' }}>Olfactory Landscape</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            {data.categoryData.map((cat, idx) => (
                                <div key={idx}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{cat._id}</span>
                                        <span style={{ color: 'var(--gold-primary)', fontSize: '0.9rem' }}>{cat.count} Fragrances</span>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                                        <div style={{ width: `${(cat.count / data.kpis.totalProducts) * 100}%`, height: '100%', background: 'var(--gold-primary)', borderRadius: '10px' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sales Trends Chart (Simplified visual representation) */}
                <div className="glass-panel" style={{ marginTop: '4rem', padding: '3rem' }}>
                    <h3 className="gold-text" style={{ fontSize: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4rem' }}>Manifestation Trends (Last 7 Days)</h3>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', paddingBottom: '2rem' }}>
                        {data.salesTrend.map((day, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '1.5rem' }}>
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${Math.max(20, (day.total / 10000) * 100)}px` }}
                                    style={{ width: '40px', background: 'linear-gradient(to top, var(--gold-primary), var(--gold-light))', borderRadius: '4px' }}
                                />
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{day._id.split('-').slice(1).join('/')}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
