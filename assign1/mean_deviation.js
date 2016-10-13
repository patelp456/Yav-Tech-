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
function generateChart (high,low,meanHigh,meanLow,stdHigh,stdLow) {
	var chart = c3.generate({
		bindto: document.getElementById('dvImportSegments'),
	    data: {
	      	xs: {
	      		'high': 'x1',
	      		'low': 'x1',
	            'meanHigh': 'x2',
	            'stdHigh1': 'x2',
	            'stdHigh2': 'x2',
	            'meanLow': 'x3',
	            'stdLow1': 'x3',
	            'stdLow2': 'x3',
	        },
		    columns: [
		    	['x1',1,2,3,4,5,6,7,8,9,10,11,12],
		    	['x2',6],
		    	['x3',7],
	         	['high', high[0],high[1],high[2],high[3],high[4],high[5],high[6],high[7],high[8],high[9],high[10],high[11]],
	         	['low',low[0],low[1],low[2],low[3],low[4],low[5],low[6],low[7],low[8],low[9],low[10],low[11]],
	         	['meanHigh', meanHigh],
	         	['meanLow', meanLow],
	         	['stdHigh1', meanHigh + stdHigh],
	         	['stdLow1', meanLow + stdLow],
	         	['stdHigh2', meanHigh - stdHigh],
	         	['stdLow2', meanLow - stdLow],
		      ],
		    type: 'bar',
		    types: {
		         high: 'line',
		         low: 'line',
		         stdHigh1: 'scatter',
		         stdHigh2: 'scatter',
		         stdLow1: 'scatter',
		         stdLow2: 'scatter',
		    },
		    groups: [
		         ['high','low'],
		         ['meanHIgh', 'stdHigh1', 'stdHigh2'],
		         ['meanLow','stdLow1','stdLow2']
		    ]
	    },
	    bar: 
	    {
	        width: {
	            ratio: 0.5 // this makes bar width 50% of length between ticks
	        }
	        // or
	        //width: 100 // this makes bar width 100px
	    }
	});
};

function ChartHandler (data) {
	
	var high = new Array();
	var low = new Array();
	var i;
	for (i = 1; i < data.length; i++) { 
	    high[i-1] = data[i][0];
	    low[i-1] = data[i][1];
	}

	var meanHigh = mean(high);
	var meanLow = mean(low);
	var stdHigh = stdDeviation(high);
	var stdLow = stdDeviation(low);

	generateChart(high,low,meanHigh,meanLow,stdHigh,stdLow);
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

