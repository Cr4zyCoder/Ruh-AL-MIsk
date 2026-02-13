import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, BookOpen, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get('/posts');
                setPosts(data);
            } catch (error) {
                console.error("Error fetching house stories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--navy-obsidian)' }}>
            <div className="shimmer-text" style={{ letterSpacing: '0.4em' }}>UNCURLING ANCIENT SCROLLS...</div>
        </div>
    );

    return (
        <div className="section-spacing" style={{ background: 'var(--navy-obsidian)', minHeight: '100vh', paddingTop: '10rem' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-primary)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '2rem', textTransform: 'uppercase' }}>
                        <ChevronLeft size={14} /> Back to Gallery
                    </Link>
                    <h1 className="shimmer-text" style={{ fontSize: '4rem' }}>The House Blog</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '1.5rem', letterSpacing: '0.1em' }}>CHRONICLES OF FRAGRANCE, HERITAGE, AND MANIFESTATION</p>
                </div>

                {posts.length === 0 ? (
                    <div className="glass-panel" style={{ padding: '5rem', textAlign: 'center' }}>
                        <BookOpen size={48} className="gold-text" style={{ opacity: 0.2, marginBottom: '2rem' }} />
                        <p style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}>THE HOUSE IS PREPARING NEW STORIES...</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '3rem' }}>
                        {posts.map((post, idx) => (
                            <motion.div
                                key={post._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-panel"
                                style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <div style={{ height: '250px', overflow: 'hidden' }}>
                                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', letterSpacing: '0.1em', fontWeight: '700', textTransform: 'uppercase' }}>{post.category}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                                            <Clock size={12} /> {new Date(post.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '1.5rem', lineHeight: '1.4' }}>{post.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.8', marginBottom: '2rem' }}>{post.excerpt}</p>
                                    <div style={{ marginTop: 'auto' }}>
                                        <Link to={`/blog/${post._id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--gold-primary)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                            Read Manifestation <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
