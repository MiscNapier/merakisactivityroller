/* jshint esversion: 6 */

// moved seasons/pageload to seperate script due to load order issues

function getSeason() {
  let check = new Date();
      date = {
        month: check.getMonth(),
        day: check.getDay()
      };
    season = "";

  if (date.month >= 2 && date.month <= 4) {
    season = "spring";
  } else if (date.month >= 5 && date.month <= 7) {
    season = "summer";
  } else if (date.month >= 8 && date.month <= 10) {
    season = "fall";
  } else if (date.month === 11 || date.month <= 1 ) {
    season = "winter";
  }

  // console.log(season);
  return season;
}

function pageLoad() {
  // theme CSS
  let season = getSeason();
  // season = "spring";

  if (season === "spring" || season === "summer") {
    document.documentElement.style.setProperty('--bg-colour', 'rgba(227, 250, 175, 1)');
    document.body.style.backgroundImage = "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/92c18f68-8940-419b-ae8a-86ea7540f4fc/dc5207t-bb4b3859-0afa-4419-b8e9-363eb4903faa.png/v1/fill/w_1024,h_512,q_80,strp/cat_forest___green_by_merakislore_dc5207t-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTEyIiwicGF0aCI6IlwvZlwvOTJjMThmNjgtODk0MC00MTliLWFlOGEtODZlYTc1NDBmNGZjXC9kYzUyMDd0LWJiNGIzODU5LTBhZmEtNDQxOS1iOGU5LTM2M2ViNDkwM2ZhYS5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.zHq2SyF95LWXYPw8E7VOFb_hN3YJ0r-IOl1tvqZpy0A')";
    document.documentElement.style.setProperty('--font-colour', 'rgba(227, 250, 175, 1)');
    // document.documentElement.style.setProperty('--hr-colour', 'rgba(227, 250, 175, .25)');
    document.documentElement.style.setProperty('--fontPill-colour', 'rgba(227, 250, 175, .25)');
    document.documentElement.style.setProperty('--button-colour', 'rgba(27, 36, 17, 1)');
    document.documentElement.style.setProperty('--box-colour', 'rgba(27, 36, 17, .75)');
  } else if (season === "fall") {
    document.body.style.backgroundImage = "url('https://bit.ly/2oeGUfA')";
  } else if (season === "winter") {
    document.documentElement.style.setProperty('--bg-colour', 'rgba(204, 215, 255, 1)');
    document.body.style.backgroundImage = "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/92c18f68-8940-419b-ae8a-86ea7540f4fc/dbuquns-ad0fcdfc-c46d-49d2-85fb-ed925968f643.jpg/v1/fill/w_1024,h_512,q_75,strp/wintercatshooo_by_kepzone_dbuq7bg_by_merakislore_dbuquns-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTEyIiwicGF0aCI6IlwvZlwvOTJjMThmNjgtODk0MC00MTliLWFlOGEtODZlYTc1NDBmNGZjXC9kYnVxdW5zLWFkMGZjZGZjLWM0NmQtNDlkMi04NWZiLWVkOTI1OTY4ZjY0My5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.bfOogQTlhrwgvhezWFtzIGmHcoY31_vHgXkjT0CSEI8')";
    document.documentElement.style.setProperty('--font-colour', 'rgba(204, 215, 255, 1)');
    // document.documentElement.style.setProperty('--hr-colour', 'rgba(204, 215, 255, .25)');
    document.documentElement.style.setProperty('--fontPill-colour', 'rgba(204, 215, 255, .25)');
    document.documentElement.style.setProperty('--button-colour', 'rgba(31, 32, 69, 1)');
    document.documentElement.style.setProperty('--box-colour', 'rgba(31, 32, 69, .75)');
  }
}
