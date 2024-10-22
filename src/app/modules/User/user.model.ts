 /*eslint-disable @typescript-eslint/no-this-alias */
 
 import bcryptjs from 'bcryptjs';import { Schema, model } from 'mongoose';
 import config from '../../config';

 import { IUserModel, TUser } from './user.interface';
 
 
 const userSchema = new Schema<TUser, IUserModel>(
   {
     name: {
       type: String,
       required: true,
     },
     role: {
       type: String,
       required: true,
     },
     email: {
       type: String,
       required: true,
    
     },
     password: {
       type: String,
       required: true,
       select: 0,
     },
    
  
   },
   {
     timestamps: true,
     virtuals: true,
   }
 );
 
 userSchema.pre('save', async function (next) {
   
   const user = this; 
   // hashing password and save into DB
 
   user.password = await bcryptjs.hash(
     user.password,
     Number(config.bcrypt_salt_rounds)
   );
 
   next();
 });
 
 
 userSchema.post('save', function (doc, next) {
   doc.password = '';
   next();
 });
 
 userSchema.statics.isUserExistsByEmail = async function (email: string) {
   return await User.findOne({ email }).select('+password');
 };
 
 userSchema.statics.isPasswordMatched = async function (
   plainTextPassword,
   hashedPassword
 ) {
   return await bcryptjs.compare(plainTextPassword, hashedPassword);
 };
 
 userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
   passwordChangedTimestamp: number,
   jwtIssuedTimestamp: number
 ) {
   const passwordChangedTime =
     new Date(passwordChangedTimestamp).getTime() / 1000;
   return passwordChangedTime > jwtIssuedTimestamp;
 };
 
 
 
 export const User = model<TUser, IUserModel>('User', userSchema);