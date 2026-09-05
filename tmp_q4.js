const mongoose = require('mongoose');
const uri = 'mongodb://gacha:Bankdev2003@ac-9jhphev-shard-00-00.sbzwhot.mongodb.net:27017,ac-9jhphev-shard-00-01.sbzwhot.mongodb.net:27017,ac-9jhphev-shard-00-02.sbzwhot.mongodb.net:27017/webmember?ssl=true&replicaSet=atlas-13oowp-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(uri).then(async () => {
  const members = await mongoose.connection.db.collection('members').find({}).limit(5).toArray();
  members.forEach(m => console.log(JSON.stringify({ gangId: m.gangId, name: m.name, typeofGangId: typeof m.gangId })));
  const gangs = await mongoose.connection.db.collection('gangs').find({}).limit(3).toArray();
  gangs.forEach(g => console.log('GANG:', JSON.stringify({ id: g._id.toString(), sub: g.subdomain, typeofId: typeof g._id })));
  process.exit(0);
});
