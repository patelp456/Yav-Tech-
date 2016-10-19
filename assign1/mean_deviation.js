// function for calculating mean from a given object data
function mean (data) {
	var meanOfData = math.mean(data);
	return meanOfData;
};

// function for standard deviation from a given object data
function stdDeviation (data) {
	var std = math.std(data);
	return std;
};

// function for embedding mean and std in the chart
function generateChart (high,low,mean) {
	var chart = c3.generate({
		bindto: document.getElementById('dvImportSegments'),
	    data: {
		    columns: [
	         	['high', high[0],high[1],high[2],high[3],high[4],high[5],high[6],high[7],high[8],high[9],high[10],high[11]],
	         	['low',low[0],low[1],low[2],low[3],low[4],low[5],low[6],low[7],low[8],low[9],low[10],low[11]],
	         	['mean', mean[0],mean[1],mean[2],mean[3],mean[4],mean[5],mean[6],mean[7],mean[8],mean[9],mean[10],mean[11]],
		      ],
		    type: 'line'
	    }
	});
};

function ChartHandler (data) {
	
	var high = new Array(); // array of high values
	var low = new Array();  // array of low values
	var mean = new Array(); // array of mean values
	var i;
	for (i = 1; i < data.length; i++) { 
	    high[i-1] = data[i][0];
	    low[i-1] = data[i][1];
	    mean[i-1] = math.mean(high[i-1],low[i-1]);
	}

	generateChart(high,low,mean);
};

$(document).ready(function() {

	// The event listener for the file upload
	document.getElementById('txtFileUpload').addEventListener('change', upload, false);

	// Method that checks that the browser supports the HTML5 File API
	function browserSupportFileUpload() {
	    var isCompatible = false;
	    if (window.File && window.FileReader && window.FileList && window.Blob) {
	    isCompatible = true;
	    }
	    return isCompatible;
}

// Method that reads and processes the selected file
function upload(evt) {
    if (!browserSupportFileUpload()) {
        alert('The File APIs are not fully supported in this browser!');
        } else {
            var data = null;
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(event) {
                var csvData = event.target.result;
                data = $.csv.toArrays(csvData);
                if (data && data.length > 0) {
                    //alert('Imported -' + data.length + '- rows successfully!');
                    //document.write(data);
                    ChartHandler(data);
                } else {
                    alert('No data to import!');
                }
            };
            reader.onerror = function() {
                alert('Unable to read ' + file.fileName);
            };
        }
    }
});
