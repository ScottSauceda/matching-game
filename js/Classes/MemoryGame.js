class MemoryGame {
    
    constructor(app, arr) {
        
        // pass the constructor arguments to properties of Class
        this.app = document.getElementById(app)
        // the array passed into the constructor methid, passed to an object
        this.arr = arr    
        // div for displaying feedback messages during game
        this.outputBox = document.getElementById('outputMsg');
        this.footer = document.querySelector('footer');
        this.scoreBox = document.getElementById('score-box');
        this.timerBox = document.getElementById('timer-box');
        this.playBtn = document.getElementById('play-btn');
        this.playBtn.addEventListener('click', this.playGame.bind(this));
        
        this.countdownInterval; // for setting and clearing countdown interval
        this.timerInterval; // for keeping time as 00:00
        
    } // close constructor()
    
    
    playGame() { // runs when user clicks PLAY
        
        // fresh game: empty old game pics and reset all the vars
        
        clearInterval(this.timerInterval);
        
        // empty out the app div
        this.app.innerHTML = '';
        
        this.scoreBox.innerHTML = `Attempts: &nbsp;  0  &nbsp; 
               Matches: &nbsp;  0  &nbsp;
               Average: &nbsp;  0.000  &nbsp;
               Score: &nbsp; 0 &nbsp;`;
        
        this.timerBox.innerHTML = '00:00';
        
        this.outputBox.innerHTML = 'Good Luck';
        
        //keeping score:
        this.attempts = 0;
        this.matches = 0;
        // hits over at bats
        this.average = 0;
        this.score = 0;
        
        //keeping time
        this.seconds = 5;
        this.minutes = 0;
        this.totSec = 0;
        
        // an array to hold 2 clicked pics at a time for comparison
        this.picChoices = [];
        
        // randomize the array items
        for(let i = 0; i < this.arr.length; i++) {
            
            // assume item 0, "anchor" swapping places w some random number, "lion"
            let rando = Math.floor(Math.random()*this.arr.length)
            let tempItem = this.arr[i] // "anchor" temporarily stashed
            // replace "anchor" w "lion"
            this.arr[i] = this.arr[rando]
            // complete swap by replacing "lion" w tempItem "anchor"
            this.arr[rando] = tempItem
            
        } // end for loop
        
        
        // get the value (12, 18, 24, 30) from the chooser menu (select menu)
        this.totGamePics = document.getElementById('chooser').value;
        
        // a randomized arrat of correct length for game play
        // copy this.arr so we can splice it
        this.copyArr = this.arr.slice(0); // slice() returns a copy
        this.gameArr = this.copyArr.splice(0, this.totGamePics);
        
        // double the array, since you need pairs
        this.gameArr = [...this.gameArr, ...this.gameArr]
        // alert(this.gameArr.length)
        
        // randomize the gameArr or else you get a repeated array of game Pics
        this.gameArr.sort((a, b) => 0.5 - Math.random());
    
    // loop through randomized array and make images
        for(let i = 0; i < this.gameArr.length; i++) {

            // CODE2 : make a new image obj
            let pic = new Image()
            // CODE3 : set its source to correct JPG
            pic.src = `images/final/200x200/${this.gameArr[i]}.jpg`
            // CODE4 : make pic call showPic func on click
            pic.addEventListener('click', this.showPic.bind(this))
            // CODE5 : set class to "pics"
            pic.className = "pics"
            // CODE6 : give it a name so func knows which pic is clicked
            pic.name = this.gameArr[i] // "anchor" or whatever
            // CODE7 : give each pic a unique ID
            pic.id = i
            // CODE8 : output the image to the app div
            this.app.appendChild(pic)
            
        } // end for loop
        
        this.hideAll()
        
        // Countdown to gray-out
        this.countdownInterval = setInterval(() => {
            //countdown 1 sec and output
            this.outputBox.innerHTML = 'HIDING ALL IN ' + this.seconds + ' SECONDS'
            this.timerBox.innerHTML = '00:00'
            this.seconds--
            // stop the interval when seconds gets to 0;
            if(this.seconds == -1) {
                this.outputBox.innerHTML = "GOOD LUCK";
                clearInterval(this.countdownInterval);
            }
        }, 1000); 
        
    } // playGame()

    
    showPic() {
 // if less than 2 choices, show the just-clicked pic and push pic into array
        if(this.picChoices.length < 2) {
            
            event.target.src = 'images/final/200x200/' + event.target.name + '.jpg'
            this.picChoices.push(event.target)
            
        } else {
//            return
              
        } // end
        
        // if 2 items are in the picChoices array, compare them to see if they match
        if(this.picChoices.length == 2) {
            //if names match, so far so good
            
            this.attempts++ // right or wrong, this counts as an attempt
            
            if(this.picChoices[0].name == this.picChoices[1].name) {
                
                // if the ID's do not match, that is a true match
                if(this.picChoices[0].id != this.picChoices[1].id) {
                    // if you made it this far, you havea MATCH!!
//                    alert("That's a match! Good job")
                    this.outputBox.innerHTML = "That's a match! Good job";
                    
                    // get the matched pair from the DOM
                    let picChoice0 = document.getElementById(this.picChoices[0].id);
                    let picChoice1 = document.getElementById(this.picChoices[1].id);
                    // make two replacement pics that look just like originals
                    let newPic0 = new Image();
                    let newPic1 = new Image();
                    
                    // set source  and class to the new replace images
                    newPic0.src = `images/final/200x200/${this.picChoices[0].name}.jpg`;
                    newPic0.className = "pics";
          this.app.replaceChild(newPic0,picChoice0);
                    
                     newPic1.src = `images/final/200x200/${this.picChoices[1].name}.jpg`;
                    newPic1.className = "pics";
                    this.app.replaceChild(newPic1, picChoice1);
                    
                    
//                    this.picChoices[0].removeEventListener('click', this.showPic.bind(this))
//                    this.picChoices[1].removeEventListener('click', this.showPic.bind(this))

                    this.matches++ // successful attempt -- that's a match !!

                    // INSTEAD OF ALERTS OUTPUT THE FEEDBACK MSGS TO HEADER
                    
                    
                    this.picChoices = [] // empty array
//                    this.clearBox()
                    
                    // detect game over: totGamePics == matches
                    if(this.matches == 1) {
                        this.outputBox.innerHTML = "GAME OVER!";
                        // make and output save score button
                        let saveBtn = document.createElement('button');
                        saveBtn.addEventListener('click', this.saveScore.bind(this));
                        saveBtn.innerHTML = "SAVE SCORE";
                        
                     this.footer.appendChild(saveBtn);
                        
                    this.footer.style.cssText = "padding: 5px; margin:5px";
                        
                    clearInterval(this.timerInterval) // stop the timer
                        
                    } // end if
                    
                } else {
//                    alert("Oops, You picked the same picture.");
                    this.outputBox.innerHTML = "Oops, You picked the same picture twice.";
                    this.hideChoices()
//                    this.clearBox()
                    } // end 
                
            } else {
//                alert("Those pics don't match! Keep trying");
                this.outputBox.innerHTML = "Those pics don't match! Keep trying";
                 this.hideChoices()
//                this.clearBox()
            } // end if else
            
            // update the score and output it to the scoreBox span tag
            this.average = (this.matches / this.attempts).toFixed(3)
            
            
            // the complex score saved to High Scores in DB
            this.score = Math.ceil(this.average * ((this.gameArr.length/2) ** 2) * this.matches * 1000 / this.totSec);
            
            this.scoreBox.innerHTML = `Attempts: &nbsp; ${this.attempts} &nbsp; 
               Matches: &nbsp; ${this.matches} &nbsp;
               Average: &nbsp; ${this.average} &nbsp;
               Score: &nbsp; ${this.score} &nbsp`; 
            
            
        } // end if else
        
    } // end show pic
    
    saveScore () {
        const highScoreBox = document.getElementById('highScore');
//        alert('Save Score button was clicked');
        // AJAX Call to PHP; send all score data to save to DB
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200) {
                highScoreBox.cssText = "display:block; top: 100px"
                highScoreBox.innerHTML = xhr.responseText
            } // end if xhr.readyState
        } // end const xhr
        const url = 'save-load-score.php?'
        let urlVars = "attempts=" + this.attempts
        urlVars += '&matches=' + this.matches
        urlVars += '&average=' + this.average
        urlVars += '&seconds=' + this.seconds
        urlVars += '&score=' + this.score
        xhr.open('GET', url + urlVars, true)
        xhr.send()
        
    } // saveScore()
    
    hideChoices() {// delay hiding the choices -- hide 1st choice after 1.5 sec, hide 2nd choice after 3 seconds
        
        setTimeout(() => {
            this.picChoices[0].src = "images/blank.png"
        }, 1500) // end set timouet
        
        setTimeout(() => {
            this.picChoices[1].src = "images/blank.png"
            
            // after hiding choices, empty out the array
            this.picChoices = [];
            
        }, 3000) // end set timouet
        
    } // end hide choices()
    
