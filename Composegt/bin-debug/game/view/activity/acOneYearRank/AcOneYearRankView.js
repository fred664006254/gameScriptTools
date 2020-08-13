/*
author : yanyuling
desc : 周年庆 风流天子
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
var AcOneYearRankView = (function (_super) {
    __extends(AcOneYearRankView, _super);
    function AcOneYearRankView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._ruleText = null;
        _this._nameTxt = null;
        _this._myHead = undefined;
        return _this;
    }
    AcOneYearRankView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESAAGE_ONERANK_VO_CHANGE, this.refreshUIInfo, this);
        var titletxt = BaseBitmap.create("oneyearrank_titletxt-" + this.code);
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        titletxt.y = 5;
        this.addChild(titletxt);
        //顶部背景图片
        var forpeople_top = BaseLoadBitmap.create('oneyearrank_topbg-' + this.code);
        forpeople_top.width = 640;
        forpeople_top.height = 146;
        this.addChildToContainer(forpeople_top);
        forpeople_top.y = 75;
        var flag = BaseBitmap.create("oneyear_flag");
        flag.x = GameConfig.stageWidth - flag.width - 60;
        flag.y = 35;
        this.addChild(flag);
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = 15;
        this._activityTimerText.y = 109 - 20;
        if (this.vo.firstinfo && this.vo.firstinfo.uid) {
            var tstr = LanguageManager.getlocal("acRank_acCDEnd");
            this._activityTimerText.text = LanguageManager.getlocal("acLocalTime", [tstr]);
        }
        else {
            this._activityTimerText.text = this.acVo.getAcLocalTime(true);
        }
        this.addChildToContainer(this._activityTimerText);
        var deltaY = 5;
        //倒计时文本 
        var acCDTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [""]);
        acCDTxt.x = this._activityTimerText.x; //forpeople_top.x + forpeople_top.width - 220;//this._activityTimerText.x;
        acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY; //this._activityTimerText.y ;//this._activityTimerText.y + this._activityTimerText.height + deltaY;
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        var akey = (this.vo.acinfo && this.vo.acinfo.akey) ? this.vo.acinfo.akey : "";
        var acids = akey.split("-");
        var aid = acids[0];
        var code = acids[1];
        var rankTxt = "";
        if (aid == "rankActive") {
            var atype = this.vo.acinfo.atype || "1";
            rankTxt = LanguageManager.getlocal("ac" + App.StringUtil.firstCharToUper(aid + "-" + atype) + "_Title");
        }
        else if (aid == "crossServerPower") {
            rankTxt = LanguageManager.getlocal("crossPowerTitle-" + code);
        }
        else if (aid == "crossServerIntimacy") {
            rankTxt = LanguageManager.getlocal("crossImacyTitle-" + code);
        }
        else if (aid == "beTheKing") {
            rankTxt = LanguageManager.getlocal("bethekingViewTitle");
        }
        //规则
        this._ruleText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._ruleText.text = LanguageManager.getlocal("acOneYearRankDesc-" + this.code, [rankTxt]);
        this._ruleText.x = this._activityTimerText.x;
        this._ruleText.multiline = true;
        this._ruleText.lineSpacing = 4;
        this._ruleText.width = GameConfig.stageWidth - this._ruleText.x * 2;
        this._ruleText.y = this._acCDTxt.y + this._activityTimerText.height + deltaY;
        this.addChildToContainer(this._ruleText);
        //中间信息
        var oneYearRankRaward = this.cfg.oneYearRankRaward;
        var centerConter = new BaseDisplayObjectContainer();
        centerConter.width = GameConfig.stageWidth;
        this.addChildToContainer(centerConter);
        var titleimg = BaseLoadBitmap.create("oneyearrank_titleimg-" + oneYearRankRaward);
        titleimg.width = 186;
        titleimg.height = 42;
        titleimg.y = 0;
        titleimg.x = GameConfig.stageWidth / 2 - titleimg.width / 2;
        centerConter.addChild(titleimg);
        var nameBg = BaseBitmap.create("playerview_powerbg");
        nameBg.name = "nameBg";
        nameBg.x = GameConfig.stageWidth / 2 - nameBg.width / 2;
        nameBg.y = titleimg.y + titleimg.height + 0;
        centerConter.addChild(nameBg);
        var nameTxt = ComponentManager.getTextField("1", 24, TextFieldConst.COLOR_WARN_YELLOW);
        this._nameTxt = nameTxt;
        nameTxt.x = GameConfig.stageWidth / 2;
        nameTxt.y = nameBg.y + nameBg.height / 2 - 8;
        centerConter.addChild(nameTxt);
        // this._myBody = undefined;
        var roleNode = undefined;
        var myHead = undefined;
        var resPath = "palace_db_" + oneYearRankRaward;
        var headpic = (this.vo.firstinfo && this.vo.firstinfo.pic) ? this.vo.firstinfo.pic : Api.playerVoApi.getPlayePicId();
        if (App.DeviceUtil.CheckWebglRenderMode() && ResourceManager.hasRes(resPath + "_ske")) {
            var _maxLoadNum = 2;
            var _loadNum = 0;
            var loadComplete = function (container) {
                this._loadNum++;
                if (this._loadNum == this._maxLoadNum) {
                    if (roleNode) {
                        roleNode.visible = true;
                    }
                    if (myHead) {
                        myHead.visible = true;
                    }
                }
            };
            roleNode = App.DragonBonesUtil.getLoadDragonBones(resPath, 0, "idle", loadComplete, this);
            // roleNode.setScale(1.4);
            roleNode.y = 150;
            var rect1 = egret.Rectangle.create();
            rect1.setTo(0, 0, 136, 143);
            myHead = BaseLoadBitmap.create("user_head" + headpic, rect1, { callback: loadComplete, callbackThisObj: this });
            myHead.visible = false;
            myHead.width = 136;
            myHead.height = 143;
            myHead.name = "myHead";
            myHead.visible = false;
            myHead.setScale(0.92);
            this._myHead = myHead;
            this.setLayoutPosition(LayoutConst.horizontalCentertop, myHead, this, [0, roleNode.y - 82]);
            this.addChild(myHead);
            roleNode.x = centerConter.width / 2 - roleNode.width / 2 * roleNode.scaleX;
        }
        else {
            roleNode = Api.playerVoApi.getPlayerPortrait(Number(oneYearRankRaward), Number(headpic));
            // roleNode.setScale(0.8);
            if ((Number(oneYearRankRaward) >= 3101 && Number(oneYearRankRaward) <= 3108)) {
                roleNode.x = centerConter.width / 2 - roleNode.width / 2 * roleNode.scaleX + 165;
            }
            else {
                roleNode.x = centerConter.width / 2 - roleNode.width / 2 * roleNode.scaleX;
            }
            roleNode.y = nameBg.y + nameBg.height - 10;
            this._myHead = roleNode.getChildByName("myHead");
        }
        roleNode.name = "roleNode";
        centerConter.addChild(roleNode);
        // roleNode.addTouchTap(this.roleImgClickHandler,this);
        var shadowImg = BaseBitmap.create("palace_role_shadow");
        shadowImg.x = centerConter.width / 2 - shadowImg.width / 2;
        shadowImg.y = roleNode.y + roleNode.height * roleNode.scaleX - shadowImg.height / 2 - 20;
        centerConter.addChildAt(shadowImg, 0);
        //bottomBg
        var bottomBg = BaseBitmap.create("oneyearrank_bottombg-" + this.code);
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        this.addChildToContainer(bottomBg);
        var posY1 = forpeople_top.y + forpeople_top.height + (bottomBg.y - forpeople_top.y - forpeople_top.height) / 2 - centerConter.height / 2;
        var posY2 = forpeople_top.y + forpeople_top.height + 20;
        if (posY1 > posY2) {
            centerConter.y = posY1;
        }
        else {
            centerConter.y = posY2;
        }
        //bottom里面的组件
        //转动一次按钮
        var checkBtn = ComponentManager.getButton("acredlotuswarrior_btn-1", "acOneYearRank_btntxt1", this.checkBtnHandler, this, [1]);
        // checkBtn.setColor(TextFieldConst.COLOR_BROWN);
        checkBtn.x = GameConfig.stageWidth / 2 - checkBtn.width / 2;
        checkBtn.y = bottomBg.y - 25;
        this.addChildToContainer(checkBtn);
        this._checkBtn = checkBtn;
        this.refreshUIInfo();
        this.tick();
    };
    AcOneYearRankView.prototype.refreshUIInfo = function () {
        var acinfo = this.vo.acinfo;
        var firstinfo = this.vo.firstinfo;
        App.DisplayUtil.changeToNormal(this._checkBtn);
        this._checkBtn.setEnable(true);
        if (acinfo.st > GameData.serverTime) {
            this._checkBtn.setText("acOneYearRank_btntxt4");
        }
        else if ((acinfo.et < GameData.serverTime + 86400) || (this.vo.firstinfo && this.vo.firstinfo.uid)) {
            if (firstinfo && firstinfo.uid == Api.playerVoApi.getPlayerID()) {
                this._checkBtn.setText("acOneYearRank_btntxt3");
            }
            else {
                this._checkBtn.setText("acOneYearRank_btntxt2");
            }
            App.DisplayUtil.changeToGray(this._checkBtn);
            this._checkBtn.setEnable(false);
        }
        else {
            this._checkBtn.setText("acOneYearRank_btntxt1");
        }
        if (firstinfo && firstinfo.zid) {
            var ztxt = Api.mergeServerVoApi.getAfterMergeSeverName(firstinfo.uid);
            this._nameTxt.text = ztxt + " " + firstinfo.name;
        }
        else {
            this._nameTxt.text = LanguageManager.getlocal("acOneYearRank_name_noone");
        }
        this._nameTxt.anchorOffsetX = this._nameTxt.width / 2;
        var headpic = (this.vo.firstinfo && this.vo.firstinfo.pic) ? this.vo.firstinfo.pic : Api.playerVoApi.getPlayePicId();
        this._myHead.setload("user_head" + headpic);
    };
    AcOneYearRankView.prototype.checkBtnHandler = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var acinfo = this.vo.acinfo;
        if (acinfo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYearRank_checkTip1"));
            return;
        }
        var akey = (this.vo.acinfo && this.vo.acinfo.akey) ? this.vo.acinfo.akey : "";
        var acids = akey.split("-");
        var aid = acids[0];
        var code = acids[1];
        if (!aid || aid == "") {
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYearRank_checkTip2"));
            return;
        }
        var viewClassName = "Ac" + App.StringUtil.firstCharToUper(aid) + "View";
        if (aid == "crossServerAtkRace") {
            viewClassName = ViewConst.COMMON.ATKRACECROSSSUMMARYVIEW;
        }
        ViewController.getInstance().openView(viewClassName, code);
    };
    AcOneYearRankView.prototype.tick = function () {
        var deltaT = this.acVo.acCountDown;
        var cdStrK = "acFanliReviewReward_acCD";
        if (this._acCDTxt && deltaT) {
            if (GameData.serverTime < this.vo.acinfo.et - 86400) {
                this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [deltaT]);
            }
            else {
                this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
            }
            return true;
        }
        return false;
    };
    AcOneYearRankView.prototype.getRequestData = function () {
        // if(!this.vo.acinfo || !this.vo.acinfo.aid){
        return { requestType: NetRequestConst.REQUST_ACTIVITY_YEARRANKIN, requestData: { activeId: this.acVo.aidAndCode } };
        // }
        // return null
    };
    AcOneYearRankView.prototype.receiveData = function (data) {
    };
    Object.defineProperty(AcOneYearRankView.prototype, "cfg", {
        get: function () {
            return this.acVo.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcOneYearRankView.prototype, "vo", {
        get: function () {
            return this.acVo;
        },
        enumerable: true,
        configurable: true
    });
    // protected getRuleInfo(): string {
    //     return "acArcadeRuleInfo-" + this.code;
    // }
    // protected getRuleParam():string[]
    // {
    //     let cfg = this.acVo.config;
    // 	return [""+cfg.cost,""+cfg.addPrize,""+cfg.totalNum];
    // }
    AcOneYearRankView.prototype.getBgName = function () {
        return "oneyearrank_bg-" + this.code;
    };
    AcOneYearRankView.prototype.getTitleBgName = function () {
        return "oneyearrank_titlebg-" + this.code;
    };
    AcOneYearRankView.prototype.getTitleStr = function () {
        return null;
    };
    // 关闭按钮图标名称
    // protected getCloseBtnName():string
    // {
    //     return "btn_closebtn1";
    // }
    // protected  getUiCode():string
    // {
    //     return Number(this.code ) > 1 ? this.code : "";
    // }
    AcOneYearRankView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "oneyearrank_bg-" + this.code,
            "oneyearrank_bottombg-" + this.code,
            "oneyearrank_titlebg-" + this.code,
            "oneyearrank_titletxt-" + this.code,
            "oneyearrank_topbg-" + this.code,
            "acredlotuswarrior_btn-1", "playerview_powerbg", "palace_role_shadow", "oneyear_flag",
        ]);
    };
    AcOneYearRankView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESAAGE_ONERANK_VO_CHANGE, this.refreshUIInfo, this);
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._ruleText = null;
        this._checkBtn = null;
        this._nameTxt = null;
        this._myHead = undefined;
        _super.prototype.dispose.call(this);
    };
    return AcOneYearRankView;
}(AcCommonView));
__reflect(AcOneYearRankView.prototype, "AcOneYearRankView");
