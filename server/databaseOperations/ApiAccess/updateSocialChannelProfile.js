var ApiAccess = require('../schemas/ApiAccess');
var queryObj;
var updateObj;

/**
 * Sparar och uppdaterar accessinformation för sociala medier
 * vid autentisering mot exempelvis facebook/twitter m.m.
 * Om profile enbart innehåller propertyn provider tas denna propertyn bort
 * @param sessionUserID
 * @param profile
 */
function updateSocialChannelProfile(sessionUserID, profile) {
  console.log(profile);
  updateObj = {
    updated: Date.now()
  };

  //  If - Inaktiverar medier som anges i array för användaren
  //  Else - sparar och uppdaterar medier för användaren
  if (Array.isArray(profile)) {
    updateObj = {
      $unset: {}
    };

    profile.forEach(function (media) {
      updateObj.$unset[media] = 1;
    });
  } else {
    queryObj = {
      provider: profile.provider,
      accessToken: profile.accessToken,
      refreshToken: profile.refreshToken,
      id_token: profile.id_token,
      extraParams: profile.extraParams,
      profile: {
        _json: profile._json,
        _raw: profile._raw
      }
    };

    updateObj[queryObj.provider] = queryObj;
  }

  ApiAccess.findOneAndUpdate(
    { user: sessionUserID },
    updateObj,
    { new: true },
    function (error, matchingApiAccess) {
      if (error) console.log(error);
      if (matchingApiAccess === null) throw new Error('No user to save token to'); //todo how to handle this?
    });
}

module.exports = updateSocialChannelProfile;
