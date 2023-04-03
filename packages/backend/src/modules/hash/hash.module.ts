import { Module } from '@nestjs/common';
import { HashService } from '../hash';


@Module({
  imports: [],
  providers: [HashService],
  exports: [HashService],
})
export class HashModule {}
