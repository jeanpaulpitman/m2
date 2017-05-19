/*
 CP1406/CP2010 JavaScript demonstrations using forms
 Lindsay Ward, 2007-2015, IT @ JCU
 Some code is not very meaningful (i.e. you would not want to do this from a usability point of view!),
 but you can see some interesting examples and capabilities...
 Note that much of this is more "hard-coded" than it should be. It's not "unobtrusive" JavaScript - too much JS in the HTML file, tightly-coupled.
 */

// check required fields have been set, return true/false depending on these
function checkForm() {
    var d = document.getElementById('mainForm'); // just a shortcut
    var errors = false;
    var errorMsg = "";
// basic check required fields
    if (d.name.value == "") {
        errorMsg += "Please enter your name.\n";
        errors = true;
    }
    // check if one of the radio buttons for site rating is selected
    var checkedSiteRating = false;
    for (var i = 0; i < 3; i++) {
        if (d.siterating[i].checked)
            checkedSiteRating = true;
    }
    if (!checkedSiteRating) {
        errorMsg += "Please select a site rating.\n";
        errors = true;
    }
    // if errors exist, popup error message
    if (errors)
        alert(errorMsg);
    // return true (submit form) or false (don't submit form) depending on errors
    return !errors;
}

// function for resetting the form (need to change the ticks and things back)
function resetForm() {
    var resetChoice = confirm('Reset all fields?');
    if (resetChoice) {
        console.log("Resetting form modifications.");
        // note: could do this with an array of required fields
        document.mainForm.nameTick.src = "cross.png";
        document.mainForm.nameTick.alt = "cross";
        document.mainForm.rateTick.src = 'cross.png';
        document.mainForm.rateTick.alt = 'cross';
        document.mainForm.areas.style.background = "#fff";
    }
    return resetChoice;
}


// these style-changing functions are called by the events in the input element (e.g. onFocus)
// you can change any CSS style like this
function changeStyle(element) {
    // element is the HTML element that was passed in as "this" when the function was called
    element.style.color = "#FF0000";
}

// in this example function, there are two parameters,
// the element to change and the color (a string) to change it to
function changeColor(element, color) {
    element.style.color = color;
}

// a more useful CSS changing - set field (e.g. phone number) colour to red if it's too short, green if length is OK
function setColourBasedOnLength(name, minValue) {
    var f = document.getElementById(name); // just a shortcut
    if (f.value.length >= minValue)
        f.style.color = "#0C0";
    else
        f.style.color = "#C00";

    // now just for fun - really, this is a bit stupid :)
    // set the size of the text box to the number of characters in the value
    f.size = f.value.length + 1;
    f.style.width = "auto";
}

// when name is entered, set tick image, say "hi" by writing to the page using innerHTML
// innerHTML can be useful for debugging messages, since it doesn't make a modal window like alert() does.
function nameEntered(name) {
    document.getElementById("output").innerHTML = "Hi " + name.value;
    if (name.value != "") {
        document.mainForm.nameTick.src = "tick.png";
        document.mainForm.nameTick.alt = "tick";
    }
    else {
        document.mainForm.nameTick.src = "cross.png";
        document.mainForm.nameTick.alt = "cross";
    }
}

// this checks if one of the area check boxes is selected or not
// and updates the fieldset's background colour accordingly
function checkArea() {
    var areaBoxes = document.mainForm.areaVisited;
    var checked = false;
    for (var i = 0; i < areaBoxes.length; i++) {
        if (areaBoxes[i].checked)
            checked = true;
    }
    if (checked)
        document.mainForm.areas.style.background = "#0f0";
    else
        document.mainForm.areas.style.background = "#fff";
}

// depending on first checkbox, either clear or set all check boxes
function clearArea() {
    var areaBoxes = document.mainForm.areaVisited;
    var changeTo = true;
    if (areaBoxes[0].checked)
        changeTo = false;
    for (var i = 0; i < areaBoxes.length; i++) {
        areaBoxes[i].checked = changeTo;
    }
    // call checkArea because the check boxes have changed - update the fieldset colour
    checkArea()
}

// set tick image if site rating is selected (no need to check since they can't click to deselect (see later)
function checkSiteRating() {
    document.mainForm.rateTick.src = 'tick.png';
    document.mainForm.rateTick.alt = 'tick';
}

// clear all radio buttons for rating, set cross image
function clearRating() {
    var ratingButtons = document.mainForm.siterating;
    for (var i = 0; i < ratingButtons.length; i++) {
        ratingButtons[i].checked = false;
    }
    document.mainForm.rateTick.src = 'cross.png';
    document.mainForm.rateTick.alt = 'cross';
}

// count characters in textarea and update limit on page
// if more characters than limit (parameter passed in), set value to the first limit-many characters
function updateCharacters(limit) {
    var textArea = document.mainForm.comments;
    if (textArea.value.length > limit)
        textArea.value = textArea.value.substring(0, limit);
    remaining = limit - textArea.value.length;
    document.getElementById('characters').innerHTML = "(" + remaining + " characters remaining)";
    // debugging example - write content length to the message span at the bottom:
    // document.getElementById('message').innerHTML = textArea.value.length;
}


// XMLHTTPRequest (AJAX)

// simple example, just gets contents of a resource at a given URL
// Note that we can't just get data from a different domain for security reasons
function loadXHR() {
    var xhr;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
        // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate  (4 = DONE)
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("XHRoutput").innerHTML = xhr.responseText;
        }
    };
    xhr.open("GET", "data.txt", true);
    xhr.send();
}

// An XMLHTTPRequest example that uses the value in the form field
function loadState() {
    var state = document.getElementById("state").value;
    var xhr;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
        // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate  (4 = DONE)
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("stateOutput").innerHTML = xhr.responseText;
        }
    };
    xhr.open("GET", "states.php?state="+state, true);
    xhr.send();
}

// Attach event handler to state button
document.getElementById("setStateButton").addEventListener("click", loadState);
