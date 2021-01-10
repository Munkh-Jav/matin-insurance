using System.Collections.Generic;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{

    public class AppointmentService
    {
        private readonly IMongoCollection<Appointment> _Appointments;

        public AppointmentService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _Appointments = database.GetCollection<Appointment>("Appointments");
        }
 
        public Appointment Create(Appointment Appointment)
        {
            _Appointments.InsertOne(Appointment);
            return Appointment;
        }

        public List<Appointment> Get() =>
            _Appointments.Find(sub => true).ToList();

        public Appointment Get(string id) =>
            _Appointments.Find(sub=>sub.Id == id).SingleOrDefault();

        public void Update(string id, Appointment Appointment) =>
            _Appointments.ReplaceOne(sub => sub.Id == id, Appointment);

        public void Delete(string id) =>
            _Appointments.DeleteOne(sub => sub.Id == id);
    }
}