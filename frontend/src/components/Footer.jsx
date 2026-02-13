import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer" style={{ borderTop: '1px solid var(--glass-border)', padding: '10rem 0 5rem' }}>
            <div className="container">
                <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '8rem' }}>

                    <div className="footer-brand">
                        <h2 className="shimmer-text" style={{ fontSize: '2rem', marginBottom: '2rem' }}>RUH AL—MISK</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: '300', marginBottom: '3rem', maxWidth: '350px' }}>
                            Purveyors of fine Oriental fragrances, connecting legacy and luxury through the art of pure distillation.
                        </p>
                        <div className="social-links" style={{ display: 'flex', gap: '1.5rem' }}>
                            <a href="#" className="social-icon"><Instagram size={20} /></a>
                            <a href="#" className="social-icon"><Facebook size={20} /></a>
                            <a href="#" className="social-icon"><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h3 style={{ fontSize: '0.9rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '2.5rem', color: 'var(--gold-primary)' }}>Collections</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <li><a href="#" className="nav-link" style={{ fontSize: '0.7rem' }}>Oud Reservé</a></li>
                            <li><a href="#" className="nav-link" style={{ fontSize: '0.7rem' }}>Signature Attars</a></li>
                            <li><a href="#" className="nav-link" style={{ fontSize: '0.7rem' }}>Floral Essences</a></li>
                            <li><a href="#" className="nav-link" style={{ fontSize: '0.7rem' }}>Musk Series</a></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h3 style={{ fontSize: '0.9rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '2.5rem', color: 'var(--gold-primary)' }}>Concierge</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <li><a href="#" className="nav-link" style={{ fontSize: '0.7rem' }}>Track Order</a></li>
                            <li><a href="#" className="nav-link" style={{ fontSize: '0.7rem' }}>Gifting Registry</a></li>
                            <li><a href="#" className="nav-link" style={{ fontSize: '0.7rem' }}>Bespoke Consultation</a></li>
                            <li><a href="#" className="nav-link" style={{ fontSize: '0.7rem' }}>Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div className="footer-newsletter">
                        <h3 style={{ fontSize: '0.9rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '2.5rem', color: 'var(--gold-primary)' }}>Mailing List</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
                            Receive exclusive invitations to private releases and scent profiles.
                        </p>
                        <div className="newsletter-input" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                style={{
                                    width: '100%',
                                    background: 'transparent',
                                    border: 'none',
                                    borderBottom: '1px solid var(--glass-border)',
                                    padding: '1rem 0',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.75rem',
                                    letterSpacing: '0.1em'
                                }}
                            />
                            <button style={{ position: 'absolute', right: 0, color: 'var(--gold-primary)' }}>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom" style={{ marginTop: '10rem', paddingTop: '3rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                        © 2026 RUH AL-MISK FRAGRANCES. CRAFTED IN ODISHA.
                    </p>
                    <div className="legal-links" style={{ display: 'flex', gap: '2rem' }}>
                        <a href="#" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>TERMS</a>
                        <a href="#" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>ACCESSIBILITY</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
