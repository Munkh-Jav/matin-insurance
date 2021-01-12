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

        public string username { get; set; }
       
        public string password { get; set; }

        public string name { get; set; }
        /*TODO:PUT ISADMIN FIELD BOOL*/

    }
    
}