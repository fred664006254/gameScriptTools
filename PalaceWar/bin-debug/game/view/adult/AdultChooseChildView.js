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
 * 选择孩子列表
 * author dky
 * date 2017/10/31
 * @class AdultChooseChildView
 */
var AdultChooseChildView = (function (_super) {
    __extends(AdultChooseChildView, _super);
    function AdultChooseChildView() {
        var _this = _super.call(this) || this;
        _this._sortType = 1; //"adultChooseSort1":"属性降序", "adultChooseSort2":"默认排序",
        return _this;
    }
    AdultChooseChildView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "arena_bottom", "adultview",
            "adult_1_1", "adult_1_2", "adult_1_3", "adult_1_4", "adult_1_5", "adult_1_6",
            "adult_2_1", "adult_2_2", "adult_2_3", "adult_2_4", "adult_2_5", "adult_2_6"
        ]);
    };
    AdultChooseChildView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHILDMARRY, this.doMarry, this);
        this._handler = this.param.data.handler;
        this._confirmCallback = this.param.data.confirmCallback;
        this._childInfo = this.param.data.childInfo;
        // this.request(NetRequestConst.REQUEST_RADULT_GETPROPOSEE,null);
        var topBg = BaseBitmap.create("public_bg6");
        topBg.y = -21;
        this.addChildToContainer(topBg);
        var motherText = ComponentManager.getTextField(this._childInfo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        // this._motherText.text = Api.playerVoApi.getPlayerGold().toString();
        motherText.x = 20;
        motherText.y = 5;
        this.addChildToContainer(motherText);
        var myName = LanguageManager.getlocal("adultMarryFather") + this._childInfo.fatherName;
        var fatherText = ComponentManager.getTextField(myName, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        // this._motherText.text = Api.playerVoApi.getPlayerGold().toString();
        fatherText.x = 130;
        fatherText.y = 5;
        this.addChildToContainer(fatherText);
        var qualityStr = LanguageManager.getlocal("adult_quality") + LanguageManager.getlocal("adult_quality" + this._childInfo.aquality);
        var qualityText = ComponentManager.getTextField(qualityStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        // this._intimacyText.text = Api.playerVoApi.getPlayerGold().toString();
        qualityText.x = 330;
        qualityText.y = 5;
        this.addChildToContainer(qualityText);
        var attrStr = LanguageManager.getlocal("servant_infoAttr") + this._childInfo.total;
        var attTF = ComponentManager.getTextField(attrStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        attTF.x = 500;
        attTF.y = 5;
        this.addChildToContainer(attTF);
        var marryObjectTF = ComponentManager.getTextField(LanguageManager.getlocal("adultselectlianyin"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.container.setLayoutPosition(LayoutConst.horizontalCentertop, marryObjectTF, this.container, [0, 60], true);
        this.addChildToContainer(marryObjectTF);
        var bottomBg = BaseBitmap.create("public_9_bg23");
        bottomBg.width = GameConfig.stageWidth - 10;
        bottomBg.height = GameConfig.stageHeigth - 300;
        bottomBg.x = 5;
        bottomBg.y = 95;
        this.addChildToContainer(bottomBg);
        var childList = Api.adultVoApi.getAdultVoListById(this._childInfo.aquality, this._childInfo.sex);
        var arr = [];
        for (var i in childList) {
            var unit = childList[i];
            arr.push({
                'id': unit.id,
                'name': unit.name,
                'level': unit.level,
                'attrVo': unit.attrVo,
                'sex': unit.sex,
                'quality': unit.quality,
                'aquality': unit.aquality,
                'uid': this._childInfo.uid,
                'visit': unit.visit,
                'info': this.param.data.childInfo
            });
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 14, GameConfig.stageHeigth - 310);
        this._scrollList = ComponentManager.getScrollList(AdultChooseChildScrollItem, arr, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(bottomBg.x, bottomBg.y + 10);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("adultEmptyTip3"));
        var arena_bottom = BaseBitmap.create("arena_bottom");
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, arena_bottom, this.viewBg);
        this.addChild(arena_bottom);
        // let childList = Api.adultVoApi.getAdultVoListById(this._childInfo.aquality,this._childInfo.sex);
        // let rect = egret.Rectangle.create();
        // rect.setTo(0,0,508,bottomBg.height - 20);
        // this._scrollList = ComponentManager.getScrollList(AdultChooseChildScrollItem,childList,rect);
        // this.addChildToContainer(this._scrollList);
        // this._scrollList.setPosition(bottomBg.x + 7 ,bottomBg.y + 10);
        // this._scrollList.setEmptyTip(LanguageManager.getlocal("adultEmptyTip3"))
        //排序
        this._sortBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "adultChooseSort1", this.refreshHandler, this);
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._sortBtn, arena_bottom);
        // this._sortBtn.
        this.addChild(this._sortBtn);
        this._sortBtn.setColor(TextFieldConst.COLOR_BLACK);
    };
    //请求回调
    AdultChooseChildView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.cmd == NetRequestConst.REQUEST_RADULT_AGREEPROPOSE) {
                this.request(NetRequestConst.REQUEST_SADUN_GETINFO, null);
                if (data.data.data.proflag == 2) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip4"));
                    if (this.param.data.confirmCallback) {
                        this.param.data.confirmCallback.apply(this.param.data.handler, []);
                    }
                    this.hide();
                    return;
                }
                if (this.param.data.confirmCallback) {
                    this.param.data.confirmCallback.apply(this.param.data.handler, []);
                }
                // this._scrollList.refreshData(data.data.data.minfo)
                var childId = data.data.data.adultId;
                var adultInfoVo = Api.adultVoApi.getAdultMarryInfoVoById(childId);
                if (adultInfoVo) {
                    ViewController.getInstance().openView(ViewConst.BASE.ADULTMARRYSUCCESSVIEW, { childId: childId, confirmCallback: null, handler: this });
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY, null);
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip6"));
                }
                this.hide();
            }
            else if (data.data.cmd == NetRequestConst.REQUEST_RADULT_REFUSEPROPOSE) {
            }
        }
    };
    AdultChooseChildView.prototype.refreshHandler = function () {
        var childInfoList;
        if (this._sortType == 1) {
            this._sortType = 2;
            childInfoList = Api.adultVoApi.getAdultVoListByIdByAttr(this._childInfo.aquality, this._childInfo.sex);
            this._sortBtn.setText("adultChooseSort2");
        }
        else {
            this._sortType = 1;
            childInfoList = Api.adultVoApi.getAdultVoListById(this._childInfo.aquality, this._childInfo.sex);
            this._sortBtn.setText("adultChooseSort1");
        }
        var arr = [];
        for (var i in childInfoList) {
            var unit = childInfoList[i];
            arr.push({
                'id': unit.id,
                'name': unit.name,
                'level': unit.level,
                'attrVo': unit.attrVo,
                'sex': unit.sex,
                'quality': unit.quality,
                'aquality': unit.aquality,
                'uid': this._childInfo.uid,
                'visit': unit.visit,
                'info': this.param.data.childInfo
            });
        }
        this._scrollList.refreshData(arr);
    };
    //选择联姻
    AdultChooseChildView.prototype.doMarry = function (event) {
        var _this = this;
        var visitid = this._childInfo.visit; //0 无访问 1拜访过 2来访问过 3互访过
        var level = Api.adultVoApi.getVisitLevel({ visit: this._childInfo.visit, uid: this._childInfo.uid });
        var childList = Api.adultVoApi.getAdultVoListById(this._childInfo.aquality, this._childInfo.sex);
        var arr = [];
        var needTip = false;
        var laifang = false;
        if (this._childInfo.visit == Api.playerVoApi.getPlayerID()) {
            laifang = true;
        }
        for (var i in childList) {
            var unit = childList[i];
            var baifang = false;
            var hufang = false;
            if (unit.visit == this._childInfo.uid) {
                baifang = true;
            }
            if (laifang && baifang) {
                hufang = true;
            }
            if (hufang && unit.id != event.data.childId) {
                needTip = true;
            }
            if (hufang && unit.id == event.data.childId) {
                needTip = false;
                break;
            }
        }
        if (needTip) {
            var msg = LanguageManager.getlocal("adultchoosetip2");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: msg,
                callback: function () {
                    _this._selectChildId = event.data.childId;
                    ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { childId: event.data.childId, confirmCallback: _this.selectMarryHander, handler: _this });
                },
                handler: this,
                needCancel: true,
            });
        }
        else if (laifang && Api.adultVoApi.getAdultInfoVoById(event.data.childId).visit != this._childInfo.uid) {
            var msg = LanguageManager.getlocal("adultchoosetip1", [this._childInfo.fatherName]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: msg,
                callback: function () {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CLOSECHOOSE);
                    _this.hide();
                    ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: "baifang_1", f: null, o: null });
                },
                handler: this,
                needCancel: true,
                cancelcallback: function () {
                    _this._selectChildId = event.data.childId;
                    ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { childId: event.data.childId, confirmCallback: _this.selectMarryHander, handler: _this });
                },
            });
        }
        else {
            this._selectChildId = event.data.childId;
            ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { childId: event.data.childId, confirmCallback: this.selectMarryHander, handler: this });
        }
        // this.request(NetRequestConst.REQUEST_RADULT_REFUSEPROPOSE, { aid: event.data.id,isBatch:0 });
    };
    //选好了道具
    AdultChooseChildView.prototype.selectMarryHander = function (type) {
        this.request(NetRequestConst.REQUEST_RADULT_AGREEPROPOSE, { aid: this._childInfo.id, childId: this._selectChildId, protype: type });
    };
    AdultChooseChildView.prototype.chooseOneCallBack = function (type) {
        App.LogUtil.log(type);
    };
    AdultChooseChildView.prototype.dispose = function () {
        // 未婚滑动列表
        this._scrollList = null;
        this._confirmCallback = null;
        this._handler = null;
        this._timeTF = null;
        this._selectChildData = null;
        this._selectChildId = null;
        this._childInfo = null;
        this._sortBtn = null;
        this._sortType = 1;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHILDMARRY, this.doMarry, this);
        _super.prototype.dispose.call(this);
    };
    return AdultChooseChildView;
}(CommonView));
__reflect(AdultChooseChildView.prototype, "AdultChooseChildView");
//# sourceMappingURL=AdultChooseChildView.js.map