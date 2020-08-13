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
 * 出战选择门客item
 * author qianjun
 * date 2017/10/12
 */
var AcConquerMainLandSearvantSelectItem = (function (_super) {
    __extends(AcConquerMainLandSearvantSelectItem, _super);
    function AcConquerMainLandSearvantSelectItem() {
        var _this = _super.call(this) || this;
        _this._Index = 0;
        _this._cardbg = null;
        _this._icon = null;
        _this._deleteBtn = null;
        _this._costIcon = null;
        _this._costTxt = null;
        _this._costButton = null;
        _this._freeTxt = null;
        _this._mask = null;
        _this._flag = null;
        _this._selected = false;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcConquerMainLandSearvantSelectItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSearvantSelectItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSearvantSelectItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSearvantSelectItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_CONQUERMAINLAND;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSearvantSelectItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandSearvantSelectItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcConquerMainLandSearvantSelectItem.prototype.initItem = function (index, data, itemparam) {
        // --时间与分数倍率。倍率为0的时间段为休战期
        // --startTime:开始时间
        // --endTime:结束时间
        // --buff:分数倍率：获得分数 = 位置分数 * 分数倍率
        var view = this;
        view._code = itemparam;
        view._data = data;
        view._Index = index;
        view.width = 92 + 8;
        view.height = 115 + 10;
        view._servantInfoVo = data.data;
        view.initServantIcon(data);
    };
    AcConquerMainLandSearvantSelectItem.prototype.initServantIcon = function (data) {
        var view = this;
        var code = view.getUiCode();
        var servantInfoVo = data.data;
        var temW = 92;
        var iconBgBt = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.qualityBoxImgPath : 'servant_cardbg_0');
        this.addChild(iconBgBt);
        iconBgBt.scaleX = temW / 194;
        iconBgBt.scaleY = temW / 192;
        view._cardbg = iconBgBt;
        var iconBt = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.halfImgPath : 'servant_half_empty');
        iconBt.x = iconBgBt.x + 5;
        iconBt.y = iconBgBt.y + 5;
        this.addChild(iconBt);
        iconBt.scaleX = (temW - 10) / 180;
        iconBt.scaleY = (temW - 10) / 177;
        view._icon = iconBt;
        //兵力数目
        var numbg = BaseBitmap.create("servant_namebg");
        numbg.width = 88;
        numbg.height = 24;
        numbg.setPosition(2, 65);
        this.addChild(numbg);
        var total = servantInfoVo.total;
        var numTxt = ComponentManager.getTextField(App.StringUtil.changeIntToText(total), 18);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numTxt, numbg);
        this.addChild(numTxt);
        var icon2 = BaseLoadBitmap.create("itemicon1");
        icon2.width = icon2.height = 33;
        view.addChild(icon2);
        view._costIcon = icon2;
        var costObj = view.vo.getServantCost(servantInfoVo.servantId);
        var costTxt = ComponentManager.getTextField("" + costObj.cost, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(costTxt);
        view._costTxt = costTxt;
        var tmpx = (temW - icon2.width - 3 - costTxt.textWidth) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, icon2, view, [tmpx, 0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, icon2, [icon2.width + 3, 0]);
        var freeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandArmyFree-" + code, [costObj.freeNum.toString()]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(freeTxt);
        view._freeTxt = freeTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, freeTxt, view, [0, 10]);
        costTxt.visible = icon2.visible = costObj.freeNum <= 0;
        freeTxt.visible = costObj.freeNum > 0;
        // let selectBtn = ComponentManager.getButton('discussclose', '', view.deleteClick, view);
        // view.setLayoutPosition(LayoutConst.righttop, selectBtn, view);
        // view.addChild(selectBtn);
        // view._deleteBtn = selectBtn;
        // view._deleteBtn.visible = view._data.select && !view._data.empty;
        var mask = BaseBitmap.create("mlservantmask-" + code);
        mask.width = 102;
        mask.height = 95;
        view.addChild(mask);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, mask, view, [-5, -2]);
        view._mask = mask;
        var attend = view.vo.getServantAttend(servantInfoVo.servantId);
        var flag = BaseBitmap.create(attend == data.army ? "mlservantselected-" + view.getUiCode() : "awservantstate1");
        flag.setScale(83 / flag.width);
        view.addChild(flag);
        view._flag = flag;
        flag.setPosition(6, 20);
        mask.visible = flag.visible = attend > 0;
        view._selected = attend == data.army;
        view.addTouchTap(view.clickSelect, view, null);
    };
    //数据刷新
    AcConquerMainLandSearvantSelectItem.prototype.refreshData = function (data) {
        var view = this;
        var servantInfoVo = view._servantInfoVo;
        var costObj = view.vo.getServantCost(servantInfoVo.servantId);
        view._costTxt.text = "" + costObj.cost;
        var tmpx = (92 - view._costIcon.width - 3 - view._costTxt.textWidth) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, view._costIcon, view, [tmpx, 0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._costTxt, view._costIcon, [view._costIcon.width + 3, 0]);
        view._freeTxt.text = LanguageManager.getlocal("acConquerMainLandArmyFree-" + view.getUiCode(), [costObj.freeNum.toString()]);
        view._costTxt.visible = view._costIcon.visible = costObj.freeNum <= 0;
        view._freeTxt.visible = costObj.freeNum > 0;
        //mlservantselected
    };
    //切换选中状态
    AcConquerMainLandSearvantSelectItem.prototype.clickSelect = function () {
        var view = this;
        var servantInfoVo = view._servantInfoVo;
        var attend = view.vo.getServantAttend(servantInfoVo.servantId);
        if (attend > 0 && attend != view._data.army) {
            return;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE, {
            type: view._selected ? "delete" : "add",
            servantId: servantInfoVo.servantId,
            idx: view._Index
        });
    };
    AcConquerMainLandSearvantSelectItem.prototype.checkSelect = function (bool) {
        if (bool === void 0) { bool = 0; }
        var view = this;
        var attend = view.vo.getServantAttend(view._servantInfoVo.servantId);
        if (attend > 0 && attend != view._data.army) {
            view._selected = true;
            view._flag.setRes("awservantstate1");
            view._flag.setScale(83 / view._flag.width);
            view._flag.setPosition(6, 20);
            view._mask.visible = view._flag.visible = view._selected;
            return;
        }
        if (bool == 1) {
            view._selected = true;
        }
        else if (bool == 2) {
            view._selected = false;
        }
        else {
            view._selected = !view._selected;
        }
        view._flag.setRes("mlservantselected-" + view.getUiCode());
        view._flag.setScale(83 / view._flag.width);
        view._flag.setPosition(6, 20);
        view._mask.visible = view._flag.visible = view._selected;
    };
    AcConquerMainLandSearvantSelectItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcConquerMainLandSearvantSelectItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcConquerMainLandSearvantSelectItem.prototype.dispose = function () {
        var view = this;
        BaseLoadBitmap.release(view._icon);
        BaseLoadBitmap.release(view._cardbg);
        view._servantInfoVo = null;
        view._icon = null;
        view._cardbg = null;
        view._deleteBtn = null;
        view._costIcon = null;
        view._costTxt = null;
        view._costButton = null;
        view._freeTxt = null;
        view._mask = null;
        view._flag = null;
        view._selected = false;
        view.removeTouchTap();
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandSearvantSelectItem;
}(ScrollListItem));
__reflect(AcConquerMainLandSearvantSelectItem.prototype, "AcConquerMainLandSearvantSelectItem");
//# sourceMappingURL=AcConquerMainLandSearvantSelectItem.js.map