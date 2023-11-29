//A Very Normal Quiz
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

//question 4 init

//automaticly display the size of the selected file when uploaded
document.getElementById('q4').addEventListener('change',q4displayupdate);
//randomly select the target size
let ransize = Math.round(Math.random() * 1000) * 0.01;
document.getElementById('selectsize').innerHTML = ransize.toString().substring(0,4) + "MB";

//question 6 init
//get the button and give it a listener for mouseover
let movingbutton = document.getElementById('movingbutton')
movingbutton.addEventListener('mouseover',q6move);
//variable for tracking if it was clicked
let buttonclicked = false;
//if you manage to click it you win
movingbutton.addEventListener('click',q6click)
//prevent using tab to hit the button
let cheater = false;
movingbutton.addEventListener('keydown',q6anticheat);

//register grade button
document.getElementById('grademe').addEventListener('click',grade)

//functions start here

//update value displaying slider value
function q2displayupdate() {
    document.getElementById('rangenum').innerHTML = document.getElementById('q2').value;
}

//update filesize display
function q4displayupdate() {
    document.getElementById('byteout').innerHTML = (document.getElementById('q4').files[0].size / 1024 / 1024).toString().substring(0,4) + "MB";
}

//takes an event var from the caller to access mouse data
function q6move(event) {
    if(!buttonclicked && !cheater){
        //move it to a random area within the space
        movingbutton.style.top = `${Math.round(Math.random() * 140)}px`
        movingbutton.style.left = `${Math.round(Math.random() * 300)}px`
    }
}

//if you manage to click it
function q6click() {
    //update the tracking variable
    buttonclicked = true;
    //disable the button and set its text to 'how'
    movingbutton.innerHTML = "How."
    movingbutton.disabled = true;
    console.log('how');
}

//takes a variable from caller to get the keycode pressed
function q6anticheat(event) {
    //restricted to the enter key
    if(event.keyCode == 13) {
        console.log('anticheat activated');
        //disable the button and mark the user as a cheater
        movingbutton.innerHTML = "Cheater."
        movingbutton.disabled = true;
        buttonclicked = false;
        cheater = true;
    }
}

