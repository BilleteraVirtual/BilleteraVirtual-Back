import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Category } from './Category.model';
import Entity from './Entity.model';

@Table({
  tableName: 'Transaccion',
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
  @Column({
    type: DataType.INTEGER,
    field: 'category_idCategory',
  })
  categoryId!: number;

  @ForeignKey(() => Entity)
  @Column({
    type: DataType.INTEGER,
    field: 'sender_cvu',
  })
  senderCVU!: number;

  @ForeignKey(() => Entity)
  @Column({
    type: DataType.INTEGER,
    field: 'recipient_cvu',
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
