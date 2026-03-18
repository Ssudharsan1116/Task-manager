import React from 'react';

const StatCard = ({ icon: Icon, label, value }) => {
    return (
        <div className="stat-card">
            <div className="stat-icon">
                <Icon size={24} color="#fff" />
            </div>
            <div className="stat-info">
                <span className="stat-label">{label}</span>
                <span className="stat-value">{value}</span>
            </div>
        </div>
    );
};

export default StatCard;
