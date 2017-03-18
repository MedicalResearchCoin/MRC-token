/**
 * Created by Jon Snow on 3/17/2017.
 */
import { HTTP } from 'meteor/http'
import { Enumeration } from './enumeration'

/** Stats API
 * This page describes the Folding@home stats JSON API which allows clients to access current statistics about folding
 * and use them in 3rd party software or Websites.
 *
 * The API consists of a number of HTTP end points, some of which accept POST or GET parameters, which return JSON data.
 * These are listed in the sections below. The base URL for all end points is http://folding.stanford.edu/stats.
 *
 * Errors
 *
 * In case of errors an HTTP error code such as 404 Not Found will be returned along with a JSON error of the format
 * {"error": ""}.
 */

export class search_typeClass extends Enumeration{
    constructor(){
        super(["exact", "prefix", "like"]);
    }
}
export class entityClass extends Enumeration{
    constructor(){
        super(["donor", "team"]);
    }
}
export class typeClass extends Enumeration{
    constructor(){
        super(["credit", "wus"]);
    }
}

export var search_type = new search_typeClass();
export var entity = new entityClass();
export var type = new typeClass();

/** /api/donors
 * POST/GET params: name, search_type, passkey, team
 * Returns a list of at most 100 donors ordered by credits.
 * search_type maybe one of exact, prefix or like.
 */
export function donors(givenParams) {
    return requestData(givenParams, "donors");
}

/** /api/donors-monthly
 * POST/GET params: name, search_type, passkey, team, month, year
 * Same as /api/donors but credits are counted for the current month only.
 * search_type maybe one of exact, prefix or like.
 */
export function donorsMonthly(givenParams) {
    return requestData(givenParams, "donors-monthly");
}

/** /api/donor/:donor
 * URL params: donor
 * Returns information about a specific donor.
 */
export function donor(donorName) {
    return requestData({}, "donor/"+donorName);
}

/** /api/teams
 * POST/GET params: name, search_type, passkey, team
 * Returns a list of at most 100 teams ordered by credits.
 * search_type maybe one of exact, prefix or like.
 */
export function teams(givenParams) {
    return requestData(givenParams, "teams");
}

/** /api/teams-monthly
 * POST/GET params: name, search_type, passkey, team, month, year
 * Same as /api/teams but credits are counted for the current month only.
 * search_type maybe one of exact, prefix or like.
 */
export function teamsMonthly(givenParams) {
    return requestData(givenParams, "teams-monthly");
}

/** /api/team/:team
 * URL params: team
 * Returns information about a specific team including a list of the 1000 highest scoring members.
 */
export function team(teamNumber) {
    return requestData({}, "team/"+teamNumber.toString());
}

/** /api/awards/:entity/:type/:id
 * URL params: entity, type, id
 * entity may be one of donor or team.
 * type is the award type and may be one of credit or wus.
 * id may be a user ID, user name or team number, depending on entity.
 * Used as a convenience to redirect requests for award certificates to the scripts which produce them. Award generation could be implemented directly some time in the future.
 * For example:
 * http://folding.stanford.edu/stats/api/awards/donor/credit/anonymous
 */
export function awards(givenParams) {
    if (! givenParams.entity instanceof entityClass)
        return;
    if (! givenParams.type instanceof typeClass)
        return;
    if (givenParams.id === undefined)
        return;

    return requestData({}, "awards/"+givenParams.entity.toString()+"/"+givenParams.type.toString()+"/"+givenParams.id.toString());
}

/** /api/os
 * Returns client statistics and totals by OS and GPU.
 */
export function os() {
    return requestData({}, "os");
}

function getDefinedParameters(givenParams){
    var paramsToUse = {};
    for (var property in givenParams) {
        if (givenParams.hasOwnProperty(property)) {
            // do stuff
            if (property != undefined)
                paramsToUse[property] = givenParams[property];
        }
    }
    return paramsToUse;
}

function requestData(givenParams, givenPath) {
    var definedParams = getDefinedParameters(givenParams)
    try {
        var apiCommnad = "http://folding.stanford.edu/stats/api/"+givenPath;
        //console.log(apiCommnad);
        //console.log(definedParams);
        var result = HTTP.get(apiCommnad,
            {params: definedParams});
        return result;
    } catch (e) {
        // Got a network error, time-out or HTTP error in the 400 or 500 range.
        console.log(e)
    }
}