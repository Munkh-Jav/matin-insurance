using server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using server.Services;

namespace UsersApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _UserService;

        public UserController(UserService UserService)
        {
            _UserService = UserService;
        }

    
        [HttpPost]
        public ActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _UserService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [HttpPost("change-pass")]
        public ActionResult ChangePass(ChangePassRequest model)
        {
            var response = _UserService.ChangePass(model);

            if (response == null)
                return BadRequest("Old password wrong" );

            return Ok(response);
        }

        [HttpPost("change-email")]
        public ActionResult ChangeEmail(ChangeEmailRequest model)
        {
            var response = _UserService.ChangeEmail(model);

            if (response == null)
                return BadRequest("Something went wrong" );

            return Ok(response);
        }

        [HttpPost("signup")]
        public ActionResult Signup(User user)
        {
            var response = _UserService.SignUp(user);

            if (response == null)
                return BadRequest(new { message = "Something went wrong" });

            return Ok(response);
        }
     
    }
}