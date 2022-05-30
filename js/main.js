//Bobs Burgers APi Project
// document.querySelector("button").addEventListener("click", getBurger);
class BurgerInfo {
  constructor() {
    // selects the gallery class
    this.gallerySect = document.querySelector(".gallery");

    // calls the event handler method to run as soon as the object is created
    this.eventHandler();
    this.fetchAllCharacters();
  }

  // listens for the click of the button
  eventHandler() {
    // after the button is clicked it runs the getChoice method
    document.querySelector("button").addEventListener("click", (e) => {
      this.getChoice();
    });
  }
  async fetchAllCharacters() {
    // call this as soon as the class is created to load in the characters

    // holds an array of all the characters for the show
    let allCharacters = await fetch(
      "https://bobsburgers-api.herokuapp.com/characters/"
    );
    // console.log(allCharacters);

    // formats the promise object into json form
    let allCharactersData = await allCharacters.json();
    // console.log(allCharactersData);
    // this.charactesInEpisode(allCharactersData);

    return allCharactersData;

    // this.EpisodeFromBurger(allCharacters);
  }
  async getChoice() {
    // the choice is the actual input from the user
    let theChoice = await document.querySelector("input").value;

    // the url is made by adding the user input to the end of the api call
    let url = `https://bobsburgers-api.herokuapp.com/burgerOfTheDay/${theChoice}`;

    // after the url is made it is run by the fetchBurger method to do the fetching of the data
    this.fetchBurger(url);
  }
  async fetchBurger(url) {
    // response holds the raw object promise from the fetch
    let response = await fetch(url);

    // data converts the promise object into a json which is the fetch from the user input
    let data = await response.json();
    // console.log(data);

    // calling the showBurger method in order to manipulate the promise object
    this.showBurger(data);
    this.EpisodeFromBurger(data);
  }
  async showBurger(promisedData) {
    // using the data from fetchburger can access the name using dot notation and display it when necessary
    let burgerName = await promisedData.name;
    // console.log(burgerName);
    document.querySelector(
      "h2"
    ).innerText = `The burger of the day for this episode was ${burgerName}`;
  }

  // using the data from fetchburger can access the episode url using dot notation
  async EpisodeFromBurger(epBurgerUrl) {
    // episodeUrl gets the episode url from fetchBurger
    let episodeUrl = await epBurgerUrl.episodeUrl;
    this.fetchEpisode(episodeUrl);
    return epBurgerUrl;
  }
  async fetchEpisode(e) {
    // fetch the episode using the url that was gotten from the burger of the day fetch
    let response = await fetch(e);

    // formats the episode promise into json
    let data = await response.json();
    // console.log(data);

    // call the episodeName method to get the name of the episode
    this.episodeName(data);
  }
  async episodeName(e) {
    // gets the name of the episode
    let theName = await e.name;
    // console.log(theName);

    // method to get the characters in the specific episode
    this.charactesInEpisode(theName);
  }
  async charactesInEpisode(name, characters) {
    // name is the name of the episode
    console.log(name);

    // characters are all the episodes in the show
    characters = await this.fetchAllCharacters();

    // gets the characters that are only in the user specified episode
    let episodeCharacters = await characters.filter(
      (x) => x.firstEpisode == name
    );

    // showCharacters method to display the characters into the dom
    this.showCharacters(episodeCharacters);
  }
  async showCharacters(epChar) {
    document.querySelector(".gallery").innerHTML = "";
    // console.log(this.gallerySect);
    // console.log(epChar);
    //     // THIS PUTS IT INOT THE DOM
    //     // runs through the array of images?
    //     // then creates a new section element (.createElement) that will hold the content
    //     // adds a class tag to the section of item (.classList.add)
    //     // using innerHTML to create the html that will populate the section
    //     // then using the index of the images from the array uses it to get the name and voice actor (really need to go back through and probably just grab the stuff from object at first)
    //     // using append child to put it into the dom
    //     // i am selecting gallery which is the overall container for each of the entries after the user specifies an epiode
    //     imagesOfCharactersInEpisode.map((image, index) => {
    //       const item = document.createElement("section");
    //       item.classList.add("item");
    //       item.innerHTML = `
    //       <img src = ${image}>
    //       <h3>${names[index]} first appeared in this episode voiced by ${voiceActors[index]}</h3>
    //       `;
    //       galleryDiv.appendChild(item);
    //     });
    epChar.map((x) => {
      // let filteredVoice = x.voicedBy;
      // console.log(filteredVoice);
      const item = document.createElement("section");
      item.classList.add("item");
      item.innerHTML = `
      <img src = ${x.image}>
      <h3>${x.name} first appeared in this episode voiced by ${x.voicedBy}</h3>
      `;
      this.gallerySect.appendChild(item);
    });
  }
}

let getBurger = new BurgerInfo();

// async function getBurger() {
//   try {
//     const choice = document.querySelector("input").value;
//     const url =
//       "https://bobsburgers-api.herokuapp.com/burgerOfTheDay/" + choice;

//     const galleryDiv = document.querySelector(".gallery");
//     // takes the url and does a fetch
//     let response = await fetch(url);

//     // converts the fetch promise into a json object
//     let data = await response.json();

//     // shows the whole object
//     // console.log(data);

//     // shows the name of the burger of the day
//     // console.log(`${data.name}`);

//     // shows the url of the episode that it appears in
//     // console.log(data.episodeUrl);

//     // takes the burger of the day object and uses it to do another fetch to get episode object
//     let episode = await fetch(data.episodeUrl);

//     // converts the episode object into a json
//     let episodeData = await episode.json();

//     console.log(episodeData);

//     // shows the name of the episode
//     let episodeName = await episodeData.name;
//     // console.log(episodeName);

//     // shows all of the characters for the show
//     let allCharacters = await fetch(
//       "https://bobsburgers-api.herokuapp.com/characters/"
//     );
//     // formats the characters into a json object
//     let allCharactersData = await allCharacters.json();
//     // console.log(allCharactersData);

//     // takes the array of characters and uses the firstEpisode property to get only characters who appeared in the user provided input
//     let justMyEpisode = await allCharactersData.filter(
//       (x) => x.firstEpisode == episodeName
//     );

//     // console.log(justMyEpisode);

//     // gets the names of the characters from the selected episode
//     let names = await justMyEpisode.map((x) => x.name);
//     // console.log(names);

//     // gets the voice actors of the characters from the selected episode
//     let voiceActors = await justMyEpisode.map((x) => x.voicedBy);

//     // takes the characters who are in the user provided episode and gets the image url from the array
//     let imagesOfCharactersInEpisode = await justMyEpisode.map((x) => x.image);

//     // console.log(imagesOfCharactersInEpisode);

//     // THIS PUTS IT INOT THE DOM
//     // runs through the array of images?

//     // then creates a new section element (.createElement) that will hold the content

//     // adds a class tag to the section of item (.classList.add)

//     // using innerHTML to create the html that will populate the section

//     // then using the index of the images from the array uses it to get the name and voice actor (really need to go back through and probably just grab the stuff from object at first)

//     // using append child to put it into the dom

//     // i am selecting gallery which is the overall container for each of the entries after the user specifies an epiode
//     imagesOfCharactersInEpisode.map((image, index) => {
//       const item = document.createElement("section");
//       item.classList.add("item");
//       item.innerHTML = `
//       <img src = ${image}>
//       <h3>${names[index]} first appeared in this episode voiced by ${voiceActors[index]}</h3>
//       `;
//       galleryDiv.appendChild(item);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
