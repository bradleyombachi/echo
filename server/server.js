const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const cors = require('cors');
require('dotenv').config();

const client_id = process.env.CLIENT_ID;
const redirect_uri = 'http://localhost:8888/callback';
const client_secret = process.env.CLIENT_SECRET;

const app = express();
app.use(express.json());
app.use(cors());


function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.get('/', (req, res) => {
  res.send('Welcome to the home page'); // You can customize this response
});

app.get('/login', function(req, res) {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-top-read playlist-read-private';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

// ... (previous server-side code)

app.get('/callback', async function(req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
      }
    };

    try {
      const response = await axios.post(authOptions.url, querystring.stringify(authOptions.form), {
        headers: authOptions.headers
      });

      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      // Redirect to the client-side application with the access token in the URL
      res.redirect(`http://localhost:5173/?access_token=${access_token}`);
      
    } catch (error) {
      // Handle errors, e.g., log them and redirect to an error page
      console.error(error);
      res.redirect('/error');
    }
  }
});

// ... (remaining server-side code)


const PORT = 8888;
app.listen(8888, () => console.log('Server is listening on port 8888'));
