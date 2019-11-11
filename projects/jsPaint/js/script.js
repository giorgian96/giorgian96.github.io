/**
 * Created by George on 13-Apr-17.
 */
var isDown = false;
var mousePosition;
var lastPosition;
var offset = [0,0];
var dragBox = document.querySelector('h1');
var toolBox = document.querySelector('#toolbox');
var inputs = document.querySelectorAll('input');

var selectedTool = 'brush';
var brushSize = 1;
var brushColor = '#000';

function randomPointInRadius(radius) {
    var x = Math.random() * 2 - 1;
    var y = Math.random() * 2 - 1;
    if (x * x + y * y <= 1){
        return {x: x * radius, y: y * radius};
    }
}

var handlers = {
    mouseDown:function (e) {
        isDown = true;
        offset = [
            toolBox.offsetLeft - e.clientX,
            toolBox.offsetTop - e.clientY
        ];
    },
    mouseMove:function(e){
        if(isDown){
            mousePosition = {
                x : e.clientX,
                y : e.clientY
            };
            toolBox.style.left = (mousePosition.x + offset[0]) + 'px';
            toolBox.style.top = (mousePosition.y + offset[1]) + 'px';
        }
    },
    mouseUp:function () {
        isDown = false;
    },
    selectTool:function (e) {
        switch (e.target.id){
            case 'brush':
                selectedTool = 'brush';
                break;
            case 'spray':
                selectedTool = 'spray';
                break;
            case 'text':
                selectedTool = 'text';
                break;
            case 'fill':
                selectedTool = 'fill';
                break;
            case 'eraser':
                selectedTool = 'eraser';
                break;
        }
    },
    startDrawing:function(e){
        isDown = true;
        lastPosition = {
            x : e.clientX - canvas.offsetLeft,
            y : e.clientY - canvas.offsetTop
        };
        if(selectedTool === 'text'){
            var text = prompt("Text: ", "");
            if(text){
                context.strokeStyle = brushColor;
                context.lineWidth = brushSize;
                context.font = Math.max(10,context.lineWidth) + "px Concert One";
                context.fillText(text,lastPosition.x,lastPosition.y);
            }
        }
    },
    drawing:function(e){
        if(isDown){
            mousePosition = {
                x : e.clientX - canvas.offsetLeft,
                y : e.clientY - canvas.offsetTop
            };
            context.lineCap = 'round';
            context.strokeStyle = brushColor;
            context.fillStyle = brushColor;
            context.lineWidth = brushSize;
            switch(selectedTool){
                case 'brush':
                    context.beginPath();
                    context.moveTo(lastPosition.x,lastPosition.y);
                    context.lineTo(mousePosition.x,mousePosition.y);
                    context.stroke();
                    lastPosition = {
                        x : e.clientX - canvas.offsetLeft,
                        y : e.clientY - canvas.offsetTop
                    };
                    break;
                case 'spray':
                    var radius = context.lineWidth / 2;
                    var area = radius * radius * Math.PI;
                    var dotsPerTick = Math.ceil(area / 30);
                    var spray = setInterval(function() {
                        for (var i = 0; i < dotsPerTick; i++) {
                            var offset = randomPointInRadius(radius);
                            context.fillRect(mousePosition.x + offset.x,
                                mousePosition.y + offset.y, 1, 1);
                        }
                    }, 25);
                    this.addEventListener('mouseup',function () {
                        clearInterval(spray);
                    });
                    break;
                case 'eraser':
                    context.beginPath();
                    context.strokeStyle = '#fff';
                    context.fillStyle = '#fff';
                    context.moveTo(lastPosition.x,lastPosition.y);
                    context.lineTo(mousePosition.x,mousePosition.y);
                    context.stroke();
                    lastPosition = {
                        x : e.clientX - canvas.offsetLeft,
                        y : e.clientY - canvas.offsetTop
                    };
                    break;
            }
        }
    }
};

dragBox.addEventListener('mousedown',handlers.mouseDown);
dragBox.addEventListener('mousemove',handlers.mouseMove);
dragBox.addEventListener('mouseup',handlers.mouseUp);

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

toolBox.addEventListener('click',handlers.selectTool);
inputs[0].addEventListener('change',function(){
    brushSize = inputs[0].value;
});
inputs[1].addEventListener('change',function(){
    brushColor = inputs[1].value;
});

canvas.addEventListener('mousedown',handlers.startDrawing);
canvas.addEventListener('mousemove',handlers.drawing);
canvas.addEventListener('mouseup',handlers.mouseUp);

//ca sa fiu sigur ca se apeleaza mouseup
document.addEventListener('mouseup',handlers.mouseUp);

