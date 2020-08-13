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
 * author:qianjun
 * desc:跨服权势活动首页
*/
var AcCrossServantPowerView = (function (_super) {
    __extends(AcCrossServantPowerView, _super);
    function AcCrossServantPowerView() {
        var _this = _super.call(this) || this;
        _this._timeDesc = null;
        _this._ranktxt = null;
        _this._descTxtBg = null;
        _this._descTxt = null;
        return _this;
    }
    Object.defineProperty(AcCrossServantPowerView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServantPowerView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServantPowerView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "public_9_wordbg2","crosspowerenter","crosspowerenter_down","crossserverpower_canjoin","crosspowerenterbg",
            // "punish_reward_icon",
            // "punish_rank_icon",
            // "punish_rank_name",
            "rechargevie_db_01",
            "crossServantPower_bg",
            "crossServantPower_taskIcon",
            "crossServantPower_txtIcon",
            "adult_lowbg",
        ]);
    };
    AcCrossServantPowerView.prototype.getTitleStr = function () {
        return "acCrossServantPower-1_Title";
    };
    AcCrossServantPowerView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSS_SERVANT_REFRESH, this.refreshRank, this);
        var view = this;
        var topbg = BaseBitmap.create('crossServantPower_bg');
        view.addChildToContainer(topbg);
        var sercfg = Config.ServantCfg.getServantItemById(this.cfg.servantid);
        var skinId = this.cfg.servantSkinID;
        if (!Api.switchVoApi.checkServantCloseBone() && skinId) {
            var dagonBonesName = "servant_full2_" + skinId;
            var boneName = dagonBonesName + "_ske";
            if (boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                this.makeDBdragon();
                App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.backFromServantSkin, this);
                App.MessageHelper.addEventListener(MessageConst.MESSAFE_CROSS_SERVANT_GOTASK, this.removeDBdragon, this);
            }
            else {
                var servantFullImg = BaseLoadBitmap.create(sercfg.fullIcon);
                servantFullImg.width = 640;
                servantFullImg.height = 482;
                servantFullImg.anchorOffsetY = servantFullImg.height;
                servantFullImg.x = 120;
                servantFullImg.y = 500;
                this.addChildToContainer(servantFullImg);
            }
        }
        else {
            var servantFullImg = BaseLoadBitmap.create(sercfg.fullIcon);
            servantFullImg.width = 640;
            servantFullImg.height = 482;
            servantFullImg.anchorOffsetY = servantFullImg.height;
            servantFullImg.x = 120;
            servantFullImg.y = 500;
            this.addChildToContainer(servantFullImg);
        }
        // 对话
        var iconBg = BaseBitmap.create("mainui_bottombtnbg");
        view.addChildToContainer(iconBg);
        var taskBtn = ComponentManager.getButton("crossServantPower_taskIcon", "", this.taskBtnHandler, this);
        taskBtn.x = GameConfig.stageWidth - taskBtn.width - 20;
        taskBtn.y = 370;
        view.addChildToContainer(taskBtn);
        this._taskBtn = taskBtn;
        var tasktxt = BaseBitmap.create("crossServantPower_txtIcon");
        tasktxt.x = taskBtn.x + taskBtn.width / 2 - tasktxt.width / 2;
        tasktxt.y = taskBtn.y + taskBtn.height - tasktxt.height - 10;
        view.addChildToContainer(tasktxt);
        iconBg.x = taskBtn.x + taskBtn.width / 2 - iconBg.width / 2;
        iconBg.y = taskBtn.y + taskBtn.height / 2 - iconBg.height / 2;
        //中部信息
        var vo = view.vo;
        var bottomBg = BaseBitmap.create("public_lockbg");
        bottomBg.width = GameConfig.stageWidth + 40;
        bottomBg.height = 140;
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = 450; // GameConfig.stageHeigth - bottomBg.height;
        view.addChildToContainer(bottomBg);
        //活动时间
        var timeDesc = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeDesc = timeDesc;
        var colorR0 = App.StringUtil.formatStringColor(vo.acCountDown, TextFieldConst.COLOR_WARN_GREEN2);
        this._timeDesc.text = LanguageManager.getlocal("acTigertrappass_countdown_time", [colorR0]);
        timeDesc.x = GameConfig.stageWidth / 2 - timeDesc.width / 2;
        timeDesc.y = bottomBg.y + 10;
        view.addChildToContainer(timeDesc);
        //活动倒计时时间
        //规则描述
        var ruleDesc = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServantPower_tipdesc" + (this.code == "1" ? "" : "_" + this.code)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        // ruleDesc.width = GameConfig.stageWidth - 20;
        ruleDesc.lineSpacing = 6;
        ruleDesc.x = GameConfig.stageWidth / 2 - ruleDesc.width / 2;
        ;
        ruleDesc.y = timeDesc.y + timeDesc.textHeight + 7;
        view.addChildToContainer(ruleDesc);
        var ruleDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServantPower_tipdesc2" + (this.code == "1" ? "" : "_" + this.code), [sercfg.name, "" + this.cfg.servantlv]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        ruleDesc2.x = 70;
        ruleDesc2.y = ruleDesc.y + ruleDesc.height + 7;
        view.addChildToContainer(ruleDesc2);
        var ranktxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._ranktxt = ranktxt;
        ranktxt.x = ruleDesc2.x;
        this.refreshRankTxt();
        ranktxt.y = ruleDesc2.y + ruleDesc2.height + 5;
        view.addChildToContainer(ranktxt);
        var rankListBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acRankBtnTxt", this.rankListBtnHandler, this);
        rankListBtn.x = GameConfig.stageWidth / 2 + 80;
        rankListBtn.y = ruleDesc2.y + 5;
        this.addChildToContainer(rankListBtn);
        //底部信息
        var bottomBg3 = BaseBitmap.create("public_9v_bg02");
        bottomBg3.x = 0;
        bottomBg3.width = GameConfig.stageWidth;
        bottomBg3.y = bottomBg.y + bottomBg.height - 3;
        bottomBg3.height = GameConfig.stageHeigth - bottomBg.y - this.container.y; //-20; 
        this.addChildToContainer(bottomBg3);
        var bottomBg4 = BaseBitmap.create("adult_lowbg");
        bottomBg4.x = GameConfig.stageWidth / 2 - bottomBg4.width / 2;
        bottomBg4.y = GameConfig.stageHeigth - 180;
        this.addChildToContainer(bottomBg4);
        var bottomBgV = BaseBitmap.create("public_9v_bg03");
        bottomBgV.width = GameConfig.stageWidth;
        bottomBgV.height = GameConfig.stageHeigth - this.container.y + 15;
        ;
        bottomBgV.x = 0;
        bottomBgV.y = -15;
        this.addChildToContainer(bottomBgV);
        var tipTxt = ComponentManager.getTextField("", 24);
        var zoneTxt = "";
        var zidgroup = this.vo.zidgroup;
        for (var index = 0; index < zidgroup.length; index++) {
            var element = zidgroup[index];
            var str = Api.mergeServerVoApi.getAfterMergeSeverName(Api.playerVoApi.getPlayerID(), true, element);
            zoneTxt += str + ",";
        }
        zoneTxt = zoneTxt.substr(0, zoneTxt.length - 1);
        tipTxt.text = LanguageManager.getlocal("acCrossServantPower_bottomtip", [zoneTxt]);
        tipTxt.multiline = true;
        tipTxt.lineSpacing = 4;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.x = GameConfig.stageWidth / 2 - tipTxt.width / 2;
        tipTxt.y = bottomBg4.y + bottomBg4.height / 2 - tipTxt.height / 2;
        bottomBg.name = "bottomBg";
        this.addChildToContainer(tipTxt);
        //榜单
        var rect = new egret.Rectangle(0, 10, GameConfig.stageWidth, bottomBg4.y - bottomBg.y - bottomBg.height - 10);
        var list = [];
        for (var key in this.cfg.rankList1) {
            list.push({ aid: this.aid, code: this.code, key: key });
        }
        var scrollList = ComponentManager.getScrollList(AcCrossServantPowerScrollItem, list, rect);
        scrollList.x = 0;
        scrollList.y = bottomBg.y + bottomBg.height + 5;
        this.addChildToContainer(scrollList);
        this.showTalkPanel();
        this.tick();
    };
    AcCrossServantPowerView.prototype.backFromServantSkin = function () {
        this.makeDBdragon();
    };
    AcCrossServantPowerView.prototype.makeDBdragon = function () {
        var skinId = this.cfg.servantSkinID;
        if (!Api.switchVoApi.checkServantCloseBone() && skinId && !this._droWifeIcon) {
            var dagonBonesName = "servant_full2_" + skinId;
            var boneName = dagonBonesName + "_ske";
            if (boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                var dagonBonesName_1 = "servant_full2_" + skinId;
                var boneName_1 = dagonBonesName_1 + "_ske";
                this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName_1);
                this._droWifeIcon.visible = true;
                this._droWifeIcon.setScale(0.9);
                this._droWifeIcon.anchorOffsetY = this._droWifeIcon.height;
                this._droWifeIcon.anchorOffsetX = this._droWifeIcon.width / 2;
                this._droWifeIcon.x = GameConfig.stageWidth / 2;
                this._droWifeIcon.y = 580;
                // this.addChildToContainer(this._droWifeIcon);
                this.container.addChildAt(this._droWifeIcon, 2);
            }
        }
    };
    AcCrossServantPowerView.prototype.refreshRankTxt = function () {
        if (!this._ranktxt) {
            return;
        }
        var ranknum = this.vo.myrank;
        var rankStr = ranknum == 0 ? LanguageManager.getlocal("atkracedes4") : ranknum;
        var colorR = App.StringUtil.formatStringColor("" + rankStr, TextFieldConst.COLOR_WARN_GREEN2);
        this._ranktxt.text = LanguageManager.getlocal("acRank_myrank1", [colorR]);
    };
    AcCrossServantPowerView.prototype.showTalkPanel = function () {
        var _this = this;
        var descgroup = new BaseDisplayObjectContainer();
        descgroup.width = 180;
        descgroup.x = GameConfig.stageWidth - descgroup.width - 30;
        descgroup.y = 40;
        this.addChildToContainer(descgroup);
        descgroup.alpha = 0;
        this._descGroup = descgroup;
        var descTxtBg = BaseBitmap.create('public_9v_bg11');
        descTxtBg.width = descgroup.width;
        descTxtBg.anchorOffsetX = descTxtBg.width / 2;
        descTxtBg.scaleX = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxtBg, descgroup, [0, 0], true);
        descgroup.addChild(descTxtBg);
        this._descTxtBg = descTxtBg;
        var desctTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_BROWN);
        desctTxt.width = descgroup.width - 50;
        desctTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, desctTxt, descTxtBg, [0, 15]);
        descgroup.addChild(desctTxt);
        this._descTxt = desctTxt;
        egret.Tween.get(descgroup, { loop: true }).call(function () {
            var ranIdx = App.MathUtil.getRandom(1, 6);
            var desc = LanguageManager.getlocal("acCrossServantPower_servantTip" + _this.code + "_" + ranIdx);
            desctTxt.text = desc;
            descTxtBg.height = desctTxt.textHeight + 50;
            descgroup.height = descTxtBg.height + 10;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, desctTxt, descTxtBg, [0, 15]);
        }, this).to({ alpha: 1 }, 2000).wait(3000).to({ alpha: 0 }, 1500).call(function () {
        }, this).wait(7000);
    };
    AcCrossServantPowerView.prototype.tick = function () {
        if (this.vo.et > GameData.serverTime + 86400) {
            var timeStr = App.DateUtil.getFormatBySecond(Math.max(0, (this.vo.et - GameData.serverTime - 86400)), 1);
            var colorR0 = App.StringUtil.formatStringColor(timeStr, TextFieldConst.COLOR_WARN_GREEN2);
            this._timeDesc.text = LanguageManager.getlocal("acTigertrappass_countdown_time", [colorR0]);
        }
        else {
            this._timeDesc.text = LanguageManager.getlocal("crossIntimacyCDTime4");
        }
        if (this.vo.isShowRedForTask()) {
            App.CommonUtil.addIconToBDOC(this._taskBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._taskBtn);
        }
    };
    AcCrossServantPowerView.prototype.rankListBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVANTPOWERRANKLISTPOPUPVIEW, { aid: this.aid, code: this.code });
    };
    AcCrossServantPowerView.prototype.taskBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVANTPOWERTASKPOPUPVIEW, { aid: this.aid, code: this.code });
    };
    AcCrossServantPowerView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (rData.ret == 0) {
            var cmd = rData.cmd;
            if (cmd == NetRequestConst.REQUEST_CROSS_SERVANT_RANKINFO) {
                this.vo.ranks = rData.data.ranks;
                this.vo.zidgroup = rData.data.zidgroup;
                this.vo.myrank = rData.data.myrank;
                this.refreshRankTxt();
            }
        }
    };
    AcCrossServantPowerView.prototype.refreshRank = function () {
        var serObj = Api.servantVoApi.getServantObj(this.cfg.servantid);
        if (serObj && serObj.level >= this.cfg.servantlv) {
            NetManager.request(NetRequestConst.REQUEST_CROSS_SERVANT_RANKINFO, { activeId: this.acVo.aidAndCode });
        }
    };
    AcCrossServantPowerView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_CROSS_SERVANT_RANKINFO, requestData: { activeId: this.acVo.aidAndCode } };
    };
    AcCrossServantPowerView.prototype.removeDBdragon = function () {
        if (this._droWifeIcon) {
            this._droWifeIcon.stop();
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
    };
    AcCrossServantPowerView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSS_SERVANT_REFRESH, this.refreshRank, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.backFromServantSkin, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAFE_CROSS_SERVANT_GOTASK, this.removeDBdragon, this);
        this._timeDesc = null;
        this._ranktxt = null;
        this.removeDBdragon();
        _super.prototype.dispose.call(this);
    };
    return AcCrossServantPowerView;
}(AcCommonView));
__reflect(AcCrossServantPowerView.prototype, "AcCrossServantPowerView");
