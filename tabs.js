/* jshint esversion: 6 */

// tab contents
let tabForaging, tabScavenging, tabFishing;

tabForaging = document.getElementById('foraging').innerHTML;
tabScavenging = tabForaging;
tabFishing = tabForaging;;
/*
tabScavenging = document.getElementById('scavenging').innerHTML;
tabFishing = document.getElementById('fishing').innerHTML;
*/

document.getElementById('foraging').innerHTML = '';
document.getElementById('scavenging').innerHTML = '';
document.getElementById('fishing').innerHTML = '';

// tabLinks
// tweaked tabLinks so that unused tabs are removed entirely, so that element names can be reused
function openTab(evt, tabName) {
  // Declare all variables
  let i, tabContent, tabLinks;

  // Get all elements with class='tabContent' and hide them
  tabContent = document.getElementsByClassName('tabContent');
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = 'none';
  }

  // Get all elements with class='tabLinks' and remove the class 'active'
  tabLinks = document.getElementsByClassName('tabLinks');
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(' active', '');
  }
  document.getElementById('foraging').innerHTML = '';
  document.getElementById('scavenging').innerHTML = '';
  document.getElementById('fishing').innerHTML = '';

  // Show the current tab, and add an 'active' class to the button that opened the tab
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
  if (tabName === 'foraging') {
    document.getElementById('foraging').innerHTML = tabForaging;
    populateForagingInputs();
  }
  if (tabName === 'scavenging') {
    document.getElementById('scavenging').innerHTML = tabScavenging;
    populateScavengingInputs();
  }
  if (tabName === 'fishing') {
    document.getElementById('fishing').innerHTML = tabFishing;
    populateFishingInputs();
  }

  // update buttonRoll onclick function
  // console.log(tabName);
  let functionStr;
  onclickStr = 'button' + tabName.capitalizeStr() + '();';
  document.getElementById('buttonRoll').setAttribute('onclick', onclickStr);

  // clear output box
  document.getElementById('output').innerHTML = '';
}

/*
// tabLinks
function openTab(evt, tabName) {
  // Declare all variables
  let i, tabContent, tabLinks;

  // Get all elements with class='tabContent' and hide them
  tabContent = document.getElementsByClassName('tabContent');
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = 'none';
  }

  // Get all elements with class='tabLinks' and remove the class 'active'
  tabLinks = document.getElementsByClassName('tabLinks');
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(' active', '');
  }

  // Show the current tab, and add an 'active' class to the button that opened the tab
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';

  // update buttonRoll onclick function
  // console.log(tabName);
  let functionStr;
  onclickStr = 'button' + tabName.capitalizeStr() + '();';
  document.getElementById('buttonRoll').setAttribute('onclick', onclickStr);

  // clear output box
  document.getElementById('output').innerHTML = '';
}
*/

// open default tab
document.getElementById('defaultOpen').click();
