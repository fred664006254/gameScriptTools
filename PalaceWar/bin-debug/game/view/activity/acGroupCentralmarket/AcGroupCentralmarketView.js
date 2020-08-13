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
 * 港台周年庆
 * date 2018/10/17
 * @class AcTwAnniversaryView
 */
var AcGroupCentralmarketView = (function (_super) {
    __extends(AcGroupCentralmarketView, _super);
    function AcGroupCentralmarketView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._rewardTime = null;
        _this._activityTimerText = null;
        _this._activityDes = null;
        _this._acCDTxt = null;
        _this._activityDes2 = null;
        _this._chrargeType = 0;
        _this._namePicArr = [];
        _this._nameArr = ["Inn", "Bank", "PostStation", "GamblingHouse", "Tournament", "BlackMarket"];
        _this._viewNameArr = ["hotel", "bankBox", "courier", "gamble", "marry", "blackMarket"];
        _this._bubble_arr = null;
        _this._cfg = null;
        _this.acList = null;
        _this.nameKeyStr = [];
        _this.indexArr = [];
        _this.dotArr = [];
        _this.redDotArr = [];
        return _this;
    }
    AcGroupCentralmarketView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.height = GameConfig.stageHeigth;
            this.viewBg.y = Math.floor(GameConfig.stageHeigth - 1136);
        }
    };
    AcGroupCentralmarketView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ANNIVERS_REFRESH, this.refreshType, this);
        this.initActiveList();
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._cfg = cfg;
        var vo = this.acVo;
        var pos_arr = {
            1: { buildId: 1, buildPos: [0, 647], namePos: [24, 609] },
            2: { buildId: 2, buildPos: [28, 521], namePos: [264, 504] },
            3: { buildId: 3, buildPos: [277, 416], namePos: [404, 344] },
            4: { buildId: 4, buildPos: [454, 486], namePos: [563, 378] },
            5: { buildId: 5, buildPos: [221, 696], namePos: [486, 626] },
            6: { buildId: 6, buildPos: [0, 815], namePos: [165, 872] },
        };
        if (PlatformManager.checkIsEnLang()) {
            pos_arr =
                {
                    1: { buildId: 1, buildPos: [0, 647], namePos: [22, 612] },
                    2: { buildId: 2, buildPos: [28, 521], namePos: [99, 477] },
                    3: { buildId: 3, buildPos: [277, 416], namePos: [273, 378] },
                    4: { buildId: 4, buildPos: [454, 486], namePos: [491, 448] },
                    5: { buildId: 5, buildPos: [221, 696], namePos: [309, 682] },
                    6: { buildId: 6, buildPos: [0, 815], namePos: [10, 874] },
                };
        }
        for (var i in pos_arr) {
            var unit = pos_arr[i];
            var buildPic = BaseBitmap.create("twscene_" + unit.buildId);
            buildPic.x = unit.buildPos[0];
            buildPic.y = unit.buildPos[1] + Math.floor(this.viewBg.y);
            buildPic.scaleX = buildPic.scaleY = 4;
            buildPic.touchEnabled = true;
            var _index = Number(i) - 1;
            buildPic.name = this._viewNameArr[_index];
            buildPic.alpha = 0;
            buildPic.addTouch(this.onNPCTouchHandler, this, null, true);
            this.addChild(buildPic);
            var namePic = BaseBitmap.create("brand_" + unit.buildId);
            namePic.x = unit.namePos[0];
            namePic.y = unit.namePos[1] + Math.floor(this.viewBg.y);
            namePic.name = this._viewNameArr[_index];
            namePic.alpha = 1;
            this._namePicArr.push(namePic);
            namePic.addTouch(this.onNPCTouchHandler, this, null, true);
            this.addChild(namePic);
            // if(Number(i) == 4){
            //     namePic.width = namePic.height = 300;
            //     buildPic.width = buildPic.height = 300;
            // }
            var dot = BaseBitmap.create("public_dot2");
            dot.setScale(0.88);
            dot.x = namePic.x + 21;
            if (PlatformManager.checkIsEnLang()) {
                dot.x = namePic.x + namePic.width - 24;
            }
            dot.y = namePic.y - 5;
            dot.name = namePic.name;
            dot.visible = false;
            this.dotArr.push(dot);
            this.addChild(dot);
            App.DisplayUtil.changeToGray(namePic);
            if (this.nameKeyStr.indexOf(buildPic.name) >= 0) {
                var currentVo = this.acList[buildPic.name];
                if (currentVo.isStart) {
                    App.DisplayUtil.changeToNormal(namePic);
                }
            }
        }
        var bubble_arr = {
            1: { bubbleId: 1, bubbleIdPos: [0, 592] },
            2: { bubbleId: 1, bubbleIdPos: [57, 455] },
            3: { bubbleId: 1, bubbleIdPos: [209, 353] },
            4: { bubbleId: 1, bubbleIdPos: [398, 434] },
            5: { bubbleId: 1, bubbleIdPos: [265, 646] },
            6: { bubbleId: 1, bubbleIdPos: [0, 818] },
        };
        this._bubble_arr = bubble_arr;
        this.refreshType();
    };
    AcGroupCentralmarketView.prototype.initActiveList = function () {
        this.acList = [];
        this.nameKeyStr = [];
        this.redDotArr = [];
        this.indexArr = [];
        this.acList = this.acVo.getAcVoList();
        for (var a in this.acList) {
            if (this.acList[a] && this.acList[a].aid) {
                var aidStr = this.acList[a].aid;
                this.nameKeyStr.push(aidStr);
                var currentVo = this.acList[a];
                if (this._viewNameArr.indexOf(aidStr) != -1) {
                    if (currentVo.isShowRedDot == true && currentVo.isStart) {
                        var num = this._viewNameArr.indexOf(aidStr);
                        this.redDotArr.push(num);
                    }
                    else if (currentVo.isStart) {
                        var num = this._viewNameArr.indexOf(aidStr);
                        this.indexArr.push(num);
                    }
                }
            }
        }
    };
    AcGroupCentralmarketView.prototype.tick = function () {
        this.initActiveList();
        this.refreshType();
        if (GameData.serverTime % 15 == 0) {
            this.initBubbleTip();
        }
    };
    AcGroupCentralmarketView.prototype.refreshType = function () {
        for (var i = 0; i < this._namePicArr.length; i++) {
            var buildPic = null;
            buildPic = this._namePicArr[i];
            if (this.nameKeyStr.indexOf(buildPic.name) >= 0) {
                var currentVo = this.acList[buildPic.name];
                if (currentVo.isStart) {
                    App.DisplayUtil.changeToNormal(buildPic);
                }
                else {
                    App.DisplayUtil.changeToGray(buildPic);
                }
                //红点
                for (var j = 0; j < this.dotArr.length; j++) {
                    if (this.dotArr[j].name == currentVo.aid) {
                        if (currentVo.isShowRedDot == true) {
                            this.dotArr[j].visible = true;
                        }
                        else {
                            this.dotArr[j].visible = false;
                        }
                    }
                }
            }
        }
    };
    AcGroupCentralmarketView.prototype.initBubbleTip = function () {
        var arr = this.indexArr; // 解锁的建筑 
        var isHot = 1;
        var boo = false;
        if (this.redDotArr.length >= 1) {
            arr = this.redDotArr;
            isHot = 2;
            boo = true;
        }
        else {
            boo = false;
        }
        if (arr.length <= 0) {
            return;
        }
        var num = App.MathUtil.getRandom(0, arr.length);
        var newIndex = arr[num];
        var currDubble = this._bubble_arr[newIndex + 1].bubbleIdPos;
        ;
        var bulle = new AcBubbleTip();
        var qpstr = this._nameArr[newIndex];
        bulle.init(qpstr, isHot, boo);
        var npcNameSp = this._namePicArr[newIndex];
        bulle.x = 0;
        bulle.setPosition(currDubble[0], currDubble[1] + Math.floor(this.viewBg.y));
        this.addChild(bulle);
    };
    AcGroupCentralmarketView.prototype.onNPCTouchHandler = function (e) {
        if (e.type != egret.TouchEvent.TOUCH_BEGIN && e.type != egret.TouchEvent.TOUCH_CANCEL && e.type != egret.TouchEvent.TOUCH_END) {
            return;
        }
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            if (e.currentTarget.alpha != 1) {
                e.currentTarget.alpha = 0.3;
            }
        }
        else if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
            if (e.currentTarget.alpha != 1) {
                e.currentTarget.alpha = 0;
            }
        }
        if (e.type == egret.TouchEvent.TOUCH_END) {
            if (e.currentTarget.alpha != 1) {
                e.currentTarget.alpha = 0;
            }
            var viewName = e.currentTarget.name;
            if (this.nameKeyStr.indexOf(viewName) >= 0) {
                var currentVo = this.acList[viewName];
                if (currentVo.isStart) {
                    var newViewName = App.StringUtil.firstCharToUper(viewName);
                    if (egret.getDefinitionByName("Ac" + newViewName + "View")) {
                        ViewController.getInstance().openView("Ac" + newViewName + "View", currentVo.code);
                        // ViewController.getInstance().openView("Ac"+newViewName+ "View",{
                        //     code:currentVo.code,
                        //     aid:currentVo.aid,
                        // });   
                    }
                    else {
                        var str = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                        App.CommonUtil.showTip(str);
                        return;
                    }
                }
                else if (currentVo.isPreview) {
                    var nameStr = currentVo.aid;
                    if (currentVo.st > 0) {
                        var str = LanguageManager.getlocal(nameStr + "timerDes", [currentVo.getPreviewTime()]);
                        App.CommonUtil.showTip(str);
                        return;
                    }
                }
                else {
                    var str = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                    App.CommonUtil.showTip(str);
                    return;
                }
            }
            else {
                var str = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                App.CommonUtil.showTip(str);
                return;
            }
        }
    };
    AcGroupCentralmarketView.prototype.getBgName = function () {
        return "ac_twAnniversarybg_1";
    };
    AcGroupCentralmarketView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ac_twAnniversarybg_1",
            "ac_tw_bubble",
            "forpeople_top"
        ]);
    };
    AcGroupCentralmarketView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ANNIVERS_REFRESH, this.refreshType, this);
        this._namePicArr = [];
        _super.prototype.dispose.call(this);
        this.nameKeyStr = [];
        this.acList = null;
        this.indexArr = [];
        this.dotArr = [];
    };
    return AcGroupCentralmarketView;
}(AcGroupCommonView));
__reflect(AcGroupCentralmarketView.prototype, "AcGroupCentralmarketView");
//# sourceMappingURL=AcGroupCentralmarketView.js.map