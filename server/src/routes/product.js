import express from 'express';
import { supabase } from '../supabaseConfig';
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

  if (categoryList.length > 0) {
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
          let { data: deals, error: dealsError } = await supabase
            .from('Products')
            .select('*')
            .gt('discount', 0);
          data = deals;
          error = dealsError;
          break;
        }
        default: {
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
  } else return res.status(403).json({ error: 'No such Category' });
});

export { app as productRoute };
