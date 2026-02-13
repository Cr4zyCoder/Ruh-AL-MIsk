import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: 'radial-gradient(circle at center, var(--navy-dark) 0%, var(--navy-obsidian) 100%)'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel"
                style={{ width: '100%', maxWidth: '450px', padding: '4rem 3rem', borderRadius: '1.5rem' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="shimmer-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Legacy</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
                        Establish your membership in the house of Ruh Al-Misk
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            marginBottom: '2rem',
                            fontSize: '0.85rem',
                            border: '1px solid rgba(239, 68, 68, 0.2)'
                        }}
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', color: 'var(--gold-primary)', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                            Full Name
                        </label>
                        <div style={{ position: 'relative' }}>
                            <User style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold-muted)' }} size={18} />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--glass-border)',
                                    padding: '1.2rem 1rem 1.2rem 3.5rem',
                                    color: 'var(--text-primary)',
                                    borderRadius: '0.75rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', color: 'var(--gold-primary)', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                            Email Address
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold-muted)' }} size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--glass-border)',
                                    padding: '1.2rem 1rem 1.2rem 3.5rem',
                                    color: 'var(--text-primary)',
                                    borderRadius: '0.75rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '3rem' }}>
                        <label style={{ display: 'block', color: 'var(--gold-primary)', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                            Secure Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold-muted)' }} size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--glass-border)',
                                    padding: '1.2rem 1rem 1.2rem 3.5rem',
                                    color: 'var(--text-primary)',
                                    borderRadius: '0.75rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-lux"
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
                    >
                        {loading ? 'Processing...' : (
                            <>
                                <span>Begin Journey</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Already an initiate? </span>
                    <Link to="/login" style={{ color: 'var(--gold-primary)', fontWeight: '600', textDecoration: 'none' }}>Return to Library</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
