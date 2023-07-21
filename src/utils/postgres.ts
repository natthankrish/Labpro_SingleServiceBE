import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';

async function postgresSetup(): Promise<DataSource> {
    try {
      const DataSource = AppDataSource;
      DataSource.initialize()
      console.log('Connected to PostgreSQL');
      return DataSource;
    } catch (error) {
      console.error(error);
      console.error('Could not connect to PostgreSQL');
      process.exit(1);
    }
  }
  
export default postgresSetup;