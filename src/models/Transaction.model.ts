import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import Category from './Category.model';
import Entity from './Entity.model';

@Table({
  tableName: 'Transaction',
  timestamps: false,
})
export class Transaction extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'idTransaction',
    type: DataType.INTEGER,
  })
  transactionId!: number;

  @Column({
    type: DataType.FLOAT,
    field: 'amount',
  })
  amount?: number;

  @Column({
    type: DataType.STRING,
    field: 'reason',
  })
  reason?: string;

  @Column({
    type: DataType.DATE,
    field: 'date',
  })
  date?: Date;

  @ForeignKey(() => Category)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'category_idCategory',
  })
  categoryId!: number;

  @ForeignKey(() => Entity)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'sender_CVU',
  })
  senderCVU!: number;

  @ForeignKey(() => Entity)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'recipient_CVU',
  })
  recipientCVU!: number;

  @BelongsTo(() => Category)
  category!: Category;

  @BelongsTo(() => Entity, 'senderCVU')
  sender!: Entity;

  @BelongsTo(() => Entity, 'recipientCVU')
  recipient!: Entity;
}

export default Transaction;
