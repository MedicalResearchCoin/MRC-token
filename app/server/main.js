import { Meteor } from 'meteor/meteor';
import { donors, donorsMonthly, teams, teamsMonthly, os, search_type, entity, type } from './folding_api'

Meteor.startup(() => {
  // code to run on server at startup
});

var interval = setInterval(Meteor.bindEnvironment(parametrizedDonorsMonthly), 1000);

function parametrizedDonorsMonthly(){
    data = donorsMonthly(
        {
            //passkey: "9aed8a6192104f16cf97f36b8d594835"
            //team: 232719,
            //name: "ProphetDaniel",
            //name: "ProphetD", search_type: search_type.PREFIX.toString(),
            //name: "ophetD", search_type: search_type.LIKE.toString(),
            name: "ophetD", search_type: search_type.LIKE.toString(), team: 232719,
        }
    )
    console.log(data);
}