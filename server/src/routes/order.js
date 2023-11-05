import express from 'express';
import { supabase } from '../supabaseConfig';

const app = express();

// Create a final order  ----- TODO
app.post('/orders', async (req, res) => {
  const { cartId } = req.body;

  try {
    const { data, error } = await supabase
      .from('Carts')
      .select()
      .eq('id', cartId);

    // data.map()
    // const { data, error } = await supabase.from('Orders').upsert([
    //   {
    //     products,
    //     carts,
    //     customers,
    //     totalprice
    //   },
    // ]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Optionally, you clearing the user's cart here.

    return res.status(200).json({ message: 'Order created', data });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { app as orderRoute };
