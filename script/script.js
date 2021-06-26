function calc(){
    var filesize = document.getElementById("fileSize");
    var selectFilesize = document.getElementById("select_filesize");
    var speed = document.getElementById("speed");
    var selectSpeed = document.getElementById("select_speed");
    var btn = document.querySelector("#start_btn");
    var estimatedTime = document.querySelector("#fixedTime");
    var remainingTime = document.getElementById("dynamicTime");
    // console.log(remainingTime);
    var progress = document.getElementById("progress");
    var progressText = document.querySelector("#progress p");
    // console.log(progressText.innerHTML);



    btn.addEventListener('click', function run(){
        // console.log(filesize.value);
        // console.log(speed.value);
        // console.log(typeof(filesize.value));
        var sizeInt = parseInt(filesize.value);
        var speedInt = parseInt(speed.value);
        var sizeInBits = 0;
        var tempTime = 0;
        

        // Converting Size to Bits 

        if(selectFilesize.options[selectFilesize.selectedIndex].value == "KB"){
            sizeInBits = sizeInt*8192;
            console.log(sizeInBits);

        }

        else if(selectFilesize.options[selectFilesize.selectedIndex].value == "MB"){
            sizeInBits = sizeInt*8388608;
            console.log(sizeInBits);
        }

        else{
            sizeInBits = sizeInt*8589934592;
            console.log(sizeInBits);
        }

        var tempSize = sizeInBits;

        // Calculating Estimated Time

        if(selectSpeed.options[selectSpeed.selectedIndex].value == "kbps"){
            sizeInBits = sizeInBits/1024;
            tempTime = sizeInBits/speedInt;
            console.log(tempTime+'s');
        }
        else if(selectSpeed.options[selectSpeed.selectedIndex].value == "mbps"){
            sizeInBits = sizeInBits/1048576;
            tempTime = sizeInBits/speedInt;
            console.log(tempTime+'s');
        }
        else{
            sizeInBits = sizeInBits/1073741824;
            tempTime = sizeInBits/speedInt;
            console.log(tempTime+'s');
        }

        //Setting Remaining Time
        var tempTimealt = Math.round(tempTime)
        remainingTime.innerHTML = tempTimealt +' '+ 'seconds';

        // Updating Estimated Time 

        if(tempTime>=60 && tempTime<3600){
            tempTime=tempTime/60;
            estimatedTime.innerHTML = tempTime +' '+ 'minutes';
        }
        else if(tempTime>=3600)
        {
            tempTime=tempTime/3600;
            estimatedTime.innerHTML = tempTime +' '+ 'hours';

        }

        else{
            estimatedTime.innerHTML = tempTime +' '+ 'seconds';
        }

        //Running Simmulation

        var countTime = 0;
        var intervalSize = 0;
        var tempTimedecremental = tempTimealt;

        if(selectSpeed.options[selectSpeed.selectedIndex].value == "kbps"){
            console.log(tempSize);
            tempSize = tempSize/1024;
            }
 
         else if(selectSpeed.options[selectSpeed.selectedIndex].value == "mbps"){
            console.log(tempSize);
            tempSize = tempSize/1048576;
         }
         else{
            console.log(tempSize);
            tempSize = tempSize/1073741824;
         }

        var interval = setInterval(function simulate(){
            btn.disabled = true;
            intervalSize = intervalSize + speedInt
            var temp = intervalSize/tempSize;
            // console.log(temp);
            var sizeInPercent = temp*100;
            if(sizeInPercent>100){
                sizeInPercent=100;
            }
            progressText.innerHTML = Math.round(sizeInPercent) + '%';
            progress.style.width = Math.round(sizeInPercent) + '%';
            console.log(sizeInPercent+'%');

            countTime = countTime + 1;
            console.log(countTime);
            tempTimedecremental--;
            remainingTime.innerHTML = tempTimedecremental +' '+ 'seconds';
            if(countTime >= tempTimealt){
                clearInterval(interval);
                btn.disabled = false;
                remainingTime.innerHTML = '0 seconds'
            }

        }, 1000);

    });
    
}

calc();
