
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Wallet {   
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 64,
    })
    address!: string

    @Column("text")
    description!: string

    @Column()
    filename!: string

    @Column("double")
    views!: number

    @Column("double")
    createdAtu!: number

    @Column("double")
    updatedAtu!: number

    @Column("double")
    state!: number

    @Column()
    isPublished!: boolean
}
