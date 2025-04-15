import { databaseService as supabaseDatabaseService } from '../api/databaseSupabase';

// Generic database service that uses the Supabase implementation
export const databaseService = {
  // Fetch data from a table
  fetchData: async (table: string, columns: string = '*', query: any = {}) => {
    return await supabaseDatabaseService.select(table, columns, query);
  },
  
  // Insert data into a table
  createData: async (table: string, data: any) => {
    return await supabaseDatabaseService.insert(table, data);
  },
  
  // Update data in a table
  updateData: async (table: string, data: any, match: any) => {
    return await supabaseDatabaseService.update(table, data, match);
  },
  
  // Delete data from a table
  deleteData: async (table: string, match: any) => {
    return await supabaseDatabaseService.delete(table, match);
  },
  
  // Execute a custom function
  executeFunction: async (functionName: string, params: any) => {
    return await supabaseDatabaseService.rpc(functionName, params);
  }
};