import { realtimeService as supabaseRealtimeService } from '../api/realtimeSupabase';
import { RealtimeChannel } from '@supabase/supabase-js';

// Generic realtime service that uses the Supabase implementation
export const realtimeService = {
  // Subscribe to changes on a table
  subscribeToTable: (
    table: string,
    event: 'INSERT' | 'UPDATE' | 'DELETE' | '*' = '*',
    callback: (payload: any) => void
  ) => {
    return supabaseRealtimeService.subscribeToTable(table, event, callback);
  },

  // Subscribe to changes on a specific row
  subscribeToRecord: (
    table: string,
    column: string,
    value: string,
    event: 'INSERT' | 'UPDATE' | 'DELETE' | '*' = '*',
    callback: (payload: any) => void
  ) => {
    return supabaseRealtimeService.subscribeToRecord(table, column, value, event, callback);
  },

  // Unsubscribe from a channel
  unsubscribe: (channel: RealtimeChannel) => {
    return supabaseRealtimeService.unsubscribe(channel);
  }
};