//    clearBox() {
//        setTimeout(() => {
//            this.outputBox.innerHTML = "";
//        }, 3000)
//
//    }
    
    hideAll() {
//        let arry = this.arr
        // hide all pics (turn them gray) 5 seconds after this hideAll method is called
        setTimeout(() => {
            //loop through each pic, hiding each and every one
            for(let i = 0; i < this.gameArr.length; i++) {
               // first image in the big box: this.app.children
                this.app.children[i].src = `images/blank.png`;
            } // end for
            
            // pass the baton to the initTimer method
            this.initTimer();
            
        }, 6500);
        
        
    } // hideAll()
    
    initTimer() {
        
        // start the timer and update time every second until game over
        // this.seconds = 0;
        
        this.timerInterval = setInterval(() => {
            
            this.seconds++;
            this.totSec++
            if(this.seconds == 60) {
                this.minutes++
                this.seconds = 0;
            } // end if
            
            // output the time, as 00:00
            var mySec = 0;
            if(this.seconds < 10) {
                mySec = '0' + this.seconds
            } else { // seconds is double - digit, so no leading zero
                mySec = this.seconds;
            } // end if
            
            var myMin = 0;
            if(this.minutes < 10) {
                myMin = '0' + this.minutes
            } else { // minutes is double-digit, so no leading zero
                myMin = this.minutes
            } // end if else
            
            this.timerBox.innerHTML = myMin + ':' + mySec;
            
              // the complex score saved to High Scores in DB
            this.score = Math.ceil(this.average * ((this.gameArr.length/2) ** 2) * this.matches * 1000 / this.totSec);
            
            this.scoreBox.innerHTML = `Attempts: &nbsp; ${this.attempts} &nbsp; 
               Matches: &nbsp; ${this.matches} &nbsp;
               Average: &nbsp; ${this.average} &nbsp;
               Score: &nbsp; ${this.score} &nbsp`; 
            
            
            
        }, 1000) // end setInterval
        
    } // end initTimer()

    
} // close class MemoryGame