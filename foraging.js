/* jshint esversion: 6 */

// populate foraging inputs
function populateForagingInputs() {
  // populate familiar dropdowns
  let familiarList = '<option value="none">Select Familiar...</option>' +
  '<option value="familiarSOC">Sugar Glider, Opossum, Chinchilla</option>' +
  '<option value="familiarRMSC">Rats, Mice, Squirrels, Chipmunk</option>' +
  '<option value="familiarBL">Black Lamb</option> ' +
  '<option value="familiarBSAE">Blue Jay, Steller’s Jay, Azure Jay, Eurasian Magpie</option>' +
  '<option value="familiarTRCC">Tits, Robins, Cardinals, Chickadees</option>' +
  '<option value="familiarMDWP">Mourning Dove, Diamond Dove, White Dove, Pigeon</option>' +
  '<option value="familiarBBS">Barn Owl, Burrowing Owl, Screech Owl</option>' +
  '<option value="familiarR">Rabbits</option>' +
  '<option value="familiarH">Hedgehogs</option>';

  document.getElementById('familiar1').insertAdjacentHTML('beforeend', familiarList);
  document.getElementById('familiar2').insertAdjacentHTML('beforeend', familiarList);
  document.getElementById('familiar3').insertAdjacentHTML('beforeend', familiarList);

  // populate talismans
  populate('talismansContainer', ['rabbit','sparrow','deer','racoon'], 'pillSelect');

  // populate tools
  populate('toolContainer', ['elemental bonus','ragged cloak','small pouch','large bag'], 'pillSelect');
}

