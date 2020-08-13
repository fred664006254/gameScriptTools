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
var AcThreeKingdomsTaskSelectServantItem = (function (_super) {
    __extends(AcThreeKingdomsTaskSelectServantItem, _super);
    function AcThreeKingdomsTaskSelectServantItem() {
        var _this = _super.call(this) || this;
        _this._Index = 0;
        _this._cardbg = null;
        _this._icon = null;
        _this._mask = null;
        _this._flag = null;
        _this._selected = false;
        _this._numTxt = null;
        _this.flag = 0;
        _this._isBegin = false;
        _this.cityid = 0;
        _this._code = '';
        _this._timer = null;
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsTaskSelectServantItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_THREEKINGDOMS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsTaskSelectServantItem.prototype.initItem = function (index, data, itemparam) {
        // --时间与分数倍率。倍率为0的时间段为休战期
        // --startTime:开始时间
        // --endTime:结束时间
        // --buff:分数倍率：获得分数 = 位置分数 * 分数倍率
        var view = this;
        view._code = itemparam.code;
        view.cityid = itemparam.cityid;
        view._data = data;
        view._Index = index;
        view.width = 90 + 8;
        view.height = 90 + 10;
        view._servantInfoVo = data.data;
        view.initServantIcon(data);
    };
    AcThreeKingdomsTaskSelectServantItem.prototype.initServantIcon = function (data) {
        var view = this;
        var servantInfoVo = data.data;
        var temW = 90;
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
        iconBt.addTouch(this.touchEmoticonHandler, this);
        //兵力数目
        var numbg = BaseBitmap.create("servant_namebg");
        numbg.width = 88;
        numbg.height = 24;
        numbg.setPosition(2, 65);
        this.addChild(numbg);
        var total = servantInfoVo.getTotalBookValue(view.cityid - 1);
        var numTxt = ComponentManager.getTextField(App.StringUtil.changeIntToText(total), 18);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numTxt, numbg);
        this.addChild(numTxt);
        view._numTxt = numTxt;
        numTxt.textColor = total >= view._data.need ? TextFieldConst.COLOR_WHITE : TextFieldConst.COLOR_WARN_RED;
        // let selectBtn = ComponentManager.getButton('discussclose', '', view.deleteClick, view);
        // view.setLayoutPosition(LayoutConst.righttop, selectBtn, view);
        // view.addChild(selectBtn);
        // view._deleteBtn = selectBtn;
        // view._deleteBtn.visible = view._data.select && !view._data.empty;
        var mask = BaseBitmap.create("mlservantmask-1");
        mask.width = 95;
        mask.height = 95;
        view.addChild(mask);
        mask.setPosition(-3, -3);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, mask, view, [-5,-2]);
        view._mask = mask;
        var attend = view._data.isAttend;
        var flag = BaseBitmap.create("awservantstate1"); //awservantstate1
        flag.setScale(83 / flag.width);
        view.addChild(flag);
        view._flag = flag;
        flag.setPosition(6, 20);
        mask.visible = flag.visible = attend;
        view._selected = false;
        view.addTouch(view.touchEmoticonHandler, view, null);
        this._timer = new egret.Timer(700, 0);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerCallFunc, this);
    };
    AcThreeKingdomsTaskSelectServantItem.prototype.timerCallFunc = function () {
        if (this.flag == 1) {
            this._isBegin = false;
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, this._servantInfoVo.servantId);
        }
    };
    //数据刷新
    AcThreeKingdomsTaskSelectServantItem.prototype.refreshData = function (data) {
        var view = this;
        var servantInfoVo = view._servantInfoVo;
        //mlservantselected
    };
    AcThreeKingdomsTaskSelectServantItem.prototype.tick = function () {
        var view = this;
    };
    AcThreeKingdomsTaskSelectServantItem.prototype.touchEmoticonHandler = function (e) {
        var view = this;
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            view._timer.start();
            view.flag = 1;
            this._isBegin = true;
        }
        else if (e.type == egret.TouchEvent.TOUCH_END) {
            view._timer.stop();
            view.flag = 0;
            if (this._isBegin) {
                this._isBegin = false;
                this.clickSelect();
            }
        }
        else if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
            view._timer.stop();
            view.flag = 0;
        }
    };
    //切换选中状态
    AcThreeKingdomsTaskSelectServantItem.prototype.clickSelect = function () {
        var view = this;
        var servantInfoVo = view._servantInfoVo;
        var attend = view._data.isAttend;
        if (attend) {
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstasktip9", view._code)));
            return;
        }
        var sid = view._servantInfoVo.servantId;
        var bookvalue = view._servantInfoVo.getTotalBookValue(view.cityid - 1);
        if (Object.keys(view.vo.selectServant).length < 5) {
            if (bookvalue >= view._data.need) {
                view._selected = !view._selected;
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstasktip8", view._code)));
            }
        }
        else {
            if (view._selected) {
                view._selected = !view._selected;
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstasktip7", view._code)));
                return;
            }
        }
        view._mask.visible = view._flag.visible = view._selected;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE, {
            type: view._selected ? "add" : "delete",
            servantId: servantInfoVo.servantId,
            idx: view._Index
        });
    };
    AcThreeKingdomsTaskSelectServantItem.prototype.checkSelect = function (bool) {
        if (bool === void 0) { bool = 0; }
        var view = this;
        var attend = view.vo.getServantAttend(view._servantInfoVo.servantId);
        if (attend) {
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
        view._flag.setRes("mlservantselected-1");
        view._flag.setScale(83 / view._flag.width);
        view._flag.setPosition(6, 20);
        view._mask.visible = view._flag.visible = view._selected;
    };
    AcThreeKingdomsTaskSelectServantItem.prototype.refresh = function () {
        var view = this;
        var data = view._data;
        if (!data.empty) {
            var servantinfo = data.data;
            var total = servantinfo.getTotalBookValue(view.cityid - 1);
            view._numTxt.text = App.StringUtil.changeIntToText(total);
            view._numTxt.x = (view.width - view._numTxt.textWidth) / 2;
            view._numTxt.textColor = total >= view._data.need ? TextFieldConst.COLOR_WHITE : TextFieldConst.COLOR_WARN_RED;
        }
    };
    AcThreeKingdomsTaskSelectServantItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcThreeKingdomsTaskSelectServantItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcThreeKingdomsTaskSelectServantItem.prototype.dispose = function () {
        var view = this;
        BaseLoadBitmap.release(view._icon);
        BaseLoadBitmap.release(view._cardbg);
        view._servantInfoVo = null;
        view._icon = null;
        view._cardbg = null;
        view._mask = null;
        view._flag = null;
        view._selected = false;
        view._numTxt = null;
        view.removeTouchTap();
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerCallFunc, this);
        this._timer.stop();
        this._timer = null;
        this.flag = 0;
        this._isBegin = false;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsTaskSelectServantItem;
}(ScrollListItem));
__reflect(AcThreeKingdomsTaskSelectServantItem.prototype, "AcThreeKingdomsTaskSelectServantItem");
//# sourceMappingURL=AcThreeKingdomsTaskSelectServantItem.js.map