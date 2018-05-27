// write your code here!

var width = 700;
var height = 700;
var padding = 30;

var Yscale = d3.scaleLinear()
				.domain(d3.extent(regionData, dataPoint => dataPoint.subscribersPer100))
				.range([height-padding, padding]);

var Xscale = d3.scaleLinear()
				.domain(d3.extent(regionData, dataPoint => dataPoint.adultLiteracyRate))
				.range([padding, width-padding]);

var fillScale = d3.scaleLinear()
					.domain(d3.extent(regionData, dataPoint => dataPoint.urbanPopulationRate))
					.range(["blue", "green"]);

var radiusScale = d3.scaleLinear()
						.domain(d3.extent(regionData, dataPoint => dataPoint.medianAge))
						.range([4, 30]);

var xAxis = d3.axisBottom(Xscale)
				.tickSize(-(height-padding * 2))
				.tickSizeOuter(0);

var yAxis = d3.axisLeft(Yscale)
				.tickSize(-(width-padding * 2))
				.tickSizeOuter(0);

d3.select("svg")
	.append("g")
		.attr("transform", "translate(" + padding + ",0)")
		.call(yAxis);

d3.select("svg")
	.append("g")
		.attr("transform", "translate(0, " + (height-padding) + ")" )
		.call(xAxis);

d3.select("svg")
	.attr("width", width)
	.attr("height", height)
	.selectAll("circle")
	.data(regionData)
	.enter()
		.append("circle")
		.attr("cx", d => Xscale(d.adultLiteracyRate))
		.attr("cy", d => Yscale(d.subscribersPer100))
		.attr("r", d => radiusScale(d.medianAge))
		.attr("fill", d => fillScale(d.urbanPopulationRate));

d3.select("svg")
	.append("text")
	.attr("x", width / 2)
	.attr("y", height - padding)
	.attr("dy", "1.5em")
	.attr("text-anchor", "middle")
	.text("Literacuy rate in adults aged 15 and above");

d3.select("svg")
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("x", -height / 2)
	.attr("y", padding)
	.attr("dy", "-1.25em")
	.attr("text-anchor", "middle")
	.text("Subscribers Per 100");

d3.select("svg")
	.append("text")
	.attr("x", width / 2)
	.attr("y", padding/2)
	.attr("font-size", "1.25em")
	.attr("text-anchor", "middle")
	.text("Subscribers per 100 against literacy rate plot")