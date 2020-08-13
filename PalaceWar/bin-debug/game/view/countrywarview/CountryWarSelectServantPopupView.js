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
 * 门客选择界面
 * @author 张朝阳
 * date 2018/11/19
 * @class CountryWarSelectServantPopupView
 */
var CountryWarSelectServantPopupView = (function (_super) {
    __extends(CountryWarSelectServantPopupView, _super);
    function CountryWarSelectServantPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._isAscendingSort = false;
        _this._fightBtn = null;
        _this._servantList = [];
        _this._cfgId = null;
        return _this;
    }
    CountryWarSelectServantPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_SELECTSERVANT, this.servantSuccess, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SERVANT, this.refreashView, this);
        this._servantList = this.param.data.servantList;
        var cityId = this.param.data.cityId;
        var index = this.param.data.index;
        var topTxt = ComponentManager.getTextField(LanguageManager.getlocal("countryWarSelectServantPopupViewTopTitle", [LanguageManager.getlocal("CountryWarCityName" + cityId), Config.CountrywarCfg.cityLowestPower[cityId].power]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        topTxt.setPosition(this.viewBg.x + this.viewBg.width / 2 - topTxt.width / 2, this.viewBg.y + 15);
        this.addChildToContainer(topTxt);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 645;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, topTxt.y + topTxt.height + 15);
        this.addChildToContainer(bg);
        var sortList = this.sortServantPower();
        var rect = new egret.Rectangle(0, 0, bg.width, bg.height - 10);
        this._scrollList = ComponentManager.getScrollList(CountryWarSelectServantScrollItem, sortList, rect, { cityId: cityId, index: index });
        this._scrollList.setPosition(bg.x, bg.y + 5);
        this.addChildToContainer(this._scrollList);
    };
    /**门客势力排序 */
    CountryWarSelectServantPopupView.prototype.sortServantPower = function () {
        //cd门客
        var dispatchArr = [];
        //排序
        var sortArr = [];
        //特殊门客
        var specialArr = [];
        //用着的门客
        var useArr = [];
        for (var i = 0; i < this._servantList.length; i++) {
            var servant = this._servantList[i];
            if (Api.countryWarVoApi.isUseServant(servant.servantId)) {
                useArr.push(servant);
                continue;
            }
            if ((!Api.countryWarVoApi.isUseServant(servant.servantId)) && Api.countryWarVoApi.isServantRest(servant.servantId)) {
                dispatchArr.push(servant);
                continue;
            }
            if (Api.countryWarVoApi.isHaveServant(servant.servantId)) {
                specialArr.push(servant);
                continue;
            }
            sortArr.push(servant);
        }
        if (Api.switchVoApi.checkOpenExile()) {
            useArr.sort(function (a, b) {
                if (a.banishSt && (!b.banishSt)) {
                    return 1;
                }
                else if (a.banishSt && b.banishSt) {
                    return 0;
                }
                else if ((!a.banishSt) && b.banishSt) {
                    return -1;
                }
                else if ((!a.banishSt) && (!b.banishSt)) {
                    return 0;
                }
            });
            specialArr.sort(function (a, b) {
                if (a.banishSt && (!b.banishSt)) {
                    return 1;
                }
                else if (a.banishSt && b.banishSt) {
                    return 0;
                }
                else if ((!a.banishSt) && b.banishSt) {
                    return -1;
                }
                else if ((!a.banishSt) && (!b.banishSt)) {
                    return 0;
                }
            });
            sortArr.sort(function (a, b) {
                if (a.banishSt && (!b.banishSt)) {
                    return 1;
                }
                else if (a.banishSt && b.banishSt) {
                    return 0;
                }
                else if ((!a.banishSt) && b.banishSt) {
                    return -1;
                }
                else if ((!a.banishSt) && (!b.banishSt)) {
                    return 0;
                }
            });
            dispatchArr.sort(function (a, b) {
                if (a.banishSt && (!b.banishSt)) {
                    return 1;
                }
                else if (a.banishSt && b.banishSt) {
                    return 0;
                }
                else if ((!a.banishSt) && b.banishSt) {
                    return -1;
                }
                else if ((!a.banishSt) && (!b.banishSt)) {
                    return 0;
                }
            });
        }
        for (var i = 0; i < specialArr.length; i++) {
            sortArr.unshift(specialArr[specialArr.length - 1 - i]);
        }
        for (var i = 0; i < useArr.length; i++) {
            sortArr.unshift(useArr[useArr.length - 1 - i]);
        }
        for (var i = 0; i < dispatchArr.length; i++) {
            sortArr.push(dispatchArr[i]);
        }
        return sortArr;
    };
    CountryWarSelectServantPopupView.prototype.servantSuccess = function (event) {
        if (event.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("countryWarSuccessServantTip"));
            this.hide();
        }
        // else
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("countryWarFailServantTip"));
        // }
    };
    CountryWarSelectServantPopupView.prototype.refreashView = function () {
        var servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(1);
        var servantInfoList = [];
        for (var key in servantInfoVoList) {
            var item = servantInfoVoList[key];
            var fightValue = item.total;
            var servantInfo = { servantId: item.servantId, servantName: item.servantName, level: item.level, fightValue: fightValue, qualityBoxImgPath: item.qualityBoxImgPath, halfImgPath: item.halfImgPath, banishSt: item.banishSt };
            servantInfoList.push(servantInfo);
        }
        servantInfoList.sort(function (a, b) {
            return b.fightValue - a.fightValue;
        });
        this._servantList = servantInfoList;
        var sortList = this.sortServantPower();
        this._scrollList.refreshData(sortList, { cityId: this.param.data.cityId, index: this.param.data.index });
    };
    CountryWarSelectServantPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "awservantstate1", "discusspqzhong"
        ]);
    };
    CountryWarSelectServantPopupView.prototype.getTitleStr = function () {
        return "allianceWarSelectServantPopupViewTitle";
    };
    CountryWarSelectServantPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_SELECTSERVANT, this.servantSuccess, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SERVANT, this.refreashView, this);
        this._scrollList = null;
        this._isAscendingSort = false;
        this._fightBtn = null;
        this._servantList = [];
        this._cfgId = null;
        _super.prototype.dispose.call(this);
    };
    return CountryWarSelectServantPopupView;
}(PopupView));
__reflect(CountryWarSelectServantPopupView.prototype, "CountryWarSelectServantPopupView");
//# sourceMappingURL=CountryWarSelectServantPopupView.js.map