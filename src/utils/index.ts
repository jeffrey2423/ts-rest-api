import { serverMessages } from "../resources/messages/messages";

module Utils {
  export enum Enviroment {
    DEVELOP = "DEV",
    PRODUCTION = "PROD",
  }

  export const messages = {
    get(messageKey: number, traza: string = ""): any {
      let data: any;
      try {
        data = serverMessages.find((obj) => {
          return obj.id === messageKey;
        });

        if (!IsNothing(data)) {
          if (traza != "") {
            data.traza = traza;
          }
        } else {
          data = { id: 0, description: "", status: "" };
        }
        return JSON.stringify(data);
      } catch (error) {
        console.error(error);
      }
    },
  };

  export function IsNothing(value: any): boolean {
    let flag = false;
    if (value === undefined || value === "" || value === null || value === " ") {
      flag = true;
    }
    return flag;
  }
}

export default Utils;
