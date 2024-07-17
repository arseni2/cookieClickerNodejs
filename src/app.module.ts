import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';
import {CommunityModule} from './community/community.module';
import {FileModule} from './file/file.module';
import {CardModule} from './card/card.module';
import {AuthUserMiddleware} from "./user/middleware/auth-user/auth-user.middleware";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'tai.db.elephantsql.com',
      port: 5432,
      username: 'mcaoyhdc',
      password: 'frlsxWPnuOVx_gOrFm7mzFUxz30oFiqz',
      database: 'mcaoyhdc',
      autoLoadEntities: true,
      synchronize: true,
      logging: "all"
    }),
    UserModule,
    CommunityModule,
    FileModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthUserMiddleware)
        .forRoutes("*")
        .apply(AuthUserMiddleware).exclude("/user/create")
  }
}
