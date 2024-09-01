import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
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
  @Column({
    type: DataType.INTEGER,
    field: 'entity_CVU',
  })
  entityCVU!: number;

  @BelongsTo(() => Entity)
  entity!: Entity;
}

export default Reserve;
