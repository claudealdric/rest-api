import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  add24Hours(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 24);
    return newDate;
  }

  isValidDateTime(dateTime: Date): boolean {
    return !isNaN(dateTime.valueOf());
  }
}
