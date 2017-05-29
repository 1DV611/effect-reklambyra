/**
 * Lägger på alla aktiva medier och features på href:en för att preview-vyn ska veta
 * vad som ska visas.
 */

function changeHref() {

  // Koppla till preview-knappen på dashboard-sidan:

  var previewButton = document.querySelector('#previewButton');

  var monthNames = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
      'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December',
  ];

  var monthBeforePreviousMonth;
  var previousMonth;
  var month = months.value;
  if (month === '0') {
    previousMonth = 11;
    monthBeforePreviousMonth = 10;
  } else if (month === '1') {
    previousMonth = 0;
    monthBeforePreviousMonth = 11;
  } else {
    previousMonth = (month - 1);
    monthBeforePreviousMonth = (month - 2);
  }


  // Lägg till månad, år och kund på href:en utifrån det som skrivits i input-fälten på dashboard-sidan:

  var href = '/user/report/' + months.value + '/' + years.value + '?customer=' + customer.value + '&month=' + monthNames[month] + '&previousMonth=' + monthNames[previousMonth] + '&monthBeforePreviousMonth=' + monthNames[monthBeforePreviousMonth] + '&year=' + years.value;

  // Koppla till alla media och feature-inputs på dashboard-sidan:

  var adwords = document.querySelector('#adwords');
  var adwordsClick = document.querySelector('#adwords-click');
  var adwordsCpc = document.querySelector('#adwords-cpc');
  var adwordsViews = document.querySelector('#adwords-views');

  var facebook = document.querySelector('#facebook');
  var facebookLikes = document.querySelector('#facebook-likes');

  var youtube = document.querySelector('#youtube');
  var youtubeViews = document.querySelector('#youtube-views');

  var tynt = document.querySelector('#tynt');
  var tyntCopied = document.querySelector('#tynt-copied');

  var addthis = document.querySelector('#addthis');
  var addthisClick = document.querySelector('#addthis-click');

  var twitter = document.querySelector('#twitter');
  var twitterViews = document.querySelector('#twitter-views');

  var analytics = document.querySelector('#analytics');
  var analyticsViews = document.querySelector('#analytics-views');
  var analyticsUniqueViews = document.querySelector('#analytics-unique-views');

  var analyticsStrongestRedirects = document.querySelector('#analytics-4-strongest-redirects');
  var analyticsMostVisitedPages = document.querySelector('#analytics-4-most-visited-pages');

  var analyticsAverageTime = document.querySelector('#analytics-average-time');
  var analyticsAverageVisitedPerPages = document.querySelector('#analytics-average-visited-per-pages');

  var linkedin = document.querySelector('#linkedin');
  var linkedinFollowers = document.querySelector('#linkedin-followers');
  var linkedinInteractions = document.querySelector('#linkedin-interactions');

  var moz = document.querySelector('#moz');
  var mozKeywords = document.querySelector('#moz-keywords');


  // Vilka medier och features som blivit iklickade på dashboard-sidan:

  if (adwords && adwords.checked) {
    if (adwords.checked)
        href += '&adwords=active';
    if (adwordsClick.checked)
        href += '&adwordsClick=active';
    if (adwordsCpc.checked)
        href += '&adwordsCpc=active';
    if (adwordsViews.checked)
        href += '&adwordsViews=active';
  }

  if (facebook && facebook.checked) {
    if (facebook.checked)
        href += '&facebook=active';
    if (facebookLikes.checked)
        href += '&facebookLikes=active';
  }

  if (youtube && youtube.checked) {
    if (youtube.checked)
        href += '&youtube=active';
    if (youtubeViews.checked)
        href += '&youtubeViews=active';
  }

  if (tynt && tynt.checked) {
    if (tynt.checked)
        href += '&tynt=active';
    if (tyntCopied.checked)
        href += '&tyntCopied=active';
  }

  if (addthis && addthis.checked) {
    if (addthis.checked)
        href += '&addthis=active';
    if (addthisClick.checked)
        href += '&addthisClick=active';
  }

  if (twitter && twitter.checked) {
    if (twitter.checked)
        href += '&twitter=active';
    if (twitterViews.checked)
        href += '&twitterViews=active';
  }

  if (analytics && analytics.checked) {
    if (analytics.checked)
        href += '&analytics=active';
    if (analyticsViews.checked)
        href += '&analyticsViews=active';
    if (analyticsUniqueViews.checked)
        href += '&analyticsUniqueViews=active';
    if (analyticsStrongestRedirects.checked)
        href += '&analyticsStrongestRedirects=active';
    if (analyticsMostVisitedPages.checked)
        href += '&analyticsMostVisitedPages=active';

    if (analyticsAverageTime.checked)
        href += '&analyticsAverageTime=active';
    if (analyticsAverageVisitedPerPages.checked)
        href += '&analyticsAverageVisitedPerPages=active';
  }

  if (linkedin && linkedin.checked) {
    if (linkedin.checked)
        href += '&linkedin=active';
    if (linkedinFollowers.checked)
        href += '&linkedinFollowers=active';
    if (linkedinInteractions.checked)
        href += '&linkedinInteractions=active';
  }

  if (moz && moz.checked) {
    href += '&moz=active';
    if (mozKeywords.checked)
        href += '&mozKeywords=active';
  }

  // Lägger till datan som ska skickas med på preview-knappen på dashboarden:

  previewButton.href = href;
}
