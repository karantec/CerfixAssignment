// src/App.js
import  { useEffect } from 'react';
import Kanban from './components/Kaban';
import "./App.css";
import useStore from './store';

const API_URL = 'https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers';

const App = () => {
  const { setTickets } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // console.log(data);
        setTickets(data.tickets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setTickets]);

  return (
    <div>
      <Kanban />
    </div>
  );
};

export default App;
