import { Table, Column, Model, DataType, HasMany, HasOne } from 'sequelize-typescript';
import Transaction from './Transaction.model';
import Company from './Company.model';
import User from './User.model';
import { Reserve } from './Reserve.model';
import { on } from 'events';

@Table({
  tableName: 'Entity',
  timestamps: false,
})
export class Entity extends Model {
  @Column({
    primaryKey: true,
    field: 'CVU',
    type: DataType.INTEGER,
  })
  CVU!: number;

  @Column({
    type: DataType.STRING(20),
    field: 'alias',
  })
  alias?: string;

  @Column({
    type: DataType.DOUBLE,
    field: 'balance',
  })
  balance?: number;

  @Column({
    type: DataType.STRING(45),
    field: 'email',
  })
  email?: string;

  @HasMany(() => Transaction, 'senderCVU')
  sentTransactions!: Transaction[];

  @HasMany(() => Transaction, 'recipientCVU')
  receivedTransactions!: Transaction[];

  @HasOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User;

  @HasMany(() => Reserve, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  reserve!: Reserve[];

  @HasOne(() => Company,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  company!: Company;
}

export default Entity;
