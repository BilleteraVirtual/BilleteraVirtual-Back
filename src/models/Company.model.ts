import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Category from './Category.model';
import Entity from './Entity.model';

@Table({
  tableName: 'Company',
  timestamps: false,
})
export class Company extends Model {
  @Column({
    primaryKey: true,
    field: 'idCompany',
    type: DataType.INTEGER,
  })
  companyId!: number;

  @Column({
    type: DataType.STRING(45),
    field: 'companyName',
  })
  companyName?: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    field: 'category_idCategory',
  })
  categoryId!: number;

  @ForeignKey(() => Entity)
  @Column({
    type: DataType.INTEGER,
    field: 'entity_CVU',
  })
  entityCVU!: number;

  @BelongsTo(() => Category)
  category!: Category;

  @BelongsTo(() => Entity)
  entity!: Entity;
}

export default Company;
