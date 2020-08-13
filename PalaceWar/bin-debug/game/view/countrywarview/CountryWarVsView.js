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
 * 战斗准备期倒计时界面
 * author qianjun
 */
var CountryWarVsView = (function (_super) {
    __extends(CountryWarVsView, _super);
    function CountryWarVsView() {
        var _this = _super.call(this) || this;
        _this._timeCdTxt = null;
        _this.wardata = {};
        /**
         * 获取当前阵容信息 0己方 1敌方
        */
        _this._allMyTotalAttr = 0;
        _this._allOtherTotalAttr = 0;
        return _this;
    }
    Object.defineProperty(CountryWarVsView.prototype, "api", {
        get: function () {
            return Api.countryWarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    CountryWarVsView.prototype.initView = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.createWarInfo(LayoutConst.left);
        view.createWarInfo(LayoutConst.right);
        var vsbg = BaseBitmap.create("crossservantrulevs");
        vsbg.setScale(0.6);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, vsbg, view, [0, 130]);
        view.addChild(vsbg);
        var timebg = BaseBitmap.create('public_itemtipbg2');
        timebg.width = 415;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timebg, view.titleBg, [0, view.titleBg.height + 44]);
        view.addChild(timebg);
        var timeTxt = ComponentManager.getTextField(LanguageManager.getlocal('CountryWarCountdown_1', [App.DateUtil.getFormatBySecond(view.api.getCountTime())]), 22, TextFieldConst.COLOR_LIGHT_YELLOW); //App.DateUtil.getFormatBySecond(time);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timeTxt, timebg);
        view.addChild(timeTxt);
        view._timeCdTxt = timeTxt;
    };
    CountryWarVsView.prototype.getRequestData = function () {
        var view = this;
        if (view.param.data.test) {
            return null;
        }
        else {
            return { requestType: NetRequestConst.REQUEST_COUNTRYWAY_WARDETAIL, requestData: {
                    city: view.api.getCityIndex(view.param.data.cityId),
                } };
        }
    };
    CountryWarVsView.prototype.receiveData = function (rdata) {
        var view = this;
        if (!rdata.ret) {
            return;
        }
        view.wardata = rdata.data.data.countrywarresult;
    };
    /**
     * 获取此次帮会对阵信息 0 自己帮会的信息 1敌方帮会的
    */
    CountryWarVsView.prototype.getThisWarLog = function (index) {
        var arr = [];
        var isMy = index == 0;
        var sourceObj = isMy ? this.wardata.info : this.wardata.tinfo;
        var obj = {};
        // let myAllianceVo =  Api.allianceVoApi.getAllianceVo();
        var zid = isMy ? Api.mergeServerVoApi.getTrueZid() : this.api.getEnermyZid();
        obj['server'] = zid;
        obj['allianceName'] = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, zid);
        obj['attendLog'] = this.getWarVsLog(index);
        obj['totalattr'] = isMy ? this._allMyTotalAttr : this._allOtherTotalAttr;
        obj['allilevel'] = 0;
        return obj;
    };
    CountryWarVsView.prototype.getWarVsLog = function (type) {
        var sourceObj = type == 0 ? this.wardata.info : this.wardata.tinfo.info;
        var arr = [];
        var total = 0;
        for (var i in sourceObj) {
            var unit = sourceObj[i];
            total += unit.dps;
            var zid = type == 0 ? Api.mergeServerVoApi.getTrueZid() : this.api.getEnermyZid();
            arr.push({
                servantId: unit.servant,
                plan: unit.stra,
                attr: unit.dps,
                name: unit.name,
                uid: i,
                curHp: unit.dps,
                alliname: Api.mergeServerVoApi.getAfterMergeSeverName(null, true, zid),
                zid: zid,
                time: unit.st,
                level: unit.level,
                titleid: unit.title,
                skin: unit.servantskin,
            });
        }
        if (type == 0) {
            this._allMyTotalAttr = total;
        }
        else {
            this._allOtherTotalAttr = total;
        }
        arr.sort(function (a, b) {
            return a.time - b.time;
        });
        return arr;
    };
    CountryWarVsView.prototype.createWarInfo = function (type) {
        var view = this;
        var isLeft = type == LayoutConst.left;
        var wardata = view.getThisWarLog(isLeft ? 0 : 1);
        var group = new BaseDisplayObjectContainer();
        group.width = GameConfig.stageWidth / 2;
        group.height = GameConfig.stageHeigth - view.titleBg.height;
        App.DisplayUtil.setLayoutPosition(isLeft ? LayoutConst.leftbottom : LayoutConst.rightbottom, group, view, [0, -3]);
        view.addChild(group);
        //信息
        var infobg = BaseBitmap.create(view.api.isRedTeam(type) ? 'crossservantvsmask1' : 'crossservantvsmask2');
        infobg.height = group.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, infobg, group, [0, 0], true);
        group.addChild(infobg);
        var servernameTxt = ComponentManager.getTextField(LanguageManager.getlocal("Countrywarvsserver" + type, [Api.mergeServerVoApi.getAfterMergeSeverName(null, true, wardata.server)]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, servernameTxt, infobg, [0, 10]);
        servernameTxt.visible = !(Number(wardata.server) == 0);
        group.addChild(servernameTxt);
        var vsbg = BaseBitmap.create(view.api.isRedTeam(type) ? "countrywarvsleft" : 'countrywarvsright');
        if ((type == 'left' && !view.api.isRedTeam(type)) || (type == 'right' && view.api.isRedTeam(type))) {
            vsbg.anchorOffsetX = vsbg.width / 2;
            vsbg.anchorOffsetY = vsbg.height / 2;
            vsbg.scaleX = -1;
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, vsbg, servernameTxt, [0, servernameTxt.textHeight + 10]);
        group.addChild(vsbg);
        //服信息
        var allinamebg = BaseBitmap.create(view.api.isRedTeam(type) ? 'awservernamebg1' : 'awservernamebg2');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, allinamebg, vsbg, [0, -10]);
        group.addChild(allinamebg);
        var allinameTxt = ComponentManager.getTextField(LanguageManager.getlocal("Countrywarvsname" + (view.api.isRedTeam(type) ? 'left' : 'right')), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, allinameTxt, allinamebg);
        group.addChild(allinameTxt);
        var memberNumTxt = ComponentManager.getTextField(LanguageManager.getlocal('allianceWarAttendNum', [wardata.attendLog.length.toString()]), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, memberNumTxt, allinamebg, [0, allinamebg.height + 5]);
        group.addChild(memberNumTxt);
        var tmpRect = new egret.Rectangle(0, 0, infobg.width - 10, infobg.height - memberNumTxt.y - memberNumTxt.textHeight - 10);
        var scrollList = ComponentManager.getScrollList(CountryWarVsInfoItem, wardata.attendLog, tmpRect);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, memberNumTxt, [0, memberNumTxt.textHeight + 10]);
        group.addChild(scrollList);
        scrollList.bounces = false;
        view.setChildIndex(view.closeBtn, 9999);
    };
    CountryWarVsView.prototype.tick = function () {
        var view = this;
        view._timeCdTxt.text = LanguageManager.getlocal('CountryWarCountdown_1', [App.DateUtil.getFormatBySecond(view.api.getCountTime())]);
        if (view.api.getCurpeirod() == 3) {
            App.CommonUtil.showTip(LanguageManager.getlocal('allianceWarTip2'));
            view.hide();
            return;
        }
    };
    CountryWarVsView.prototype.getBgName = function () {
        return 'alliancewarbg2';
    };
    CountryWarVsView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.height = GameConfig.stageHeigth;
            //this.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
            // 
            // this.viewBg.height = GameConfig.stageHeigth;
            // let mask = BaseLoadBitmap.create('empvsmask');
            // this.addChild(mask);
            // mask.width = GameConfig.stageWidth;
            // mask.height = GameConfig.stageHeigth;
            this.viewBg.y = 0; //(GameConfig.stageHeigth - 1136)/2;
        }
    };
    CountryWarVsView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'crossservantvsmask1', 'crossservantvsmask2', 'awservernamebg1', 'awservernamebg2', 'awserverbg1', 'awserverbg2',
            'countrywarvsleft', 'countrywarvsright'
        ]);
    };
    CountryWarVsView.prototype.getRuleInfo = function () {
        return null;
    };
    CountryWarVsView.prototype.getTitleStr = function () {
        return "CountryWarVsTitle";
    };
    CountryWarVsView.prototype.getTitleParams = function () {
        return [LanguageManager.getlocal("CountryWarCityName" + this.param.data.cityId)];
    };
    CountryWarVsView.prototype.dispose = function () {
        var view = this;
        view._timeCdTxt = null;
        _super.prototype.dispose.call(this);
    };
    return CountryWarVsView;
}(CommonView));
__reflect(CountryWarVsView.prototype, "CountryWarVsView");
//# sourceMappingURL=CountryWarVsView.js.map