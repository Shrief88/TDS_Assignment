import { User } from "@prisma/client";

export const sanitizeUser = (user: User) => {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    type: user.type,
  };
};
