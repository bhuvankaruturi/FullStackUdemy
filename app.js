// write your code here!

var width = 700;
var height = 600;
var padding = 30;
var barPadding = 2;
var numOfBins = 10;

var removeNull = function(obj){
	var keys = [
					"region",
					"subscribersPer100",
					"adultLiteracyRate",
					"growthRate",
					"urbanPopulationRate",
					"extremePovertyRate",
					"medianAge"
				];
	
	for (let i = 0; i < keys.length; i++){
		if(obj[keys[i]] === null) return false;
	}
	return true;
}

var data = regionData.filter(removeNull);

var minValue = 5;
var maxValue = 60;

var main = function(){
	xScale = d3.scaleLinear()
					.domain(d3.extent(data, d => d.medianAge))
					.range([padding, width - padding]);

	histogram = d3.histogram()
						.domain(xScale.domain())
						.thresholds(xScale.ticks(numOfBins))
						.value(d => d.medianAge);
						
	bins = histogram(data);
	//bins.forEach(d => console.log(d.x0 + " " + d.x1));
	yScale = d3.scaleLinear()
					.domain(d3.extent(bins, d => d.length))
					.range([height-padding, padding]);
					
	svg = d3.select('svg')
					.attr("width", width)
					.attr("height", height);
					
	g = svg
				.selectAll('g')
				.data(bins)
				.enter()
				.append('g');
				
	//update selection
rect.attr('x', d => xScale(d.x0))
			.attr('y', d => yScale(d.length))
			.attr('width', d => xScale(d.x1) - xScale(d.x0) - barPadding)
			.attr('height', d => height - yScale(d.length) - padding)
			.attr('fill', 'red');
	
//exit selection
rect.exit().remove();

//enter selection
rect.enter().append('rect')
	.attr('x', d => xScale(d.x0))
	.attr('y', d => yScale(d.length))
	.attr('width', d => xScale(d.x1) - xScale(d.x0) - barPadding)
	.attr('height', d => height - yScale(d.length) - padding)
	.attr('fill', 'blue');
};

var xScale = d3.scaleLinear()
				.domain(d3.extent(data, d => d.medianAge))
				.range([padding, width - padding]);

var histogram = d3.histogram()
					.domain(xScale.domain())
					.thresholds(xScale.ticks(numOfBins))
					.value(d => d.medianAge);
					
var bins = histogram(data);
console.log(bins.length);
var yScale = d3.scaleLinear()
				.domain(d3.extent(bins, d => d.length))
				.range([height-padding, padding]);
				
var svg = d3.select('svg')
				.attr("width", width)
				.attr("height", height);
				
var rect = svg.selectAll('rect')
			.data(bins);
			
//update selection
rect.attr('x', d => xScale(d.x0))
			.attr('y', d => yScale(d.length))
			.attr('width', d => xScale(d.x1) - xScale(d.x0) - barPadding)
			.attr('height', d => height - yScale(d.length) - padding)
			.attr('fill', 'red');
	
//exit selection
rect.exit().remove();

//enter selection
rect.enter().append('rect')
	.attr('x', d => xScale(d.x0))
	.attr('y', d => yScale(d.length))
	.attr('width', d => xScale(d.x1) - xScale(d.x0) - barPadding)
	.attr('height', d => height - yScale(d.length) - padding)
	.attr('fill', 'blue');

d3.select('input')
	.property('min', minValue)
	.property('max', maxValue)
	.property('value', 20)
	.on('input', function(){
		numOfBins = d3.event.target.value;
		main();
	});

