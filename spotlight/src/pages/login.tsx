// src/pages/login.tsx
import React from "react";
import { Box, Card, CardContent, TextField, Button, Stack, Typography, Alert, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

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
    <Box 
      sx={{ 
        minHeight: "100vh", 
        width: "100vw", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background blur circles */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 6s ease-in-out infinite 1s',
        }}
      />

      <Card 
        sx={{ 
          width: 480, 
          p: 4,
          background: "rgba(26, 26, 46, 0.8)",
          backdropFilter: 'blur(20px)',
          border: "1px solid rgba(139, 92, 246, 0.3)",
          borderRadius: 4,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 1,
          "&::before": {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)',
            borderRadius: '16px 16px 0 0',
          }
        }}
      >
        <CardContent>
          {/* Logo and title */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 72,
                height: 72,
                borderRadius: 3,
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                mb: 2,
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: 40, color: '#8b5cf6' }} />
            </Box>
            <Typography 
              variant="h4" 
              mb={1} 
              sx={{ 
                fontWeight: 800,
                background: "linear-gradient(135deg, #fff 0%, #8b5cf6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: '-0.02em'
              }}
            >
              Spotlight Events
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 500,
              }}
            >
              {isSignUp ? "Create Your Account" : "Welcome Back"}
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                '& .MuiAlert-icon': {
                  color: '#ef4444'
                }
              }}
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3,
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                '& .MuiAlert-icon': {
                  color: '#22c55e'
                }
              }}
            >
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={isSignUp ? handleSignUp : handleLogin}>
            <Stack spacing={3}>
              <TextField 
                name="email" 
                label="Email" 
                type="email"
                required 
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    background: 'rgba(26, 26, 46, 0.4)',
                    '& fieldset': { borderColor: 'rgba(139, 92, 246, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(139, 92, 246, 0.5)' },
                    '&.Mui-focused fieldset': { 
                      borderColor: '#8b5cf6',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root': { 
                    color: 'rgba(255, 255, 255, 0.6)',
                    '&.Mui-focused': {
                      color: '#8b5cf6'
                    }
                  },
                }}
              />
              <TextField 
                name="password" 
                label="Password" 
                type="password" 
                required 
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    background: 'rgba(26, 26, 46, 0.4)',
                    '& fieldset': { borderColor: 'rgba(139, 92, 246, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(139, 92, 246, 0.5)' },
                    '&.Mui-focused fieldset': { 
                      borderColor: '#8b5cf6',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root': { 
                    color: 'rgba(255, 255, 255, 0.6)',
                    '&.Mui-focused': {
                      color: '#8b5cf6'
                    }
                  },
                }}
              />
              {isSignUp && (
                <TextField 
                  name="confirmPassword" 
                  label="Confirm Password" 
                  type="password" 
                  required 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      background: 'rgba(26, 26, 46, 0.4)',
                      '& fieldset': { borderColor: 'rgba(139, 92, 246, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(139, 92, 246, 0.5)' },
                      '&.Mui-focused fieldset': { 
                        borderColor: '#8b5cf6',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root': { 
                      color: 'rgba(255, 255, 255, 0.6)',
                      '&.Mui-focused': {
                        color: '#8b5cf6'
                      }
                    },
                  }}
                />
              )}
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                  boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)',
                  transition: 'all 0.3s ease',
                  "&:hover": { 
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 32px rgba(139, 92, 246, 0.6)',
                    background: "linear-gradient(135deg, #9d6cff 0%, #ff5eb7 100%)",
                  },
                  "&:disabled": { 
                    background: 'rgba(139, 92, 246, 0.3)',
                    color: 'rgba(255, 255, 255, 0.4)',
                    boxShadow: 'none',
                  }
                }}
              >
                {loading ? (isSignUp ? "Signing up…" : "Signing in…") : (isSignUp ? "Sign Up" : "Sign In")}
              </Button>
            </Stack>
          </Box>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
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
                  color: "#8b5cf6", 
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  "&:hover": { 
                    color: "#ec4899",
                    textDecoration: "underline"
                  }
                }}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-20px) scale(1.05); }
          }
        `}
      </style>
    </Box>
  );
}
