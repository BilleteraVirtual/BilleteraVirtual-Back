import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Entity from './Entity.model';
import { on } from 'events';

@Table({
  tableName: 'User',
  timestamps: false,
})
export class User extends Model {
  @Column({
    primaryKey: true,
    field: 'DNI',
    type: DataType.INTEGER,
  })
  DNI!: number;

  @Column({
    type: DataType.STRING(45),
    field: 'firstName',
  })
  firstName?: string;

  @Column({
    type: DataType.STRING(45),
    field: 'lastName',
  })
  lastName?: string;

  @ForeignKey(() => Entity)
  @Column({
    type: DataType.DECIMAL(30,0),
    field: 'entityCVU',
  })
  entityCVU!: string;

  @BelongsTo(() => Entity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  entity!: Entity;
}

export default User;
