import { useState, type FC, type FormEvent } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/contexts/AuthContext";
import { appRoutes } from "../../app/appRoutes";
import { StyledPaper } from "./LoginPage.styles";

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
    <StyledPaper elevation={3}>
      <Typography variant="h5" gutterBottom>
        Sign in to Koppen
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          onChange={(e) => setLogin(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="error"
          size="large"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Log in
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </StyledPaper>
  );
};
