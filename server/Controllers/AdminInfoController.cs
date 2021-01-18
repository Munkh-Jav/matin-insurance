using server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using server.Services;
using System.Text.Json;

namespace AdminInfosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminInfoController : ControllerBase
    {
        private readonly AdminInfoService _AdminInfoService;

        public AdminInfoController(AdminInfoService AdminInfoService)
        {
            _AdminInfoService = AdminInfoService;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<List<AdminInfo>> Get() =>
            _AdminInfoService.Get();

        [Authorize]
        [HttpGet("{id:length(24)}", Name = "GetAdminInfo")]
        public ActionResult<AdminInfo> Get(string id)
        {
            var AdminInfo = _AdminInfoService.Get(id);

            if (AdminInfo == null)
            {
                return NotFound();
            }

            return AdminInfo;
        }

        [HttpPost]
        public ActionResult<AdminInfo> Create(AdminInfo AdminInfo)
        {
            _AdminInfoService.Create(AdminInfo);

            return CreatedAtRoute("GetAdminInfo", new { id = AdminInfo.Id.ToString() }, AdminInfo);
        }

        [Authorize]
        [HttpPut]
        public ActionResult<AdminInfo> Update(AdminInfo body)
        {

            var AdminInfo = _AdminInfoService.Get(body.Id);

            if (AdminInfo == null)
            {
                return NotFound();
            }

            _AdminInfoService.Update(body.Id, body);

            return body;
        }

        [Authorize]
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var AdminInfo = _AdminInfoService.Get(id);

            if (AdminInfo == null)
            {
                return NotFound();
            }

            _AdminInfoService.Delete(AdminInfo.Id);

            return NoContent();
        }
    }
}