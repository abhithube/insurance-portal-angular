import { Plan } from './plan';
import { Payment } from './payment';
import { Notification } from './notification';

export class Member {
  constructor(
    public id: string,
    public username: string,
    public password: string,
    public email: string,
    public plan: Plan,
    public memberSince: number,
    public nextPaymentDate: number,
    public payments: Payment[],
    public notifications: Notification[],
  ) {}
}
