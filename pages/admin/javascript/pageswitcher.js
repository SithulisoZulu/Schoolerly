function loadHtml (id, filename){
    console.log(`div id: ${id}, filename: ${filename}`);

    let xhttp;
    let element = document.getElementById(id)
    let file = filename;

    if(file)
    {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4)
            {
                if(xhttp.readyState == 200) {element.innerHTML = this.responseText;}
                if(xhttp.readyState == 404) {element.innerHTML = "<h1> Page not found.</h1>"}
            }
        }
        xhttp.open("GET", `templates/${file}`, true)
        xhttp.send();
        return;
    }
}