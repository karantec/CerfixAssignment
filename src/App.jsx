// src/App.js
import  { useEffect,useState } from 'react';
import Kanban from './components/Kaban';
import "./App.css";
import useStore from './store';

const API_URL = 'https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers';

const App = () => {
  //use  storr from store.js
  const { setTickets, setUsers } = useStore();
  const [selectedUser, setSelectedUser] = useState('');
  //for custom sort order
  const customUserOrder = ['Anoop', 'Yogesh', 'Suresh', 'Shankar', 'Ramesh']; // Define custom user order


  useEffect(() => {

    //fetch data from api
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
       
        const sortedUsers = data.users.sort((a, b) =>
        customUserOrder.indexOf(a.name) - customUserOrder.indexOf(b.name)
      );
      setUsers(sortedUsers);
      setSelectedUser(sortedUsers[0].name);

        // console.log(data);
        setTickets(data.tickets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
//first time calling 
    fetchData();
  }, [setTickets,setUsers]);

  return (
    <div>
      <Kanban />
    </div>
  );
};

export default App;
