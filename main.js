document.addEventListener('DOMContentLoaded', main, false);

function main() {

    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.querySelector("svg");
    var polyLine = document.createElementNS(svgNS, "polyline");
    polyLine.setAttribute("fill", "none");
    polyLine.setAttribute("stroke", "black");    
    polyLine.setAttribute("stroke-width", "1");    
    polyLine.setAttribute("shape-rendering", "optimizeQuality");    
    var points = quadraticCoordinates(50, 10).map(({x, y}) => `${x},${y}`).join(" ");
    polyLine.setAttribute("points", points);    
    svg.append(polyLine);

    requestAnimationFrame(animate);

    var counter = 0, direction = 1;

    function animate() {
        var points = quadraticCoordinates(50, 10 + counter).map(({x, y}) => `${x},${y}`).join(" ");
        polyLine.setAttribute("points", points);    

        counter += direction;
        if (counter > 20 || counter < 0) {
            direction *= -1;            
        }
        requestAnimationFrame(animate);
    }
}

function quadraticCoordinates(mu, sigma) {

    var result = [];
    var stepsize = 0.2;

    for (let i = 0; i < 100; i += stepsize) {
        result.push({
            x: i,
            y: normalDensity(i, mu, sigma) * 600 + 10
        })
    }

    return result;
}

function normalDensity(x, mu, sigma) {

    return (1/Math.sqrt(2 * Math.PI * sigma * sigma)) * Math.pow(Math.E, -Math.pow(x-mu, 2)/(2*sigma*sigma) )
}