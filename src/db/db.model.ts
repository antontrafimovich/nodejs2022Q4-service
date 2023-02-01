export interface DBRecord {
  id: string;
}

export abstract class DB<TEntity extends DBRecord> {
  abstract getOne(params: {
    segment: string;
    fn: (entity: TEntity) => boolean;
  }): Promise<TEntity>;
  abstract getMany(params: {
    segment: string;
    fn?: (entity: TEntity) => boolean;
  }): Promise<TEntity[]>;
  abstract create(params: {
    segment: string;
    payload: Omit<TEntity, 'id'>;
  }): Promise<TEntity>;
  abstract update(params: {
    segment: string;
    fn: (entity: TEntity) => boolean;
    payload: Partial<Omit<TEntity, 'id'>>;
  }): Promise<TEntity>;
  abstract delete(params: {
    segment: string;
    fn: (entity: TEntity) => boolean;
  }): Promise<void>;
}
