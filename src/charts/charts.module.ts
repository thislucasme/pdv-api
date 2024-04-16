import { DatabaseService } from 'src/database/database.service';
import { ChartsController } from './charts.controller';
import { ChartsService } from './charts.service';
import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [],
    controllers: [
        ChartsController,],
    providers: [
        ChartsService, DatabaseService, UserService],
})
export class ChartsModule { }
