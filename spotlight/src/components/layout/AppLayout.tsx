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
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const drawerWidth = 260;

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
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1e293b",
            color: "#ffffff",
            borderRight: "1px solid #334155",
          },
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 3, borderBottom: "1px solid #334155" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.5rem",
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Spotlight
          </Typography>
        </Box>

        {/* Navigation */}
        <List sx={{ p: 2 }}>
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
                mb: 1,
                borderRadius: "8px",
                "&.Mui-selected": {
                  backgroundColor: "#334155",
                  color: "#3b82f6",
                  "& .MuiListItemIcon-root": {
                    color: "#3b82f6",
                  },
                },
                "&:hover": {
                  backgroundColor: "#334155",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: "inherit",
                }}
              >
                {getIcon(item.iconType)}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>

        {/* User Section */}
        <Box
          sx={{
            mt: "auto",
            p: 2,
            borderTop: "1px solid #334155",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                backgroundColor: "#3b82f6",
                fontSize: "0.9rem",
              }}
            >
              AD
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Admin
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#94a3b8", display: "block" }}
              >
                admin@spotlight.com
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Bar */}
        <AppBar
          position="fixed"
          sx={{
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "#ffffff",
            color: "#1e293b",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: "1.1rem",
              }}
            >
              {title}
            </Typography>
            <IconButton
              onClick={handleMenuOpen}
              size="small"
              sx={{ color: "#64748b" }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            mt: "64px",
            p: 3,
            flex: 1,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}