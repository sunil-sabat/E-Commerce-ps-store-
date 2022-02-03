import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "email@example.com",
    password: bcrypt.hashSync("12356", 10),
    isAdmin: true,
  },
  {
    name: "John",
    email: "John@example.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: false,
  },
  {
    name: "Doe",
    email: "Doe@example.com",
    password: bcrypt.hashSync("1235", 10),
    isAdmin: false,
  },
];

console.log(users);

export default users;
