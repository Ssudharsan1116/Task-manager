import React from 'react';
import { LogOut, Network, Compass } from 'lucide-react';

const Sidebar = ({ user, logout, onNavigateToSelf }) => {
    return (
        <nav className="top-navbar">
            {/* Nav Links */}
            <div className="navbar-nav">
                <button className="nav-link active">
                    <Network size={16} />
                    Network Tree
                </button>
                <button className="nav-link" onClick={onNavigateToSelf}>
                    <Compass size={16} />
                    My Position
                </button>
            </div>

            {/* Right Section */}
            <div className="navbar-right">
                <div className="navbar-user">
                    <div className="navbar-avatar">
                        {user?.username?.[0]?.toUpperCase()}
                    </div>
                    <div className="navbar-user-info">
                        <span className="navbar-username">{user?.username}</span>
                        <span className="navbar-uid">{user?.uid}</span>
                    </div>
                </div>
                <button className="navbar-logout" onClick={logout}>
                    <LogOut size={14} />
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;
