using server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using server.Services;

namespace CommentsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly CommentService _CommentService;

        public CommentController(CommentService CommentService)
        {
            _CommentService = CommentService;
        }

        [HttpGet]
        public ActionResult<List<Comment>> Get() =>
            _CommentService.Get();

        [HttpGet("{id:length(24)}", Name = "GetComment")]
        public ActionResult<Comment> Get(string id)
        {
            var Comment = _CommentService.Get(id);

            if (Comment == null)
            {
                return NotFound();
            }

            return Comment;
        }
        
        [Authorize]    
        [HttpPost]
        public ActionResult<Comment> Create(Comment Comment)
        {
            _CommentService.Create(Comment);

            return CreatedAtRoute("GetComment", new { id = Comment.Id.ToString() }, Comment);
        }

        [Authorize]
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Comment CommentIn)
        {
            var Comment = _CommentService.Get(id);

            if (Comment == null)
            {
                return NotFound();
            }

            _CommentService.Update(id, CommentIn);

            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var Comment = _CommentService.Get(id);

            if (Comment == null)
            {
                return NotFound();
            }

            _CommentService.Delete(Comment.Id);

            return NoContent();
        }
    }
}