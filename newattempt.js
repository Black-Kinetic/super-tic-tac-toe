//Variables and DOM Selection
let sBox = document.querySelectorAll(".box");
let mBox = document.querySelectorAll(".smalltable");
let bBox = document.querySelectorAll(".bigbox");
let tBox = document.querySelectorAll(".tablediv");
let restartBtn = document.querySelector('#restart-btn');

var turnO = true;
var state = 0;
var ones,tens,newOnes,newTens,ones3,tens3,mWinSet=[];

//Custom Cursor
var cursor = document.createElement('div');
cursor.style.position = 'absolute';
cursor.style.pointerEvents = 'none';
cursor.style.transform = 'translate(-50%, -50%)';
cursor.style.zIndex = '1000';
cursor.id = 'custom-cursor';
cursor.style.color = 'white';
    cursor.style.fontSize = '33px';
    cursor.style.fontFamily = "Comic Sans MS, Comic Sans, cursive";
document.body.appendChild(cursor);

// Update the cursor position whenever the mouse moves
document.addEventListener('mousemove', function (e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

//Cursor Update Function
function kursor(C, box) {
    // Update the cursor's inner text
    cursor.innerText = C;
      
    // Update the cursor's visibility and box's cursor style
    if (C == 'O' || C == 'X') {
        box.style.cursor = "none";
        cursor.style.display = 'block';
    } else {
        box.style.cursor = "not-allowed";
        cursor.style.display = 'none';
    }
}


// Function to draw an arrow
function drawArrow(startX, startY, endX, endY) {
    const svg = document.getElementById('arrow-svg');
    svg.innerHTML = ''; // Clear any existing arrow

    // Calculate the arrow angle
    const angle = Math.atan2(endY - startY, endX - startX);

    // Create the main line of the arrow
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', startX);
    line.setAttribute('y1', startY);
    line.setAttribute('x2', endX);
    line.setAttribute('y2', endY);
    line.setAttribute('stroke', 'blue');
    line.setAttribute('stroke-width', '5');

    // Create the arrowhead
    const arrowHead = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const arrowSize = 40; // Size of the arrowhead
    const arrowPoint1 = [endX - arrowSize * Math.cos(angle - Math.PI / 6), endY - arrowSize * Math.sin(angle - Math.PI / 6)];
    const arrowPoint2 = [endX - arrowSize * Math.cos(angle + Math.PI / 6), endY - arrowSize * Math.sin(angle + Math.PI / 6)];
    arrowHead.setAttribute('points', `${endX},${endY} ${arrowPoint1.join(',')} ${arrowPoint2.join(',')}`);
    arrowHead.setAttribute('fill', 'blue');

    svg.appendChild(line);
    svg.appendChild(arrowHead);
}
function drawMultipleArrow(startX, startY, endX, endY) {
    const svg = document.getElementById('arrow-svg');
    

    // Calculate the arrow angle
    const angle = Math.atan2(endY - startY, endX - startX);

    // Create the main line of the arrow
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', startX);
    line.setAttribute('y1', startY);
    line.setAttribute('x2', endX);
    line.setAttribute('y2', endY);
    line.setAttribute('stroke', 'blue');
    line.setAttribute('stroke-width', '5');

    // Create the arrowhead
    const arrowHead = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const arrowSize = 40; // Size of the arrowhead
    const arrowPoint1 = [endX - arrowSize * Math.cos(angle - Math.PI / 6), endY - arrowSize * Math.sin(angle - Math.PI / 6)];
    const arrowPoint2 = [endX - arrowSize * Math.cos(angle + Math.PI / 6), endY - arrowSize * Math.sin(angle + Math.PI / 6)];
    arrowHead.setAttribute('points', `${endX},${endY} ${arrowPoint1.join(',')} ${arrowPoint2.join(',')}`);
    arrowHead.setAttribute('fill', 'blue');

    svg.appendChild(line);
    svg.appendChild(arrowHead);
}

// Function to update the arrow based on sBox and mBox positions
function updateArrow(sBox, mBox) {
    const sBoxRect = sBox.getBoundingClientRect();
    const mBoxRect = mBox.getBoundingClientRect();

    // Calculate the center of sBox
    const startX = sBoxRect.left + sBoxRect.width / 2;
    const startY = sBoxRect.top + sBoxRect.height / 2;

    // Calculate the center of mBox
    const endX = mBoxRect.left + mBoxRect.width / 2;
    const endY = mBoxRect.top + mBoxRect.height / 2;

    drawArrow(startX, startY, endX, endY);
}
function UpdateArrow(sBox, mBox){
    const sBoxRect = sBox.getBoundingClientRect();
    const mBoxRect = mBox.getBoundingClientRect();

    // Calculate the center of sBox
    const startX = sBoxRect.left + sBoxRect.width / 2;
    const startY = sBoxRect.top + sBoxRect.height / 2;

    // Calculate the center of mBox
    const endX = mBoxRect.left + mBoxRect.width / 2;
    const endY = mBoxRect.top + mBoxRect.height / 2;

    drawMultipleArrow(startX, startY, endX, endY);
}



//Hover Effects for Middle-sized-Boxes
mBox.forEach(mbox => 
{
mbox.addEventListener("mouseover", () => 
{
    if (state == 0) {
        kursor(turnO ? 'O' : 'X', mbox);
        mbox.style.background = "blue";
        mbox.style.border = "5px solid blue";
    }

    if (mbox.id == ones && state==1) {    
        kursor(turnO ? 'O' : 'X', mbox);
    }

    if(state == 2 && mWinSet.includes(parseInt(mbox.id))){
        
        kursor('',mbox);
    }
    if(state == 2 && !(mWinSet.includes(parseInt(mbox.id)))){
        
        kursor(turnO ? 'O' : 'X', mbox);
        mbox.style.background = "blue";
        mbox.style.border = "5px solid blue";
    }
})

//Hover Effects for Small Boxes
mbox.addEventListener("mouseout", () => 
{
    if (state == 0) {
        kursor('', mbox);
        mbox.style.background = "white";
        mbox.style.border = "5px solid white";
    }

    if (mbox.id == ones && state==1) {    
        kursor('', mbox);
    }

    if(state == 2 && !(mWinSet.includes(parseInt(mbox.id)))){
        kursor('', mbox);
        mbox.style.background = "white";
        mbox.style.border = "5px solid white";
    }        
    

})
})
sBox.forEach(sbox => 
{
sbox.addEventListener("mouseover", () => 
{    
    if (state == 0) 
    {
        kursor(turnO ? 'O' : 'X', sbox);
        sBox.forEach(sbox4 => 
            {
            if(sbox4.id%10==5&&Math.floor(parseInt(sbox4.id) / 10)==sbox.id%10)
                updateArrow(sbox, sbox4);
            })
        sbox.style.background = "#2B0233";//darkpurple;
        sbox.style.border = "5px solid #2B0233";//darkpurple;          
    }

    if (state==1) 
    {
        newOnes = sbox.id % 10;
        newTens = (sbox.id - newOnes) / 10;
        if (newTens == ones) 
        {
        sbox.disabled=(sbox.innerText=="")?false:true; 
        kursor(turnO&&!sbox.disabled? 'O' : 'X', sbox);
        if(sbox.disabled){
            kursor('', sbox);
        }
        sbox.style.background = "#2B0233";//darkpurple;
        sbox.style.border = "5px solid #2B0233";//darkpurple;
        sBox.forEach(sbox5 => 
            {
            if(sbox5.id%10==5&&Math.floor(parseInt(sbox5.id) / 10)==sbox.id%10&&!mWinSet.includes(sbox.id%10)&&!sbox.disabled)
                updateArrow(sbox, sbox5);
            if(mWinSet.includes(sbox.id%10)&&!sbox.disabled)
               {
                if(sbox5.id%10==5 && !mWinSet.includes(Math.floor(sbox5.id/10)))
                {
                    UpdateArrow(sbox, sbox5);
                }



               } 
            })
        }
    }
    if(state == 2 && mWinSet.includes(Math.floor(parseInt(sbox.id) / 10))){
        kursor('',sbox);
    }
    if(state == 2 && !(mWinSet.includes(Math.floor(parseInt(sbox.id) / 10)))){
            if (sbox.disabled) return;
            sBox.forEach(sbox5 => 
                {
                if(sbox5.id%10==5&&Math.floor(parseInt(sbox5.id) / 10)==sbox.id%10&&!mWinSet.includes(sbox.id%10)&&!sbox.disabled)
                    updateArrow(sbox, sbox5);
                if(mWinSet.includes(sbox.id%10)&&!sbox.disabled)
                    {
                     if(sbox5.id%10==5 && !mWinSet.includes(Math.floor(sbox5.id/10)))
                     {
                        UpdateArrow(sbox, sbox5);
                     }
                    }
                })
            kursor(turnO ? 'O' : 'X', sbox);
            sbox.style.background = "#2B0233";//darkpurple;
            sbox.style.border = "5px solid #2B0233";//darkpurple; 
    }
})


sbox.addEventListener("mouseout", () => 
{
    
    
    if (state == 0) 
    {
        sbox.style.background = "#882e80";//light purple
        sbox.style.border = "5px solid #882e80";//light purple           
        const svg = document.getElementById('arrow-svg');
        svg.innerHTML = ''; // Clear any existing arrow
    }


    if (state==1) 
    {
        const svg = document.getElementById('arrow-svg');
        svg.innerHTML = ''; // Clear any existing arrow
        newOnes = sbox.id % 10;
        newTens = (sbox.id - newOnes) / 10;
        if (newTens == ones) 
        {
            if(!sbox.disabled)
            {
                sbox.style.background = "#882e80";//light purple
                sbox.style.border = "5px solid #882e80";//light purple           
                
            }
        }
    }
    if(state == 2 && mWinSet.includes(Math.floor(parseInt(sbox.id) / 10))){
        kursor(turnO?'O':'X',sbox);
        const svg = document.getElementById('arrow-svg');
        svg.innerHTML = ''; // Clear any existing arrow
    }
    if(state == 2 && !(mWinSet.includes(Math.floor(parseInt(sbox.id) / 10)))){

        const svg = document.getElementById('arrow-svg');
        svg.innerHTML = ''; // Clear any existing arrow    
        if (sbox.disabled) return;
            sbox.style.background = "#882e80";//light purple
            sbox.style.border = "5px solid #882e80";//light purple                      

    }

})
});

//Win Patterns and Check for win Function
const patterns = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
]

let allMBOX = [];var bSet = [0, 0, 0, 0, 0, 0, 0, 0, 0];
for (let x = 0; x < 9; x++)
allMBOX[x] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function mWin(set) {
for (let a = 0; a < 8; a++) {//checking
    if (set[patterns[a][0]] == set[patterns[a][1]]
        && set[patterns[a][1]] == set[patterns[a][2]]
        && set[patterns[a][0]] != 0) {
        return true;
    }
}
return false;
}

//Click Event Listener for Small Boxes
sBox.forEach(sbox => {
sbox.addEventListener("click", () => 
{
    const svg = document.getElementById('arrow-svg');
        svg.innerHTML = ''; // Clear any existing arrow
    if (sbox.disabled) return;
    sbox.innerText = turnO ? 'O' : 'X';
    turnO = !turnO;
    sbox.style.background = "#2B0233";//darkpurple;
    sbox.style.border = "5px solid #2B0233";//darkpurple;          
    sbox.disabled = true;
    kursor('', sbox);


    //check for mWin
    ones = sbox.id % 10;
    tens = (sbox.id - ones) / 10;

    allMBOX[tens - 1][ones - 1] = turnO ? 1 : 2;
    if (mWin(allMBOX[tens - 1])||mWinSet.includes(ones)) { //mWin happens or the next available mBox is won
        state = 2;
        if(mWin(allMBOX[tens - 1]))
        {
            mWinSet.push(tens);
            bSet[tens-1]= turnO ? 1 : 2;

        }

        
        sBox.forEach((sbox3) => {
        ones3 = sbox3.id % 10;
        tens3 = (sbox3.id - ones3) / 10;  
        if(mWinSet.includes(tens3))
        {
  
            sbox3.disabled=true;
        }
        else {
            sbox3.disabled = sbox3.innerText != ""; // Enable only if the box is empty
        }
        })
        mBox.forEach((mbox3) => {
            if(mWin(allMBOX[tens - 1])&&parseInt(mbox3.id)==tens)
            {
                mbox3.style.background=turnO?"green":"red";
                mbox3.style.border=turnO?"5px solid green":"5px solid red";
                
                mbox3.innerText=turnO?"X":"O";
                mbox3.style.fontSize= "101px";
                mbox3.disabled=true;
            }
            
            })
            if(mWin(bSet)){
                alert(turnO?"X Won":"O won");
            }
    }
//no mWin
    else {
        state = 1;
        const svg = document.getElementById('arrow-svg');
        svg.innerHTML = ''; // Clear any existing arrow
        mBox.forEach((mbox) => 
        {
            if (mbox.id == ones) {
                if(mbox.disabled) return;
                mbox.style.background = "blue";
                mbox.style.border = "5px solid blue";
            }
            else {
                if(mbox.disabled) return;
                mbox.style.background = "white";
                mbox.style.border = "5px solid white";
            }
        })
        sBox.forEach((sbox2) =>//enabling and disabling the available sboxes if there was no mWin 
        {
            newOnes = sbox2.id % 10;
            newTens = (sbox2.id - newOnes) / 10;
                if (newTens == ones) {
                    sbox2.disabled=(sbox2.innerText=="")?false:true;                    
                }
                else {
                    kursor('', sbox2);
                    sbox2.disabled=true;
                }
            
        })
    }

})

})

//Restart Button
restartBtn.addEventListener("click", () => {
    //Reset the entire game
    window.location.reload();

    })

function tens(x){
    return Math.floor(parseInt(x)/10);
}

function tens(x){
    return parseInt(x)%10;
}

/*sBox.forEach(tail => 
{
    tail.addEventListener('mouseover', () => 
    {
        if (!tail.disabled) 
        {
            // Is the tail box enabled?
            sBox.forEach(head => 
            {
                if (tens(head.id) == ones(tail.id) && !mWinSet.includes(tens(head.id)) && head.id % 10 == 5) 
                {
                    UpdateArrow(tail, head);
                } 
                else if (tens(head.id) == ones(tail.id) && mWinSet.includes(tens(head.id))) 
                {
                    sBox.forEach(altHead => 
                    {
                        if (altHead.id % 10 == 5 && !mWinSet.includes(tens(altHead.id))) 
                        {
                            UpdateArrow(tail, altHead);
                        }
                    });
                }
            });
        }
    });
    
    tail.addEventListener('mouseout', () => 
    {
        const svg = document.getElementById('arrow-svg');
        svg.innerHTML = ''; // Clear any existing arrow
    });
});*/
    