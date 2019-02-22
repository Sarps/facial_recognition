var video = document.querySelector('#camera-stream'),
    image = document.querySelector('#snap'),
    start_camera = document.querySelector('#start-camera'),
    controls = document.querySelector('.controls'),
    take_photo_btn = document.querySelector('#take-photo'),
    delete_photo_btn = document.querySelector('#delete-photo'),
	  error_message = document.querySelector('#error-message');
    loader = document.querySelector('#loader');
    
navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

start_camera.addEventListener("click", function(e){
    e.preventDefault();
    video.play();
    showVideo();
  });
  
  
  take_photo_btn.addEventListener("click", function(e){
    e.preventDefault();
    var snap = takeSnapshot();
    image.setAttribute('src', snap);
    image.classList.add("visible");
    delete_photo_btn.classList.remove("disabled");
    video.pause();
  });
  
  
  delete_photo_btn.addEventListener("click", function(e){
  
    e.preventDefault();
    image.setAttribute('src', "");
    image.classList.remove("visible");
    delete_photo_btn.classList.add("disabled");
    download_photo_btn.classList.add("disabled");
    video.play();
  
  });
  
  
  
  function showVideo(){
    hideUI();
    video.classList.add("visible");
    controls.classList.add("visible");
  }
  
  
  function takeSnapshot(){
    var hidden_canvas = document.querySelector('canvas'),
        context = hidden_canvas.getContext('2d'),
        width = video.videoWidth,
        height = video.videoHeight;
  
    if (width && height) {
      hidden_canvas.width = width;
      hidden_canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
      return hidden_canvas.toDataURL('image/png');
    }
  }
  
  
  function displayErrorMessage(error_msg, error){
    error = error || "";
    if(error){
      console.log(error);
    }
    error_message.innerText = error_msg;
    hideUI();
    error_message.classList.add("visible");
  }
  
  
  function hideUI(){
    controls.classList.remove("visible");
    start_camera.classList.remove("visible");
    video.classList.remove("visible");
    snap.classList.remove("visible");
    error_message.classList.remove("visible");
  }