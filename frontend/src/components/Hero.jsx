import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-bg" />
            <div className="hero-pattern" />
            <div className="hero-glow" />

            <div className="container">
                <div className="hero-content">
                    <div className="hero-text-box">
                        <motion.span
                            initial={{ opacity: 0, letterSpacing: '1em' }}
                            animate={{ opacity: 1, letterSpacing: '0.5em' }}
                            transition={{ duration: 1.5 }}
                            className="hero-subtitle"
                        >
                            Essence of the Orient
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="hero-title"
                        >
                            <span className="shimmer-text">Divine</span> <br />
                            <span className="italic-serif">Artistry</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="hero-description"
                            style={{ fontSize: '1.2rem', fontWeight: '300', color: 'var(--text-secondary)' }}
                        >
                            Discover artisanal attars crafted from the rarest botanical treasures,
                            aged to perfection in the heart of Odisha.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1 }}
                            className="hero-actions"
                        >
                            <button className="btn-lux">Explore Collection</button>
                            <button className="btn-outline-lux">Our Heritage</button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Elegant Decorative Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 2 }}
                className="hero-background-pattern"
                style={{
                    position: 'absolute',
                    right: '-5%',
                    bottom: '-10%',
                    width: '50%',
                    height: '100%',
                    background: "url('https://www.transparenttextures.com/patterns/arabesque.png')",
                    maskImage: 'radial-gradient(circle, black, transparent 80%)',
                    zIndex: -1
                }}
            />
        </section>
    );
};

export default Hero;
