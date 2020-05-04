/* jshint esversion: 6 */

// populate scavenging inputs
function populateScavengingInputs() {
  // populate familiar dropdowns
  let familiarList = '<option value="none">Select Familiar...</option>' +
  '<option value="familiarCR">Crows, Ravens</option>' +
  '<option value="familiarBL">Black Lamb</option>' +
  '<option value="familiarFH">Falcons, Hawks</option>' +
  '<option value="familiarMDWP">Mourning Dove, Diamond Dove, White Dove, Pigeon</option>' +
  '<option value="familiarBBS">Barn Owl, Burrowing Owl, Screech Owl</option>' +
  '<option value="familiarT">Toads</option>';

  document.getElementById('familiar1').insertAdjacentHTML('beforeend', familiarList);
  document.getElementById('familiar2').insertAdjacentHTML('beforeend', familiarList);
  document.getElementById('familiar3').insertAdjacentHTML('beforeend', familiarList);

  // populate talismans
  populate('talismansContainer', ['vulture','snake','fox','wolf'], 'pillSelect');

  // populate tools
  populate('toolContainer', ['elemental bonus','small pouch','large bag'], 'pillSelect');
}

function buttonScavenging() {
}
