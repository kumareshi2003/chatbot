import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Container, Typography, Divider, Paper } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatBoxRef = useRef(null);
    useEffect(() => {
        // Scroll chat box to the end when messages change
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (input.trim() === '') return;
    
        const newMessage = { content: input, role: 'user' };
        setMessages(prevMessages => [...prevMessages, newMessage]); // Update messages array without replacing existing messages
        setInput(''); // Clear the input value
        setLoading(true);
    
        try {
            const response = await axios.get('http://localhost:4000/getResponse', { params: { message: input } });
            setMessages(prevMessages => [...prevMessages, { content: response.data, role: 'bot' }]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
        {loading && <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 9999 }}>
       <LinearProgress  />
    </div>}
        <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Typography variant="h4" align="center" sx={{ mt:1,mb:1,fontWeight: 'bold', textTransform: 'uppercase' }}>ChatGPT Bot</Typography>
            <Paper elevation={3} style={{ flex: 1, marginTop: '20px', padding: '20px', overflow: 'auto' }}>
                {messages.map((message, index) => (
                    <>
                    <Paper elevation={0} key={index} sx={{p:2,mt:2,textAlign: message.role === 'user' ? 'right' : 'left'   }}>
                        {message.role === 'user'?
                       <Typography variant="body1">
                         {message.content}  <strong>: User</strong>
                         </Typography>:
                          <Typography>
                             <strong>Bot :</strong>  {message.content}
                          </Typography>
                        }
                    </Paper>
                     <Divider/>
                     </>
                ))}
            </Paper>
            <TextField
                fullWidth
                variant="outlined"
                label="Type your content..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') sendMessage();
                }}
                style={{ marginTop: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={sendMessage} sx={{mt:2,mb:2}}>
                Send
            </Button>
        </Container>
        </>
    );
};

export default Chatbot;
