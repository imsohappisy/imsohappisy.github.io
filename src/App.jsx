
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Login from './pages/Login';
import Board from './pages/Board';

const SESSION_KEY = 'community_session';

function getSession() {
  return localStorage.getItem(SESSION_KEY);
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    setUsername(getSession());
  }, []);

  const handleLogout = () => {
    clearSession();
    setUsername(null);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            맛깔나는 커뮤니티 센터
          </Typography>
          {username ? (
            <>
              <Typography sx={{ mr: 2 }}>{username}님</Typography>
              <Button color="inherit" onClick={handleLogout}>로그아웃</Button>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      <Box mt={4}>
        <Routes>
          <Route path="/" element={username ? <Board username={username} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={setUsername} />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
