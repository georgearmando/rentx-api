import { Router } from "express";
import multer from "multer";

import uploadConfig from '@config/upload';
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { UserProfileController } from "@modules/accounts/useCases/userProfile/UserProfileController";

const userRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const userProfileController = new UserProfileController();

userRoutes.post('/', createUserController.handle);
userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);
userRoutes.get('/profile', ensureAuthenticated, userProfileController.handle);

export { userRoutes }
