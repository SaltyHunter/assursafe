import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm'
  import Dossier from './Dossier'

  
  @Entity()
  export default class File extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string
  
    @Column({ nullable: false })
    name!: string

    @Column({ nullable: false })
    path!: string

    @Column({ nullable: false })
    mimetype!: string

    @Column({ nullable: false })
    size!: number

    @CreateDateColumn()
    createdAt!: string
  
    @UpdateDateColumn()
    updatedAt!: string
  
    @ManyToOne(() => Dossier, (dossier: Dossier) => dossier.files, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'bucket_id' })
    dossier!: Dossier
  
    /**
     * Methods
     */
    public toJSON(): File {
      const json = Object.assign({}, this)
  
      return json
    }
  }
  