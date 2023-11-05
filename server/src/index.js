    
import { createServer } from './server';

const port = 5001;
const server = createServer();

// Check if the server is running
server.listen(port, () => {
  console.log(`api running on http://localhost:${port}/`);
});
