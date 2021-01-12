using server.Models;

namespace server.Models
{
    public class AuthenticateResponse
    {
        public UserResponse UserResponse {get; set;}
        public string Token { get; set; }


        public AuthenticateResponse(User user, string token)
        {
            UserResponse = new UserResponse(user);
            Token = token;
        }
        
    }
     public class UserResponse{
        public string Id { get; set; }

        public string Username { get; set; }
       
        public string Name { get; set; } 

            public UserResponse(User user){

                Id = user.Id;
                Username = user.username; 
                Name = user.name; 
            }

    }

    
}