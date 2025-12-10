// src/pages/home.tsx
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "#0b0b0f",
        color: "#f9fafb",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* HERO SECTION */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 6,
          }}
        >
          {/* Left side: text */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Spotlight Events
            </Typography>
            <Typography variant="h6" color="grey.300" paragraph>
              We help artists, venues and brands create unforgettable live
              experiences with structured planning, line-up management and
              seamless execution.
            </Typography>
            <Typography variant="body1" color="grey.400" paragraph>
              From intimate acoustic nights to high-energy festival stages,
              Spotlight handles the operations so you can focus on the
              performance.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button variant="contained" onClick={() => navigate("/login")}>
                Login to Dashboard
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: "grey.500", color: "grey.100" }}
                onClick={() => navigate("/events")}
              >
                View Events
              </Button>
            </Box>
          </Box>

          {/* Right side: hero visual */}
          <Box
            sx={{
              flex: 1,
              height: 260,
              borderRadius: 3,
              background:
                "radial-gradient(circle at 20% 20%, rgba(252,211,77,0.3), transparent 55%), radial-gradient(circle at 80% 70%, rgba(96,165,250,0.35), transparent 55%), #020617",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 6,
            }}
          >
            <Typography variant="h5" align="center" sx={{ px: 4 }}>
              Curated line-ups, tight schedules, and a dashboard built for real
              gigs.
            </Typography>
          </Box>
        </Box>

        {/* ABOUT SECTION */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom>
            About Spotlight
          </Typography>
          <Typography variant="body1" color="grey.300" paragraph>
            Spotlight is a boutique entertainment and event management outfit
            focused on live music, stand-up, and experiential shows. We combine
            creative programming with tight operational control to make sure
            every show starts on time and ends on a high.
          </Typography>
          <Typography variant="body1" color="grey.400" paragraph>
            The internal dashboard is designed to manage:
          </Typography>

          {/* Cards row without Grid */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mt: 2,
            }}
          >
            <Card
              sx={{
                flex: "1 1 260px",
                bgcolor: "#020617",
                borderRadius: 3,
                border: "1px solid #1f2937",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Event Planning
                </Typography>
                <Typography variant="body2" color="grey.400">
                  Create and track events, venues, dates and show flow in a
                  single place. No more messy spreadsheets.
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                flex: "1 1 260px",
                bgcolor: "#020617",
                borderRadius: 3,
                border: "1px solid #1f2937",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Artist & Line-up
                </Typography>
                <Typography variant="body2" color="grey.400">
                  Manage artists, performance order and set durations so the
                  stage runs smooth from opening act to encore.
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                flex: "1 1 260px",
                bgcolor: "#020617",
                borderRadius: 3,
                border: "1px solid #1f2937",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Attendees & Insights
                </Typography>
                <Typography variant="body2" color="grey.400">
                  Track attendees and basic metrics to understand which events
                  and formats perform best for your audience.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
