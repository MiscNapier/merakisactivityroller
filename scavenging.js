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

  // drop lists
  let dlVeryCommon = [":thumb717157576:",":thumb717157677:",":thumb717157655:",":thumb717157682:",":thumb717157564:",":thumb717157572:",":thumb813880695:"];
  let dlCommon = [":thumb717157634:",":thumb717157642:",":thumb716417779:",":thumb716417804:",":thumb717157602:",":thumb835129305:",":thumb835129328:",":thumb716142125:",":thumb716142135:",":thumb716142160:",":thumb717157675:",":thumb717157597:"];
  let dlUncommon = [":thumb717157707:",":thumb717157593:",":thumb717157675:",":thumb717157700:",":thumb717157669:",":thumb717157664:",":thumb717157658:",":thumb717157645:",":thumb717157615:",":thumb717133497:",":thumb716417842:",":thumb717133593:",":thumb717133545:",":thumb717133532:",":thumb743932752:",":thumb740483255:",":thumb716142158:",":thumb716142166:",":thumb716142119:",":thumb835129289:"];
  let dlRare = [":thumb717157588:",":thumb717157692:",":thumb728748993:",":thumb717157621:",":thumb717157649:",":thumb717157611:",":thumb835129316:",":thumb837468377:"];
  let dlVeryRare = [":thumb717157628:",":thumb716142139:",":thumb716142115:",":thumb716417788:",":thumb716417835:"];

  let dlVeryCommonSafe = dlVeryCommon;
  let dlCommonSafe = dlCommon;
  let dlUncommonSafe = dlUncommon;
  let dlRareSafe = dlRare;
  let dlVeryRareSafe = dlVeryRare;

  // scavenge logic
  let rarityCheck = [];
      loot = [];
  function rollScavenge() {
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
    // CR
    if (familiars.CR && rng(100) <= 25) {
      let output, bonusAmount, bonusList;

      output = ["Your [crow/raven] familiar has found some extra shiny things for you!"];
      bonusAmount = rngList([[50,1],[80,2],[100,3]],100);
      bonusList = [":thumb717157642:",":thumb717157602:",":thumb717157655:",":thumb717157677:",":thumb717157682:",":thumb717157675:",":thumb717157597:",":thumb717157634:",":thumb717157707:",":thumb717157593:",":thumb717157675:",":thumb717157700:",":thumb717157669:",":thumb717157664:",":thumb717157658:",":thumb717157645:",":thumb717157615:",":thumb835129316:"];

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
    if (familiars.T && rng(100) <= 25) {
      let output, bonusAmount, bonusList;

      output = ["Your toad familiar picked up a few extra bones for you! What a grisly find."];
      bonusAmount = rngList([[50,1],[80,2],[100,3]],100);
      bonusList = [":thumb813880695:",":thumb743932752:",":thumb740483255:",":thumb716142139:",":thumb716142115:"];

      for (let i = 0; i < bonusAmount; i++) {
        output.push(randomizer(bonusList));
      }
      bonus.push(output.join(" "));
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
    rollScavenge();
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
