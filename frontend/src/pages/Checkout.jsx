import axios from 'axios';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: '',
        address: '',
        city: '',
        pincode: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleWhatsAppCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Create Order in Backend
            const orderPayload = {
                orderItems: cartItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    image: item.images[0],
                    price: item.newPrice,
                    selectedSize: item.selectedSize,
                    product: item._id
                })),
                shippingAddress: {
                    fullName: formData.name,
                    address: formData.address,
                    city: formData.city,
                    phone: formData.phone,
                    whatsapp: formData.phone
                },
                paymentMethod: 'COD',
                totalPrice: cartTotal
            };

            await axios.post('/orders', orderPayload);

            // 2. Prepare WhatsApp Content
            const businessNumber = "6371585872";
            let message = `*⚜️ NEW ORDER - RUH AL-MISK ⚜️*\n\n`;
            message += `*Customer Details:*\n`;
            message += `• Name: ${formData.name}\n`;
            message += `• Phone: ${formData.phone}\n`;
            message += `• Address: ${formData.address}, ${formData.city} - ${formData.pincode}\n\n`;

            message += `*Ordered Items:*\n`;
            cartItems.forEach((item, index) => {
                message += `${index + 1}. *${item.name}* (${item.selectedSize})\n`;
                message += `   Qty: ${item.quantity} x ₹${item.newPrice} = ₹${item.quantity * item.newPrice}\n`;
            });

            message += `\n*Order Total: ₹${cartTotal.toLocaleString()}*\n`;
            message += `--------------------------\n`;
            message += `_This order was placed via the Ruh Al-Misk digital boutique._`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;

            // 3. Complete and Redirect
            window.open(whatsappUrl, '_blank');
            clearCart();
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message || "Failed to secure your order essence.");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="section-spacing container" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h2 className="shimmer-text" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Your Collection is Empty</h2>
                <Link to="/" className="btn-lux">Explore Collection</Link>
            </div>
        );
    }

    return (
        <div className="section-spacing" style={{ background: 'var(--navy-obsidian)', minHeight: '100vh', paddingTop: '10rem' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-primary)', fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '3rem', textTransform: 'uppercase' }}>
                    <ChevronLeft size={16} />
                    Back to Gallery
                </Link>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '4rem', alignItems: 'start' }}>
                    {/* Shipping Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-panel"
                        style={{ padding: '3rem' }}
                    >
                        <h2 className="shimmer-text" style={{ fontSize: '2.2rem', marginBottom: '2.5rem' }}>Delivery Essence</h2>

                        <form onSubmit={handleWhatsAppCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--gold-primary)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
                                    <User size={14} /> Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your name"
                                    className="lux-input"
                                />
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--gold-primary)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
                                    <Phone size={14} /> WhatsApp Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="Order updates will be sent here"
                                    className="lux-input"
                                />
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--gold-primary)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
                                    <MapPin size={14} /> Delivery Address
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    placeholder="House No, Street, Landmark"
                                    className="lux-input"
                                    style={{ height: '100px', resize: 'none', paddingTop: '1rem' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div className="form-group">
                                    <label style={{ color: 'var(--gold-primary)', fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '0.8rem', textTransform: 'uppercase' }}>City</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} required className="lux-input" />
                                </div>
                                <div className="form-group">
                                    <label style={{ color: 'var(--gold-primary)', fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '0.8rem', textTransform: 'uppercase' }}>Pincode</label>
                                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required className="lux-input" />
                                </div>
                            </div>

                            <button type="submit" className="btn-lux" disabled={loading} style={{ marginTop: '2rem', padding: '2rem' }}>
                                {loading ? 'Transcending Order...' : 'Confirm via WhatsApp'}
                            </button>
                        </form>
                    </motion.div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 className="gold-text" style={{ fontSize: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>Order Summary</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                                {cartItems.map((item) => (
                                    <div key={`${item._id}-${item.selectedSize}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{item.name} × {item.quantity}</p>
                                            <p style={{ color: 'var(--gold-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>{item.selectedSize}</p>
                                        </div>
                                        <span style={{ color: 'var(--gold-primary)' }}>₹{(item.newPrice * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                                    <span>SUBTOTAL</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                                    <span>SHIPPING</span>
                                    <span style={{ color: '#10b981', fontSize: '0.7rem', letterSpacing: '0.1em' }}>COMPLIMENTARY</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gold-primary)', fontSize: '1.2rem', fontWeight: '700', marginTop: '1rem' }}>
                                    <span>TOTAL</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel" style={{ marginTop: '2rem', padding: '1.5rem', border: '1px dashed var(--gold-muted)', background: 'transparent' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.6' }}>
                                <Send size={12} style={{ marginBottom: '-2px', marginRight: '5px' }} />
                                Clicking confirm will open WhatsApp on your device with your pre-filled order details to secure your selection.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
