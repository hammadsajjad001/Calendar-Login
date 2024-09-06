
import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents(prevEvents => [...prevEvents, event]);
  };
  
    const updateEvent = (id, updatedEvent) => {
      setEvents(events.map(event =>
        event.id === id ? { ...event, ...updatedEvent } : event
      ));
    };
    
   
  
    // Function to delete an event by its id
    const deleteEvent = (id) => {
      setEvents(events.filter(event => event.id !== id));
    };

  return (
    <EventContext.Provider value={{ events, addEvent,updateEvent,deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);

