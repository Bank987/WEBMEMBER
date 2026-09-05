const mongoose = require('mongoose');
const uri = 'mongodb://gacha:Bankdev2003@ac-9jhphev-shard-00-00.sbzwhot.mongodb.net:27017,ac-9jhphev-shard-00-01.sbzwhot.mongodb.net:27017,ac-9jhphev-shard-00-02.sbzwhot.mongodb.net:27017/webmember?ssl=true&replicaSet=atlas-13oowp-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(uri).then(async () => {
  const gangs = await mongoose.connection.db.collection('gangs').find({}).toArray();
  for (const g of gangs) {
    if (!g.youtubeMusicUrl) continue;
    const count = await mongoose.connection.db.collection('members').countDocuments({ gangId: g._id.toString() });
    if (count > 2) {
      console.log(JSON.stringify({ sub: g.subdomain, key: g.masterKey, music: g.youtubeMusicUrl, title: g.pageTitle, memberCount: count }));
    }
  }
  process.exit(0);
}).catch(e => { console.error(e.message); process.exit(1); });
