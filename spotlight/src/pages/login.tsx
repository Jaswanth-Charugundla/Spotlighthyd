import type { FormEvent } from "react";
import { Box, Card, CardContent, TextField, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // For now, skip validation and auth
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ width: 400, p: 2 }}>
        <CardContent>
          <Typography variant="h5" mb={2}>
            Spotlight Events
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Login to manage your events.
          </Typography>

          <Box component="form" onSubmit={handleLogin}>
            <Stack spacing={2}>
              <TextField label="Email" size="small" required />
              <TextField label="Password" type="password" size="small" required />
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
