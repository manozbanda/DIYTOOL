function drawElectrodesInCircle(circle, box, slider_value, electrodeSize,electrodeSpacing,draw) {

    
    draw.clear();
    circle = null;
    circle = draw.circle(50);
    circle.radius(slider_value);
    circle.cx(512);
    circle.cy(512);
    circle.stroke("#f00");
    circle.fill("#fff");


    box = circle.bbox();
    draw.rect(box.width, box.height).addClass('pathBox').move(box.x, box.y).attr({
        fill: '#fff',
        stroke: '#f84',
        opacity: 0.5
    });

    var rowElectrodes = new Array();
    var columnElectrodes = new Array();


    
   // var rowSpacing = electrodeSize * 1.5;
    var rowSpacing = electrodeSpacing;

    console.log("Box Width : " + box.width);
    console.log("Box Height : " + box.height);

    var numColumns = Math.floor(box.width / (electrodeSpacing /** 1.5*/));
    console.log("Num rows : " + numColumns);
    var numRows = Math.floor(box.height / (electrodeSpacing /** 1.5*/));
    console.log("Num columns : " + numRows);

    console.log("Box X : " + box.x + electrodeSpacing);
    console.log("Box Y : " + box.y);

    console.log(box.x + electrodeSpacing);
    console.log(box.y - electrodeSpacing);

    rowElectrodes = generateRows(numRows, numColumns, electrodeSize, electrodeSpacing, rowSpacing, box.x, box.y, rowElectrodes, draw);
    columnElectrodes = generateColumns(numRows, numColumns, electrodeSize, electrodeSpacing, rowSpacing, box.x + (electrodeSpacing * 0.5), box.y - (electrodeSpacing * 0.5), columnElectrodes, draw);

    //removing all the electrodes that are completely outside the circle. The center of the electrode is checked for this and if its outside the circle then the electrode is removed.
    for (var i = 0 ; i < numRows + 1; i++) {
        for (var j = 0 ; j < numColumns + 1; j++) {
            if (pipForCircle(circle.width() / 2, circle.cx(), circle.cy(), rowElectrodes[i][j].cx(), rowElectrodes[i][j].cy()) == 1) {
                console.log("Row [i][j] :" + i + " " + j);
                rowElectrodes[i][j].remove();

            }
            if (pipForCircle(circle.width() / 2, circle.cx(), circle.cy(), columnElectrodes[i][j].cx(), columnElectrodes[i][j].cy()) == 1) {
                console.log("Row [i][j] :" + i + " " + j);
                columnElectrodes[i][j].remove();

            }

        }
    }

    //removing all the electrodes that have atleast one of the corners lying outside the circle
    for (var i = 0 ; i < numRows + 1; i++) {
        for (var j = 0 ; j < numColumns + 1; j++) {
            var points = [];
            points[0] = rowElectrodes[i][j].cx() - (rowElectrodes[i][j].width() /2);
            points[1] = rowElectrodes[i][j].cy();

            points[2] = rowElectrodes[i][j].cx() + (rowElectrodes[i][j].width() / 2);
            points[3] = rowElectrodes[i][j].cy();

            points[4] = rowElectrodes[i][j].cx();
            points[5] = rowElectrodes[i][j].cy() - (rowElectrodes[i][j].height()/2);

            points[6] = rowElectrodes[i][j].cx();
            points[7] = rowElectrodes[i][j].cy() + (rowElectrodes[i][j].height()/2);


            if (isEntireElectrodeInCircle(points, circle.width() / 2, circle.cx(), circle.cy()) ) {
                console.log("Row [i][j] :" + i + " " + j);
                rowElectrodes[i][j].remove();

            }

            points[0] = columnElectrodes[i][j].cx() - (columnElectrodes[i][j].width() / 2);
            points[1] = columnElectrodes[i][j].cy();

            points[2] = columnElectrodes[i][j].cx() + (columnElectrodes[i][j].width() / 2);
            points[3] = columnElectrodes[i][j].cy();

            points[4] = columnElectrodes[i][j].cx();
            points[5] = columnElectrodes[i][j].cy() - (columnElectrodes[i][j].height() / 2);

            points[6] = columnElectrodes[i][j].cx();
            points[7] = columnElectrodes[i][j].cy() + (columnElectrodes[i][j].height() / 2);
            if (isEntireElectrodeInCircle(points, circle.width() / 2, circle.cx(), circle.cy()) ) {
                console.log("Column [i][j] :" + i + " " + j);
                columnElectrodes[i][j].remove();

            }

        }
    }

   


}

function initialize(circle, electrodeSize, draw) {
    var circle = draw.circle(50);
    circle.radius(150);
    circle.cx(512);
    circle.cy(512);
    circle.stroke("#f00");
    circle.fill("#fff");

    var box = circle.bbox();
    draw.rect(box.width, box.height).addClass('pathBox').move(box.x, box.y).attr({
        fill: '#fff',
        stroke: '#f84',
        opacity: 0.5
    });

  //  drawElectrodesInCircle(circle, circle.bbox(),300, electrodeSize,50, draw);
    drawElectrodesInCircle(circle, circle.bbox(),200, 20,30, draw);
    return circle;

}