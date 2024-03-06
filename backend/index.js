const express = require('express');
const cors = require('cors')
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const rootRouter = require("./routes/index");
app.use("/api/v1", rootRouter); // all request that come to /api/v1 go to rootRouter.

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
