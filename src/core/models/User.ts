/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm'
import bcrypt from 'bcryptjs'
import Bucket from './Dossier'
import Dossier from './Dossier'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ nullable: false })
  username!: string

  @Column({ nullable: false, unique: true })
  mail!: string

  @Column({ nullable: false, unique: true })
  n_tel!: string

  @Column({ nullable: false, unique: true })
  nom!: string

  @Column({ nullable: false, unique: true })
  prenom!: string

  @Column({ nullable: false })
  password!: string

  @CreateDateColumn()
  createdAt!: string

  @UpdateDateColumn()
  updatedAt!: string

  @OneToMany(() => Dossier, (dossier: Dossier) => dossier.user)
  dossier!: Dossier[]
  
  /**
   * Hooks
   */
  @BeforeInsert()
  @BeforeUpdate()
  public hashPassword(): void | never {
    if (!this.password) {
      throw new Error('Password is not defined')
    }

    this.password = bcrypt.hashSync(this.password)
  }

  /**
   * Methods
   */
  public checkPassword(uncryptedPassword: string): boolean {
    return bcrypt.compareSync(uncryptedPassword, this.password)
  }

  public toJSON(): User {
    const json: User = Object.assign({}, this)
    delete json.password
    return json
  }
}
