function Compare (data) {

	var year = new Array();
	var high = new Array();
	var low = new Array();
	var mean = new Array();
	
	var i;

	year[0] = data[0][0]
	high[0] = data[0][1];
	low[0] = data[0][2];
	mean[0] = "mean";

	for (i = 1; i < data.length; i++) {

		year[i] = data[i][0];
	    high[i] = data[i][1];
	    low1[i] = data[i][2];
	    mean[i] = math.mean(high[i],low[i]);

	}

	return {
        mean: mean,
        year: year
    };
};

function generateChart (mean1, mean2, year) {
	mean1[0] = "mean1";
	mean2[0] = "mean2";
	var chart = c3.generate({
		bindto: document.getElementById('chart2'),
	    data: {
	    	x: year[0],
		    columns: [
		    	year,
		    	mean1,
		    	mean2,
 		    ],
		    type: 'line'
		    //labels: true
	    }
	});
};

d3.csv("test-input/spy.csv", function(error1, data1) {
	d3.csv("test-input/goog2.csv", function(error2, data2) {
		var f1 = Compare(data1);
		document.write(f1);
		var f2 = Compare(data2);
		var mean1 = f1.mean;
		var mean2 = f2.mean;
		var year = f1.year;
		//generateChart(mean1, mean2, year);
	});
});