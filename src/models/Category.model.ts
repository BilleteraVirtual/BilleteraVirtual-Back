import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Category',
  timestamps: false,
})
export class Category extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'idCategory',
    type: DataType.INTEGER,
  })
  categoryId!: number;

  @Column({
    type: DataType.STRING,
    field: 'type',
  })
  type?: string;
}

export default Category;
