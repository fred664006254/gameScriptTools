var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SnapshotUtil = (function () {
    function SnapshotUtil() {
    }
    SnapshotUtil.start = function (npcPicName) {
        var url = App.ResourceUtil.getResFullUrlByKey(npcPicName);
        this.initUi();
        this.initNpc(url);
        this.initVideo();
        this.bottomDoingDiv.style.display = "inline";
        this.bottomConfirmDiv.style.display = "none";
    };
    SnapshotUtil.initUi = function () {
        var player = document.getElementsByClassName("egret-player")[0];
        player.style.display = "none";
        //大div
        this.bigDiv = document.createElement("div");
        this.bigDiv.style.width = "100%";
        this.bigDiv.style.height = "100%";
        this.bigDiv.style.position = "absolute";
        document.body.appendChild(this.bigDiv);
        //红颜或门客所在div
        this.videoDiv = document.createElement("div");
        this.videoDiv.style.width = "100%";
        this.videoDiv.style.height = "100%";
        this.videoDiv.style.position = "absolute";
        this.bigDiv.appendChild(this.videoDiv);
        //红颜或门客所在div
        this.npcDiv = document.createElement("div");
        this.npcDiv.style.width = "100%";
        this.npcDiv.style.height = "100%";
        this.npcDiv.style.position = "absolute";
        this.bigDiv.appendChild(this.npcDiv);
        // 屏幕宽度和设计宽度的一个比值
        this.scale = this.bigDiv.offsetWidth / 640;
        // 底部按钮区容器
        this.bottomDiv = document.createElement("div");
        this.bottomDiv.style.height = (this.scale * 188) + "px";
        this.bottomDiv.style.width = "100%";
        this.bottomDiv.style.position = "absolute";
        this.bottomDiv.style.left = "0px";
        this.bottomDiv.style.bottom = "0px";
        this.bottomDiv.style.backgroundColor = "black";
        this.bigDiv.appendChild(this.bottomDiv);
        // 底部按钮区要拍呀
        this.bottomDoingDiv = document.createElement("div");
        this.bottomDoingDiv.style.height = "100%";
        this.bottomDoingDiv.style.width = "100%";
        this.bottomDoingDiv.style.position = "absolute";
        this.bottomDiv.appendChild(this.bottomDoingDiv);
        // 底部按钮区拍完了
        this.bottomConfirmDiv = document.createElement("div");
        this.bottomConfirmDiv.style.height = "100%";
        this.bottomConfirmDiv.style.width = "100%";
        this.bottomConfirmDiv.style.position = "absolute";
        this.bottomDiv.appendChild(this.bottomConfirmDiv);
        // 前后摄像头按钮
        var btnConvert = document.createElement("img");
        btnConvert.src = App.ResourceUtil.getResFullUrlByKey("snapshotview_convert");
        btnConvert.width = this.scale * 100;
        btnConvert.style.position = "absolute";
        btnConvert.style.left = "18%";
        btnConvert.style.top = "50%";
        btnConvert.style.marginLeft = (-50 * this.scale) + "px";
        btnConvert.style.marginTop = (-50 * this.scale) + "px";
        btnConvert.onclick = this.convertClick.bind(this);
        this.bottomDoingDiv.appendChild(btnConvert);
        // 拍照按钮
        var btnDo = document.createElement("img");
        btnDo.src = App.ResourceUtil.getResFullUrlByKey("snapshotview_do");
        btnDo.width = this.scale * 100;
        btnDo.style.position = "absolute";
        btnDo.style.left = "50%";
        btnDo.style.top = "50%";
        btnDo.style.marginLeft = (-50 * this.scale) + "px";
        btnDo.style.marginTop = (-50 * this.scale) + "px";
        btnDo.onclick = this.doClick.bind(this);
        this.bottomDoingDiv.appendChild(btnDo);
        // 返回按钮
        var btnBack = document.createElement("img");
        btnBack.src = App.ResourceUtil.getResFullUrlByKey("snapshotview_back");
        btnBack.width = this.scale * 100;
        btnBack.style.position = "absolute";
        btnBack.style.right = "18%";
        btnBack.style.top = "50%";
        btnBack.style.marginRight = (-50 * this.scale) + "px";
        btnBack.style.marginTop = (-50 * this.scale) + "px";
        btnBack.onclick = this.backClick.bind(this);
        this.bottomDoingDiv.appendChild(btnBack);
        // 重来按钮
        var btnCancel = document.createElement("img");
        btnCancel.src = App.ResourceUtil.getResFullUrlByKey("snapshotview_cancel");
        btnCancel.width = this.scale * 100;
        btnCancel.style.position = "absolute";
        btnCancel.style.left = "18%";
        btnCancel.style.top = "50%";
        btnCancel.style.marginLeft = (-50 * this.scale) + "px";
        btnCancel.style.marginTop = (-50 * this.scale) + "px";
        btnCancel.onclick = this.cancelClick.bind(this);
        this.bottomConfirmDiv.appendChild(btnCancel);
        // 确认按钮
        var btnOk = document.createElement("img");
        btnOk.src = App.ResourceUtil.getResFullUrlByKey("snapshotview_save");
        btnOk.width = this.scale * 100;
        btnOk.style.position = "absolute";
        btnOk.style.left = "50%";
        btnOk.style.top = "50%";
        btnOk.style.marginLeft = (-50 * this.scale) + "px";
        btnOk.style.marginTop = (-50 * this.scale) + "px";
        btnOk.onclick = this.okClick.bind(this);
        this.bottomConfirmDiv.appendChild(btnOk);
        // 返回按钮
        var btnBack2 = document.createElement("img");
        btnBack2.src = App.ResourceUtil.getResFullUrlByKey("snapshotview_back");
        btnBack2.width = this.scale * 100;
        btnBack2.style.position = "absolute";
        btnBack2.style.right = "18%";
        btnBack2.style.top = "50%";
        btnBack2.style.marginRight = (-50 * this.scale) + "px";
        btnBack2.style.marginTop = (-50 * this.scale) + "px";
        btnBack2.onclick = this.backClick.bind(this);
        this.bottomConfirmDiv.appendChild(btnBack2);
        this.debugDiv = document.createElement("div");
        document.body.appendChild(this.debugDiv);
    };
    SnapshotUtil.initNpc = function (url) {
        var _this = this;
        this.npcImg = document.createElement("img");
        this.npcImg.src = url;
        this.npcImg.style.transform = "rotate(90deg)";
        this.npcImg.style.position = "absolute";
        this.npcImg.width = 400 * this.scale;
        this.npcImg.style.left = "0px";
        this.npcDiv.appendChild(this.npcImg);
        var imgPosWhenStartY;
        var touchPosWhenStartX;
        var touchPosWhenStartY;
        this.npcImg.addEventListener('touchstart', function (event) {
            // 如果这个元素的位置内只有一个手指的话
            if (event.targetTouches.length == 1) {
                event.preventDefault(); // 阻止浏览器默认事件，重要 
                var touch = event.targetTouches[0];
                touchPosWhenStartX = touch.pageX;
                touchPosWhenStartY = touch.pageY;
                imgPosWhenStartY = Number(_this.npcImg.style.top.substr(0, _this.npcImg.style.top.indexOf("px")));
            }
        }, false);
        this.npcImg.addEventListener('touchmove', function (event) {
            // 如果这个元素的位置内只有一个手指的话
            if (event.targetTouches.length == 1) {
                event.preventDefault(); // 阻止浏览器默认事件，重要 
                var touch = event.targetTouches[0];
                // 把元素放在手指所在的位置
                _this.npcImg.style.top = (imgPosWhenStartY + (touch.pageY - touchPosWhenStartY)) + 'px';
            }
        }, false);
    };
    /** 点击了拍照 */
    SnapshotUtil.doClick = function () {
        this.bottomDoingDiv.style.display = "none";
        this.bottomConfirmDiv.style.display = "inline";
    };
    /** 点击了取消 */
    SnapshotUtil.cancelClick = function () {
        this.bottomDoingDiv.style.display = "inline";
        this.bottomConfirmDiv.style.display = "none";
    };
    /** 点击了保存 */
    SnapshotUtil.okClick = function () {
        this.bigDiv.remove();
        var player = document.getElementsByClassName("egret-player")[0];
        player.style.display = "inline";
    };
    /** 点击了返回 */
    SnapshotUtil.backClick = function () {
        this.bigDiv.remove();
        var player = document.getElementsByClassName("egret-player")[0];
        player.style.display = "inline";
    };
    /** 点击了前后摄像头切换 */
    SnapshotUtil.convertClick = function () {
    };
    /** 开始照相 */
    SnapshotUtil.initVideo = function () {
        var _this = this;
        this.debugDiv.textContent += ("initVideo");
        (new Promise(function (resolve, reject) {
            _this.debugDiv.textContent += ("createElement");
            _this.videoElement = document.createElement('video');
            _this.videoElement.setAttribute('playsinline', 'playsinline');
            _this.videoElement.setAttribute("width", "480"); //设置视频播放器的宽高 
            _this.videoElement.setAttribute("height", "640"); //设置视频播放器的宽高 
            _this.videoElement.style.position = "absolute";
            _this.videoElement.style.transform = "rotateY(180deg)";
            _this.videoDiv.appendChild(_this.videoElement);
            resolve(true);
        })).then(function () {
            _this.debugDiv.textContent += ("many if");
            var ve = { audio: false, video: true };
            if (!navigator) {
                _this.debugDiv.textContent += ("no navigator " + window.location.protocol);
            }
            else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                _this.debugDiv.textContent += ("if 1");
                //调用用户媒体设备，访问摄像头
                new Promise(function (resolve, reject) {
                    navigator.mediaDevices.getUserMedia(ve).then(function (stream) {
                        _this.videoElement.srcObject = stream;
                        _this.videoElement.play();
                    });
                });
            }
            else if (navigator.getUserMedia) {
                _this.debugDiv.textContent += ("if 2");
                new Promise(function (resolve, reject) {
                    navigator.getUserMedia(ve, function (stream) {
                        _this.videoElement.srcObject = stream;
                        _this.videoElement.play();
                    }, _this.error.bind(_this));
                });
            }
            else if (navigator["webkitGetUserMedia"]) {
                _this.debugDiv.textContent += ("if 3");
                new Promise(function (resolve, reject) {
                    navigator["webkitGetUserMedia"](ve).then(function (stream) {
                        _this.videoElement.srcObject = stream;
                        _this.videoElement.play();
                    });
                });
            }
            else if (navigator["mozGetUserMedia"]) {
                _this.debugDiv.textContent += ("if 4");
                new Promise(function (resolve, reject) {
                    navigator["mozGetUserMedia"](ve).then(function (stream) {
                        _this.videoElement.srcObject = stream;
                        _this.videoElement.play();
                    });
                });
            }
            else {
                _this.debugDiv.textContent += ("if 5");
                console.info("你的浏览器不支持访问用户媒体设备");
            }
        });
    };
    //异常的回调函数
    SnapshotUtil.error = function (error) {
        console.log("访问用户媒体设备失败：", error.name, error.message);
    };
    return SnapshotUtil;
}());
__reflect(SnapshotUtil.prototype, "SnapshotUtil");
