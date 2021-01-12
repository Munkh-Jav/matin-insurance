using server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using server.Services;

namespace VideosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly VideoService _VideoService;

        public VideoController(VideoService VideoService)
        {
            _VideoService = VideoService;
        }


        [HttpGet]
        public ActionResult<List<Video>> Get() =>
            _VideoService.Get();

        [HttpGet("{id:length(24)}", Name = "GetVideo")]
        public ActionResult<Video> Get(string id)
        {
            var Video = _VideoService.Get(id);

            if (Video == null)
            {
                return NotFound();
            }

            return Video;
        }

        [Authorize]
        [HttpPost]
        public ActionResult<Video> Create(Video Video)
        {
            _VideoService.Create(Video);

            return CreatedAtRoute("GetVideo", new { id = Video.Id.ToString() }, Video);
        }

        [Authorize]
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Video VideoIn)
        {
            var Video = _VideoService.Get(id);

            if (Video == null)
            {
                return NotFound();
            }

            _VideoService.Update(id, VideoIn);

            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var Video = _VideoService.Get(id);

            if (Video == null)
            {
                return NotFound();
            }

            _VideoService.Delete(Video.Id);

            return NoContent();
        }
    }
}