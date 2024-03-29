import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signUpController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(201)
        .send({ success: false, message: "email is already registered!" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser
      .save()
      .then(() => {
        console.log("new user signed in");
        res.status(201).send(newUser);
      })
      .catch((e) => {
        return next(errorHandler(401, "something went wrong"));
      });
  } catch (error) {
    console.log(error);
    return next(errorHandler(500, "something went wrong"));
  }
};
// *Sign in Controller: {operations:Cookie session created}

export const signInController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res
        .status(201)
        .send({ success: false, message: "Email is not registered" });
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return res
        .status(201)
        .send({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    // Combine setting cookie and sending response in a single send call
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 10),
      })
      .status(200)
      .send(rest);
  } catch (error) {
    console.log(error);
    return next(errorHandler(500, "Something went wrong"));
  }
};

export const googleController = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 10),
        })
        .status(200)
        .send(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 10),
        })
        .status(200)
        .send(rest);
    }
  } catch (error) {
    console.log(error);
    return next(errorHandler(500, "Google Auth Failed"));
  }
};

export const signOut=async(req,res,next)=>{
  try {
    console.log('signing out')
     return res.clearCookie('access_token').status(200).send("User has been logged put")
  } catch (error) {
    console.log(error)
    return next(errorHandler(500,"Sign Out function failed!"))
  }
}