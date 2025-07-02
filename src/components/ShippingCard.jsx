import React, { useState } from 'react';
import { STATUS_COLORS } from '../../src/lib/constants';

const ShippingCard = ({ shipping, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose(); 
        }, 300); // Espera a que la animación de cierre termine
    };

    if (!shipping) return null;

    const statusLabel = shipping.status?.replace('_', ' ') || 'Desconocido';
    const formattedDate = shipping.updatedAt ? new Date(shipping.updatedAt).toLocaleString() : 'Fecha no disponible';

    return (
        <div className={`transition-opacity duration-300 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} mt-6 p-6 rounded-xl shadow-xl bg-dubraPrimary backdrop-blur-md w-full max-w-md border border-gray-200 relative`}>
            <button
                onClick={handleClose}
                className="absolute top-0 right-4 text-gray-500 hover:text-red-600 text-6xl font-bold cursor-pointer"
                aria-label="Cerrar">
                ×
            </button>

            <h2 className="text-2xl font-semibold mb-4">📦Pedido #{shipping.trackingId}</h2>

            <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-4 ${STATUS_COLORS[shipping.status] || 'bg-gray-100 text-gray-800'}`}>
                Estado: {statusLabel}
            </div>

            <div className="space-y-2 text-dubraText text-base">
                <p>
                    <strong>Origen:</strong> {shipping.fromAddress}
                </p>
                <p>
                    <strong>Destino:</strong> {shipping.toAddress}
                </p>
                <p>
                    <strong>Contacto:</strong> {shipping.contactName || 'N/A'} (
                    {shipping.contactPhone || 'N/A'})
                </p>
                <p>
                    <strong>Transportista:</strong> {shipping.carrier}
                </p>
                <p className="text-sm mt-4">
                    <em>Última actualización:</em> {formattedDate}
                </p>
            </div>
        </div>
    );
};

export default ShippingCard;