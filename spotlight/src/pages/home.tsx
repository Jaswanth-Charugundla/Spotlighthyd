// src/pages/home.tsx
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Authcontexts";

export default function Home() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "#0b0b0f",
        color: "#f9fafb",
      }}
    >
      {/* Top Navigation Bar */}
      <Box
        sx={{
          borderBottom: "1px solid #1f2937",
          bgcolor: "rgba(11, 11, 15, 0.95)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Spotlight
            </Typography>

            {/* User section or Sign In button */}
            {user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      backgroundColor: "#3b82f6",
                      fontSize: "0.85rem",
                    }}
                  >
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "150px",
                      }}
                    >
                      {user?.user_metadata?.name ||
                        user?.email?.split("@")[0] ||
                        "User"}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#94a3b8",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "150px",
                        display: "block",
                      }}
                    >
                      {user?.email}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={signOut}
                  sx={{
                    borderColor: "grey.700",
                    color: "grey.100",
                    "&:hover": {
                      borderColor: "grey.600",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                    },
                  }}
                >
                  Sign Out
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{
                  bgcolor: "#3b82f6",
                  "&:hover": {
                    bgcolor: "#2563eb",
                  },
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* HERO SECTION */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 6,
            mb: 8,
          }}
        >
          {/* Left side: text */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #f9fafb 0%, #94a3b8 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Spotlight Events
            </Typography>
            <Typography variant="h5" color="grey.300" paragraph sx={{ mb: 3 }}>
              Create unforgettable live experiences with structured planning,
              line-up management and seamless execution.
            </Typography>
            <Typography variant="body1" color="grey.400" paragraph>
              From intimate acoustic nights to high-energy festival stages,
              Spotlight handles the operations so you can focus on the
              performance.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              {user ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/dashboard")}
                  sx={{
                    bgcolor: "#3b82f6",
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      bgcolor: "#2563eb",
                    },
                  }}
                >
                  Go to Dashboard
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/login")}
                  sx={{
                    bgcolor: "#3b82f6",
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      bgcolor: "#2563eb",
                    },
                  }}
                >
                  Get Started
                </Button>
              )}
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "grey.500",
                  color: "grey.100",
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    borderColor: "grey.400",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  },
                }}
                onClick={() => navigate("/events")}
              >
                View Events
              </Button>
            </Stack>
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
