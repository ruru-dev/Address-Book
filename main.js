/**
 * This function will fetch data for a random user from the randomuser API.
 * 
 * Declare this function as async because it will halt execution while waiting for the Promise
 * returned by the fetch() function to resolve.
 */
async function getUserInfo() {
  // Perform the fetch to the randomuser API - get a single random user
  const response = await fetch("https://randomuser.me/api/");

  // Parse the response - this function also returns a Promise by default in Javascript
  const jsonData = await response.json();

  // An async function will always return a Promise. Once that Promise resolves it will provide the value we return here.
  return jsonData;
}

// Alternative way to fetch this API syntactically.
// fetch("https://randomuser.me/api/")
//   .then((response) => {
//     const jsonData = response.json();
//     return jsonData;
// });

/**
 * This function will fetch data for the specifed number of random users from the randomuser API.
 * 
 * Declare this function as async because it will halt execution while waiting for the Promise
 * returned by the fetch() function to resolve.
 */
async function getMultipleUserInfo(numUsers) {
  // Perform the fetch to the randomuser API - specify the number of users as a query parameter.
  const response = await fetch(`https://randomuser.me/api/?results=${numUsers}`);

  // Parse the response - this function also returns a Promise by default in Javascript
  const jsonData = await response.json();

  // An async function will always return a Promise. Once that Promise resolves it will provide the value we return here.
  return jsonData;
}

/**
 * This is a global variable which will hold our list persons.
 */
let personData = [];

/**
 * This function will populate our personData array with random user info.
 * 
 * Declare this function as async because it will halt execution while waiting for the Promise
 * returned by getUserInfo() to resolve.
 */
async function addPersonDataToArray() {
  // // Add a new person each time we loop (in this case we arbitrarily chose 8)
  // for (let i=0; i<8; i++) {
  //   // Use the await keyword since it's an aysnc function and we don't want to proceed until we have the data we need.
  //   let userData = await getUserInfo();

  //   // Access the data we need from the API's response object and add it to the personData array.
  //   personData.push(userData.results[0]);
  // };


  // Since we are fetching multiple users in a single request, just set personData to the array from the API response object.
  const userData = await getMultipleUserInfo(8);
  personData = userData.results;
}

/**
 * This function will generate the html for an individual person in our list of addresses.
 */
const displayUser = (person, i) => {
  // create an li element to represent the person in the address list
  const li = document.createElement('li');
  li.id = `person-${i}`;

  // create an img element for that person
  const userPicture = person.picture.thumbnail;
  const imgEl = document.createElement('img')
  imgEl.src = userPicture;
  li.appendChild(imgEl);

  const userName = person.name.first;
  const userNameText = document.createTextNode(userName);
  li.append(userNameText);
  
  const buttonEl = document.createElement('button');
  buttonEl.innerText = "Show Info";
  buttonEl.setAttribute("onclick",`showInfo('${li.id}', '${JSON.stringify(person)}')`);
  li.append(buttonEl);

  // find the address-list ul and append the li we just created with the user's info
  const addressListEl = document.getElementById('address-list');
  addressListEl.appendChild(li);
}

/**
 * This functon will show additional information about the user when the Show Info button is clicked.
 */
const showInfo = (id, person) => {
  const li = document.getElementById(id);
  const personInfo = document.createTextNode(person);
  li.appendChild(personInfo);
}

/**
 * This is the main function which will display the complete list of addresses.
 */
const displayAddressList = async () => {
  // Use the await keyword since this is an aysnc function and we don't want to proceed until we have the data we need.
  await addPersonDataToArray();

  // loop through the personData array and display each person's username and picture
  let i = 0;
  for(person of personData) {
    displayUser(person, i++);
  }
}

displayAddressList();

