function Card(index) {
	this.index = index;
	this.state = "closed";
}

Card.prototype.open = function() {
	var cell = this.getCellByIndex();
	cell[0].getElementsByClassName("cover")[0].classList.remove("transformBack");
	cell[0].getElementsByClassName("cover")[0].classList.remove("rotateYback");
	//cell[0].getElementsByClassName("cover")[0].style.display = "none";
	cell[0].getElementsByClassName("cover")[0].classList.toggle("transform");
	cell[0].getElementsByClassName("cover")[0].classList.toggle("rotateY");
	this.state = "open";
	cell[0].classList.toggle("disable-cell");
}

Card.prototype.hide = function() {
	var cell = this.getCellByIndex();
	cell[0].getElementsByClassName("cover")[0].classList.remove("rotateY");
	cell[0].getElementsByClassName("cover")[0].classList.remove("transform");
	cell[0].getElementsByClassName("cover")[0].classList.toggle("transformBack");
	cell[0].getElementsByClassName("cover")[0].classList.toggle("rotateYback");
	this.state = "closed";
	cell[0].classList.remove("disable-cell");
}

Card.prototype.setEmpty = function() {
	var cell = this.getCellByIndex();
	cell[0].getElementsByClassName("cover")[0].style.display = "none";
	cell[0].getElementsByClassName("card")[0].style.visibility = "hidden"
	cell[0].getElementsByClassName("cover")[0].classList.remove("rotateY");
	cell[0].getElementsByClassName("cover")[0].classList.remove("transform");
	cell[0].getElementsByClassName("cover")[0].classList.remove("transformBack");
	cell[0].getElementsByClassName("cover")[0].classList.remove("rotateYback");
}

Card.prototype.getCellByIndex = function() {
	var cells = document.getElementsByClassName("divTableCell");
	var cell = [].filter.call(cells, item => item.getAttribute("data-i") == this.index);
	return cell;
}

Card.prototype.getPictureName = function() {
	var cell = this.getCellByIndex();
	return cell[0].getElementsByClassName("card")[0].style.backgroundImage;
}

Card.prototype.isOpen = function() {
	var cell = this.getCellByIndex();
	console.log(cell[0].getElementsByClassName("cover")[0].style.display);
	return (cell[0].getElementsByClassName("cover")[0].style.display == "none") ? true : false;
}
