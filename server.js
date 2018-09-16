const fs = require("fs");
const express = require("express");
var multer = require("multer");
var gcloud = require("gcloud")({
  keyFilename: "./static/EnhancedVA-0bd76c2718ba.json",
  projectId: "eva-rluslp"
});
var vision = gcloud.vision();

//setup express server and body-parser middleware
const server = express();
server.use(express.static("public"));
server.use("/uploads", express.static("uploads"));

var upload = multer({ dest: "uploads/" });


server.post("/idcard", upload.single("idcard"), function(req, res, next) {
  var types = ["labels", "faces", "text"];
  vision.detect(req.file.path, types, function(err, detections, apiResponse) {
    if (err) return res.err(`Cloud Vision Error: ${err}`);
    res.json({
      detections: detections,
      image: req.file.path //base64Image(req.file.path)
    });
  });
});


server.post("/userphoto", upload.single("userphoto"), function(req, res, next) {
  //const fr = require("face-recognition");

  const idcard = fr.loadImage("/images.jpg");
  const userphotos = fr.loadImage("path/to/image1.png");

  const detector = fr.FaceDetector();
  const faceImages = detector.detectFaces(image);

  const recognizer = fr.FaceRecognizer();
  recognizer.addFaces([faces], "userphoto");
  const prediction = recognizer.predictBest(face[0]);
});

server.get("/frtest", function(req, res, next) {
  const fr = require("face-recognition");

  images = fs.readdirSync('./static/images');

  //const idcard = fr.loadImage("/images.jpg");
  const userphotos = images.map(image => fr.loadImage(`./static/images/${img}`) );

  const detector = fr.FaceDetector();
  userphotos.forEach(photo => {
    res.json(detector.locateFaces(photo));
    res.send('<br><br><br><br><br><br>');
  })
  return;
  const faceImages = detector.detectFaces(image);

  const recognizer = fr.FaceRecognizer();
  recognizer.addFaces([faces], "userphoto");
  const prediction = recognizer.predictBest(face[0]);
});

// Listen locally on port 8000
server.listen(process.env.PORT || 8000, () => {
  console.log("Server is up and running...");
});
