import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { Category } from './Category.model';
import  Entity  from './Entity.model';

@Table({
  tableName: 'Company',
  timestamps: false, // Si no usas createdAt y updatedAt, puedes desactivarlo
})
export class Company extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'idCompany',
    type: DataType.INTEGER,
  })
  companyId!: number;

  @Column({
    type: DataType.STRING,
    field: 'businessName',
  })
  businessName?: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    field: 'categoria_idCategory',
  })
  categoryId!: number;

  @ForeignKey(() => Entity)
  @Column({
    type: DataType.INTEGER,
    field: 'entity_cvu',
  })
  entityCVU!: number;

  @BelongsTo(() => Category)
  category!: Category;

  @HasOne(() => Entity, 'entity_cvu')
  entity!: Entity;
}

export default Company;
