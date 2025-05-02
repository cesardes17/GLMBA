import { DatabaseSupabase } from '@/src/api/databaseSupabase';

export type DatabaseServiceResponse<T> = {
  data: T | null;
  error: string | null;
};

export const DatabaseService = {
  async getAll<T>(table: string): Promise<DatabaseServiceResponse<T[]>> {
    const { data, error } = await DatabaseSupabase.getAll<T>(table);
    if (error) {
      return { data: null, error: error.message };
    }
    return { data, error: null };
  },

  async getById<T>(
    table: string,
    column: string,
    id: string | number
  ): Promise<DatabaseServiceResponse<T>> {
    const { data, error } = await DatabaseSupabase.getById<T>(
      table,
      column,
      id
    );
    if (error) {
      console.error('Error fetching user:', error);
      return { data: null, error: error.message };
    }

    if (!data) {
      console.error('No user found with the given ID');
      return { data: null, error: 'No user found with the given ID' };
    }

    return { data, error: null };
  },

  async insert<TInsert, TReturn>(
    table: string,
    payload: TInsert | TInsert[]
  ): Promise<DatabaseServiceResponse<TReturn[]>> {
    const { data, error } = await DatabaseSupabase.insert<TInsert, TReturn>(
      table,
      payload
    );
    if (error) {
      return { data: null, error: error.message };
    }
    return { data, error: null };
  },

  async updateById<T>(
    table: string,
    id: string | number,
    updates: Partial<T>
  ): Promise<DatabaseServiceResponse<T>> {
    const { data, error } = await DatabaseSupabase.updateById<T>(
      table,
      id,
      updates
    );
    if (error) {
      return { data: null, error: error.message };
    }
    return { data, error: null };
  },

  async deleteById(
    table: string,
    id: string | number
  ): Promise<DatabaseServiceResponse<null>> {
    const { data, error } = await DatabaseSupabase.deleteById(table, id);
    if (error) {
      return { data: null, error: error.message };
    }
    return { data, error: null };
  },

  async getByField<T>(
    table: string,
    field: string,
    value: string | number | boolean
  ): Promise<DatabaseServiceResponse<T[]>> {
    const { data, error } = await DatabaseSupabase.getByField<T>(
      table,
      field,
      value
    );
    if (error) {
      return { data: null, error: error.message };
    }
    return { data, error: null };
  },

  async getByFields<T>(
    table: string,
    conditions: { key: string; operator?: 'eq'; value: string | number }[]
  ): Promise<DatabaseServiceResponse<T[]>> {
    const { data, error } = await DatabaseSupabase.getByFields<T>(
      table,
      conditions
    );
    if (error) {
      return { data: null, error: error.message };
    }
    return { data, error: null };
  },

  async callRpc<T, P = any>(
    fnName: string,
    params?: P
  ): Promise<DatabaseServiceResponse<T>> {
    const { data, error } = await DatabaseSupabase.callRpc<T, P>(
      fnName,
      params
    );
    if (error) {
      return { data: null, error: error.message };
    }
    return { data, error: null };
  },

  async getWithRelations<T>(
    table: string,
    relationQuery: string,
    filter?: { column: string; value: string }
  ): Promise<DatabaseServiceResponse<T[]>> {
    const { data, error } = await DatabaseSupabase.getWithRelations<T>(
      table,
      relationQuery,
      filter
    );
    if (error) {
      return { data: null, error: error.message };
    }
    return { data, error: null };
  },

  async getPaginatedData<T>(
    table: string,
    options: any
  ): Promise<DatabaseServiceResponse<T[]>> {
    try {
      const data = await DatabaseSupabase.getPaginatedData<T>(table, options);
      return { data, error: null };
    } catch (error) {
      return { data: null, error: (error as Error).message };
    }
  },
};
