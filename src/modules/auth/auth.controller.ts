import type { Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utility/sendResponse";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);
    const { refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
      secure: false, //in production -> true
      httpOnly: true,
      sameSite: "lax",
    });
    res.status(200).json({
      success: true,
      message: "User login successfully",
      data: result,
    });
    sendResponse(res, {
      status: 200,
      success: true,
      message: "User login successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      status: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const refreshToken = async (req: Request, res: Response) => {
  try {
    const result = await authService.generateRefreshToken(
      req.cookies.refreshToken,
    );
    sendResponse(res, {
      status: 200,
      success: true,
      message: "Access token generated",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      status: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};
export const authController = {
  loginUser,
  refreshToken,
};
