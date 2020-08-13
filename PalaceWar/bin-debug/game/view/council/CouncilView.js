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
 * 内阁/议事院
 * author qianjun
 */
var CouncilView = (function (_super) {
    __extends(CouncilView, _super);
    function CouncilView() {
        var _this = _super.call(this) || this;
        _this._type = 1; //1参加时间 2结算间隔 3领赏时间
        _this._timeDesc = null;
        _this._topbg = null;
        _this._list = null;
        _this._playindex = 0;
        _this._rewardarr = {};
        return _this;
    }
    Object.defineProperty(CouncilView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    CouncilView.prototype.getBigFrame = function () {
        return null;
    };
    CouncilView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "story_npc_8", "discussevent1bg", "discussevent2bg", "discussevent3bg", "discussevent4bg", "discussevent5bg"
        ]);
    };
    Object.defineProperty(CouncilView.prototype, "api", {
        get: function () {
            return Api.councilVoApi;
        },
        enumerable: true,
        configurable: true
    });
    CouncilView.prototype.getRuleInfo = function () {
        return "councilRuleInfo";
    };
    CouncilView.prototype.getRuleInfoParam = function () {
        var zoneStr = 0;
        var zoneStr2 = 0;
        var zoneStr3 = 0;
        zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(12).hour;
        zoneStr2 = App.DateUtil.formatSvrHourByLocalTimeZone(22).hour;
        zoneStr3 = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
        return [zoneStr + "", zoneStr2 + "", zoneStr2 + "", zoneStr + "", zoneStr3 + ""];
    };
    CouncilView.prototype.initView = function () {
        var view = this;
        view._type = view.api.getCurpeirod();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_COUNCIL_FRESHMODEL, view.freshList, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_COUNCIL_GETREWARD, view.getRewardBack, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_POLICY_INDEX, view.kingCallback, view);
        NetManager.request(NetRequestConst.REQUEST_POLICY_INDEX, {});
        // NetManager.request(NetRequestConst.REQUEST_PALACE_GETCROSSPALACE, {});
        NetManager.request(NetRequestConst.REQUEST_PALACE_GETPALACEINFO, {});
        var topbg = BaseBitmap.create("discusstopbg");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0, view.titleBg.height]);
        view.addChild(topbg);
        view._topbg = topbg;
        var man = BaseBitmap.create('story_npc_8');
        man.setScale(0.6);
        man.mask = new egret.Rectangle(0, 0, man.width, man.height - 65);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, man, topbg);
        view.addChild(man);
        var arrowBM = BaseBitmap.create("public_arrow");
        arrowBM.setPosition(topbg.x + 250, topbg.y + 75);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal('discussViewDescTxt'), 20, TextFieldConst.COLOR_BLACK);
        descTxt.width = 230;
        descTxt.lineSpacing = 5;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, descTxt, arrowBM, [arrowBM.width + 20, 0]);
        view.addChild(descTxt);
        var descbg = BaseBitmap.create("public_9_bg25"); //public_chatbg3 
        descbg.width = descTxt.width + 40;
        descbg.height = descTxt.height + 30;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descbg, descTxt);
        view.addChild(descbg);
        view.addChild(arrowBM);
        view.swapChildren(descbg, descTxt);
        var cdTimeTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._timeDesc = cdTimeTxt;
        view.addChild(cdTimeTxt);
        var jzhoutop = BaseBitmap.create('discussjzhoutop');
        view.setLayoutPosition(LayoutConst.horizontalCentertop, jzhoutop, topbg, [0, topbg.height - 20]);
        view.addChild(jzhoutop);
        var jzhoubottom = BaseBitmap.create('discussjzhoubottom');
        jzhoubottom.height = GameConfig.stageHeigth - jzhoutop.y - 30;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, jzhoubottom, jzhoutop, [0, 30]);
        view.addChild(jzhoubottom);
        view.swapChildren(jzhoutop, jzhoubottom);
        var tmpRect = new egret.Rectangle(0, 0, 570, GameConfig.stageHeigth - jzhoutop.y - 40);
        var scrollList = ComponentManager.getScrollList(CouncilItem, [], tmpRect);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, jzhoubottom, [9, 10]);
        view._list = scrollList;
        view.addChild(scrollList);
        view.freshList();
        view.api.checkIsGetReward();
        view.swapChildren(view.closeBtn, topbg);
    };
    CouncilView.prototype.freshList = function () {
        var view = this;
        view._list.refreshData(view.api.getTodayEvent());
    };
    CouncilView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUST_COUNCIL_GETEVENTINFO, requestData: {} };
    };
    CouncilView.prototype.getRewardBack = function (evt) {
        if (evt.data.ret) {
            var view = this;
            var data = evt.data.data.data;
            var arr = {};
            for (var i = 0; i < 5; ++i) {
                if (data[i]) {
                    arr[i] = data[i];
                }
            }
            view._playindex = 0;
            if (Object.keys(arr).length) {
                view._rewardarr = null;
                view._rewardarr = arr;
                view.showReward();
            }
        }
    };
    CouncilView.prototype.showReward = function () {
        var view = this;
        var keys = Object.keys(view._rewardarr);
        var data = view._rewardarr[keys[view._playindex]];
        if (data && data.servantData) {
            ViewController.getInstance().openView(ViewConst.POPUP.COUNCILREWARDPOPUPVIEW, {
                eventId: keys[view._playindex],
                exp: data.exp,
                servantData: data.servantData,
                rank: data.myrank,
                confirmcallback: function () {
                    ++view._playindex;
                    view.showReward();
                },
                callobj: view,
                randevent: data.randevent,
            });
        }
        else {
            view.request(NetRequestConst.REQUST_COUNCIL_GETEVENTINFO, {});
        }
    };
    CouncilView.prototype.tick = function () {
        var view = this;
        if (view.api.getCurpeirod() != view._type) {
            view.request(NetRequestConst.REQUST_COUNCIL_GETEVENTINFO, {});
        }
        view._type = view.api.getCurpeirod();
        view._timeDesc.text = LanguageManager.getlocal("discussViewCDTxt" + view._type, [App.DateUtil.getFormatBySecond(view.api.getCountTime())]);
        view.setLayoutPosition(LayoutConst.rightbottom, view._timeDesc, view._topbg, [15, 15]);
    };
    CouncilView.prototype.kingCallback = function (evt) {
        if (evt && evt.data && evt.data.ret) {
            var view = this;
            view.api.setKingData(evt.data.data.data.info);
        }
    };
    CouncilView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetRequestConst.REQUST_COUNCIL_GETREWARD, view.getRewardBack, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_COUNCIL_FRESHMODEL, view.freshList, view);
        App.MessageHelper.removeEventListener(NetRequestConst.REQUEST_POLICY_INDEX, view.kingCallback, view);
        view._timeDesc = null;
        view._topbg = null;
        view._type = 1;
        _super.prototype.dispose.call(this);
    };
    return CouncilView;
}(CommonView));
__reflect(CouncilView.prototype, "CouncilView");
//# sourceMappingURL=CouncilView.js.map