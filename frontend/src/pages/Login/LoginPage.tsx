import { useState, type FC, type FormEvent } from "react";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/contexts/AuthContext";
import { appRoutes } from "../../app/appRoutes";
import logo from "../../shared/koppen_logo_color.png";

export const LoginPage: FC = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login: loginUser } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = await loginUser(login, password);

    if (result) {
      navigate(appRoutes.projects);

      return;
    }

    setError("Invalid login or password");

    setInterval(() => {
      setError(null);
    }, 3000);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: 320,
        margin: "auto",
        marginTop: 8,
        padding: 4,
        borderRadius: 2,
      }}
    >
      <Box display="flex" alignItems="center" flexDirection="column" gap={1.5}>
        <Box display="flex" alignItems="center" flexDirection="row" gap={1.5}>
          {/* <Box sx={{ width: 24, height: 24 }}>
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                fill="currentColor"
              />
            </svg>
          </Box>
          <Typography variant="h6" fontWeight="bold" color="textPrimary">
            Koppen
          </Typography> */}
          <img src={logo} width={300} />
        </Box>
        <Typography variant="h5" component="h1" gutterBottom>
          Authorization
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Login"
          variant="outlined"
          fullWidth
          margin="normal"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, mb: 1 }}
        >
          Log in
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>

      {/* <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
        <Link href="#" underline="hover" variant="body2">
          Forget your password?
        </Link>
        <Link component="button" variant="body2" onClick={() => setSignUpOpen(true)}>
          Sign Up
        </Link>
        <SignUpPopup
          open={signUpOpen}
          onClose={() => setSignUpOpen(false)}
          onSignUp={handleSignUp}
        />
      </Stack> */}
    </Paper>
  );
};
