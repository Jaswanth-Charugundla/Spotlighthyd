// src/api/events.ts
import { supabase } from "../lib/supabase";

export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getEventById(id: number) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error) throw error;
  return data;
}

export async function createEvent(payload: any) {
  // Remove id if it exists, let the database auto-generate it
  const { id, ...cleanPayload } = payload;
  
  const now = new Date().toISOString();
  const eventData = {
    ...cleanPayload,
    created_at: now,
    updated_at: now,
  };

  const { data, error } = await supabase
    .from("events")
    .insert(eventData)
    .select("*")
    .single();

  if (error) {
    console.error("Create error:", error);
    throw error;
  }
  return data;
}

export async function updateEvent(id: number, payload: any) {
  // Remove id, created_at from payload to avoid conflicts
  const { id: payloadId, created_at, ...cleanPayload } = payload;
  
  const eventData = {
    ...cleanPayload,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("events")
    .update(eventData)
    .eq("id", Number(id))
    .select("*");

  if (error) {
    throw error;
  }
  
  if (!data || data.length === 0) {
    throw new Error(`Unable to update event with ID ${id}. Please check your database permissions.`);
  }
  
  return data[0];
}
