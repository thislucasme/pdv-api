import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [UserModule],
    controllers: [
        ClienteController,],
    providers: [
        ClienteService,UserService],
        exports:[ClienteService, ClienteModule]
})
export class ClienteModule { }
