//Global Variables
j=0;
var data = new Array();
var final = new Array();
var cName = new Array();

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

function ChartMain (high,low,mean,std1,std2,revenue,bookvalue,eps,dividends,year) {
	var chart = c3.generate({
		bindto: document.getElementById('chart1'),
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

function ChartRate (rateEps,rateDividends,rateMean,year) {
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

function ChartCompare (mean1, mean2, year){
	var chart = c3.generate({
		bindto: document.getElementById('chart3'),
	    data: {
	    	x: year[0],
		    columns: [
		    	year,
		    	mean1,
		    	mean2,
 		    ],
		    type: 'line',
		    //labels: true
	    },
	    grid: {
	        y: {
	            lines: [
	                {value: 0, text: 'Base label', position: 'middle'}
	            ]
	        }
	    }
	});
};

function Calculation (data) {

	var year = new Array();
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

	/*print_debug(mean);
    print_debug(rateMean);
    print_debug(rateEps);
    print_debug(rateDividends);*/

	var obj = {
		year: year,
		high: high,
		low: low,
		mean: mean,
		std1: std1,
		std2: std2,
		revenue: revenue,
		bookvalue: bookvalue,
		eps: eps,
		dividends: dividends,
		rateEps: rateEps,
		rateDividends: rateMean,
		rateMean: rateMean
	};

	return obj;
};

// Method that reads and processes the selected file
$(document).ready(function() {

	// The event listener for the file upload
	document.getElementById('txtFileUpload').addEventListener('change', upload, false);
	//document.getElementById('txtFileUpload1').addEventListener('change', upload, false);
	// Method that checks that the browser supports the HTML5 File API
	function browserSupportFileUpload() 
	{
		j = 0;
	    var isCompatible = false;
	    
	    if (window.File && window.FileReader && window.FileList && window.Blob) 
	    {
	    	isCompatible = true;
	    }

	    return isCompatible;
	}

	// Method that reads and processes the selected file
	function upload(evt) {
		//console.log(evt);
		//console.log(evt.target.files.length);
	    if (!browserSupportFileUpload()) 
	    {
	        alert('The File APIs are not fully supported in this browser!');
	    } 
	    else 
	    {
	    	var length = evt.target.files.length;
            //var data = new Array();
            for (var i = 0; i < length; i++) {
            	var file = evt.target.files[i];
            	var name = file.name;
            	console.log(name);
            	cName[i] = name; // stores the company name
            	var reader = new FileReader();
            	reader.readAsText(file);
            	console.log(reader);
            	reader.onload = function(event) 
            	{
            	    var csvData = event.target.result;
            	    console.log(event.target);
            	    data[evt.target.files[j].name] = $.csv.toArrays(csvData);
            	   

            	    if (data[evt.target.files[j].name] && (data[evt.target.files[j].name]).length > 0) 
            	    {
            	        //alert('Imported -' + data.length + '- rows successfully!');
            	        //document.write(data);
            	        final[cName[j]] = Calculation(data[evt.target.files[j].name]);
            	        final[cName[j]].mean[0] = cName[j];
            	        if (length == 1) 
        	        	{
        	        		ChartMain (final[cName[j]].high,final[cName[j]].low,final[cName[j]].mean,final[cName[j]].std1,final[cName[j]].std2,final[cName[j]].revenue,final[cName[j]].bookvalue,final[cName[j]].eps,final[cName[j]].dividends,final[cName[j]].year);
        	        		ChartRate (final[cName[j]].rateEps,final[cName[j]].rateDividends,final[cName[j]].rateMean,final[cName[j]].year);
        	        	} 
        	        	else 
        	        	{
        	        		if (j > 0)
        	        		{
        	        			ChartCompare (final[cName[j-1]].mean, final[cName[j]].mean, final[cName[j]].year);
        	        		}
        	        	}
            	        
            	        //console.log(final);
            	        j++;
            	        //console.log(data);
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

	}

});


