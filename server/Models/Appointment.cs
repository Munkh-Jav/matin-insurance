using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models
{
    public class Appointment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        public int status { get; set; }

        public string client_id { get; set; }

        public string client_name { get; set; }

        public string client_email { get; set; }

        public DateTime date { get; set; }

    }
}