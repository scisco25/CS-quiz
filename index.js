//page init

//question 2 init
let q2num1 = Math.round(Math.random() * 100);
let q2num2 = Math.round(Math.random() * 100);
//if the num2 is smaller then num1 increase by 5
while(q2num2 < q2num1) {
    q2num2 = q2num2 + 5;
}
//set html variables to display numbers
document.getElementById('rangenum1').innerHTML = +q2num1;
document.getElementById('rangenum2').innerHTML = +q2num2;
//register Listener for selected number display
document.getElementById('q2').addEventListener('change',q2displayupdate);

//question 3 init

//randomize background color
/*let backcolor = [Math.round(Math.random() * 255),Math.round(Math.random() * 255),Math.round(Math.random() * 255)];
document.body.style.backgroundColor = `rgb(${backcolor[0]},${backcolor[1]},${backcolor[2]})`;*/

//question 4 init
document.getElementById('q4').addEventListener('change',q4displayupdate);
let ransize = Math.round(Math.random() * 1000) * 0.01;
document.getElementById('selectsize').innerHTML = ransize.toString().substring(0,4) + "MB";

//question 6 init
let movingbutton = document.getElementById('movingbutton')
movingbutton.addEventListener('mouseover',q6move);
let buttonclicked = false;
//if you manage to click it you win
movingbutton.addEventListener('click',q6click)
//prevent using tab to hit the button
let cheater = false;
movingbutton.addEventListener('keydown',q6anticheat);

//register grade button
document.getElementById('grademe').addEventListener('click',grade)

//functions start here

function q2displayupdate() {
    document.getElementById('rangenum').innerHTML = document.getElementById('q2').value;
}

function q4displayupdate() {
    document.getElementById('byteout').innerHTML = (document.getElementById('q4').files[0].size / 1024 / 1024).toString().substring(0,4) + "MB";
}

//takes an event var from the caller to access mouse data
function q6move(event) {
    if(!buttonclicked && !cheater){
        movingbutton.style.top = `${Math.round(Math.random() * 140)}px`
        movingbutton.style.left = `${Math.round(Math.random() * 300)}px`
    }
}

function q6click() {
    buttonclicked = true;
    movingbutton.innerHTML = "How."
    movingbutton.disabled = true;
    console.log('how');
}

//takes a variable from caller to get the keycode pressed
function q6anticheat(event) {
    //restricted to the enter key
    if(event.keyCode == 13) {
        console.log('anticheat activated');
        movingbutton.innerHTML = "Cheater."
        movingbutton.disabled = true;
        buttonclicked = false;
        cheater = true;
    }
}

function grade() {
    lockinputs();
    console.log('started grading');
    let result = 0;
    //q1
    if(document.getElementById('q1-b').checked == true){
        document.getElementById('q1right').style.display = 'block';
        result++;
        console.log('Q1 Correct!');
    }
    else{
        document.getElementById('q1wrong').style.display = 'block';
        console.log('Q1 Incorrect!')
    }
    //q2
    if(document.getElementById('q2').value > q2num1 && document.getElementById('q2').value < q2num2){
        document.getElementById('q2right').style.display = 'block';
        result++;
        console.log('Q2 Correct!');
        document.getElementById('pickednumberright').innerHTML = document.getElementById('q2').value;
        document.getElementById('rightrange1').innerHTML = q2num1;
        document.getElementById('rightrange2').innerHTML = q2num2;
    }
    else {
        document.getElementById('q2wrong').style.display = 'block';
        console.log('Q2 Incorrect!')
        document.getElementById('pickednumbr').innerHTML = document.getElementById('q2').value;
        document.getElementById('wrongrange1').innerHTML = q2num1;
        document.getElementById('wrongrange2').innerHTML = q2num2;
    }
    //q4 requires a trycatch incase there was no upload
    try{
        if((document.getElementById('q4').files[0].size / 1024 / 1024).toString().substring(0,4) + "MB" == ransize.toString().substring(0,4) + "MB") {
            console.log('q4 Correct')
            result++;
            document.getElementById('q4right').style.display = 'block';
            document.getElementById('awnserselectsize').innerHTML = (document.getElementById('q4').files[0].size / 1024 / 1024).toString().substring(0,4) + "MB";
        }
        else {
            console.log('q4 Incorrect');
            document.getElementById('q4wrong').style.display = 'block';
            let diff = (ransize - document.getElementById('q4').files[0].size / 1024 / 1024).toString().substring(0,4);
            let difftype = "small"
            if(diff < 0) {diff = diff * -1; difftype = "large";}
            document.getElementById('sizediff').innerHTML = diff;
            document.getElementById('difftype').innerHTML = difftype;
        }
    }
    catch{
        document.getElementById('q4nofile').style.display = 'block';
        console.log('q4 Incorrect')
    }
    //q5 uses a seperate function so I don't need to nest a ton of code
    if(checkchecks()){
        document.getElementById('q5right').style.display = 'block';
        console.log('q5 correct')
        result++;
    }
    else{
        document.getElementById('q5wrong').style.display = 'block';
        console.log('q5 Incorrect')
    }
    //all q6 button states
    if(buttonclicked && !cheater){
        document.getElementById('q6right').style.display = 'block';
        console.log('q6 correct')
        result++;
    }
    else if(!buttonclicked && ! cheater) {
        document.getElementById('q6wrong').style.display = 'block';
        console.log('q6 Incorrect')
    }
    else if(cheater) {
        document.getElementById('q6cheater').style.display = 'block';
        console.log('q6 Incorrect')
    }
    //q7
    if(document.getElementById('q7').value.toLowerCase() == "box"){
        document.getElementById('q7right').style.display = 'block';
        console.log('q7 correct');
        result++;
    }
    else{
        document.getElementById('q7wrong').style.display = 'block';
        console.log('q7 Incorrect');
    }
    //input the score at the top
    document.getElementById('correct').innerHTML = result + "/";
    window.scrollTo(0,0);
}

function lockinputs() {
    Array.from(document.getElementsByClassName('isinput')).forEach(element => {
        element.disabled = true;
    });
}

function checkchecks() {
    let isright = true;
    let userchecks = Array.from(document.getElementById('checks').children);
    let correctchecks = Array.from(document.getElementById('correctchecks').children);
    for(i = 0; i < userchecks.length; i++){
        if(userchecks[i].checked != correctchecks[i].checked){
            isright = false;
        }
    }
    return isright;
}