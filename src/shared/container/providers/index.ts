import { container } from "tsyringe";
import { IAuthProvider } from "./AuthProvider/IAuthProvider";
import { JWTAuthProvider } from "./AuthProvider/implementations/JWTAuthProvider";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>(
  'DateProvider', DayjsDateProvider
);

container.registerSingleton<IAuthProvider>(
  'AuthProvider', JWTAuthProvider
);

container.registerInstance<IMailProvider>(
  'MailProvider', new EtherealMailProvider()
);
