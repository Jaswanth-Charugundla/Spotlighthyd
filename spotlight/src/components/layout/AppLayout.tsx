import { type ReactNode } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import HomeIcon from '@mui/icons-material/Home';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useAuth } from "../../contexts/Authcontexts";

const drawerWidth = 280;

const navItems = [
   { label: "Home", path: "/", iconType: "home" }, 
  { label: "Dashboard", path: "/dashboard", iconType: "dashboard" },
  { label: "Events", path: "/events", iconType: "event" },
];

interface AppLayoutProps {
  title: string;
  children: ReactNode;
}

const getIcon = (iconType: string) => {
  switch (iconType) {
    case "home":
      return <HomeIcon />;
    case "dashboard":
      return <DashboardIcon />;
    case "event":
      return <EventIcon />;
    default:
      return null;
  }
};



export function AppLayout({ title, children }: AppLayoutProps) {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "transparent" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "rgba(26, 26, 46, 0.7)",
            backdropFilter: "blur(20px)",
            color: "#ffffff",
            borderRight: "1px solid rgba(139, 92, 246, 0.2)",
            boxShadow: "4px 0 24px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 3, borderBottom: "1px solid rgba(139, 92, 246, 0.2)" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <AutoAwesomeIcon sx={{ 
              fontSize: 32, 
              color: '#8b5cf6',
              filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))'
            }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                fontSize: "1.75rem",
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
        </Box>

        {/* Navigation */}
        <List sx={{ p: 2.5, flex: 1 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.path}
              selected={
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path)
              }
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1.5,
                borderRadius: "12px",
                py: 1.5,
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  borderRadius: "12px",
                  padding: "2px",
                  background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                },
                "&.Mui-selected": {
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)",
                  "&::before": {
                    opacity: 1,
                  },
                  "& .MuiListItemIcon-root": {
                    color: "#8b5cf6",
                    filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))",
                  },
                  "& .MuiListItemText-primary": {
                    color: "#fff",
                    fontWeight: 600,
                  },
                },
                "&:hover": {
                  background: "rgba(139, 92, 246, 0.1)",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 44,
                  color: "#94a3b8",
                  transition: "all 0.3s ease",
                }}
              >
                {getIcon(item.iconType)}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "0.95rem",
                    fontWeight: 500,
                  }
                }}
              />
            </ListItemButton>
          ))}
        </List>

        {/* User Section */}
        <Box
          sx={{
            p: 2.5,
            borderTop: "1px solid rgba(139, 92, 246, 0.2)",
            background: "rgba(139, 92, 246, 0.05)",
          }}
        >
          {user ? (
            // Authenticated: Show user info and sign out
            <>
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 1.5, 
                mb: 2,
                p: 1.5,
                borderRadius: "12px",
                background: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
              }}>
                <Avatar
                  sx={{
                    width: 44,
                    height: 44,
                    background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)",
                  }}
                >
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 700,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      color: "#fff",
                      fontSize: "0.95rem"
                    }}
                  >
                    {user?.user_metadata?.name || user?.email?.split('@')[0] || "User"}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ 
                      color: "#94a3b8", 
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: "0.75rem"
                    }}
                  >
                    {user?.email || "user@spotlight.com"}
                  </Typography>
                </Box>
              </Box>
              
              <Button
                size="medium"
                variant="outlined"
                fullWidth
                onClick={signOut}
                sx={{ 
                  borderColor: "rgba(139, 92, 246, 0.3)", 
                  color: "#fff",
                  borderRadius: "10px",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#8b5cf6",
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                    transform: "translateY(-2px)",
                  }
                }}
              >
                Sign out
              </Button>
            </>
          ) : (
            // Not authenticated: Show sign in button
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/login")}
              sx={{ 
                background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                borderRadius: "10px",
                py: 1.5,
                fontWeight: 600,
                "&:hover": {
                  background: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
                  transform: "translateY(-2px)",
                }
              }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", background: "transparent" }}>
        {/* Top Bar */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
            background: "rgba(26, 26, 46, 0.8)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(139, 92, 246, 0.2)",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Toolbar sx={{ py: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: "1.5rem",
                background: "linear-gradient(135deg, #fff 0%, #94a3b8 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: '-0.01em'
              }}
            >
              {title}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            mt: "80px",
            p: 4,
            flex: 1,
            overflow: "auto",
            background: "transparent",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}