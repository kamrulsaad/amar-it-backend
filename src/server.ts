import app from "./app";
import config from "./config";

async function main() {
  console.log("Connected to MongoDB");
  app.listen(config.port, () => {
    console.log(`Server running at port ${config.port}`);
  });
}

main();