import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import  Entity  from './Entity.model';

@Table({
  tableName: 'Reservation',
  timestamps: false, // Si no usas createdAt y updatedAt, puedes desactivarlo
})
export class Reservation extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'idReservation',
    type: DataType.INTEGER,
  })
  reservationId!: number;

  @Column({
    type: DataType.STRING,
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
    field: 'entity_cvu',
  })
  entityCVU!: number;

  @BelongsTo(() => Entity)
  entity!: Entity;
}

export default Reservation;
