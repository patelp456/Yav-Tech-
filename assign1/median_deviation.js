// function for converting a csv file into object named data
function csvToObject (filename) {
	var data = $.csv.toObjects(filename);
	return data;
};

// function for calculating mean from a given object data
function mean (data) {
	var maenOfData = math.mean(data);
	return meanOfData;
};

// function for standard deviation from a given object data
function stdDeviation (data) {
	var std = math.std(data);
	return std;
};
