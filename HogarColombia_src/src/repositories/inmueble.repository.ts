import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Asesor} from '../models';
import {AsesorRepository} from './asesor.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly createdBy: BelongsToAccessor<Asesor, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Inmueble, dataSource);
    this.createdBy = this.createBelongsToAccessorFor('createdBy', asesorRepositoryGetter,);
    this.registerInclusionResolver('createdBy', this.createdBy.inclusionResolver);
  }
}
