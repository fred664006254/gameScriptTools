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
 * 欢乐圣诞新奖励展示
 * date 2019.11.26
 * @class AcChristmasNewRewardView
 */
var AcChristmasNewRewardView = (function (_super) {
    __extends(AcChristmasNewRewardView, _super);
    function AcChristmasNewRewardView() {
        var _this = _super.call(this) || this;
        _this._floor = null;
        return _this;
    }
    AcChristmasNewRewardView.prototype.getContainerY = function () {
        return 0;
    };
    AcChristmasNewRewardView.prototype.initView = function () {
        App.LogUtil.log("AcChristmasNewRewardView: " + this.param.data.code);
        this._floor = this.param.data.floor;
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var infoBgStr = ResourceManager.hasRes("acchristmas-" + this.getTypeCode() + "_rewardInfobg") ? "acchristmas-" + this.getTypeCode() + "_rewardInfobg" : "acchristmas-8_rewardInfobg";
        var infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(GameConfig.stageWidth / 2 - infoBg.width / 2, this.titleBg.y + this.titleBg.height - 1);
        this.addChildToContainer(infoBg);
        var lineStr = ResourceManager.hasRes("acchristmas-" + this.getTypeCode() + "_line") ? "acchristmas-" + this.getTypeCode() + "_line" : "acchristmas-_line";
        var line = BaseBitmap.create(lineStr);
        line.setPosition(infoBg.x + infoBg.width / 2 - line.width / 2, infoBg.y + 1);
        this.addChildToContainer(line);
        var bg = BaseBitmap.create("dragonboattab1bg");
        bg.width = GameConfig.stageWidth;
        bg.height = GameConfig.stageHeigth - infoBg.height - infoBg.y + 2;
        bg.setPosition(0, infoBg.y + infoBg.height - 2);
        this.addChildToContainer(bg);
        // let listBg = BaseBitmap.create("public_9_bg43");
        // listBg.width = bg.width - 30;
        // listBg.height = bg.height - 30;
        // listBg.setPosition(bg.x + bg.width/2 - listBg.width/2, bg.y + 15);
        // this.addChildToContainer(listBg);
        var bottomBg = BaseBitmap.create("mainui_chatbg"); //public_9_bg11
        bottomBg.width = bg.width - 24;
        bottomBg.height = 30;
        bottomBg.setPosition(bg.x + bg.width / 2 - bottomBg.width / 2, bg.y + bg.height - 16 - bottomBg.height);
        var index = 3;
        if (this.vo.getFloor() >= 4) {
            index = 4;
        }
        var data = [];
        for (var i = index; i > 0; i--) {
            var floorData = this.cfg.getFloorRewardPoolList("" + i);
            var _data = { data: floorData, id: i };
            data.push(_data);
        }
        App.LogUtil.log("AcChristmasNewRewardView datalength: " + data.length + " cdoe:" + code);
        var rect = new egret.Rectangle(0, 0, bg.width - 30, bg.height - 30 - bottomBg.height);
        var list = ComponentManager.getScrollList(AcChristmasNewRewardScrollItem, data, rect, { aid: aid, code: code });
        list.setPosition(bg.x + 15, bg.y + 15);
        this.addChildToContainer(list);
        list.horizontalScrollPolicy = "off";
        if (this._floor) {
            // if (this.vo.getFloor() >= 4){
            //     this._floor = 4 - this._floor;
            // }
            // else{
            //     this._floor = 3 - this._floor;
            // }
            var floor = this.vo.getFloor();
            if (floor >= 4) {
                floor = 0;
            }
            else {
                floor = 3 - floor;
            }
            list.setScrollTopByIndex(floor, 1000);
        }
        this.addChildToContainer(bottomBg);
        var bottomTip = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasAchieve-" + this.getTypeCode() + "_bottomTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        bottomTip.setPosition(bottomBg.x + bottomBg.width / 2 - bottomTip.width / 2, bottomBg.y + bottomBg.height / 2 - bottomTip.height / 2);
        this.addChildToContainer(bottomTip);
    };
    Object.defineProperty(AcChristmasNewRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChristmasNewRewardView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcChristmasNewRewardView.prototype.getTypeCode = function () {
        if (this.code == "9" || this.code == "10") {
            return "8";
        }
        return this.code;
    };
    Object.defineProperty(AcChristmasNewRewardView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChristmasNewRewardView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcChristmasNewRewardView.prototype.getTitleStr = function () {
        return "";
    };
    AcChristmasNewRewardView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    // 标题背景名称
    AcChristmasNewRewardView.prototype.getTitleBgName = function () {
        return "acchristmasview_titlebg_" + this.getTypeCode();
        ;
    };
    AcChristmasNewRewardView.prototype.getRuleInfo = function () {
        return "acChristmasRuleInfo_" + this.param.data.code;
    };
    AcChristmasNewRewardView.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() == "8") {
            list = [
                "acchristmasviewcode8",
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "dragonboattab1bg", "acchristmasview_smalldescbg",
        ]).concat(list);
    };
    AcChristmasNewRewardView.prototype.dispose = function () {
        this._floor = null;
        _super.prototype.dispose.call(this);
    };
    return AcChristmasNewRewardView;
}(CommonView));
__reflect(AcChristmasNewRewardView.prototype, "AcChristmasNewRewardView");
//# sourceMappingURL=AcChristmasNewRewardView.js.map