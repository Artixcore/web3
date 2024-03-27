// Removes properties with empty string values from an object.

const pruneEmpty = (inputObject) => {
  // Initialize an empty object to store the results.
  const resultObject = {};

  // Iterate over all properties of the input object.
  for (const key in inputObject) {
    const value = inputObject[key];

    // Check if the value is not an empty string.
    if (value !== "") {
      // If the value is not empty, add it to the result object.
      resultObject[key] = value;
    }
  }

  // Return the result object containing only non-empty values.
  return resultObject;
};

export default pruneEmpty;
