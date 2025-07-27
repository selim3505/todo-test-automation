import { db } from '../models/database';

beforeEach(() => {
  // Clear database before each test
  db.clear();
});
