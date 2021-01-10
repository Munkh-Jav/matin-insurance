using server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using server.Services;

namespace AppointmentsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly AppointmentService _AppointmentService;

        public AppointmentController(AppointmentService AppointmentService)
        {
            _AppointmentService = AppointmentService;
        }

        [HttpGet]
        public ActionResult<List<Appointment>> Get() =>
            _AppointmentService.Get();

        [HttpGet("{id:length(24)}", Name = "GetAppointment")]
        public ActionResult<Appointment> Get(string id)
        {
            var Appointment = _AppointmentService.Get(id);

            if (Appointment == null)
            {
                return NotFound();
            }

            return Appointment;
        }

        [HttpPost]
        public ActionResult<Appointment> Create(Appointment Appointment)
        {
            _AppointmentService.Create(Appointment);

            return CreatedAtRoute("GetAppointment", new { id = Appointment.Id.ToString() }, Appointment);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Appointment AppointmentIn)
        {
            var Appointment = _AppointmentService.Get(id);

            if (Appointment == null)
            {
                return NotFound();
            }

            _AppointmentService.Update(id, AppointmentIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var Appointment = _AppointmentService.Get(id);

            if (Appointment == null)
            {
                return NotFound();
            }

            _AppointmentService.Delete(Appointment.Id);

            return NoContent();
        }
    }
}