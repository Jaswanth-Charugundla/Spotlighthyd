// src/pages/dashboard.tsx
import { AppLayout } from "../components/layout/AppLayout";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getTotalRevenue } from "../data/mockRevenue";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../api/events";
import EventIcon from "@mui/icons-material/Event";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "success";
    case "upcoming":
      return "primary";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

export default function Dashboard() {
  const navigate = useNavigate();

  // Fetch events from database
  const { data: events, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  // Calculate real statistics from database events
  const stats = useMemo(() => {
    if (!events) {
      return [
        { label: "Total Events", value: "0", icon: <EventIcon sx={{ fontSize: 40 }} />, color: "#8b5cf6", gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" },
        { label: "Upcoming Events", value: "0", icon: <UpcomingIcon sx={{ fontSize: 40 }} />, color: "#3b82f6", gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)" },
        { label: "Completed Events", value: "0", icon: <CheckCircleIcon sx={{ fontSize: 40 }} />, color: "#10b981", gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)" },
        { label: "Cancelled Events", value: "0", icon: <CancelIcon sx={{ fontSize: 40 }} />, color: "#ef4444", gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" },
        { label: "Total Revenue", value: "₹ 0", icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />, color: "#ec4899", gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)" },
      ];
    }

    const totalEvents = events.length;
    const upcomingEvents = events.filter(
      (e) => e.status === "Upcoming"
    ).length;
    const completedEvents = events.filter(
      (e) => e.status === "Completed"
    ).length;
    const cancelledEvents = events.filter(
      (e) => e.status === "Cancelled"
    ).length;
    const totalRevenue = getTotalRevenue();

    return [
      { 
        label: "Total Events", 
        value: totalEvents.toString(),
        icon: <EventIcon sx={{ fontSize: 40 }} />,
        color: "#8b5cf6",
        gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
      },
      { 
        label: "Upcoming Events", 
        value: upcomingEvents.toString(),
        icon: <UpcomingIcon sx={{ fontSize: 40 }} />,
        color: "#3b82f6",
        gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
      },
      { 
        label: "Completed Events", 
        value: completedEvents.toString(),
        icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
        color: "#10b981",
        gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
      },
      { 
        label: "Cancelled Events", 
        value: cancelledEvents.toString(),
        icon: <CancelIcon sx={{ fontSize: 40 }} />,
        color: "#ef4444",
        gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
      },
      { 
        label: "Total Revenue", 
        value: `₹ ${totalRevenue.toLocaleString('en-IN')}`,
        icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />,
        color: "#ec4899",
        gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)"
      },
    ];
  }, [events]);

  // Get upcoming events sorted by date
  const upcomingEvents = useMemo(() => {
    if (!events) return [];
    return events
      .filter((e) => e.status === "Upcoming")
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5); // Show only next 5 upcoming events
  }, [events]);

  // Loading state
  if (isLoading) {
    return (
      <AppLayout title="Dashboard">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CircularProgress size={48} sx={{ color: '#8b5cf6' }} />
          <Typography sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
            Loading dashboard...
          </Typography>
        </Box>
      </AppLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <AppLayout title="Dashboard">
        <Alert 
          severity="error"
          sx={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          Error loading dashboard data: {error.message}
        </Alert>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Dashboard">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {stats.map((stat) => (
          <Card
            key={stat.label}
            sx={{
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: stat.gradient,
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "12px",
                    background: `${stat.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </Box>
                <TrendingUpIcon sx={{ color: stat.color, opacity: 0.3 }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 0.5,
                  background: stat.gradient,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                {stat.label}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Upcoming Events Section */}
      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Upcoming Events</Typography>
            <Button size="small" onClick={() => navigate("/events")}>
              View All
            </Button>
          </Box>

          {upcomingEvents.length > 0 ? (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Venue</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {upcomingEvents.map((event) => (
                  <TableRow key={event.id} hover>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.time}</TableCell>
                    <TableCell>{event.venue}</TableCell>
                    <TableCell>
                      <Chip
                        label={event.status}
                        color={getStatusColor(event.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        onClick={() => navigate(`/events/${event.id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No upcoming events scheduled.
            </Typography>
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
}
