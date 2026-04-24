import React, { useState } from 'react';

const InputForm = ({ onSubmit, isLoading }) => {
    const [inputValue, setInputValue] = useState('["A->B", "A->C", "B->D"]');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        try {
            let parsedData;
            const trimmed = inputValue.trim();
        
            if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
                parsedData = JSON.parse(trimmed);
                if (!Array.isArray(parsedData)) {
                    throw new Error("Input must be a JSON array of strings.");
                }
            } else {
                parsedData = trimmed.split(',').map(s => s.trim()).filter(Boolean);
            }

            onSubmit(parsedData);
        } catch (err) {
            setError('Invalid JSON format. Please provide an array of strings like ["A->B", "A->C"].');
        }
    };

    return (
        <div className="card">
            <h2>Process Hierarchies</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="edges">Enter Edges (JSON Array or comma-separated)</label>
                    <textarea 
                        id="edges"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder='["A->B", "A->C", "B->D"]'
                        disabled={isLoading}
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button 
                    type="submit" 
                    className="btn" 
                    disabled={isLoading || !inputValue.trim()}
                >
                    {isLoading ? (
                        <>
                            <span className="loader"></span>
                            Processing...
                        </>
                    ) : (
                        'Process Data'
                    )}
                </button>
            </form>
        </div>
    );
};

export default InputForm;
