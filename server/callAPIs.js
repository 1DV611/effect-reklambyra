'use strict';

var errorHandler = require('./errorHandler');
var googleAPI = require('./APIs/googleAPI');
var instagramAPI = require('./APIs/instagramAPI');
var linkedinAPI = require('./APIs/linkedinAPI');
var twitterAPI = require('./APIs/twitterAPI');
var facebookAPI = require('./APIs/facebookAPI');
var acrossAPI = require('./APIs/33acrossAPI');
var addThisAPI = require('./APIs/addThisAPI');
var APIResultsToObject = require('./../server/helpers/APIResultsToObject');

/**
 *
 * @param access ett access objekt från databasen innehållande profiler från google facebook etc
 * incl accessTokens
 * @param startDateInUnix unix epoch int timestamp.
 *
 * Data hämtas för månad och år av unixTimeStamp, dag etc ignoreras. För nuvarande månad ges data hitills.
 *
 * Hämtar data från alla de APIer en avändare har credentials för.
 * För att hantera async använder funktioen Promises istället för callbacks:
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
 *
 * För att Promise.all ska exekvera .then måste alla Promises resolve(). Iaf ett callar reject() så
 * kommer APIResultsToObject aldrig att callas. Därför så använder ingen av API modulerna Reject()
 * mot denna funktion utan även (förväntade) errors skickas med Resolve().
 *
 * Skulle något API skicka ett oväntat error hamnar det i catch och ingen data sparas/returneras.
 *
 */

function allAPIsMonthly(access, startDateInUnix) {
  return new Promise(function (resolve, reject) {
    var promises = [];

    // för APIer där data måste hämtas både månadsvis och dagligen har
    // dessa en monthly och en daily metod här ska monthly användas för sådana APIer
    if (access.twitter) {
      promises.push(twitterAPI(access.twitter.access, startDateInUnix));
    }

    if (access.facebook) {
      promises.push(facebookAPI(access.facebook.access, startDateInUnix));
    }

    if (access.linkedin) {
      promises.push(linkedinAPI(access.linkedin.access, startDateInUnix));
    }

    if (access.google) {
      promises.push(googleAPI(access.google.access, startDateInUnix, access.user));
    }

    if (access.instagram) {
      promises.push(instagramAPI(access.instagram.access, startDateInUnix));
    }

    if (access.tynt) {
      promises.push(acrossAPI.monthly(access.tynt.access, startDateInUnix));
    }

    if (access.addthis) {
      promises.push(addThisAPI(access.addthis.access, startDateInUnix));
    }

    Promise.all(promises).then(function (apiData) {
      /**
       * @apiData array of returnObj
       * Alla API moduler följer samma return pattern. Ett returnObj inehåller en nyckel med
       * apiets namn och därefter ett nästlat objekt med key.value för data.
       * Varje del av ett returnObj kan ersättas med en error key iaf en viss del av data ej
       * är möjlig att hämta t ex linkedin skulle kunna ge;
       *
       * linkedin {
       * newCount: 42,
       * totalCount: 42,
       * error: 'no interactions data for 2017/04'
       * }
       *
       *
       */
      resolve(APIResultsToObject(apiData));
    }).catch(function (error) {
      errorHandler.log(error, 'callAPIs monthly caught error');
      reject(error);
    });
  });
}

/**
 *
 * @param access
 * @param startDateInUnix
 *
 * Används för de delar av API data som behövs hämtas och lagras dagligen under en månad.
 * De APIer som behöver daglig data har en .daily metod som alltid ska användas här.
 */
function allAPIsDaily(access) {
  return new Promise(function (resolve, reject) {
    var promises = [];

    if (access.tynt) {
      promises.push(acrossAPI.daily(access.tynt.access));
    }

    Promise.all(promises).then(function (dailyAPIData) {
      resolve(APIResultsToObject(dailyAPIData));
    }).catch(function (error) {
      errorHandler.log(error, 'callAPIs daily caught error');
      reject(error);
    });
  });
}

exports.monthly = allAPIsMonthly;
exports.daily = allAPIsDaily;
