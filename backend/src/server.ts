import { app } from "./app";
import { port } from "./config";

app.listen(port ?? 5000, () => {
  console.log("🚀 Server ready at: http://localhost:" + port);
});
