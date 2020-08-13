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
 *帮会成员
 * author dky
 * date 2017/12/2
 * @class AllianceTurnScrollItem
 */
var AllianceTurnScrollItem = (function (_super) {
    __extends(AllianceTurnScrollItem, _super);
    function AllianceTurnScrollItem() {
        var _this = _super.call(this) || this;
        _this._applyData = null;
        return _this;
    }
    AllianceTurnScrollItem.prototype.initItem = function (index, allianceMemberVo) {
        this.width = 510;
        this.height = 170 + this.getSpaceY();
        // childInfo.total
        this._applyData = allianceMemberVo;
        this._itemIndex = index;
        var bg = BaseBitmap.create("public_listbg");
        bg.width = this.width;
        bg.height = 170;
        // bg.x = 5;
        this.addChild(bg);
        var leftBg = BaseBitmap.create("public_left");
        leftBg.width = 129;
        leftBg.height = bg.height - 19;
        leftBg.x = 5.5;
        leftBg.y = 5.5;
        this.addChild(leftBg);
        var nameBg = BaseBitmap.create("public_biaoti2");
        nameBg.width = 180;
        nameBg.x = leftBg.x + leftBg.width + 15;
        nameBg.y = 15;
        this.addChild(nameBg);
        var nameStr = allianceMemberVo.name;
        this._nameTf = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._nameTf.x = nameBg.x + nameBg.width / 2 - this._nameTf.width / 2;
        this._nameTf.y = nameBg.y + nameBg.height / 2 - this._nameTf.height / 2;
        this.addChild(this._nameTf);
        var posTF = ComponentManager.getTextField("(" + LanguageManager.getlocal("allianceMemberPo" + allianceMemberVo.po) + ")", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        posTF.x = nameBg.x + nameBg.width + 20;
        posTF.y = nameBg.y + nameBg.height / 2 - posTF.height / 2;
        this.addChild(posTF);
        if (allianceMemberVo.uid == Api.playerVoApi.getPlayerID()) {
            this._nameTf.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
        }
        // let lineImg = BaseBitmap.create("public_line1");
        // lineImg.x = this.width/2 - lineImg.width/2;
        // lineImg.y = 40;
        // this.addChild(lineImg);
        var posBg = BaseBitmap.create("public_chatheadbg");
        posBg.x = 20;
        posBg.y = 30;
        this.addChild(posBg);
        // this.addTouch(this.eventHandler,this,null);	
        var rect1 = egret.Rectangle.create();
        rect1.setTo(0, 0, 136, 143);
        var posBB = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(allianceMemberVo.pic), rect1);
        posBB.x = 20;
        posBB.y = posBg.y - 7;
        posBB.setScale(2 / 3);
        this.addChild(posBB);
        var leadStr = LanguageManager.getlocal("allianceMemberInfo1", [allianceMemberVo.power.toString()]);
        var leadTF = ComponentManager.getTextField(leadStr, 18, TextFieldConst.COLOR_BROWN);
        leadTF.x = nameBg.x;
        leadTF.y = this._nameTf.y + this._nameTf.height + 14;
        this.addChild(leadTF);
        var attrStr = LanguageManager.getlocal("allianceMemberInfo2", [Api.playerVoApi.getPlayerOfficeByLevel(allianceMemberVo.level)]);
        var attrTF = ComponentManager.getTextField(attrStr, 18, TextFieldConst.COLOR_BROWN);
        attrTF.x = nameBg.x;
        attrTF.y = leadTF.y + leadTF.height + 7;
        this.addChild(attrTF);
        var conStr = LanguageManager.getlocal("allianceMemberInfo3", [allianceMemberVo.ctv + "/" + allianceMemberVo.tctv]);
        var conrTF = ComponentManager.getTextField(conStr, 18, TextFieldConst.COLOR_BROWN);
        conrTF.x = nameBg.x;
        conrTF.y = attrTF.y + attrTF.height + 7;
        this.addChild(conrTF);
        var timeDis = GameData.serverTime - allianceMemberVo.logindt;
        var timeStr = LanguageManager.getlocal("allianceMemberInfo4", [App.DateUtil.getFormatBySecond(timeDis, 4)]);
        var timeTF = ComponentManager.getTextField(timeStr, 18, TextFieldConst.COLOR_BROWN);
        timeTF.x = nameBg.x;
        timeTF.y = conrTF.y + conrTF.height + 7;
        this.addChild(timeTF);
        var myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
        // if(myAllianceVo.po == 1 && allianceMemberVo.uid != Api.playerVoApi.getPlayerID()){
        //choose
        var chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "alliance_turn", this.chooseBtnClick, this);
        chooseBtn.x = 360;
        chooseBtn.y = 75;
        this.addChild(chooseBtn);
        // chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
        // }
    };
    AllianceTurnScrollItem.prototype.chooseBtnClick = function () {
        var rewardStr = LanguageManager.getlocal("alliance_turnTip", ["10000"]);
        // let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "alliance_changePo1",
            msg: rewardStr,
            callback: this.doTurn,
            handler: this,
            needCancel: true
        });
    };
    AllianceTurnScrollItem.prototype.doTurn = function () {
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        if (allianceVo.wealth < 10000) {
            App.CommonUtil.showTip(LanguageManager.getlocal("alliance_turnTip1"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETIMEPOPUPVIEW, { type: 1, auid: this._applyData.uid });
    };
    AllianceTurnScrollItem.prototype.refreshData = function () {
        var aVo = Api.allianceVoApi.getAllianceMemberInfoById(this._applyData.uid);
        var nameStr = aVo.name + "(" + LanguageManager.getlocal("allianceMemberPo" + aVo.po) + ")";
        this._nameTf.text = nameStr;
    };
    AllianceTurnScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AllianceTurnScrollItem.prototype.dispose = function () {
        this._applyData = null;
        // this._applyBtn = null;
        // this._cancelApplyBtn = null;
        this._itemIndex = null;
        this._nameTf = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceTurnScrollItem;
}(ScrollListItem));
__reflect(AllianceTurnScrollItem.prototype, "AllianceTurnScrollItem");
