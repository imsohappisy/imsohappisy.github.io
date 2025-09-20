import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Paper, List, ListItem, ListItemText } from '@mui/material';

const POSTS_KEY = 'community_posts';

function getPosts() {
  return JSON.parse(localStorage.getItem(POSTS_KEY) || '[]');
}
function setPosts(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export default function Board({ username }) {
  const [posts, setPostsState] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    setPostsState(getPosts());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    const newPost = { id: Date.now(), author: username, content, date: new Date().toLocaleString() };
    const updated = [newPost, ...getPosts()];
    setPosts(updated);
    setPostsState(updated);
    setContent('');
  };

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">글 작성</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="내용을 입력하세요"
            value={content}
            onChange={e => setContent(e.target.value)}
            fullWidth
            multiline
            minRows={2}
            sx={{ my: 2 }}
          />
          <Button type="submit" variant="contained">공유하기</Button>
        </form>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>공유된 글</Typography>
        <List>
          {posts.length === 0 && <Typography color="text.secondary">아직 글이 없습니다.</Typography>}
          {posts.map(post => (
            <ListItem key={post.id} alignItems="flex-start" divider>
              <ListItemText
                primary={post.content}
                secondary={<>
                  <Typography component="span" variant="body2" color="text.primary">{post.author}</Typography>
                  {` | ${post.date}`}
                </>}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
