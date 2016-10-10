// function for calculating mean from a given object data
function mean (data) {
	var meannOfData = math.mean(data);
	return meanOfData;
};

// function for standard deviation from a given object data
function stdDeviation (data) {
	var std = math.std(data);
	return std;
};

// function for embedding mean and std in the chart
function generateChart (data,meanHigh,meanLow,stdHigh,stdLow) {
	var high = data.high;
	var low = data.low;
	var chart = c3.generate({
		bindto: document.getElementById('chart'),
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
	         	['stdHigh2', meanHigh - stdhigh],
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

// function for converting a csv file into object named data
function doStuff(data) {

    var meanHigh = mean(data.high);
    var meanLow = mean(data.low);
    var stdHigh = stdDeviation(data.high);
    var stdLow = stdDeviation(data.low);

    generateChart(data,meanHigh,meanLow,stdHigh,stdLow);
    console.log(data);
}

// function for converting a csv file into JSON format
function csvToJSON(file, callBack) {
    Papa.parse(file, {
        download: false,
        delimiter: "",	// auto-detect
		newline: "",	// auto-detect
		header: true, //the first row of parsed data will be interpreted as field names
		dynamicTyping: true,//numeric and boolean data will be converted to their type instead of remaining strings.
		comments: true,
		skipEmptyLines: true,
        complete: function(results){
            callBack(results.data);
        }
    });
}

csvToJSON("input1.csv", doStuff);
