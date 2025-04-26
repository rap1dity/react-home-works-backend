import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeormConfig } from '@common/configs/typeorm.config';

export default new DataSource(new TypeormConfig().createTypeOrmOptions() as DataSourceOptions);
