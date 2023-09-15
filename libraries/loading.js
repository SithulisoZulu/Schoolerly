export function  isLoading(){
   const loading = document.getElementById("loading")
   if(loading)
   {
    loading.classList.remove("visually-hidden")
   } 
}

export function isNotLoading()
{
    const loading = document.getElementById("loading")
    if(loading)
    {
     loading.classList.add("visually-hidden")
    } 
}


export function  isLoadingEmailUpdate(){
   const loading = document.getElementById("loadingEmailUpdate")
   if(loading)
   {
    loading.classList.remove("visually-hidden")
   } 
}

export function isNotLoadingEmailUpdate()
{
    const loading = document.getElementById("loadingEmailUpdate")
    if(loading)
    {
     loading.classList.add("visually-hidden")
    } 
}