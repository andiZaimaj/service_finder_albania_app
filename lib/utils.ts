import type { User } from "@/types/api";

export function getFullName(user: Pick<User, "firstName" | "lastName">) {
  return `${user.firstName} ${user.lastName}`.trim();
}
