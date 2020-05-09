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
      W: (famCheck.indexOf("familiarW") !== -1) ? true:false,
      NSA: (famCheck.indexOf("familiarNSA") !== -1) ? true:false,
      BL: (famCheck.indexOf("familiarBL") !== -1) ? true:false,
      MDWP: (famCheck.indexOf("familiarMDWP") !== -1) ? true:false,
      BBS: (famCheck.indexOf("familiarBBS") !== -1) ? true:false,
      T: (famCheck.indexOf("familiarT") !== -1) ? true:false,
    };

    // talismans
    let talismansCheck = getPillSelect('talismansContainer');
    console.log(talismansCheck);

    talismans = {
      vulture: (talismansCheck.indexOf("eagle") !== -1) ? true:false,
      snake: (talismansCheck.indexOf("otter") !== -1) ? true:false,
      fox: (talismansCheck.indexOf("bear") !== -1) ? true:false,
      wolf: (talismansCheck.indexOf("owl") !== -1) ? true:false,
      check: false
    };

    let season = getSeason();
    if (season !== "spring") {
      talismans.eagle = false;
    }
    if (season !== "summer") {
      talismans.otter = false;
    }
    if (season !== "fall") {
      talismans.bear = false;
    }
    if (season !== "winter") {
      talismans.owl = false;
    }

    if (talismans.eagle || talismans.otter || talismans.bear || talismans.owl) {
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

    if (familiars.W && master || familiars.W && talismans.check) {
      // W/master/talisman
      output = 4;
    } else if (familiars.W) {
      // W only
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

    if (tools.WmallPouch) {
      output += 1;
    }

    if (tools.largeBag) {
      output += 2;
    }

    return output;
  }

  // drop lists
  let dlVeryCommon = [":thumb725781278:",":thumb725781263:",":thumb736279564:",":thumb732448634:",":thumb716142149:"];
  let dlCommon = [":thumb716142126:",":thumb739031405:",":thumb740482629:",":thumb740482621:",":thumb717157714:",":thumb740482675:"];
  let dlUncommon = [":thumb837910971:",":thumb736279521:",":thumb739031400:"];
  let dlRare = [":thumb740482633:",":thumb794484144:",":thumb735177011:",":thumb735177020:",":thumb716142144:"];
  let dlVeryRare = [":thumb794484157:"];

  let dlVeryCommonSafe = dlVeryCommon;
  let dlCommonSafe = dlCommon;
  let dlUncommonSafe = dlUncommon;
  let dlRareSafe = dlRare;
  let dlVeryRareSafe = dlVeryRare;

  // Fish logic
  let rarityCheck = [];
      loot = [];
  function rollFish() {
    let x = rng(1150);
    if (x <= 500) {
      // very common
      loot.push(randomizer(dlVeryCommon));
      rarityCheck.push("very common");
    } else if (x <= 800) {
      // common
      loot.push(randomizer(dlCommon));
      rarityCheck.push("common");
    } else if (x <= 1000) {
      // uncommon
      loot.push(randomizer(dlUncommon));
      rarityCheck.push("uncommon");
    } else if (x <= 1100) {
      // rare
      loot.push(randomizer(dlRare));
      rarityCheck.push("rare");
    } else if (x <= 1150) {
      // very rare
      loot.push(randomizer(dlVeryRare));
      rarityCheck.push("very rare");
    }
  }

  let bonus = [];
  function rollBonus() {
    // NSA
    if (familiars.NSA && rng(100) <= 25) {
      let output, bonusAmount, bonusList;

      output = ["Your [newt/salamander/axolotl] familiar has done some extra fishing for you!"];
      bonusAmount = rngList([[50,1],[90,2],[100,3]],100);
      bonusList = [":thumb740482621:",":thumb716142126:",":thumb736279564:",":thumb716142149:",":thumb716142149:",":thumb837910971:"];

      for (let i = 0; i < bonusAmount; i++) {
        output.push(randomizer(bonusList));
      }
      bonus.push(output.join(" "));
    }

    // BL
    if (familiars.BL && rng(100) <= 2) {
      let output = "It seems a special someone has followed your lamb familiar all the way home... " + ":thumb729124733:" + "\nTo redeem your Lost Kitten, head over to the current Summoning Requests journal!";
      bonus.push(output);
    }

    // FH
    if (familiars.FH) {
      dlVeryRare.push(":thumb726994265:");
    }

    // MDWP
    if (familiars.MDWP === true) {
      let output = ":thumb711486788: x" + rngRange(5,20);
      dlUncommon.push(output);
    }

    // BBS
    if (familiars.BBS && rng(100) <= 20) {
      console.log("BBS");
      let output, bonusList;

      output = ["Your owl familiar spotted a lost satchel full of goodies! You peek inside the velvet bag to find..."];
      bonusList = [":thumb711513535:",":thumb711513523:",":thumb711513530:",":thumb711513528:",":thumb716142170:",":thumb733563237:",":thumb717157642:",":thumb733563351:",":thumb733563375:",":thumb716417749:",":thumb717157664:",":thumb717157677:"];

      for (let i = 0; i < 3; i++) {
        output.push(randomizer(bonusList));
      }
      bonus.push(output.join(" "));
    }

    // T
    if (familiars.T) {
      let bonusListUncommon, bonusListRare, bonusListVeryRare;

      bonusListUncommon = [":thumb717157634:",":thumb717157642:",":thumb717157602:",":thumb717157675:",":thumb717157597:",":thumb717157677:",":thumb717157655:",":thumb717157682:"];
      bonusListRare = [":thumb717157707:",":thumb717157593:",":thumb717157675:",":thumb717157700:",":thumb717157669:",":thumb717157645:",":thumb717157615:"];
      bonusListVeryRare = [":thumb717157588:",":thumb717157692:",":thumb728748993:",":thumb717157611:"];

      dlUncommon.concat(bonusListUncommon);
      dlRare.concat(bonusListRare);
      dlVeryRare.concat(bonusListVeryRare);
      console.log(dlRare);
    }

    // elemental bonus
    if (tools.elementalBonus && rng(100) <= 3) {
      let output = "[elemental bonus very rare elemental mutation runestone]\n";
      bonus.push(output);
    }
  }

  // sanitize outputs
  function sanitize() {
    loot = loot.join(" ");

    let thumbRegexMDWP = /:thumb711486788: x(5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20)/gi;
    if (loot.search(thumbRegexMDWP) !== -1) {
      let outputMDWP = loot.match(thumbRegexMDWP).join(" ");
      loot = loot.replace(thumbRegexMDWP, "");
      let output = "Your lucky [mourning/diamond/white dove/pigeon] familiar found some spare drachmas for you!\n" + outputMDWP;
      bonus.push(output);
    }

    if (bonus.length !== 0) {
      bonus = "\n\n" + bonus.join("\n\n");
    }
  }

  // clear
  function clear() {
    rarityCheck = [];
    loot = [];
    bonus = [];
    dlVeryCommon = dlVeryCommonSafe;
    dlCommon = dlCommonSafe;
    dlUncommon = dlUncommonSafe;
    dlRare = dlRareSafe;
    dlVeryRare = dlVeryRareSafe;
  }

  getOptions();
  // console.log(master, familiars, talismans, tools);

  rollBonus();
  // console.log(bonus);

  let rollNumber = rollAmount();
  for (let i = 0; i < rollNumber; i++) {
    rollFish();
  }
  console.log(rarityCheck);

  sanitize();

  if (loot.length === 0) {
    document.getElementById("output").innerText = "Unfortunately, " + name + " didn’t find anything of interest on your fishing trip!";
  } else {
    document.getElementById("output").innerText = name + "'s fishing trip was a success! You've brought back the following...\n" + loot + bonus;
  }

  clear();
}
