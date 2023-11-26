import express from 'express';
import { supabase } from '../../supabaseConfig';

const app = express();

// Update the cart
app.post('/add-to-cart', async (req, res) => {
  const { CustomerId, products } = req.body;

  try {
    const { data, error } = await supabase.from('Carts').upsert([
      {
        CustomerId,
        products,
      },
    ]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Product added to cart', data });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Remove items from the cart
app.post('/remove-from-cart', async (req, res, next) => {
  const { CustomerId, productId } = req.body;

  try {
    const { data, error } = supabase.from('Carts');
    const newdata = data[0].products.filter(
      (item) => item !== productId.eq('CustomerId', CustomerId)
    );
    const { error: updateError } = await supabase
      .from('Carts')
      .update({ products: newdata })
      .eq('CustomerId', CustomerId);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Product removed from cart', data });
  } catch (error) {
    next(error);
  }
});

// Get user's cart
app.get('/get-cart', async (req, res) => {
  const { CustomerId } = req.query;

  try {
    const { data, error } = await supabase
      .from('Carts')
      .select()
      .eq('CustomerId', CustomerId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ cart: data });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { app as cartRoute };
