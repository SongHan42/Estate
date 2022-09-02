import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { HouseModule } from './house/house.module';
import { GradeModule } from './grade/grade.module';
import { ImportanceModule } from './importance/importance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    HouseModule,
    GradeModule,
    ImportanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
