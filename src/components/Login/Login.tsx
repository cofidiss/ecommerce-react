import React, { useState, useContext } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import  AppContext  from '../../Contexts/AppContext';
import '../../styles/global.css';
<<<<<<< HEAD
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
=======
>>>>>>> ed09a1dc983c243709c28654a088996fc18903e4

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const { startLoading, stopLoading, setIsLoggedIn } = useContext(AppContext);

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prevShow) => !prevShow);
  };
<<<<<<< HEAD


  
  const testWs = (token: string) => {
    // build ws(s) url from baseUrl
    const wsUrl = baseUrl.replace(/^http/, 'ws') + '/ws';

    const client = new Client({
      brokerURL: wsUrl,
      reconnectDelay: 5000,
      connectHeaders: {
        token: token,
      },
      onConnect: () => {
        console.log('Connected');
        client.subscribe('/user/queue/test', (msg) => {
          console.log('/user/queue/test:', msg.body);
        });
        client.subscribe('/queue/test', (msg) => {
          console.log('queue/tes:', msg.body);
        });
      },
    });

    client.activate();

    return () => client.deactivate();
  }




=======
>>>>>>> ed09a1dc983c243709c28654a088996fc18903e4
  const getUserRole = () => {
    startLoading();
    setError('');

    fetch(`${baseUrl}/api/user/getUserRoles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
        } else {
          return response.text().then(() => setError('Login is unsuccessful.'));
        }
      })
      .catch(() => {
        setError('Login is unsuccessful.');
      })
      .finally(() => {
        stopLoading();
      });
  };
  const handleLogin = () => {
    startLoading();
    setError('');

    fetch(`${baseUrl}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
<<<<<<< HEAD
             debugger;
        if (response.ok) {
          console.log('Giriş başarılı');
          response.text().then(data => {
            const token = data;
            debugger;
            testWs(token);
          });
=======
        if (response.ok) {
          console.log('Giriş başarılı');
>>>>>>> ed09a1dc983c243709c28654a088996fc18903e4
          setIsLoggedIn(true);
          navigate('/');
        } else {
          return response.text().then(() => setError('Login is unsuccessful.'));
        }
      })
      .catch(() => {
        setError('Login is unsuccessful.');
      })
      .finally(() => {
        stopLoading();
      });
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        paddingTop={4}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          label="UserName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordVisibilityToggle} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid >
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;