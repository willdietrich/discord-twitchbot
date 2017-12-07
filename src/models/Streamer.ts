import {Column, CreatedAt, DeletedAt, Model, Table, UpdatedAt} from "sequelize-typescript";

@Table({
    tableName: "streamers"
})
export class Streamer extends Model<Streamer> {

    @Column
    name: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;
}
