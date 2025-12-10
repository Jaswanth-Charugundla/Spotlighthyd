// src/pages/dashboard.tsx
import { AppLayout } from "../components/layout/AppLayout";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function Dashboard() {
  const stats = [
    { label: "Total Events", value: "12" },
    { label: "Upcoming Events", value: "5" },
    { label: "Total Attendees", value: "320" },
    { label: "Revenue (Mock)", value: "₹ 85,000" },
  ];

  return (
    <AppLayout title="Dashboard">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        {stats.map((stat) => (
          <Card
            key={stat.label}
            sx={{
              flex: "1 1 200px",
              minWidth: 200,
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
              <Typography variant="h5">{stat.value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Add more sections later */}
    </AppLayout>
  );
}
