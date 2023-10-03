export var fileUpload = cloudinary.createUploadWidget({
  cloudName: 'dpnz1b1ud',
  theme: "minimal",
  uploadPreset: 'coursesPhotos'}, (error, result) => { 
    if (!error && result && result.event === "success") { 
      var photoUrl = result.info.url 
      sessionStorage.setItem("photoUrl", photoUrl)
      document.getElementById("upload_widget").value = result.info.original_filename;
    }
  }
)

export var coursePhotoUpload = cloudinary.createUploadWidget({
  cloudName: 'dpnz1b1ud',
  theme: "white",
  uploadPreset: 'coursesPhotos'}, (error, result) => { 
    if (!error && result && result.event === "success") { 
      console.log('Done! Here is the image info: ', result.info);
      var photoUrl = result.info.url
      var thumbnail = result.info.thumbnail_url

      sessionStorage.setItem("photoUrl", photoUrl)

      document.getElementById("courseImagePreview").src = thumbnail
      document.getElementById("upload_widget").value = result.info.original_filename;
    }
  }
  
)

export var courseVideoUpload = cloudinary.createUploadWidget({
  cloudName: 'dpnz1b1ud', 
  theme: "white",
  uploadPreset: 'coursesPhotos'}, (error, result) => { 
    if (!error && result && result.event === "success") { 
    console.log('Done! Here is the image info: ', result.info);
    var videoUrl = result.info.url
    var thumbnail = result.info.thumbnail_url

    sessionStorage.setItem("photoUrl", videoUrl)
    sessionStorage.setItem("videoName", result.info.original_filename)
    document.getElementById("videoPreview").src = thumbnail;
    document.getElementById("videoUpload").value = result.info.original_filename;
    document.getElementById("videoLink").href = videoUrl;
    }
  }
  
)