import React from 'react';
import TreeNode from './TreeNode';
import { ArrowLeft } from 'lucide-react';
import './TriLinkTree.css';

const TriLinkTree = ({ data, onNodeClick, isViewingSelf, onReset }) => {
    if (!data) return <div className="tree-empty">No tree data available.</div>;

    return (
        <div className="neon-tree-wrapper">
            <div className="tree-top-bar">
                <div className="tree-top-left">
                    <h2 className="tree-heading">Network Tree</h2>
                    <p className="tree-viewing">
                        Viewing: <strong>{data.username}</strong>
                        {!isViewingSelf && (
                            <button className="tree-back-btn" onClick={onReset}>
                                <ArrowLeft size={14} />
                                Back to my tree
                            </button>
                        )}
                    </p>
                </div>
            </div>
            <div className="tree-scroll-area">
                <div className="tree-center">
                    <TreeNode user={data} isRoot={true} onNodeClick={onNodeClick} onReset={onReset} />
                </div>
            </div>
        </div>
    );
};

export default TriLinkTree;
