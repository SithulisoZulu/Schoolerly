export const  courseSubmitted = async(details) =>{
    var params = {
      email: details.email,
      title: details.title,
      status: details.status,
      date: details.date,
        name: details.name,
      surname: details.surname,
      message: details.message
    };
    const serviceId = "service_54pvnqm";
    const templeteId = "template_rs8d73a";
    
    emailjs.send(serviceId,templeteId,params)
    .then(
      res => {
        console.log(res)
      }
    ).catch((err)=>{
      console.log(err)
    });
}