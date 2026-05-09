const pool = require('./db');

async function alterDB() {
  try {
    console.log('Adding image columns to tables...');
    await pool.query('ALTER TABLE portfolio ADD COLUMN image VARCHAR(255) DEFAULT NULL;');
    await pool.query('ALTER TABLE portfolio ADD COLUMN year VARCHAR(10) DEFAULT NULL;');
    await pool.query('ALTER TABLE activities ADD COLUMN image VARCHAR(255) DEFAULT NULL;');
    console.log('Image columns added successfully.');
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('Columns already exist.');
    } else {
      console.error(err);
    }
  } finally {
    process.exit();
  }
}
alterDB();
