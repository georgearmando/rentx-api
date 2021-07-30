import { container } from "tsyringe";
import { IAuthProvider } from "./AuthProvider/IAuthProvider";
import { JWTAuthProvider } from "./AuthProvider/implementations/JWTAuthProvider";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
  'DateProvider', DayjsDateProvider
);

container.registerSingleton<IAuthProvider>(
  'AuthProvider', JWTAuthProvider
);
