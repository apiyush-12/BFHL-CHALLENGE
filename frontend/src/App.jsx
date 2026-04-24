import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import { submitHierarchies } from './services/api';

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleProcessData = async (data) => {
    setIsLoading(true);
    setError('');
    
    try {
      const responseData = await submitHierarchies(data);
      setResult(responseData);
    } catch (err) {
      setError(err.message || 'An error occurred while processing your request.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Hierarchy Processor</h1>
        <p className="subtitle">SRM Full Stack Engineering Challenge</p>
      </header>
      
      <main>
        {error && <div className="error-message">{error}</div>}
        
        <InputForm onSubmit={handleProcessData} isLoading={isLoading} />
        
        <ResultDisplay result={result} />
      </main>
    </div>
  );
}

export default App;
