// This works in React without Node.js backend

const columnService = {
  // Read columns from JSON file using fetch
  async getColumns() {
    try {
      const response = await fetch('/list.json');
      if (!response.ok) {
        throw new Error('Failed to fetch list');
      }
      const jsonData = await response.json();
      return jsonData.list || [];
    } catch (error) {
      console.error('Error reading list JSON:', error);
      // Return default columns if file doesn't exist
      return [
        { id: 1, title: "To Do", position: 0, isDefault: true },
        { id: 2, title: "In Progress", position: 1, isDefault: true },
        { id: 3, title: "Completed", position: 2, isDefault: true }
      ];
    }
  },

  // Note: Adding/removing columns requires backend or localStorage for persistence
  // Using localStorage for now - REPLACE with your backend API later
  async addColumn(title) {
    try {
      const columns = await this.getColumns();
      
      // Check for duplicates
      if (columns.some(col => col.title.toLowerCase() === title.toLowerCase())) {
        throw new Error('Column already exists');
      }

      // Create new column
      const newId = Math.max(...columns.map(col => col.id), 0) + 1;
      const newPosition = Math.max(...columns.map(col => col.position), -1) + 1;
      
      const newColumn = {
        id: newId,
        title: title.trim(),
        position: newPosition,
        isDefault: false
      };

      columns.push(newColumn);

      // Store in localStorage temporarily - REPLACE with backend API call
      const updatedData = { list: columns };
      localStorage.setItem('list', JSON.stringify(updatedData));
      
      return newColumn;
    } catch (error) {
      console.error('Error adding column:', error);
      throw error;
    }
  },

  // Remove column 
  async removeColumn(columnTitle) {
    try {
      const columns = await this.getColumns();
      const columnIndex = columns.findIndex(col => col.title === columnTitle);
      
      if (columnIndex === -1) {
        throw new Error('Column not found');
      }

      if (columns[columnIndex].isDefault) {
        throw new Error('Cannot delete default columns');
      }

      columns.splice(columnIndex, 1);

      // Store in localStorage temporarily - REPLACE with backend API call
      const updatedData = { list: columns };
      localStorage.setItem('list', JSON.stringify(updatedData));
      
      return true;
    } catch (error) {
      console.error('Error removing column:', error);
      throw error;
    }
  },

  // Get columns from localStorage if available, otherwise from JSON file
  async getColumnsWithLocalStorage() {
    try {
      const localData = localStorage.getItem('list');
      if (localData) {
        const parsedData = JSON.parse(localData);
        return parsedData.list || [];
      }
      return await this.getColumns();
    } catch (error) {
      console.error('Error getting columns:', error);
      return await this.getColumns();
    }
  }
};

// Update the getColumns method to check localStorage first
columnService.getColumns = columnService.getColumnsWithLocalStorage;

export default columnService;