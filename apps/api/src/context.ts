import { PrismaClient } from '.prisma/client';
import { ExpressContext } from 'apollo-server-express';

export interface Context {
  prisma: PrismaClient;
  token?: string;
  req: ExpressContext['req'];
  res: ExpressContext['res'];
}

export const prisma = new PrismaClient();

export const context = ({ req, res }: ExpressContext): Context => {
  return { prisma, req, res };
};
