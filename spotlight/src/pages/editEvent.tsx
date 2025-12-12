// src/pages/editEvent.tsx
import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { mockEvents } from "../data/mockEvents";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [eventNotFound, setEventNotFound] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    venue: "",
    status: "Upcoming",
    description: "",
  });

  useEffect(() => {
    // Load event data
    const event = mockEvents.find((e) => e.id === Number(id));
    if (event) {
      setFormData({
        name: event.name,
        date: event.date,
        time: event.time,
        venue: event.venue,
        status: event.status,
        description: event.description,
      });
    } else {
      setEventNotFound(true);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name.trim()) {
      setError("Event name is required");
      return;
    }
    if (!formData.date) {
      setError("Event date is required");
      return;
    }
    if (!formData.time) {
      setError("Event time is required");
      return;
    }
    if (!formData.venue.trim()) {
      setError("Venue is required");
      return;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }

    // Update the event
    const eventIndex = mockEvents.findIndex((e) => e.id === Number(id));
    if (eventIndex !== -1) {
      mockEvents[eventIndex] = {
        ...mockEvents[eventIndex],
        name: formData.name.trim(),
        date: formData.date,
        time: formData.time,
        venue: formData.venue.trim(),
        status: formData.status,
        description: formData.description.trim(),
      };

      // Show success message
      setSuccess(true);

      // Redirect to event details page after a short delay
      setTimeout(() => {
        navigate(`/events/${id}`);
      }, 1500);
    } else {
      setError("Event not found");
    }
  };

  if (eventNotFound) {
    return (
      <AppLayout title="Edit Event">
        <Card
          sx={{
            background: "rgba(26, 26, 46, 0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h5" color="error" mb={2}>
              Event Not Found
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={3}>
              The event you're trying to edit doesn't exist.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/events")}
              sx={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Back to Events
            </Button>
          </CardContent>
        </Card>
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
              onClick={() => navigate(`/events/${id}`)}
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

          {/* Success Alert */}
          {success && (
            <Alert
              severity="success"
              sx={{
                mb: 3,
                background: "rgba(34, 197, 94, 0.1)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                "& .MuiAlert-icon": {
                  color: "#22c55e",
                },
              }}
            >
              Event updated successfully! Redirecting to event details...
            </Alert>
          )}

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
                  onClick={() => navigate(`/events/${id}`)}
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
                  disabled={success}
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
                  Update Event
                </Button>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