function grade() {
    //prevents further changes
    lockinputs();
    console.log('started grading');
    let result = 0;
    //q1 - if option b (which is the third option for some reason.) is
    // selected mark it right.
    if(document.getElementById('q1-b').checked == true){
        //display the box stating its correct nature
        document.getElementById('q1right').style.display = 'block';
        //Increase the users score
        result++;
        console.log('Q1 Correct!');
    }
    // else its wrong
    else{
        //tell the user their stupid
        document.getElementById('q1wrong').style.display = 'block';
        console.log('Q1 Incorrect!')
    }
    //q2 - this is actually the third question because stuff got pushed around
    //get the value of the slider and check if its between the two random values
    //we chose and stored earlier
    if(document.getElementById('q2').value > q2num1 && document.getElementById('q2').value < q2num2){
        //display the correct box and increase the score
        document.getElementById('q2right').style.display = 'block';
        result++;
        console.log('Q2 Correct!');
        //edit the correct box to state '<chosennumber> is between <number1> and <number2>'
        document.getElementById('pickednumberright').innerHTML = document.getElementById('q2').value;
        document.getElementById('rightrange1').innerHTML = q2num1;
        document.getElementById('rightrange2').innerHTML = q2num2;
    }
    else {
        //display the incorrect box
        document.getElementById('q2wrong').style.display = 'block';
        console.log('Q2 Incorrect!')
        //edit the INcorrect box to state '<chosennumber> is between <number1> and <number2>'
        document.getElementById('pickednumbr').innerHTML = document.getElementById('q2').value;
        document.getElementById('wrongrange1').innerHTML = q2num1;
        document.getElementById('wrongrange2').innerHTML = q2num2;
    }
    //q4 requires a trycatch incase there was no upload
    try{
        //convert uploaded size from bytes to megabytes and then reduce it to 3 digets
        if((document.getElementById('q4').files[0].size / 1024 / 1024).toString().substring(0,4) == ransize.toString().substring(0,4)) {
            //state that its correct and increase the score
            console.log('q4 Correct')
            result++;
            document.getElementById('q4right').style.display = 'block';
            //put the size of the uploaded file into the correct box
            document.getElementById('awnserselectsize').innerHTML = (document.getElementById('q4').files[0].size / 1024 / 1024).toString().substring(0,4) + "MB";
        }
        else {
            console.log('q4 Incorrect');
            //state that its wrong
            document.getElementById('q4wrong').style.display = 'block';
            //get the diffrence between the files
            let diff = (ransize - document.getElementById('q4').files[0].size / 1024 / 1024).toString().substring(0,4);
            //detirmine wether its too small or too large
            let difftype = "small"
            if(diff < 0) {diff = diff * -1; difftype = "large";}
            //edit the wrong box to show the diff type and size
            document.getElementById('sizediff').innerHTML = diff;
            document.getElementById('difftype').innerHTML = difftype;
        }
    }
    catch{
        //if the catch triggers it can be assumed theirs no file.
        //which null sure isn't the same as whatever the size request is.
        document.getElementById('q4nofile').style.display = 'block';
        console.log('q4 Incorrect')
    }
    //q5 uses a seperate function so I don't need to nest a ton of code
    if(checkchecks()){
        //state that its right and increase the score
        document.getElementById('q5right').style.display = 'block';
        console.log('q5 correct')
        result++;
    }
    else{
        //state that its wrong
        document.getElementById('q5wrong').style.display = 'block';
        console.log('q5 Incorrect')
    }
    //all q6 button states
    //if you clicked it and didn't cheat. you win!
    if(buttonclicked && !cheater){
        //state that you did it and increase the score
        document.getElementById('q6right').style.display = 'block';
        console.log('q6 correct')
        result++;
    }
    //if you didn't click it and didn't cheat then its wrong
    else if(!buttonclicked && ! cheater) {
        //state that its wrong
        document.getElementById('q6wrong').style.display = 'block';
        console.log('q6 Incorrect')
    }
    //cheater.
    else if(cheater) {
        //the most incorrect option here.
        document.getElementById('q6cheater').style.display = 'block';
        console.log('q6 Incorrect')
    }
    //q7 - this is the second question but it was added last so here it is.
    //if you wrote box. you win!
    if(document.getElementById('q7').value.toLowerCase() == "box"){
        //display the right box and increase the score
        document.getElementById('q7right').style.display = 'block';
        console.log('q7 correct');
        result++;
    }
    else{
        //just show the wrong box.
        document.getElementById('q7wrong').style.display = 'block';
        console.log('q7 Incorrect');
    }
    //input the score at the top
    document.getElementById('correct').innerHTML = result + "/";
    document.getElementById('quest-correct').innerHTML = "Questions Correct";
    //Change "Can you pass quiz" to something reflecting the score of the user
    let howdo = document.getElementById('howdo');
    if(result <= 2){howdo.innerHTML = "You cannot pass quiz"}
    else if(result <= 4){howdo.innerHTML = "You are close to passing quiz"}
    else if(result >= 5){howdo.innerHTML = "You can pass quiz"}
    //nuke the grade button from existence so that the user can't hit it again
    document.getElementById('grademe').remove();
    //send the user to the top of the page
    window.scrollTo(0,0);
}

function lockinputs() {
    //loop over all elements with the class name 'isinput' and disable them
    Array.from(document.getElementsByClassName('isinput')).forEach(element => {
        element.disabled = true;
    });
}
//why doesn't this damn languge have return types
//this returns a bool
function checkchecks() {
    //assume it is right
    let isright = true;
    //get the users checkmarks
    let userchecks = Array.from(document.getElementById('checks').children);
    //get the prefilled checkmarks from the correctbox
    let correctchecks = Array.from(document.getElementById('correctchecks').children);
    //loop over all the checkmarks
    for(i = 0; i < userchecks.length; i++){
        //if the users checkmark has a diffrent state from the correct marks
        //then it is incorrect.
        if(userchecks[i].checked != correctchecks[i].checked){
            isright = false;
        }
    }
    //return the value of isright.
    return isright;
}