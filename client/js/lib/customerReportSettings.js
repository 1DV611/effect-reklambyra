const googleAPI = require('./../../../model/googleApi');
const addGoogleResultsToFormObject = require('./addGoogleResultsToFormObject');

function customerReportSettings(req, res, next) {
  var form = {

    customer: req.body.customer || 'Customer',
    adwords: {
      active: req.body.adwords,
      features: {
        adwordsClick: {
          active: req.body.adwordsClick,
          result: ''
        },
        adwordsCpc: {
          active: req.body.adwordsCpc,
          result: ''
        },
        adwordsViews: {
          active: req.body.adwordsViews,
          result: ''
        }
      }
    },
    facebook: {
      active: req.body.facebook,
      features: {
        facebookLikes: {
          active: req.body.facebookLikes,
          result: ''
        }
      }
    },
    youtube: {
      active: req.body.youtube,
      features: {
        youtubeViews: {
          active: req.body.youtubeViews,
          result: ''
        }
      }
    },
    tynt: {
      active: req.body.tynt,
      features: {
        tyntCopied: {
          active: req.body.tyntCopied,
          result: ''
        }
      }
    },
    addthis: {
      active: req.body.addthis,
      features: {
        addthisClick: {
          active: req.body.addthisClick,
          result: ''
        }
      }
    },
    twitter: {
      active: req.body.twitter,
      features: {
        twitterViews: {
          active: req.body.twitterViews,
          result: ''
        }
      }
    },
    analytics: {
      active: req.body.analytics,
      features: {
        analyticsViews: {
          active: req.body.analyticsViews,
          result: ''
        },
        analyticsUniqueViews: {
          active: req.body.analyticsUniqueViews,
          result: ''
        },
        analyticsStrongestRedirects: {
          active: req.body.analyticsStrongestRedirects,
          result: ''
        },
        analyticsMostVisitedPages: {
          active: req.body.analyticsMostVisitedPages,
          result: ''
        },
        analyticsAverageTime: {
          active: req.body.analyticsAverageTime,
          result: ''
        },
        analyticsAverageVisitedPerPages: {
          active: req.body.analyticsAverageVisitedPerPages,
          result: ''
        }
      }
    },
    linkedin: {
      active: req.body.linkedin,
      features: {
        linkedinFollowers: {
          active: req.body.linkedinFollowers,
          result: ''
        },
        linkedinInteractions: {
          active: req.body.linkedinInteractions,
          result: ''
        }
      }
    },
    moz: {
      active: req.body.moz,
      features: {
        mozKeywords: {
          active: req.body.mozKeywords,
          result: ''
        }
      }
    }
  };

  googleAPI(req.user.accessToken, function (results) {
    addGoogleResultsToFormObject(form, results);
    res.render('preview', { user: req.user, form: JSON.stringify(form) });
  });

  /**
   * REMOVED
   googleAPI(req.user.accessToken, function (results) {
    if (req.body.youtube === 'on') {
      if (req.body.youtubeViews === 'on' && results.youtubeViews) {
        form.youtube.features.youtubeViews = results.youtubeViews;
      }
    }

    if (req.body.analytics === 'on') {
      if (req.body.analyticsViews === 'on' && results.analytics.analyticsViews) {
        form.analytics.features.analyticsViews = results.analytics.analyticsViews;
      }
      if (req.body.analyticsUniqueViews === 'on' && results.analytics.analyticsUniqueViews) {
        form.analytics.features.analyticsUniqueViews = results.analytics.analyticsUniqueViews;
      }
      if (req.body.analyticsStrongestRedirects === 'on' && results.analytics.analyticsStrongestRedirects) {
        form.analytics.features.analyticsStrongestRedirects = results.analytics.analyticsStrongestRedirects;
      }
      if (req.body.analyticsMostVisitedPages === 'on' && results.analytics.analyticsMostVisitedPages) {
        form.analytics.features.analyticsMostVisitedPages = results.analytics.analyticsMostVisitedPages;
      }
      if (req.body.analyticsAverageTime === 'on' && results.analytics.analyticsAverageTime) {
        form.analytics.features.analyticsAverageTime = results.analytics.analyticsAverageTime;
      }
      if (req.body.analyticsAverageVisitedPerPages === 'on' && results.analytics.analyticsAverageVisitedPerPages) {
        form.analytics.features.analyticsAverageVisitedPerPages = results.analytics.analyticsAverageVisitedPerPages;
      }
    }
    res.render('preview', { user: req.user, form: JSON.stringify(form) });
  });

   **/
}

module.exports = customerReportSettings;
