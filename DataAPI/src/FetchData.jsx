import React, { useState } from 'react';
import './index.css'

function FetchData() {
    const [apiUrl, setApiUrl] = useState('');
    const [records, setRecords] = useState([]);
    const [error, setError] = useState(null);
//FUNCTION TO FETCH DATA API
    const fetchData = async () => {
        try {
            setError(null);
            setRecords([]);
            if(apiUrl.length==0){
                throw new Error("Enter a Url");
            }
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Enter A Valid URL To Fetch Data');
            }
            const data = await response.json();
            setRecords(data);
        } catch (err) {
            setError(err.message);
        }
    };

//ON SUBMITING THE API URL
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div>
            <h1>Fetch Data From API</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    placeholder="Enter API URL"
                />
                <button type="submit">Fetch Data</button>
            </form>
            {error && <p>Error: {error}</p>}
            <ul>
                {records.map((list, index) => (
                    <li key={index}>
                        <pre>{JSON.stringify(list)}</pre>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FetchData;
