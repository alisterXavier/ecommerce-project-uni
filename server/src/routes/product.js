import express from 'express';
import { supabase } from '../../supabaseConfig';

import dayjs from 'dayjs';

const app = express();
// Fetching Men's Products
// app.get('/men-products', async (req, res) => {
//   try {
//     const { data, error } = await supabase.from('men_products').select('*');
//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }
//     return res.status(200).json(data);
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Fetching Women's Products
// app.get('/women-products', async (req, res) => {
//   try {
//     const { data, error } = await supabase.from('women_products').select('*');
//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }
//     return res.status(200).json(data);
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Fetching Jewelry Products
// app.get('/jewelry-products', async (req, res) => {
//   try {
//     const { data, error } = await supabase.from('jewelry_products').select('*');
//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }
//     return res.status(200).json(data);
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.get('/products/:category', async (req, res) => {
  const { category } = req.params;
  const currWeek = dayjs().startOf('week').format();

  let { data: categoryList, error: categoryListError } = await supabase
    .from('Categories')
    .select()
    .eq('type', category);

  if (categoryList && categoryList.length > 0) {
    try {
      let data, error;

      switch (category) {
        case 'new': {
          let { data: newArrival, error: newArrivalError } = await supabase
            .from('Products')
            .select('*');
          newArrival = newArrival.filter((item) => {
            const itemWeek = dayjs(item.created_at).startOf('week').format();
            if (itemWeek === currWeek) return item;
          });
          data = newArrival;
          error = newArrivalError;
          break;
        }
        case 'deals': {
          // select * from products where discount > 0
          let { data: deals, error: dealsError } = await supabase
            .from('Products')
            .select('*')
            .gt('discount', 0);
          data = deals;
          error = dealsError;
          break;
        }
        default: {
          // select * from products where category = category_user
          let { data: categoryData, error: categoryError } = await supabase
            .from('Products')
            .select('*')
            .eq('category', category);

          data = categoryData;
          error = categoryError;
          break;
        }
      }

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ data: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else return res.status(400).json({ error: 'Category does not exist' });
});

//endpoint for a specific product
app.get('/product/:productId', async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    let { data: productData, error: productError } = await supabase
      .from('Products')
      .select()
      .eq('id', productId);

    if (productData.length > 0) {
      return res.status(200).json({ data: productData[0] });
    } else {
      return res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { app as productRoute };
