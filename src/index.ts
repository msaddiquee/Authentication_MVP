import { app, PORT } from "./app.js";
import { connectdb } from "./config/db.js";

await connectdb();

app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));