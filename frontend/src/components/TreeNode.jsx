import React, { useState } from 'react';

const TreeNode = ({ user, position, isRoot = false, onNodeClick, onReset, depth = 0, branch = null }) => {
    const [expanded, setExpanded] = useState(depth < 1);
    const currentBranch = depth === 0 ? null : (depth === 1 ? position : branch);
    const hasChildren = depth < 3;

    // Empty placeholder for unfilled positions
    if (!user) {
        return (
            <div className="neon-node-cell">
                <div className="neon-placeholder">
                    <span>{position}</span>
                </div>
            </div>
        );
    }

    const childPositions = ['A', 'B', 'C'];

    const handleClick = () => {
        if (isRoot && onReset) {
            onReset();
            return;
        }
        
        // If it can be expanded, toggle it. 
        // If it's already at max depth or has no children, navigate to focus on it.
        if (hasChildren && user.children && user.children.length > 0) {
            setExpanded(!expanded);
        } else if (!isRoot && onNodeClick) {
            onNodeClick(user.uid);
        }
    };

    const branchClass = currentBranch ? `neon-branch-${currentBranch.toLowerCase()}` : '';

    return (
        <table className="neon-tree-table">
            <tbody>
                {/* Row 1: Node */}
                <tr>
                    <td colSpan={hasChildren && expanded ? childPositions.length * 2 : 1} className="neon-node-td">
                        <div className="neon-node-cell">
                            <div
                                className={`neon-node ${isRoot ? 'neon-root' : ''} ${branchClass} ${hasChildren ? 'neon-expandable' : ''}`}
                                onClick={handleClick}
                                title={hasChildren ? (expanded ? 'Click to collapse' : 'Click to expand') : ''}
                            >
                                <span className="neon-node-username">{user.username}</span>
                                <span className="neon-node-uid">#{user.uid}</span>
                                {position && <span className="neon-pos-badge">{position}</span>}
                            </div>
                        </div>
                    </td>
                </tr>

                {hasChildren && expanded && (
                    <>
                        {/* Vertical line down */}
                        <tr>
                            <td colSpan={childPositions.length * 2} className="neon-line-td">
                                <div className="neon-vline"></div>
                            </td>
                        </tr>

                        {/* Horizontal connector */}
                        <tr>
                            {childPositions.map((label, idx) => (
                                <React.Fragment key={label}>
                                    <td className={`neon-line-td ${idx === 0 ? 'neon-hl-empty' : 'neon-hl-full'}`}>
                                        <div className={`neon-hline ${idx === 0 ? 'neon-hline-empty' : 'neon-hline-full'}`}></div>
                                    </td>
                                    <td className={`neon-line-td ${idx === childPositions.length - 1 ? 'neon-hr-empty' : 'neon-hr-full'}`}>
                                        <div className={`neon-hline ${idx === childPositions.length - 1 ? 'neon-hline-empty' : 'neon-hline-full'}`}></div>
                                    </td>
                                </React.Fragment>
                            ))}
                        </tr>

                        {/* Vertical lines into children */}
                        <tr>
                            {childPositions.map((label) => (
                                <td key={label} colSpan={2} className="neon-line-td">
                                    <div className="neon-vline"></div>
                                </td>
                            ))}
                        </tr>

                        {/* Child nodes */}
                        <tr>
                            {childPositions.map((label) => {
                                const child = user.children
                                    ? user.children.find(c => c.position === label)
                                    : null;
                                return (
                                    <td key={label} colSpan={2} className="neon-child-td">
                                        <TreeNode
                                            user={child}
                                            position={label}
                                            onNodeClick={onNodeClick}
                                            onReset={onReset}
                                            depth={depth + 1}
                                            branch={currentBranch || label}
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    </>
                )}
            </tbody>
        </table>
    );
};

export default TreeNode;
