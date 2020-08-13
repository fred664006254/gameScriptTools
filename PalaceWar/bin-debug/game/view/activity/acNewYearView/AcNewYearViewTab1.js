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
var AcNewYearViewTab1 = (function (_super) {
    __extends(AcNewYearViewTab1, _super);
    function AcNewYearViewTab1() {
        var _this = _super.call(this) || this;
        _this._progressBar = null;
        _this._cfgObj = null;
        _this._arrReward = [];
        _this._acNewYearVo = null;
        _this._myScore = 0;
        _this._needTxt = null;
        _this._maxScore = 0;
        _this._downTitleLine = null;
        _this.newYearCfg = [
            {
                id: 1,
                acnewyearPosY: -165,
            },
            {
                id: 2,
                acnewyearPosY: -5,
            },
            {
                id: 3,
                acnewyearPosY: 80,
            },
            {
                id: 4,
                acnewyearPosY: 155,
            },
            {
                id: 5,
                acnewyearPosY: 225,
            },
        ];
        egret.callLater(_this.initView, _this);
        return _this;
    }
    Object.defineProperty(AcNewYearViewTab1.prototype, "nowCode", {
        /**
        * 使用的code 仅仅使用资源，cn
        */
        get: function () {
            if (this.code == "6") {
                return "4";
            }
            else {
                return this.code;
            }
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearViewTab1.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD), this.updata, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT), this.updata, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR, this.code);
        this._acNewYearVo = tmpVo;
        this._myScore = this._acNewYearVo.getScore();
        this._cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACNEWYEAR, this.code);
        var curr_arr = this._cfgObj.itemListCfg.totalScoreReward;
        this._arrReward = [];
        var needScoreArr = [];
        for (var key in curr_arr) {
            if (Number(key)) {
                var reward = curr_arr[key].reward;
                if (reward.indexOf('4013') > -1 && !Api.switchVoApi.checkIsTitleState('4013')) {
                    curr_arr[key].reward = reward.substring(10, reward.length);
                }
                this._arrReward.push(curr_arr[key]);
                var downbottom = BaseBitmap.create("acnewyear_bottom");
                downbottom.y = this.newYearCfg[Number(key) - 1].acnewyearPosY;
                downbottom.x = 63;
                this._nodeContainer.addChild(downbottom);
                needScoreArr.push(curr_arr[key].needScore);
            }
        }
        AcNewYearViewTab1.SCOREARR = needScoreArr;
        needScoreArr.reverse();
        this._maxScore = needScoreArr[0];
        for (var i = 0; i < needScoreArr.length; i++) {
            var downbottomTxt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            downbottomTxt.text = needScoreArr[i];
            downbottomTxt.setPosition(downbottom.x + 5, this.newYearCfg[i].acnewyearPosY);
            downbottomTxt.width = 70;
            downbottomTxt.textAlign = "right";
            this._nodeContainer.addChild(downbottomTxt);
        }
        var downTitleLine = BaseBitmap.create("public_line3");
        downTitleLine.width = 550;
        downTitleLine.setPosition(50, -210);
        this._downTitleLine = downTitleLine;
        this._nodeContainer.addChild(downTitleLine);
        //当前拥有
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("newayearNeednumDes"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt.setPosition(215, downTitleLine.y - 5);
        this._nodeContainer.addChild(titleTxt);
        //中国结
        var chineseknot = BaseBitmap.create("acnewyear_chineseknot2_" + this.nowCode);
        chineseknot.x = 320;
        chineseknot.y = downTitleLine.y - 18;
        this._nodeContainer.addChild(chineseknot);
        //中国结 拥有多少个
        var needTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
        needTxt.setPosition(chineseknot.x + 60, titleTxt.y);
        needTxt.text = this._myScore + "";
        this._needTxt = needTxt;
        this._nodeContainer.addChild(needTxt);
        var bottomBg = BaseBitmap.create("public_9_bg43");
        bottomBg.width = 492;
        bottomBg.height = 506;
        bottomBg.x = 140;
        bottomBg.y = downTitleLine.y + 30;
        this._nodeContainer.addChild(bottomBg);
        var tmpRect = new egret.Rectangle(0, 0, GameConfig.stageWidth, 506);
        this._arrReward.reverse();
        var scrollList = ComponentManager.getScrollList(NewYear1ScrollItem, this._arrReward, tmpRect, this.code);
        scrollList.y = downTitleLine.y + 40;
        scrollList.x = 150;
        this._scrollList = scrollList;
        this._nodeContainer.addChild(scrollList);
        //进度条
        this._progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 470);
        this._progressBar.x = 30;
        this._progressBar.y = 315;
        this._progressBar.setTextSize(18);
        this._progressBar.setPercentage(this._myScore / this._maxScore);
        this._progressBar.rotation = this._progressBar.rotation - 90;
        this._nodeContainer.addChild(this._progressBar);
        var num = AcNewYearView.topBgHeight - this._nodeContainer.height;
        this._nodeContainer.y = num / 2 - 50;
    };
    AcNewYearViewTab1.prototype.updata = function (evt) {
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR, this.code);
        this._myScore = tmpVo.getScore();
        if (this._progressBar) {
            this._progressBar.setPercentage(this._myScore / this._maxScore);
        }
        if (this._needTxt) {
            this._needTxt.text = "" + this._myScore;
        }
        if (this._scrollList) {
            this._scrollList.refreshData(this._arrReward, this.code);
            this._scrollList.y = this._downTitleLine.y + 40;
        }
        if (evt.data.data) {
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(evt.data.data.data.rewards));
        }
    };
    // 页签类型
    AcNewYearViewTab1.prototype.getSheepType = function () {
        return 1;
    };
    AcNewYearViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD), this.updata, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT), this.updata, this);
        this._scrollList = null;
        this._newYearInfoVoList = null;
        this._progressBar = null;
        this._cfgObj = null;
        this._arrReward = [];
        this._nodeContainer = null;
        this._acNewYearVo = null;
        this._myScore = null;
        this._needTxt = null;
        this._maxScore = null;
        AcNewYearViewTab1.SCOREARR = [];
        _super.prototype.dispose.call(this);
    };
    AcNewYearViewTab1.SCOREARR = [];
    return AcNewYearViewTab1;
}(AcCommonViewTab));
__reflect(AcNewYearViewTab1.prototype, "AcNewYearViewTab1");
//# sourceMappingURL=AcNewYearViewTab1.js.map