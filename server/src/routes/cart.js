import express from 'express';
import { supabase } from '../../supabaseConfig';

const app = express();

// Update the cart
// app.patch('/cart', async (req, res) => {
//   const { CustomerId, products } = req.body;

//   try {
//     const { data, error } = await supabase.from('Carts').upsert([
//       {
//         CustomerId,
//         products,
//       },
//     ]);

//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }

//     return res.status(200).json({ message: 'Product added to cart', data });
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.patch('/add/cart', async (req, res) => {
  const { CustomerId, productId } = req.body;

  try {
    const { data, error } = await supabase.from('Carts_Products').insert([
      {
        CustomerId,
        productId,
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
// -- might be useless since it can also be updated instead of deleted
// app.delete('/cart', async (req, res, next) => {
//   const { CustomerId, productId } = req.body;

//   try {
//     const { data, error } = supabase.from('Carts');
//     const newdata = data[0].products.filter(
//       (item) => item !== productId.eq('CustomerId', CustomerId)
//     );
//     const { error: updateError } = await supabase
//       .from('Carts')
//       .update({ products: newdata })
//       .eq('CustomerId', CustomerId);
//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }

//     return res.status(200).json({ message: 'Product removed from cart', data });
//   } catch (error) {
//     next(error);
//   }
// });

// Get user's cart
// app.get('/get-cart/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const { data, error } = await supabase
//       .from('Carts')
//       .select()
//       .eq('customerId', id);

//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }

//     return res.status(200).json({data: data});
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.get('/cart/:id', async (req, res) => {
  const { id } = req.params;

  // Carts Carts_Products and Products

  try {
    const { data, error } = await supabase
      .from('Carts')
      .select('*, Carts_Products( Products ( * ) )')
      .eq('customerId', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { app as cartRoute };
