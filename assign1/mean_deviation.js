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
function generateChart (high,low,mean,std) {
	var chart = c3.generate({
		bindto: document.getElementById('dvImportSegments'),
	    data: {
		    columns: [
		    	high,
		    	low,
		    	mean,
		    	std,
 		      ],
		    type: 'line',
		    padding: {
	           top: 20,
	           right: 20,
	           left: 20,
		    }
	    }
	});
};

function ChartHandler (data) {

	var high = new Array();
	var low = new Array();
	var mean = new Array();
	var std = new Array();
	var i;
	high[0] = "High";
	low[0] = "Low";
	mean[0] = "Mean";
	std[0] = "std";
	for (i = 1; i < data.length; i++) { 
	    high[i] = data[i][0];
	    low[i] = data[i][1];
	    mean[i] = math.mean(high[i],low[i]);
	    std[i] = math.std(high[i], low[i]);
	}

	//document.write(high);
	generateChart(high,low,mean,std);
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
