function apiRequest (jsonSendObj, returnFunction) {
  //check if the browser is not too old to use
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new window.XMLHttpRequest()
  } else {
    // code for IE6, IE5
    xmlhttp = new window.ActiveXObject('Microsoft.XMLHTTP')
  }

  xmlhttp.timeout = 2000    //increased timeout to fix timeout problem
  xmlhttp.ontimeout = function () {
    // TODO: fix the timeout problems
    console.log("Timeout ERROR!!!!!")
    alert("TIMEOUT ERROR\nPlease try again!")
  }

  xmlhttp.onreadystatechange = function () {
    //is the xmlhttp request finished (readyState === 4)
    //and the HTTP status code is "successful reqest"
    if (this.readyState === 4 && this.status === 200) {
      //checks if the return is valid JSON

      if (isJSON(this.responseText)) {
        //create an object from the input string
        var jsonReturnObj = JSON.parse(this.responseText)
        //the %c is correct ... it tells that the first included variable will be css
        //(the color: green part)
        console.log('%cRETURN: ', 'color: green', jsonReturnObj)

        returnFunction(jsonReturnObj)
      } else {
        console.log('%cERROR during JSON parse: ', 'color:red', 'Not a valid JSON string: ')
        console.log({'error': this.responseText})
      }
    }
  }


  /* ----- converts js obj to JSON encoded string ----- */
  var jsonSendStr = JSON.stringify(jsonSendObj)

  /* ----- send JSON encoded string ----- */
  //is input a valid JSON string
  if (isJSON(jsonSendStr)) {
    //creates a xmlhttp request
    xmlhttp.open('POST', "api", true)
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xmlhttp.send(jsonSendStr)
    console.log('%cSEND: ', 'color: blue', jsonSendObj)
  } else {
    console.log('%cERROR while sending: ', 'color:red', 'Not a valid JSON string: ')
    console.log({'error': jsonSendStr})
  }
}

/**
 * Checks if code is valid json code
 * I can't explain this. This is (nearly) the full original code copied from some library
 * @param  {JSON string}    str
 * @return {Boolean}        Is valid json
 */
function isJSON (str) {
  //is variable empty
  if (str) {
    if (/^\s*$/.test(str)) {
      return false
    }
    str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@') //eslint-disable-line
    str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']') //eslint-disable-line
    str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '')
    return (/^[\],:{}\s]*$/).test(str)
  }
}
