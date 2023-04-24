import { config } from 'dotenv';
config();
import { ApolloServer } from 'apollo-server-express';
import { context } from './context';
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';

// Rest Api auth routes (using express for auth signin, authenticate - send cookies)
import Routes from './routes/index.routes';

//client
import { ClientResolvers, ClientTypeDefs } from './modules/client/modules/protected/index.modules';
import { PublicClientResolvers, PublicClientTypeDefs } from './modules/client/modules/public/index.modules'; //public
import { Client_PassportAuthenticate } from './modules/client/routes/passport/index.passport';

const PORT = process.env.PORT || 4000;
const AdminURL = process.env.NODE_ENV === 'production' ? (process.env.ADMIN_URL as string) : 'http://localhost:5001';
const ClientURL = process.env.NODE_ENV === 'production' ? (process.env.CLIENT_URL as string) : 'http://localhost:3000';
const CompaniesURL =
  process.env.NODE_ENV === 'production' ? (process.env.COMPANIES_URL as string) : 'http://localhost:5005';

const startApolloServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(
    cors({
      origin: [AdminURL, ClientURL, CompaniesURL],
      credentials: true,
    }),
  );

  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(helmet());
  app.use(morgan('tiny'));
  app.use(passport.initialize());

  //routes
  app.use('', Routes);

  // #-- enable to authenticate before excuting Client query
  app.use('/graphql/client', Client_PassportAuthenticate);

  //Client gql
  const Clientserver = new ApolloServer({
    resolvers: [ClientResolvers],
    typeDefs: [ClientTypeDefs],
    context: context,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });
  const PublicClientserver = new ApolloServer({
    resolvers: [PublicClientResolvers],
    typeDefs: [PublicClientTypeDefs],
    context: context,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  // More required logic for integrating with Express
  await PublicClientserver.start();
  await Clientserver.start();

  Clientserver.applyMiddleware({
    app,
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/graphql/client',
    cors: {
      origin: [ClientURL],
    },
  });
  PublicClientserver.applyMiddleware({
    app,
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/graphql/public_client',
    cors: {
      origin: [ClientURL],
    },
  });

  //404
  app.get('*', (_req, res) => {
    res.status(404).send('what???');
  });
  app.post('*', (_req, res) => {
    res.status(404).send('what???');
  });
  app.put('*', (_req, res) => {
    res.status(404).send('what???');
  });
  app.delete('*', (_req, res) => {
    res.status(404).send('what???');
  });

  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀🔒 Client Server ready at http://localhost:${PORT}${Clientserver.graphqlPath}`);
  console.log(`🚀 Client Server ready at http://localhost:${PORT}${PublicClientserver.graphqlPath}`);
};

//start express graphql
startApolloServer();
