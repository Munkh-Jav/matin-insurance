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

        public string appointment_id { get; set; }
        
        public string appointment_status { get; set; }

        public string appt_confirmation { get; set; }

    }
}