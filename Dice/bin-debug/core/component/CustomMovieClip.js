var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * Created by Saco on 2015/5/27.
 */
var CustomMovieClip = (function (_super) {
    __extends(CustomMovieClip, _super);
    /**
     * @autoDispose 是否支持从舞台移除时候自动释放对象，默认不释放
     */
    function CustomMovieClip() {
        var _this = _super.call(this, null) || this;
        _this._frameImages = [];
        _this._frameRate = 60;
        _this._timeRate = 0.001; //按时间播放
        _this._playingIndex = 0;
        _this._playCount = 0;
        _this.isPlaying = false;
        _this._endFunc = null;
        _this._frameFunc = [];
        _this._removeStop = false;
        _this._autoDispose = false;
        _this._playFrameTime = 0; //上次回调总时间
        _this._playFrameSpace = 100; //回调间隔时间，控制帧频。(单位毫秒)
        _this._playFrame = []; //帧数
        _this.imageNamePre = ""; //资源前缀
        _this.frameEnd = 0;
        return _this;
    }
    Object.defineProperty(CustomMovieClip.prototype, "sheetName", {
        set: function (sheetName) {
            this._frameImages = RES["configInstance"].keyMap[sheetName].subkeys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMovieClip.prototype, "frameImages", {
        set: function (textureNames) {
            this._frameImages = textureNames;
            if (this._frameImages[0].indexOf("monster") == 0 || this._frameImages[0].indexOf("boss100") == 0 || this._frameImages[0].indexOf("bthiteffect") > -1) {
            }
            else {
                if (this.__groupName) {
                    ResMgr.destroyRes(this.__groupName);
                    this.__groupName = null;
                }
                this.__groupName = ResMgr.loadResources(textureNames, [], function () { }, null, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMovieClip.prototype, "frameRate", {
        set: function (rate) {
            this._frameRate = rate;
            this.stop();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMovieClip.prototype, "playFrameRate", {
        /**
         *
         * @param rate 满帧60，间隔时间
         */
        set: function (rate) {
            if (rate) {
                this._playFrameSpace = rate;
            }
        },
        enumerable: true,
        configurable: true
    });
    CustomMovieClip.prototype.setFrameEvent = function (r, f, o) {
        this._playFrame.push(r);
        this._frameFunc.push(f);
        this._frameObj = o;
    };
    // public retain():void{
    //     this.stop();
    //     this.play(1);
    // }
    CustomMovieClip.prototype.setStopFrame = function (frame) {
        this.texture = ResMgr.getRes(this._frameImages[frame]);
    };
    CustomMovieClip.prototype.setEndFrameAndPlay = function (num) {
        this.frameEnd = num;
    };
    CustomMovieClip.prototype.updateFrame = function (timeStamp) {
        // App.LogUtil.log("QAZ ",this.name);
        if (timeStamp < this._playFrameTime) {
            return false;
        }
        this._playFrameTime = timeStamp + this._playFrameSpace;
        var endNum = this.frameEnd ? this.frameEnd : this._frameImages.length;
        if (this._playingIndex >= endNum) {
            this._playingIndex = 0;
            this._playCount--;
        }
        if (this._playCount <= 0) {
            this.stop();
            this.exceEndCallback();
            return false;
        }
        this.texture = ResMgr.getRes(this._frameImages[this._playingIndex]);
        if (this["anchorX"]) {
            this.anchorOffsetX = this.texture.textureWidth * this["anchorX"];
        }
        if (this["anchorY"]) {
            this.anchorOffsetY = this.texture.textureHeight * this["anchorY"];
        }
        //
        //if(this.texture==null)
        //{
        //    Log.show("QAZ 缺少图片资源::" + this._frameImages[this._playingIndex]);
        //}
        this._playingIndex++;
        for (var i in this._playFrame) {
            var unit = this._playFrame[i];
            if (unit == this._playingIndex) {
                if (this._frameFunc[i] && this._frameObj) {
                    this._frameFunc[i].apply(this._frameObj, [this]);
                }
            }
        }
        return false;
    };
    CustomMovieClip.prototype.exceEndCallback = function () {
        if (this._endFunc && this._endObj) {
            this._endFunc.apply(this._endObj, [this]);
        }
    };
    CustomMovieClip.prototype.goToAndPlay = function (frame) {
        this._playingIndex = frame < 0 ? 0 : frame;
    };
    CustomMovieClip.prototype.stop = function () {
        this.isPlaying = false;
        this._playingIndex = 0;
        this._playCount = 0;
        // egret.stopTick(this.updateFrame,this);
        TickMgr.removeFastTick(this.updateFrame, this);
        // App.TimerManager.remove(this.updateFrame, this);
    };
    CustomMovieClip.prototype.onAddToStage = function () {
        if (this._removeStop) {
            this.playWithTime(this._playCount);
        }
    };
    CustomMovieClip.prototype.onRemoveFromStage = function () {
        this.stop();
        this._removeStop = true;
        if (this._autoDispose) {
            this.dispose();
        }
    };
    CustomMovieClip.prototype.setPosition = function (pointOrX, yOrNull) {
        var firstParamIsPoint = false;
        if (pointOrX != null) {
            if (typeof pointOrX == "number") {
                if (this.x != pointOrX) {
                    this.x = pointOrX;
                }
            }
            else {
                firstParamIsPoint = true;
                if (this.x != pointOrX.x || this.y != pointOrX.y) {
                    this.x = pointOrX.x;
                    this.y = pointOrX.y;
                }
            }
        }
        if (firstParamIsPoint == false && yOrNull != null && this.y != yOrNull) {
            this.y = yOrNull;
        }
    };
    CustomMovieClip.prototype.setScale = function (s) {
        this.scaleX = s;
        this.scaleY = s;
    };
    CustomMovieClip.prototype.setEndCallBack = function (f, o) {
        this._endFunc = f;
        this._endObj = o;
    };
    Object.defineProperty(CustomMovieClip.prototype, "timeRate", {
        //根据时间播放动画
        //
        set: function (rate) {
            this._timeRate = rate;
            this.stop();
            //this.play(this._playCount);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param count 动画播放次数   <=0 循环播放
     */
    CustomMovieClip.prototype.playWithTime = function (count) {
        if (count === void 0) { count = 0; }
        if (this.isPlaying == false) {
            this.isPlaying = true;
            this._playCount = count <= 0 ? 99999 : count;
            // egret.startTick(this.updateFrame,this);
            TickMgr.addFastTick(this.updateFrame, this);
            this.updateFrame(egret.getTimer());
        }
    };
    CustomMovieClip.prototype.setFramesByNamePre = function (imageNamePre, frameCount) {
        if (!imageNamePre) {
            return;
        }
        if (imageNamePre == this.imageNamePre) {
            return;
        }
        this._playCount = 0;
        this.stop();
        var resArr = [];
        frameCount = frameCount || 0;
        if (!frameCount) {
            while (ResMgr.hasRes(imageNamePre + (frameCount + 1))) {
                frameCount++;
                resArr.push(imageNamePre + frameCount);
            }
        }
        else {
            for (var i = 1; i <= frameCount; i++) {
                resArr.push(imageNamePre + i);
            }
        }
        if (ResMgr.getAtlasByResName(imageNamePre + "1") == ResMgr.getAtlasByResName(this.imageNamePre + "1")) {
            this._frameImages = resArr;
        }
        else {
            this.frameImages = resArr;
        }
        this.imageNamePre = imageNamePre;
    };
    CustomMovieClip.prototype.dispose = function () {
        this.stop();
        if (this.__groupName) {
            ResMgr.destroyRes(this.__groupName);
            this.__groupName = null;
        }
        this.imageNamePre = "";
        this._frameImages = [];
        this._frameRate = 60;
        this._timeRate = 0.001; //按时间播放
        this._playingIndex = 0;
        this._playCount = 0;
        this.isPlaying = false;
        this._endFunc = null;
        this._endObj = null;
        this._removeStop = false;
        this.texture = null;
        this._playFrameTime = 0;
        this._playFrameSpace = 50;
        this.frameEnd = 0;
        _super.prototype.dispose.call(this);
    };
    return CustomMovieClip;
}(BaseLoadBitmap));
__reflect(CustomMovieClip.prototype, "CustomMovieClip");
//# sourceMappingURL=CustomMovieClip.js.map