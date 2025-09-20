import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import bcrypt from 'bcryptjs';

const USERS_KEY = 'community_users';
const SESSION_KEY = 'community_session';

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
}
function setUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function setSession(username) {
  localStorage.setItem(SESSION_KEY, username);
}

export default function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUsers();
    if (isSignup) {
      if (users[username]) {
        setError('이미 존재하는 아이디입니다.');
        return;
      }
      const hash = bcrypt.hashSync(password, 8);
      users[username] = hash;
      setUsers(users);
      setSession(username);
      onLogin(username);
    } else {
      if (!users[username]) {
        setError('존재하지 않는 아이디입니다.');
        return;
      }
      if (!bcrypt.compareSync(password, users[username])) {
        setError('비밀번호가 틀렸습니다.');
        return;
      }
      setSession(username);
      onLogin(username);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" mb={2} align="center">
          {isSignup ? '회원가입' : '로그인'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="아이디"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="비밀번호"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {error && <Typography color="error" fontSize={14}>{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            {isSignup ? '회원가입' : '로그인'}
          </Button>
        </form>
        <Button color="secondary" fullWidth sx={{ mt: 1 }} onClick={() => { setIsSignup(!isSignup); setError(''); }}>
          {isSignup ? '로그인으로' : '회원가입으로'}
        </Button>
      </Paper>
    </Box>
  );
}
