export interface Profile {
  name: string;
  surname: string;
  email: string;
  role: "admin" | "client";
  createDate: string;
  memberSince?: string;
}
