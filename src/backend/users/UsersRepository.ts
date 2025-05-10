import { ErrorHandler, ErrorResponse } from "../mongodb/ErrorHandler";
import { User, UserI } from "../mongodb/models/Users";
import { connectDB } from "../mongodb/MongoDbProvider";
import { UserInterface } from "./UserInterFace";
interface UserResponse {
  data?: UserInterface | UserInterface[];
  success: boolean;
  error?: ErrorResponse;
}
export async function getAllUsers(limit?: number): Promise<UserResponse> {
  try {
    limit ??= 100;
    await connectDB();
    const users = await User.find<UserI>({}).limit(limit);
    return {
      success: true,
      data: users.map((user) => {
        return {
          id: user._id!.toString(),
          fullName: user.fullName,
          email: user.email,
          birthDay: user.birthDay,
          imageUrl: user.imageUrl,
        };
      }),
    };
  } catch (error) {
    return {
      success: false,
      error: ErrorHandler(error),
    };
  }
}
export async function getUserPagination(
  page: number = 1,
  pageSize: number = 10,
  search?: string
): Promise<{
  data: UserInterface[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  try {
    await connectDB();
    if (pageSize == 0) {
      pageSize = 10;
    }
    if (page == 0) {
      page = 1;
    }
    const skip = (page - 1) * pageSize;

    const query = (search &&search.trim().length!=0) 
      ? {
          $or: [
            { email: { $regex: search, $options: 'i' } },
            { fullName: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const [users, total] = await Promise.all([
      User.find<UserI>(query).sort({ createdAt: -1 }).skip(skip).limit(pageSize),
      search ? User.countDocuments(query) : User.countDocuments(),
    ]);

    return {
      data: users.map((user) => ({
        id: user._id!.toString(),
        fullName: user.fullName,
        email: user.email,
        birthDay: user.birthDay,
        imageUrl: user.imageUrl,
      })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    await connectDB();
    return await User.findById<UserI>(id);
  } catch (error) {
    throw error;
    // return {
    //   success: false,
    //   error: ErrorHandler(error),
    // };
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

    // Then compare the encrypted passwords
    if (user.password === password) {
      return user;
    }

    return null;
  } catch (error) {
    throw error;
  }
}
