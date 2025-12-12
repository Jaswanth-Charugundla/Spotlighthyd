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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PeopleIcon from "@mui/icons-material/People";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(139, 92, 246, 0.4)',
                }}
              >
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 800 }}>S</Typography>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: '-0.02em'
                }}
              >
                Spotlight
              </Typography>
            </Box>

            {/* User section or Sign In button */}
            {user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)",
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
                    borderColor: "rgba(139, 92, 246, 0.5)",
                    color: "#fff",
                    borderRadius: "10px",
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "#8b5cf6",
                      backgroundColor: "rgba(139, 92, 246, 0.1)",
                      transform: "translateY(-2px)",
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
                  background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                  borderRadius: "10px",
                  fontWeight: 600,
                  px: 3,
                  "&:hover": {
                    background: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(139, 92, 246, 0.4)",
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
          <Box sx={{ flex: 1, position: 'relative', zIndex: 2 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                mb: 3,
                borderRadius: '50px',
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: '#8b5cf6',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                ✨ Event Management Platform
              </Typography>
            </Box>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' },
                lineHeight: 1.1,
                mb: 3,
                background: "linear-gradient(135deg, #fff 0%, #8b5cf6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: '-0.03em'
              }}
            >
              Spotlight Events
            </Typography>
            <Typography 
              variant="h5" 
              paragraph 
              sx={{ 
                mb: 3,
                color: '#94a3b8',
                fontWeight: 500,
                lineHeight: 1.6
              }}
            >
              Create unforgettable live experiences with structured planning,
              line-up management and seamless execution.
            </Typography>
            <Typography 
              variant="body1" 
              paragraph
              sx={{
                color: '#64748b',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                mb: 4
              }}
            >
              From intimate acoustic nights to high-energy festival stages,
              Spotlight handles the operations so you can focus on the
              performance.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 4 }} flexWrap="wrap">
              {user ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/dashboard")}
                  sx={{
                    background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                    px: 5,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)',
                    "&:hover": {
                      background: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
                      transform: "translateY(-3px)",
                      boxShadow: '0 15px 50px rgba(139, 92, 246, 0.4)',
                    },
                  }}
                >
                  Go to Dashboard →
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/login")}
                  sx={{
                    background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                    px: 5,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)',
                    "&:hover": {
                      background: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
                      transform: "translateY(-3px)",
                      boxShadow: '0 15px 50px rgba(139, 92, 246, 0.4)',
                    },
                  }}
                >
                  Get Started →
                </Button>
              )}
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "rgba(139, 92, 246, 0.5)",
                  color: "#fff",
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  borderWidth: '2px',
                  "&:hover": {
                    borderColor: "#8b5cf6",
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                    transform: "translateY(-3px)",
                    borderWidth: '2px',
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
              position: 'relative',
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Box
              sx={{
                position: 'relative',
                height: 500,
                borderRadius: '24px',
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                border: "2px solid rgba(139, 92, 246, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 20px 60px rgba(139, 92, 246, 0.3)',
                "&::before": {
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                  animation: 'rotate 20s linear infinite',
                },
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', p: 4 }}>
                <AutoAwesomeIcon 
                  sx={{ 
                    fontSize: 80, 
                    color: '#8b5cf6',
                    mb: 3,
                    filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))'
                  }} 
                />
                <Typography 
                  variant="h4" 
                  align="center" 
                  sx={{ 
                    px: 4,
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #fff 0%, #8b5cf6 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Curated line-ups, tight schedules, and a dashboard built for real
                  gigs.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        
        <style>
          {`
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>

        {/* ABOUT SECTION */}
        <Box sx={{ mt: 16 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h3" 
              gutterBottom 
              fontWeight={800}
              sx={{
                background: "linear-gradient(135deg, #fff 0%, #8b5cf6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: '-0.02em'
              }}
            >
              About Spotlight
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 400,
                maxWidth: 800,
                mx: 'auto',
                mb: 2
              }}
            >
              Spotlight is a boutique entertainment and event management outfit
              focused on live music, stand-up, and experiential shows.
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              The internal dashboard is designed to manage:
            </Typography>
          </Box>

          {/* Cards row without Grid */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              mt: 4,
            }}
          >
            <Card
              sx={{
                flex: "1 1 300px",
                background: "rgba(26, 26, 46, 0.6)",
                backdropFilter: 'blur(20px)',
                borderRadius: 3,
                border: "1px solid rgba(139, 92, 246, 0.2)",
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                "&:hover": {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
                  borderColor: 'rgba(139, 92, 246, 0.5)',
                },
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
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <CalendarMonthIcon sx={{ fontSize: 32, color: '#8b5cf6' }} />
                </Box>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  fontWeight={700}
                  sx={{
                    background: "linear-gradient(135deg, #fff 0%, #8b5cf6 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Event Planning
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.7
                  }}
                >
                  Create and track events, venues, dates and show flow in a
                  single place. No more messy spreadsheets.
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                flex: "1 1 300px",
                background: "rgba(26, 26, 46, 0.6)",
                backdropFilter: 'blur(20px)',
                borderRadius: 3,
                border: "1px solid rgba(236, 72, 153, 0.2)",
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                "&:hover": {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3)',
                  borderColor: 'rgba(236, 72, 153, 0.5)',
                },
                "&::before": {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #ec4899 0%, #8b5cf6 100%)',
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <MusicNoteIcon sx={{ fontSize: 32, color: '#ec4899' }} />
                </Box>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  fontWeight={700}
                  sx={{
                    background: "linear-gradient(135deg, #fff 0%, #ec4899 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Artist & Line-up
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.7
                  }}
                >
                  Manage artists, performance order and set durations so the
                  stage runs smooth from opening act to encore.
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                flex: "1 1 300px",
                background: "rgba(26, 26, 46, 0.6)",
                backdropFilter: 'blur(20px)',
                borderRadius: 3,
                border: "1px solid rgba(59, 130, 246, 0.2)",
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                "&:hover": {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
                  borderColor: 'rgba(59, 130, 246, 0.5)',
                },
                "&::before": {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <PeopleIcon sx={{ fontSize: 32, color: '#3b82f6' }} />
                </Box>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  fontWeight={700}
                  sx={{
                    background: "linear-gradient(135deg, #fff 0%, #3b82f6 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Attendees & Insights
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.7
                  }}
                >
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
