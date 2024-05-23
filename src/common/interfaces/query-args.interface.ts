import { Filterable, Includeable, Transaction } from 'sequelize';

export interface IFindArgs extends Filterable {
  include?: Includeable | Includeable[];
  attributes: any[];
  order?: any[];
}

export interface IInsertArgs {
  transaction?: Transaction;
}

export interface IUpdateArgs extends IInsertArgs {
  where: any;
}
