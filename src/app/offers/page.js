'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// --- File Icon Component ---
const FileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
    </svg>
);

// --- Reusable Modal Component for Details ---
const OfferDetailsModal = ({ offer, onClose }) => {
    if (!offer) return null;

    const formatLabel = (key) => {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Offer Details</h2>
                    <button onClick={onClose} className="modal-close-btn">&times;</button>
                </div>

                {/* --- Details Grid --- */}
                <div className="modal-details-grid">
                    {Object.entries(offer).map(([key, value]) => {
                        if (key === 'id') return null;
                        return (
                            <div key={key} className="modal-detail-item">
                                <p className="label">{formatLabel(key)}</p>
                                <p>{value.toString()}</p>
                            </div>
                        );
                    })}
                </div>

                {/* --- NEW Uploaded Files Section --- */}
                <div className="modal-files-section">
                    <h4>Uploaded Files</h4>
                    <div className="file-item">
                        <FileIcon />
                        <span>gerber-file.zip</span>
                    </div>
                </div>

            </div>
        </div>
    );
};


export default function OffersPage() {
    const [offers, setOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        if (!user) {
            router.push('/login');
            return;
        }

        const storedOffers = JSON.parse(localStorage.getItem('offers')) || [];
        setOffers(storedOffers.reverse());
    }, [router]);

    const handleViewDetails = (offer) => {
        setSelectedOffer(offer);
    };

    const handleCloseModal = () => {
        setSelectedOffer(null);
    };

    return (
        <div className="offers-page-container">
            <h1>My Offers</h1>
            {offers.length > 0 ? (
                <div className="offers-list">
                    {offers.map(offer => (
                        <div key={offer.id} className="offer-item" onClick={() => handleViewDetails(offer)}>
                            <div className="offer-item-col">
                                <p className="label">Offer ID</p>
                                <p>#{offer.id}</p>
                            </div>
                            <div className="offer-item-col">
                                <p className="label">Date</p>
                                <p>{new Date(offer.id).toLocaleDateString()}</p>
                            </div>
                            <div className="offer-item-col">
                                <p className="label">Items</p>
                                <p>{offer.pcbQty} x PCBs</p>
                            </div>
                            <div className="offer-item-col">
                                <p className="label">Status</p>
                                <p><span className="offer-status status-waiting">Waiting for Offer</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have not requested any offers yet.</p>
            )}

            <OfferDetailsModal offer={selectedOffer} onClose={handleCloseModal} />
        </div>
    );
}