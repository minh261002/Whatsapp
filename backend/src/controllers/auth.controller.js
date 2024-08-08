import createHttpError from "http-errors";
import { createUser, signUser } from "../services/auth.service.js";
import { generateToken, verifyToken } from "../services/token.service.js";
import { findUser } from "../services/user.service.js";


export const register = async (req, res, next) => {
  try {
    const { name, email, picture, status, password } = req.body;
    console.log(req.body);
    const newUser = await createUser({
      name,
      email,
      picture,
      status,
      password,
    });

    const access_token = await generateToken(
      {
        userId: newUser._id,
      },
      process.env.ACCESS_SECRET_KEY,
      "1d"
    );

    const refresh_token = await generateToken(
      {
        userId: newUser._id,
      },
      process.env.REFRESH_SECRET_KEY,
      "30d"
    );

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refresh-token",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
        status: newUser.status,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async(req, res, next) => {
  try {
    const {email, password} = req.body;
    const user =await signUser(email, password);

    const access_token = await generateToken(
      {
        userId: user._id,
      },
      process.env.ACCESS_SECRET_KEY,
      "1d"
    );

    const refresh_token = await generateToken(
      {
        userId: user._id,
      },
      process.env.REFRESH_SECRET_KEY,
      "30d"
    );


    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refresh-token",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async(req, res, next) => {
  try {
    res.clearCookie("refresh_token", { path: "/api/v1/auth/refresh-token" });
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async(req, res, next) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    if(!refresh_token){
      throw createHttpError.Unauthorized('Please login to continue');
    }
    const checkToken = await verifyToken(refresh_token, process.env.REFRESH_SECRET_KEY);
    const user = await findUser(checkToken.userId);
    const access_token = await generateToken({
        userId: user._id,
      },
      process.env.ACCESS_SECRET_KEY,
      "1d"
    );

    res.json({
      message: "Token refreshed successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
        token: access_token,
      },
    })
  } catch (error) {
      next(error);
  }
};