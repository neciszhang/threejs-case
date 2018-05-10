THREE.OrientControls = function() {
    var scope = this;
    this.screenOrientation = 0;
	this.ready = false;
	this.initX = 0;
	this.initY = 0;
	this.deltaX = 0;
	this.deltaY = 0;
	var rotX, rotY;
	
	
	
    function onDeviceOrientationChangeEvent(event) {
       
        switch (scope.os) {
          case "ios":
            switch (scope.screenOrientation) {
              case 0:
                rotY = event.alpha + event.gamma;
                if (event.beta > 0) rotX = event.beta - 90;
                break;

              case 90:
                if (event.gamma < 0) {
                    rotY = event.alpha - 90;
                } else {
                    rotY = event.alpha - 270;
                }
                if (event.gamma > 0) {
                    rotX = -90 + event.gamma;
                } else {
                    rotX = 90 + event.gamma;
                }
                break;

              case -90:
                if (event.gamma < 0) {
                    rotY = event.alpha - 90;
                } else {
                    rotY = event.alpha - 270;
                }
                if (event.gamma > 0) {
                    rotX = -event.gamma + 90;
                } else {
                    rotX = -90 - event.gamma;
                }
                break;
            }
            break;

          case "android":
            switch (scope.screenOrientation) {
              case 0:
                rotY = event.alpha + event.gamma + 30;
                if (event.gamma > 90) {
                    rotX = 90 - event.beta;
                } else {
                    rotX = event.beta - 90;
                }
                break;

              case 90:
                rotY = event.alpha - 230;
                if (event.gamma > 0) {
                    rotX = 90 - event.gamma;
                } else {
                    rotX = -90 - event.gamma;
                }
                break;

              case -90:
                rotY = event.alpha - 180;
                if (event.gamma > 0) {
                    rotX = event.gamma - 90;
                } else {
                    rotX = 90 + event.gamma;
                }
                break;
            }
            break;
        }
        if (isNaN(rotX) || isNaN(rotY)) return;
		
		rotX = Math.round(rotX);
		rotY = Math.round(rotY);
        rotY %= 360;
        if (rotY < 0) rotY += 360;
		
		if(!scope.ready){
			scope.ready = true;
			scope.initX = rotX;
			scope.initY = rotY;
		}else{
			 if (Math.abs(scope.initY - rotY) > 180) {
				if (scope.initY > rotY) {
					scope.deltaY +=( rotY +360 - scope.initY-scope.deltaY )*.1
				} else {
					scope.deltaY +=( rotY -360 - scope.initY-scope.deltaY )*.1
				}
			} else {
				scope.deltaY += (rotY - scope.initY-scope.deltaY )*.1
			}
			scope.deltaX +=( rotX - scope.initX - scope.deltaX)*.1
		}	
		
			
    }
    // firefox
    if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        this.os = "ios";
    } else {
        this.os = navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Linux") ? "android" :"";
    }
    window.addEventListener("deviceorientation", onDeviceOrientationChangeEvent, false);
	
	this.reset = function(){
		this.ready = false;
		this.initX = rotX;
		this.initY = rotY;
	}
	
	this.disable = function(){
		 window.removeEventListener("deviceorientation", onDeviceOrientationChangeEvent);
	}
};