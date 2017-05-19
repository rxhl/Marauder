d3.queue()
	.defer(d3.csv, "data/classData.csv")
	.defer(d3.csv, "data/categoryNames.csv")
	.await(classesByCategory);

function preprocessData(data) {
    var classNames = [];
    data.forEach(function(row) {
        var className = row.SUMMARY;
        var wordSplit = className.split(" ");
        var courseCategory = wordSplit[0];
        var courseId = wordSplit[0] + " " + wordSplit[1].substr(0, wordSplit[1].length - 1);
        var fullCourseName = courseId + ": " + row.COURSENAME;
        if (wordSplit[2] === "Lecture") {
            if (courseCategory in classNames) {
                classNames[courseCategory].push(fullCourseName);
            } else {
                classNames[courseCategory] = [fullCourseName];
            }
        }
    });

    var nodes = [];
    for (var category in classNames) {
        nodes.push({"name": category, "numClasses": classNames[category].length, "classNames" : classNames[category]});
    }
    return nodes;
}

function preprocessCategoryData(categoryData) {
    var classes = [];
    categoryData.forEach(function(row) {
        var data = row.Categories;
        var wordSplit = data.split(" ");
        var courseCategory = wordSplit[0];
        wordSplit.shift();
        classes.push({"courseCategory":courseCategory, "title": wordSplit.join(" ")});
    });
    return classes;
}

function classesByCategory(error, data, categoryData) {
    // Load data
    var nodes = preprocessData(data);
    var categoryNames = preprocessCategoryData(categoryData);
    
    // Create bubble chart - total of 36 categories
    var width = 400;
    var height = 450;
    var padding = 60;

    var div = d3.select("#classesByCategory");
    div.append("svg")
        .attr("id", "svgClassesByCategory")
        .attr("width", width-10)
        .attr("height", height-padding);
    var svg = d3.select("#svgClassesByCategory");
    
    var div = d3.select("#classesByCategory");
    div.append("div")
        .attr("id", "classList")
        .append("svg")
        .attr("id", "svgClassList")
        .attr("width", width)
        .attr("height", height-padding);

    var radiusScale = d3.scaleSqrt().domain([0, 35]).range([15, 60]);
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    for (var i = 0; i < nodes.length; i++) {
        svg.append("circle")
            .attr("id", "circle"+i)
            .style("fill-opacity", 0.5)
            .on("mouseover", function() {
                var id = this.id.substr(6);
                var circleText = d3.select("#circleText"+id);
                var numClasses = radiusScale.invert(+d3.select(this).attr("r"));
                d3.select(this)
                    .attr("stroke", "black")
                    .attr("stroke-width", 4);
                addClassList(categoryNames, circleText.text(), nodes, width, height, padding);
            })
            .on("mouseout", function() {
                d3.select(this)
                    .attr("stroke-width", 0);
            });
        
        svg.append("text")
            .attr("id", "circleText"+i)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .on("mouseover", function() {
                var id = this.id.substr(10);
                var numClasses = radiusScale.invert(+d3.select("#circle"+id).attr("r"));
                d3.select("#circle"+id)
                    .attr("stroke", "black")
                    .attr("stroke-width", 4);
                addClassList(categoryNames, d3.select(this).text(), nodes, width, height, padding);
            })
            .on("mouseout", function() {
                var id = this.id.substr(10);
                d3.select("#circle"+id)
                    .attr("stroke-width", 0);
            });
    }
    var svgCircles = svg.selectAll("circle").data(nodes);
    svgCircles.call(d3.drag()
        .on("start", function(d) {
            if (!d3.event.active) {
                simulation.alphaTarget(0.3).restart() 
            };
            d.fx = d.x;
            d.fy = d.y;
        })
        .on("drag", function(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        })
        .on("end", function(d) {
            if (!d3.event.active) { simulation.alphaTarget(0); }
                d.fx = null;
                d.fy = null;
        }));
    
    var svgTexts = svg.selectAll("text").data(nodes);
    svgTexts.call(d3.drag()
        .on("start", function(d) {
            if (!d3.event.active) {
                simulation.alphaTarget(0.3).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
        })
        .on("drag", function(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        })
        .on("end", function(d) {
            if (!d3.event.active) { simulation.alphaTarget(0); }
                d.fx = null;
                d.fy = null;
        }));

    var simulation = d3.forceSimulation()
        .force("center", d3.forceCenter(width / 2, height / 2 - 30))
        .force("repel", d3.forceManyBody().strength(12))
        .force("collide", d3.forceCollide().radius(function (d) {
           return radiusScale(d.numClasses) + 1;
        }))
        .alphaDecay(0);
    
    simulation.nodes(nodes).on("tick", function () {
        svgCircles
            .attr("cx", function(d) { 
                return d.x; 
            })
            .attr("cy", function(d) { 
                return d.y; 
            })
            .attr("r", function(d) {
                return radiusScale(d.numClasses);
            })
            .attr("fill", function(d) {
                return colorScale(d.numClasses);
            });
        
        svgTexts
            .attr("x", function(d) { 
                return d.x; 
            })
            .attr("y", function(d) { 
                return d.y; 
            })
            .text(function(d) {
                return d.name;
            });
    });
}

function addClassList(categoryNames, courseCategory, data, width, height, padding) {
    var lineHeight = 20;
    var svgList = d3.select("#svgClassList");
    
    // Remove any previous text and reset height of svg
    svgList.selectAll("text").remove();
    svgList.attr("height", height - padding);
    
    // Get data for this course
    var courseData = getData(data, courseCategory);
    
    // Append course id and name
    var title = courseCategory + ": " + findClassName(categoryNames, courseCategory);
    svgList.append("text")
        .text(title)
        .attr("x", width / 2)
        .attr("y", padding / 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "22px");
    
    // Append number of classes
     svgList.append("text")
        .text("Number of unique classes taken: " + Math.round(courseData.numClasses))
        .attr("x", width / 2)
        .attr("y", (padding / 2 + lineHeight))
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle");
    
    // Check if list is too long - if so, extend length of svg
    if (courseData.classNames.length > 18) {
        svgList.attr("height", height + (courseData.classNames.length - 18) * lineHeight);
    }
    
    // Append the list of classes
    for (var i = 0; i < courseData.classNames.length; i++) {
        svgList.append("text")
            .text(courseData.classNames[i])
            .attr("x", padding / 2)
            .attr("y", (padding / 2 + lineHeight * 3 + lineHeight * i))
            .attr("font-weight", "normal")
            .attr("text-anchor", "left");
    }
}

function findClassName(categoryNames, courseCategory) {
    for (var obj in categoryNames) {
        if (categoryNames[obj].courseCategory === courseCategory) {
            return categoryNames[obj].title;
        }
    }
    return null;
}

function getData(data, courseCategory) {
    for (var obj in data) {
        if (data[obj].name === courseCategory) {
            return data[obj];
        }
    }
}
