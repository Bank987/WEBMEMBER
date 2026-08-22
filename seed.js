const { MongoClient } = require('mongodb');
async function run() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required');
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('webmember');
  await db.collection('gangs').updateOne({ subdomain: 'thunder' }, { $setOnInsert: { subdomain: 'thunder', pageTitle: 'THUNDER GANG', pageSubtitle: 'EST. 2026', buttonText: 'ENTER' } }, { upsert: true });
  console.log('Done');
  process.exit(0);
}
run();
