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
 * 标签1 家人列表
 * author qianjun
 */
var AcCrossServerWifeTalentViewTab2 = (function (_super) {
    __extends(AcCrossServerWifeTalentViewTab2, _super);
    function AcCrossServerWifeTalentViewTab2(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._allTalentTxt = null;
        _this._descTxt = null;
        _this._barWifeTxt = null;
        _this._barStatusTxt = null;
        _this._caiyiTxt = null;
        _this._caiqingTxt = null;
        _this._orderImg = null;
        _this._opTxt = null;
        _this._title = null;
        _this._isOrderDown = true;
        _this._isHaveBuff = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcCrossServerWifeTalentViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL, this.refreshList, this);
        var isHaveBuff = false;
        var h = 80;
        if (this.checkHaveBuff()) {
            isHaveBuff = true;
            h = 168;
        }
        var topBg = BaseBitmap.create("wifetalenttopbg");
        topBg.width = 614;
        topBg.x = 640 / 2 - topBg.width / 2;
        topBg.scaleY = 150 / 118;
        topBg.y = 15;
        this.addChild(topBg);
        var model = this.vo.wifebattlecross;
        var plusv = this.vo.test ? 0 : (model.info.totaltactadd ? model.info.totaltactadd : 0);
        var allTalentStr = null;
        if (!isHaveBuff) {
            allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt1", [String(model.info.totaltalent)]);
        }
        else {
            allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt2", [String(this.vo.test ? 0 : model.info.totaltalent), String(plusv)]);
        }
        this._allTalentTxt = ComponentManager.getTextField(allTalentStr, 20, TextFieldConst.COLOR_BLACK);
        this._allTalentTxt.lineSpacing = 5;
        this._allTalentTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._allTalentTxt, topBg, [0, 10]);
        this.addChild(this._allTalentTxt);
        //边框
        var borderBg = BaseBitmap.create("public_9_bg32");
        borderBg.width = 610;
        borderBg.height = GameConfig.stageHeigth - 143 - 133 - 40 - 18; //666
        borderBg.x = 320 - borderBg.width / 2;
        borderBg.y = topBg.y + topBg.height * topBg.scaleY + 8;
        this.addChild(borderBg);
        var title = BaseBitmap.create("qingyuanitemtitlebg");
        title.width = borderBg.width - 20;
        title.x = borderBg.x + borderBg.width / 2 - title.width / 2;
        title.y = borderBg.y + 15;
        this._title = title;
        this.addChild(title);
        // 		private _barWifeTxt:BaseTextField = null;
        // private _barStatusTxt:BaseTextField = null;
        // private _caiyiTxt:BaseTextField = null;
        // private _caiqingTxt:BaseTextField = null;
        // private _orderImg:BaseBitmap = null;
        // private _opTxt:BaseTextField = null;
        this._barWifeTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarWife"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._barWifeTxt.x = title.x + 47;
        this._barWifeTxt.y = title.y + title.height / 2 - this._barWifeTxt.height / 2;
        this.addChild(this._barWifeTxt);
        this._barStatusTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarStatus"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._barStatusTxt.x = 198 - 19 - this._barStatusTxt.height / 2;
        this._barStatusTxt.y = title.y + title.height / 2 - this._barStatusTxt.height / 2;
        this.addChild(this._barStatusTxt);
        this._caiyiTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarCaiyi"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._caiyiTxt.x = 280 - 23 - this._caiyiTxt.height / 2;
        this._caiyiTxt.y = title.y + title.height / 2 - this._caiyiTxt.height / 2;
        this.addChild(this._caiyiTxt);
        this._caiqingTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarCaiqing"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._caiqingTxt.x = 380 - 16 - this._caiqingTxt.height / 2;
        this._caiqingTxt.y = title.y + title.height / 2 - this._caiqingTxt.height / 2;
        this.addChild(this._caiqingTxt);
        this._opTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarOp"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._opTxt.x = 530 - this._opTxt.height / 2;
        this._opTxt.y = title.y + title.height / 2 - this._opTxt.height / 2;
        this.addChild(this._opTxt);
        this._orderImg = ComponentManager.getButton("wifebattleview_updown", null, this.orderHandler, this, null, 3);
        this._orderImg.scaleY = -1;
        this._orderImg.x = this._caiqingTxt.x + this._caiqingTxt.width - 50;
        this._orderImg.y = title.y + title.height / 2 - this._orderImg.height * this._orderImg.scaleY / 2;
        // this._orderImg.y = title.y + title.height/2 - this._orderImg.height/2;
        this.addChild(this._orderImg);
        var rect = new egret.Rectangle(0, 0, 600, borderBg.height - 70);
        // let list = Api.dailytaskVoApi.getTaskIdListAfterSort();
        var list = [];
        var wifeadd_arr = this.vo.test ? [] : (model.info.tmpattr.wifeadd_arr);
        if (wifeadd_arr.length) {
            for (var i in wifeadd_arr) {
                var unit = wifeadd_arr[i];
                if (Api.wifestatusVoApi.getWifestatusLevelById(unit.wid) == "1") {
                    continue;
                }
                list.push(unit);
            }
        }
        list = list ? list : [];
        list.sort(function (a, b) {
            return b.talentadd - a.talentadd;
        });
        this._scrollList = ComponentManager.getScrollList(WifeAllTalentScrollItem, list, rect, {
            aid: this.param.data.aid,
            code: this.param.data.code
        });
        this._scrollList.x = 320 - this._scrollList.width / 2;
        this._scrollList.y = title.y + title.height + 5;
        this.addChild(this._scrollList);
    };
    AcCrossServerWifeTalentViewTab2.prototype.orderHandler = function () {
        this._isOrderDown = !this._isOrderDown;
        if (this._isOrderDown) {
            this._orderImg.scaleY = -1;
        }
        else {
            this._orderImg.scaleY = 1;
        }
        this._orderImg.y = this._title.y + this._title.height / 2 - this._orderImg.height * this._orderImg.scaleY / 2;
        this.refreshList(null);
    };
    AcCrossServerWifeTalentViewTab2.prototype.checkHaveBuff = function () {
        return true;
    };
    Object.defineProperty(AcCrossServerWifeTalentViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWifeTalentViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeTalentViewTab2.prototype.refreshWhenSwitchBack = function () {
        _super.prototype.refreshWhenSwitchBack.call(this);
        this.refreshList(null);
    };
    AcCrossServerWifeTalentViewTab2.prototype.refreshList = function (evt) {
        if (evt) {
            var data = evt.data.data.data;
            this.vo.setWifebattleInfo(data.wifebattlecross);
        }
        var model = this.vo.wifebattlecross;
        var plusv = this.vo.test ? 0 : (model.info.totaltactadd ? model.info.totaltactadd : 0);
        var allTalentStr = null;
        if (!this.checkHaveBuff()) {
            allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt1", [String(this.vo.test ? 0 : model.info.totaltalent)]);
        }
        else {
            allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt2", [String(this.vo.test ? 0 : model.info.totaltalent), String(plusv)]);
        }
        this._allTalentTxt.text = allTalentStr;
        var list = [];
        var wifeadd_arr = this.vo.test ? [] : (model.info.tmpattr.wifeadd_arr);
        if (wifeadd_arr.length) {
            for (var i in wifeadd_arr) {
                var unit = wifeadd_arr[i];
                if (Api.wifestatusVoApi.getWifestatusLevelById(unit.wid) == "1") {
                    continue;
                }
                list.push(unit);
            }
        }
        list = list ? list : [];
        if (this._isOrderDown) {
            list.sort(function (a, b) {
                return b.talentadd - a.talentadd;
            });
            this._scrollList.refreshData(list, {
                aid: this.param.data.aid,
                code: this.param.data.code
            });
        }
        else {
            list.sort(function (a, b) {
                return a.talentadd - b.talentadd;
            });
            this._scrollList.refreshData(list, {
                aid: this.param.data.aid,
                code: this.param.data.code
            });
        }
    };
    AcCrossServerWifeTalentViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL, this.refreshList, this);
        this._scrollList = null;
        this._allTalentTxt = null;
        this._descTxt = null;
        this._barWifeTxt = null;
        this._barStatusTxt = null;
        this._caiyiTxt = null;
        this._caiqingTxt = null;
        this._orderImg = null;
        this._opTxt = null;
        this._title = null;
        this._isOrderDown = true;
        this._isHaveBuff = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeTalentViewTab2;
}(CommonViewTab));
__reflect(AcCrossServerWifeTalentViewTab2.prototype, "AcCrossServerWifeTalentViewTab2");
//# sourceMappingURL=AcCrossServerWifeTalentViewTab2.js.map