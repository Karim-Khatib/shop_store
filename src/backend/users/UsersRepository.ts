import { ErrorHandler, ErrorResponse } from "../mongodb/ErrorHandler";
import { User } from "../mongodb/models/Users";
import { connectDB } from "../mongodb/MongoDbProvider";

interface UserResponse {
  data?: typeof User | (typeof User)[];
  success: boolean;
  error?: ErrorResponse;
}
export async function getAllUsers(limit?: number): Promise<UserResponse> {
  try {
    limit ??= 100;
    await connectDB();
    const users = await User.find({}).limit(limit);
    return {
      success: true,
      data: users,
    };
  } catch (error) {
    return {
      success: false,
      error: ErrorHandler(error),
    };
  }
}

export async function getUserById(id: string): Promise<UserResponse> {
  try {
    await connectDB();
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    return {
      success: true,
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      error: ErrorHandler(error),
    };
  }
}

export async function getUserByEmail(email: string) {
  try {
    await connectDB();
    const user = await User.findOne({ email: email });
    if (!user) {
      return undefined;
    }
    return user;
  } catch (error) {
    throw error;
    //   return {
    //         success:false,
    //         error:ErrorHandler(error),

    //   }
  }
}

interface createUserParams {
  fullName: string;
  email: string;
  password: string;
  imageUrl?: string;
  birthDay: Date;
  createdAt: Date;
}
export async function createUser(param: createUserParams) {
  try {
    await connectDB();
    const newUser = new User({
      fullName: param.fullName,
      email: param.email,
      password: param.password,
      birthDay: param.birthDay,
      imageUrl: param.imageUrl,
      createdAt: new Date(),
    });
    return await User.create(newUser);
    // return {
    //     success:true,
    //     data:createdUser,
    // }
  } catch (error) {
    throw error;
    // return {
    //     success:false,
    //     error:ErrorHandler(error),
    // }
  }
}

export async function updateUser(
  id: string,
  user: typeof User
): Promise<UserResponse> {
  try {
    await connectDB();
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  } catch (error) {
    return {
      success: false,
      error: ErrorHandler(error),
    };
  }
}

export async function deleteUser(id: string): Promise<UserResponse> {
  try {
    await connectDB();
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) throw new Error("User not found");
    return {
      success: true,
      data: deletedUser,
    };
  } catch (error) {
    return {
      success: false,
      error: ErrorHandler(error),
    };
  }
}

export async function getUserByEmailAndPassword(
  email: string,
  password: string
) {
  try {
    await connectDB();
    // First find user by email only
    const user = await User.findOne({ email: email });

    if (!user) {
      return null;
    }
    console.log({ user: user ,password:password});
    
    // Then compare the encrypted passwords
    if (user.password === password) {
      return user;
    }

    return null;
  } catch (error) {
    throw error;
  }
}
