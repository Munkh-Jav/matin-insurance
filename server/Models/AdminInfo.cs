using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
       
        public string key { get; set; }

        public string value {get; set;}


    }
    
}