// Your code here!
function drawCircle(draw) {

    //alert("Loading Window");
  //  var draw = SVG('drawing').size(1024, 1024);

    var circle = draw.circle(50);
    circle.radius(50);
    circle.x(10);
    circle.y(10);
    circle.stroke("#f00");
    circle.fill("#fff");
}

function generateRows(numRows, numColumns, electrodeSize, electrodeSpacing, rowSpacing, startX, startY, electrodeArray, draw) {

    console.log("Generating Rows");
    var rowElectrodes = new Array();

    for (var i = 0; i < numRows + 1; i++) {
        rowElectrodes = [];

        for (var j = 0 ; j < numColumns + 1; j++) {
            var rect1 = draw.ellipse(electrodeSize, electrodeSize).x(startX + (electrodeSpacing * j)).y(startY).attr({
                fill: '#800'
            }).rotate(45);
            rect1.type = "RX";
            rect1.row = i;
            rect1.column = j;
            rowElectrodes[j] = rect1;
           // console.log(i + " " + j);
        }
        startY = startY + rowSpacing;
        electrodeArray.push(rowElectrodes);
    }
    return electrodeArray;
}


function generateColumns(numRows, numColumns, electrodeSize, electrodeSpacing, rowSpacing, startX, startY, electrodeArray, draw) {

    console.log("Generating Rows");
    var columnElectrodes = new Array();

    for (var i = 0; i < numColumns + 1; i++) {
        columnElectrodes = [];

        for (var j = 0 ; j < numRows + 1; j++) {
            var rect1 = draw.ellipse(electrodeSize, electrodeSize).x(startX).y(startY + electrodeSpacing * j).attr({
                fill: '#008'
            }).rotate(45);
            rect1.type = "TX";
            rect1.row = i;
            rect1.column = j;
            columnElectrodes[j] = rect1;
        }
        startX = startX + rowSpacing;
        electrodeArray[i] = columnElectrodes;
    }
    return electrodeArray;
}

function pipForCircle(radius, cx, cy, inputX, inputY) {

    console.log("Radius: " + radius + " " + "Center X : " + cx + " " + "Center Y : " + cy);

    var val = Math.pow((inputX - cx), 2) + Math.pow((inputY - cy), 2) - Math.pow(radius, 2);
    if (val < 0)
        return 0;
    else if (val > 0)
        return 1;
    else
        return 0;

}

function isEntireElectrodeInCircle(points, radius, cx, cy) {

    var val1 = Math.pow((points[0] - cx), 2) + Math.pow((points[1] - cy), 2) - Math.pow(radius, 2);
    var val2 = Math.pow((points[2] - cx), 2) + Math.pow((points[3] - cy), 2) - Math.pow(radius, 2);
    var val3 = Math.pow((points[4] - cx), 2) + Math.pow((points[5] - cy), 2) - Math.pow(radius, 2);
    var val4 = Math.pow((points[6] - cx), 2) + Math.pow((points[7] - cy), 2) - Math.pow(radius, 2);
    
    if ((val1 < 0) && (val2 < 0) && (val3 < 0) && (val4 < 0))
        return 0
    else
        return 1;

}
