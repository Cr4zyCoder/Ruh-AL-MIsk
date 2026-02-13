import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloating = () => {
    const businessNumber = "6371585872";

    const handleClick = () => {
        const message = "Greetings Ruh Al-Misk. I have a query regarding a fragrance manifestation.";
        window.open(`https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            style={{
                position: 'fixed',
                bottom: '3rem',
                right: '3rem',
                zIndex: 1000,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(18, 140, 126, 0.3)',
                border: '1px solid rgba(255,255,255,0.2)'
            }}
        >
            <MessageCircle size={28} />

            {/* Pulsing indicator */}
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: '#25D366',
                    zIndex: -1
                }}
            />
        </motion.div>
    );
};

export default WhatsAppFloating;
