// src/pages/events.tsx
import { AppLayout } from "../components/layout/AppLayout";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const navigate = useNavigate();

  // temporary mock data – later we’ll replace with API / React Query
  const events = [
    {
      id: 1,
      name: "Acoustic Night",
      date: "2025-12-25",
      venue: "Hyderabad",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Rock Fiesta",
      date: "2026-01-10",
      venue: "Bangalore",
      status: "Upcoming",
    },
  ];

  return (
    <AppLayout title="Events">
      <Card>
        <CardContent>
          {/* Header row */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">Events</Typography>
            <Button variant="contained" onClick={() => navigate("/events/new")}>
              Create Event
            </Button>
          </Stack>

          {/* Filters */}
          <Stack direction="row" spacing={2} mb={2}>
            <TextField
              select
              size="small"
              label="Status"
              defaultValue="all"
              sx={{ width: 160 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="upcoming">Upcoming</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </TextField>

            <TextField
              size="small"
              label="Search by name or venue"
              sx={{ minWidth: 260 }}
            />
          </Stack>

          {/* Table */}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Venue</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((e) => (
                <TableRow key={e.id} hover>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.date}</TableCell>
                  <TableCell>{e.venue}</TableCell>
                  <TableCell>{e.status}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={() => navigate(`/events/${e.id}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {events.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No events found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
