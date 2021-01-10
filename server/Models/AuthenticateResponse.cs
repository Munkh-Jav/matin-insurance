using server.Models;

namespace server.Models
{
    public class AuthenticateResponse
    {
        public string id { get; set; }
        public string name { get; set; }
        public string username { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(User user, string token)
        {
            id = user.Id;
            name = user.name;
            username = user.username;
            Token = token;
        }
    }
}