/*
This nice particle effect was build by @superguigui
check it out at http://codepen.io/superguigui/
 */

var c   = document.createElement('canvas');
var ctx = c.getContext("2d");

document.body.appendChild(c);

window.onresize = resize;
window.addEventListener('mousemove', onMouseMove);

/*-----------------------*/

var dots = [];
var colW = 70;
var lineH = 54;
var nbCols;
var nbLines;
var nbDots;
var mouse = {x: window.innerWidth * 0.5, y: window.innerHeight * 0.5};
var action = {x: window.innerWidth * 0.5, y: window.innerHeight * 0.5};
var zoneRadius;
var zoneStep = 100;

function start(){
    draw();
}

var Dot = function(x, y){
    this.x = x;
    this.y = y;
    this.ax = x;
    this.ay = y;
};

function resize(){
    var w = window.innerWidth;
    var h = window.innerHeight;
    c.width = w;
    c.height = h;
    zoneRadius = c.width * 0.2;
    createDots();
}

function onMouseMove(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

function createDots(){
	var w      = c.width;
	var h      = c.height;
	var decalX = -17;
	var decalY = -10;
	nbCols     = ~~(w / colW) + 2;
	nbLines    = ~~(h / lineH) + 2;
	nbDots     = nbCols * nbLines;
	dots       = [];

    for(var i = 0; i < nbLines; i++) {
        for(var j = 0; j < nbCols; j++) {
            dots.push(new Dot(decalX + j * colW, decalY + i * lineH));
        }
    }
}

function drawDots(anchors, color, radius){
    var dot, dist;
    for(var i = 0; i < nbDots; i++) {
        dot = dots[i];
        dist = getDistance(dot, action);
        ctx.globalAlpha = Math.max(1 - (dist / (zoneRadius * 1.2)), 0);
        ctx.beginPath();
        if(anchors) {
            ctx.moveTo(dot.ax, dot.ay);
            ctx.arc( dot.ax, dot.ay, radius, 0, Math.PI * 2, true);
        }
        else {
            ctx.moveTo(dot.x, dot.y);
            ctx.arc( dot.x, dot.y, radius, 0, Math.PI * 2, true);            
        }
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }
}

function drawLines(color){
    var dot, nextDot, col, line, dist;
    for(var i = 0; i < nbDots; i++) {
        line = ~~(i / nbCols);
        col = i % nbCols;
        
        dot = dots[i];
        dist = getDistance(dot, action);
        ctx.globalAlpha = Math.max(1 - (dist / (zoneRadius * 1.2)), 0.05);
        ctx.beginPath();
        if(line < (nbLines - 1)){
            nextDot = dots[i + nbCols];
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(nextDot.x, nextDot.y);
        }
        if(col < (nbCols - 1)) {
            nextDot = dots[i + 1];
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(nextDot.x, nextDot.y);
        }
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}

function drawJoints(color){
    var dot, dist;
    for(var i = 0; i < nbDots; i++) {
        dot = dots[i];
        dist = getDistance(dot, action);
        ctx.globalAlpha = Math.max(1 - (dist / (zoneRadius * 1.2)), 0.05);
        ctx.beginPath();
        
        ctx.moveTo(dot.x, dot.y);
        ctx.lineTo(dot.ax, dot.ay);
        
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}

function getDistance(dot1, dot2) {
    return Math.sqrt((dot2.x - dot1.x) * (dot2.x - dot1.x) + (dot2.y - dot1.y) * (dot2.y - dot1.y));
}

function moveDots() {
    var dot, dist, angle;
    for(var i = 0; i < nbDots; i++) {
        dot = dots[i];
        angle = -Math.atan2(action.x - dot.ax, action.y - dot.ay) - (Math.PI * 0.5);
        dist = getDistance(dot, action);
        
        if(dist <= zoneRadius) {
            dot.x = dot.ax + zoneStep * (1 - (dist / zoneRadius)) * Math.cos(angle);
            dot.y = dot.ay + zoneStep * (1 - (dist / zoneRadius)) * Math.sin(angle);
        } 
        else {
            dot.x = dot.ax;
            dot.y = dot.ay;
        }
    }
}

function draw(){
    requestAnimationFrame(draw);
    render();
}

function render(){
    ctx.clearRect(0, 0, c.width, c.height);
    
    action.x += (mouse.x - action.x) * 0.07;
    action.y += (mouse.y - action.y) * 0.07;

    moveDots();
    
    drawLines("#666");
    drawJoints("#555555");
    
    drawDots(true, "#18a497", 1);
}

resize();
start();