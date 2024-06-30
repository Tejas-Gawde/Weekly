const useStore = create((set, get) => ({
    tasks: [],
    noOfTasks: 0,
    loadTasks: async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const storedNoOfTasks = await AsyncStorage.getItem('noOfTasks');
  
      if (storedTasks) {
        set({ tasks: JSON.parse(storedTasks) });
      }
      if (storedNoOfTasks) {
        set({ noOfTasks: JSON.parse(storedNoOfTasks) });
      }
    }})