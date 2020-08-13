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
 * 城市详情
 * author qianjun
 */
var CountryWarCityPopupView = (function (_super) {
    __extends(CountryWarCityPopupView, _super);
    function CountryWarCityPopupView() {
        var _this = _super.call(this) || this;
        _this._bg = null;
        _this._list = null;
        _this._leftTeamNameTxt = null;
        _this._leftTeamNumTxt = null;
        _this._rightTeamNameTxt = null;
        _this._rightTeamNumTxt = null;
        _this._cityId = null;
        return _this;
    }
    Object.defineProperty(CountryWarCityPopupView.prototype, "api", {
        get: function () {
            return Api.countryWarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountryWarCityPopupView.prototype, "cfg", {
        get: function () {
            return Config.CountrywarCfg;
        },
        enumerable: true,
        configurable: true
    });
    CountryWarCityPopupView.prototype.initView = function () {
        var view = this;
        var data = this.param.data;
        // 门客变换和计谋变化
        App.MessageHelper.addNetMessage("countrywar", this.refreashCity, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_SELECTSERVANT, this.refreashCity, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_CANCELSERVANT, this.refreashCity, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_SELECTSTRATAGEM, view.refreashCity, view);
        this._cityId = data.cityId;
        var bg = BaseBitmap.create("countrywarcitybg");
        bg.height = 98;
        bg.width = 548;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        view.addChildToContainer(bg);
        view._bg = bg;
        var cityname = BaseBitmap.create("countrywarcity" + data.cityId);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cityname, bg);
        view.addChildToContainer(cityname);
        // left 
        var leftbg = BaseBitmap.create(view.api.isRedTeam('left') ? "countrywarcityleft" : "countrywarcityright");
        if (!view.api.isRedTeam('left')) {
            leftbg.anchorOffsetX = leftbg.width / 2;
            leftbg.anchorOffsetY = leftbg.height / 2;
            leftbg.scaleX = -1;
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, leftbg, bg, [0, bg.height]);
        this.addChildToContainer(leftbg);
        this._leftTeamNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("CountryWarleftTeamNum"), TextFieldConst.FONTSIZE_CONTENT_SMALL, view.api.isRedTeam('left') ? TextFieldConst.COLOR_WARN_RED3 : TextFieldConst.COLOR_QUALITY_BLUE);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, this._leftTeamNameTxt, leftbg, [10, 5]);
        this.addChildToContainer(this._leftTeamNameTxt);
        var cityNum = view.api.getCityInfo(this._cityId);
        this._leftTeamNumTxt = ComponentManager.getTextField(cityNum[0].toString(), 35, view.api.isRedTeam('left') ? TextFieldConst.COLOR_WARN_RED3 : TextFieldConst.COLOR_QUALITY_BLUE);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, this._leftTeamNumTxt, this._leftTeamNameTxt, [0, this._leftTeamNameTxt.textHeight + 5]);
        view.addChildToContainer(this._leftTeamNumTxt);
        // right
        var rightbg = BaseBitmap.create(view.api.isRedTeam('right') ? "countrywarcityleft" : "countrywarcityright");
        if (view.api.isRedTeam('right')) {
            rightbg.anchorOffsetX = rightbg.width / 2;
            rightbg.anchorOffsetY = rightbg.height / 2;
            rightbg.scaleX = -1;
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, rightbg, bg, [0, bg.height]);
        this.addChildToContainer(rightbg);
        this._rightTeamNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("CountryWarrightTeamNum"), TextFieldConst.FONTSIZE_CONTENT_SMALL, view.api.isRedTeam('right') ? TextFieldConst.COLOR_WARN_RED3 : TextFieldConst.COLOR_QUALITY_BLUE);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this._rightTeamNameTxt, rightbg, [10, 5]);
        this.addChildToContainer(this._rightTeamNameTxt);
        this._rightTeamNumTxt = ComponentManager.getTextField(cityNum[1].toString(), 35, view.api.isRedTeam('right') ? TextFieldConst.COLOR_WARN_RED3 : TextFieldConst.COLOR_QUALITY_BLUE);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this._rightTeamNumTxt, this._rightTeamNameTxt, [0, this._rightTeamNameTxt.textHeight + 5]);
        view.addChildToContainer(this._rightTeamNumTxt);
        if (view.api.getCurpeirod() == 3) {
            //crossservantwin crossservantlose
            var isLeft = view.api.getCityIsWin(this._cityId);
            var leftFlag = BaseBitmap.create(isLeft ? 'crossservantwin' : 'crossservantlose');
            leftFlag.setScale(0.7);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftFlag, leftbg, [0, -10]);
            view.addChildToContainer(leftFlag);
            var rightFlag = BaseBitmap.create(!isLeft ? 'crossservantwin' : 'crossservantlose');
            rightFlag.setScale(0.7);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rightFlag, rightbg, [0, -10]);
            view.addChildToContainer(rightFlag);
            var listbg = BaseBitmap.create('public_9_probiginnerbg');
            listbg.width = 530;
            listbg.height = 95;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, bg, [0, 170]);
            view.addChildToContainer(listbg);
            var str = Math.abs(view.api.getCityResult(data.cityId));
            var isWin = view.api.getCityIsWin(data.cityId) ? 1 : 0;
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("CountryWarCityResult" + str + "_" + isWin, [LanguageManager.getlocal("CountryWarCityName" + data.cityId)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, listbg, [10, 0]);
            view.addChildToContainer(tipTxt);
            var hfangBtn = ComponentManager.getButton("emphfang", '', function () {
                //打开战斗回放
                var num_arr = view.api.getCityInfo(data.cityId);
                if (num_arr[0] == 0 || num_arr[1] == 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("CountryWarCityTip7"));
                }
                else {
                    ViewController.getInstance().openView(ViewConst.COMMON.COUNTRYWARSHOWVIEW, {
                        cityId: data.cityId
                    });
                }
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, hfangBtn, listbg, [15, 0]);
            view.addChildToContainer(hfangBtn);
        }
        else {
            var lowestPowerTxt = ComponentManager.getTextField(LanguageManager.getlocal('CountryWarCityLowestPower', [LanguageManager.getlocal("CountryWarCityName" + data.cityId), view.cfg.cityLowestPower[data.cityId].power]), 20, TextFieldConst.COLOR_BROWN);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, lowestPowerTxt, bg, [0, 170]);
            view.addChildToContainer(lowestPowerTxt);
            var listbg = BaseBitmap.create('public_9_bg45');
            listbg.width = 530;
            listbg.height = 307;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, lowestPowerTxt, [0, lowestPowerTxt.textHeight + 5]);
            view.addChildToContainer(listbg);
            var arr = this.sortArr();
            var itemRect = new egret.Rectangle(0, 0, listbg.width - 10, listbg.height - 40);
            var scrollList = ComponentManager.getScrollList(CountryWarCityServantItem, arr, itemRect);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 5]);
            view.addChildToContainer(scrollList);
            view._list = scrollList;
            var cityTipTxt = ComponentManager.getTextField(LanguageManager.getlocal('CountryWarCityTip', [view.cfg.cityTotNum.toString(), view.cfg.citySerNum.toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, cityTipTxt, listbg, [0, 10]);
            view.addChildToContainer(cityTipTxt);
        }
    };
    // private test(style : number, servant : string, plan : number):void{
    // 	let view = this;
    // 	let cityId = view.param.data.cityId;
    // 	if(style == 1){//添加
    // 		view.api.servantInfo[cityId] = {};
    // 		view.api.servantInfo[cityId] = {
    // 			servant : servant,
    // 			stra : 0
    // 		}
    // 	}
    // 	else if(style == 2){//撤回
    // 		delete view.api.servantInfo[cityId];
    // 	}
    // 	else if(style == 3){//计策
    // 		view.api.servantInfo[cityId].stra = plan;
    // 	}
    // 	view.freshServant();
    // }
    /**
     * 刷新
     */
    CountryWarCityPopupView.prototype.refreashCity = function (event) {
        if (!event.data.ret) {
            return;
        }
        if (event.data.data.cmd = NetRequestConst.REQUEST_COUNTRYWAY_CANCELSERVANT) {
            App.CommonUtil.showTip(LanguageManager.getlocal("countryWarCancelServantTip"));
        }
        var arr = this.sortArr();
        this._list.refreshData(arr);
        var data = event.data.data.data;
        if (data.numpercity) {
            this.api.setMyCityInfo(data.numpercity);
        }
        if (data.tnumpercity) {
            this.api.setEnermyCityInfo(data.tnumpercity);
        }
        var cityNum = this.api.getCityInfo(this.param.data.cityId);
        this._leftTeamNumTxt.text = cityNum[0].toString();
        this._rightTeamNumTxt.text = cityNum[1].toString();
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, this._leftTeamNumTxt, this._leftTeamNameTxt, [0, this._leftTeamNameTxt.textHeight + 5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this._rightTeamNumTxt, this._rightTeamNameTxt, [0, this._rightTeamNameTxt.textHeight + 5]);
    };
    /** 排序 */
    CountryWarCityPopupView.prototype.sortArr = function () {
        var arr = [];
        var servant = Api.countryWarVoApi.getServant();
        var servantArr = {};
        for (var i in servant) {
            servantArr[servant[i].index] = {
                'servant': servant[i].servant,
                'totalattr': servant[i].dps,
                'stra': servant[i].stra ? servant[i].stra : 0,
                'cityId': Api.countryWarVoApi.getServerCityId(Number(i), true),
            };
        }
        for (var i = 0; i < Config.CountrywarCfg.cityTotNum; ++i) {
            if (servantArr[i]) {
                arr.push({
                    'servantID': servantArr[i].servant,
                    'servantTotalattr': servantArr[i].totalattr,
                    'stra': servantArr[i].stra,
                    'cityId': servantArr[i].cityId,
                });
                continue;
            }
            arr.push({
                'empty': true,
                'cityId': this._cityId,
            });
        }
        return arr;
    };
    CountryWarCityPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'childview_addicon', 'countrywarcitybg', 'crossservantwin', 'crossservantlose', 'emphfang'
        ]);
    };
    CountryWarCityPopupView.prototype.tick = function () {
        var view = this;
        if (view.api.getCountTime() == 0) {
            if (view.api.getCurpeirod() > 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("CountryWarCityTip1"));
                view.hide();
                return;
            }
        }
    };
    // private buzhenCallback(event: egret.Event): void {
    // 	let data = event.data;
    // 	let view = this;
    // 	if (!data) {
    // 		return;
    // 	}
    // 	let item: any = view._list.getItemByIndex(data.itemIndex);
    // 	item.fresh_servant({
    // 		id: data.servantId
    // 	});
    // }
    CountryWarCityPopupView.prototype.hide = function () {
        var view = this;
        //发个消息
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COUNTRYWAR_CHANGESERVANT);
        _super.prototype.hide.call(this);
    };
    CountryWarCityPopupView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_SELECTSTRATAGEM, view.refreashCity, view);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_EMPWEAR_BUZHEN_CHANGE, view.buzhenCallback, view);
        App.MessageHelper.removeNetMessage("countrywar", this.refreashCity, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_SELECTSERVANT, this.refreashCity, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_CANCELSERVANT, this.refreashCity, this);
        this._cancelCallback = null;
        this._confirmCallback = null;
        this._handler = null;
        this._bg = null;
        this._leftTeamNameTxt = null;
        this._leftTeamNumTxt = null;
        this._rightTeamNameTxt = null;
        this._rightTeamNumTxt = null;
        this._cityId = null;
        _super.prototype.dispose.call(this);
    };
    return CountryWarCityPopupView;
}(PopupView));
__reflect(CountryWarCityPopupView.prototype, "CountryWarCityPopupView");
//# sourceMappingURL=CountryWarCityPopupView.js.map