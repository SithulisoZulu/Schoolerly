const client = filestack.init("AVd4ppxRVRz1cf8jGxBBvz");

const fileInput = document.getElementById("file")
const fileUrl = document.getElementById("fileUrl")
const download = document.getElementById("download")
const display = document.getElementById("display")

fileInput.addEventListener("change", (event)=>{
    const file = event.target.files[0];

    client.upload(file).then((response) =>{
        fileUrl.innerHTML = response.url;

        console.log(response)

        download.href = response.url
        display.src = response.url
    })
})