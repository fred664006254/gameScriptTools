/*
    author : shaoliang
    date : 2019.10.16
    desc : 天下至尊-对战记录
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
var LadderLogView = (function (_super) {
    __extends(LadderLogView, _super);
    function LadderLogView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._needRefresh = false;
        return _this;
    }
    LadderLogView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ladder_replay", "countrywarrewardview_itembg"
        ]);
    };
    Object.defineProperty(LadderLogView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderLogView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderLogView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderLogView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderLogView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    LadderLogView.prototype.getTitleBgName = function () {
        return "ladderview_title";
    };
    LadderLogView.prototype.getTitleStr = function () {
        return null;
    };
    LadderLogView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_LT_GETLOGS, requestData: { activeId: this.acTivityId } };
    };
    LadderLogView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (data.ret == false) {
            return;
        }
        if (rData.data.logs) {
            Api.laddertournamentVoApi.setLogs(rData.data.logs);
        }
    };
    LadderLogView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_FIGHT), this.fightCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETLOGS), this.fightCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LATTERT_BATTLE_END, this.resetInfo, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETLOGDETAIL), this.fightCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE, this.hide, this);
        this.titleBgShadow.visible = false;
        var tipBg = BaseBitmap.create("countrywarrewardview_itembg");
        this.addChildToContainer(tipBg);
        var tipstr = LanguageManager.getlocal("acLadderTournament_logtitle", [String(this.cfg.maxRecord)]);
        var tipMsg = ComponentManager.getTextField(tipstr, 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipMsg.setPosition(GameConfig.stageWidth / 2 - tipMsg.width / 2, 102);
        this.addChildToContainer(tipMsg);
        tipBg.width = tipMsg.width + 80;
        tipBg.setPosition(tipMsg.x - (tipBg.width / 2 - tipMsg.width / 2), tipMsg.y + tipMsg.height / 2 - tipBg.height / 2);
        var listbg = BaseBitmap.create("public_9_bg24");
        listbg.width = 624;
        listbg.height = GameConfig.stageHeigth - 150;
        listbg.setPosition(8, tipBg.y + tipBg.height + 7);
        this.addChildToContainer(listbg);
        var tmpRect = new egret.Rectangle(0, 0, 610, listbg.height - 14);
        var scrollList = ComponentManager.getScrollList(LadderLogItem, Api.laddertournamentVoApi.getLogs(), tmpRect);
        scrollList.setPosition(listbg.x + 7, listbg.y + 7);
        this.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this._scrollList = scrollList;
    };
    LadderLogView.prototype.fightCallback = function (evt) {
        var rData = evt.data.data.data;
        if (!rData) {
            return;
        }
        if (rData.pklogs) {
            this._needRefresh = true;
            Api.laddertournamentVoApi.setFightData(rData);
            ViewController.getInstance().openView(ViewConst.COMMON.LADDERFORMTIONVIEW);
        }
        if (rData.logdetail) {
            this._needRefresh = true;
            Api.laddertournamentVoApi.setFightData(rData.logdetail);
            ViewController.getInstance().openView(ViewConst.COMMON.LADDERFORMTIONVIEW);
        }
        if (rData.logs) {
            Api.laddertournamentVoApi.setLogs(rData.logs);
            if (this._scrollList) {
                this.refreshList();
            }
        }
    };
    LadderLogView.prototype.refreshList = function () {
        this._scrollList.refreshData(Api.laddertournamentVoApi.getLogs());
    };
    LadderLogView.prototype.resetInfo = function (event) {
        NetManager.request(NetRequestConst.REQUEST_LT_GETLOGS, { activeId: this.acTivityId });
    };
    LadderLogView.prototype.hide = function () {
        if (this._needRefresh) {
            NetManager.request(NetRequestConst.REQUEST_LT_GETRANK, { activeId: this.acTivityId });
        }
        _super.prototype.hide.call(this);
    };
    LadderLogView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_FIGHT), this.fightCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETLOGS), this.fightCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LATTERT_BATTLE_END, this.resetInfo, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETLOGDETAIL), this.fightCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE, this.hide, this);
        this._scrollList = null;
        this._needRefresh = false;
        _super.prototype.dispose.call(this);
    };
    return LadderLogView;
}(CommonView));
__reflect(LadderLogView.prototype, "LadderLogView");
//# sourceMappingURL=LadderLogView.js.map