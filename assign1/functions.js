// function that dumps the debug values for an object
function print_debug(printthis, returnoutput) 
{
    var output = '';

    if($.isArray(printthis) || typeof(printthis) == 'object') 
    {
        for(var i in printthis) 
        {
            output += i + ' : ' + print_debug(printthis[i], true) + '\n';
        }
    }
    else 
    {
        output += printthis;
    }

    if(returnoutput && returnoutput == true) 
    {
        return output;
    }
    else 
    {
        alert(output);
    }
}

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

function generateChart (high,low,mean,std1,std2,revenue,bookvalue,eps,dividends,year) {
	var chart = c3.generate({
		bindto: document.getElementById('dvImportSegments'),
	    data: {
	    	x: year[0],
		    columns: [
		    	year,
		    	high,
		    	low,
		    	mean,
		    	std1,
		    	std2,
		    	revenue,
		    	bookvalue,
		    	eps,
		    	dividends,
 		    ],
		    type: 'line'
	    }
	});
};


function generateChart2 (rateEps,rateDividends,rateMean,year) {
	var chart = c3.generate({
		bindto: document.getElementById('chart2'),
	    data: {
	    	x: year[0],
		    columns: [
		    	year,
		    	rateEps,
		    	rateDividends,
		    	rateMean,
 		    ],
		    type: 'line',
		    //labels: true
	    },
	    grid: {
	        y: {
	            lines: [
	                {value: 0, text: 'Base label of eps', position: 'middle'}
	            ]
	        }
	    }
	});
};

function ChartHandler (data) {

	var high = new Array();
	var low = new Array();
	var mean = new Array();
	var std1 = new Array();
	var std2 = new Array();
	var revenue = new Array();
	var bookvalue = new Array();
	var eps = new Array();
	var dividends = new Array();

	var rateEps = new Array();
	var rateMean = new Array();
	var rateDividends = new Array();
	var year = new Array();

	var i;

	year[0] = data[0][0]
	high[0] = data[0][1];
	low[0] = data[0][2];
	mean[0] = "mean";
	std1[0] = "std1";
	std2[0] = "std2";
	revenue[0] = data[0][3];
	bookvalue[0] = data[0][4];
	eps[0] = data[0][5];
	dividends[0] = data[0][6];
	rateEps[0] = "eps";
	rateMean[0] = 'mean';
	rateDividends[0] = 'dividends';
	
	

	for (i = 1; i < data.length; i++) {

		year[i] = data[i][0];
	    high[i] = data[i][1];
	    low[i] = data[i][2];
	    mean[i] = math.mean(high[i],low[i]);

	    if (data[i][3] != 0) 
	    {
	    	revenue[i] = (mean[i])/(data[i][3]);
	    } 
	    else 
	    {
	    	revenue[i] = 0; 
	    }

	    if (data[i][4] != 0) 
	    {
	    	bookvalue[i] = (mean[i])/(data[i][4]);
	    } 
	    else 
	    {
	    	bookvalue[i] = 0;
	    }

	    if (data[i][5] != 0) 
	    {
	    	 eps[i] = (mean[i])/(data[i][5]);
	    } 
	    else 
	    {
	    	eps[i] = 0;
	    }

	    if (data[i][6] != 0) 
	    {
	    	dividends[i] = (mean[i])/(data[i][6]);
	    } 
	    else 
	    {
	    	dividends[i] = 0;
	    }
	    
	    std1[i] = mean[i] + math.std(high[i], low[i]);
	    std2[i] = mean[i] - math.std(high[i], low[i]);

	}


	// calculate rateEps over year 
	rateEps[1] = 0;
	rateMean[1] = 0;
	rateDividends[1] = 0;

	for (var i = 2; i < data.length; i++) {
		rateEps[i] = (data[i][5] - data[i-1][5]).toFixed(2);
		rateMean[i] = (mean[i] - mean[i-1]).toFixed(2);
        rateMean[i] = (Number(rateMean[i]) + Number(rateMean[i-1])).toFixed(2);
		rateDividends[i] = (data[i][6] - data[i-1][6]).toFixed(2);
	}

	print_debug(mean);
    print_debug(rateMean);
    print_debug(rateEps);
    print_debug(rateDividends);

	generateChart(high,low,mean,std1,std2,revenue,bookvalue,eps,dividends,year);
	generateChart2(rateEps,rateDividends,rateMean,year);

};

// Method that reads and processes the selected file
$(document).ready(function() {

	// The event listener for the file upload
	document.getElementById('txtFileUpload').addEventListener('change', upload, false);

	// Method that checks that the browser supports the HTML5 File API
	function browserSupportFileUpload() 
	{
	    var isCompatible = false;
	    
	    if (window.File && window.FileReader && window.FileList && window.Blob) 
	    {
	    	isCompatible = true;
	    }

	    return isCompatible;
	}

	// Method that reads and processes the selected file
	function upload(evt) {
	    if (!browserSupportFileUpload()) 
	    {
	        alert('The File APIs are not fully supported in this browser!');
	    } 
	    else 
	    {
            var data = null;
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);

            reader.onload = function(event) 
            {
                var csvData = event.target.result;
                data = $.csv.toArrays(csvData);

                if (data && data.length > 0) 
                {
                    //alert('Imported -' + data.length + '- rows successfully!');
                    //document.write(data);
                    ChartHandler(data);
                } 
                else 
                {
                    alert('No data to import!');
                }
            };

            reader.onerror = function() 
            {
                alert('Unable to read ' + file.fileName);
            };
        }
	}
});