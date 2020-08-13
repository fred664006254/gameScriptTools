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
 * 查看帮会信息
 * author dky
 * date 2017/12/1
 * @class AllianceShowInfoPopupView
 */
var AllianceShowInfoPopupView = (function (_super) {
    __extends(AllianceShowInfoPopupView, _super);
    function AllianceShowInfoPopupView() {
        return _super.call(this) || this;
    }
    AllianceShowInfoPopupView.prototype.initView = function () {
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        // itemInfo.ic
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 540;
        bg.height = 605;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 25;
        this.addChildToContainer(bg);
        var bg1 = BaseBitmap.create("public_tc_bg03");
        bg1.width = 520;
        bg1.height = 226;
        bg1.setPosition(this.viewBg.width / 2 - bg1.width / 2, 70);
        this.addChildToContainer(bg1);
        var nameStr = LanguageManager.getlocal("allianceFindInfo11", [this._allianceInfo.name, this._allianceInfo.level]);
        var info1TF = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info1TF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        info1TF.x = bg.x + 30;
        info1TF.y = 40;
        this.addChildToContainer(info1TF);
        var allianceCfg = Config.AllianceCfg.getAllianceCfgByLv(this._allianceInfo.level);
        var info3Str = LanguageManager.getlocal("allianceFindInfo3", [this._allianceInfo.exp + "/" + allianceCfg.exp]);
        var info3TF = ComponentManager.getTextField(info3Str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        info3TF.y = info1TF.y + info1TF.height + 20;
        info3TF.x = info1TF.x;
        this.addChildToContainer(info3TF);
        var info4Str = LanguageManager.getlocal("allianceFindInfo4", [this._allianceInfo.wealth]);
        var info4TF = ComponentManager.getTextField(info4Str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        info4TF.y = info3TF.y + info3TF.height + 10;
        info4TF.x = info1TF.x;
        this.addChildToContainer(info4TF);
        var info5Str = LanguageManager.getlocal("allianceFindInfo5", [this._allianceInfo.affect]);
        var info5TF = ComponentManager.getTextField(info5Str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        info5TF.y = info4TF.y + info4TF.height + 10;
        info5TF.x = info1TF.x;
        this.addChildToContainer(info5TF);
        var info7Str = LanguageManager.getlocal("allianceFindInfo7", [this._allianceInfo.cqq]);
        var info7TF = ComponentManager.getTextField(info7Str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        info7TF.y = info5TF.y + info5TF.height + 10;
        info7TF.x = info1TF.x;
        this.addChildToContainer(info7TF);
        var info8Str = LanguageManager.getlocal("allianceFindInfo8", [this._allianceInfo.intro]);
        var info8TF = ComponentManager.getTextField(info8Str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        info8TF.y = info7TF.y + info7TF.height + 10;
        if (Api.allianceVoApi.isHideQQ()) {
            info8TF.y = info5TF.y + info5TF.height + 10;
            info7TF.visible = false;
        }
        info8TF.x = info1TF.x;
        info8TF.width = 480;
        info8TF.lineSpacing = 5;
        this.addChildToContainer(info8TF);
        var info6Str = LanguageManager.getlocal("allianceFindInfo61", [this._allianceInfo.mn + "/" + this._allianceInfo.maxmn]);
        var info6TF = ComponentManager.getTextField(info6Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info6TF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        info6TF.y = bg1.y + bg1.height + 15;
        info6TF.x = info1TF.x;
        this.addChildToContainer(info6TF);
        var bg2 = BaseBitmap.create("public_tc_bg03");
        bg2.width = 520;
        bg2.height = 270;
        bg2.setPosition(this.viewBg.width / 2 - bg2.width / 2, info6TF.y + info6TF.height + 15);
        this.addChildToContainer(bg2);
        // let innerDownBg = BaseBitmap.create("public_down");
        // innerDownBg.x = bg2.x + bg2.width/2 - innerDownBg.width/2;
        // innerDownBg.y = bg2.y + bg2.height - innerDownBg.height-13;
        // this.addChildToContainer(innerDownBg);
        var titleBg = BaseBitmap.create("rank_biao");
        // titleBg.width = bg2.width - 30;
        // titleBg.scaleX(0.9)
        titleBg.height = 36;
        titleBg.setPosition(bg2.x + bg2.width / 2 - titleBg.width / 2, bg2.y + 10);
        this.addChildToContainer(titleBg);
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(140, titleBg.y + titleBg.height / 2 - nameText.height / 2);
        this.addChildToContainer(nameText);
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("alliance_po"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(407, titleBg.y + titleBg.height / 2 - scoreText.height / 2);
        this.addChildToContainer(scoreText);
        var dataList = this._allianceMemberInfo;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bg1.width - 10, bg2.height - 75);
        var scrollList = ComponentManager.getScrollList(AllianceShowInfoScrollItem, dataList, rect);
        this.addChildToContainer(scrollList);
        scrollList.x = bg1.x + 5;
        scrollList.y = titleBg.y + titleBg.height + 8;
    };
    /**
     * 获取
     */
    AllianceShowInfoPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ALLIANCE_GETDETAILS, requestData: { allianceId: this.param.data.aid } };
    };
    //请求回调
    AllianceShowInfoPopupView.prototype.receiveData = function (data) {
        if (data.data.ret < 0) {
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_GETDETAILS) {
            this._allianceInfo = data.data.data.falliance;
            this._allianceMemberInfo = data.data.data.falliancemember;
            this._allianceMemberInfo.sort(function (a, b) {
                return Number(a.po) - Number(b.po);
                // return 0;
            });
        }
    };
    AllianceShowInfoPopupView.prototype.getTitleStr = function () {
        //  this._type = this.param.data.type 
        return "allianceFindIInfo";
    };
    AllianceShowInfoPopupView.prototype.dispose = function () {
        // this.removeTouchTap();
        this._allianceInfo = null;
        this._allianceMemberInfo = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceShowInfoPopupView;
}(PopupView));
__reflect(AllianceShowInfoPopupView.prototype, "AllianceShowInfoPopupView");
var AllianceShowInfoScrollItem = (function (_super) {
    __extends(AllianceShowInfoScrollItem, _super);
    function AllianceShowInfoScrollItem() {
        return _super.call(this) || this;
    }
    AllianceShowInfoScrollItem.prototype.initItem = function (index, rankData) {
        this.width = 510;
        this.height = 35 + this.getSpaceY();
        if (index % 2 == 0) {
            var lineImg = BaseBitmap.create("public_ditu");
            lineImg.width = this.width;
            lineImg.height = this.height;
            lineImg.x = 0;
            lineImg.y = 0;
            this.addChild(lineImg);
        }
        var nameTF = ComponentManager.getTextField(rankData.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        nameTF.x = 118 - nameTF.width / 2;
        nameTF.y = this.height / 2 - nameTF.height / 2;
        this.addChild(nameTF);
        var poStr = LanguageManager.getlocal("allianceMemberPo" + rankData.po);
        var poTF = ComponentManager.getTextField(poStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        poTF.x = 368 - poTF.width / 2;
        poTF.y = nameTF.y;
        this.addChild(poTF);
    };
    AllianceShowInfoScrollItem.prototype.getSpaceY = function () {
        return 0;
    };
    AllianceShowInfoScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AllianceShowInfoScrollItem;
}(ScrollListItem));
__reflect(AllianceShowInfoScrollItem.prototype, "AllianceShowInfoScrollItem");
