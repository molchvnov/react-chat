import { React, useContext, useState } from 'react';
import { Context } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button, Container, Grid, TextField, Avatar } from '@material-ui/core';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Loader from './Loader';
import firebase from 'firebase';

function Chat() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState('');
  const [messages, loading] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt'),
  );

  const sendMessage = async () => {
    firestore.collection('messages').add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue('');
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Grid
        container
        justify="center"
        style={{ height: window.innerHeight - 70, marginTop: '20px' }}>
        <div
          style={{
            width: '80%',
            height: '60vh',
            border: '1px solid lightgrey',
            overflowY: 'auto',
            padding: '  10px',
          }}>
          {messages.map((message) => (
            <div
              key={`${message.uid}_${message.createdAt}`}
              style={{
                background: user.uid === message.uid ? '#03A9F4' : '#B39DDB',
                padding: '10px',
                borderRadius: '10px',
                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                marginBottom: '10px',
                marginTop: '10px',
                width: 'fit-content',
                minWidth: '200px',
              }}>
              <Grid container alignItems="center">
                <Avatar src={message.photoURL} />
                <div style={{ marginLeft: '10px', fontWeight: '600' }}>{message.displayName}</div>
              </Grid>
              <div style={{ marginTop: '10px' }}>{message.text}</div>
            </div>
          ))}
        </div>
        <Grid
          container
          direction="column"
          alignItems="flex-end"
          style={{ width: '80%', height: '25vh', marginTop: '20px' }}>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            variant="outlined"
            fullWidth
            rowsMax={2}
          />
          <Button
            onClick={sendMessage}
            variant="outlined"
            style={{ marginTop: '15px', width: '150px' }}>
            SEND
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Chat;
