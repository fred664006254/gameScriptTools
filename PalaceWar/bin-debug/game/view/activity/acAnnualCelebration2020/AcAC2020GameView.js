/**
 * 猜拳游戏
 * author shaoliang
 */
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
var AcAC2020GameView = (function (_super) {
    __extends(AcAC2020GameView, _super);
    function AcAC2020GameView() {
        var _this = _super.call(this) || this;
        _this._progressbar1 = null;
        _this._npc = null;
        _this._isMoving = false;
        _this._timeRate = 1;
        _this._win = null;
        _this._shakeStTime = 0;
        _this._isShakeing = false;
        return _this;
    }
    AcAC2020GameView.prototype.getTitleBgName = function () {
        return null;
    };
    AcAC2020GameView.prototype.getTitleStr = function () {
        return null;
    };
    AcAC2020GameView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcAC2020GameView.prototype.getBgName = function () {
        return "acenjoynight_gamebg-1";
    };
    AcAC2020GameView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.y = GameConfig.stageHeigth - this.viewBg.height;
        }
    };
    AcAC2020GameView.prototype.isShowMask = function () {
        return true;
    };
    AcAC2020GameView.prototype.getResourceList = function () {
        var guidePic = [];
        return guidePic.concat([
            "enjoynight_game",
            "acenjoynightgameeffect", "acenjoynight_gamebg-1",
            "progress5", "progress3_bg", "progress3",
        ]);
    };
    AcAC2020GameView.prototype.getPic = function () {
        return this.param.data.pic;
    };
    AcAC2020GameView.prototype.initView = function () {
        var endbg1 = BaseBitmap.create("acen_game_endsbg1");
        this.addChild(endbg1);
        var name1 = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightStoryDesc_19_name1"), 22);
        name1.setPosition(20, endbg1.y + endbg1.height / 2 - name1.height / 2);
        this.addChild(name1);
        this._progressbar1 = ComponentManager.getProgressBar("progress3", "progress3_bg", 480);
        this._progressbar1.setPosition(128, endbg1.y + endbg1.height / 2 - this._progressbar1.height / 2);
        this.addChild(this._progressbar1);
        var endbg2 = BaseBitmap.create("acen_game_endsbg2");
        endbg2.y = GameConfig.stageHeigth - endbg2.height;
        this.addChild(endbg2);
        var name2 = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightStoryDesc_19_name2"), 22);
        name2.setPosition(20, endbg2.y + endbg1.height / 2 - name2.height / 2);
        this.addChild(name2);
        var progressbar2 = ComponentManager.getProgressBar("progress5", "progress3_bg", 480);
        progressbar2.setPosition(128, endbg2.y + endbg1.height / 2 - this._progressbar1.height / 2);
        this.addChild(progressbar2);
        var rect = new egret.Rectangle();
        rect.setTo(0, 0, 640 * 0.55, 840 * 0.55);
        this._npc = BaseLoadBitmap.create(this.getPic(), rect);
        this._npc.setPosition(GameConfig.stageWidth / 2 - this._npc.width / 2, GameConfig.stageHeigth - 385 - this._npc.height - 27);
        this.addChild(this._npc);
        for (var i = 1; i <= 3; i++) {
            var btn = ComponentManager.getButton("acen_game_btn" + i, null, this.gameHandle, this, [i]);
            btn.setPosition(95 + (i - 1) * 148, GameConfig.stageHeigth - 210);
            this.addChild(btn);
        }
    };
    AcAC2020GameView.prototype.gameHandle = function (i) {
        var _this = this;
        if (this._isMoving == true) {
            return;
        }
        this._isMoving = true;
        var container1 = new BaseDisplayObjectContainer();
        container1.setPosition(-1000, GameConfig.stageHeigth / 2 - 110);
        this.addChild(container1);
        var middlebg1 = BaseBitmap.create("acen_game_middlebg1");
        container1.addChild(middlebg1);
        var hand1 = BaseBitmap.create("acen_game_icon" + i);
        hand1.setPosition(0, middlebg1.height / 2 - hand1.height / 2);
        container1.addChild(hand1);
        var container2 = new BaseDisplayObjectContainer();
        this.addChild(container2);
        var middlebg2 = BaseBitmap.create("acen_game_middlebg2");
        container2.addChild(middlebg2);
        container2.setPosition(GameConfig.stageWidth - middlebg2.width + 1000, GameConfig.stageHeigth / 2 - 130);
        var i2 = i == 3 ? 1 : i + 1;
        var hand2 = BaseBitmap.create("acen_game_icon" + i2);
        hand2.setPosition(middlebg2.width, middlebg2.height / 2 - hand2.height / 2);
        hand2.scaleX = -1;
        container2.addChild(hand2);
        //光 
        var light = BaseBitmap.create("acen_game_light");
        light.setScale(1.7);
        light.setPosition(GameConfig.stageWidth / 2 - light.width / 2 * 1.7, GameConfig.stageHeigth / 2 - light.height / 2 * 1.7);
        this.addChild(light);
        var lightx1 = GameConfig.stageWidth / 2 - light.width / 2;
        var lighty1 = GameConfig.stageHeigth / 2 - light.height / 2;
        light.alpha = 0;
        //飞入
        var posx1 = 0;
        var posy1 = container1.y;
        var posx1_2 = posx1 + 10;
        var posy1_2 = posy1 + 17;
        var posx2 = GameConfig.stageWidth - middlebg2.width;
        var posy2 = container2.y;
        var posx2_2 = posx2 - 10;
        var posy2_2 = posy2 - 17;
        //飞入时间
        var t1 = 200 * this._timeRate;
        //等待时间
        var t2 = 170 * this._timeRate;
        //移动
        var t3 = 1500 * this._timeRate;
        //飞出
        var t4 = 100 * this._timeRate;
        var view = this;
        var lightT1 = 70 * this._timeRate;
        var lightT2 = t2 + t3 - lightT1;
        egret.Tween.get(container1).wait(500).
            to({ x: posx1 }, t1).call(function () {
            view.playAnim();
            light.alpha = 1;
            egret.Tween.get(light).to({ x: lightx1, y: lighty1, scaleX: 1, scaleY: 1 }, lightT1).wait(lightT2).to({ alpha: 0 }, t4);
        }).
            wait(t2).
            to({ x: posx1_2, y: posy1_2 }, t3).call(this.play2, this).
            to({ x: posx1_2 - 1000 }, t4).call(function () {
            ViewController.getInstance().openView(ViewConst.COMMON.ACAC2020DRINKVIEW, {
                callBack: _this.hide,
                obj: view
            });
        }); //.wait(1000).call(this.hide,this);
        egret.Tween.get(container2).wait(500).
            to({ x: posx2 }, t1).
            wait(t2).
            to({ x: posx2_2, y: posy2_2 }, t3).
            to({ x: posx2 + 1000 }, t4);
    };
    AcAC2020GameView.prototype.playAnim = function () {
        // this._npc.texture = ResourceManager.getRes("acenjoynight_gamer2-1");
        this._progressbar1.setPercentage(0);
        var clip = ComponentManager.getCustomMovieClip("acenjoynightgameeffect", 10, 30 * this._timeRate);
        var temppic = BaseBitmap.create("acenjoynightgameeffect1");
        clip.setPosition(GameConfig.stageWidth / 2 - temppic.width / 2, GameConfig.stageHeigth / 2 - temppic.height / 2);
        BaseBitmap.release(temppic);
        this.addChild(clip);
        var win = BaseBitmap.create("acen_game_win");
        this.addChild(win);
        this._win = win;
        var winx1 = GameConfig.stageWidth / 2 - win.width / 2;
        var winy1 = GameConfig.stageHeigth / 2 - win.height / 2;
        var winx2 = GameConfig.stageWidth / 2 - win.width / 2 * 20;
        var winy2 = GameConfig.stageHeigth / 2 - win.height / 2 * 20;
        var winx3 = GameConfig.stageWidth / 2 - win.width / 2 * 1.2;
        var winy3 = GameConfig.stageHeigth / 2 - win.height / 2 * 1.2;
        var winx4 = GameConfig.stageWidth / 2 - win.width / 2 * 0.7;
        var winy4 = GameConfig.stageHeigth / 2 - win.height / 2 * 0.7;
        win.setPosition(winx2, winy2);
        // win.alpha = 0.2;
        win.setScale(20);
        var t1 = 170 * this._timeRate;
        var t2 = 70 * this._timeRate;
        var t3 = 70 * this._timeRate;
        var view = this;
        egret.Tween.get(win).
            to({ x: winx4, y: winy4, alpha: 1, scaleX: 0.7, scaleY: 0.7 }, t1).call(function () {
            clip.setEndCallBack(function () {
                clip.visible = false;
                egret.stopTick(view.shakeScreen, view);
            }, view);
            clip.playWithTime(1);
            view.stopshakeScreen();
        }).
            to({ x: winx3, y: winy3, scaleX: 1.2, scaleY: 1.2 }, t2).
            to({ x: winx1, y: winy1, scaleX: 1, scaleY: 1 }, t3);
    };
    AcAC2020GameView.prototype.play2 = function () {
        if (this._win) {
            var win = this._win;
            egret.Tween.removeTweens(this._win);
            var t1 = 170 * this._timeRate;
            var winx1 = GameConfig.stageWidth / 2 - win.width;
            var winy1 = GameConfig.stageHeigth / 2 - win.height;
            egret.Tween.get(win).to({ x: winx1, y: winy1, alpha: 0, scaleX: 2, scaleY: 2 }, t1);
        }
    };
    AcAC2020GameView.prototype.stopshakeScreen = function () {
        this.x = 0;
        this.y = 0;
        this._isShakeing = false;
        egret.startTick(this.shakeScreen, this);
    };
    AcAC2020GameView.prototype.shakeScreen = function (timeStamp) {
        var spaceTime = 100;
        if (timeStamp < this._shakeStTime) {
            if (this._isShakeing == true && (timeStamp - this._shakeStTime) > spaceTime / 5) {
                this.x = 0;
                this.y = 0;
                this._isShakeing = false;
            }
        }
        else {
            this._shakeStTime = timeStamp + 100;
            this._isShakeing = true;
            this.x = 5 - App.MathUtil.getRandom(0, 10);
            this.y = 5 - App.MathUtil.getRandom(0, 10);
        }
        return false;
    };
    AcAC2020GameView.prototype.hide = function (isDispose) {
        var view = this;
        if (this.param.data.callBack) {
            this.param.data.callBack.apply(this.param.data.obj);
        }
        _super.prototype.hide.call(this);
    };
    AcAC2020GameView.prototype.dispose = function () {
        egret.stopTick(this.shakeScreen, this);
        this._progressbar1 = null;
        this._npc = null;
        this._isMoving = false;
        this._win = null;
        this._shakeStTime = 0;
        this._isShakeing = false;
        _super.prototype.dispose.call(this);
    };
    return AcAC2020GameView;
}(CommonView));
__reflect(AcAC2020GameView.prototype, "AcAC2020GameView");
//# sourceMappingURL=AcAC2020GameView.js.map