function submitIDCard(file){
	
	event.preventDefault();
	var formData = new FormData();
	formData.append("idcard", file);
	
	var el = event.target;
	loading(true);
	$.ajax({
		url: '/idcard',
		type: 'POST',
		data: formData,
		contentType: false,
		processData: false
	})
	.always(function(data){
		loading(false);
	})
	.done(function(data){
		$img = $(el).parent().find('img');
        $img.attr('src', data.image);
        drawOverlay(data.detections, $img[0])
	})
	.fail(function(data){
		console.log('error');
	})
}

function drawOverlay(data, img) {
    console.log(img.width, img.height);
    img.onload = function () {
        paper.setup(canvas);
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        data.faces.forEach(tagFace)
    }
}

function tagFace(face)
{
    drawShape(face.bounds.face);
    //drawShape(face.bounds.head);
    
    drawFeature(face.features.chin);
    drawFeature(face.features.ears);
    //drawEye(face.features.eyes.left);
    drawEye(face.features.eyes.right);

}

function drawEye(eye)
{
    drawPoint(eye.bottom);
    drawPoint(eye.top);
    //drawPoint(eye.center);
    drawPoint(eye.left);
    drawPoint(eye.right);
    drawPoint(eye.pupil);
    wheeler(eye.pupil,40)
}

function drawShape(coords) {
    var path = new paper.Path();
    path.strokeColor = 'rgba(255, 255, 255, 0.5)';
    path.strokeWidth = 3;
    path.closed = true;
    //path.fullySelected = true;
    for (let index = 0; index < coords.length; index++) {
        path.add(coords[index]);
    }
    path.strokeJoin = 'round';
    //path.dashArray = [10, 12];
    //path.smooth();
}

function drawPoint(coord) {
    var text = new paper.PointText({
        point: coord,
        content: '+',
        justification: 'center',
        fontSize: 11
    });
    text.fillColor = "#e8dd84";
}

function drawFeature(feature)
{
    if(feature.center) drawPoint(feature.center);
    if(feature.left) drawPoint(feature.left);
    if(feature.right) drawPoint(feature.right);
}

function wheeler(coord, radius)
{
    window.wheel = 
    new paper.Path.Circle(coord.x,coord.y,radius).strokeColor = '#fff';
    dashes = new paper.Path.Circle(coord.x,coord.y,radius)
    dashes.strokeColor = 'rgba(255, 255, 255, 0.5)';
    dashes.strokeWidth = radius/3;
    dashes.dashArray = [25, 75];
    middle = new paper.Path.Circle(coord.x,coord.y,radius-10)
    middle.strokeColor = 'rgba(255, 255, 255, 0.5)';
    middle.strokeWidth = 4;
    inner = new paper.Path.Circle(coord.x,coord.y,radius-radius/2)
    inner.strokeColor = '#e8dd84';
    inner.strokeWidth = 2;
}