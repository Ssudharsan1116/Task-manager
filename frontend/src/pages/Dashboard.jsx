import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import TriLinkTree from '../components/TriLinkTree';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import apiClient from '../api/apiClient';
import { Users, GitBranch, Layers } from 'lucide-react';

const countNodes = (node) => {
    if (!node) return 0;
    let count = 1;
    if (node.children) {
        node.children.forEach(child => {
            count += countNodes(child);
        });
    }
    return count;
};

const countDirect = (node) => {
    if (!node || !node.children) return 0;
    return node.children.length;
};

const getDepth = (node) => {
    if (!node || !node.children || node.children.length === 0) return 0;
    let maxChildDepth = 0;
    node.children.forEach(child => {
        const d = getDepth(child);
        if (d > maxChildDepth) maxChildDepth = d;
    });
    return 1 + maxChildDepth;
};

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewUid, setViewUid] = useState(null);

    const fetchData = useCallback(async (uid) => {
        try {
            const targetUid = uid || user?.uid;
            const treeRes = await apiClient.get(`/tree/subtree/${targetUid}`);
            setTreeData(treeRes.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data', err);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchData(viewUid);
        }
    }, [user, fetchData, viewUid]);

    const handleNavigateToSelf = () => {
        setViewUid(user.uid);
    };

    const handleNavigateToUser = (uid) => {
        setViewUid(uid);
    };

    if (loading) return (
        <div className="loading-screen">
            <div className="loader-ring"></div>
            <span className="loading-text">Loading your network…</span>
        </div>
    );

    const totalMembers = treeData ? countNodes(treeData) : 0;
    const directRefs = treeData ? countDirect(treeData) : 0;
    const depth = treeData ? getDepth(treeData) : 0;

    return (
        <div className="dashboard-layout">
            {/* Top Navbar */}
            <Sidebar
                user={user}
                logout={logout}
                onNavigateToSelf={handleNavigateToSelf}
            />

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div>
                        <h1 className="dashboard-greeting">
                            Welcome, <span>{user?.username}</span>
                        </h1>
                        <p className="dashboard-subtitle">Your trilink network overview</p>
                    </div>
                </header>

                {/* Stats Row */}
                <div className="stats-bar">
                    <StatCard icon={Users} label="Total Members" value={totalMembers} />
                    <StatCard icon={GitBranch} label="Direct trilinks" value={directRefs} />
                    <StatCard icon={Layers} label="Network Depth" value={depth} />
                </div>

                {/* Tree */}
                <section className="tree-section">
                    {treeData && (
                        <TriLinkTree
                            data={treeData}
                            onNodeClick={handleNavigateToUser}
                            isViewingSelf={viewUid === user?.uid || !viewUid}
                            onReset={handleNavigateToSelf}
                        />
                    )}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
