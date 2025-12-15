// src/pages/editEvent.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEventById, updateEvent } from "../api/events";
import { AppLayout } from "../components/layout/AppLayout";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const eventId = Number(id);
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    venue: "",
    status: "Upcoming",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch event from database
  const { 
    data: event, 
    isLoading, 
    error: fetchError 
  } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventById(eventId),
    enabled: !!eventId && !isNaN(eventId),
  });

  // Populate form when event data is loaded
  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || "",
        date: event.date || "",
        time: event.time || "",
        venue: event.venue || "",
        status: event.status || "Upcoming",
        description: event.description || "",
      });
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await updateEvent(eventId, {
        name: formData.name.trim(),
        date: formData.date,
        time: formData.time,
        venue: formData.venue.trim(),
        status: formData.status,
        description: formData.description.trim(),
      });

      // Refresh cached data
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });

      // Navigate back to event details
      navigate(`/events/${eventId}`);
    } catch (err: any) {
      setError(err.message || "Failed to update event");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout title="Edit Event">
        <Box sx={{ textAlign: "center", py: 8 }}>
          <CircularProgress size={48} sx={{ color: "#8b5cf6" }} />
          <Typography sx={{ mt: 2, color: "rgba(255, 255, 255, 0.7)" }}>
            Loading event...
          </Typography>
        </Box>
      </AppLayout>
    );
  }

  if (fetchError || !event) {
    return (
      <AppLayout title="Edit Event">
        <Alert severity="error">
          Event not found. <Button onClick={() => navigate("/events")}>Back to Events</Button>
        </Alert>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Edit Event">
      <Card
        sx={{
          background: "rgba(26, 26, 46, 0.6)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(139, 92, 246, 0.2)",
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)",
          },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{
                background: "linear-gradient(135deg, #fff 0%, #8b5cf6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              Edit Event
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(`/events/${eventId}`)}
              sx={{
                borderColor: "rgba(139, 92, 246, 0.5)",
                color: "#8b5cf6",
                textTransform: "none",
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#8b5cf6",
                  background: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Back to Details
            </Button>
          </Stack>



          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                "& .MuiAlert-icon": {
                  color: "#ef4444",
                },
              }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Event Name */}
              <TextField
                name="name"
                label="Event Name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                placeholder="e.g., Summer Music Festival"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(26, 26, 46, 0.4)",
                    "& fieldset": { borderColor: "rgba(139, 92, 246, 0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(139, 92, 246, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#8b5cf6",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.6)",
                    "&.Mui-focused": {
                      color: "#8b5cf6",
                    },
                  },
                }}
              />

              {/* Date and Time */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                <TextField
                  name="date"
                  label="Event Date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "rgba(26, 26, 46, 0.4)",
                      "& fieldset": { borderColor: "rgba(139, 92, 246, 0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(139, 92, 246, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#8b5cf6",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.6)",
                      "&.Mui-focused": {
                        color: "#8b5cf6",
                      },
                    },
                  }}
                />

                <TextField
                  name="time"
                  label="Event Time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "rgba(26, 26, 46, 0.4)",
                      "& fieldset": { borderColor: "rgba(139, 92, 246, 0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(139, 92, 246, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#8b5cf6",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.6)",
                      "&.Mui-focused": {
                        color: "#8b5cf6",
                      },
                    },
                  }}
                />
              </Stack>

              {/* Venue */}
              <TextField
                name="venue"
                label="Venue"
                value={formData.venue}
                onChange={handleChange}
                required
                fullWidth
                placeholder="e.g., Madison Square Garden"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(26, 26, 46, 0.4)",
                    "& fieldset": { borderColor: "rgba(139, 92, 246, 0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(139, 92, 246, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#8b5cf6",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.6)",
                    "&.Mui-focused": {
                      color: "#8b5cf6",
                    },
                  },
                }}
              />

              {/* Status */}
              <TextField
                name="status"
                label="Status"
                select
                value={formData.status}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(26, 26, 46, 0.4)",
                    "& fieldset": { borderColor: "rgba(139, 92, 246, 0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(139, 92, 246, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#8b5cf6",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.6)",
                    "&.Mui-focused": {
                      color: "#8b5cf6",
                    },
                  },
                }}
              >
                <MenuItem value="Upcoming">Upcoming</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </TextField>

              {/* Description */}
              <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
                required
                fullWidth
                multiline
                rows={4}
                placeholder="Describe the event details..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(26, 26, 46, 0.4)",
                    "& fieldset": { borderColor: "rgba(139, 92, 246, 0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(139, 92, 246, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#8b5cf6",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.6)",
                    "&.Mui-focused": {
                      color: "#8b5cf6",
                    },
                  },
                }}
              />

              {/* Submit Button */}
              <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => navigate(`/events/${eventId}`)}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderColor: "rgba(139, 92, 246, 0.5)",
                    color: "rgba(255, 255, 255, 0.8)",
                    textTransform: "none",
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "rgba(139, 92, 246, 0.7)",
                      background: "rgba(139, 92, 246, 0.1)",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={isSubmitting}
                  sx={{
                    px: 4,
                    py: 1.5,
                    background:
                      "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 700,
                    borderRadius: 2,
                    boxShadow: "0 8px 24px rgba(139, 92, 246, 0.4)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 12px 32px rgba(139, 92, 246, 0.6)",
                      background:
                        "linear-gradient(135deg, #9d6cff 0%, #ff5eb7 100%)",
                    },
                    "&:disabled": {
                      background: "rgba(139, 92, 246, 0.3)",
                      color: "rgba(255, 255, 255, 0.4)",
                      boxShadow: "none",
                    },
                  }}
                >
                  {isSubmitting ? "Updating..." : "Update Event"}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
