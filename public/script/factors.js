const checkboxes = document.getElementsByClassName("checkbox")
		
Array.prototype.forEach.call(checkboxes, function (checkbox) {
    addEventLis(checkbox)
})