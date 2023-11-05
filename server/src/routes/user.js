import express from 'express';
import { supabase } from '../supabaseConfig';

const app = express();

// Register user with email and pass
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Registration successful', user });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Login successful', user, session });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { app as userRoute };
