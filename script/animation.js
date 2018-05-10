var _animations = {}
function initAnimation(){	
	_animations["MORPH"] = function(){
		this.userData.currentGeometry+=.5
		this.geometry =getGeometry( this.userData.morph[Math.floor(this.userData.currentGeometry)])
		if(this.userData.currentGeometry >= this.userData.endGeometry){
			this.userData.currentGeometry = 0;
		}			
	}
	
	_animations["LOOP"] = function(){
		this.userData.currentFrame = Math.floor((globalUniforms.time.value*40+this.userData.delay)%this.userData.motions["LOOP"].frame.length)
		if(this.userData.motions["LOOP"].frame[this.userData.currentFrame].pos) this.position.fromArray(this.userData.motions["LOOP"].frame[this.userData.currentFrame].pos)
		if(this.userData.motions["LOOP"].frame[this.userData.currentFrame].rotq) this.quaternion.fromArray(this.userData.motions["LOOP"].frame[this.userData.currentFrame].rotq)
		if(this.userData.motions["LOOP"].frame[this.userData.currentFrame].scl) this.scale.fromArray(this.userData.motions["LOOP"].frame[this.userData.currentFrame].scl)
		this.updateMatrix()
	}
	
	_animations["HAND"] = function(){
		var q = Math.sin(globalUniforms.time.value*4+this.userData.delay*.005);
		this.position.z = this.userData.initPosition.z+q*3+6;	
		this.updateMatrix()
	}
	
	_animations["FLOWP"] = function(){
		var q = Math.sin(globalUniforms.time.value*2+this.userData.delay*.005);
		this.parent.position.z = this.parent.userData.initPosition.z+q*20;	
		this.parent.updateMatrix()
	}
	
	_animations["ROTY"] = function(){		
		this.rotation.y += this.userData.speed*.5
		this.updateMatrix()
	}
	
	_animations["ROTPY"] = function(){		
		this.parent.rotation.y += this.parent.userData.speed*.05
		this.parent.updateMatrix()
	}
	
	_animations["INVROTY"] = function(){		
		this.rotation.y = -this.parent.rotation.y
		this.updateMatrix()
	}
	
	_animations["ROTZ"] = function(){		
		this.rotation.z += this.userData.speed*.1
		this.updateMatrix()
	}
	
	_animations["POSZ"] = function(){
		var q = Math.sin(globalUniforms.time.value+this.userData.delay*.005);
		this.position.z += (this.userData.initPosition.z+q*this.userData.range*.3 - this.position.z)*.1;	
		//console.log(this.userData.initPosition.z+q*this.userData.range*.03)
				
		this.updateMatrix()
	}
	
	_animations["FLYAWAY2"] = function(){
		this.position.y +=  this.userData.speed;	
		this.userData.speed+=.1*globalUniforms.fps.value
		if(this.position.y>2000){
			 this.visible = false; 
			 return
		}	
		this.updateMatrix()
	}
	
	_animations["FLYAWAY"] = function(){
		this.position.z -=  this.userData.speed;	
		this.userData.speed+=.1*globalUniforms.fps.value
		if(this.position.z<-2000){
			 this.visible = false; 
			 return
		}		
		this.updateMatrix()
	}
	
	_animations["POSY"] = function(){
		var q = Math.sin(globalUniforms.time.value+this.userData.delay*.005);
		this.position.y = this.userData.initPosition.y+q*this.userData.range*.03;			
		this.updateMatrix()
	}
	
	_animations["FLOWPR"] = function(){
		var q = Math.sin(globalUniforms.time.value+this.userData.delay*.005);
		this.position.z = this.userData.initPosition.z+q*this.userData.range;	
		var q = Math.sin(globalUniforms.time.value+this.userData.delay*.005+.4);
		var t = this.userData.initRot.clone().multiply(new THREE.Quaternion().setFromAxisAngle(this.userData.axis,q*this.userData.speed))
		//var q = Math.sin(globalUniforms.time.value+this.userData.initPosition.y*.005+.4);
		//var t = this.userData.initRot.clone().multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1.,0.,0.),q*.3))
		this.quaternion.copy(t)
		this.updateMatrix()
	}
}