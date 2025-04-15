import { supabase, handleSupabaseError } from './supabase';

// Generic database operations using Supabase
export const databaseService = {
  // Fetch data from a table
  select: async (table: string, columns: string = '*', query: any = {}) => {
    try {
      let queryBuilder = supabase
        .from(table)
        .select(columns);
      
      // Apply filters if provided
      if (query.filters) {
        for (const filter of query.filters) {
          queryBuilder = queryBuilder.filter(
            filter.column,
            filter.operator,
            filter.value
          );
        }
      }
      
      // Apply equals conditions
      if (query.eq) {
        for (const [column, value] of Object.entries(query.eq)) {
          queryBuilder = queryBuilder.eq(column, value);
        }
      }
      
      // Apply ordering
      if (query.orderBy) {
        queryBuilder = queryBuilder.order(
          query.orderBy.column,
          { ascending: query.orderBy.ascending }
        );
      }
      
      // Apply pagination
      if (query.limit) {
        queryBuilder = queryBuilder.limit(query.limit);
      }
      
      if (query.offset) {
        queryBuilder = queryBuilder.range(
          query.offset,
          query.offset + (query.limit || 10) - 1
        );
      }
      
      // Execute the query
      const { data, error } = await queryBuilder;
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },
  
  // Insert data into a table
  insert: async (table: string, data: any) => {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select();
      
      if (error) throw error;
      return { data: result, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },
  
  // Update data in a table
  update: async (table: string, data: any, match: any) => {
    try {
      let queryBuilder = supabase
        .from(table)
        .update(data);
      
      // Apply match conditions
      for (const [column, value] of Object.entries(match)) {
        queryBuilder = queryBuilder.eq(column, value);
      }
      
      const { data: result, error } = await queryBuilder.select();
      
      if (error) throw error;
      return { data: result, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },
  
  // Delete data from a table
  delete: async (table: string, match: any) => {
    try {
      let queryBuilder = supabase
        .from(table)
        .delete();
      
      // Apply match conditions
      for (const [column, value] of Object.entries(match)) {
        queryBuilder = queryBuilder.eq(column, value);
      }
      
      const { error } = await queryBuilder;
      
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },
  
  // Execute a raw RPC call
  rpc: async (functionName: string, params: any) => {
    try {
      const { data, error } = await supabase
        .rpc(functionName, params);
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  }
};