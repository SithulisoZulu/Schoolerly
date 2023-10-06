import { addCourseQuestion, GetTopicByCourseId } from '../../controllers/topic.js'
import { AdditionalInfo } from '../../controllers/course.js'
import { getParameterByName } from '../../security/getParameterByName.js'
import { sanitizeInput } from '../../libraries/sanitizer.js'
import { route } from '../../routers/router.js'
import { loader } from '../../components/loading.js'
 
const loaderHolder = document.getElementById("loaderHolder")

const submit = document.getElementById('saveTopic').addEventListener("click", async (e) =>
{  
  const data = {
    id          : getParameterByName('id'),
    docId       : getParameterByName('doc'),
    question    : document.getElementById('question').value,
    answer    : document.getElementById('answer').value 
  }

  if(navigator.onLine)
  {
      const sanitizedData =  sanitizeData(data);

      console.log(sanitizedData.question, sanitizedData.answer)
      await addCourseQuestion(sanitizedData);
      document.getElementById('question').value = "",
      document.getElementById('answer').value = "",
      GetTopicByCourseId(sanitizedData.id)
  }
  else {
    location.replace(route.offlinePageUrl);
  }
});

const sanitizeData = (data) => {
    const sanitizedData = {};
    Object.keys(data).forEach((key) => {
      sanitizedData[key] = sanitizeInput(data[key]);
    });
    return sanitizedData;
};


const submitCourse = document.getElementById('submit').addEventListener("click", async (e) =>
{  
  const data = {
    id          : getParameterByName('id'),
    docId       : getParameterByName('doc'),
    message     : document.getElementById("message").value
  }

  var conf;
  var confirmation = document.getElementById("confirmation");
  if(confirmation.checked)
  {
    conf = "Yes"
  }
  else{
    conf = "No"
  }
  const sanitizedData =  sanitizeData(data);
  loaderHolder.innerHTML += loader
  const course = await AdditionalInfo(sanitizedData, conf)
});

