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
  '<option value="familiarT">Toads</option>' +
  '<option value="familiarS">Garter Snake, Corn Snake</option>';

  document.getElementById('familiar1').insertAdjacentHTML('beforeend', familiarList);
  document.getElementById('familiar2').insertAdjacentHTML('beforeend', familiarList);
  document.getElementById('familiar3').insertAdjacentHTML('beforeend', familiarList);

  // populate talismans
  populate('talismansContainer', ['vulture','snake','fox','wolf'], 'pillSelect');

  // populate tools
  populate('toolContainer', ['elemental bonus','small pouch','large bag'], 'pillSelect');
}

function buttonScavenging() {
  // get all inputs and convert them to boolean values
  let familiars = {},
      talismans = {},
      master = false,
      name = "";

  function getOptions() {
    // master
    master = (document.getElementById("master").checked === true) ? true:false;

    // familiars
    let famCheck = [document.getElementById("familiar1").value, document.getElementById("familiar2").value, document.getElementById("familiar3").value];
    // console.log(famCheck);

    familiars = {
      CR: (famCheck.indexOf("familiarCR") !== -1) ? true:false,
      BL: (famCheck.indexOf("familiarBL") !== -1) ? true:false,
      FH: (famCheck.indexOf("familiarFH") !== -1) ? true:false,
      MDWP: (famCheck.indexOf("familiarMDWP") !== -1) ? true:false,
      BBS: (famCheck.indexOf("familiarBBS") !== -1) ? true:false,
      T: (famCheck.indexOf("familiarT") !== -1) ? true:false,
      S: (famCheck.indexOf("familiarS") !== -1) ? true:false,
    };

    // FIXME: first entry in object correct, the remaining not showing up?
    // talismans
    let talismansCheck = getPillSelect('talismansContainer');
    console.log(talismansCheck);

    talismans = {
      vulture: (talismansCheck.indexOf("vulture") !== -1) ? true:false,
      snake: (talismansCheck.indexOf("snake") !== -1) ? true:false,
      fox: (talismansCheck.indexOf("fox") !== -1) ? true:false,
      wolf: (talismansCheck.indexOf("wolf") !== -1) ? true:false,
      check: false
    };

    let season = getSeason();
    if (season !== "spring") {
      talismans.vulture = false;
    }
    if (season !== "summer") {
      talismans.snake = false;
    }
    if (season !== "fall") {
      talismans.fox = false;
    }
    if (season !== "winter") {
      talismans.wolf = false;
    }

    if (talismans.vulture || talismans.snake || talismans.fox || talismans.wolf) {
      talismans.check = true;
    }

    // tools
    let toolCheck = getPillSelect('toolContainer');

    tools = {
      elementalBonus: (toolCheck.indexOf("elemental bonus") !== -1) ? true:false,
      smallPouch: (toolCheck.indexOf("small pouch") !== -1) ? true:false,
      largeBag: (toolCheck.indexOf("large bag") !== -1) ? true:false
    };

    // name
    let getName = document.getElementById("name").value;
    name = (getName.length !== 0) ? getName:"[name]";

    // console.log(master, familiars, talismans, tools, name);
  }

  // amount logic
  let amountCheck = "";
  function rollAmount() {
    let output = 0;

    if (familiars.S && master || familiars.S && talismans.check) {
      // S/master/talisman
      output = 4;
    } else if (familiars.S) {
      // S only
      let listAmount = [
        [4,0],
        [15,1],
        [40,2],
        [90,3],
        [100,4]
      ];
      output = rngList(listAmount,100);
    } else if (master || talismans.check) {
      // master or talisman
      let listAmount = [
        [30,1],
        [80,2],
        [100,3]
      ];
      output = rngList(listAmount,100);
    } else {
      // general rng
      let listAmount = [
        [6,0],
        [20,1],
        [90,2],
        [100,3]
      ];
      output = rngList(listAmount,100);
    }

    if (master && talismans.check) {
      output += 1;
    }

    if (tools.elementalBonus && rng(100) <= 25) {
      output += 1;
    }

    if (tools.smallPouch) {
      output += 1;
    }

    if (tools.largeBag) {
      output += 2;
    }

    return output;
  }

  // foragables lists
  let flVeryCommon = [];
  let flCommon = [];
  let flUncommon = [];
  let flRare = [];
  let flVeryRare = [];

  let flVeryCommonSafe = flVeryCommon;
  let flCommonSafe = flCommon;
  let flUncommonSafe = flUncommon;
  let flRareSafe = flRare;
  let flVeryRareSafe = flVeryRare;

  // forage logic
  let rarityCheck = [];
      loot = [];
  function rollForage() {
    let x = rng(1150);
    if (x <= 500) {
      // very common
      loot.push(randomizer(flVeryCommon));
      rarityCheck.push("very common");
    } else if (x <= 800) {
      // common
      loot.push(randomizer(flCommon));
      rarityCheck.push("common");
    } else if (x <= 1000) {
      // uncommon
      loot.push(randomizer(flUncommon));
      rarityCheck.push("uncommon");
    } else if (x <= 1100) {
      // rare
      loot.push(randomizer(flRare));
      rarityCheck.push("rare");
    } else if (x <= 1150) {
      // very rare
      loot.push(randomizer(flVeryRare));
      rarityCheck.push("very rare");
    }
  }

  let bonus = [];
  function rollBonus() {
    // elemental bonus
    if (tools.elementalBonus && rng(100) <= 3) {
      let output = "[elemental bonus very rare elemental mutation runestone]\n";
      bonus.push(output);
    }
  }

  // sanitize outputs
  function sanitize() {
    loot = loot.join(" ");
  }

  // clear
  function clear() {
    rarityCheck = [];
    loot = [];
    bonus = [];
    flVeryCommon = flVeryCommonSafe;
    flCommon = flCommonSafe;
    flUncommon = flUncommonSafe;
    flRare = flRareSafe;
    flVeryRare = flVeryRareSafe;
  }

  getOptions();
  // console.log(master, familiars, talismans, tools);

  rollBonus();
  // console.log(bonus);

  let rollNumber = rollAmount();
  for (let i = 0; i < rollNumber; i++) {
    rollForage();
  }
  console.log(rarityCheck);

  sanitize();

  if (loot.length === 0) {
    document.getElementById("output").innerText = "Unfortunately, " + name + " didn’t find anything of interest on your scavenging trip!";
  } else {
    document.getElementById("output").innerText = name + "'s scavenging trip was a success! You've brought back the following...\n" + loot + bonus;
  }

  clear();
}
