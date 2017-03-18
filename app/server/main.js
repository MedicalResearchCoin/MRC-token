import { Meteor } from 'meteor/meteor';
import { awards, donor, donors, donorsMonthly, team, teams, teamsMonthly, os, search_type, entity, type } from './folding_api'

Meteor.startup(() => {
  // code to run on server at startup
});

var interval = setInterval(Meteor.bindEnvironment(parametrizedDonorsMonthly), 1000);
//var interval = setInterval(Meteor.bindEnvironment(parametrizedDonors), 1000);
//var interval = setInterval(Meteor.bindEnvironment(parametrizedTeam), 1000);
//var interval = setInterval(Meteor.bindEnvironment(parametrizedDonor), 1000);
//var interval = setInterval(Meteor.bindEnvironment(parametrizedTeamsMonthly), 1000);
//var interval = setInterval(Meteor.bindEnvironment(parametrizedTeams), 1000);
//var interval = setInterval(Meteor.bindEnvironment(parametrizedAwards), 1000);

function parametrizedAwards(){
    data = awards(
        {
            entity: entity.TEAM,
            type: type.CREDIT,
            id: 111065,
        }
    );
    console.log(data);
}
function parametrizedDonors(){
    result = donors(
        {
            //passkey: "9aed8a6192104f16cf97f36b8d594835"
            //team: 232719,
            //name: "ProphetDaniel",
            //name: "ProphetD", search_type: search_type.PREFIX.toString(),
            //name: "ophetD", search_type: search_type.LIKE.toString(),
            name: "ophetD", search_type: search_type.LIKE.toString(), team: 232719,
        }
    );
    console.log(result.data);
}
function parametrizedDonorsMonthly(){
    result = donorsMonthly(
        {
            //passkey: "9aed8a6192104f16cf97f36b8d594835"
            //team: 232719,
            //name: "ProphetDaniel",
            //name: "ProphetD", search_type: search_type.PREFIX.toString(),
            //name: "ophetD", search_type: search_type.LIKE.toString(),
            name: "ophetD", search_type: search_type.LIKE.toString(), team: 232719,
        }
    );
    console.log(result.data);
}
function parametrizedTeams(){
    result = teams(
        {
            //passkey: "9aed8a6192104f16cf97f36b8d594835"
            //team: 232719,
            //name: "Medical Research Coin",
            //name: "Medical Res", search_type: search_type.PREFIX.toString(),
            //name: "al Resear", search_type: search_type.LIKE.toString(),
            name: "al Resear", search_type: search_type.LIKE.toString(), team: 232719,
        }
    );
    console.log(result.data);
}
function parametrizedTeamsMonthly(){
    result = teamsMonthly(
        {
            //passkey: "9aed8a6192104f16cf97f36b8d594835"
            //team: 232719,
            //name: "Medical Research Coin",
            //name: "Medical Res", search_type: search_type.PREFIX.toString(),
            //name: "al Resear", search_type: search_type.LIKE.toString(),
            name: "al Resear", search_type: search_type.LIKE.toString(), team: 232719,
        }
    );
    console.log(result.data);
}
function parametrizedTeam(){
    result = team(232719);
    console.log(result.data);
}
function parametrizedDonor(){
    result = donor("ProphetDaniel");
    console.log(result.data);
}