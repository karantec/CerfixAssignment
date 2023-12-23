// src/components/Kanban.js
import  { useState } from 'react';
import useStore from '../store';
import './style.css'
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Dropdown} from 'react-bootstrap'
import { faBars   } from '@fortawesome/free-solid-svg-icons';
import { FaCircle } from "react-icons/fa6";
const Kanban = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { tickets, users, groupBy, sortBy, setGroupBy, setSortBy } = useStore();
  
  //set priority labels
  const priorityLabels = {
    0: 'No Priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent',
  };
// set dark mode using toggle and useState
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const renderTickets = () => {
    // Implement rendering tickets based on the selected group and sort options
   
    let sortedTickets = tickets;
//if sort by priority
    if (sortBy === 'priority') {
      sortedTickets = sortedTickets.sort((a, b) => b.priority - a.priority);
      // if sort by title
    } else if (sortBy === 'title') {
      sortedTickets = sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    // if sort by user
    else if (sortBy === 'user') {
      // Sort tickets by user name
      sortedTickets = sortedTickets.sort((a, b) => a.user.localeCompare(b.user));
    }
    // group ny status
    if (groupBy === 'status') {
      //user for custom status order
      const customStatusOrder = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
      const groupedTickets = Object.fromEntries(customStatusOrder.map((status) => [status, []]));

    
     
        //sorted each ticket based on status
      sortedTickets.forEach((ticket) => {
        if (!groupedTickets[ticket.status]) {
          groupedTickets[ticket.status] = [];
        }
        //then push the ticiket to the grouped ticket
        groupedTickets[ticket.status].push(ticket);
      });
      //then map the grouped ticket and render the ticket list
      const sortedGroupedTickets = customStatusOrder.map((status) => [
        status,
        groupedTickets[status] || [],
      ]);
      // render the finalsortedGroupedTickets
      return sortedGroupedTickets.map(([status, tickets]) => (
        <div key={status}>
         <h2>{`${status} ${tickets.length}`}</h2>
         {tickets.length > 0 ? renderTicketList(tickets) : " " }
        </div>
      ));
      // group by user
    } else if (groupBy === 'user') {
      
      const groupedTickets = {};
      // sort by user  by matching id with ticket id 
      sortedTickets.forEach((ticket) => {
        const user = users.find((u) => u.id === ticket.userId);
        //checking the data  is coming or not
        console.log(user);
        const userName = user ? user.name : 'Unknown';
        // check grouped ticket is there or not
        if (!groupedTickets[userName]) {
          groupedTickets[userName] = [];
        }
        // push the ticket to grouped ticket
        groupedTickets[userName].push(ticket);
      });
      // render the grouped ticket
      return(
        <div className='flex rounded overflow-hidden shadow-lg'>
         {Object.entries(groupedTickets).map(([userName, userTickets]) => (
        <div key={userName}>
        <h2>{`${userName} ${userName === 'Cancelled' || userTickets.length > 0 ? userTickets.length : 0}`}</h2>
          {renderTicketList(userTickets)}
        </div>
      ))}
    </div>
  );  //based on priority
    } else if (groupBy === 'priority') {
      
      const groupedTickets = {};
      //sort by priority
      sortedTickets.forEach((ticket) => {
        if (!groupedTickets[ticket.priority]) {
          groupedTickets[ticket.priority] = [];
        } 
        //after sort put it in grouped ticket
        groupedTickets[ticket.priority].push(ticket);
      });
      //render it 
      return Object.entries(groupedTickets).map(([priority, tickets]) => (
        <div key={priority}>
    <h2>{`${priorityLabels[priority] || ''} ${priority === 'Cancelled' || tickets.length > 0 ? tickets.length : 0}`}</h2>
    {renderTicketList(tickets)}
  </div>
));
    }
  };

  const renderTicketList = (tickets) => {
  //  render the tickest list
    return (
      <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      
        {tickets.map((ticket) => (
          <ol key={ticket.id}>
            <div className='max-w-sm rounded overflow-hidden shadow-lg flex flex-row'>
            <div className="px-6 py-4">
            
              <p>{` ${ticket.id}`}</p>
              <div className='font-bold text-xl mb-2 flex flex-row'>
                  <FaCircle className='mr-2 text-yellow-500'  /> 
                  <span className='text-sm'>{ticket.title}</span>
                </div>
                <div className='flex flex-row items-center'>
              <button className='border border-gray-300 rounded-md text-gray-400  mt-2 p-2 flex flex-row '> 
              <FaCircle className='mr-3 ml-3'/>
              {`${ticket.tag}`}
             
              </button>
              
              </div>
              </div>
            </div>
          </ol>
        ))}
      </div>
    );
  };

  return (
    <>
      <nav className={`navbar ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <Dropdown className="mx-2">
        {/* Display Button */}
          <Dropdown.Toggle variant="secondary" className='text-black flex flex-row' id="displayDropdown">
          <FontAwesomeIcon icon={faBars} className="mr-2 mt-1" />
            Display
          </Dropdown.Toggle>
          {/* Dropdown Menu */}
          <Dropdown.Menu>
            <label className="dropdown-items ml-3">
              Grouping:
              <select
                className="form-selects"
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </label>
            <label className="dropdown-items ml-3">
              Ordering
              <select
                className="form-selects"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </label>
          </Dropdown.Menu>
        </Dropdown>
        {/* Dark and Light Mode feature */}
        <button className={`btn ${darkMode ? 'btn-light' : 'btn-dark'}`} onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>

      <div className={`flex flex-row ${darkMode ? 'dark-mode' : ''}`}>
          {renderTickets()}
        </div>
    </>
  );
};

export default Kanban;
