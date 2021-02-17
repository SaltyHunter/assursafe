/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import File from './File'
import User from './User'

@Entity()
export default class Dossier extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string

  @Column({ nullable: false })
  user_id!: string

  @Column({ nullable: false })
  name!: string

  @CreateDateColumn()
  createdAt!: string

  @UpdateDateColumn()
  updatedAt!: string

  @ManyToOne(() => User, (user: User) => user.dossier, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User

  @OneToMany(() => File, (file: File) => file.dossier, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'file_id' })
  file!: File[]

  /**
   * Methods
   */
  public toJSON(): Dossier {
    const json = Object.assign({}, this)

    return json
  }
}
