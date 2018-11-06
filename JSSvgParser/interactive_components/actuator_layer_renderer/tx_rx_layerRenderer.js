function generateRXLayerElectrodes(numRows, numColumns, electrodeSize, electrodespacing, rowSpacing, startX, startY, electrodeArray, rxLayer) {

    console.log("Generating Rows");
    var rowElectrodes = new Array();

    for (var i = 0; i < numRows + 1; i++) {
        rowElectrodes = [];

        for (var j = 0; j < numColumns + 1; j++) {
            var rect1 = rxLayer.circle(electrodeSize, electrodeSize).x(startX + (electrodeSpacing * j)).y(startY).attr({
                fill: '#008'
            }).rotate(45);
            rect1.type = "RX";
            rect1.row = i;
            rect1.column = j;
            rect1.status = "Active";


            rowElectrodes[j] = rect1;
            // console.log(i + " " + j);
        }
        startY = startY + rowSpacing;
        electrodeArray.push(rowElectrodes);
    }
    return electrodeArray;

}

function generateDielectricLayer2Electrodes(numRows, numColumns, electrodeSize, electrodespacing, rowSpacing, startX, startY, electrodeArray, dielectricLayer2) {

    console.log("Generating Rows");
    var rowElectrodes = new Array();

    for (var i = 0; i < numRows + 1; i++) {
        rowElectrodes = [];

        for (var j = 0; j < numColumns + 1; j++) {
            var rect1 = dielectricLayer2.circle(electrodeSize, electrodeSize).x(startX + (electrodeSpacing * j)).y(startY).attr({
                fill: '#888'
            }).rotate(45);
            rect1.type = "RX";
            rect1.row = i;
            rect1.column = j;
            rect1.status = "Active";


            rowElectrodes[j] = rect1;
            // console.log(i + " " + j);
        }
        startY = startY + rowSpacing;
        electrodeArray.push(rowElectrodes);
    }
    return electrodeArray;

}


function generateDielectricLayer1RXElectrodes(numRows, numColumns, electrodeSize, electrodespacing, rowSpacing, startX, startY, electrodeArray, dielectricLayer2) {

    console.log("Generating Rows");
    var rowElectrodes = new Array();

    for (var i = 0; i < numRows + 1; i++) {
        rowElectrodes = [];

        for (var j = 0; j < numColumns + 1; j++) {
            var rect1 = dielectricLayer2.circle(electrodeSize, electrodeSize).x(startX + (electrodeSpacing * j)).y(startY).attr({
                fill: '#888'
            }).rotate(45);
            rect1.type = "RX";
            rect1.row = i;
            rect1.column = j;
            rect1.status = "Active";


            rowElectrodes[j] = rect1;
            // console.log(i + " " + j);
        }
        startY = startY + rowSpacing;
        electrodeArray.push(rowElectrodes);
    }
    return electrodeArray;

}

function generateDielectricLayer1TXElectrodes(numRows, numColumns, electrodeSize, electrodespacing, rowSpacing, startX, startY, electrodeArray, dielectricLayer2) {

    console.log("Generating Columns");
    var columnElectrodes = new Array();

    for (var i = 0; i < numColumns + 1; i++) {
        columnElectrodes = [];

        for (var j = 0; j < numRows + 1; j++) {
            var rect1 = dielectricLayer2.circle(electrodeSize, electrodeSize).x(startX).y(startY + electrodeSpacing * j).attr({
                fill: '#888'
            }).rotate(45);
            rect1.type = "TX";
            rect1.row = i;
            rect1.column = j;
            rect1.status = "Active";

            columnElectrodes[j] = rect1;
        }
        startX = startX + rowSpacing;
        electrodeArray[i] = columnElectrodes;
    }
    return electrodeArray;

}

function generateTXLayerElectrodes(numRows, numColumns, electrodeSize, electrodespacing, rowSpacing, startX, startY, electrodeArray, txLayer) {

    console.log("Generating Columns");
    var columnElectrodes = new Array();

    for (var i = 0; i < numColumns + 1; i++) {
        columnElectrodes = [];

        for (var j = 0; j < numRows + 1; j++) {
            var rect1 = txLayer.circle(electrodeSize, electrodeSize).x(startX).y(startY + electrodeSpacing * j).attr({
                fill: '#800'
            }).rotate(45);
            rect1.type = "TX";
            rect1.row = i;
            rect1.column = j;
            rect1.status = "Active";

            columnElectrodes[j] = rect1;
        }
        startX = startX + rowSpacing;
        electrodeArray[i] = columnElectrodes;
    }
    return electrodeArray;

}

