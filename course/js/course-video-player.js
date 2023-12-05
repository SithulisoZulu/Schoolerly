import { getParameterByName } from "../../security/getParameterByName.js"

const url =  getParameterByName('url')

let videoSource = document.getElementById('video')

    // Your main script
    document.addEventListener('DOMContentLoaded', function () {
    try {
        // Assuming your URL parameter is named 'url'
        const url = decodeURIComponent(getParameterByName('url'));
        const videoElement = document.getElementById('video');
        
        // Set the source URL
        videoElement.src = url;

        // Load the new source
        videoElement.load();
    } catch (error) {
        console.error(error);
    }
});