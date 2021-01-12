using System.Collections.Generic;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{

    public class StatsService
    {
        private readonly IMongoCollection<Stats> _Statss;

        public StatsService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _Statss = database.GetCollection<Stats>("Statss");
        }
 
        public Stats Create(Stats Stats)
        {
            _Statss.InsertOne(Stats);
            return Stats;
        }

        public List<Stats> Get() =>
            _Statss.Find(sub => true).ToList();

        public Stats Get(string id) =>
            _Statss.Find(sub=>sub.Id == id).SingleOrDefault();

        public void Update(string id, Stats Stats) =>
            _Statss.ReplaceOne(sub => sub.Id == id, Stats);

        public void Delete(string id) =>
            _Statss.DeleteOne(sub => sub.Id == id);
    }
}