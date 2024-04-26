import { Injectable, NestMiddleware, HttpStatus, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { nome, cpf } = req.body;
    if (!nome || !cpf) {
      throw new BadRequestException('É necessário Nome e CPF.');
    }
    next();
  }
}
