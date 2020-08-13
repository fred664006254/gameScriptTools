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
var StoryPageEffect = (function (_super) {
    __extends(StoryPageEffect, _super);
    function StoryPageEffect() {
        return _super.call(this) || this;
    }
    /**
     * @param pageNum 翻几页  1 ～ 3
     * @param type 1 往后翻  2 往前翻
     */
    StoryPageEffect.prototype.init = function (pageNum, type) {
        var alpha = BaseBitmap.create("public_alphabg");
        alpha.width = GameConfig.stageWidth;
        alpha.height = GameConfig.stageHeigth;
        this.addChild(alpha);
        var view = ViewController.getInstance().getView(ViewConst.COMMON.STORYRECALLVIEW);
        var renderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(view);
        var maskPanl = BaseBitmap.create();
        maskPanl.texture = renderTexture;
        this.addChild(maskPanl);
        this.touchEnabled = true;
        var framerate = 45;
        var anim1_pre;
        if (pageNum == 3) {
            anim1_pre = "story_3page_";
        }
        else {
            anim1_pre = "story_page_";
        }
        var anim2_pre = anim1_pre + "full";
        var b1, b2, e1, e2;
        var ani1_frames = [];
        var ani2_frames = [];
        if (type == 1) {
            b1 = 1;
            b2 = 1;
            e1 = 4;
            e2 = 8;
            for (var i = b1; i <= e1; i++) {
                ani1_frames.push(anim1_pre + i);
            }
            for (var i = b2; i <= e2; i++) {
                ani2_frames.push(anim2_pre + i);
            }
        }
        else {
            b1 = 4;
            b2 = 8;
            e1 = 1;
            e2 = 1;
            for (var i = b1; i >= e1; i--) {
                ani1_frames.push(anim1_pre + i);
            }
            for (var i = b2; i >= e2; i--) {
                ani2_frames.push(anim2_pre + i);
            }
        }
        var tempAnim1 = BaseBitmap.create(ani1_frames[0]);
        var myClip = ComponentManager.getCustomMovieClip();
        myClip.playFrameRate = framerate;
        myClip.frameImages = ani1_frames;
        myClip.y = GameConfig.stageHeigth - tempAnim1.height;
        this.addChild(myClip);
        var fullClip = ComponentManager.getCustomMovieClip();
        fullClip.playFrameRate = framerate;
        fullClip.frameImages = ani2_frames;
        fullClip.height = GameConfig.stageHeigth;
        this.addChild(fullClip);
        var that = this;
        //双翻
        if (pageNum == 2) {
            var myClip2_1 = ComponentManager.getCustomMovieClip();
            myClip2_1.playFrameRate = framerate;
            myClip2_1.frameImages = ani1_frames;
            myClip2_1.y = GameConfig.stageHeigth - tempAnim1.height;
            this.addChild(myClip2_1);
            var fullClip2_1 = ComponentManager.getCustomMovieClip();
            fullClip2_1.playFrameRate = framerate;
            fullClip2_1.frameImages = ani2_frames;
            fullClip2_1.height = GameConfig.stageHeigth;
            this.addChild(fullClip2_1);
            //正翻
            if (type == 1) {
                TimerManager.doTimer(framerate, 1, function () {
                    myClip2_1.setEndCallBack(function () {
                        myClip.visible = false;
                        myClip2_1.visible = false;
                        maskPanl.mask = new egret.Rectangle(0, 0, 460, GameConfig.stageHeigth);
                        fullClip.playWithTime(1);
                        TimerManager.doTimer(framerate, 1, function () {
                            fullClip2_1.setEndCallBack(that.closeAnim, that);
                            maskPanl.mask = new egret.Rectangle(0, 0, 460, GameConfig.stageHeigth);
                            fullClip2_1.setEndCallBack(that.closeAnim, that);
                            fullClip2_1.setFrameEvent(3, function () {
                                maskPanl.mask = new egret.Rectangle(0, 0, 290, GameConfig.stageHeigth);
                            }, this);
                            fullClip2_1.setFrameEvent(5, function () {
                                maskPanl.mask = new egret.Rectangle(0, 0, 130, GameConfig.stageHeigth);
                            }, this);
                            fullClip.setFrameEvent(6, function () {
                                maskPanl.visible = false;
                            }, this);
                        }, that);
                    }, that);
                    myClip2_1.playWithTime(1);
                }, this);
                myClip.playWithTime(1);
            }
            else {
                TimerManager.doTimer(framerate, 1, function () {
                    fullClip2_1.setEndCallBack(function () {
                        fullClip.visible = false;
                        fullClip2_1.visible = false;
                        maskPanl.visible = false;
                        myClip.playWithTime(1);
                        TimerManager.doTimer(framerate, 1, function () {
                            myClip2_1.setEndCallBack(that.closeAnim, that);
                            myClip2_1.playWithTime(1);
                        }, that);
                    }, that);
                    fullClip2_1.setFrameEvent(5, function () {
                        maskPanl.mask = new egret.Rectangle(200, 0, 440, GameConfig.stageHeigth);
                    }, this);
                    fullClip2_1.setFrameEvent(7, function () {
                        maskPanl.mask = new egret.Rectangle(340, 0, 300, GameConfig.stageHeigth);
                    }, this);
                    fullClip2_1.setFrameEvent(8, function () {
                        maskPanl.mask = new egret.Rectangle(430, 0, 210, GameConfig.stageHeigth);
                    }, this);
                    fullClip2_1.playWithTime(1);
                }, this);
                fullClip.playWithTime(1);
            }
        }
        else {
            if (type == 1) {
                myClip.setEndCallBack(function () {
                    myClip.visible = false;
                    maskPanl.mask = new egret.Rectangle(0, 0, 460, GameConfig.stageHeigth);
                    fullClip.setEndCallBack(that.closeAnim, that);
                    fullClip.setFrameEvent(3, function () {
                        maskPanl.mask = new egret.Rectangle(0, 0, 290, GameConfig.stageHeigth);
                    }, this);
                    fullClip.setFrameEvent(5, function () {
                        maskPanl.mask = new egret.Rectangle(0, 0, 130, GameConfig.stageHeigth);
                    }, this);
                    fullClip.setFrameEvent(6, function () {
                        maskPanl.visible = false;
                    }, this);
                    fullClip.playWithTime(1);
                }, that);
                myClip.playWithTime(1);
            }
            else {
                fullClip.setEndCallBack(function () {
                    fullClip.visible = false;
                    maskPanl.visible = false;
                    myClip.setEndCallBack(that.closeAnim, that);
                    myClip.playWithTime(1);
                }, that);
                fullClip.setFrameEvent(5, function () {
                    maskPanl.mask = new egret.Rectangle(200, 0, 440, GameConfig.stageHeigth);
                }, this);
                fullClip.setFrameEvent(7, function () {
                    maskPanl.mask = new egret.Rectangle(340, 0, 300, GameConfig.stageHeigth);
                }, this);
                fullClip.setFrameEvent(8, function () {
                    maskPanl.mask = new egret.Rectangle(430, 0, 210, GameConfig.stageHeigth);
                }, this);
                fullClip.playWithTime(1);
            }
        }
        tempAnim1.dispose();
    };
    StoryPageEffect.prototype.closeAnim = function () {
        this.dispose();
    };
    return StoryPageEffect;
}(BaseDisplayObjectContainer));
__reflect(StoryPageEffect.prototype, "StoryPageEffect");
//# sourceMappingURL=StoryPageEffect.js.map