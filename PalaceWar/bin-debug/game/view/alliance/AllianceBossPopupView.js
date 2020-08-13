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
 * 副本
 * author yanyuling
 * date 2017/12/06
 * @class AllianceBossPopupView
 */
var AllianceBossPopupView = (function (_super) {
    __extends(AllianceBossPopupView, _super);
    function AllianceBossPopupView() {
        var _this = _super.call(this) || this;
        _this._dataLsit = [];
        return _this;
    }
    AllianceBossPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG), this.showBossLog, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_ATTACK), this.attackCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_LIMITLESSBOSS_REFRESH, this.refreshBossList, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var zoneStr = 0;
        zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(23).hour;
        this._topTipTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceBoss_tip1", [zoneStr + ""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._topTipTF.x = this.viewBg.width / 2 - this._topTipTF.width / 2;
        this._topTipTF.y = 20;
        this._nodeContainer.addChild(this._topTipTF);
        var tmpList = Config.AlliancebossCfg.getAllainceCfgIdList();
        // let tmplidst2 = Config.AllianceelitebossCfg.getAllainceCfgIdList().sort((a:string,b:string)=>{
        // 	return Number(a.substring(1)) - Number(b.substring(1));
        // });
        var alliVo = Api.allianceVoApi.getAllianceVo();
        var myAlliLv = alliVo.level;
        var dataList = [];
        for (var index = 0; index < tmpList.length; index++) {
            var cfg = Config.AlliancebossCfg.getAllianceCfgByLv(tmpList[index]);
            if (cfg.needAllianceLv <= myAlliLv) {
                if (cfg.attribution1) {
                    if (Api.allianceVoApi.checkOpenLimitlessBoss()) {
                        dataList.unshift(tmpList[index]);
                    }
                }
                else {
                    dataList.push(tmpList[index]);
                }
            }
        }
        this._dataLsit = dataList;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, this.viewBg.width, 690);
        this._scrollList = ComponentManager.getScrollList(AllianceBossScrollItem, dataList, rect);
        this._scrollList.x = 25 + GameData.popupviewOffsetX;
        this._scrollList.y = this._topTipTF.y + 30;
        this._nodeContainer.addChild(this._scrollList);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceApplyTip"));
        var bottomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceBoss_tip2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        bottomTipTxt.x = this.viewBg.width / 2 - bottomTipTxt.width / 2;
        bottomTipTxt.y = this._scrollList.y + rect.height + 10;
        this._nodeContainer.addChild(bottomTipTxt);
    };
    AllianceBossPopupView.prototype.getBossDatalist = function () {
        var dataList = [];
        var alliVo = Api.allianceVoApi.getAllianceVo();
        var myAlliLv = alliVo.level;
        var tmpList = Config.AlliancebossCfg.getAllainceCfgIdList();
        for (var index = 0; index < tmpList.length; index++) {
            var cfg = Config.AlliancebossCfg.getAllianceCfgByLv(tmpList[index]);
            if (cfg.needAllianceLv <= myAlliLv) {
                if (cfg.attribution1) {
                    if (Api.allianceVoApi.checkOpenLimitlessBoss()) {
                        dataList.unshift(tmpList[index]);
                    }
                }
                else {
                    dataList.push(tmpList[index]);
                }
            }
        }
        return dataList;
    };
    AllianceBossPopupView.prototype.showBossLog = function (event) {
        if (!event.data.ret) {
            return;
        }
        var rdata = event.data.data;
        if (rdata.ret == 0) {
        }
        var dataList = this.getBossDatalist();
        this._scrollList.refreshData(dataList);
    };
    // protected getBgExtraHeight():number
    // {
    // 	return -130;
    // }
    AllianceBossPopupView.prototype.attackCallback = function (event) {
        if (event.data.ret) {
            var rData = event.data.data.data;
            if (rData.hasKill && rData.hasKill == 1) {
                var dataList = this.getBossDatalist();
                this._scrollList.refreshData(dataList);
            }
        }
    };
    AllianceBossPopupView.prototype.refreshBossList = function () {
        if (Api.allianceVoApi.checkOpenLimitlessBoss()) {
            var alliVo = Api.allianceVoApi.getAllianceVo();
            if (alliVo && alliVo.boss && alliVo.boss.eliteClear) {
                alliVo.boss.eliteClear = 0;
            }
            var dataList = this.getBossDatalist();
            this._scrollList.refreshData(dataList);
        }
    };
    AllianceBossPopupView.prototype.getShowHeight = function () {
        return 850;
    };
    AllianceBossPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            ,
            "searchbinfowifebg", "progress5", "progress3_bg", "alliance_effect",
            "allianceBossbg", "allianceview_itembossbg", "allianceBossbg_limitless"
        ]);
    };
    AllianceBossPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG), this.showBossLog, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_ATTACK), this.attackCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_LIMITLESSBOSS_REFRESH, this.refreshBossList, this);
        // 未婚滑动列表
        this._scrollList = null;
        this._nodeContainer = null;
        this._topTipTF = null;
        this._dataLsit = [];
        _super.prototype.dispose.call(this);
    };
    return AllianceBossPopupView;
}(PopupView));
__reflect(AllianceBossPopupView.prototype, "AllianceBossPopupView");
//# sourceMappingURL=AllianceBossPopupView.js.map