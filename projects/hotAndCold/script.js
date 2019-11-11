// Get the canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Full screen dimensions
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

// Set canvas dimensions
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Get a random number within a range
function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// The target and the finder will both have x and y coordinates, so we define a class
class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    // A function to calculate the distance between two points
    static distance(a, b){
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.hypot(dx, dy);
    }    
}

// The finder needs additional functionality so we extend the point class
class Finder extends Point{
    constructor(x, y, direction, pace){
        super(x, y);
        this.direction = direction;
        this.pace = pace;
    }

    // Directions in which the finder can move
    static possibilities = ["NE", "NW", "SW", "SE"];

    // Function to move the finder
    move(){
        switch (this.direction) {
            case "NE":
                // NE means smaller y and greater x
                this.x = random(this.x, this.x + this.pace);
                this.y = random(this.y - this.pace, this.y);
                break;

            case "NW":
                // NW means smaller y and smaller x
                this.x = random(this.x - this.pace, this.x);
                this.y = random(this.y - this.pace, this.y);
                break;

            case "SW":
                // SW means greater y and smaller x
                this.x = random(this.x - this.pace, this.x);
                this.y = random(this.y, this.y + this.pace);
                break;

            case "SE":
                // SE means greater y and greater x
                this.x = random(this.x, this.x + this.pace);
                this.y = random(this.y, this.y + this.pace);
                break;
        
            default:
                break;
        }

        // Return the new coordinates
        return [this.x, this.y];
    }

    // Find out if you're getting closer
    hotter(){
        // We are going in the right direction, pick up the pace
        this.pace += 1;
    }

    // Or maybe you're getting colder
    colder(){
        // We are going the wrong way, we need to change direction, and slow down the pace
        this.direction = Finder.possibilities[(Finder.possibilities.indexOf(this.direction) + 1) % 4];
        if(this.pace >= 2){
            this.pace = Math.round(this.pace / 2);
        }
    }
}

// Instantiate the target and the finder with random values
var target = new Point(random(0, canvasWidth), random(0, canvasHeight));
var finder = new Finder(random(0, canvasWidth), random(0, canvasHeight), Finder.possibilities[random(0, 3)], random(2, 10));

// Calculate the distance between the target and the finder
var distance = Point.distance(target, finder);

// Draw the target
ctx.beginPath();
ctx.arc(target.x, target.y, 10, 0, 2 * Math.PI);
ctx.moveTo(target.x - 10, target.y);
ctx.lineTo(target.x + 10, target.y);
ctx.moveTo(target.x, target.y - 10);
ctx.lineTo(target.x, target.y + 10);
ctx.stroke();

// How many times per second will the finder move
var speed = 5;

// The finder moves at a certain speed, to implement this we need a variable that keeps track of time
var i = 0;

// Draw loop
function drawLoop() {
    // If 60/speed frames have passed, we need to move the finder
    if(++i % (60/speed) == 0){
        var newDistance = drawFinderMovement();
    }

    // If we found the target then stop
    if (newDistance <= 10) {
        // Redraw the target
        ctx.beginPath();
        ctx.arc(target.x, target.y, 10, 0, 2 * Math.PI);
        ctx.moveTo(target.x - 10, target.y);
        ctx.lineTo(target.x + 10, target.y);
        ctx.moveTo(target.x, target.y - 10);
        ctx.lineTo(target.x, target.y + 10);        
        ctx.strokeStyle = "#a83266";
        ctx.stroke();
        // Stop the animation
        cancelAnimationFrame(animationId);
    }else{
        // If not then draw a new frame
        requestAnimationFrame(drawLoop);
    }
}

// Draw the finder's movements
function drawFinderMovement(){
    // First get the current coordinates
    var oldX = finder.x;
    var oldY = finder.y;
    // Move the finder and get the coordinates
    var [newX, newY] = finder.move();

    // Draw finder path
    ctx.beginPath();
    ctx.moveTo(oldX, oldY);
    ctx.lineTo(newX, newY);
    ctx.strokeStyle = "#a83266";
    ctx.stroke();

    // Draw the finder
    ctx.beginPath();
    ctx.arc(finder.x, finder.y, 2, 0, 2 * Math.PI);
    ctx.fillStyle = "#a83266";
    ctx.fill();

    // Again calculate the distance between the target and the finder
    var newDistance = Point.distance(target, finder);
    
    // Notify the finder of their progress
    if(newDistance >= distance){
        finder.colder();
        distance = newDistance;
    }else{
        finder.hotter();
        distance = newDistance;
    }

    // Return the new distance
    return newDistance;
}

// Draw on the screen
var animationId = requestAnimationFrame(drawLoop);