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
 * 跨服元宝消耗
 * @author 赵占涛
 */
var AcCrossServerGemExpendView = (function (_super) {
    __extends(AcCrossServerGemExpendView, _super);
    function AcCrossServerGemExpendView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcCrossServerGemExpendView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcCrossServerGemExpendView.AID, AcCrossServerGemExpendView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerGemExpendView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcCrossServerGemExpendView.AID, AcCrossServerGemExpendView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerGemExpendView.prototype, "acTivityId", {
        get: function () {
            return AcCrossServerGemExpendView.AID + "-" + AcCrossServerGemExpendView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerGemExpendView.prototype.initBg = function () {
        //背景
        var stageH = GameConfig.stageHeigth;
        var bigBg = BaseLoadBitmap.create('acGemExpendBg');
        bigBg.touchEnabled = true;
        this.addChild(bigBg);
        bigBg.y = stageH - 1136;
    };
    AcCrossServerGemExpendView.prototype.initView = function () {
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ARROW_UPLEVEL,this.upLevelRefresh,this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ARROW_SHOOTING),this.getRewardHandler,this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ARROW_GETBOSREWARD),this.getNumRewardHandler,this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ARROW_GETRANK),this.getRewardHandler,this);
        // App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreshData,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY2S_GEMEXPENDRANK), this.refreshRankList, this);
        AcCrossServerGemExpendView.AID = this.aid;
        AcCrossServerGemExpendView.CODE = this.code;
        this.width = GameConfig.stageWidth;
        //活动规则背景图片
        var acruleTxtBg = BaseBitmap.create("acGemExpendDescBg");
        acruleTxtBg.y = 70;
        this.addChild(acruleTxtBg);
        var titleStr = BaseBitmap.create('acGemExpendTitleStr');
        titleStr.x = this.width / 2 - titleStr.width / 2;
        titleStr.y = 0;
        this.addChild(titleStr);
        //活动规则文本
        var acruleTxt = ComponentManager.getTextField(LanguageManager.getlocal("AcCrossServerGemExpendView" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acruleTxt.width = 600;
        acruleTxt.x = acruleTxtBg.x + acruleTxtBg.width / 2 - acruleTxt.width / 2;
        acruleTxt.y = acruleTxtBg.y + 15 + 55;
        this.addChild(acruleTxt);
        //剩余时间
        this.countdownTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.countdownTxt.text = LanguageManager.getlocal("acFanliReviewReward_acCD", [""]);
        this.countdownTxt.x = acruleTxt.x + acruleTxt.width - this.countdownTxt.width;
        this.countdownTxt.visible = this.vo.isInActivity();
        this.addChild(this.countdownTxt);
        this.countdownTxt.y = acruleTxtBg.y + 15 + 5; //acruleTxt.y + acruleTxt.height;
        var actimeTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        actimeTF.text = this.acVo.getAcLocalTime(true);
        actimeTF.width = 580;
        actimeTF.lineSpacing = 5;
        actimeTF.x = acruleTxt.x;
        actimeTF.y = acruleTxtBg.y + 15 + 5;
        this.addChild(actimeTF);
        var ZidGroupTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        var serverStr = "";
        var maxNum = 4;
        for (var key in this.zidGroup) {
            if (maxNum <= 0) {
                serverStr = serverStr + LanguageManager.getlocal("seeServersNumStr");
                break;
            }
            var serverId = this.zidGroup[key];
            var serverText = "";
            var qu = Api.mergeServerVoApi.getQuByZid(serverId);
            if (qu > 0) {
                serverText = LanguageManager.getlocal("mergeServer", [String(qu), String(serverId)]);
            }
            else {
                serverText = LanguageManager.getlocal("ranserver2", [String(serverId)]);
            }
            if (serverStr != "") {
                serverStr = serverStr + ",";
            }
            else {
                serverStr = serverStr + " ";
            }
            serverStr = serverStr + serverText;
            maxNum--;
        }
        ZidGroupTF.text = LanguageManager.getlocal("acCrossServerWifeBattlePkzids", [serverStr]);
        ZidGroupTF.lineSpacing = 5;
        ZidGroupTF.x = acruleTxt.x;
        ZidGroupTF.y = acruleTxtBg.y + 15 + 30;
        this.addChild(ZidGroupTF);
        if (maxNum <= 0) {
            var talentstr = LanguageManager.getlocal("seeServerInfo");
            var talentTF = ComponentManager.getTextField(talentstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            talentTF.x = ZidGroupTF.x + ZidGroupTF.width;
            talentTF.y = ZidGroupTF.y;
            this.addChild(talentTF);
            talentTF.addTouchTap(this.serverBtnListener, this, [this.zidGroup]);
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 205 - 115);
        var rankdCfg = this.cfg.getRankList();
        var firstInfo = [];
        for (var i = 0; i < rankdCfg.length; i++) {
            var rankItemCfg = rankdCfg[i];
            var rankItemVo = this.rankList[i];
            var usePic = "1";
            var useName = "";
            var zid = 0;
            var gemexpendNum = 0;
            if (rankItemVo) {
                usePic = rankItemVo.pic;
                useName = rankItemVo.name;
                zid = rankItemVo.zid;
                gemexpendNum = rankItemVo.gemexpend;
            }
            var rankItemData = { "rank": rankItemCfg.rank, "zid": zid, "gemexpend": gemexpendNum, "id": rankItemCfg.id, "rewardIcons": rankItemCfg.rewardIcons, "pic": usePic, "name": useName };
            firstInfo.push(rankItemData);
        }
        this._scrollList = ComponentManager.getScrollList(AcCrossServerGemExpendScrollItem, firstInfo, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.x = 0;
        this._scrollList.y = 205;
        var bottomRes = "acGemExpendDownBg";
        var bottomH = 120;
        // 底部背景
        var buttomBg = BaseBitmap.create(bottomRes);
        buttomBg.height = bottomH;
        buttomBg.x = this.width / 2 - buttomBg.width / 2;
        buttomBg.y = GameConfig.stageHeigth - buttomBg.height;
        this.addChild(buttomBg);
        var rankStr = LanguageManager.getlocal("acRank_myrank1", [LanguageManager.getlocal("atkracedes4")]);
        if (this.myrank && this.myrank > 0) {
            rankStr = LanguageManager.getlocal("acRank_myrank1", ["" + this.myrank]);
        }
        var nameTTF = ComponentManager.getTextField(rankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTTF.x = 13;
        nameTTF.y = buttomBg.y + 30;
        this.addChild(nameTTF);
        var gemExpendTTF = ComponentManager.getTextField(LanguageManager.getlocal("acLimitedReward-1_Title") + "：" + this.myscore, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        gemExpendTTF.x = 13;
        gemExpendTTF.y = nameTTF.y + nameTTF.height + 8;
        this.addChild(gemExpendTTF);
        var descTTF = ComponentManager.getTextField(LanguageManager.getlocal("AcCrossServerGemDescStr"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTTF.x = GameConfig.stageWidth / 2 - descTTF.width / 2;
        descTTF.y = GameConfig.stageHeigth - descTTF.height - 3;
        this.addChild(descTTF);
        var rankBtn = ComponentManager.getButton("btn_big_yellow2", "acCrossServerIntimacyRankListViewTitle", this.rankClick, this);
        rankBtn.setColor(0x6f2f00);
        rankBtn.x = 400;
        rankBtn.y = buttomBg.y + 15;
        this.addChild(rankBtn);
        this.tick();
    };
    AcCrossServerGemExpendView.prototype.serverBtnListener = function (event, zidGroup) {
        console.log(zidGroup);
        ViewController.getInstance().openView(ViewConst.POPUP.SERVERSHOWPOPUPVIEW, { zidGroup: zidGroup });
    };
    AcCrossServerGemExpendView.prototype.tick = function () {
        var deltaT = this.acVo.acCountDown;
        var cdStrK = "acFanliReviewReward_acCD";
        if (this.countdownTxt && deltaT) {
            this.countdownTxt.text = LanguageManager.getlocal(cdStrK, [deltaT]);
            this.countdownTxt.x = GameConfig.stageWidth - this.countdownTxt.width - 15;
            return true;
        }
        return false;
    };
    AcCrossServerGemExpendView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY2S_GEMEXPENDRANK, requestData: { activeId: this.aid + "-" + this.code } };
    };
    AcCrossServerGemExpendView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (rData.ret == 0) {
            var cmd = rData.cmd;
            if (cmd == NetRequestConst.REQUEST_ACTIVITY2S_GEMEXPENDRANK) {
                // console.log(rData.data.rank);
                // let i = 0;
                // for (var i = 0; i < rData.data.rank.length; i++) {  
                //     console.log(i,rData.data.rank[i]);  
                // }  
                this.rankList = [];
                for (var i = 0; i < rData.data.rank.length; i++) {
                    var rankData = rData.data.rank[i];
                    // console.log(rData.data.rank);
                    var boxInfo = { "uid": rankData.uid, "name": rankData.name, "pic": rankData.pic, "zid": rankData.zid, "gemexpend": rankData.v };
                    this.rankList.push(boxInfo);
                }
                this.myrank = rData.data.merank;
                this.myscore = rData.data.mepoint;
                this.zidGroup = rData.data.servergroup;
                // console.log(this.rankList);
            }
        }
    };
    AcCrossServerGemExpendView.prototype.refreshRankList = function () {
    };
    AcCrossServerGemExpendView.prototype.rankClick = function () {
        App.LogUtil.log("rankClick");
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERGEMWXPENDPOPUPVIEW, { "rankList": this.rankList, "myrank": this.myrank, "myscore": this.myscore });
    };
    AcCrossServerGemExpendView.prototype.getResourceList = function () {
        var resList = null;
        resList = [
            "acGemExpendBg",
            "acGemExpendBigPicBg",
            "acGemExpendDescBg",
            "acGemExpendDownBg",
            "acGemExpendItemBg",
            "acGemExpendItemDescBg",
            "acGemExpendSmallPicBg",
            "acGemExpendTitleBg",
            "acGemExpendTitleStr",
            "btn_lookdetail"
        ];
        return _super.prototype.getResourceList.call(this).concat(resList);
    };
    AcCrossServerGemExpendView.prototype.getTitleBgName = function () {
        return "acGemExpendTitleBg";
    };
    AcCrossServerGemExpendView.prototype.getTitleStr = function () {
        return "";
    };
    AcCrossServerGemExpendView.prototype.getRuleParam = function () {
        var tmp = [];
        // tmp.push(this.cfg.freeArrow.toString());
        // tmp.push(this.cfg.arrowCost.toString());
        return tmp;
    };
    AcCrossServerGemExpendView.prototype.dispose = function () {
        this.countdownTxt = null;
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETBUILDINGWORSHIPTASKREWARD),this.getRewardHandler,this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ARROW_GETBOSREWARD),this.getNumRewardHandler,this);
        // App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreshData,this);
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ARROW_UPLEVEL,this.upLevelRefresh,this);
        _super.prototype.dispose.call(this);
    };
    AcCrossServerGemExpendView.AID = null;
    AcCrossServerGemExpendView.CODE = null;
    return AcCrossServerGemExpendView;
}(AcCommonView));
__reflect(AcCrossServerGemExpendView.prototype, "AcCrossServerGemExpendView");
