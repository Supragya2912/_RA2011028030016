import './App.css';
import { useCallback, useEffect, useState } from 'react';
import TrainSchedule from './TrainSchedules/TrainSchedule';
import { getToken } from './api';

function App() {
  // const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI3MTEwMDksImNvbXBhbnlOYW1lIjoiU3VwcmFneWEgUmFpbHdheSBDb21wYW55IiwiY2xpZW50SUQiOiJlMzEyNDgwMS1kYmNiLTQ3YzEtYmM3Zi1kOGE5NzJkNjE0MDAiLCJvd25lck5hbWUiOiIiLCJvd25lckVtYWlsIjoiIiwicm9sbE5vIjoiUkEyMDExMDI4MDMwMDE2In0.GNth98vfJtcNI1x7EB8xTXcAlAqnWudtW1j-jLf2t-o');
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    async function getTokenFromApi() {
      const token = await getToken();
      setToken(token);
    };

    getTokenFromApi();
    
  }, []);
      
  return (
    <TrainSchedule token={token}/>
  );
}

export default App;
