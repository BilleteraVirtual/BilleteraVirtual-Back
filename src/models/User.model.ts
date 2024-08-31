import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Entity from './Entity.model';

@Table({
  tableName: 'User',
  timestamps: false, 
})
export class User extends Model {
  @Column({
    primaryKey: true,
    field: 'dni',
    type: DataType.INTEGER,
  })
  DNI!: number;

  @Column({
    type: DataType.STRING,
    field: 'name',
  })
  firstName?: string;

  @Column({
    type: DataType.STRING,
    field: 'lastName',
  })
  lastName?: string;

  @ForeignKey(() => Entity)
  @Column({
    type: DataType.INTEGER,
    field: 'entity_cvu',
  })
  entity_cvu!: number;

  
}

export default User;
