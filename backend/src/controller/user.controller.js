const User = require("../models/user.model");
const { success, failure } = require("../utils/response.utils");
const { httpsStatusCodes, serverResponseMessage } = require("../constants/");
const { jwtConfig } = require("../configs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    let { password } = req.body;
    let encryptPassword = await bcrypt.hash(password, 10);
    if(!req.file){
      return failure(
        res,
        httpsStatusCodes.BAD_REQUEST,
        serverResponseMessage.PROFILE_PICTURE_REQUIRED
      );
    }
    const profilePicture = req.media_details.file_path + req.media_details.name
    const data = {
      ...req.body,
      profile_picture: profilePicture,
      password: encryptPassword,
    };
    const UserEmail = await User.findOne({ email : req.body.email });
    if (UserEmail) {
      return failure(
        res,
        httpsStatusCodes.BAD_REQUEST,
        serverResponseMessage.PROFILE_ALREADY_EXISTS
      );
    }
    const response = await User.create(data);
    return success(
      res,
      httpsStatusCodes.CREATED,
      serverResponseMessage.USER_CREATED_SUCCESSFULLY,
      response
    );
  } catch (error) {
    console.log(error);
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return failure(
        res,
        httpsStatusCodes.UNAUTHORIZED,
        serverResponseMessage.INVALID_CREDENTIALS
      );
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return failure(
        res,
        httpsStatusCodes.UNAUTHORIZED,
        serverResponseMessage.INVALID_CREDENTIALS
      );
    }
    const token = jwt.sign(
      { email: user.email, id: user._id, user_type: user.user_type },
      jwtConfig.jwtSecret,
      {
        expiresIn: jwtConfig.tokenExpiration,
      }
    );
    const data = {
      name: user.first_name + " " + user.last_name,
      id: user._id,
      email: user.email,
      user_type: user.user_type,
      token,
    };
    return success(
      res,
      httpsStatusCodes.SUCCESS,
      serverResponseMessage.LOGIN_SUCCESSFULL,
      data
    );
  } catch (error) {
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};