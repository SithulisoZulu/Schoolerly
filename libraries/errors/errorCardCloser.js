export function closeCard()
{
   var alertError =  document.getElementById('alert-Error')
   if(alertError) {
    alertError.classList.add('visually-hidden');
   }
}