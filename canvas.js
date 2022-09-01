window.addEventListener('load', ()=>
{   
    drawBackground();
    ctx.fillStyle = 'red';
    document.getElementById('copyResults').addEventListener('click', copyResults);
    document.addEventListener('mousedown', updateCoords);
})

const resultsBox = document.getElementById('results');
const can = document.getElementById('voiceRange');
const ctx = can.getContext('2d');

const isNasal = document.getElementById('isNasal');
const isRounded = document.getElementById('isRounded');

const spaceLeft = 143;
const spaceRight = 696;
const spaceTop = 132;
const spaceBottom = 521;

const realWidth = spaceRight - spaceLeft;
const realHeight = spaceBottom - spaceTop;

// const borderLeft = can.offsetLeft + spaceLeft;
// const borderRight = can.offsetLeft + spaceRight;
// const borderTop = can.offsetTop + spaceTop;
// const borderBottom = can.offsetTop + spaceBottom;

const dotRadius = 5;

// const ipaChartImg = new document.createElement('img');
// ipaChartImg.src = '/IPA_vowel_chart_2005.png'

// initialise cursor position
let coord = {x:0, y:0};
var nasalValue = isNasal.checked ? '1' : '0';
var roundedValue = isRounded.checked ? '1' : '0';
var resultCoords = '';

// draw background (IPA chart)
function drawBackground()
{
    // document.getElementById('canvasDiv').append(ipaChartImg);
    // ctx.drawImage(ipaChartImg, 0, 0);
}

// cursor position updater
function getPosition(event)
{
    coord.x = event.clientX - can.offsetLeft;
    coord.y = event.clientY - can.offsetTop;
    console.log('clicked X/Y: ' + coord.x + '/' + coord.y);
    console.log('coordinate X/Y: ' + (coord.x - spaceLeft) + '/' + (coord.y - spaceTop))
}

function updateCheckboxes()
{
    nasalValue = isNasal.checked ? '1' : '0';
    roundedValue = isRounded.checked ? '1' : '0';   
}
function updateResultsBox()
{
    updateCheckboxes();
    resultsBox.value = resultCoords + ',' + roundedValue + ',' + nasalValue;
}


function updateCoords()
{
    getPosition(event);
    updateCheckboxes();
    // console.log(isNasal.value);
    // console.log(isRounded.value);
    // update only when clicking inside the designated area
    if (coord.x >= spaceLeft && coord.x <= spaceRight && coord.y >= spaceTop && coord.y <= spaceBottom)
    {
        mappedX = (spaceRight - coord.x) / (spaceRight - spaceLeft);
        mappedY = (coord.y - spaceTop) / (spaceBottom - spaceTop);
        resultCoords = mappedX + ',' + mappedY;
        updateResultsBox();

        // clear canvas
        ctx.clearRect(0, 0, can.width, can.height);
        // draws a dot
        ctx.fillRect(coord.x - dotRadius, coord.y - dotRadius, 2*dotRadius, 2*dotRadius);   
    }

}

function copyResults()
{
    var resultsText = resultsBox;
    resultsText.focus();
    resultsText.select();

    try
    {
        var successful = document.execCommand('copy');
        var msg = successful ? 'succesful' : 'unsuccessful';
        console.log('Copy '+msg);
    } catch(err)
    {
        console.log('Some error \'append');
    }
}