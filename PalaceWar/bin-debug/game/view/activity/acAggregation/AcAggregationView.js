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
 * 帮会集结
 * @author weixiaozhe  2020.5.12
 */
var AcAggregationView = (function (_super) {
    __extends(AcAggregationView, _super);
    function AcAggregationView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._detailBtn = null;
        _this._topTxtBg = null;
        _this._timeTxt = null;
        _this._botTxt1 = null;
        _this._botTxt2 = null;
        _this._botTxt3 = null;
        _this._scrollList = null;
        _this._creatorRwd = null;
        return _this;
    }
    AcAggregationView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            this.viewBg.width = 640;
            this.viewBg.height = 1136;
            this.viewBg.setPosition(0, GameConfig.stageHeigth - this.viewBg.height);
            this.addChild(this.viewBg);
        }
        var titleImg = BaseBitmap.create("acaggregation_title");
        this.addChild(titleImg);
        var topTxtBg = BaseBitmap.create("acaggregation_top");
        topTxtBg.width = GameConfig.stageWidth;
        topTxtBg.x = GameConfig.stageWidth / 2 - topTxtBg.width / 2;
        topTxtBg.y = 85;
        this.addChild(topTxtBg);
        this._topTxtBg = topTxtBg;
    };
    //规则
    AcAggregationView.prototype.getRuleInfo = function () {
        return "acAggregationRuleInfo";
    };
    AcAggregationView.prototype.getRuleBtnName = function () {
        return "btn_rule2";
    };
    Object.defineProperty(AcAggregationView.prototype, "TypeCode", {
        get: function () {
            if (this.code == "2") {
                return "1";
            }
            return this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcAggregationView.prototype.getTitleStr = function () {
        return null;
    };
    AcAggregationView.prototype.getTitleBgName = function () {
        return null;
    };
    AcAggregationView.prototype.joinAlliance = function () {
        this.refreshView();
        this.refreshBotTxt();
    };
    AcAggregationView.prototype.getRwdCallback = function (event) {
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (this.vo.checkIsInEndShowTime()) {
            this.vo.extraTimeAllianceMn = rData.allianceMn;
        }
        if (rData.numLimit) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acAggregationGetFailTips"));
            return;
        }
        if (rData.rewards) {
            var rewardVoList = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
        }
    };
    AcAggregationView.prototype.getRequestData = function () {
        if (this.vo && this.vo.aidAndCode) {
            return { requestType: NetRequestConst.REQUEST_AGGREGATION_GETINFO, requestData: { activeId: this.vo.aidAndCode } };
        }
    };
    AcAggregationView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AcAggregationView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ALLIANCE, this.joinAlliance, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_AGGREGATION_GETRWD, this.getRwdCallback, this);
        // this.showStartDialog();       
        //剩余时间
        var timeTxt = ComponentManager.getTextField(this.vo.acCountDown, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTxt.x = this._topTxtBg.x + 25;
        timeTxt.y = this._topTxtBg.y + this._topTxtBg.height / 2 - timeTxt.height / 2 - 5;
        this.addChild(timeTxt);
        this._timeTxt = timeTxt;
        //活动时间   
        var dateText = ComponentManager.getTextField(this.vo.acTimeAndHour, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = timeTxt.x;
        dateText.y = timeTxt.y - dateText.height - 10;
        this.addChild(dateText);
        //活动规则文本
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationInfo"), 20);
        descTxt.x = dateText.x;
        descTxt.y = timeTxt.y + timeTxt.height + 10;
        this.addChild(descTxt);
        var botbg = BaseBitmap.create("arena_bottom");
        botbg.height = 130;
        botbg.x = GameConfig.stageWidth / 2 - botbg.width / 2;
        botbg.y = GameConfig.stageHeigth - botbg.height;
        this.addChild(botbg);
        //加入帮会
        var detailBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acAggregationBtnTxt", function () {
            if ((!_this.vo.isStart) || _this.vo.checkIsInEndShowTime()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (Api.playerVoApi.getPlayerLevel() >= Config.AlliancebaseCfg.unlock) {
                ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCECREATEVIEW);
            }
            else {
                App.CommonUtil.showTip(Api.allianceVoApi.getLockedString());
            }
        }, this, null);
        this.setLayoutPosition(LayoutConst.righttop, detailBtn, botbg, [20, 20]);
        this.addChild(detailBtn);
        this._detailBtn = detailBtn;
        this._botTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationBotTxt1"), 20, TextFieldConst.COLOR_WARN_YELLOW);
        this.addChild(this._botTxt1);
        this.setLayoutPosition(LayoutConst.lefttop, this._botTxt1, botbg, [25, 25]);
        this._botTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationBotTxt2", [Api.playerVoApi.getPlayerOfficeByLevel(Config.AlliancebaseCfg.unlock)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChild(this._botTxt2);
        this._botTxt2.x = this._botTxt1.x + this._botTxt1.width / 2 - this._botTxt2.width / 2;
        this._botTxt2.y = this._botTxt1.y + this._botTxt1.height + 10;
        this._botTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationBotTxt3", [this.vo.getAllianceName()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChild(this._botTxt3);
        this._botTxt3.x = this._botTxt1.x;
        this._botTxt3.y = this._botTxt1.y;
        var botTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationBotTxt4"), 18);
        this.addChild(botTxt4);
        botTxt4.x = GameConfig.stageWidth / 2 - botTxt4.width / 2;
        botTxt4.y = GameConfig.stageHeigth - botTxt4.height - 13;
        this.refreshBotTxt();
        var datas = this.vo.getSortTaskCfg();
        var len = datas.length;
        var h = botbg.y - this._topTxtBg.y - this._topTxtBg.height;
        var rect = new egret.Rectangle(0, 0, 624, h);
        var arr = [];
        for (var i = 0; i < datas.length; i++) {
            datas[i].isCreatorRwd = (this._creatorRwd && this._creatorRwd[datas[i].id]) ? this._creatorRwd[datas[i].id] : 0;
            arr.push(datas[i]);
        }
        var scrollList = ComponentManager.getScrollList(AcAggregationTaskItem, arr, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition((GameConfig.stageWidth - rect.width) / 2, this._topTxtBg.y + this._topTxtBg.height);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        // this.setBigFameY(this._topTxtBg.y+this._topTxtBg.height);
        // this.setBigFameHeight(botbg.y - this._topTxtBg.y - this._topTxtBg.height)
        // this.setBigFameCorner(2);
    };
    AcAggregationView.prototype.avgendCallback = function () {
    };
    AcAggregationView.prototype.refreshBotTxt = function () {
        var id = Api.playerVoApi.getPlayerAllianceId();
        this._detailBtn.visible = id == 0;
        this._botTxt1.visible = id == 0;
        this._botTxt2.visible = id == 0;
        this._botTxt3.visible = id != 0;
        if (this._botTxt3.visible) {
            this._botTxt3.text = LanguageManager.getlocal("acAggregationBotTxt3", [this.vo.getAllianceName()]);
        }
    };
    //请求回调
    AcAggregationView.prototype.receiveData = function (data) {
        if (!data.ret) {
            App.CommonUtil.showTip(data.data.ret);
        }
        if (data.ret && data.data.cmd == NetRequestConst.REQUEST_AGGREGATION_GETINFO) {
            this._creatorRwd = data.data.data.creatorRwd;
            // if(this.vo.checkIsInEndShowTime())
            // {
            //     this.vo.extraTimeAllianceMn = data.data.data.allianceMn;
            // }            
        }
    };
    AcAggregationView.prototype.getDefaultResList = function (resArr) {
        var arr = [];
        for (var i = 0; i < resArr.length; i++) {
            var element = resArr[i];
            var defRes = this.getDefaultRes(element);
            arr.push(defRes);
        }
        return arr;
    };
    AcAggregationView.prototype.getResourceList = function () {
        var codeRes = this.getDefaultResList([]);
        var baseList = [
            "acaggregation_cicle",
            "acaggregation_cicle2",
            "acaggregation_bot",
            "acaggregation_title",
            "acaggregation_top",
            "arena_bottom",
            "acaggregation_itemtxt1",
            "acaggregation_itemtxt2",
        ];
        var codeList = null;
        if (this.code == "1") {
            codeList = [];
        }
        return _super.prototype.getResourceList.call(this).concat(baseList).concat(codeList).concat(codeRes);
    };
    AcAggregationView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        var datas = this.vo.getSortTaskCfg();
        this._scrollList.refreshData(datas, { aid: this.aid, code: this.code });
    };
    AcAggregationView.prototype.tick = function () {
        this._timeTxt.setString(this.vo.acCountDown);
        if (this.vo.checkIsAtEndShowTime()) {
            this.request(NetRequestConst.REQUEST_AGGREGATION_GETINFO, { activeId: this.vo.aidAndCode });
        }
    };
    Object.defineProperty(AcAggregationView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAggregationView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //根据资源名字得到完整资源名字
    AcAggregationView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcAggregationView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcAggregationView.prototype.showStartDialog = function () {
        var localkey = this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + "dialog";
        var lastTime = 0;
        var timeStr = LocalStorageManager.get(localkey);
        if (timeStr && timeStr != "") {
            lastTime = Number(timeStr);
        }
        if (lastTime == this.vo.et) {
            return;
        }
        LocalStorageManager.set(localkey, String(this.vo.et));
        var view = this;
        var keyStr = "startDialog_" + this.TypeCode;
        var startCfg = view.cfg[keyStr];
        var bgName = "story_bg6";
        ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW, {
            aid: view.aid,
            code: "" + view.TypeCode,
            AVGDialog: startCfg,
            visitId: "1",
            talkKey: "acChessStartTalk_",
            bgName: bgName,
        });
    };
    AcAggregationView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ALLIANCE, this.joinAlliance, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_AGGREGATION_GETRWD, this.getRwdCallback, this);
    };
    AcAggregationView.AID = null;
    AcAggregationView.CODE = null;
    return AcAggregationView;
}(AcCommonView));
__reflect(AcAggregationView.prototype, "AcAggregationView");
//# sourceMappingURL=AcAggregationView.js.map