export default function filterAppointments (appointments){

    var waitingAppointments = [];
    appointments.map(appointment => {

      if(appointment.status === 0){
        waitingAppointments.push(appointment);
      }
    })

    return waitingAppointments;
  }