import React from 'react';

const ResultDisplay = ({ result }) => {
    if (!result) return null;

    const {
        user_id,
        email_id,
        college_roll_number,
        hierarchies,
        invalid_entries,
        duplicate_edges,
        summary
    } = result;

    return (
        <div className="card">
            <h2>Analysis Results</h2>

            <div className="user-info">
                <div className="info-item">
                    <span className="info-label">User ID</span>
                    <span className="info-value">{user_id}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{email_id}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Roll Number</span>
                    <span className="info-value">{college_roll_number}</span>
                </div>
            </div>

            <div className="results-grid">
                <div className="result-section">
                    <h3>Summary Statistics</h3>
                    <div className="summary-stats">
                        <div className="stat-box">
                            <span className="stat-value">{summary.total_trees}</span>
                            <span className="stat-label">Valid Trees</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-value">{summary.total_cycles}</span>
                            <span className="stat-label">Cycles Detected</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-value">{summary.largest_tree_root || 'N/A'}</span>
                            <span className="stat-label">Largest Root</span>
                        </div>
                    </div>
                </div>

                <div className="result-section">
                    <h3>Data Quality</h3>
                    <div style={{ marginBottom: '1rem' }}>
                        <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Invalid Entries ({invalid_entries.length})</span>
                        <div className="tag-list">
                            {invalid_entries.length > 0 ? (
                                invalid_entries.map((entry, idx) => (
                                    <span key={`inv-${idx}`} className="tag danger">{entry}</span>
                                ))
                            ) : (
                                <span className="tag">None</span>
                            )}
                        </div>
                    </div>
                    
                    <div>
                        <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Duplicate Edges ({duplicate_edges.length})</span>
                        <div className="tag-list">
                            {duplicate_edges.length > 0 ? (
                                duplicate_edges.map((entry, idx) => (
                                    <span key={`dup-${idx}`} className="tag warning">{entry}</span>
                                ))
                            ) : (
                                <span className="tag">None</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="result-section">
                <h3>Hierarchies Generated</h3>
                {hierarchies.length > 0 ? (
                    <div className="json-view">
                        {JSON.stringify(hierarchies, null, 2)}
                    </div>
                ) : (
                    <p style={{ color: 'var(--text-muted)' }}>No valid hierarchies found.</p>
                )}
            </div>
        </div>
    );
};

export default ResultDisplay;
