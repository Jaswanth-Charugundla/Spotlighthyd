// src/pages/login.tsx
import React from "react";
import { Box, Card, CardContent, TextField, Button, Stack, Typography, Alert, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    try {
      const res = await supabase.auth.signInWithPassword({ email, password });
      if (res.error) {
        setError(res.error.message);
        setLoading(false);
        return;
      }
      // success: redirect to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed");
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (res.error) {
        setError(res.error.message);
        setLoading(false);
        return;
      }

      // Check if email confirmation is required
      if (res.data.user && !res.data.session) {
        setSuccess("Sign up successful! Please check your email to confirm your account.");
        setLoading(false);
      } else {
        // Auto-confirmed, redirect to dashboard
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err?.message || "Sign up failed");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0b0b0f" }}>
      <Card sx={{ width: 400, p: 2, bgcolor: "#1e293b", color: "#fff" }}>
        <CardContent>
          <Typography variant="h5" mb={2} sx={{ 
            fontWeight: 700,
            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Spotlight Events
          </Typography>

          <Typography variant="h6" mb={3} color="grey.300">
            {isSignUp ? "Create Account" : "Sign In"}
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={isSignUp ? handleSignUp : handleLogin}>
            <Stack spacing={2}>
              <TextField 
                name="email" 
                label="Email" 
                type="email"
                size="small" 
                required 
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': { borderColor: '#334155' },
                    '&:hover fieldset': { borderColor: '#475569' },
                    '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                  },
                  '& .MuiInputLabel-root': { color: '#94a3b8' },
                }}
              />
              <TextField 
                name="password" 
                label="Password" 
                type="password" 
                size="small" 
                required 
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': { borderColor: '#334155' },
                    '&:hover fieldset': { borderColor: '#475569' },
                    '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                  },
                  '& .MuiInputLabel-root': { color: '#94a3b8' },
                }}
              />
              {isSignUp && (
                <TextField 
                  name="confirmPassword" 
                  label="Confirm Password" 
                  type="password" 
                  size="small" 
                  required 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      '& fieldset': { borderColor: '#334155' },
                      '&:hover fieldset': { borderColor: '#475569' },
                      '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                    },
                    '& .MuiInputLabel-root': { color: '#94a3b8' },
                  }}
                />
              )}
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                disabled={loading}
                sx={{
                  bgcolor: "#3b82f6",
                  "&:hover": { bgcolor: "#2563eb" },
                  "&:disabled": { bgcolor: "#334155" }
                }}
              >
                {loading ? (isSignUp ? "Signing up…" : "Signing in…") : (isSignUp ? "Sign Up" : "Sign In")}
              </Button>
            </Stack>
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="grey.400">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <Link
                component="button"
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                  setSuccess(null);
                }}
                sx={{ 
                  color: "#3b82f6", 
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" }
                }}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
