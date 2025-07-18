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

// --- Reusable Modal Component for Order Details ---
const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;

    const formatLabel = (key) => {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Order Details</h2>
                    <button onClick={onClose} className="modal-close-btn">&times;</button>
                </div>

                <div className="modal-details-grid">
                    {/* Display the cost prominently */}
                    <div className="modal-detail-item" style={{gridColumn: '1 / -1', backgroundColor: 'var(--light-blue)'}}>
                        <p className="label">Total Cost</p>
                        <p style={{fontSize: '1.2rem', color: 'var(--primary-blue)'}}>${order.cost.toFixed(2)}</p>
                    </div>

                    {Object.entries(order).map(([key, value]) => {
                        if (key === 'id' || key === 'cost') return null; // Don't display id or cost again
                        return (
                            <div key={key} className="modal-detail-item">
                                <p className="label">{formatLabel(key)}</p>
                                <p>{value.toString()}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="modal-files-section">
                    <h4>Uploaded Files</h4>
                    <div className="file-item">
                        <FileIcon />
                        <span>my-gerber-file.zip</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const router = useRouter();

    const statuses = [
        { text: 'Waiting for Payment', className: 'status-waiting' },
        { text: 'Preparing', className: 'status-production' },
        { text: 'In Shipping', className: 'status-shipping' },
        { text: 'Delivered', className: 'status-delivered' },
    ];

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        if (!user) {
            router.push('/login');
            return;
        }

        // Use the same 'offers' data but add a mock cost for the demo
        const storedData = JSON.parse(localStorage.getItem('offers')) || [];
        const ordersWithDetails = storedData.map(order => {
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            return {
                ...order,
                cost: order.pcbQty * 7.55, // Mock cost calculation
                status: randomStatus,     // Assign the random status object
            };
        });
        setOrders(ordersWithDetails.reverse());
    }, [router]);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="offers-page-container">
            <h1>My Orders</h1>
            {orders.length > 0 ? (
                <div className="offers-list">
                    {orders.map(order => (
                        // Updated grid to have 5 columns
                        <div key={order.id} className="offer-item offer-item--five-columns" onClick={() => handleViewDetails(order)}>
                            <div className="offer-item-col">
                                <p className="label">Order ID</p>
                                <p>#{order.id}</p>
                            </div>
                            <div className="offer-item-col">
                                <p className="label">Date</p>
                                <p>{new Date(order.id).toLocaleDateString()}</p>
                            </div>
                            <div className="offer-item-col">
                                <p className="label">Items</p>
                                <p>{order.pcbQty} x PCBs</p>
                            </div>
                            {/* New "Cost" column */}
                            <div className="offer-item-col">
                                <p className="label">Cost</p>
                                <p>${order.cost.toFixed(2)}</p>
                            </div>
                            <div className="offer-item-col">
                                <p className="label">Status</p>
                                {/* Updated status text and style */}
                                <p><span className={`${order.status.className}`}>{order.status.text}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have not placed any orders yet.</p>
            )}

            <OrderDetailsModal order={selectedOrder} onClose={handleCloseModal} />
        </div>
    );
}