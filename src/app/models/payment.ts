export class Payment {
  constructor(
    public id: string,
    public amount: number,
    public createdAt: number,
    public plan: string
  ) {}
}
