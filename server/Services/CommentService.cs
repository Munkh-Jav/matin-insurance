using System.Collections.Generic;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{

    public class CommentService
    {
        private readonly IMongoCollection<Comment> _Comments;

        public CommentService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _Comments = database.GetCollection<Comment>("Comments");
        }
 
        public Comment Create(Comment Comment)
        {
            _Comments.InsertOne(Comment);
            return Comment;
        }

        public List<Comment> Get() {
        
                var comments = _Comments.Find(sub => true).Sort("{date: -1}").ToList();
        return  comments  ;
        
        }

        public Comment Get(string id) =>
            _Comments.Find(sub=>sub.Id == id).SingleOrDefault();

        public void Update(string id, Comment Comment) =>
            _Comments.ReplaceOne(sub => sub.Id == id, Comment);

        public void Delete(string id) =>
            _Comments.DeleteOne(sub => sub.Id == id);
    }
}