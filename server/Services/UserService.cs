using System.IdentityModel.Tokens.Jwt;
using System.Collections.Generic;
using MongoDB.Driver;
using server.Models;
using server.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Linq;
using System.Security.Claims;
using System.Text;
using BC = BCrypt.Net.BCrypt;

namespace server.Services
{
    public class UserService 
    {
        private readonly IMongoCollection<User> _Users;
        private readonly AppSettings _appSettings;

        public UserService(IDatabaseSettings settings, IOptions<AppSettings> appSettings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _Users = database.GetCollection<User>("Users");
            _appSettings = appSettings.Value;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _Users.Find(x => x.email == model.email).SingleOrDefault();
            if (user == null) return null;


            bool verified = BC.Verify(model.password, user.password);
            if (!verified) return null;


            var token = generateJwtToken(user);

            return new AuthenticateResponse(token);
        }

        public string ChangePass(ChangePassRequest model)
        {
            var user = _Users.Find(x => x.Id == model.id).SingleOrDefault();
            if (user == null) return null;


            bool verified = BC.Verify(model.old, user.password);
            if (!verified) return null;

            user.password = BC.HashPassword(model.password);

            _Users.ReplaceOne(sub => sub.Id == model.id, user);


            return generateJwtToken(user);
        }

        public string ChangeEmail(ChangeEmailRequest model)
        {
            var user = _Users.Find(x => x.Id == model.id).SingleOrDefault();
            if (user == null) return null;


            user.email = model.email;

            _Users.ReplaceOne(sub => sub.Id == model.id, user);


            return generateJwtToken(user);
        }

        public string ChangeAvatar(string id, string avatar){
            var user = _Users.Find(x => x.Id == id).SingleOrDefault();
            if (user == null) return null;


            user.profile_img = avatar;

            _Users.ReplaceOne(sub => sub.Id == id, user);


            return generateJwtToken(user);
        }

        public AuthenticateResponse SignUp(User newUser)
        {
            newUser.password = BC.HashPassword(newUser.password);
            
            _Users.InsertOne(newUser);

            var token = generateJwtToken(newUser);

            return new AuthenticateResponse(token);
        }

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()),  new Claim("name", user.name.ToString()), new Claim("profile_img", user.profile_img.ToString()), new Claim("email", user.email.ToString()), new Claim("admin", user.admin.ToString()) }),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public User GetById(string id)
        {
            return _Users.Find(x => x.Id == id).FirstOrDefault();
        }
    }
}