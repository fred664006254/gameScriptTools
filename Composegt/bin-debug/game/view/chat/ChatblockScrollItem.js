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
 *屏蔽成员
 * author dky
 * date 2018/3/14
 * @class ChatblockScrollItem
 */
var ChatblockScrollItem = (function (_super) {
    __extends(ChatblockScrollItem, _super);
    function ChatblockScrollItem() {
        var _this = _super.call(this) || this;
        _this._blockData = null;
        return _this;
    }
    ChatblockScrollItem.prototype.initItem = function (index, bData) {
        this.width = GameConfig.stageWidth - 30;
        this.height = 146 + this.getSpaceY();
        // childInfo.total
        this._blockData = bData;
        this._itemIndex = index;
        var bg = BaseBitmap.create("public_9v_bg04");
        bg.width = this.width;
        bg.height = 146;
        // bg.x = 5;
        this.addChild(bg);
        var nameStr = bData[4];
        this._nameTf = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._nameTf.x = 23;
        this._nameTf.y = 15;
        this.addChild(this._nameTf);
        var lineImg = BaseBitmap.create("public_line1");
        lineImg.x = this.width / 2 - lineImg.width / 2;
        lineImg.y = 40;
        this.addChild(lineImg);
        var iconContainer = new BaseDisplayObjectContainer();
        this.addChild(iconContainer);
        iconContainer.x = 20;
        iconContainer.y = 40;
        var posBg = BaseBitmap.create("public_chatheadbg");
        // posBg.x = 20;
        // posBg.y = 50;
        iconContainer.addChild(posBg);
        // this.addTouch(this.eventHandler,this,null);	
        var rect1 = egret.Rectangle.create();
        rect1.setTo(0, 0, 136, 143);
        var posBB = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(bData[5]), rect1);
        posBB.x = 0;
        posBB.y = -7;
        posBB.setScale(2 / 3);
        iconContainer.addChild(posBB);
        var leadStr = LanguageManager.getlocal("allianceMemberInfo1", [bData[3]]);
        var leadTF = ComponentManager.getTextField(leadStr, 18, TextFieldConst.COLOR_BROWN);
        leadTF.x = 120;
        leadTF.y = this._nameTf.y + this._nameTf.height + 14;
        this.addChild(leadTF);
        var attrStr = LanguageManager.getlocal("allianceMemberInfo2", [Api.playerVoApi.getPlayerOfficeByLevel(bData[2])]);
        var attrTF = ComponentManager.getTextField(attrStr, 18, TextFieldConst.COLOR_BROWN);
        attrTF.x = 120;
        attrTF.y = leadTF.y + leadTF.height + 7;
        this.addChild(attrTF);
        var conStr = LanguageManager.getlocal("chatblockAlliance", [bData[6]]);
        var conrTF = ComponentManager.getTextField(conStr, 18, TextFieldConst.COLOR_BROWN);
        conrTF.x = 120;
        conrTF.y = attrTF.y + attrTF.height + 7;
        this.addChild(conrTF);
        //  let timeDis = GameData.serverTime - bData.logindt;
        // let timeStr = LanguageManager.getlocal("allianceMemberInfo4",[App.DateUtil.getFormatBySecond(timeDis,4)]);
        // let timeTF = ComponentManager.getTextField(timeStr,18,TextFieldConst.COLOR_BROWN);
        // // timeTF.x = 120;
        // // timeTF.y = conrTF.y + conrTF.height + 7;
        // timeTF.x = this.width - timeTF.width - 25;
        // // timeTF.textColor = textColor;
        // timeTF.y = this._nameTf.y;
        // this.addChild(timeTF);
        var quitBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "chatCancelShield", this.cancelBlock, this);
        quitBtn.x = 450;
        quitBtn.y = 65;
        this.addChild(quitBtn);
        // quitBtn.setColor(TextFieldConst.COLOR_BLACK);
    };
    ChatblockScrollItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
        ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW, data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
    };
    ChatblockScrollItem.prototype.cancelBlock = function () {
        // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
        // 	title:"allianceMemberQuit",
        // 	msg:LanguageManager.getlocal("allianceMemberQuitTip2"),
        // 	callback:this.doQuit2,
        // 	handler:this,
        // 	needCancel:true
        // });
        var dis = Config.AlliancebaseCfg.reduceContribution * 100 + "%";
        var rewardStr = LanguageManager.getlocal("chatCancelBlockDesc", [this._blockData[4]]);
        // let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "chatCancelShield",
            msg: rewardStr,
            callback: this.doShield,
            handler: this,
            needCancel: true
        });
    };
    ChatblockScrollItem.prototype.doShield = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CANCEBLOCK, { "uid": this._blockData[0], "name": this._blockData[4] });
    };
    ChatblockScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    ChatblockScrollItem.prototype.dispose = function () {
        this._blockData = null;
        // this._applyBtn = null;
        // this._cancelApplyBtn = null;
        this._itemIndex = null;
        this._nameTf = null;
        _super.prototype.dispose.call(this);
    };
    return ChatblockScrollItem;
}(ScrollListItem));
__reflect(ChatblockScrollItem.prototype, "ChatblockScrollItem");
