
import create from 'zustand';

const useStore = create((set) => ({
  tickets: [],
  groupBy: 'status',
  sortBy: 'priority',

  setTickets: (tickets) => set({ tickets }),
  setGroupBy: (groupBy) => set({ groupBy }),
  setSortBy: (sortBy) => set({ sortBy }),
}));

export default useStore;
