
const btnEl = document.getElementById('btn');
const hintEl = document.getElementById('hint');
const highScoreEl = document.getElementById('highScore');
 
    // board
    let blockSize = 20;
    let rows = 20;
    let cols = 20;
    let board ;
    let context;

    // snake head 
    let snakeX =10*blockSize
    let snakeY =3*blockSize

    // snake body or snake length
    let snakeBody = [];

    // give some speed , for movig snake 
    let velocityX = 0;
    let velocityY = 0;

    // food 
    let foodX ;
    let foodY ;

    // game over 
    let gameOver = false;

    // all sound 
    const gameOverSound = new Audio ('error.mp3');
    const foodSound = new Audio ('cobra.mp3');

    // for score
    let score = 0;
    let highScore ;
    const scoreEl = document.getElementById('score');
    let highScore_;


    // when window will load , set the width and height  

    window.onload = () => {
        
        board = document.getElementById('board');
        context = board.getContext('2d'); // for drawing somthing in the board
        board.width = cols * blockSize;
        board.height = rows * blockSize;

        highScore_ = JSON.parse(localStorage.getItem('highScore') || '');
        highScore=highScore_;
        highScoreEl.innerText= `${ highScore_}`;

        placeFood();

        // for moving the snake 
    
        document.addEventListener("keyup" , changeDirection);
        // call a function for update the board color , call this again and again

        setInterval(update , 1000/5);
    };

    const update = () => {
        if (gameOver) {
            return;
        }

        context.fillStyle ="black";
        context.fillRect(0,0,board.width,board.height);

        context.fillStyle ="orchid";
        context.fillRect( foodX,foodY , blockSize,blockSize );

        // check snake collide with food or not 
        if(snakeX == foodX && snakeY == foodY){
            score = score + 1;
            scoreEl.innerText = `  ${score}`
            
            foodSound.play();
            snakeBody.push([foodX,foodY]);
            placeFood();
        }

        // for moving the body of snake 
        for (let i = snakeBody.length-1; i > 0 ; i-- ) {
            snakeBody[i] = snakeBody[i-1];     
            
        }

        if (snakeBody.length) {
            snakeBody[0] =[snakeX,snakeY];
            
        }
  
        context.fillStyle ="lime";
        snakeX += velocityX *blockSize ;
        snakeY += velocityY *blockSize;
        context.fillRect( snakeX, snakeY  , blockSize,blockSize );

        // now draw the body 
        for (let i = 0; i < snakeBody.length; i++) {
            context.fillRect(snakeBody[i][0] , snakeBody[i][1] , blockSize,blockSize,blockSize);
            
        }

        // game over condition - 2

        if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
            hintEl.innerText = `Press Replay to play again.`;   
            gameOverSound.play();
            gameOver = true;
            
        }

        for (let i = 0; i < snakeBody.length; i++) {
            if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
                hintEl.innerText = `Press Replay to play again.`;   
                gameOverSound.play();
                gameOver = true;
                
            }
            
        }

    };

    // for randomally placing food on board 

    const placeFood =() =>{
        foodX = Math.floor(Math.random()*cols )*blockSize ;
        foodY = Math.floor(Math.random()* rows )*blockSize ; 

    };

    // for changing the direction of snake 

    function changeDirection (e) {
        console.log("heloo");
        if (e.code == "ArrowUp" && velocityY != 1 ){
            velocityX = 0;
            velocityY = -1;
        }
        else if (e.code == "ArrowDown" && velocityY != -1 ){
            velocityX = 0;
            velocityY = 1;
        }
        else if (e.code == "ArrowLeft" && velocityX != 1 ){
            velocityX = -1;
            velocityY = 0;
        }

        else if (e.code == "ArrowRight" && velocityX != -1 ){
            velocityX = 1;
            velocityY = 0;
        }
    };


btnEl.addEventListener('click', () => {

    if(highScore < score){
        highScore =score;
        console.log(highScore);
        localStorage.setItem('highScore', JSON.stringify(highScore));
    }

    

    
    location.reload();
    
});












