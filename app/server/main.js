import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'

Meteor.startup(() => {
  // code to run on server at startup
});

function RequestData() {
    try {
        var result = HTTP.get("http://folding.stanford.edu/stats/api/donors-monthly",
            {params: {team: 111065}})
        //var obj = JSON.parse(result)
        //console.log(obj.month)
        console.log(result.data)
    } catch (e) {
        // Got a network error, time-out or HTTP error in the 400 or 500 range.
         console.log(e)
    }
}

var interval = setInterval(Meteor.bindEnvironment(RequestData), 1000);