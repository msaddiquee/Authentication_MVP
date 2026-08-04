import { app, PORT } from "./app.js";
import { connectdb } from "./config/db.js";

// Comment: Connect to the database before the Express server starts listening for traffic
await connectdb();

app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));