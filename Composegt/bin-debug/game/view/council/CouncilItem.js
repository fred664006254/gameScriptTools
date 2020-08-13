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
 * 议事事件item
 * author dky
 * date 2017/10/12
 * @class ChildScrollItem
 */
var CouncilItem = (function (_super) {
    __extends(CouncilItem, _super);
    function CouncilItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    Object.defineProperty(CouncilItem.prototype, "api", {
        get: function () {
            return Api.councilVoApi;
        },
        enumerable: true,
        configurable: true
    });
    CouncilItem.prototype.initItem = function (index, data) {
        var view = this;
        view.width = 570;
        view.height = 231 + 30;
        view._data = data;
        var eid = data.eventId;
        var type = data.eventNeedType;
        var joinNum = data.joinNum;
        var __bg = BaseBitmap.create("activity_db_01");
        __bg.width = this.width;
        __bg.height = this.height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, __bg, view);
        view.addChild(__bg);
        //底图
        var bg = BaseBitmap.create("discussevent" + (type == 0 ? 5 : type) + "bg");
        bg.width = 556;
        bg.height = 176;
        bg.x = __bg.x + __bg.width / 2 - bg.width / 2;
        bg.y = __bg.y + 8;
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, __bg,[]);
        view.addChild(bg);
        //事件类型
        var needImg = BaseLoadBitmap.create("servant_speciality" + (type == 0 ? 6 : type));
        needImg.width = 55;
        needImg.height = 57;
        view.setLayoutPosition(LayoutConst.lefttop, needImg, bg, [5, 5]);
        view.addChild(needImg);
        // let blackBgRect: BaseBitmap = BaseBitmap.create("public_9_bg20");
        // blackBgRect.width = view.width - 10;
        // blackBgRect.height = 70;
        // view.setLayoutPosition(LayoutConst.horizontalCenterbottom, blackBgRect, bg);
        // view.addChild(blackBgRect);
        //事件名
        var rid = view.api.getDescId(eid);
        var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("discussViewEventName" + type + "_" + rid), 20, TextFieldConst.COLOR_BROWN);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, bg, [10, bg.height + 10]);
        view.addChild(nameTxt);
        //所需述性
        var needTypeTxt = ComponentManager.getTextField(LanguageManager.getlocal("discussViewNeedType", [LanguageManager.getlocal("servantInfo_speciality" + (type == 0 ? 7 : type))]), 20, TextFieldConst.COLOR_BROWN);
        // needTypeTxt.x = nameTxt.x ;
        // needTypeTxt.y = nameTxt.y + 20;
        view.setLayoutPosition(LayoutConst.lefttop, needTypeTxt, bg, [10, bg.height + 30]);
        view.addChild(needTypeTxt);
        //是否参加
        var isVistTxt = ComponentManager.getTextField(LanguageManager.getlocal("discussViewIsVisit" + (view.api.isVisitEvent(eid) ? 1 : 2)), 20, TextFieldConst.COLOR_BROWN);
        view.setLayoutPosition(LayoutConst.lefttop, isVistTxt, bg, [bg.width / 2 - 70, bg.height + 30]);
        // needTypeTxt.x = bg.x +bg.width/2;
        // needTypeTxt.y = needTypeTxt.y ;
        view.addChild(isVistTxt);
        //查看事件按钮
        var str = 'discussViewCkanVisit';
        if (view.api.canGetReward(data.eventId)) {
            str = 'DragonBoatDayLq';
        }
        var cksjianBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, str, view.cksjianClick, view);
        view.setLayoutPosition(LayoutConst.righttop, cksjianBtn, bg, [5, bg.height + 10]);
        view.addChild(cksjianBtn);
        var public_dot1 = BaseBitmap.create("public_dot2");
        view.setLayoutPosition(LayoutConst.righttop, public_dot1, cksjianBtn, [0 - public_dot1.width / 4, -public_dot1.height / 4]);
        public_dot1.visible = view.api.canGetReward(data.eventId);
        view.addChild(public_dot1);
        //事件类型
        var joinBg = BaseBitmap.create("public_numbg"); //(`discussredbg`);
        joinBg.height = 60;
        view.setLayoutPosition(LayoutConst.righttop, joinBg, bg, [20, 10]);
        view.addChild(joinBg);
        var joinTxt = ComponentManager.getTextField(LanguageManager.getlocal("discussviewJoinNum", [joinNum, view.api.getMaxJoinNum()]), 20, view.api.isVisitEvent(eid) ? 0x21eb39 : (joinNum >= Config.CouncilCfg.maxPlayer ? 0xff3c3c : 0xfedb38));
        joinTxt.textAlign = egret.HorizontalAlign.CENTER;
        joinTxt.lineSpacing = 4;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, joinTxt, joinBg);
        view.addChild(joinTxt);
    };
    CouncilItem.prototype.cksjianClick = function () {
        var view = this;
        // ViewController.getInstance().openView(ViewConst.POPUP.COUNCILREWARDPOPUPVIEW, {
        //     eventId : "1",//data.eventId,
        //     exp : "1_5_1000",//data.exp,
        //     servantData : {1007: "14_1_1000",1008: "14_1_1000",1009: "14_1_1000",1001: "14_1_1000",1001: "14_1_1000"},//data.servantData,
        //     rank : '3',//data.myrankArr.myrank
        // });
        // return;
        if (view.api.getCurpeirod() == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("discussJoinEventTip8"));
            return;
        }
        if (view.api.getCurpeirod() == 3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("discussJoinEventTip9"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.COUNCILEVENTVIEW, view._data);
    };
    CouncilItem.prototype.getSpaceY = function () {
        return 10;
    };
    CouncilItem.prototype.dispose = function () {
        // this._node
        _super.prototype.dispose.call(this);
    };
    return CouncilItem;
}(ScrollListItem));
__reflect(CouncilItem.prototype, "CouncilItem");
