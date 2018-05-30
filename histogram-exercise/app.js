// write your code here!

var width = 900;
var height = 600;
var padding = 50;
var barPadding = 1;
var numOfBins = 20;

var data = regionData.filter(d => d.medianAge !== null);

var minValue = 2;
var maxValue = 60;

var svg = d3.select('svg')
					.attr("width", width)
					.attr("height", height);

svg.append('text')
	.attr('x', width/2)
	.attr('y', padding/2)
	.attr('text-anchor', 'middle')
	.attr('font-size', '1.5em')
	.text('Frequency Plot');

svg.append('text')
	.attr('x', width/2)
	.attr('y', (height-padding))
	.attr('dy', '2em')
	.attr('text-anchor', 'middle')
	.attr('font-size', '1.2em')
	.text('Median Age');

svg.append('text')
	.attr('transform', 'rotate(-90)')
	.attr('x', -height/2)
	.attr('y', '1em')
	.attr('text-anchor', 'middle')
	.attr('font-size', '1.2em')
	.text('Frequency');

var xScale = d3.scaleLinear()
					.domain(d3.extent(data, d => d.medianAge))
					.rangeRound([padding, width - padding]);

numOfBins = xScale.ticks().length;

var main = function(){
	d3.select("#bins")
		.text(numOfBins);

	var histogram = d3.histogram()
						.domain(xScale.domain())
						.thresholds(xScale.ticks(numOfBins))
						.value(d => d.medianAge);
						
	var bins = histogram(data);

	var yScale = d3.scaleLinear()
					.domain([0, d3.max(bins, d => d.length)])
					.range([height-padding, padding]);

	var xAxis = d3.axisBottom(xScale)
					.ticks(numOfBins)
					.tickSizeInner(2);

	var yAxis = d3.axisLeft(yScale)
					.tickSizeInner(1);

	svg.selectAll(".axes").remove();

	svg.append('g')
		.classed("axes", true)
		.attr("transform", "translate(0," + (height - padding) + ")")
		.call(xAxis)
		.selectAll('text')
			.attr('x', 5)
			.attr('y', -3)
			.attr('transform', 'rotate(90)')
			.attr('text-anchor', 'start');

	svg.append('g')
		.classed("axes", true)
		.attr("transform", "translate(" + padding + ", 0)")
		.call(yAxis);

					
	var rect = svg.selectAll('rect')
					.data(bins);
				
	//update selection here
	//not required for this plot

	//enter selection
	rect.enter().append('rect')
		.merge(rect)
		.attr('x', d => xScale(d.x0))
		.attr('y', d => yScale(d.length))
		.attr('width', d => {
			return (xScale(d.x1) - xScale(d.x0) - barPadding) < 0 ? xScale(d.x1) - xScale(d.x0) : xScale(d.x1) - xScale(d.x0) - barPadding;
		})
		.attr('height', d => height - yScale(d.length) - padding)
		.attr('fill', 'blue');

	//exit selection
	rect.exit().remove();
};

main();

d3.select('input')
	.property('min', minValue)
	.property('max', maxValue)
	.property('value', numOfBins)
	.on('input', function(){
		numOfBins = d3.event.target.value;
		main();
	});