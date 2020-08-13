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
 * 帮会战斗准备期倒计时界面
 * author qianjun
 */
var AllianceWarVsView = (function (_super) {
    __extends(AllianceWarVsView, _super);
    function AllianceWarVsView() {
        var _this = _super.call(this) || this;
        _this._timeCdTxt = null;
        return _this;
    }
    Object.defineProperty(AllianceWarVsView.prototype, "api", {
        get: function () {
            return Api.allianceWarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    AllianceWarVsView.prototype.initView = function () {
        var view = this;
        view.height = GameConfig.stageHeigth;
        var logo = BaseBitmap.create('awlogo');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, logo, view, [0, 15]);
        view.addChildToContainer(logo);
        var timebg = BaseBitmap.create('awbattletimebg');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timebg, logo, [0, logo.height - 10]);
        view.addChildToContainer(timebg);
        var timeTxt = ComponentManager.getTextField(LanguageManager.getlocal('allianceWarTimeCountDown', [App.DateUtil.getFormatBySecond(view.api.getCountDown())]), 22, TextFieldConst.COLOR_LIGHT_YELLOW); //App.DateUtil.getFormatBySecond(time);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timeTxt, timebg);
        view.addChildToContainer(timeTxt);
        view._timeCdTxt = timeTxt;
        view.createWarInfo(LayoutConst.left);
        view.createWarInfo(LayoutConst.right);
    };
    AllianceWarVsView.prototype.createWarInfo = function (type) {
        var view = this;
        var blue = type == LayoutConst.left;
        var wardata = view.api.getThisWarLog(blue ? 1 : 2);
        var group = new BaseDisplayObjectContainer();
        group.width = GameConfig.stageWidth / 2;
        // group.height = GameConfig.stageHeigth - 220;
        group.height = 650;
        App.DisplayUtil.setLayoutPosition(blue ? LayoutConst.leftbottom : LayoutConst.rightbottom, group, view);
        if (blue) {
            group.x = 0;
        }
        else {
            group.x = GameConfig.stageWidth / 2;
        }
        view.addChild(group);
        //人物形象
        var oinfo = blue ? view.api.oinfo : view.api.tinfo.oinfo;
        var lv = oinfo ? oinfo.ldlevel : 1;
        var title = oinfo ? oinfo.ldtitle : 0;
        var pic = oinfo ? oinfo.pic : 1;
        if (Number(title) > 0) {
            lv = title;
        }
        var roleContainer = Api.playerVoApi.getPlayerPortrait(lv, pic);
        roleContainer.setScale(0.75);
        if (roleContainer) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, roleContainer, group, [0, 0], true);
            if (roleContainer.width > 700) {
                roleContainer.x += 135;
            }
            group.addChild(roleContainer);
        }
        roleContainer.visible = oinfo ? true : false;
        //职员信息
        var infobg = BaseBitmap.create(blue ? 'awpositionbgblue' : 'awpositionbgred');
        // infobg.height = group.height - 360;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, infobg, group, [0, 0], true);
        group.addChild(infobg);
        //帮会信息
        var allinamebg = BaseBitmap.create(blue ? 'awservernamebg2' : 'awservernamebg1');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, allinamebg, infobg, [0, -allinamebg.height + 20]);
        group.addChild(allinamebg);
        var allinameTxt = ComponentManager.getTextField(wardata.allianceName, 24);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, allinameTxt, allinamebg, [0, -3]);
        group.addChild(allinameTxt);
        var servernamebg = BaseBitmap.create(blue ? 'awserverbg2' : 'awserverbg1');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, servernamebg, allinamebg, [0, -servernamebg.height - 3]);
        group.addChild(servernamebg);
        var servernameTxt = ComponentManager.getTextField(Api.mergeServerVoApi.getAfterMergeSeverName(null, true, wardata.server), 20, TextFieldConst.COLOR_QUALITY_YELLOW);
        // let servernameTxt = ComponentManager.getBitmapText(Api.mergeServerVoApi.getAfterMergeSeverName(null,true,wardata.server), TextFieldConst.FONTNAME_ITEMTIP);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servernameTxt, servernamebg, [0, 3]);
        servernameTxt.visible = !(Number(wardata.server) == 0);
        group.addChild(servernameTxt);
        var memberNumTxt = ComponentManager.getTextField(LanguageManager.getlocal('allianceWarAttendNum', [wardata.attendLog.length.toString()]), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, memberNumTxt, infobg, [0, 28]);
        group.addChild(memberNumTxt);
        var tmpRect = new egret.Rectangle(0, 0, infobg.width - 10, infobg.height - 60);
        var scrollList = ComponentManager.getScrollList(AllianceWarVsPlayerInfoItem, wardata.attendLog, tmpRect);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, scrollList, infobg);
        group.addChild(scrollList);
        scrollList.bounces = false;
    };
    AllianceWarVsView.prototype.tick = function () {
        var view = this;
        view._timeCdTxt.text = LanguageManager.getlocal('allianceWarTimeCountDown', [App.DateUtil.getFormatBySecond(view.api.getCountDown())]);
        if (view.api.getWarPeriod() == 4) {
            App.CommonUtil.showTip(LanguageManager.getlocal('allianceWarTip2'));
            view.hide();
            return;
        }
    };
    AllianceWarVsView.prototype.getBgName = function () {
        return 'alliancewarbg2';
    };
    AllianceWarVsView.prototype.initBg = function () {
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
    AllianceWarVsView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'awlogo', 'awbattletimebg', 'crossservantplayernamebg',
            'crossservantvsmask1', 'crossservantvsmask2', 'awservernamebg1', 'awservernamebg2', 'awserverbg1', 'awserverbg2',
            'awpositionbgblue', 'awpositionbgred', "awnamebg1", "awnamebg2"
        ]);
    };
    AllianceWarVsView.prototype.getRuleInfo = function () {
        return null;
    };
    AllianceWarVsView.prototype.getTitleBgName = function () {
        return null;
    };
    AllianceWarVsView.prototype.getTitleStr = function () {
        return null;
    };
    AllianceWarVsView.prototype.getCloseBtnName = function () {
        return ButtonConst.COMMON_CLOSE_1;
    };
    AllianceWarVsView.prototype.dispose = function () {
        var view = this;
        view._timeCdTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWarVsView;
}(CommonView));
__reflect(AllianceWarVsView.prototype, "AllianceWarVsView");
