import { supabase, handleSupabaseError } from './supabase';
import { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

// Realtime operations using Supabase
export const realtimeService = {
  // Subscribe to changes on a table
  subscribeToTable: (
    table: string,
    event: 'INSERT' | 'UPDATE' | 'DELETE' | '*' = '*',
    callback: (payload: any) => void
  ) => {
    try {
      const channel = supabase
        .channel(`public:${table}`)
        .on(
          'postgres_changes' as any,
          {
            event: event,
            schema: 'public',
            table: table
          },
          (payload) => callback(payload)
        )
        .subscribe();
      
      return { channel, error: null };
    } catch (error) {
      return { channel: null, error: (error as Error).message };
    }
  },

  // Subscribe to changes on a specific row
  subscribeToRecord: (
    table: string,
    column: string,
    value: string,
    event: 'INSERT' | 'UPDATE' | 'DELETE' | '*' = '*',
    callback: (payload: any) => void
  ) => {
    try {
      const channel = supabase
        .channel(`public:${table}:${column}=eq.${value}`)
        .on(
          'postgres_changes' as any,
          { 
            event: event, 
            schema: 'public', 
            table: table,
            filter: `${column}=eq.${value}`
          },
          (payload) => callback(payload)
        )
        .subscribe();
      
      return { channel, error: null };
    } catch (error) {
      return { channel: null, error: (error as Error).message };
    }
  },

  // Unsubscribe from a channel
  unsubscribe: (channel: RealtimeChannel) => {
    try {
      supabase.removeChannel(channel);
      return { error: null };
    } catch (error) {
      return { error: (error as Error).message };
    }
  }
};