
import {create} from 'zustand';

const useStore = create((set) => ({
  tickets: [],
  users:[],
  groupBy: 'status',
  sortBy: 'priority',

  setTickets: (tickets) => set({ tickets }),
  setUsers: (users) => set({ users }),
  setGroupBy: (groupBy) => set({ groupBy }),
  setSortBy: (sortBy) => set({ sortBy }),
}));

export default useStore;
