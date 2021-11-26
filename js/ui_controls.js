let ui = {
    //elements
    pencil: document.getElementById("pencil"),
    poly: document.getElementById("poly"),
    waypoint: document.getElementById("waypoint"),
    brushBtnCont: document.getElementById("brushes-container"),
    brushBtn: document.getElementsByClassName("brush"),
    template: document.getElementById("template-box"),
    newBrush: document.getElementById("new-brush-btn"),
    thicknessDisplay: document.getElementById("thickness-display"),
    colorPicker: document.getElementById("color-picker"),
    thicknessInput: document.getElementById("thickness-input"),
    waypointTemplate: document.getElementById("waypoint-template").content,
    waypointContainer: document.getElementById("waypoint-container"),

    //methods
    addBrushBtn: function addBrushBtn(color) {
        let btn = document.createElement('button');
        ui.brushBtnCont.appendChild(btn);
    
        btn.setAttribute("class", "brush");
        btn.innerText = "Brush";
        btn.style.borderLeft = "4px solid " + color;
        btn.style.borderRight = "4px solid " + color;
    
        ui.brushBtnCont.normalize();
    },
}

//ev listeners
ui.pencil.addEventListener("click", function(ev) { tool.selTool = pencil });
ui.poly.addEventListener("click", function(ev) { tool.selTool = poly });
ui.waypoint.addEventListener("click", function(ev) { tool.selTool = waypoint });
ui.newBrush.addEventListener("click", function() { tool.brush.addBrush("#ffffff", 5) });
ui.brushBtnCont.addEventListener( "click", selectBrush);
ui.colorPicker.addEventListener("change", selectColor);
ui.thicknessInput.addEventListener("input", selectThickness);

//change brush color
function selectColor(ev) {
    if(tool.brush.selBrush == undefined) {return}

    let color = ev.target.value;
    let btn = ui.brushBtn[tool.brush.selBrush];

    tool.brush.brushes[tool.brush.selBrush].color = color;
    btn.style.borderLeft = "4px solid " + color;
    btn.style.borderRight = "4px solid " + color;
    
    update();
}

//change brush thickness
function selectThickness(ev) {
    if(tool.brush.selBrush == undefined) {return}

    let thickness = ev.target.value;

    tool.brush.brushes[tool.brush.selBrush].thickness = thickness;
    ui.thicknessDisplay.textContent = thickness;

    update();
}

//selct brush
function selectBrush(ev) {
    if(ev.target.getAttribute("class") != "brush") { return }

    let index = Array.from(ui.brushBtnCont.children).indexOf(ev.target);

    tool.brush.selBrush = index;
    tool.toolActive = false;

    //ui changes
    ui.colorPicker.value = tool.brush.brushes[tool.brush.selBrush].color;
    ui.thicknessInput.value = tool.brush.brushes[tool.brush.selBrush].thickness;
    ui.thicknessDisplay.textContent = tool.brush.brushes[tool.brush.selBrush].thickness;

    //change button color
    for(i = 0 ; i < ui.brushBtn.length; i++) {
        ui.brushBtn[i].style.backgroundColor = "var(--background)";
    }
    ui.brushBtn[index].style.backgroundColor = "var(--panel)"

}

//add default brush
tool.brush.addBrush("#ffffff", 5);