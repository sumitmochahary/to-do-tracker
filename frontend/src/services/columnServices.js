const fs = require('fs').promises;
const path = require('path');

// Path to your JSON file - REPLACE THIS LINE when switching to MongoDB
const COLUMNS_JSON_PATH = path.join(__dirname, '../data/columns.json');

const columnService = {
  // Read columns from JSON file
  async getColumns() {
    try {
      const data = await fs.readFile(COLUMNS_JSON_PATH, 'utf8');
      const jsonData = JSON.parse(data);
      return jsonData.columns || [];
    } catch (error) {
      console.error('Error reading columns JSON:', error);
      // Return default columns if file doesn't exist
      return [
        { id: 1, title: "To Do", position: 0, isDefault: true },
        { id: 2, title: "In Progress", position: 1, isDefault: true },
        { id: 3, title: "Completed", position: 2, isDefault: true }
      ];
    }
  },

  // Add new column to JSON file
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

      // Write back to JSON file - REPLACE THIS SECTION for MongoDB
      await fs.writeFile(COLUMNS_JSON_PATH, JSON.stringify({ columns }, null, 2));
      
      return newColumn;
    } catch (error) {
      console.error('Error adding column:', error);
      throw error;
    }
  },

  // Remove column from JSON file
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

      // Write back to JSON file - REPLACE THIS SECTION for MongoDB
      await fs.writeFile(COLUMNS_JSON_PATH, JSON.stringify({ columns }, null, 2));
      
      return true;
    } catch (error) {
      console.error('Error removing column:', error);
      throw error;
    }
  }
};

module.exports = columnService;