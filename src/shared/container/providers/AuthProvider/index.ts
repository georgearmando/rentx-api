import { container } from "tsyringe";
import { IAuthProvider } from "./IAuthProvider";
import { JWTAuthProvider } from "./implementations/JWTAuthProvider";

container.registerSingleton<IAuthProvider>(
  'AuthProvider', JWTAuthProvider
);
