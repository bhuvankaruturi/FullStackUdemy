var width = 600;
var height = 600;
var padding = 50;

var minYear = d3.min(birthData, d => d.year);
var maxYear = d3.max(birthData, d => d.year);

var order = {"January": 1, "February": 2, "March": 3,
				 "April": 4, "May": 5, "June": 6, 
				 "July": 7, "August": 8, "September": 9, 
				 "October": 10, "November": 11, "December": 12};

d3.select('svg')
	.attr("width", width)
	.attr("height", height)
	.append('g')
		.classed('chart', true)
		.attr('transform', 'translate(' + width/2 + ',' +  height/2 + ')');

d3.select('svg')
	.append('text')
	.attr('x', width / 2)
	.attr('y', padding / 2)
	.attr('text-anchor', 'middle')
	.attr('font-size', '1.5em')
	.text('Births per month and quarter');


d3.select('input')
	.property('min', minYear)
	.property('max', maxYear)
	.property('value', minYear)
	.on('input', function(){
		generatePieChart(+d3.event.target.value);
	});

var generatePieChart = function(year){

	d3.select("#year")
		.text(year);

	var data = birthData.filter(d => d.year === year);

	var innerData = [0, 0, 0, 0];
	data.forEach((d, i) => {
		innerData[Math.floor(i/3)] += d.births;
	})

	var outerColorScale = d3.scaleOrdinal()
						.domain(data.map(d => d.month))
						.range(d3.schemeCategory20);

	var innerColorScale = d3.scaleOrdinal()
								.domain([0, 1, 2, 3])
								.range(d3.schemeCategory10);

	var arcs = d3.pie()
					.sort((a, b) => order[a.month] - order[b.month])
					.value(d => d.births)
					(data);

	var path = d3.arc()
					.outerRadius(250)
					.innerRadius(150);

	var innerArcs = d3.pie().sort((a, b) => 0)(innerData);

	var innerPath = d3.arc()
						.outerRadius(150)
						.innerRadius(0);

	var updateOuter = d3.select('.chart')
							.selectAll('.arc')
							.data(arcs);

	updateOuter.exit().remove();

	updateOuter.enter()
				.append('path')
				.classed('.arc', true)
				.attr('d', d => path(d))
				.attr('fill', d => outerColorScale(d.data.month));


	var updateInner = d3.select('.chart')
							.selectAll('.innerArc')
							.data(innerArcs);

	updateInner.exit().remove();

	updateInner.enter()
				.append('path')
				.classed('.innerArc', true)
				.attr('d', d => innerPath(d))
				.attr('fill', (d, i) => innerColorScale(d.index));
};


generatePieChart(minYear);