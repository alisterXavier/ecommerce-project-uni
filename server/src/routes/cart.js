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

app.patch('/cart', async (req, res) => {
  const { customerId, products, id, total } = req.body;

  try {
    const { data: cartData, error: CartError } = await supabase
      .from('Carts')
      .upsert(
        {
          id: id,
          products: products,
          customerId: customerId,
          total: total ?? 0,
        },
        { ignoreDuplicates: false }
      )
      .select().single();
    if (CartError) {
      return res.status(400).json({ error: CartError.message });
    }

    return res.status(200).json({ data: cartData });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Remove items from the cart
// -- might be useless since it can also be updated instead of deleted
// app.post('/remove-from-cart', async (req, res, next) => {
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

app.get('/cart/:id', async (req, res) => {
  const { id } = req.params;

  // Carts Carts_Products and Products

  try {
    const { data, error } = await supabase
      .from('Carts')
      .select('id, customerId, products: Carts_Products(...Products(*)), total')
      .eq('customerId', id).single();
      
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { app as cartRoute };
