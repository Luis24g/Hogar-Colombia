import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Asesor, AsesorRelations, Inmueble} from '../models';
import {InmuebleRepository} from './inmueble.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly supervisa: HasManyRepositoryFactory<Inmueble, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Asesor, dataSource);
    this.supervisa = this.createHasManyRepositoryFactoryFor('supervisa', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('supervisa', this.supervisa.inclusionResolver);
  }
}
