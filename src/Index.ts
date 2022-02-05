import App from "./App";
import config from "./config/server.config";
import { Connection } from "./database/Connection";

class Index {
  private application: App;
  private connection!: Connection;

  constructor() {
    this.application = new App(config);
  }

  public Main() {
    try {
      this.application.Listen();
      this.connection = this.application.app.get('connection');
      this.connection.TestConnection();
    } catch (error) {
      console.error(error)
    }
  }
}

const index: Index = new Index();
index.Main();
