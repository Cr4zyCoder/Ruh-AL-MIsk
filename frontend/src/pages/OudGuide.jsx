import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Droplets, Flame, Wind, Star } from 'lucide-react';

const OudGuide = () => {
    const chapters = [
        {
            title: "The Source of Liquid Gold",
            desc: "Derived from the dark resinous heartwood of the Aquilaria tree, Oudh is born only when the tree is 'touched' by nature. This rare defense mechanism creates the most complex and expensive aroma known to man.",
            icon: <Droplets size={32} />
        },
        {
            title: "The Art of Aging",
            desc: "Like a fine vintage, Oudh matures. We age our distillations in artisanal glass, allowing the animalic edges to soften into the velvety, multi-layered masterpieces you wear.",
            icon: <Star size={32} />
        },
        {
            title: "Application: The Ritual",
            desc: "Apply to your pulse points. Let the warmth of your skin reveal the Top, Heart, and Base notes over several hours. For maximum projection, apply to damp skin after a ritual wash.",
            icon: <Wind size={32} />
        }
    ];

    return (
        <div className="section-spacing" style={{ background: 'var(--navy-obsidian)', minHeight: '100vh', paddingTop: '10rem' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-primary)', fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '3rem', textTransform: 'uppercase' }}>
                    <ChevronLeft size={16} /> Back to Boutique
                </Link>

                <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                    <span className="hero-subtitle" style={{ fontSize: '1rem', letterSpacing: '0.4em' }}>CHAPTER I</span>
                    <h1 className="shimmer-text" style={{ fontSize: '4rem', marginTop: '1rem' }}>The Oudh Guide</h1>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '2rem auto', lineHeight: '1.8' }}>
                        Exploring the soul of the most precious resource in perfumery. Heritage, myth, and the manifestation of Ruh Al-Misk.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
                    {chapters.map((chapter, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '3rem', alignItems: 'start' }}
                        >
                            <div className="glass-panel" style={{ width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--gold-primary)' }}>
                                {chapter.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '2rem', color: 'white', marginBottom: '1.5rem' }}>{chapter.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '2', fontSize: '1.1rem' }}>{chapter.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="glass-panel" style={{ marginTop: '10rem', padding: '5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2 className="gold-text" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Experience the Essence</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Ready to begin your journey with our artisanal Oudh?</p>
                        <Link to="/" className="btn-lux">Explore the Collection</Link>
                    </div>
                    {/* Background decoration */}
                    <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--gold-primary) 0%, transparent 70%)', opacity: 0.05 }} />
                </div>
            </div>
        </div>
    );
};

export default OudGuide;
