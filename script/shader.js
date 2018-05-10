var _shaders = {};

function initShader(){
	_shaders["HASH"] = [
		"float hash( float n ) { return fract(sin(n)*753.5453123); }",
		
		"vec3 hash31(float p) {",
		  " vec3 p3 = fract(vec3(p) * vec3(.1031,.11369,.13787));",
		   "p3 += dot(p3, p3.yzx + 19.19);",
		   "return fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));",
		"}",
	].join("\n"),
	
	_shaders["ALPHATEST"] = [
		"if(gl_FragColor.a<.3){",
			"discard;",
		"}"
	].join("\n")
	
	_shaders["COLADJ"] = ["vec3 RGB2HSV(vec3 c){",
		"vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);",
		"vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));",
		"vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));",		
		"float d = q.x - min(q.w, q.y);",
		"float e = 1.0e-10;",
		"return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);",
	"}",

	"vec3 HSV2RGB(vec3 c){",
		"vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);",
		"vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);",
		"return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);",
	"}",
	].join("\n")
	
	_shaders["FOG"] = "gl_FragColor.rgb=mix(vec3(0.78,.94,.95),gl_FragColor.rgb,1.-smoothstep(0.0,.8,gl_FragCoord.z/gl_FragCoord.w/300.));",
	
	_shaders["SNOW"] = new THREE.ShaderMaterial({
		vertexShader:[
			"uniform float time;",
			"varying float vAlpha;",
			"varying mat2 vAngle;",
			_shaders["HASH"],
			"void main(){",
				"float s = hash(position.z)*.8+.2;",
				"float m = position.y-time*.1*s;",
				"float x = sin(time*s*4.+position.x)*.16;",
				"float y = fract(m);",
				"float z = cos(time*s*4.+position.z)*.16;",
				"vec3 newPosition = vec3(position.x+x,y*3.,position.z+z);",
				"vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1.0 );",
				"gl_Position = projectionMatrix * mvPosition;",	
				"gl_PointSize = s*600./length(mvPosition);",	
				"vAlpha = s*smoothstep(0.,.2,sin(y*3.1415926));",
				"float sin_factor = sin(position.y-time);",
				"float cos_factor = cos(position.y-time);",
				"vAngle = mat2(cos_factor, sin_factor, -sin_factor, cos_factor);",
			"}",
		].join("\n"),
		
		fragmentShader:[
			"uniform sampler2D diffuse;",
			"varying float vAlpha;",
			"varying mat2 vAngle;",
			"void main(){",
				"vec2 coord = (gl_PointCoord- 0.5) * vAngle;",				
				"coord += 0.5;",			
				"gl_FragColor = vec4(1.,1.,1.,texture2D(diffuse,coord).a);",
				
				_shaders["ALPHATEST"],
				"gl_FragColor.a*=vAlpha;",
				_shaders["FOG"],
			"}",
		].join("\n"),
		
		transparent:true,
		
	})
	
	_shaders["GREEN"] = new THREE.ShaderMaterial({
		vertexShader:[
			"uniform float time;",
			"varying float vAlpha;",
			"varying float vColor;",
			_shaders["HASH"],
			
			"float move(vec3 pos) {",
				"float y = (sin(pos.x * 200.1 + time*.0027 )*.1 + sin(pos.z * 10.23 + time*.0015)*.4 + sin(pos.y * 100. + time * 0.004)*.5);",
				"return y;",
			"}",
			
			"void main(){",
				"float s = hash(position.z)*.8+.2;",
				"vAlpha = sin(position.y-time*s)*.5+.5;",
				"float y = s*vAlpha*.08;",
				"vColor = hash(position.x)*.3+.7;",
				"vec3 newPosition = vec3(move(hash31(position.x))*16.,y+position.y*.2,move(hash31(position.z))*16.);",
				"vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1.0 );",
				"gl_Position = projectionMatrix * mvPosition;",	
				"gl_PointSize = y*400./length(mvPosition);",	
				
			"}",
		].join("\n"),
		
		fragmentShader:[
			"uniform sampler2D diffuse;",
			"varying float vAlpha;",
			"varying float vColor;",
			"void main(){",
				"gl_FragColor = vec4(vColor,1.,0.,texture2D(diffuse,gl_PointCoord).a);",
				
				_shaders["ALPHATEST"],
				"gl_FragColor.a*=vAlpha;",
				_shaders["FOG"],
			"}",
		].join("\n"),
		
		transparent:true,
		
	})
	
	
	_shaders["TREE"] = new THREE.ShaderMaterial({
		vertexShader:[
			"#include <common>",
			"#include <bsdfs>",
			"#include <lights_pars>",
			"varying vec3 vLightFront;	",
			
			"uniform float force;",
			"attribute vec4 rotation;",
			"attribute vec3 offset;",
			"attribute float scale;",
					
			"varying vec2 vUv;",
			
			_shaders["HASH"],
			
			"vec4 quat_from_axis_angle(vec3 axis, float angle){",
				  "vec4 qr;",
				  "float half_angle = (angle * 0.5) * 3.14159;",
				  "qr.x = axis.x * sin(half_angle);",
				  "qr.y = axis.y * sin(half_angle);",
				  "qr.z = axis.z * sin(half_angle);",
				  "qr.w = cos(half_angle);",
				  "return qr;",
			"}",
			
			"vec4 quat_mult(vec4 q1, vec4 q2){",
				  "vec4 qr;",
				  "qr.x = (q1.w * q2.x) + (q1.x * q2.w) + (q1.y * q2.z) - (q1.z * q2.y);",
				  "qr.y = (q1.w * q2.y) - (q1.x * q2.z) + (q1.y * q2.w) + (q1.z * q2.x);",
				  "qr.z = (q1.w * q2.z) + (q1.x * q2.y) - (q1.y * q2.x) + (q1.z * q2.w);",
				  "qr.w = (q1.w * q2.w) - (q1.x * q2.x) - (q1.y * q2.y) - (q1.z * q2.z);",
				  "return qr;",
			"}",
		
		//	"mat3 rot = SetRot(rotation+vec3(sin(time*scale)*.5+sin(force),cos(time*scale)*.5+cos(force),0.)*.3*scale);",
			"void main(){",
				"vUv = uv*vec2(.25,1.);",
				"vUv.x+=floor(hash(offset.x*100.)*4.)/4.;",
				"vec3 axis = vec3(hash(offset.z+offset.x),0.,0.);",
				"vec4 newRotation = quat_mult(rotation,quat_from_axis_angle(axis,force));",
				"vec3 newPosition = (position + 2.0 * cross(newRotation.xyz, cross(newRotation.xyz, position) + newRotation.w * position))*scale+offset;",
				"vec3 transformedNormal =  normalMatrix*normalize(normal + 2.0 * cross(rotation.xyz, cross(rotation.xyz, normal) + rotation.w * normal));",
			
				"vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1.0 );",
				"gl_Position = projectionMatrix * mvPosition;",				
				
				"#include <lights_lambert_vertex>",
			"}",	
			
		].join("\n"),	
		
		fragmentShader:[
			"#include <common>",
			"#include <bsdfs>",
			"#include <lights_pars>",
			
			"varying vec3 vLightFront;	",
			
			"varying vec2 vUv;",
			"uniform sampler2D diffuse;",
		
			"void main(){",
				"vec4 diffuseColor = texture2D(diffuse,vUv);",	
				
				"ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );",
				
				"#include <color_fragment>",
				"reflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );",
				"reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );",
				"reflectedLight.directDiffuse = vLightFront;",
				"reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );",
				"vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse ;",	
				
				"gl_FragColor = vec4( outgoingLight,1.);",	
				
				_shaders["FOG"],	
			"}",
		].join("\n"),	
		
		lights:true,
		uniforms:THREE.UniformsLib['lights']
	})
	
	_shaders["LIGHT"] = new THREE.ShaderMaterial({
		vertexShader:[
			"#include <common>",
			"#include <bsdfs>",
			"#include <lights_pars>",
			"varying vec3 vLightFront;	",
			"varying vec3 vLightBack;	",
			"#ifdef USE_INSTANCE",
				"attribute vec4 rotation;",
				"attribute vec3 offset;",
				"attribute float scale;",
			"#endif",
		
			"#ifdef USE_TEXTURE",
				"varying vec2 vUv;",
			"#endif",
			
			"void main(){",
				"#ifdef USE_TEXTURE",
					"vUv = uv;",
				"#endif",
				
				
				"#ifdef USE_INSTANCE",
					"vec3 newPosition = (position + 2.0 * cross(rotation.xyz, cross(rotation.xyz, position) + rotation.w * position))*scale+offset;",
					"vec3 transformedNormal =   normalMatrix*normalize(normal + 2.0 * cross(rotation.xyz, cross(rotation.xyz, normal) + rotation.w * normal));",
				"#else",
					"vec3 newPosition = position;",
					"vec3 transformedNormal =  normalMatrix*normal;",
				"#endif",
				
				"vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1.0 );",
				"gl_Position = projectionMatrix * mvPosition;",				
				
				"#include <lights_lambert_vertex>",
			"}",	
			
		].join("\n"),	
		
		fragmentShader:[
			"#include <common>",
			"#include <bsdfs>",
			"#include <lights_pars>",
			
			"varying vec3 vLightFront;	",
			"varying vec3 vLightBack;	",
			"#ifdef USE_TEXTURE",
					"varying vec2 vUv;",
					"uniform sampler2D diffuse;",
			"#else",		
					"uniform vec3 color;",
			"#endif",
			
			"void main(){",
				"#ifdef USE_TEXTURE",
					"vec4 diffuseColor = texture2D(diffuse,vUv);",	
				"#else",	
					"vec4 diffuseColor = vec4(color,1.);",		
				"#endif",
				"ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );",
				
				"#include <color_fragment>",
				"reflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );",
				"reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );",
				"reflectedLight.directDiffuse = vLightFront;",
				"reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );",
				"vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse ;",	
				
				"gl_FragColor = vec4( outgoingLight,1.);",	
				
				_shaders["FOG"],	
			"}",
		].join("\n"),	
		
		lights:true,
		uniforms:THREE.UniformsLib['lights']
	})
	
	
		
	_shaders["CLOUD"] = new THREE.ShaderMaterial({
		vertexShader:[
			"#include <common>",
			"#include <bsdfs>",
			"#include <lights_pars>",
			"varying vec3 vLightFront;	",
			
			"uniform float time;",
			
			"attribute vec4 rotation;",
			"attribute vec3 offset;",
			"attribute float scale;",

			_shaders["HASH"],
				
			"void main(){",		
				
				"vec3 rnd = hash31(offset.y);",
				"vec3 newPosition = (position + 2.0 * cross(rotation.xyz, cross(rotation.xyz, position) + rotation.w * position))*scale+offset;",
				"newPosition.y += sin(time*3.*(rnd.y*.5+.5)+rnd.x*10.)*.4;",
				"vec3 transformedNormal =  normalMatrix*(normal + 2.0 * cross(rotation.xyz, cross(rotation.xyz, normal) + rotation.w * normal));",
				
				"vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1.0 );",
				"gl_Position = projectionMatrix * mvPosition;",				
				
				"#include <lights_lambert_vertex>",
			"}",	
			
		].join("\n"),	
		
		fragmentShader:_shaders["LIGHT"].fragmentShader,
		
		lights:true,
		uniforms:THREE.UniformsLib['lights']
	})
	
	_shaders["GLASS"] = new THREE.ShaderMaterial({
		vertexShader:[
			"#ifdef USE_TEXTURE",
				"varying vec2 vUv;",
			"#endif",
			"varying vec3 vNormal;",
			"varying vec3 vViewPosition;",
			
			"varying float intensity;",
			 
			"#include <common>",
			
			"#ifdef USE_INSTANCE",
				"attribute vec4 rotation;",
				"attribute vec3 offset;",
				"attribute float scale;",
			"#endif",
			
			"void main(){",
				"#ifdef USE_TEXTURE",
					"vUv = uv;",
				"#endif",
				"#ifdef USE_INSTANCE",
					"vec3 newPosition = (position + 2.0 * cross(rotation.xyz, cross(rotation.xyz, position) + rotation.w * position))*scale+offset;",
					"vec3 transformedNormal =   normal + 2.0 * cross(rotation.xyz, cross(rotation.xyz, normal) + rotation.w * normal);",
				"#else",
					"vec3 newPosition = position;",
					"vec3 transformedNormal =   normal;",
				"#endif",
				
				"vNormal = normalize( normalMatrix * transformedNormal );",
				"vec4 mvPosition = modelViewMatrix * vec4(newPosition,1.);",
				"vec3 vNormel = normalize( -mvPosition.xyz);",
				"intensity = smoothstep(0.0,.8,0.8 - dot(vNormal, vNormel));",	
				"gl_Position = projectionMatrix * mvPosition;",
				"vViewPosition = -mvPosition.xyz;",		
					
			"}"
		].join("\n"),
		
		fragmentShader:[
			
			"varying float intensity;",
			"uniform float opacity;",
			"uniform vec3 specular;",
			
			"#ifdef USE_TEXTURE",
					"varying vec2 vUv;",
					"uniform sampler2D diffuse;",
			"#endif",
			"#ifdef USE_ENV",
					"uniform sampler2D envMap;",
			"#endif",	
			
			"uniform vec3 color;",						
			"uniform float shininess;",
			"#include <common>",
			"#include <color_pars_fragment>",
			"#include <bsdfs>",
			"#include <lights_pars>",
			"#include <lights_phong_pars_fragment>",
			"#include <normalmap_pars_fragment>",
			"uniform vec2 resolution;",
			"void main(){",
				"vec4 diffuseColor = vec4(color,1.);",
				"#ifdef USE_TEXTURE",
					"diffuseColor = texture2D(diffuse,vUv);",				
				"#endif",
				
				"vec2 uv = (gl_FragCoord.xy+((vNormal+vec3(1.,1.,0.))*100.).xy)/resolution;",
				"diffuseColor.rgb = mix(diffuseColor.rgb,texture2D(envMap,uv).rgb,.3*(1.-intensity));",
				
				"ReflectedLight reflectedLight = ReflectedLight( vec3( 0. ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );",
				"#include <specularmap_fragment>",
				"#include <normal_flip>",
				"#include <normal_fragment>",
				"#include <lights_phong_fragment>",
				"#include <lights_template>",				
				"vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular;",
				"gl_FragColor = vec4( outgoingLight, mix(diffuseColor.a*opacity*(intensity*.5+.8),1.,step(.9,opacity)));",
				
			"}",
		
		].join("\n"),
		lights:true,
		transparent:true,
		uniforms:THREE.UniformsUtils.merge(
			[THREE.UniformsLib['lights'],
			{				
				shininess:{value:30,type:"f"},
				specular:{value:new THREE.Color(0xffffff),type:"c"},
				opacity:{value:1}
			}]
		),
	})
	
	_shaders["OCEAN"] = new THREE.ShaderMaterial({
		vertexShader:[		
			'varying vec3 worldPosition;',			
			'void main() {',
				'worldPosition = (modelMatrix * vec4( position, 1.0 )).xyz;',
				'vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );',
				'gl_Position = projectionMatrix * mvPosition;',
			'}'
		].join("\n"),
		
		fragmentShader:[
			'uniform sampler2D diffuse;',
			'uniform float time;',
			'uniform float distortionScale;',
			'uniform vec3 sunColor;',
			'uniform vec3 sunDirection;',
			'uniform vec3 waterColor;',
			'uniform vec3 eye;',
			
			'varying vec3 worldPosition;',
			
			'vec4 getNoise( vec2 uv ) {',
			'	vec2 uv0 = ( uv / 103.0 ) + vec2(time / 50.0, time / 90.0);',
			'	vec2 uv1 = uv / 107.0-vec2( time / -59.0, time / 60.0 );',
			'	vec2 uv2 = uv / vec2( 907.0, 803.0 ) + vec2( time / 210.0, time / 370.0 );',
			'	vec2 uv3 = uv / vec2( 91.0, 27.0 ) - vec2( time / 509.0, time / -603.0 );',
			'	vec4 noise = texture2D( diffuse, uv0 ) +',
			'		texture2D( diffuse, uv1 ) +',
			'		texture2D( diffuse, uv2 ) +',
			'		texture2D( diffuse, uv3 );',
			'	return noise * 0.5 - 1.0;',
			'}',
			
			'void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {',
			'	vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );',
			'	float direction = max( 0.0, dot( eyeDirection, reflection ) );',
			'	specularColor += pow( direction, shiny ) * sunColor * spec;',
			'	diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;',
			'}',
			
			//_shaders["COLADJ"],
			
			'void main() {',
			'	vec4 noise = getNoise( worldPosition.xz*10.);',
			'	vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );',

			'	vec3 diffuseLight = vec3(0.0);',
			'	vec3 specularLight = vec3(0.0);',

			'	vec3 worldToEye = eye-worldPosition;',
			'	vec3 eyeDirection = normalize( worldToEye );',
			'	sunLight( surfaceNormal, eyeDirection, 200.0, 2.0, .9, diffuseLight, specularLight );',

			'	float distance = length(worldToEye);',

			'	vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;',
			'	vec3 reflectionSample = vec3(0.164,.67,.88 );',

			'	float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );',
			'	float rf0 = 0.3;',
			'	float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );',
			'	vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;',
			'	vec3 albedo = mix( sunColor * diffuseLight  + scatter, ( vec3( 0.1 ) + reflectionSample * 0.9 + reflectionSample * specularLight ), reflectance );',
			
			'	gl_FragColor = vec4(albedo,1.);',
			

			'}'
		].join("\n"),
		
		uniforms:{
			distortionScale: { value: .1 },
			sunColor: { value: new THREE.Color( 0x7f7f7f ) },
			sunDirection: { value: new THREE.Vector3( 0.70707, 0.70707, 0 ) },
			waterColor: { value: new THREE.Color( 0x6efaff ) }
		}
	})
	
	_shaders["LDSCREEN"] = new THREE.ShaderMaterial({
		vertexShader:[
			"varying vec2 vUv;",
			"varying vec2 vUv2;",
			"uniform float num0;",
			"uniform float num1;",
			
			"void main(){",
				"vUv2 = uv;",
				"vUv = uv;",
				"vUv = uv*vec2(.1*2.,1.);",
				"float t = step(0.5,uv.x);",
				"float d = mix(num0,num1,t);",
				"vUv.x += mix((-.1+d),-.2+d,t);",
				
				"vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );",
				"gl_Position = projectionMatrix * mvPosition;",						
				
			"}"
			
		].join("\n"),
		
		fragmentShader:[
			"varying vec2 vUv;",
			"varying vec2 vUv2;",
			"uniform sampler2D diffuse;",
			"uniform float time;",
			"void main(){",
				//"float dark = smoothstep(0.3,1.,1.-.02*length(vUv2-.5));",
				"vec4 diffuseColor = texture2D(diffuse,vUv);",	
				"gl_FragColor = vec4(diffuseColor.rgb,diffuseColor.a);",
				"gl_FragColor.rgb = mix(vec3(.89,.54,.56),gl_FragColor.rgb,0.9+0.1*sin(10.0*time+vUv.y*10.0));",
				
				_shaders["FOG"],
			"}",
			
			
		].join("\n"),
		
		transparent:true,
		
		uniforms:{
			num0:{value:0},
			num1:{value:0},
		}
	});
	
	_shaders["BASIC"] = new THREE.ShaderMaterial({
		
		vertexShader:[
			"#ifdef USE_INSTANCE",
				"attribute vec4 rotation;",
				"attribute vec3 offset;",
				"attribute float scale;",
			"#endif",
		
			"#ifdef USE_TEXTURE",
				"varying vec2 vUv;",
			"#endif",
			
			"void main(){",
				"#ifdef USE_TEXTURE",
					"vUv = uv;",
				"#endif",
				
				
				"#ifdef USE_INSTANCE",
					"vec3 newPosition = (position + 2.0 * cross(rotation.xyz, cross(rotation.xyz, position) + rotation.w * position))*scale+offset;",
				"#else",
					"vec3 newPosition = position;",
				"#endif",
			
				"vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0 );",
				
				
				"gl_Position = projectionMatrix * mvPosition;",						
				
			"}"
			
		].join("\n"),
		
		fragmentShader:[
			"#ifdef USE_TEXTURE",
					"varying vec2 vUv;",
					"uniform sampler2D diffuse;",
			"#else",		
					"uniform vec3 color;",
			"#endif",
			
			"uniform float opacity;",
			
			"void main(){",
				
				"#ifdef USE_TEXTURE",
					"vec4 diffuseColor = texture2D(diffuse,vUv);",	
				"#else",	
					"vec4 diffuseColor = vec4(color,1.);",		
				"#endif",
				"gl_FragColor = vec4(diffuseColor.rgb,diffuseColor.a*opacity);",
				
				_shaders["FOG"],
				_shaders["ALPHATEST"],
			"}",
		].join("\n"),
		
		uniforms:{
			opacity:{value:1}
		}
	});
	
	_shaders["SPRITE"] = new THREE.ShaderMaterial({
		
		vertexShader:[	
		
			"#ifdef USE_TEXTURE",
				"varying vec2 vUv;",
			"#endif",
			"uniform float scale;",
			
			"void main(){",
				"#ifdef USE_TEXTURE",
					"vUv = uv;",
				"#endif",							
				"vec4 mvPosition = modelViewMatrix * vec4(0.,0.,0., 1.0 );",
				"mvPosition.xy += vec2(position.x,-position.z)*scale;",				
				"gl_Position = projectionMatrix * mvPosition;",						
				
			"}"
			
		].join("\n"),
		
		fragmentShader:_shaders["BASIC"].fragmentShader,
		side:THREE.DoubleSide,
		uniforms:{
			scale:{value:.01},
			opacity:{value:1}
		}
	});
	
	
	_shaders["WATER"] = new THREE.ShaderMaterial({
		vertexShader:_shaders["BASIC"].vertexShader,
		fragmentShader:[
			"uniform float time;",
			"uniform vec2 offset;",
			"uniform sampler2D noise;",
			"uniform sampler2D diffuse;",
			"varying vec2 vUv;",
	
			"float waterlayer(vec2 uv){",
				"uv = fract(uv);",		
				"return texture2D(diffuse,uv).r;",
			"}",
	
			"vec3 water(vec2 uv){",
				
				"float n = texture2D(noise,uv*4.,-2.).r;",
				"uv *= 32.; ",   
				"vec2 a = .002 * uv.xy ;",
				"float h = sin( 10.*uv.y+ time); ",
				"uv += a * h*n;",
				"h = sin( 12.*uv.x -  8.*uv.y + time);",
				"uv += a * h;",
				"uv *= 2.;  ",
				
				"float d1 = mod((uv.x + uv.y), 6.283185307);",
				"float d2 = mod((uv.x + uv.y + 0.25+ time) * 2.3, 18.84955592);",
				"d1 += time * 3.17;",
				"d2 += time * 0.5;",
				"vec2 dist = vec2(",
					"sin(d1) * 0.0015 + sin(d2) * 0.005,",
					"sin(d2) * 0.15 + sin(d1) * 0.1",
				");",    
				"vec3 ret = mix(vec3(0.56, 0.965, 1.),vec3(0.56, 0.965, 1.), waterlayer( uv - dist.yx+time*offset));",
				"ret = mix(ret, vec3(0.8125, 0.9609, 0.9648), waterlayer( uv - (n*.5+.8)*dist.xy+time*offset));",
				"return ret;",
			"}",
	
			"void main(){",  
				"vec2 uv = vUv; ",
				"gl_FragColor = vec4(water(uv*.1),1.);",
				
				_shaders["FOG"],
			"}",
		].join("\n"),
		
		
	})
	
	
	_shaders["BG"] = new THREE.ShaderMaterial({
		vertexShader:[
			"varying vec2 vUv;",
			"void main(){",  
				"vUv = uv;",
				"vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );",
				"gl_Position = projectionMatrix * mvPosition;",	
			"}",
		].join("\n"),
		
		fragmentShader:[	
			"varying vec2 vUv;",
			"uniform vec3 color1;",
			"uniform vec3 color2;",
			"void main(){",  
				"gl_FragColor.rgb = mix(color2,color1,smoothstep(.5,1.,1.0 - .6*length(vUv-.5)));",
			"}",
		].join("\n"),
		
		depthWrite:false,
		depthTest:false,
		uniforms:{
			color1:{value:new THREE.Color(0xc9f9f6)},//
			color2:{value:new THREE.Color(0x81c4ca)}
		}
	})
}