function onResize() {
    viewWth = $(window).width(),
    viewHgh = $(window).height(),
    viewHlfWth = viewWth / 2,
    viewHlfHgh = viewHgh / 2,
    renderer.setSize(viewWth, viewHgh),
    updateCamera(),
    fxaaPass.setResolution(viewWth * viewPixelRatio, viewHgh * viewPixelRatio),
    effectBuffer[0].setSize(viewWth * viewPixelRatio, viewHgh * viewPixelRatio),
    effectBuffer[1].setSize(viewWth * viewPixelRatio, viewHgh * viewPixelRatio),
    hdrBuffer.setSize(viewWth * viewPixelRatio, viewHgh * viewPixelRatio),
    sceneBlurBuffer.setSize(viewWth * viewPixelRatio / 4, viewHgh * viewPixelRatio / 4),
    blurPass.setResolution(sceneBlurBuffer.width, sceneBlurBuffer.height),
    globalUniforms.resolution.value.set(viewWth * viewPixelRatio, viewHgh * viewPixelRatio)
}
function onLoadingComplete() {
    initLoading(),
    loaderQueue.removeEventListener("complete", onLoadingComplete),
    loaderQueue.removeEventListener("fileload", onImageFileLoad)
}
function prepareLoading() {
    // loaderQueue = new createjs.LoadQueue(!0,imagePath,!0),
    loaderQueue = new createjs.LoadQueue(),
    loaderQueue.addEventListener("complete", onLoadingComplete),
    loaderQueue.loadFile({
        src: "script/FXAAShader.js",
        type: createjs.AbstractLoader.JAVASCRIPT
    }),
    loaderQueue.loadFile({
        src: "script/HDRShader.js",
        type: createjs.AbstractLoader.JAVASCRIPT
    }),
    loaderQueue.loadFile({
        src: "script/KawaseBlurShader.js",
        type: createjs.AbstractLoader.JAVASCRIPT
    }),
    loaderQueue.loadFile({
        src: "script/orient.js",
        type: createjs.AbstractLoader.JAVASCRIPT
    }),
    loaderQueue.loadFile({
        src: "script/orbit.js",
        type: createjs.AbstractLoader.JAVASCRIPT
    }),
    loaderQueue.loadFile({
        src: "script/animation.js",
        type: createjs.AbstractLoader.JAVASCRIPT
    }),
    loaderQueue.loadFile({
        src: "script/shader.js",
        type: createjs.AbstractLoader.JAVASCRIPT
    }),
    loaderQueue.loadFile({
        src: "assets/loading.json",
        id: "loading",
        type: createjs.AbstractLoader.JSON
    }),
    loaderQueue.loadFile({
        src: "assets/loading/talk_01.png",
        id: "talk_01"
    }),
    loaderQueue.loadFile({
        src: "assets/loading/talk_02.png",
        id: "talk_02"
    }),
    loaderQueue.loadFile({
        src: "assets/loading/talk_03.png",
        id: "talk_03"
    }),
    loaderQueue.loadFile({
        src: "assets/loading/talk_04.png",
        id: "talk_04"
    }),
    loaderQueue.loadFile({
        src: "assets/loading/LD_tv.png",
        id: "LD_tv"
    }),
    loaderQueue.loadFile({
        src: "assets/loading/LD_num.png",
        id: "LD_num"
    }),
    loaderQueue.loadFile({
        src: "assets/loading/noise.png",
        id: "noise"
    }),
    loaderQueue.loadFile({
        src: "assets/loading/snow.png",
        id: "snow"
    })
}
function onContentComplete() {
    // trackEvent("Open page", "Landing", "Landing 2"),
    initStage("index"),
    initStage("stage1"),
    initStage("stage2"),
    isContentLoaded = !0,
    dispatcher.dispatchEvent("onLoadComplete"),
    loaderQueue.removeEventListener("complete", onContentComplete),
    loaderQueue.removeEventListener("progress", onContentProgress),
    parepareContent2()
}
function onContent2Complete() {
    initStage("stage3"),
    initStage("stage4"),
    initStage("stage5")
}
function onContentProgress(a) {
    globalUniforms.progress.value = Math.max(globalUniforms.progress.value, Math.floor(100 * (a.loaded / a.total))),
    dispatcher.dispatchEvent("onLoadProgress")
}
function onImageFileLoad(a) {
    "image" == a.item.type && renderer.setTexture2D(getTexture(a.item.id), 0)
}
function parepareContent2() {
    loaderQueue.addEventListener("complete", onContent2Complete),
    loaderQueue.loadFile({
        src: "assets/stage3.json",
        id: "stage3",
        type: createjs.AbstractLoader.JSON
    }),
    loaderQueue.loadFile({
        src: "assets/stage4.json",
        id: "stage4",
        type: createjs.AbstractLoader.JSON
    }),
    loaderQueue.loadFile({
        src: "assets/stage5.json",
        id: "stage5",
        type: createjs.AbstractLoader.JSON
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3bwpdl.jpg",
        id: "S3bwpdl"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3xht.jpg",
        id: "S3xht"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3xhs.jpg",
        id: "S3xhs"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3xhl.jpg",
        id: "S3xhl"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3bc.jpg",
        id: "S3bc"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3dm.jpg",
        id: "S3dm"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3dfzxg.jpg",
        id: "S3dfzxg"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3dfzxga.jpg",
        id: "S3dfzxga"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3dfzxgb.jpg",
        id: "S3dfzxgb"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3dfxgt.jpg",
        id: "S3dfxgt"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3dfzjp.jpg",
        id: "S3dfzjp"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3jp.jpg",
        id: "S3jp"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3xfz.jpg",
        id: "S3xfz"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3shan.jpg",
        id: "S3shan"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3stdfz.jpg",
        id: "S3stdfz"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3std.jpg",
        id: "S3std"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3mtl.jpg",
        id: "S3mtl"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3mtlax.jpg",
        id: "S3mtlax"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3sgq.jpg",
        id: "S3sgq"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3jiupinb.jpg",
        id: "S3jiupinb"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3huoda.jpg",
        id: "S3huoda"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3huo.jpg",
        id: "S3huo"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3chuan.jpg",
        id: "S3chuan"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3pingguo.jpg",
        id: "S3pingguo"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3boluo.jpg",
        id: "S3boluo"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3xihongshi.jpg",
        id: "S3xihongshi"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3lddl.jpg",
        id: "S3lddl"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3ljdb.jpg",
        id: "S3ljdb"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3lajiaoa.jpg",
        id: "S3lajiaoa"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3lajiaob.jpg",
        id: "S3lajiaob"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3caomei.jpg",
        id: "S3caomei"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3title.png",
        id: "S3title"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3card1.png",
        id: "S3card1"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3card2.png",
        id: "S3card2"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3card3.png",
        id: "S3card3"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3card4.png",
        id: "S3card4"
    }),
    loaderQueue.loadFile({
        src: "assets/stage3/S3card5.png",
        id: "S3card5"
    }),
    loaderQueue.loadFile({
        src: "assets/stage4/S4di.jpg",
        id: "S4di"
    }),
    loaderQueue.loadFile({
        src: "assets/stage4/S4shan.jpg",
        id: "S4shan"
    }),
    loaderQueue.loadFile({
        src: "assets/stage4/S4banana.jpg",
        id: "S4banana"
    }),
    loaderQueue.loadFile({
        src: "assets/stage4/S4huo.jpg",
        id: "S4huo"
    }),
    loaderQueue.loadFile({
        src: "assets/stage4/S4touxiang.jpg",
        id: "S4touxiang"
    }),
    loaderQueue.loadFile({
        src: "assets/stage4/S4szt.jpg",
        id: "S4szt"
    }),
    loaderQueue.loadFile({
        src: "assets/stage4/S4ffz.jpg",
        id: "S4ffz"
    }),
    loaderQueue.loadFile({
        src: "assets/stage4/S4dfzxhs.jpg",
        id: "S4dfzxhs"
    }),
    loaderQueue.loadFile({
        src: "assets/stage4/S4title.png",
        id: "S4title"
    }),
    loaderQueue.loadFile({
        src: "assets/stage4/S4card1.png",
        id: "S4card1"
    }),
    loaderQueue.loadFile({
        src: "assets/stage4/S4card2.png",
        id: "S4card2"
    }),
    loaderQueue.loadFile({
        src: "assets/stage4/S4card3.png",
        id: "S4card3"
    }),
    loaderQueue.loadFile({
        src: "assets/stage4/S4card4.png",
        id: "S4card4"
    }),
    loaderQueue.loadFile({
        src: "assets/stage4/S4card5.png",
        id: "S4card5"
    }),
    loaderQueue.loadFile({
        src: "assets/stage4/waternormals.jpg",
        id: "waternormals"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5di.jpg",
        id: "S5di"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5dst.jpg",
        id: "S5dst"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5szsd.jpg",
        id: "S5szsd"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5szs.jpg",
        id: "S5szs"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5zhujiaod.jpg",
        id: "S5zhujiaod"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5dtd.jpg",
        id: "S5dtd"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5roud.jpg",
        id: "S5roud"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5lxd.jpg",
        id: "S5lxd"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5lx.jpg",
        id: "S5lx"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5shan.jpg",
        id: "S5shan"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5clock.jpg",
        id: "S5clock"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5title.png",
        id: "S5title"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5card1.png",
        id: "S5card1"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5card2.png",
        id: "S5card2"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5card3.png",
        id: "S5card3"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5card4.png",
        id: "S5card4"
    }),
    loaderQueue.loadFile({
        src: "assets/stage5/S5card5.png",
        id: "S5card5"
    })
}
function prepareContent() {
    // loaderQueue = new createjs.LoadQueue(!0,imagePath,!0),
    loaderQueue = new createjs.LoadQueue(),
    loaderQueue.addEventListener("complete", onContentComplete),
    loaderQueue.addEventListener("progress", onContentProgress),
    loaderQueue.addEventListener("fileload", onImageFileLoad),
    loaderQueue.installPlugin(createjs.Sound),
    loaderQueue.loadFile({
        src: "assets/card.mp3",
        id: "sfxCard"
    }),
    loaderQueue.loadFile({
        src: "assets/index.json",
        id: "index",
        type: createjs.AbstractLoader.JSON
    }),
    loaderQueue.loadFile({
        src: "assets/stage1.json",
        id: "stage1",
        type: createjs.AbstractLoader.JSON
    }),
    loaderQueue.loadFile({
        src: "assets/stage2.json",
        id: "stage2",
        type: createjs.AbstractLoader.JSON
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0dl.jpg",
        id: "S0dl"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0dr.jpg",
        id: "S0dr"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0fridge.jpg",
        id: "S0fridge"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0gbb.jpg",
        id: "S0gbb"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0ground.jpg",
        id: "S0ground"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0led.jpg",
        id: "S0led"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0shan.jpg",
        id: "S0shan"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0slogan.png",
        id: "S0slogan"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0flower.jpg",
        id: "S0flower"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0a0.png",
        id: "S0a0"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0a1.png",
        id: "S0a1"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0a2.png",
        id: "S0a2"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0a3.png",
        id: "S0a3"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0b.png",
        id: "S0b"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0c.png",
        id: "S0c"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0d.png",
        id: "S0d"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0e.png",
        id: "S0e"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0fj.jpg",
        id: "S0fj"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0lxj.jpg",
        id: "S0lxj"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0lv.jpg",
        id: "S0lv"
    }),
    loaderQueue.loadFile({
        src: "assets/index/treea.jpg",
        id: "treea"
    }),
    loaderQueue.loadFile({
        src: "assets/index/treeb.jpg",
        id: "treeb"
    }),
    loaderQueue.loadFile({
        src: "assets/index/treec.jpg",
        id: "treec"
    }),
    loaderQueue.loadFile({
        src: "assets/index/treed.jpg",
        id: "treed"
    }),
    loaderQueue.loadFile({
        src: "assets/index/treef.jpg",
        id: "treef"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0rqq.jpg",
        id: "S0rqq"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0shuipin.jpg",
        id: "S0shuipin"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0bingbang.png",
        id: "S0bingbang"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0bjlrqq.jpg",
        id: "SSbjlrqq"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0hongbao.png",
        id: "S0hongbao"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0roua.jpg",
        id: "S0roua"
    }),
    loaderQueue.loadFile({
        src: "assets/index/S0wwsx.png",
        id: "S0wwsx"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1di.jpg",
        id: "S1di"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1shan.jpg",
        id: "S1shan"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1bjjhdl.jpg",
        id: "S1bjjhdl"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1bjp.jpg",
        id: "S1bjp"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1bz.jpg",
        id: "S1bz"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1dfnn.jpg",
        id: "S1dfnn"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1fgt.jpg",
        id: "S1fgt"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1flfdj.jpg",
        id: "S1flfdj"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1fzst.jpg",
        id: "S1fzst"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1ggp.jpg",
        id: "S1ggp"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1gt.jpg",
        id: "S1gt"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1hld.jpg",
        id: "S1hld"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1hmst.jpg",
        id: "S1hmst"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1ht.jpg",
        id: "S1ht"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1jdt.jpg",
        id: "S1jdt"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1jtdl.jpg",
        id: "S1jtdl"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1ldz.jpg",
        id: "S1ldz"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1mbl.jpg",
        id: "S1mbl"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1mbxf.jpg",
        id: "S1mbxf"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1np.jpg",
        id: "S1np"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1px.jpg",
        id: "S1px"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1smza.jpg",
        id: "S1smza"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1smzb.jpg",
        id: "S1smzb"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1tang.jpg",
        id: "S1tang"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1xfnn.jpg",
        id: "S1xfnn"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1water.jpg",
        id: "SSwater"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1flfdjfy.jpg",
        id: "S1flfdjfy"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1ldg.jpg",
        id: "S1ldg"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/treee.jpg",
        id: "treee"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1luzhang.png",
        id: "S1luzhang"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1card1.png",
        id: "S1card1"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1card2.png",
        id: "S1card2"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1card3.png",
        id: "S1card3"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1card4.png",
        id: "S1card4"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1card5.png",
        id: "S1card5"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1title.png",
        id: "S1title"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1rqq.jpg",
        id: "S1rqq"
    }),
    loaderQueue.loadFile({
        src: "assets/stage1/S1hand.png",
        id: "S1hand"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2bbdl.jpg",
        id: "S2bbdl"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2fisha.jpg",
        id: "S2fisha"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2fishb.jpg",
        id: "S2fishb"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2shan.jpg",
        id: "S2shan"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2di.jpg",
        id: "S2di"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2swy.jpg",
        id: "S2swy"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2ycdl.jpg",
        id: "S2ycdl"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2cake.jpg",
        id: "S2cake"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2zjh.jpg",
        id: "S2zjh"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2ztp.jpg",
        id: "S2ztp"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2xfz.jpg",
        id: "S2xfz"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2sjdl.jpg",
        id: "S2sjdl"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2roub.jpg",
        id: "S2roub"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2hongbaod.jpg",
        id: "S2hongbaod"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2ptdl.jpg",
        id: "S2ptdl"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2zhutui.jpg",
        id: "S2zhutui"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2pgz.jpg",
        id: "S2pgz"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2hongbao.jpg",
        id: "S2hongbao"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2title.png",
        id: "S2title"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2card1.png",
        id: "S2card1"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2card2.png",
        id: "S2card2"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2card3.png",
        id: "S2card3"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2card4.png",
        id: "S2card4"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2card5.png",
        id: "S2card5"
    }),
    loaderQueue.loadFile({
        src: "assets/stage2/S2sdgg.jpg",
        id: "S2sdgg"
    })
}
function initTexture(a) {
    var c, d, b = loaderQueue.getResult(a);
    for (c in b)
        "length" != c && (d = new Image,
        d.src = b[c],
        _texs[c] = new THREE.Texture(d),
        _texs[c].name = c,
        _texs[c].wrapS = _texs[c].wrapT = THREE.MirroredRepeatWrapping,
        _texs[c].needsUpdate = !0)
}
function feedTexture() {
    for (var a in _texs)
        renderer.setTexture2D(_texs[a], 0)
}
function getTexture(a) {
    if (!_texs[a]) {
        var b = loaderQueue.getResult(a);
        if (!b)
            return null;
        _texs[a] = new THREE.Texture(b),
        _texs[a].name = a,
        _texs[a].wrapS = _texs[a].wrapT = THREE.RepeatWrapping,
        _texs[a].needsUpdate = !0
    }
    return _texs[a]
}
function removeTexture(a) {
    _texs[a] && -1 == a.indexOf("SS") && (_texs[a].dispose(),
    loaderQueue.remove(a),
    _texs[a] = null)
}
function initEffect() {
    prepareBuffer = new THREE.WebGLRenderTarget(1,1,{
        format: THREE.RGBFormat
    }),
    effectBuffer = [new THREE.WebGLRenderTarget(1,1,{
        format: THREE.RGBFormat
    }), new THREE.WebGLRenderTarget(1,1,{
        format: THREE.RGBFormat
    })],
    hdrBuffer = new THREE.WebGLRenderTarget(1,1,{
        format: THREE.RGBFormat
    }),
    sceneBlurBuffer = new THREE.WebGLRenderTarget(1,1,{
        format: THREE.RGBFormat
    }),
    fxaaPass = new THREE.FXAAPass(effectBuffer[1].texture),
    blurPass = new THREE.KawaseBlurPass(effectBuffer[0].texture),
    hdrPass = new THREE.HDRPass(effectBuffer[0].texture,sceneBlurBuffer.texture),
    globalUniforms.resolution = {
        value: new THREE.Vector2(1,1)
    }
}
function getParticle(a, b, c) {
    var g, d = new THREE.BufferGeometry, e = b, f = new Float32Array(3 * e);
    for (g = 0; e > g; g++)
        f[3 * g] = (Math.random() - .5) * a,
        f[3 * g + 1] = Math.random(),
        f[3 * g + 2] = (Math.random() - .5) * a;
    return _geoms[c] = d,
    d.name = c,
    d.addAttribute("position", new THREE.BufferAttribute(f,3)),
    d
}
function getGeometry(a) {
    return _geoms[a]
}
function removeGeometry(a) {
    _geoms[a] && (_geoms[a].dispose(),
    _geoms[a] = null)
}
function initGeometry(a) {
    var b, c, d, e, f, g, h;
    for (b = a.length - 1; b > -1; b--) {
        if (c = new THREE.BufferGeometry,
        a[b].cc) {
            for (d = a[b].indexs.length,
            e = new Float32Array(3 * d),
            a[b].uvs && (f = new Float32Array(2 * d)),
            g = 0; d > g; g++)
                h = a[b].indexs[g],
                e[3 * g] = a[b].vertices[3 * h],
                e[3 * g + 1] = a[b].vertices[3 * h + 1],
                e[3 * g + 2] = a[b].vertices[3 * h + 2],
                a[b].uvs && (f[2 * g] = a[b].uvs[2 * h],
                f[2 * g + 1] = a[b].uvs[2 * h + 1]);
            c.addAttribute("position", new THREE.BufferAttribute(new Float32Array(e),3)),
            a[b].uvs && c.addAttribute("uv", new THREE.BufferAttribute(f,2))
        } else
            c.addAttribute("position", new THREE.BufferAttribute(new Float32Array(a[b].vertices),3)),
            a[b].uvs && c.addAttribute("uv", new THREE.BufferAttribute(new Float32Array(a[b].uvs),2)),
            c.setIndex(new THREE.BufferAttribute(new Uint16Array(a[b].indexs),1));
        c.name = a[b].id,
        c.computeVertexNormals(),
        _geoms[a[b].id] = c
    }
}
function initInstancedGeometry(a) {
    var b, c, d, e;
    for (b = a.length - 1; b > -1; b--) {
        c = new THREE.InstancedBufferGeometry,
        d = _geoms[a[b].geometry];
        for (e in d.attributes)
            d.attributes[e]instanceof THREE.BufferAttribute && c.addAttribute(e, d.attributes[e]);
        d.index && c.setIndex(d.index),
        c.addAttribute("offset", new THREE.InstancedBufferAttribute(new Float32Array(a[b].offset),3,1)),
        c.addAttribute("rotation", new THREE.InstancedBufferAttribute(new Float32Array(a[b].rotation),4,1)),
        c.addAttribute("scale", new THREE.InstancedBufferAttribute(new Float32Array(a[b].scale),1,1)),
        _geoms[a[b].id] = c
    }
}
function startAnimation(a, b) {
    a.userData.initPosition.copy(a.position),
    a.userData.initRot.copy(a.quaternion),
    a.onBeforeRender = _animations[b]
}
function stopAnimation(a) {
    a.onBeforeRender = function() {}
}
function stopFrame(a) {
    a.userData.tween && (createjs.Tween.removeTweens(a.userData),
    a.userData.tween = null)
}
function setFrame(a, b, c) {
    a.userData.currentFrame = c,
    a.userData.currentMotion = a.userData.motions[b],
    a.userData.currentMotion.frame[c].pos && a.position.fromArray(a.userData.currentMotion.frame[c].pos),
    a.userData.currentMotion.frame[c].rotq && (a.quaternion.fromArray(a.userData.currentMotion.frame[c].rotq),
    a.userData.initRot.copy(a.quaternion)),
    a.userData.currentMotion.frame[c].scl && a.scale.fromArray(a.userData.currentMotion.frame[c].scl),
    a.updateMatrix()
}
function playFrameOnce(a, b, c) {
    return a.userData.currentMotion.id != b ? playFrame(a, b, c) : null
}
function reverseFrame(a, b) {
    if (a.scene != currentScene && a.scene != nextScene)
        return null;
    a.visible = !0,
    a.userData.currentMotion = a.userData.motions[b],
    a.userData.currentFrame = a.userData.currentMotion.frame.length - 1;
    var c = 1e3 * (a.userData.currentFrame / 40);
    return a.userData.tween = createjs.Tween.get(a.userData, {
        override: !0
    }).to({
        currentFrame: 0
    }, c, createjs.Ease.linear),
    a.userData.tween.addEventListener("change", setObjFrame),
    a.userData.tween
}
function playFrame(a, b, c) {
    var d, e;
    return a.scene != currentScene && a.scene != nextScene ? null : (a.visible = !0,
    a.userData.currentMotion = a.userData.motions[b],
    resetCue(a.userData.currentMotion),
    a.userData.currentFrame = 1,
    isNaN(c) && (c = 0),
    d = a.userData.currentMotion.frame.length - 1,
    e = 1e3 * ((d - a.userData.currentFrame) / 40),
    a.userData.tween = createjs.Tween.get(a.userData, {
        override: !0,
        loop: c
    }).to({
        currentFrame: d
    }, e, createjs.Ease.linear),
    a.userData.tween.addEventListener("change", setObjFrame),
    a.userData.tween)
}
function resetCue(a) {
    for (var b = a.cues.length - 1; b > -1; b--)
        a.cues[b].fired = !1
}
function setObjFrame(a) {
    var c, d, b = a.target.target.body;
    if (b.userData.currentMotion) {
        for (c = Math.floor(b.userData.currentFrame),
        b.userData.currentMotion.frame[c].pos && b.position.fromArray(b.userData.currentMotion.frame[c].pos),
        b.userData.currentMotion.frame[c].rotq && (b.quaternion.fromArray(b.userData.currentMotion.frame[c].rotq),
        b.userData.initRot.copy(b.quaternion)),
        b.userData.currentMotion.frame[c].scl && b.scale.fromArray(b.userData.currentMotion.frame[c].scl),
        d = b.userData.currentMotion.cues.length - 1; d > -1; d--)
            b.userData.currentMotion.cues[d].frame <= c && !b.userData.currentMotion.cues[d].fired && (b.userData.currentMotion.cues[d].fired = !0,
            b.userData.currentMotion.cues[d].method());
        b.updateMatrix()
    }
}
function delegate(a, b) {
    return function() {
        return b.apply(a, arguments)
    }
}
function initMotion(obj, data) {
    var k, cue, j;
    if (data.motion)
        for (obj.userData.currentFrame = 0,
        obj.userData.motions = {},
        k = 0; k < data.motion.length; k++) {
            for (cue = [],
            j = 0; j < data.motion[k].cue.length; j++)
                cue[j] = {
                    frame: data.motion[k].cue[j].frame,
                    fired: !1,
                    method: eval("delegate(obj," + decodeURIComponent(data.motion[k].cue[j].method) + ")")
                };
            obj.userData.motions[data.motion[k].id] = {
                id: data.motion[k].id,
                frame: data.motion[k].frame,
                cues: cue
            }
        }
}
function initObject(data, parent, scene) {
    var obj, mat, geom, k, j;
    switch (data.shader && (mat = _shaders[data.shader].clone(),
    mat.uniforms.time = globalUniforms.time,
    mat.uniforms.resolution = globalUniforms.resolution,
    mat.defines = {},
    "TREE" == data.shader && (mat.uniforms.force = globalUniforms.force),
    data.color && (mat.uniforms.color = {
        value: new THREE.Color(data.color)
    }),
    data.opacity && (mat.transparent = !0,
    mat.uniforms.opacity.value = data.opacity),
    data.image && (mat.defines.USE_TEXTURE = 1,
    mat.uniforms.diffuse = {
        value: getTexture(data.image)
    }),
    data.noise && (mat.uniforms.noise = {
        value: getTexture("noise")
    }),
    data.env && (mat.defines.USE_ENV = 1,
    mat.uniforms.envMap = {
        value: isNaN(data.env) ? getTexture(data.env) : effectBuffer[1].texture
    }),
    data.normal && (mat.extensions.derivatives = !0,
    mat.defines.USE_NORMALMAP = 1,
    mat.uniforms.normalMap = {
        value: getTexture(data.normal)
    },
    mat.uniforms.normalScale = {
        value: new THREE.Vector2(1.5,1.5)
    }),
    data.side && (mat.side = THREE.DoubleSide)),
    data.type) {
    case 0:
        obj = new THREE.Object3D;
        break;
    case 1:
        obj = new THREE.Mesh(getGeometry(data["geometry"]),mat);
        break;
    case 2:
        obj = new THREE.Mesh(getGeometry(data["geometry"]),mat),
        mat.defines.USE_INSTANCE = 1,
        obj.frustumCulled = !1;
        break;
    case 3:
        obj = new THREE.SkinnedMesh((new THREE.JSONLoader).parse(loaderQueue.getResult(data["geometry"])).geometry,mat),
        obj.userData.mixer = new THREE.AnimationMixer(obj),
        obj.userData.mixer.clipAction(obj.geometry.animations[0]).play(),
        mat.skinning = !0;
        break;
    case 4:
        obj = new THREE.Mesh(getGeometry(data["geometry"]),mat),
        obj.userData.morph = data.morph,
        obj.userData.currentGeometry = data.start,
        obj.userData.endGeometry = data.morph.length - 1,
        obj.onAfterRender = _animations["MORPH"];
        break;
    case 5:
        geom = getGeometry(data["geometry"]),
        geom || (geom = getParticle(data.range, data.count, data["geometry"])),
        obj = new THREE.Points(geom,mat),
        obj.frustumCulled = !1,
        obj.renderOrder = 1e3
    }
    if (obj.position.fromArray(data.position),
    obj.quaternion.fromArray(data.quaternion),
    obj.scale.fromArray(data.scale),
    obj.matrixAutoUpdate = 1 == data.move ? !0 : !1,
    obj.updateMatrix(),
    obj.name = data.id,
    obj.scene = scene,
    obj.userData.initPosition = obj.position.clone(),
    obj.userData.initRot = obj.quaternion.clone(),
    obj.userData.body = obj,
    data.click && (obj.userData.mouseEnabled = !0,
    obj.userData.onClick = eval("delegate(obj," + decodeURIComponent(data.click) + ")"),
    scene.clicks.push(obj)),
    obj.userData.speed = .2,
    obj.userData.delay = 1e3 * Math.random(),
    obj.userData.range = 20 * Math.random() + 10,
    obj.userData.axis = new THREE.Vector3(Math.random() - .5,Math.random() - .5,Math.random() - .5).normalize(),
    data.animation && (obj.onBeforeRender = _animations[data.animation]),
    data.hide && (obj.visible = !1),
    data.event)
        for (k = 0; k < data.event.length; k++)
            dispatcher.addEventListener(data.event[k].event, eval("delegate(obj," + decodeURIComponent(data.event[k].method) + ")"));
    for (initMotion(obj, data),
    parent.add(obj),
    obj.renderOrder = data.renderOrder ? obj.getWorldPosition().z : data.renderOrder,
    j = 0; j < data.children.length; j++)
        initObject(data.children[j], obj, scene);
    return data.init && eval("delegate(obj," + decodeURIComponent(data.init) + ")()"),
    obj
}
function initEvent() {
    dispatcher = new createjs.EventDispatcher
}
function updateCamera() {
    for (var a in scenes)
        scenes[a].camera.aspect = viewWth / viewHgh,
        scenes[a].camera.updateProjectionMatrix()
}
function initScene(a) {
    var b, c, d;
    for (b = 0; b < a.length; b++)
        c = new THREE.Scene,
        c.sid = a[b].id,
        c.camera = new THREE.PerspectiveCamera(65,1,.001,1e3),
        c.camera.name = a[b].id + ".CAMERA",
        c.camera.scene = c,
        a[b].camera ? (c.camera.position.fromArray(a[b].camera.position),
        c.camera.quaternion.fromArray(a[b].camera.quaternion),
        c.camera.updateMatrix(),
        initMotion(c.camera, a[b].camera),
        c.freeMode = a[b].camera.freeMode,
        c.orbitMode = a[b].camera.orbitMode,
        c.freeMode ? (c.cameraLook = new THREE.Camera,
        c.pitchObject = new THREE.Object3D,
        c.pitchObject.add(c.cameraLook),
        c.yawObject = new THREE.Object3D,
        c.yawObject.add(c.pitchObject),
        c.add(c.yawObject),
        c.camera.matrixAutoUpdate = !0) : c.orbitMode) : (c.camera.position.set(0, 0, 10.55),
        c.camera.matrixAutoUpdate = !1,
        c.camera.updateMatrix()),
        c.camera.userData.initRot = c.camera.quaternion.clone(),
        c.camera.userData.body = c.camera,
        c.cameraOut = new THREE.PerspectiveCamera(65,1,.001,1e3),
        c.cameraOut.aspect = viewWth / viewHgh,
        c.cameraOut.updateProjectionMatrix(),
        c.cameraOut.position.copy(c.camera.position),
        c.cameraOut.quaternion.copy(c.camera.quaternion),
        c.uploaded = !1,
        c.clicks = [],
        c.userData.color1 = a[b].color1,
        c.userData.color2 = a[b].color2,
        initObject(a[b], c, c),
        d = new THREE.PointLight(4473924,1,15e3,1),
        d.position.set(0, 4e3, 4e3),
        d.matrixAutoUpdate = !1,
        d.updateMatrix(),
        c.add(d),
        c.add(new THREE.AmbientLight(14540253)),
        scenes[a[b].id] = c
}
function disposeObject(a) {
    for (; a.children.length; )
        disposeObject(a.children[0]),
        a.remove(a.children[0]);
    a.isMesh && 36 == a.geometry.name.length && (removeGeometry(a.geometry.name),
    a.material.uniforms && "undefined" != typeof a.material.uniforms.diffuse && a.material.uniforms.diffuse.value && removeTexture(a.material.uniforms.diffuse.value.name))
}
function disposeScene(a) {
    for (console.log("dispose scene:", a); scenes[a].children.length; )
        disposeObject(scenes[a].children[0]),
        scenes[a].remove(scenes[a].children[0])
}
function initStage(a) {
    var b = loaderQueue.getResult(a);
    initGeometry(b.basic),
    initInstancedGeometry(b.instanced),
    initScene(b.scene),
    loaderQueue.remove(a)
}
function initBG() {
    scenebg = new THREE.Scene,
    scenebg.userData.mat = _shaders["BG"];
    var a = new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2),scenebg.userData.mat);
    scenebg.add(a),
    scenebg.camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1),
    scenebg.autoUpdate = !1
}
function hideScene(a) {
    scenes[a].visible = !1,
    mouseEnabled = !0
}
function showScene(a) {
    viewNeedsUpdate = !0,
    scenes[a].visible = !0,
    currentScene = scenes[a],
    nextScene = null,
    dispatcher.dispatchEvent("onSceneChange")
}
function gotoScene(a) {
    currentScene != scenes[a] && (currentScene = scenes[a],
    dispatcher.dispatchEvent("onSceneChange"),
    freeMouse(),
    camCtrl.reset())
}
function finishMixScene() {
    globalUniforms.percent.value = cameraView = "STAGE2" == currentScene.sid ? 1 : 0,
    freeMouse(),
    dispatcher.dispatchEvent("onSceneChange")
}
function mixtoScene(a) {
    camCtrl.reset(),
    lockMouse(),
    createjs.Tween.get(fxaaPass.brightness, {
        override: !0
    }).to({
        value: 1
    }, 500, createjs.Ease.sineInOut).call(function() {
        currentScene = nextScene,
        nextScene = null,
        createjs.Tween.get(fxaaPass.brightness, {
            override: !0
        }).to({
            value: 0
        }, 500, createjs.Ease.sineInOut).call(finishMixScene)
    }),
    nextScene = scenes[a],
    dispatcher.dispatchEvent("onScenePrepare")
}
function uploadScene(a) {
    scenes[a] && (scenes[a].uploaded || (scenes[a].uploaded = !0,
    renderer.render(scenes[a], scenes[a].camera, prepareBuffer, !1)))
}
function initLoading() {
    renderer = new THREE.WebGLRenderer({
        antialias: !1
    }),
    renderer.setClearColor(47871, 1),
    renderer.setPixelRatio(viewPixelRatio),
    renderer.autoClear = !1,
    D3.appendChild(renderer.domElement),
    gl = renderer.context,
    initEvent(),
    initEffect(),
    initShader(),
    initAnimation(),
    initBG(),
    initControl(),
    onResize(),
    window.addEventListener("resize", onResize),
    clock = new THREE.Clock,
    createjs.Ticker.setFPS(60),
    initStage("loading"),
    start(),
    prepareContent()
}
function start() {
    showScene("LOADING"),
    animate()
}
function initControl() {
    D3.addEventListener("touchstart", onTouchStart),
    D3.addEventListener("touchmove", onTouchMove),
    D3.addEventListener("touchend", onTouchEnd),
    mouseRay = new THREE.Raycaster,
    mouseEnabled = !0,
    mouseMoved = !1,
    mousePosition = new THREE.Vector2,
    oldPosition = new THREE.Vector2,
    oldDelta = new THREE.Vector2,
    camRot = new THREE.Vector2,
    camCtrl = new THREE.OrientControls,
    camWake = 100,
    rotSpring = 1,
    mouseForce = 0,
    mouseDelta = 0,
    $("#BTN2").bind("click", function() {
        switchCamera()
    }),
    $(".index").bind("click", function() {
        uploadScene("STAGE1"),
        lockMouse(),
        showRule()
    })
}
function lockCamera() {
    rotSpring = 0,
    isFreeLook = !1,
    createjs.Tween.get(camRot, {
        override: !0
    }).to({
        x: 0,
        y: 0
    }, 1e3, createjs.Ease.sineIn)
}
function freeCamera() {
    isFreeLook = !0,
    rotSpring = 1
}
function lockMouse() {
    mouseNeedsRefresh = !0,
    mouseEnabled = !1,
    mouseMoved = !0
}
function freeMouse() {
    mouseEnabled = !0,
    mouseMoved = !0
}
function onTouchStart(a) {
    a.preventDefault(),
    a.stopPropagation(),
    mouseEnabled && (mousePosition.set(a.touches[0].clientX, a.touches[0].clientY),
    oldPosition.copy(mousePosition),
    mouseNeedsRefresh = !1,
    mouseMoved = !1,
    isFreeLook && createjs.Tween.removeTweens(camRot))
}
function onTouchMove(a) {
    var b, c;
    mouseEnabled && !mouseNeedsRefresh && (isFreeLook && (camRot.y -= .004 * (mousePosition.x - a.touches[0].clientX),
    camRot.x -= .004 * (mousePosition.y - a.touches[0].clientY),
    camRot.x = Math.max(-1, Math.min(1, camRot.x)),
    camWake = 100),
    mousePosition.set(a.touches[0].clientX, a.touches[0].clientY),
    b = mousePosition.x - oldPosition.x,
    c = mousePosition.y - oldPosition.y,
    mouseDelta = b / 900,
    Math.abs(b) + Math.abs(c) > 5 && (mouseMoved = !0))
}
function clickBallon(a) {
    a.userData.mouseEnabled = !1,
    a.parent.userData.speed = 0,
    a.parent.frustumCulled = !1,
    a.parent.getObjectByName("HAND").visible = !1,
    a.scene == scenes["STAGE5"] ? startAnimation(a.parent, "FLYAWAY2") : a.scene == scenes["STAGE2"] ? startAnimation(a.parent, "FLYAWAY") : (a.parent.matrixAutoUpdate = !0,
    createjs.Tween.get(a.parent.scale).to({
        x: 1e-4,
        y: 1e-4,
        z: 1e-4
    }, 1e3, createjs.Ease.backOut).call(function(a) {
        a.visible = !1
    }, [a.parent])),
    lockMouse(),
    speedTo(0),
    // console.log(a);
    showCard(a.parent.name),
    console.log(a.parent.name, a.parent.name.charAt(1), a.parent.name.charAt(6));
    var b = 5 * (parseInt(a.parent.name.charAt(1)) - 1) + parseInt(a.parent.name.charAt(6));
    // trackEvent("click", "Button", "collect" + b)
}
function onTouchEnd() {
    var b, c;
    if (isFreeLook && createjs.Tween.get(camRot, {
        override: !0
    }).wait(2e3).to({
        x: 0,
        y: 0
    }, 2e3, createjs.Ease.quartInOut),
    !mouseMoved && !mouseNeedsRefresh && mouseEnabled) {
        for (mousePosition.set(2 * (mousePosition.x / viewWth) - 1, 2 * -(mousePosition.y / viewHgh) + 1),
        mouseRay.setFromCamera(mousePosition, currentScene.cameraOut),
        b = [],
        c = currentScene.clicks.length - 1; c > -1; c--)
            if (currentScene.clicks[c].userData.mouseEnabled && (currentScene.clicks[c].updateMatrixWorld(),
            currentScene.clicks[c].raycast(mouseRay, b),
            b.length > 0)) {
                currentScene.clicks[c].userData.onClick();
                break
            }
        dispatcher.dispatchEvent("onClick")
    }
}
function animate() {
    requestAnimationFrame(animate),
    render()
}
function speedTo(a) {
    createjs.Tween.get(globalUniforms.speed, {
        override: !0
    }).to({
        value: a
    }, 500, createjs.Ease.sineInOut)
}
function cameraTo(a) {
    cameraView = a,
    createjs.Tween.get(camRot, {
        override: !0
    }).to({
        x: 0,
        y: 0
    }, 1e3, createjs.Ease.sineInOut),
    createjs.Tween.get(globalUniforms.percent, {
        override: !0
    }).to({
        value: a
    }, 1e3, createjs.Ease.sineInOut)
}
function switchCamera() {
    globalUniforms.spring.value = 0,
    createjs.Tween.get(globalUniforms.spring, {
        override: !0
    }).to({
        value: 1
    }, 500, createjs.Ease.quartIn),
    0 == cameraView ? cameraTo(1) : cameraTo(0)
}
function renderCamera(a) {
    var d, e, f, g, h, i, j, b = a.userData.motions["GROUND"].frame, c = a.userData.motions["SKY"].frame;
    for (a.userData.currentFrame += .5 * globalUniforms.fps.value * globalUniforms.speed.value,
    a.userData.currentFrame = Math.min(a.userData.currentFrame, b.length - 1),
    d = Math.floor(a.userData.currentFrame),
    e = Math.ceil(a.userData.currentFrame),
    f = (new THREE.Vector3).fromArray(b[d].pos),
    g = (new THREE.Vector3).fromArray(b[e].pos),
    f = f.lerp(g, a.userData.currentFrame - d),
    h = (new THREE.Vector3).fromArray(c[d].pos),
    i = (new THREE.Vector3).fromArray(c[e].pos),
    h = h.lerp(i, a.userData.currentFrame - d),
    a.position.copy(f.lerp(h, globalUniforms.percent.value)),
    0 == cameraView ? a.rotation.fromArray(b[d].rot) : a.rotation.fromArray(c[d].rot),
    j = a.userData.motions["GROUND"].cues.length - 1; j > -1; j--)
        a.userData.motions["GROUND"].cues[j].frame <= e && !a.userData.motions["GROUND"].cues[j].fired && (a.userData.motions["GROUND"].cues[j].fired = !0,
        a.userData.motions["GROUND"].cues[j].method())
}
function renderScene(a, b) {
    var c, d, e;
    a.freeMode ? (renderCamera(a.camera),
    a.pitchObject.rotation.x = camRot.x + a.camera.rotation.x + .006 * camCtrl.deltaX * rotSpring,
    a.yawObject.rotation.y = camRot.y + a.camera.rotation.y + .006 * camCtrl.deltaY * rotSpring,
    a.cameraOut.position.copy(a.camera.position),
    mouseEnabled ? a.cameraOut.quaternion.slerp(a.cameraLook.getWorldQuaternion(), .1 * globalUniforms.spring.value) : a.cameraOut.quaternion.copy(a.cameraLook.getWorldQuaternion())) : a.orbitMode ? a.camera.userData.currentMotion ? a.cameraOut.position.lerp(a.camera.position, .3) : (c = new THREE.Vector3(Math.min(3, Math.max(-3, camCtrl.deltaY / 10 * rotSpring)),0,0).applyQuaternion(a.camera.quaternion),
    a.cameraOut.position.x = a.camera.position.x + c.x,
    a.cameraOut.position.y = a.camera.position.y + Math.min(3, Math.max(-3, camCtrl.deltaX / 10 * rotSpring)),
    a.cameraOut.position.z = a.camera.position.z + c.z,
    d = new THREE.Matrix4,
    d.lookAt(a.cameraOut.position, new THREE.Vector3(0,0,0), a.cameraOut.up),
    e = (new THREE.Quaternion).setFromRotationMatrix(d),
    a.cameraOut.quaternion.slerp(e, .6)) : a.camera.userData.currentMotion ? a.cameraOut.position.lerp(a.camera.position, .3) : (a.cameraOut.position.x += .3 * (a.camera.position.x + Math.min(2, Math.max(-2, camCtrl.deltaY / 20 * rotSpring)) - a.cameraOut.position.x),
    a.cameraOut.position.y += .3 * (a.camera.position.y + Math.min(2, Math.max(-2, camCtrl.deltaX / 20 * rotSpring)) - a.cameraOut.position.y),
    a.cameraOut.position.z += .3 * (a.camera.position.z - a.cameraOut.position.z),
    d = new THREE.Matrix4,
    d.lookAt(a.cameraOut.position, new THREE.Vector3(0,0,3), a.cameraOut.up),
    e = (new THREE.Quaternion).setFromRotationMatrix(d),
    a.cameraOut.quaternion.slerp(e, .3)),
    renderer.render(scenebg, scenebg.camera, b, !0),
    renderer.render(a, a.cameraOut, b, !1)
}
function render() {
    globalUniforms.delta.value = clock.getDelta(),
    globalUniforms.fps.value = Math.min(3, globalUniforms.delta.value / .0167),
    globalUniforms.time.value = clock.getElapsedTime() % 1e4,
    scenebg.userData.mat.uniforms.color1.value.set(currentScene.userData.color1),
    scenebg.userData.mat.uniforms.color2.value.set(currentScene.userData.color2),
    renderer.render(scenebg, scenebg.camera, effectBuffer[0], !0),
    renderScene(currentScene, effectBuffer[0]),
    blurPass.render(sceneBlurBuffer),
    hdrPass.render(effectBuffer[1]),
    fxaaPass.render(null, !0),
    rotSpring += Math.abs(oldDelta.y - camCtrl.deltaY) > 1 ? .3 * (1 - rotSpring) : .005 * (0 - rotSpring),
    oldDelta.set(camCtrl.deltaX, camCtrl.deltaY),
    mouseDelta += .3 * (0 - mouseDelta);
    var a = .1 * (mouseDelta - globalUniforms.force.value);
    mouseForce += a,
    mouseForce *= .9,
    globalUniforms.force.value += mouseForce
}
var renderer, viewWth, viewHgh, viewHlfWth, viewHlfHgh, fxaaPass, camRot, currentScene, nextScene, viewPixelRatio = Math.max(1.5, window.devicePixelRatio - .5), viewDir = 0, globalUniforms = {
    time: {
        value: 0
    },
    delta: {
        value: 0
    },
    fps: {
        value: 0
    },
    progress: {
        value: 0
    },
    speed: {
        value: 1
    },
    percent: {
        value: 0
    },
    spring: {
        value: 1
    },
    force: {
        value: 0
    }
}, isContentLoaded = !1, _texs = {}, _geoms = {}, scenes = {}, isFreeLook = !0, cameraView = 0;
prepareLoading();
