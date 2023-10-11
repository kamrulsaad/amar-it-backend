import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    logger.info('✅ Database connected successfully');
    app.listen(config.port, () => {
      logger.info(`🚀 Server running on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`❌ Error while connecting to database: ${error}`);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(`Error: ${error} ❌`);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();
