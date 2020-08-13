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
 *帮会榜单
 * author dky
 * date 2017/11/29
 * @class AllianceRankScrollItem
 */
var AllianceRankScrollItem = (function (_super) {
    __extends(AllianceRankScrollItem, _super);
    function AllianceRankScrollItem() {
        var _this = _super.call(this) || this;
        _this._rankData = null;
        return _this;
    }
    AllianceRankScrollItem.prototype.initItem = function (index, rankData) {
        this.width = 510;
        this.height = 136 + this.getSpaceY();
        // childInfo.total
        this._rankData = rankData;
        this._itemIndex = index;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = this.width;
        bg.height = 136;
        // bg.x = 5;
        this.addChild(bg);
        if (index < 3) {
            var rankImg = BaseBitmap.create("dinner_rank" + String(index + 1));
            rankImg.x = 42 - rankImg.width / 2;
            rankImg.y = 10;
            this.addChild(rankImg);
        }
        else {
            var rankImg = BaseBitmap.create("dinner_rankbg");
            rankImg.x = 42 - rankImg.width / 2;
            rankImg.y = 10;
            this.addChild(rankImg);
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rankTxt.text = String(index + 1);
            rankTxt.x = 42 - rankTxt.width / 2;
            rankTxt.y = 19;
            this.addChild(rankTxt);
            if (rankData.id == Api.playerVoApi.getPlayerAllianceId()) {
                rankTxt.textColor = TextFieldConst.COLOR_WARN_RED;
            }
        }
        var nameStr = "<font u ='true'>" + rankData.name + "</font>";
        var nameTF = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW2);
        nameTF.x = 80;
        nameTF.y = 25;
        this.addChild(nameTF);
        nameTF.addTouchTap(this.lookAlliance, this, null);
        var lvStr = "(" + LanguageManager.getlocal("servant_infoLv") + "：" + rankData.level + ")";
        var lvTF = ComponentManager.getTextField(lvStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW2);
        lvTF.x = nameTF.x + nameTF.width + 10;
        lvTF.y = 25;
        this.addChild(lvTF);
        // lvTF.addTouchTap(this.lookAlliance,this,null);
        var lineImg = BaseBitmap.create("public_line1");
        lineImg.x = this.width / 2 - lineImg.width / 2;
        lineImg.y = 63;
        this.addChild(lineImg);
        var leadStr = LanguageManager.getlocal("allianceRankLeaderName") + rankData.creatorname;
        var leadTF = ComponentManager.getTextField(leadStr, 18, TextFieldConst.COLOR_BROWN);
        leadTF.x = nameTF.x;
        leadTF.y = nameTF.y + nameTF.height + 24;
        this.addChild(leadTF);
        var attrStr = LanguageManager.getlocal("allianceRankTotalPower") + rankData.affect;
        var attrTF = ComponentManager.getTextField(attrStr, 18, TextFieldConst.COLOR_BROWN);
        attrTF.x = nameTF.x;
        attrTF.y = leadTF.y + leadTF.height + 10;
        this.addChild(attrTF);
        var memberStr = LanguageManager.getlocal("allianceMemberTitle", [rankData.mn + "/" + rankData.maxmn]);
        var memberTF = ComponentManager.getTextField(memberStr, 18, TextFieldConst.COLOR_BROWN);
        memberTF.x = leadTF.x + 260;
        memberTF.y = leadTF.y;
        this.addChild(memberTF);
        if (rankData.id == Api.playerVoApi.getPlayerAllianceId()) {
            nameTF.textColor = TextFieldConst.COLOR_WARN_RED;
            lvTF.textColor = TextFieldConst.COLOR_WARN_RED;
            // leadTF.textColor = TextFieldConst.COLOR_WARN_RED;
            // attrTF.textColor = TextFieldConst.COLOR_WARN_RED;
            // memberTF.textColor = TextFieldConst.COLOR_WARN_RED;
        }
        //choose
        this._applyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceRankApply", this.applyBtnClick, this);
        this._applyBtn.x = 355;
        this._applyBtn.y = 8;
        this.addChild(this._applyBtn);
        this._applyBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._cancelApplyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "allianceRankCancelApply", this.cancelBtnClick, this);
        this._cancelApplyBtn.x = 355;
        this._cancelApplyBtn.y = 8;
        this.addChild(this._cancelApplyBtn);
        this._cancelApplyBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._cancelApplyBtn.visible = false;
        var myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
        for (var index = 0; index < myAllianceVo.apply.length; index++) {
            var element = myAllianceVo.apply[index];
            if (rankData.id == element) {
                this._applyBtn.visible = false;
                this._cancelApplyBtn.visible = true;
            }
        }
        if (Api.playerVoApi.getPlayerAllianceId() != 0) {
            this._applyBtn.visible = false;
            this._cancelApplyBtn.visible = false;
        }
    };
    AllianceRankScrollItem.prototype.lookAlliance = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCESHOWINFOPOPUPVIEW, { aid: this._rankData.id });
    };
    AllianceRankScrollItem.prototype.refreshData = function (index) {
        var myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
        this._applyBtn.visible = true;
        this._cancelApplyBtn.visible = false;
        for (var index = 0; index < myAllianceVo.apply.length; index++) {
            var element = myAllianceVo.apply[index];
            if (this._rankData.id == element) {
                this._applyBtn.visible = false;
                this._cancelApplyBtn.visible = true;
            }
        }
    };
    AllianceRankScrollItem.prototype.applyBtnClick = function () {
        var myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
        if (myAllianceVo.nextt - GameData.serverTime > 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceJoinTip"));
            return;
        }
        if (this._rankData.mn >= this._rankData.maxmn) {
            App.CommonUtil.showTip(LanguageManager.getlocal("alliance_joinNumMax"));
            return;
        }
        var maxNum = Config.AlliancebaseCfg.personMaxApply;
        if (myAllianceVo.apply.length >= maxNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("alliance_joinMax", [maxNum.toString()]));
            return;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_APPLYALLIANCE, { "aid": this._rankData.id, "index": this._itemIndex });
    };
    AllianceRankScrollItem.prototype.cancelBtnClick = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_CANCELAPPLYALLIANCE, { "aid": this._rankData.id, "index": this._itemIndex });
    };
    AllianceRankScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AllianceRankScrollItem.prototype.dispose = function () {
        this._rankData = null;
        this._applyBtn = null;
        this._cancelApplyBtn = null;
        this._itemIndex = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceRankScrollItem;
}(ScrollListItem));
__reflect(AllianceRankScrollItem.prototype, "AllianceRankScrollItem");
//# sourceMappingURL=AllianceRankScrollItem.js.map