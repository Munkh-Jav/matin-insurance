using System.Collections.Generic;
using MongoDB.Driver;
using server.Models;
using MongoDB.Bson;
using System;

namespace server.Services
{

    public class AdminInfoService
    {
        private readonly IMongoCollection<AdminInfo> _AdminInfos;
        private readonly IMongoCollection<Stats> _Stats;

        public AdminInfoService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _AdminInfos = database.GetCollection<AdminInfo>("AdminInfos");
            _Stats = database.GetCollection<Stats>("Stats");
        }
 
        public AdminInfo Create(AdminInfo AdminInfo)
        {
            _AdminInfos.InsertOne(AdminInfo);
            Stats stat = _Stats.Find(sub=>sub.type == "active-AdminInfos").SingleOrDefault();
            if(DateTime.Now.AddDays(-7).CompareTo(stat.last_update) > 0){
                stat.previous = stat.value;
                stat.value = 0;
                stat.last_update = DateTime.Now;
            }
            stat.value++;
            _Stats.ReplaceOne(sub => sub.type == "active-AdminInfos", stat);
            return AdminInfo;
        }

        public List<AdminInfo> Get() =>
            _AdminInfos.Find(sub => true).Sort("{date: -1}").ToList();

        public AdminInfo Get(string id) =>
            _AdminInfos.Find(sub=>sub.Id == id).SingleOrDefault();

        public void Update(string id, AdminInfo AdminInfo) {
            if(AdminInfo.status == 2){
                Stats stat = _Stats.Find(sub=>sub.type == "active-AdminInfos").SingleOrDefault();
                stat.value--;
                if(DateTime.Now.AddDays(-7).CompareTo(stat.last_update) > 0){
                    stat.previous = stat.value;
                    stat.value = 0;
                    stat.last_update = DateTime.Now.AddDays(-7);
                }
                _Stats.ReplaceOne(sub => sub.type == "active-AdminInfos", stat);
            }
            _AdminInfos.ReplaceOne(sub => sub.Id == id, AdminInfo);
        }
            

        public void Delete(string id) =>
            _AdminInfos.DeleteOne(sub => sub.Id == id);
    }
}