function generateSpacedRXLayerElectrodes(numRows, numColumns, electrodeSize, electrodeSpacing, electrodeShape, rowSpacing, startX, startY, electrodeArray, rxLayer) {

    console.log("Generating Rows");
    var rowElectrodes = new Array();

    for (var i = 0; i < numRows + 1; i++) {
        rowElectrodes = [];

        for (var j = 0 ; j < numColumns + 1; j++) {
            if (electrodeShape == 0) {
                var rect1 = rxLayer.rect(electrodeSize, electrodeSize).x(startX + (electrodeSpacing * j)).y(startY).attr({
                    fill: '#008'
                }).rotate(45);
                rect1.type = "RX";
                rect1.row = i;
                rect1.column = j;
                rect1.status = "Active";
            }
            else {
                var rect1 = rxLayer.circle(electrodeSize, electrodeSize).x(startX + (electrodeSpacing * j)).y(startY).attr({
                    fill: '#008'
                });
                rect1.type = "RX";
                rect1.row = i;
                rect1.column = j;
                rect1.status = "Active";
            }




            rowElectrodes[j] = rect1;
            // console.log(i + " " + j);
        }
        startY = startY + electrodeSpacing;
        electrodeArray.push(rowElectrodes);
    }
    return electrodeArray;
}


function filterTXElectrodes(columnElectrodes, vertexSet, numRows, numColumns, txLayer) {

    for (var i = 0; i < numColumns + 1; i++) {

        for (var j = 0; j < numRows + 1; j++) {

            // console.log("i: " + i + " j: " + j);
            if (columnElectrodes[i][j] != undefined) {
                if (!pointInsidePolygon([(columnElectrodes[i][j].cx() - (columnElectrodes[i][j].width() * Math.sqrt(2)) / 2), columnElectrodes[i][j].cy()], vertexSet)) {
                    columnElectrodes[i][j].status = "InActive";
                    columnElectrodes[i][j].remove();
                    continue;
                }
                else if (!pointInsidePolygon([(columnElectrodes[i][j].cx() + (columnElectrodes[i][j].width() * Math.sqrt(2)) / 2), columnElectrodes[i][j].cy()], vertexSet)) {
                    columnElectrodes[i][j].status = "InActive";
                    columnElectrodes[i][j].remove();
                    continue;
                }
                else if (!pointInsidePolygon([columnElectrodes[i][j].cx(), (columnElectrodes[i][j].cy() + (columnElectrodes[i][j].height() * Math.sqrt(2) / 2))], vertexSet)) {
                    columnElectrodes[i][j].status = "InActive";
                    columnElectrodes[i][j].remove();
                    continue;
                }
                else if (!pointInsidePolygon([columnElectrodes[i][j].cx(), (columnElectrodes[i][j].cy() - (columnElectrodes[i][j].height() * Math.sqrt(2) / 2))], vertexSet)) {
                    columnElectrodes[i][j].status = "InActive";
                    columnElectrodes[i][j].remove();
                    continue;
                }

            }

        }


    }
    return columnElectrodes;
}

function filterRXElectrodes(rowElectrodes, vertexSet, numRows, numColumns, draw) {

    for (var i = 0; i < numRows + 1; i++) {

        for (var j = 0; j < numColumns + 1; j++) {

            if (rowElectrodes[i][j] != undefined) {
                if (!pointInsidePolygon([(rowElectrodes[i][j].cx() - (rowElectrodes[i][j].width() * Math.sqrt(2)) / 2), rowElectrodes[i][j].cy()], vertexSet)) {
                    rowElectrodes[i][j].status = "InActive";
                    rowElectrodes[i][j].remove();
                    continue;
                }
                else if (!pointInsidePolygon([(rowElectrodes[i][j].cx() + (rowElectrodes[i][j].width() * Math.sqrt(2)) / 2), rowElectrodes[i][j].cy()], vertexSet)) {
                    rowElectrodes[i][j].status = "InActive";
                    rowElectrodes[i][j].remove();
                    continue;
                }
                else if (!pointInsidePolygon([rowElectrodes[i][j].cx(), (rowElectrodes[i][j].cy() + (rowElectrodes[i][j].height() * Math.sqrt(2) / 2))], vertexSet)) {
                    rowElectrodes[i][j].status = "InActive";
                    rowElectrodes[i][j].remove();
                    continue;
                }
                else if (!pointInsidePolygon([rowElectrodes[i][j].cx(), (rowElectrodes[i][j].cy() - (rowElectrodes[i][j].height() * Math.sqrt(2) / 2))], vertexSet)) {
                    rowElectrodes[i][j].status = "InActive";
                    rowElectrodes[i][j].remove();
                    continue;
                }
            }

        }


    }
    return rowElectrodes;
}

