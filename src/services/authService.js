import { initialUsers } from "@/data/mockUsers"; 


const getUsersDB = () => {
  if (typeof window === "undefined") return initialUsers || [];
  
  const storedUsers = localStorage.getItem("users_db");
  if (!storedUsers) {
    const db = initialUsers || []; 
    localStorage.setItem("users_db", JSON.stringify(db));
    return db;
  }
  return JSON.parse(storedUsers);
};

export const loginUser = async (email, password) => {

  const users = getUsersDB();
  
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid email or password"); 
  }

  const token = btoa(JSON.stringify({ id: user._id, role: user.role }));

  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  return {
    success: true,
    user: user,
    token: token,
  };
};

export const registerUser = async (userData) => {

  const users = getUsersDB();

  if (users.find((u) => u.email === userData.email)) {
    throw new Error("This email is already registered");
  }
  
  if (users.find((u) => u.username === userData.username)) {
    throw new Error("This username is already taken");
  }

  const newUser = {
    _id: `user_${Date.now()}`,
    ...userData,
    avatar: { url: null, publicId: null },
    childrenId: [],
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  if (typeof window !== "undefined") {
    localStorage.setItem("users_db", JSON.stringify(users));
    
    const token = btoa(JSON.stringify({ id: newUser._id, role: newUser.role }));
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(newUser));
        window.location.href = "/login";

  }

  return {
    success: true,
    message: "Account created successfully",
    user: newUser,
  };
};

export const logoutUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
};