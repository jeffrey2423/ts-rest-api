import mongoose from "mongoose";
import Utils from "../utils";

export class Connection {
  private static instance: Connection;
  private bdParams: any;

  private constructor(bdParams: any) {
    this.bdParams = bdParams;
  }

  public static getConnection(bdParams: any) {
    if (!Connection.instance) {
      Connection.instance = new Connection(bdParams);
    }

    return Connection.instance;
  }

  private Connect(): void {
    try {
      if (!Utils.IsNothing(this.bdParams.URI)) {
        mongoose.connect(this.bdParams.URI);
        return;
      }
      mongoose.connect(this.bdParams);
    } catch (error) {
      throw error;
    }
  }

  private async Close(): Promise<void> {
    try {
      await mongoose.connection.close();
    } catch (error) {
      throw error;
    }
  }

  public TestConnection(): void {
    try{
      this.Connect();
      console.log("Database is connected");
    }finally{
      this.Close();
      console.log("Connetion was closed");
    }
  }
}
