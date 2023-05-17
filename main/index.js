var storedValue;

function storeInputValue() {
  // Get the input element
  var input = document.getElementById("myInput");

  // Store the value in the global variable
  storedValue = input.value;
  useStoredValue()
}

function convertSpacesToDashes(str) {
  return str.replace(/\s+/g, "-");
}

function useStoredValue() {
    let lowerValue = storedValue.toLowerCase()
    let newValue = convertSpacesToDashes(lowerValue)
    let mydata = fetch(`https://api.open5e.com/monsters/${newValue}`)
  .then(response => response.json())
  .then(data => {
    // Access the monster list from the data
    console.log(data)
    const element = data;
    console.log(element)
        document.getElementById("demo").innerHTML = `
        <h5>${element.name}</h5>
        <h6>Alignment: ${element.alignment}</h6>
        `
    storedValue = ""
    mydata = ""
  })
  .catch(error => {
    // Handle any errors that occur during the fetch request
    console.error("Error:", error);
  });
}