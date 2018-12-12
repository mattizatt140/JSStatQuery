// mongoose and mathjs must be installed
// command line: npm install mongoose mathjs --save
const mongoose = require('mongoose');
const math     = require('mathjs');
const configDB = require('./config/database');
const Dataset = require('./models/data');

// connect mongoose library to database
mongoose.connect(configDB.url, {useNewUrlParser: true});

// class containing statistical attributes of dataset
class StatsPackage {
    
    /**
     * 
     * @param {*} name Name of dataset to get stats from
     */
    constructor(name) {
        Dataset.findOne({'name': name}, (err, dataset) => {
            if (err) {
                console.log(err);
            } else {
                this.mean = math.mean(dataset.values);
                this.min = math.min(dataset.values);
                this.max = math.max(dataset.values);
                this.stdDev = math.std(dataset.values);
                this.median = math.median(dataset.values);
            }
        });
    }
}

function addDataset(name, values) {
    new Dataset({
        name: name,
        values: values
    }).save(err => {
        if (err) {
            console.log(err);
        }
    });
}
 
stats = new StatsPackage('sample');
setTimeout(() => {
    console.log(stats);
}, 1000);