// src/pages/eventDetails.tsx
import { useParams } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { Card, CardContent, Typography, Stack, Divider } from "@mui/material";

export default function EventDetails() {
  const { id } = useParams();

  // For now, fake data; later you’ll fetch by id
  const event = {
    id,
    name: "Acoustic Night",
    date: "2025-12-25",
    time: "7:00 PM",
    venue: "Hyderabad",
    status: "Upcoming",
    description: "An intimate acoustic evening with live performances.",
  };

  return (
    <AppLayout title="Event Details">
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" mb={1}>
            {event.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Event ID: {event.id}
          </Typography>

          <Stack direction="row" spacing={4} mb={2}>
            <Stack>
              <Typography variant="body2" color="text.secondary">
                Date
              </Typography>
              <Typography variant="body1">{event.date}</Typography>
            </Stack>
            <Stack>
              <Typography variant="body2" color="text.secondary">
                Time
              </Typography>
              <Typography variant="body1">{event.time}</Typography>
            </Stack>
            <Stack>
              <Typography variant="body2" color="text.secondary">
                Venue
              </Typography>
              <Typography variant="body1">{event.venue}</Typography>
            </Stack>
            <Stack>
              <Typography variant="body2" color="text.secondary">
                Status
              </Typography>
              <Typography variant="body1">{event.status}</Typography>
            </Stack>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="text.secondary" mb={1}>
            Description
          </Typography>
          <Typography variant="body1">{event.description}</Typography>
        </CardContent>
      </Card>

      {/* Later: line-up + attendees sections go here */}
    </AppLayout>
  );
}
