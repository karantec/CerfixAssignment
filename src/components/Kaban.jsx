// src/components/Kanban.js
import  { useState } from 'react';
import useStore from '../store';

const Kanban = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { tickets, groupBy, sortBy, setGroupBy, setSortBy } = useStore();
  
  const priorityLabels = {
    0: 'No Priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent',
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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
      // Render tickets grouped by status
      // You can customize this logic based on your requirements
      const groupedTickets = {};

      sortedTickets.forEach((ticket) => {
        if (!groupedTickets[ticket.status]) {
          groupedTickets[ticket.status] = [];
        }
        groupedTickets[ticket.status].push(ticket);
      });

      return Object.entries(groupedTickets).map(([status, tickets]) => (
        <div key={status}>
          <h2>{status}</h2>
          {renderTicketList(tickets)}
        </div>
      ));
    } else if (groupBy === 'user') {
      // Render tickets grouped by user
      // You can customize this logic based on your requirements
      const groupedTickets = {};

      sortedTickets.forEach((ticket) => {
        if (!groupedTickets[ticket.user]) {
          groupedTickets[ticket.user] = [];
        }
        groupedTickets[ticket.user].push(ticket);
      });

      return Object.entries(groupedTickets).map(([user, tickets]) => (
        <div key={user}>
          <h2>{user}</h2>
          {renderTicketList(tickets)}
        </div>
      ));
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
          <h2>{`Priority ${priority}`}</h2>
          {renderTicketList(tickets)}
        </div>
      ));
    }

    return null;
  };

  const renderTicketList = (tickets) => {
    // Render the list of tickets
    // You can customize this logic based on your requirements
    return (
      <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <div className='max-w-sm rounded overflow-hidden shadow-lg'>
            <div className="px-6 py-4">
            <strong>{` ${priorityLabels[ticket.priority] || ''}`}</strong>
              <p>{` ${ticket.id}`}</p>
              <p className='font-bold text-xl mb-2'>{ticket.title}</p>
              <div className='flex flex-row'>{`${ticket.tag}`}</div>
             
              </div>
            </div>
          </li>
        ))}
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: darkMode ? '#000000' : '#fff', color: darkMode ? 'white' : 'black' }}  >
      <div className="flex flex-row">
        <label>
          Group By:
          <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </label>
        <button className='right'  onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
      </div>
      
      <div className='flex'>
        <label>
          Sort By:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
        <div className='flex justify-end'>  </div>
      <div>
      </div>
     
      </div>
     
      
     
      {renderTickets()}
      </div>
      
  );
};

export default Kanban;