// 'Roll' button press
function buttonForaging() {
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
      SOC: (famCheck.indexOf("familiarSOC") !== -1) ? true:false,
      RMSC: (famCheck.indexOf("familiarRMSC") !== -1) ? true:false,
      BL: (famCheck.indexOf("familiarBL") !== -1) ? true:false,
      BSAE: (famCheck.indexOf("familiarBSAE") !== -1) ? true:false,
      TRCC: (famCheck.indexOf("familiarTRCC") !== -1) ? true:false,
      MDWP: (famCheck.indexOf("familiarMDWP") !== -1) ? true:false,
      BBS: (famCheck.indexOf("familiarBBS") !== -1) ? true:false,
      R: (famCheck.indexOf("familiarR") !== -1) ? true:false,
      H: (famCheck.indexOf("familiarH") !== -1) ? true:false
    };

    // FIXME: first entry in object correct, the remaining not showing up?
    // talismans
    let talismansCheck = getPillSelect('talismansContainer');
    console.log(talismansCheck);

    talismans = {
      rabbit: (talismansCheck.indexOf("rabbit") !== -1) ? true:false,
      sparrow: (talismansCheck.indexOf("sparrow") !== -1) ? true:false,
      deer: (talismansCheck.indexOf("deer") !== -1) ? true:false,
      racoon: (talismansCheck.indexOf("racoon") !== -1) ? true:false,
      check: false
    };

    // tools
    let toolCheck = getPillSelect('toolContainer');

    tools = {
      ruggedCloak: (toolCheck.indexOf("rugged cloak") !== -1) ? true:false,
      smallPouche: (toolCheck.indexOf("small pouche") !== -1) ? true:false,
      largeBag: (toolCheck.indexOf("large bag") !== -1) ? true:false
    };


    let season = getSeason();
    if (season !== "spring") {
      talismans.rabbit = false;
    }
    if (season !== "summer") {
      talismans.sparrow = false;
    }
    if (season !== "fall") {
      talismans.deer = false;
    }
    if (season !== "winter") {
        talismans.racoon= false;
    }

    if (talismans.rabbit === true || talismans.sparrow === true || talismans.deer === true || talismans.racoon === true) {
      talismans.check = true;
    }

    let getName = document.getElementById("name").value;
    name = (getName.length !== 0) ? getName:"[name]";

    // console.log(master, familiars, talismans, tools, name);
  }

  // amount logic
  let amountCheck = "";
  function rollAmount() {
    let x = rng(100),
        output = 0;
    if (familiars.SOC === true && master === true || familiars.SOC === true && talismans.check === true) {
      // SOC/master/talisman
      if (x <= 100) {
        // 4
        output = 4;
      }
    } else if (familiars.SOC === true) {
      // SOC only
      if (x <= 4) {
        // none
        output = 0;
      } else if (x <= 15) {
        // 1
        output = 1;
      } else if (x <= 40) {
        // 2
        output = 2;
      } else if (x <= 90) {
        // 3
        output = 3;
      } else if (x <= 100) {
        // 4
        output = 4;
      }
    } else if (master === true || talismans.check === true) {
      // master or talismans
      if (x <= 30) {
        // 1
        output = 1;
      } else if (x <= 80) {
        // 2
        output = 2;
      } else if (x <= 100) {
        // 3
        output = 3;
      }
    } else {
      // general RNG
      if (x <= 6) {
        // none
        output = 0;
      } else if (x <= 20) {
        // 1
        output = 1;
      } else if (x <= 90) {
        // 2
        output = 2;
      } else if (x <= 100) {
        // 3
        output = 3;
      }
    }

    if (master === true && talismans.check === true) {
      output += 1;
    }

    return output;
  }

  // foragables lists
  function familiarRoll() {
    let output = "test",
        x = rng(900);
    if (x <= 50) {
      // rats
      let y = rng(300);
      if (y <= 50) {
        output = ":thumb711486857:";
      } else if (y <= 75) {
        output = ":thumb711486807:";
      } else if (y <= 125) {
        output = ":thumb711486850:";
      } else if (y <= 150) {
        output = ":thumb711486854:";
      } else if (y <= 175) {
        output = ":thumb711486833:";
      } else if (y <= 185) {
        output = ":thumb711486840:";
      } else if (y <= 245) {
        output = ":thumb711486815:";
      } else if (y <= 270) {
        output = ":thumb711486822:";
      } else if (y <= 300) {
        output = ":thumb711486859:";
      }
    } else if (x <= 100) {
      // crows
      let y = rng(110);
      if (y <= 60) {
        output = ":thumb712679022:";
      } else if (y <= 85) {
        output = ":thumb712679011:";
      } else if (y <= 100) {
        output = ":thumb712679015:";
      } else if (y <= 110) {
        output = ":thumb712679027:";
      }
    } else if (x <= 150) {
      // ravens
      let y = rng(90);
      if (y <= 50) {
        output = ":thumb712702154:";
      } else if (y <= 75) {
        output = ":thumb712702160:";
      } else if (y <= 85) {
        output = ":thumb712702163:";
      } else if (y <= 90) {
        output = ":thumb712743124:";
      }
    } else if (x <= 200) {
      // mice
      let y = rng(420);
      if (y <= 50) {
        output = ":thumb712678681:";
      } else if (y <= 100) {
        output = ":thumb712678671:";
      } else if (y <= 125) {
        output = ":thumb712678678:";
      } else if (y <= 175) {
        output = ":thumb712678665:";
      } else if (y <= 200) {
        output = ":thumb712678668:";
      } else if (y <= 225) {
        output = ":thumb712678632:";
      } else if (y <= 235) {
        output = ":thumb712678638:";
      } else if (y <= 300) {
        output = ":thumb712678644:";
      } else if (y <= 325) {
        output = ":thumb712678648:";
      } else if (y <= 385) {
        output = ":thumb712678652:";
      } else if (y <= 410) {
        output = ":thumb712678657:";
      } else if (y <= 420) {
        output = ":thumb712678626:";
      }
    } else if (x <= 240) {
      // jays
      let y = rng(150);
      if (y <= 50) {
        output = "Blue Jay";
      } else if (y <= 75) {
        output = "Steller's Jay";
      } else if (y <= 100) {
        output = "Azure Jay";
      } else if (y <= 150) {
        output = "Eurasian Magpie";
      }
    } else if (x <= 280) {
      // finches
      let y = rng(230);
      if (y <= 60) {
        output = "House Finch";
      } else if (y <= 110) {
        output = "Chaffinch";
      } else if (y <= 160) {
        output = "Goldfinch";
      } else if (y <= 185) {
        output = "Zebra Finch";
      } else if (y <= 230) {
        output = "Brambling";
      }
    } else if (x <= 300) {
      // raptors
      let y = rng(100);
      if (y <= 25) {
        output = "Peregrine Falcon";
      } else if (y <= 75) {
        output = "American Kestrel";
      } else if (y <= 100) {
        output = "Red-Tailed Hawk";
      }
    } else if (x <= 340) {
      // tits
      let y = rng(125);
      if (y <= 50) {
        output = "Bridled Titmouse";
      } else if (y <= 75) {
        output = "Eurasian Blue Tit";
      } else if (y <= 125) {
        output = "Tufted Titmouse";
      }
    } else if (x <= 370) {
      // owls
      let y = rng(125);
      if (y <= 50) {
        output = "Barn Owl";
      } else if (y <= 75) {
        output = "Burrowing Owl";
      } else if (y <= 100) {
        output = "Screech Owl";
      } else if (y <= 125) {
        output = "Great Grey Owl";
      }
    } else if (x <= 430) {
      // doves
      let y = rng(160);
      if (y <= 50) {
        output = ":thumb740482659:";
      } else if (y <= 110) {
        output = ":thumb740482649:";
      } else if (y <= 135) {
        output = ":thumb740482638:";
      } else if (y <= 160) {
        output = ":thumb740482667:";
      }
    } else if (x <= 480) {
      // misc rodents
      let y = rng(180);
      if (y <= 25) {
        output = ":thumb716417816:";
      } else if (y <= 85) {
        output = ":thumb716417824:";
      } else if (y <= 110) {
        output = ":thumb716417829:";
      } else if (y <= 170) {
        output = "Chipmunk";
      } else if (y <= 180) {
        output = "Albino Chipmunk";
      }
    } else if (x <= 510) {
      // marsupials / misc rodent
      let y = rng(40);
      if (y <= 5) {
        output = "Sugar Glider";
      } else if (y <= 30) {
        output = "Opossum";
      } else if (y <= 40) {
        output = "Chinchilla";
      }
    } else if (x <= 560) {
      // rabbits
      let y = rng(270);
      if (y <= 25) {
        output = ":thumb735174607:";
      } else if (y <= 50) {
        output = ":thumb735174584:";
      } else if (y <= 110) {
        output = ":thumb735174557:";
      } else if (y <= 170) {
        output = ":thumb735174623:";
      } else if (y <= 220) {
        output = ":thumb735174591:";
      } else if (y <= 245) {
        output = ":thumb735174569:";
      } else if (y <= 270) {
        output = ":thumb735174613:";
      }
    } else if (x <= 600) {
      // chickens
      let y = rng(240);
      if (y <= 50) {
        output = ":thumb736640928:";
      } else if (y <= 100) {
        output = ":thumb736640982:";
      } else if (y <= 125) {
        output = ":thumb736640989:";
      } else if (y <= 130) {
        output = ":thumb736640957:";
      } else if (y <= 155) {
        output = ":thumb736640969:";
      } else if (y <= 180) {
        output = ":thumb736640937:";
      } else if (y <= 240) {
        output = ":thumb736640976:";
      }
    } else if (x <= 650) {
      // pigs
      let y = rng(230);
      if (y <= 50) {
        output = "Pig - Cream";
      } else if (y <= 100) {
        output = "Pig - Black";
      } else if (y <= 130) {
        output = "Pig - Red";
      } else if (y <= 160) {
        output = "Pig - Pinto";
      } else if (y <= 210) {
        output = "Pig - Saddled";
      } else if (y <= 220) {
        output = "Pig - Tri-Coloured";
      } else if (y <= 230) {
        output = "Pig - Wild Boar";
      }
    } else if (x <= 680) {
      // weasels
      let y = rng(110);
      if (y <= 50) {
        output = "Weasel - Brown";
      } else if (y <= 100) {
        output = "Weasel - White";
      } else if (y <= 110) {
        output = "Weasel - Points";
      }
    } else if (x <= 710) {
      // hedgehogs
      let y = rng(75);
      if (y <= 25) {
        output = "Hedgehog - Cream";
      } else if (y <= 35) {
        output = "Hedgehog - Black";
      } else if (y <= 60) {
        output = "Hedgehog - Cinnamon";
      } else if (y <= 70) {
        output = "Hedgehog - Brown";
      } else if (y <= 75) {
        output = "Hedgehog - Albino";
      }
    } else if (x <= 740) {
      // toads
      let y = rng(185);
      if (y <= 60) {
        output = "Toad - Brown";
      } else if (y <= 110) {
        output = "Toad - Mossy";
      } else if (y <= 135) {
        output = "Toad - Spotted";
      } else if (y <= 160) {
        output = "Toad - Red";
      } else if (y <= 185) {
        output = "Toad - Gold";
      }
    } else if (x <= 770) {
      // turtles
      let y = rng(120);
      if (y <= 40) {
        output = "Eastern Box Turtle";
      } else if (y <= 80) {
        output = "Painted Turtle";
      } else if (y <= 120) {
        output = "Pond Slider Turtle";
      }
    } else if (x <= 800) {
      // snakes
      let y = rng(100);
      if (y <= 100) {
        output = "snake (colour odds coming soon)";
      }
    } else if (x <= 830) {
      // amphibians
      let y = rng(150);
      if (y <= 60) {
        output = "Common Newt";
      } else if (y <= 110) {
        output = "Eastern Newt";
      } else if (y <= 135) {
        output = "Sierra Newt";
      } else if (y <= 145) {
        output = "Blue-Spotted Salamander";
      } else if (y <= 150) {
        output = "Axolotl";
      }
    } else if (x <= 900) {
      // songbirds
      let y = rng(240);
      if (y <= 60) {
        output = ":thumb718854405:";
      } else if (y <= 70) {
        output = ":thumb718854426:";
      } else if (y <= 130) {
        output = ":thumb718854417:";
      } else if (y <= 180) {
        output = ":thumb718854407:";
      } else if (y <= 230) {
        output = ":thumb718854423:";
      } else if (y <= 240) {
        output = ":thumb718854396:";
      }
    }
    return output;
  }
  let flVeryCommon = [":thumb711486765:",":thumb711486762:",":thumb711486755:",":thumb711513523:",":thumb725781216:",":thumb716142179:",":thumb733563157:",":thumb716417749:",":thumb711513528:",":thumb733563359:",":thumb716417852:",":thumb711513535:",":thumb733563345:",":thumb724744164:",":thumb711513530:",":thumb734085144:"];
  let flCommon = [":thumb733563195:",":thumb726453210:",":thumb711512539:",":thumb716417784:",":thumb716142170:",":thumb732448581:",":thumb734085132:",":thumb732448573:",":thumb732448554:",":thumb716142174:",":thumb725781296:",":thumb732448604:",":thumb711512545:",":thumb733563351:",":thumb733563276:",":thumb733563415:",":thumb733563385:"];
  let flUncommon = [/*":thumb727209468:",":thumb735119021:",":thumb733563237:",":thumb733563183:",":thumb726994219:",":thumb726453385:",":thumb717157582:",":thumb715097318:",":thumb726994238:",":thumb735119026:",":thumb733563335:",":thumb732448622:",":thumb715097305:",":thumb732448648:",":thumb735119029:",":thumb733563375:",":thumb716417830:",":thumb715097293:"*/];
  let flRare = [":thumb726453488:",":thumb711512533:",":thumb733563252:",familiarRoll()];
  let flVeryRare = [":thumb726994265:",":thumb727211352:"];

  // forage logic
  let rarityCheck = [];
      loot = [];
  function rollForage() {
    let x = rng(800);
    if (x <= 400) {
      // very common
      loot.push(randomizer(flVeryCommon));
      rarityCheck.push("very common");
    } else if (x <= 650) {
      // common
      loot.push(randomizer(flCommon));
      rarityCheck.push("common");
    } else if (x <= 775) {
      // uncommon
      loot.push(randomizer(flUncommon));
      rarityCheck.push("uncommon");
    } else if (x <= 795) {
      // rare
      loot.push(randomizer(flRare));
      rarityCheck.push("rare");
    } else if (x <= 800) {
      // very rare
      loot.push(randomizer(flVeryRare));
      rarityCheck.push("very rare");
    }
  }

  let bonus = [];
  function rollBonus() {
    // RMSC
    if (familiars.RMSC === true && rng(100) <= 25) {
      let y = rng(100),
          bonusAmount = 0;

      if (y <= 50) {
        // 1
        bonusAmount = 1;
      } else if (y <= 80) {
        // 2
        bonusAmount = 2;
      } else if (y <= 100) {
        // 3
        bonusAmount = 3;
      }

      if (bonusAmount > 0) {
        let bonusList = [":thumb735119026:",":thumb735119021:",":thumb733563237:",":thumb711512545:",":thumb732448604:",":thumb733563415:",":thumb733563195:",":thumb733563351:",":thumb732448581:",":thumb732448573:"],
            output = ["Your [rat/mouse/squirrel/chipmunk] familiar has found some extra food for you!"];
        for (let i = 0; i < bonusAmount; i++) {
          output.push(randomizer(bonusList));
        }
        bonus.push(output.join(" "));
      }
    }

    // BL
    if (familiars.BL === true && rng(100) <= 2) {
      let bonusList = [":thumb729124733:",":thumb729124733:", ":thumb729124741:",":thumb729124756:",":thumb729124763:"],
          output = "It seems a special someone has followed your lamb familiar all the way home..." + randomizer(bonusList) + "\nTo redeem your Lost Kitten, head over to the current Summoning Requests journal!";
      bonus.push(output);
    }

    // BSAE
    if (familiars.BSAE === true) {
      /*
      flVeryCommon.push(":thumb717157677:");
      flVeryCommon.push(":thumb717157682:");
      flVeryCommon.push(":thumb717157655:");
      flVeryCommon.push(":thumb717157576:");
      */
      flCommon.push(":thumb717157677:");
      flCommon.push(":thumb717157682:");
      flCommon.push(":thumb717157655:");
      flCommon.push(":thumb717157576:");
      flCommon.push(":thumb717157634:");
      flCommon.push(":thumb717157700:");
      flCommon.push(":thumb717157642:");
      flCommon.push(":thumb717157675:");
      flCommon.push(":thumb717157597:");
      flCommon.push(":thumb717157602:");
      flCommon.push(":thumb717157564:");
      flCommon.push(":thumb717157572:");
      flUncommon.push(":thumb717157707:");
      flUncommon.push(":thumb717157593:");
      flUncommon.push(":thumb717157615:");
      flUncommon.push(":thumb717157669:");
      flUncommon.push(":thumb717157611:");
      flUncommon.push(":thumb717157645:");
      flRare.push(":thumb728748993:");
      flRare.push(":thumb717157588:");
      flRare.push(":thumb717157621:");
      flRare.push(":thumb717157664:");
      flRare.push(":thumb717157658:");
      flVeryRare.push(":thumb717157649:");
      flVeryRare.push(":thumb717157692:");
      flVeryRare.push(":thumb717157628:");
    }

    // TRCC
    if (familiars.TRCC === true && rng(100) <= 25) {
      let x = rng(100),
          bonusAmount = 0;

      if (x <= 50) {
        // 1
        bonusAmount = 1;
      } else if (x <= 80) {
        // 2
        bonusAmount = 2;
      } else if (x <= 100) {
        // 3
        bonusAmount = 3;
      }

      let output = ["Your [Tit, Robin, Cardinal, Chickadee] familiar found some plants you could raise at the Greenhouse!\n"],
          bonusList = [":thumb732448648:",":thumb732448648:",":thumb732448622:"];
      for (let i = 0; i < bonusAmount; i++) {
        output.push(randomizer(bonusList));
      }
      bonus.push(output.join(" "));
    }

    // MDWP
    if (familiars.MDWP === true) {
      let output = ":thumb711486788: x" + rngRange(5,20);
      flUncommon.push(output);
    }

    // BBS
    if (familiars.BBS === true && rng(100) <= 20) {
      let bonusAmount = 3;

      let bonusList = [":thumb711513535:",":thumb711513523:",":thumb711513530:",":thumb711513528:",":thumb716142170:",":thumb733563237:",":thumb717157642:",":thumb733563351:",":thumb733563375:",":thumb716417749:",":thumb717157664:",":thumb717157677:"],
          output = ["Your owl familiar spotted a lost satchel full of goodies! You peek inside the velvet bag to find...\n"];
      for (let i = 0; i < bonusAmount; i++) {
        output.push(randomizer(bonusList));
      }
      bonus.push(output.join(" "));
    }

    // R
    if (familiars.R === true && rng(100) <= 25) {
      let x = rng(100),
          bonusAmount = 0;

      if (x <= 50) {
        // 1
        bonusAmount = 1;
      } else if (x <= 80) {
        // 2
        bonusAmount = 2;
      } else if (x <= 100) {
        // 3
        bonusAmount = 3;
      }

      let bonusList = [":thumb716417830:",":thumb734085132:",":thumb733563375:",":thumb711513535:",":thumb716417749:",":thumb716142170:",":thumb716417784:",":thumb711513523:",":thumb711513530:",":thumb711513528:",":thumb716142179:",":thumb716142174:"],
          output = ["While you were exploring, your rabbit familiar found some plants to nibble on!\n"];
      for (let i = 0; i < bonusAmount; i++) {
        output.push(randomizer(bonusList));
      }
      bonus.push(output.join(" "));
    }

    // H
    if (familiars.H === true && rng(100) <= 25) {
      let x = rng(100),
          bonusAmount = 0;

      if (x <= 50) {
        // 1
        bonusAmount = 1;
      } else if (x <= 80) {
        // 2
        bonusAmount = 2;
      } else if (x <= 100) {
        // 3
        bonusAmount = 3;
      }

      let bonusList = [":thumb726453276:", ":thumb717157582:",":thumb726453258:",":thumb726994219:",":thumb726453240:"],
          output = ["Your hedgehog familiar happened to find some useful materials on your foraging trip!\n"];
      for (let i = 0; i < bonusAmount; i++) {
        output.push(randomizer(bonusList));
      }
      bonus.push(output.join(" "));
    }
  }

  // sanitize outputs
  function sanitize() {
    loot = loot.join(" ");
    let BSAEthumbRegex = /:thumb717157677:|:thumb717157682:|:thumb717157655:|:thumb717157576:|:thumb717157634:|:thumb717157700:|:thumb717157642:|:thumb717157675:|:thumb717157597:|:thumb717157602:|:thumb717157564:|:thumb717157572:|:thumb717157707:|:thumb717157593:|:thumb717157615:|:thumb717157669:|:thumb717157611:|:thumb717157645:|:thumb728748993:|:thumb717157588:|:thumb717157621:|:thumb717157664:|:thumb717157658:|:thumb717157649:|:thumb717157692:|:thumb717157628:/gi;
    if (loot.search(BSAEthumbRegex) !== -1) {
      let BSAEoutput = loot.match(BSAEthumbRegex).join(" ");
      loot = loot.replace(BSAEthumbRegex, "");
      let output = "Thanks to the keen eye of your [blue/steller’s/azure jay/magpie] familiar, you’ve found some gems!\n" + BSAEoutput;
      bonus.push(output);
    }
    let MDWPthumbRegex = /:thumb711486788: x(5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20)/gi;
    if (loot.search(MDWPthumbRegex) !== -1) {
      let MDWPoutput = loot.match(MDWPthumbRegex).join(" ");
      loot = loot.replace(MDWPthumbRegex, "");
      let output = "Your lucky [mourning/diamond/white dove/pigeon] familiar found some spare drachmas for you!\n" + MDWPoutput;
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
    flVeryCommon = [":thumb711486765:",":thumb711486762:",":thumb711486755:",":thumb711513523:",":thumb725781216:",":thumb716142179:",":thumb733563157:",":thumb716417749:",":thumb711513528:",":thumb733563359:",":thumb716417852:",":thumb711513535:",":thumb733563345:",":thumb724744164:",":thumb711513530:",":thumb734085144:"];
    flCommon = [":thumb733563195:",":thumb726453210:",":thumb711512539:",":thumb716417784:",":thumb716142170:",":thumb732448581:",":thumb734085132:",":thumb732448573:",":thumb732448554:",":thumb716142174:",":thumb725781296:",":thumb732448604:",":thumb711512545:",":thumb733563351:",":thumb733563276:",":thumb733563415:",":thumb733563385:"];
    flUncommon = [":thumb727209468:",":thumb735119021:",":thumb733563237:",":thumb733563183:",":thumb726994219:",":thumb726453385:",":thumb717157582:",":thumb715097318:",":thumb726994238:",":thumb735119026:",":thumb733563335:",":thumb732448622:",":thumb715097305:",":thumb732448648:",":thumb735119029:",":thumb733563375:",":thumb716417830:",":thumb715097293:"];
    flRare = [":thumb726453488:",":thumb711512533:",":thumb733563252:",familiarRoll()];
    flVeryRare = [":thumb726994265:",":thumb727211352:"];
  }


  getOptions();
  console.log(master, familiars, talismans);
  rollBonus();
  console.log(bonus);
  let rollNumber = rollAmount();
  for (let i = 0; i < rollNumber; i++) {
    rollForage();
  }
  console.log(rarityCheck);
  sanitize();
  if (loot.length === 0) {
    document.getElementById("output").innerText = "Unfortunately, " + name + " didn’t find anything of interest on your foraging trip!";
  } else {
    document.getElementById("output").innerText = name + "'s foraging trip was a success! You've brought back the following...\n" + loot + bonus;
  }
  clear();
}
