import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import Entity from './Entity.model';

@Table({
  tableName: 'Reserve',
  timestamps: false,
})
export class Reserve extends Model {
  @Column({
    primaryKey: true,
    field: 'reserveId',
    type: DataType.INTEGER,
  })
  reserveId!: number;

  @Column({
    type: DataType.STRING(45),
    field: 'reason',
  })
  reason?: string;

  @Column({
    type: DataType.DOUBLE,
    field: 'amount',
  })
  amount?: number;

  @ForeignKey(() => Entity)
  @AllowNull(false)
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

export default Reserve;
