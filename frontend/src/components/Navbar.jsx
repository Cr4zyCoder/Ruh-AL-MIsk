import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, User, Search, Menu, X, Instagram, Facebook, Twitter, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { user, logout } = useAuth();
    const { cartCount, setIsCartOpen } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Collections', href: '/' },
        { name: 'House Blog', href: '/blog' },
        { name: 'Oud Guide', href: '/oud-guide' },
        { name: 'Contact', href: '#' },
        ...(user?.role === 'admin' ? [{ name: 'Admin', href: '/admin' }] : [])
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="navbar-content">
                    {/* Menu Button - Mobile */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>

                    {/* Desktop Nav - Left */}
                    <div className="desktop-nav">
                        {navLinks.slice(0, 2).map((link) => (
                            <Link key={link.name} to={link.href} className="nav-link">{link.name}</Link>
                        ))}
                    </div>

                    {/* Logo */}
                    <div className="logo-container">
                        <Link to="/">
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="logo-text shimmer-text"
                            >
                                RUH AL<span className="logo-dash">—</span>MISK
                            </motion.h1>
                        </Link>
                    </div>

                    {/* Desktop Nav - Right */}
                    <div className="desktop-nav">
                        {navLinks.slice(2).map((link) => (
                            <Link key={link.name} to={link.href} className="nav-link">{link.name}</Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="nav-icons">
                        <button className="nav-icon-btn"><Search size={20} /></button>
                        <div className="user-nav" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {user ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Link to="/my-orders" className="nav-link" style={{ fontSize: '0.7rem' }}>{user.name.split(' ')[0]}</Link>
                                    <button onClick={handleLogout} className="nav-icon-btn"><LogOut size={20} /></button>
                                </div>
                            ) : (
                                <Link to="/login" className="nav-icon-btn"><User size={20} /></Link>
                            )}
                        </div>
                        <button onClick={() => setIsCartOpen(true)} className="nav-icon-btn">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mobile-overlay"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="mobile-side-menu glass-panel"
                        >
                            <div className="mobile-menu-header">
                                <button
                                    className="close-menu-btn"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="mobile-menu-links">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                    >
                                        <Link
                                            to={link.href}
                                            className="mobile-nav-link"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                                {user ? (
                                    <button onClick={handleLogout} className="mobile-nav-link" style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--gold-primary)' }}>Logout</button>
                                ) : (
                                    <Link to="/login" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Membership Login</Link>
                                )}
                            </div>

                            <div className="mobile-menu-footer">
                                <p className="footer-subtitle" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold-muted)', marginBottom: '1rem' }}>Follow Our Journey</p>
                                <div className="social-links">
                                    <a href="#" className="social-icon"><Instagram size={18} /></a>
                                    <a href="#" className="social-icon"><Facebook size={18} /></a>
                                    <a href="#" className="social-icon"><Twitter size={18} /></a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
