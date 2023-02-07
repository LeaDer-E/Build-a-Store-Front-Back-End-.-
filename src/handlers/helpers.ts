import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../models/userUnit';
import dotenv from 'dotenv';

dotenv.config();

const Secret_Token_Key = process.env.TOKEN_KEY as Secret;

const gettingTheTokenFromUser = (user: User) => {
  return jwt.sign({ user }, Secret_Token_Key);
};

const verifyingTheToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    res.status(401);
    res.json({ error: 'Sorry, Wrong Token, Try to Not Play in Something Like This ;)' });
    return false;
  } try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, Secret_Token_Key);
    next();
  } catch (error) {
    res.status(401);
    res.json('Sorry, Wrong Token, Try to Not Play in Something Like This ;)');
    return;
  };
};

export {
  gettingTheTokenFromUser,
  verifyingTheToken,
  Secret_Token_Key,
};