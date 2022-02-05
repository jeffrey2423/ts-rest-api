import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";

import Utils from "./utils";
import { Connection } from "./database/Connection";

import { Auth } from "./routes/Auth";

class App {
  public app: Express;
  private conn!: Connection;

  constructor(config: any) {
    this.app = express();

    this.InitApp(config);
  }

  private InitApp(config: any): void {
    try {
      this.app.set("port", process.env.PORT || config.SERVER_PORT);
      if (config.ENVIROMENT === Utils.Enviroment.DEVELOP) {
        this.conn = Connection.getConnection(config.DATABASE.DEV);
      } else {
        this.conn = Connection.getConnection(config.DATABASE.PROD);
      }
      this.app.set("connection", this.conn);

      this.InitAppMiddlewares(config.ENVIROMENT);
      this.InitAppRoutes();
    } catch (error) {
      throw error;
    }
  }

  private InitAppMiddlewares(enviroment: string): void {
    if (enviroment === Utils.Enviroment.DEVELOP) {
      this.InitDevModules();
      this.InitProdModules();
    } else {
      this.InitProdModules();
    }
  }

  private InitDevModules(): void {
    this.app.use(morgan("dev"));
  }

  private InitProdModules(): void {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(cors());
  }

  private InitAppRoutes(): void {
    this.app.use(new Auth().getRouter());
  }

  public Listen(): void {
    this.app.listen(this.app.get("port"));
    console.log(`Server on port ${this.app.get("port")}`);
  }
}

export default App;
