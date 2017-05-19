d3.csv("../files/classData.csv", function(error, data) {
    var uniqueCategories = [];
    data.forEach(function(row) {
        var className = row.SUMMARY;
        var wordSplit = className.split(" ");
        if (!uniqueCategories.includes(wordSplit[0])) {
            uniqueCategories.push(wordSplit[0]);
        }
    });
    uniqueCategories.sort();
     console.log(uniqueCategories);
    console.log("Number of unique categories: " + uniqueCategories.length);
});