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
  
  const priorityLabels = {
    0: 'No Priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent',
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const renderTickets = () => {
    // Implement rendering tickets based on the selected group and sort options
    // You can customize this logic based on your requirements
    let sortedTickets = tickets;

    if (sortBy === 'priority') {
      sortedTickets = sortedTickets.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      sortedTickets = sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    else if (sortBy === 'user') {
      // Sort tickets by user name
      sortedTickets = sortedTickets.sort((a, b) => a.user.localeCompare(b.user));
    }
    if (groupBy === 'status') {
      const customStatusOrder = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
      const groupedTickets = Object.fromEntries(customStatusOrder.map((status) => [status, []]));

      // Render tickets grouped by status
      // You can customize this logic based on your requirements
     

      sortedTickets.forEach((ticket) => {
        if (!groupedTickets[ticket.status]) {
          groupedTickets[ticket.status] = [];
        }
        groupedTickets[ticket.status].push(ticket);
      });
      const sortedGroupedTickets = customStatusOrder.map((status) => [
        status,
        groupedTickets[status] || [],
      ]);
      
      return sortedGroupedTickets.map(([status, tickets]) => (
        <div key={status}>
         <h2>{`${status} ${tickets.length}`}</h2>
         {tickets.length > 0 ? renderTicketList(tickets) : " " }
        </div>
      ));
    } else if (groupBy === 'user') {
      // Render tickets grouped by user
      // You can customize this logic based on your requirements
      const groupedTickets = {};

      sortedTickets.forEach((ticket) => {
        const user = users.find((u) => u.id === ticket.userId);
        console.log(user);
        const userName = user ? user.name : 'Unknown';
        if (!groupedTickets[userName]) {
          groupedTickets[userName] = [];
        }
        groupedTickets[userName].push(ticket);
      });

      return(
        <div className='flex rounded overflow-hidden shadow-lg'>
         {Object.entries(groupedTickets).map(([userName, userTickets]) => (
        <div key={userName}>
        <h2>{`${userName} ${userName === 'Cancelled' || userTickets.length > 0 ? userTickets.length : 0}`}</h2>
          {renderTicketList(userTickets)}
        </div>
      ))}
    </div>
  );
    } else if (groupBy === 'priority') {
      // Render tickets grouped by priority
      // You can customize this logic based on your requirements
      const groupedTickets = {};

      sortedTickets.forEach((ticket) => {
        if (!groupedTickets[ticket.priority]) {
          groupedTickets[ticket.priority] = [];
        }
        groupedTickets[ticket.priority].push(ticket);
      });

      return Object.entries(groupedTickets).map(([priority, tickets]) => (
        <div key={priority}>
    <h2>{`${priorityLabels[priority] || ''} ${priority === 'Cancelled' || tickets.length > 0 ? tickets.length : 0}`}</h2>
    {renderTicketList(tickets)}
  </div>
));
    }
  };

  const renderTicketList = (tickets) => {
    // Render the list of tickets
    // You can customize this logic based on your requirements
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
          <Dropdown.Toggle variant="secondary" className='text-black flex flex-row' id="displayDropdown">
          <FontAwesomeIcon icon={faBars} className="mr-2 mt-1" />
            Display
          </Dropdown.Toggle>
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
