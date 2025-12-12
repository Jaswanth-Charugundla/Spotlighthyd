// src/pages/events.tsx
import { AppLayout } from "../components/layout/AppLayout";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Badge,
  Box,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mockEvents } from "../data/mockEvents";
import { useState, useMemo } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EventFilters from "../components/EventFilters";

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

export default function Events() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    venue: "all",
    dateFrom: "",
    dateTo: "",
  });
  const [tempFilters, setTempFilters] = useState({
    status: "all",
    venue: "all",
    dateFrom: "",
    dateTo: "",
  });

  // Get unique venues for filter dropdown
  const uniqueVenues = useMemo(() => {
    return Array.from(new Set(mockEvents.map((e) => e.venue))).sort();
  }, []);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.status !== "all") count++;
    if (filters.venue !== "all") count++;
    if (filters.dateFrom) count++;
    if (filters.dateTo) count++;
    return count;
  }, [filters]);

  // Filter and search events
  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      // Search filter
      const matchesSearch =
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        filters.status === "all" || event.status === filters.status;

      // Venue filter
      const matchesVenue =
        filters.venue === "all" || event.venue === filters.venue;

      // Date range filter
      const eventDate = new Date(event.date);
      const matchesDateFrom = filters.dateFrom
        ? eventDate >= new Date(filters.dateFrom)
        : true;
      const matchesDateTo = filters.dateTo
        ? eventDate <= new Date(filters.dateTo)
        : true;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesVenue &&
        matchesDateFrom &&
        matchesDateTo
      );
    });
  }, [searchQuery, filters]);

  return (
    <AppLayout title="Events">
      <Card
        sx={{
          background: "rgba(26, 26, 46, 0.6)",
          backdropFilter: 'blur(20px)',
          border: "1px solid rgba(139, 92, 246, 0.2)",
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header row */}
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
                letterSpacing: '-0.02em'
              }}
            >
              Events
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => navigate("/events/new")}
              sx={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                px: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
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
              Create Event
            </Button>
          </Stack>

          {/* Search and Filter */}
          <Stack direction="row" spacing={2} mb={4} alignItems="center">
            <TextField
              size="medium"
              placeholder="Search by name or venue"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgba(139, 92, 246, 0.7)' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                flexGrow: 1, 
                maxWidth: 500,
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(26, 26, 46, 0.4)',
                  '& fieldset': {
                    borderColor: 'rgba(139, 92, 246, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(139, 92, 246, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8b5cf6',
                  },
                },
              }}
            />
            <Badge badgeContent={activeFilterCount} color="primary">
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => {
                  setTempFilters(filters);
                  setFilterDialogOpen(true);
                }}
                sx={{
                  borderColor: 'rgba(139, 92, 246, 0.5)',
                  color: '#8b5cf6',
                  px: 3,
                  py: 1.2,
                  textTransform: 'none',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  "&:hover": {
                    borderColor: '#8b5cf6',
                    background: 'rgba(139, 92, 246, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Filters
              </Button>
            </Badge>
          </Stack>

          {/* Table */}
          <Box
            sx={{
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: 2,
              overflow: 'hidden',
              background: 'rgba(26, 26, 46, 0.3)',
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background: 'rgba(139, 92, 246, 0.1)',
                    '& .MuiTableCell-root': {
                      borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      py: 2,
                    },
                  }}
                >
                  <TableCell>Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Venue</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEvents.map((e) => (
                  <TableRow 
                    key={e.id}
                    sx={{
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: 'rgba(139, 92, 246, 0.08)',
                        cursor: 'pointer',
                      },
                      '& .MuiTableCell-root': {
                        borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
                        py: 2,
                      },
                    }}
                    onClick={() => navigate(`/events/${e.id}`)}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>{e.name}</TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>{e.date}</TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>{e.venue}</TableCell>
                    <TableCell>
                      <Chip
                        label={e.status}
                        color={getStatusColor(e.status)}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          borderRadius: 1.5,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        sx={{
                          color: '#8b5cf6',
                          fontWeight: 600,
                          textTransform: 'none',
                          '&:hover': {
                            background: 'rgba(139, 92, 246, 0.1)',
                          },
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredEvents.length === 0 && (
                  <TableRow>
                    <TableCell 
                      colSpan={5} 
                      align="center"
                      sx={{ 
                        py: 8,
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: '1.1rem',
                      }}
                    >
                      No events found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>

      {/* Filter Dialog */}
      <EventFilters
        open={filterDialogOpen}
        onClose={() => {
          setFilterDialogOpen(false);
          setTempFilters(filters); // Reset temp filters to current filters on cancel
        }}
        filters={tempFilters}
        onFilterChange={setTempFilters}
        onApply={() => {
          setFilters(tempFilters);
          setFilterDialogOpen(false);
        }}
        onReset={() => {
          const resetFilters = {
            status: "all",
            venue: "all",
            dateFrom: "",
            dateTo: "",
          };
          setTempFilters(resetFilters);
          setFilters(resetFilters);
        }}
        venues={uniqueVenues}
      />
    </AppLayout>
  );
}
