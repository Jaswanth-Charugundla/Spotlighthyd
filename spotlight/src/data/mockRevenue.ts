export interface EventRevenue {
  eventId: number;
  ticketSales: number;
  sponsorship: number;
  merchandise: number;
  other: number;
}

export const mockRevenue: EventRevenue[] = [
  {
    eventId: 1,
    ticketSales: 45000,
    sponsorship: 15000,
    merchandise: 8000,
    other: 2000,
  },
  {
    eventId: 2,
    ticketSales: 65000,
    sponsorship: 25000,
    merchandise: 12000,
    other: 3000,
  },
  {
    eventId: 3,
    ticketSales: 38000,
    sponsorship: 10000,
    merchandise: 5000,
    other: 1500,
  },
  {
    eventId: 4,
    ticketSales: 85000,
    sponsorship: 35000,
    merchandise: 18000,
    other: 5000,
  },
  {
    eventId: 5,
    ticketSales: 52000,
    sponsorship: 18000,
    merchandise: 9000,
    other: 2500,
  },
  {
    eventId: 6,
    ticketSales: 48000,
    sponsorship: 12000,
    merchandise: 7000,
    other: 2000,
  },
  {
    eventId: 7,
    ticketSales: 0,
    sponsorship: 0,
    merchandise: 0,
    other: 0,
  },
  {
    eventId: 8,
    ticketSales: 55000,
    sponsorship: 20000,
    merchandise: 10000,
    other: 3000,
  },
  {
    eventId: 9,
    ticketSales: 72000,
    sponsorship: 28000,
    merchandise: 15000,
    other: 4000,
  },
  {
    eventId: 10,
    ticketSales: 62000,
    sponsorship: 22000,
    merchandise: 11000,
    other: 3500,
  },
  {
    eventId: 11,
    ticketSales: 0,
    sponsorship: 0,
    merchandise: 0,
    other: 0,
  },
  {
    eventId: 12,
    ticketSales: 58000,
    sponsorship: 19000,
    merchandise: 9500,
    other: 2800,
  },
  {
    eventId: 13,
    ticketSales: 41000,
    sponsorship: 11000,
    merchandise: 6000,
    other: 1800,
  },
  {
    eventId: 14,
    ticketSales: 68000,
    sponsorship: 24000,
    merchandise: 13000,
    other: 3800,
  },
  {
    eventId: 15,
    ticketSales: 49000,
    sponsorship: 16000,
    merchandise: 8500,
    other: 2300,
  },
  {
    eventId: 16,
    ticketSales: 71000,
    sponsorship: 26000,
    merchandise: 14000,
    other: 4200,
  },
  {
    eventId: 17,
    ticketSales: 0,
    sponsorship: 0,
    merchandise: 0,
    other: 0,
  },
  {
    eventId: 18,
    ticketSales: 54000,
    sponsorship: 17000,
    merchandise: 9200,
    other: 2600,
  },
  {
    eventId: 19,
    ticketSales: 46000,
    sponsorship: 13000,
    merchandise: 7200,
    other: 2100,
  },
  {
    eventId: 20,
    ticketSales: 79000,
    sponsorship: 30000,
    merchandise: 16000,
    other: 4500,
  },
  {
    eventId: 21,
    ticketSales: 57000,
    sponsorship: 19500,
    merchandise: 10500,
    other: 3100,
  },
  {
    eventId: 22,
    ticketSales: 63000,
    sponsorship: 21000,
    merchandise: 11500,
    other: 3300,
  },
  {
    eventId: 23,
    ticketSales: 0,
    sponsorship: 0,
    merchandise: 0,
    other: 0,
  },
  {
    eventId: 24,
    ticketSales: 92000,
    sponsorship: 40000,
    merchandise: 20000,
    other: 6000,
  },
  {
    eventId: 25,
    ticketSales: 44000,
    sponsorship: 14000,
    merchandise: 7500,
    other: 2200,
  },
];

// Helper function to calculate total revenue for an event
export const getEventRevenue = (eventId: number): EventRevenue | null => {
  const revenue = mockRevenue.find((r) => r.eventId === eventId);
  return revenue || null;
};

// Helper function to calculate total revenue across all events
export const getTotalRevenue = (): number => {
  return mockRevenue.reduce((total, rev) => {
    return total + rev.ticketSales + rev.sponsorship + rev.merchandise + rev.other;
  }, 0);
};
