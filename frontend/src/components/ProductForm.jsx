import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, Upload, X, Save, Clock, Wind, Beaker, Tag, Users, Calendar, Box } from 'lucide-react';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditMode);

    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        category: 'Oudh',
        description: '',
        newPrice: '',
        oldPrice: '',
        gender: 'Unisex',
        occasion: [],
        sizeOptions: [
            { size: '3ml', stock: 10 },
            { size: '6ml', stock: 10 },
            { size: '12ml', stock: 5 },
            { size: '24ml', stock: 0 }
        ],
        totalStock: 25,
        longevity: 7,
        projection: 'Moderate',
        notes: {
            top: [],
            heart: [],
            base: []
        },
        status: 'In Stock',
        images: []
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                try {
                    const { data } = await axios.get(`/products/${id}`);
                    setFormData(data);
                    setImagePreviews(data.images || []);
                } catch (error) {
                    alert("Failed to fetch dimensions of this essence.");
                    navigate('/admin');
                } finally {
                    setFetching(false);
                }
            };
            fetchProduct();
        }
    }, [id, isEditMode, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSizeStockChange = (size, stockValue) => {
        const updatedSizes = formData.sizeOptions.map(opt =>
            opt.size === size ? { ...opt, stock: parseInt(stockValue) || 0 } : opt
        );
        const newTotalStock = updatedSizes.reduce((acc, opt) => acc + opt.stock, 0);
        setFormData(prev => ({
            ...prev,
            sizeOptions: updatedSizes,
            totalStock: newTotalStock
        }));
    };

    const handleOccasionToggle = (occ) => {
        setFormData(prev => ({
            ...prev,
            occasion: prev.occasion.includes(occ)
                ? prev.occasion.filter(o => o !== occ)
                : [...prev.occasion, occ]
        }));
    };

    const handleNoteChange = (type, value) => {
        setFormData(prev => ({
            ...prev,
            notes: {
                ...prev.notes,
                [type]: value.split(',').map(note => note.trim())
            }
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + imagePreviews.length > 4) {
            alert("The house limit is 4 visuals per fragrance.");
            return;
        }

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // We'll send the images (URLs or Base64) in the payload
            const payload = { ...formData, images: imagePreviews };

            if (isEditMode) {
                await axios.put(`/products/${id}`, payload);
            } else {
                await axios.post('/products', payload);
            }

            navigate('/admin');
        } catch (error) {
            alert(error.response?.data?.message || "Failed to manifest fragrance.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div style={{ minHeight: '100vh', background: 'var(--navy-obsidian)' }}></div>;

    const categories = ['Woody', 'Floral', 'Oudh', 'Musky', 'Citrus', 'Oriental', 'Spicy', 'Fresh'];
    const occasions = ['Daily Wear', 'Wedding', 'Prayer', 'Office', 'Evening', 'Special Occasion'];

    return (
        <div className="section-spacing" style={{ background: 'var(--navy-obsidian)', minHeight: '100vh', paddingTop: '10rem' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-primary)', fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '3rem', textTransform: 'uppercase' }}>
                    <ChevronLeft size={16} />
                    Inventory Hub
                </Link>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 450px', gap: '5rem', alignItems: 'start' }}>
                    {/* Left Column: Core Identity */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel" style={{ padding: '3rem' }}>
                            <h2 className="shimmer-text" style={{ fontSize: '2.2rem', marginBottom: '2.5rem' }}>Core Identity</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div className="form-group">
                                        <label className="gold-text" style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}><Tag size={12} /> Fragrance Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="lux-input" placeholder="e.g. Royal Oud Al-Sultan" />
                                    </div>
                                    <div className="form-group">
                                        <label className="gold-text" style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}><Tag size={12} /> SKU Identifier</label>
                                        <input type="text" name="sku" value={formData.sku} onChange={handleInputChange} required className="lux-input" placeholder="RM-OUDH-001" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="gold-text" style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>Olfactory Poetry (Story)</label>
                                    <textarea name="description" value={formData.description} onChange={handleInputChange} required className="lux-input" style={{ height: '120px', resize: 'none' }} placeholder="Describe the soul of this fragrance..." />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
                                    <div className="form-group">
                                        <label className="gold-text" style={{ fontSize: '0.7rem', marginBottom: '0.8rem' }}>Scent Family</label>
                                        <select name="category" value={formData.category} onChange={handleInputChange} className="lux-input">
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="gold-text" style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}><Users size={12} /> Gender</label>
                                        <select name="gender" value={formData.gender} onChange={handleInputChange} className="lux-input">
                                            <option value="Unisex">Unisex</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="gold-text" style={{ fontSize: '0.7rem', marginBottom: '0.8rem' }}>New Price (₹)</label>
                                        <input type="number" name="newPrice" value={formData.newPrice} onChange={handleInputChange} required className="lux-input" placeholder="1499" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }} className="glass-panel" style={{ padding: '3rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                                <Beaker className="gold-text" size={24} />
                                <h3 className="shimmer-text" style={{ fontSize: '1.5rem' }}>The Scent Pyramid</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className="form-group">
                                    <label className="gold-text" style={{ fontSize: '0.7rem', marginBottom: '0.8rem' }}>Top Vibrations (Comma separated)</label>
                                    <input type="text" value={formData.notes.top.join(', ')} onChange={(e) => handleNoteChange('top', e.target.value)} className="lux-input" placeholder="Bergamot, Saffron, Rose" />
                                </div>
                                <div className="form-group">
                                    <label className="gold-text" style={{ fontSize: '0.7rem', marginBottom: '0.8rem' }}>Heart Soul (Comma separated)</label>
                                    <input type="text" value={formData.notes.heart.join(', ')} onChange={(e) => handleNoteChange('heart', e.target.value)} className="lux-input" placeholder="Jasmine, Sandalwood" />
                                </div>
                                <div className="form-group">
                                    <label className="gold-text" style={{ fontSize: '0.7rem', marginBottom: '0.8rem' }}>Fundamental Base (Comma separated)</label>
                                    <input type="text" value={formData.notes.base.join(', ')} onChange={(e) => handleNoteChange('base', e.target.value)} className="lux-input" placeholder="Agarwood, Musk, Amber" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Specs & Media */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 className="gold-text" style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem' }}>Visual Identity</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }}>
                                        <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button type="button" onClick={() => removeImage(index)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', borderRadius: '50%', padding: '0.3rem', cursor: 'pointer' }}><X size={12} /></button>
                                    </div>
                                ))}
                                {imagePreviews.length < 4 && (
                                    <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', aspectRatio: '1', border: '1px dashed var(--gold-muted)', borderRadius: '0.5rem', cursor: 'pointer' }}>
                                        <Upload size={24} className="gold-text" />
                                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>UPLOAD</span>
                                        <input type="file" multiple accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                    </label>
                                )}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }} className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 className="gold-text" style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem' }}>Inventory Matrix</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {formData.sizeOptions.map((opt) => (
                                    <div key={opt.size} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{opt.size} Stock</label>
                                        <input
                                            type="number"
                                            value={opt.stock}
                                            onChange={(e) => handleSizeStockChange(opt.size, e.target.value)}
                                            className="lux-input"
                                            style={{ width: '80px', padding: '0.5rem' }}
                                        />
                                    </div>
                                ))}
                                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--gold-primary)', fontSize: '0.8rem', fontWeight: '700' }}>TOTAL UNITS</span>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{formData.totalStock}</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }} className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 className="gold-text" style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem' }}>Occasions</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                {occasions.map(occ => (
                                    <button
                                        key={occ}
                                        type="button"
                                        onClick={() => handleOccasionToggle(occ)}
                                        style={{
                                            padding: '0.6rem 1.2rem',
                                            borderRadius: '100px',
                                            fontSize: '0.7rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            background: formData.occasion.includes(occ) ? 'var(--gold-primary)' : 'rgba(255,255,255,0.03)',
                                            color: formData.occasion.includes(occ) ? 'var(--navy-primary)' : 'var(--text-secondary)',
                                            border: `1px solid ${formData.occasion.includes(occ) ? 'var(--gold-primary)' : 'var(--glass-border)'}`
                                        }}
                                    >
                                        {occ}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        <button type="submit" className="btn-lux" disabled={loading} style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                            <Save size={20} />
                            {loading ? 'MANIFESTING...' : (isEditMode ? 'SECURE ESSENCE' : 'MANIFEST FRAGRANCE')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
