// src/pages/eventDetails.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEventById } from "../api/events";
import { AppLayout } from "../components/layout/AppLayout";
import { Card, CardContent, Typography, Stack, Box, Chip, Button, CircularProgress, Alert, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getEventRevenue } from "../data/mockRevenue";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";

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

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Fetch event from database
  const { data: event, isLoading, error } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(Number(id)),
  });

  const revenue = event ? getEventRevenue(event.id) : null;
  const totalRevenue = revenue 
    ? (revenue.ticketSales + revenue.sponsorship + revenue.merchandise + revenue.other)
    : 0;

  // Loading State
  if (isLoading) {
    return (
      <AppLayout title="Event Details">
        <Box
          sx={{
            background: "rgba(26, 26, 46, 0.6)",
            backdropFilter: 'blur(20px)',
            border: "1px solid rgba(139, 92, 246, 0.2)",
            borderRadius: 3,
            p: 8,
            textAlign: 'center',
          }}
        >
          <Stack spacing={3} alignItems="center">
            <CircularProgress 
              size={48} 
              sx={{ color: '#8b5cf6' }}
            />
            <Typography 
              variant="h5" 
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 600,
              }}
            >
              Loading event details...
            </Typography>
          </Stack>
        </Box>
      </AppLayout>
    );
  }

  // Error State
  if (error) {
    return (
      <AppLayout title="Event Details">
        <Box
          sx={{
            background: "rgba(26, 26, 46, 0.6)",
            backdropFilter: 'blur(20px)',
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: 3,
            p: 6,
            textAlign: 'center',
          }}
        >
          <Alert 
            severity="error"
            sx={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              '& .MuiAlert-icon': {
                color: '#ef4444',
              },
              mb: 3,
            }}
          >
            Error loading event: {error.message}
          </Alert>
          <Button
            variant="contained"
            onClick={() => navigate('/events')}
            sx={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Back to Events
          </Button>
        </Box>
      </AppLayout>
    );
  }

  // Event Not Found State
  if (!event) {
    return (
      <AppLayout title="Event Not Found">
        <Box
          sx={{
            background: "rgba(26, 26, 46, 0.6)",
            backdropFilter: 'blur(20px)',
            border: "1px solid rgba(139, 92, 246, 0.2)",
            borderRadius: 3,
            p: 6,
            textAlign: 'center',
          }}
        >
          <Typography 
            variant="h4" 
            sx={{
              background: "linear-gradient(135deg, #fff 0%, #8b5cf6 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
              mb: 2,
            }}
          >
            Event Not Found
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 4 }}>
            The event you're looking for does not exist.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/events')}
            sx={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Back to Events
          </Button>
        </Box>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Event Details">
      {/* Event Header Card */}
      <Card 
        sx={{ 
          mb: 3,
          background: "rgba(26, 26, 46, 0.6)",
          backdropFilter: 'blur(20px)',
          border: "1px solid rgba(139, 92, 246, 0.2)",
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
          "&::before": {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)',
          }
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
            <Box>
              <Typography 
                variant="h3" 
                mb={1}
                fontWeight={800}
                sx={{
                  background: "linear-gradient(135deg, #fff 0%, #8b5cf6 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: '-0.02em'
                }}
              >
                {event.name}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
              >
                Event ID: #{event.id}
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Chip
                label={event.status}
                color={getStatusColor(event.status)}
                sx={{
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  px: 2,
                  py: 3,
                  borderRadius: 2,
                }}
              />
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/events/${event.id}/edit`)}
                sx={{
                  background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)',
                  transition: 'all 0.3s ease',
                  "&:hover": {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 32px rgba(139, 92, 246, 0.6)',
                    background: "linear-gradient(135deg, #9d6cff 0%, #ff5eb7 100%)",
                  },
                }}
              >
                Edit Event
              </Button>
            </Stack>
          </Stack>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 3 }}>
            <Box
              sx={{
                p: 2.5,
                background: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                borderRadius: 2,
                transition: 'all 0.3s ease',
                "&:hover": {
                  background: "rgba(139, 92, 246, 0.15)",
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1.5,
                    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <CalendarTodayIcon sx={{ fontSize: 20, color: '#8b5cf6' }} />
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em'
                  }}
                >
                  Date
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight={700}>
                {event.date}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2.5,
                background: "rgba(236, 72, 153, 0.1)",
                  border: "1px solid rgba(236, 72, 153, 0.2)",
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  "&:hover": {
                    background: "rgba(236, 72, 153, 0.15)",
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1.5,
                      background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <AccessTimeIcon sx={{ fontSize: 20, color: '#ec4899' }} />
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em'
                    }}
                  >
                    Time
                  </Typography>
                </Box>
              <Typography variant="h6" fontWeight={700}>
                {event.time}
              </Typography>
            </Box>

            <Box
              sx={{
                  p: 2.5,
                  background: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  "&:hover": {
                    background: "rgba(59, 130, 246, 0.15)",
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1.5,
                      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <LocationOnIcon sx={{ fontSize: 20, color: '#3b82f6' }} />
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em'
                    }}
                  >
                    Venue
                  </Typography>
                </Box>
              <Typography variant="h6" fontWeight={700}>
                {event.venue}
              </Typography>
            </Box>

            <Box
              sx={{
                  p: 2.5,
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  "&:hover": {
                    background: "rgba(16, 185, 129, 0.15)",
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1.5,
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ color: '#10b981', fontWeight: 700 }}>₹</Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em'
                    }}
                  >
                    Revenue
                  </Typography>
                </Box>
              <Typography variant="h6" fontWeight={700}>
                ₹{totalRevenue.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Divider 
            sx={{ 
              my: 3,
              borderColor: 'rgba(139, 92, 246, 0.2)'
            }} 
          />

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InfoIcon sx={{ fontSize: 20, color: '#8b5cf6', mr: 1.5 }} />
              <Typography 
                variant="h6" 
                fontWeight={700}
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                Description
              </Typography>
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.8,
                fontSize: '1.05rem'
              }}
            >
              {event.description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
