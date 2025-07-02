export interface User {
  _id: string;
  id: string;
  email: string;
  name: string;
  role: string;
  lostfoundID: string;
  profileImage: string;
  bio: string;
  badges: string[];
  favoritePosts: string[];
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
