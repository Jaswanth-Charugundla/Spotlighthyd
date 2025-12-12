import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

interface EventFiltersProps {
  open: boolean;
  onClose: () => void;
  filters: {
    status: string;
    venue: string;
    dateFrom: string;
    dateTo: string;
  };
  onFilterChange: (filters: {
    status: string;
    venue: string;
    dateFrom: string;
    dateTo: string;
  }) => void;
  onApply: () => void;
  onReset: () => void;
  venues: string[];
}

export default function EventFilters({
  open,
  onClose,
  filters,
  onFilterChange,
  onApply,
  onReset,
  venues,
}: EventFiltersProps) {

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Filter Events</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            select
            label="Status"
            value={filters.status}
            onChange={(e) =>
              onFilterChange({ ...filters, status: e.target.value })
            }
            fullWidth
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Upcoming">Upcoming</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>

          <TextField
            select
            label="Venue"
            value={filters.venue}
            onChange={(e) =>
              onFilterChange({ ...filters, venue: e.target.value })
            }
            fullWidth
          >
            <MenuItem value="all">All Venues</MenuItem>
            {venues.map((venue) => (
              <MenuItem key={venue} value={venue}>
                {venue}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="date"
            label="Date From"
            value={filters.dateFrom}
            onChange={(e) =>
              onFilterChange({ ...filters, dateFrom: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            type="date"
            label="Date To"
            value={filters.dateTo}
            onChange={(e) =>
              onFilterChange({ ...filters, dateTo: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onReset} color="secondary">
          Reset
        </Button>
        <Button onClick={onApply} variant="contained">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
