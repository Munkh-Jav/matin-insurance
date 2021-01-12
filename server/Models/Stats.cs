using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models
{
    public class Stats
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public  string Id { get; set; }

        public int lastWeekVisitors {get; set;}

        public int activeAppointments {get; set;}

        public int commentsPendingApproval {get; set;}

    }
}