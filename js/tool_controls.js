let ui = {
    pencil: document.getElementById("pencil"),
    poly: document.getElementById("poly"),
    brushBtnCont: document.getElementById("brushes-container"),
    brushBtn: document.getElementsByClassName("brush"),
    template: document.getElementById("template-box"),
    newBrush: document.getElementById("new-brush-btn"),
    thicknessDisplay: document.getElementById("thickness-display"),
    colorPicker: document.getElementById("color-picker"),
    thicknessInput: document.getElementById("thickness-input"),

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

//event listeners
ui.pencil.addEventListener("click", function(event) { brushTool.activeTool = "pencil" });
ui.poly.addEventListener("click", function(event) { brushTool.activeTool = "poly" });
ui.newBrush.addEventListener("click", function() { brushTool.addBrush("#ffffff", 5) });
ui.brushBtnCont.addEventListener( "click", selectBrush);
ui.colorPicker.addEventListener("change", selectColor);
ui.thicknessInput.addEventListener("input", selectThickness);

//change brush color
function selectColor(event) {
    if(brushTool.selBrush == undefined) {return}

    let color = event.target.value;
    let btn = ui.brushBtn[brushTool.selBrush];

    brushTool.brushes[brushTool.selBrush].color = color;
    btn.style.borderLeft = "4px solid " + color;
    btn.style.borderRight = "4px solid " + color;
    
    update();
}

//change brush thickness
function selectThickness(event) {
    if(brushTool.selBrush == undefined) {return}

    let thickness = event.target.value;

    brushTool.brushes[brushTool.selBrush].thickness = thickness;
    ui.thicknessDisplay.textContent = thickness;

    update();
}

//selct brush
function selectBrush(event) {
    if(event.target.getAttribute("class") != "brush") { return }

    let index = Array.from(ui.brushBtnCont.children).indexOf(event.target);

    brushTool.selBrush = index;
    brushTool.polyEnd();

    //ui changes
    ui.colorPicker.value = brushTool.brushes[brushTool.selBrush].color;

    for(i = 0 ; i < ui.brushBtn.length; i++) {
        ui.brushBtn[i].style.backgroundColor = "var(--background)";
    }

    ui.brushBtn[index].style.backgroundColor = "var(--panel)"
}

//add default brush
brushTool.addBrush("#ffffff", 5);