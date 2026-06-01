import { app } from "./app";

const PORT = 3000;

app.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
  console.log(`🚀 Server running on port ${PORT}`);
});
