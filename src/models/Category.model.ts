import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Transaction from './Transaction.model';
import Company from './Company.model';

@Table({
  tableName: 'Category',
  timestamps: false,
})
export class Category extends Model {
  @Column({
    primaryKey: true,
    field: 'idCategory',
    type: DataType.INTEGER,
  })
  idCategory!: number;

  @Column({
    type: DataType.STRING(45),
    field: 'type',
  })
  type?: string;

  @HasMany(() => Transaction)
  transactions!: Transaction[];

  @HasMany(() => Company)
  companies!: Company[];
}

export default Category;
