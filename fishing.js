/* jshint esversion: 6 */

// populate fishing inputs
function populateFishingInputs() {
  // populate familiar dropdowns
  let familiarList = '<option value="none">Select Familiar...</option>' +
  '<option value="familiarW">Weasels</option>' +
  '<option value="familiarNSA">Newts, Salamanders, Axolotl</option>' +
  '<option value="familiarBL">Black Lamb</option>' +
  '<option value="familiarMDWP">Mourning Dove, Diamond Dove, White Dove, Pigeon</option>' +
  '<option value="familiarBBS">Barn Owl, Burrowing Owl, Screech Owl</option>' +
  '<option value="familiarT">Turtles</option>';

  document.getElementById('familiar1').insertAdjacentHTML('beforeend', familiarList);
  document.getElementById('familiar2').insertAdjacentHTML('beforeend', familiarList);
  document.getElementById('familiar3').insertAdjacentHTML('beforeend', familiarList);

  // populate talismans
  populate('talismansContainer', ['eagle','otter','bear','owl'], 'pillSelect');

  // populate tools
  populate('toolContainer', ['elemental bonus','small pouch','large bag'], 'pillSelect');
}

function buttonFishing() {
}
