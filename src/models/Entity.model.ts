import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Entity',
  timestamps: false, // Si no usas createdAt y updatedAt, puedes desactivarlo
})
class Entity extends Model {
  @Column({
    primaryKey: true,
    field: 'cvu',
    type: DataType.INTEGER,
  })    
  CVU!: number;


  @Column({
    type: DataType.STRING,
    field: 'alias',
  })
  alias: string;

  @Column({
    type: DataType.DOUBLE,
    field: 'balance',
  })
  balance?: number;

  @Column({
    type: DataType.STRING,
    field: 'email',
  })
  email: string;
}

export default Entity;
