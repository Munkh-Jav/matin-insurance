using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models
{
    public class Comment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public  string Id { get; set; }

        public string customer_id {get; set;}

        public string comment_text { get; set; }
        
        public string user_id { get; set; }

        public string video_id { get; set; }

    }
}