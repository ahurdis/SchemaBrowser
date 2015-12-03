function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("Text", ev.target.innerHTML);
}

function drop(ev, canvasManager) {
	ev.preventDefault();
	var vertexName = ev.dataTransfer.getData("Text");
	canvasManager.AddVertex(vertexName, ev);
}
