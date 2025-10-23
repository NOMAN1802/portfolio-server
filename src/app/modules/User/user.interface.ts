/* eslint-disable no-unused-vars */
import { Model, Schema } from 'mongoose';

export type TUser = {
  _id?: string;
  name: string;
  role: "admin";
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}