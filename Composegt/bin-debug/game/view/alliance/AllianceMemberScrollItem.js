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
 * date 2017/11/29
 * @class AllianceMemberScrollItem
 */
var AllianceMemberScrollItem = (function (_super) {
    __extends(AllianceMemberScrollItem, _super);
    function AllianceMemberScrollItem() {
        var _this = _super.call(this) || this;
        _this._applyData = null;
        return _this;
    }
    AllianceMemberScrollItem.prototype.initItem = function (index, allianceMemberVo) {
        // childInfo.total
        this._applyData = allianceMemberVo;
        this._itemIndex = index;
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
        this._posTF = ComponentManager.getTextField("(" + LanguageManager.getlocal("allianceMemberPo" + allianceMemberVo.po) + ")", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._posTF.x = nameBg.x + nameBg.width + 20;
        this._posTF.y = nameBg.y + nameBg.height / 2 - this._posTF.height / 2;
        this.addChild(this._posTF);
        if (allianceMemberVo.uid == Api.playerVoApi.getPlayerID()) {
            this._nameTf.textColor = TextFieldConst.COLOR_WARN_GREEN;
            this._posTF.textColor = TextFieldConst.COLOR_WARN_GREEN;
        }
        if (allianceMemberVo.donate != "0") {
            var textColor = TextFieldConst.COLOR_BROWN;
            // if(allianceMemberVo.donate == "1")
            // {
            // 	textColor = TextFieldConst.COLOR_WARN_GREEN2;
            // }else if(allianceMemberVo.donate == "2"){
            // 	textColor = TextFieldConst.COLOR_QUALITY_BLUE;
            // }else if(allianceMemberVo.donate == "3"){
            // 	textColor = TextFieldConst.COLOR_QUALITY_PURPLE;
            // }else if(allianceMemberVo.donate == "4"){
            // 	textColor = TextFieldConst.COLOR_WARN_RED2;
            // }else if(allianceMemberVo.donate == "5"){
            // 	textColor = TextFieldConst.COLOR_WARN_YELLOW2;
            // }
            var donatetStr = LanguageManager.getlocal("allianceBuildName" + allianceMemberVo.donate);
            var donatetTF = ComponentManager.getTextField(donatetStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            donatetTF.x = this.width - donatetTF.width - 25;
            donatetTF.textColor = textColor;
            donatetTF.y = this._nameTf.y + 30;
            this.addChild(donatetTF);
        }
        // let lineImg = BaseBitmap.create("public_line1");
        // lineImg.x = this.width/2 - lineImg.width/2;
        // lineImg.y = 40;
        // this.addChild(lineImg);
        var iconContainer = new BaseDisplayObjectContainer();
        this.addChild(iconContainer);
        iconContainer.x = 20;
        iconContainer.y = 30;
        var posBg = BaseBitmap.create("public_chatheadbg");
        // posBg.x = 20;
        // posBg.y = 50;
        iconContainer.addChild(posBg);
        // this.addTouch(this.eventHandler,this,null);	
        var rect1 = egret.Rectangle.create();
        rect1.setTo(0, 0, 136, 143);
        var posBB = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(allianceMemberVo.pic), rect1);
        posBB.x = 0;
        posBB.y = -7;
        posBB.setScale(2 / 3);
        iconContainer.addChild(posBB);
        App.CommonUtil.addTouchScaleEffect(iconContainer, this.clickItemHandler, this);
        var leadStr = LanguageManager.getlocal("allianceMemberInfo1", [App.StringUtil.changeIntToText(allianceMemberVo.power)]);
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
        //职位管理
        var myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
        if (myAllianceVo.po == 1 && allianceMemberVo.uid != Api.playerVoApi.getPlayerID()) {
            //choose
            var chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceMemberChangePo", this.chooseBtnClick, this);
            chooseBtn.x = 360;
            chooseBtn.y = 95;
            this.addChild(chooseBtn);
            // chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
        }
        //帮众退帮
        if (myAllianceVo.po != 1 && allianceMemberVo.uid == Api.playerVoApi.getPlayerID()) {
            //choose
            var quitBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceMemberQuit", this.quitBtnClick, this);
            quitBtn.x = 360;
            quitBtn.y = 95;
            this.addChild(quitBtn);
            // quitBtn.setColor(TextFieldConst.COLOR_BLACK);
        }
        //帮主退帮
        var nums = Api.allianceVoApi.getAllianceMemberInfoVoList().length;
        if (myAllianceVo.po == 1 && allianceMemberVo.uid == Api.playerVoApi.getPlayerID() && nums == 1) {
            //choose
            var quitBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceManageBtn4", this.quitBtnClick2, this);
            quitBtn.x = 360;
            quitBtn.y = 95;
            this.addChild(quitBtn);
            // quitBtn.setColor(TextFieldConst.COLOR_BLACK);
        }
    };
    AllianceMemberScrollItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
        ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW, data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
    };
    AllianceMemberScrollItem.prototype.clickItemHandler = function (event) {
        this.showUserInfo();
    };
    AllianceMemberScrollItem.prototype.showUserInfo = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._applyData.uid });
    };
    AllianceMemberScrollItem.prototype.chooseBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCESETPOPOPUPVIEW, { allianceMemberVo: this._applyData, callback: this.refreshData, handler: this });
    };
    AllianceMemberScrollItem.prototype.quitBtnClick = function () {
        var baseVo = Api.acVoApi.checkActivityStartByAidAndType("rankActive", "14");
        //有展示期 所以 - 86400
        if (Api.switchVoApi.checkOpenRankActive() && baseVo && baseVo.et - 86400 > GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceRankActiveTip"));
            return;
        }
        //风云擂台不可以踢人
        var arr = [AcConst.AID_BATTLEGROUND];
        for (var i in arr) {
            var vo = Api.acVoApi.getActivityVoByAidAndCode(arr[i]);
            if (vo && vo.isInActy()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceKickBattleTip"));
                return;
            }
        }
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "allianceMemberQuit",
            msg: LanguageManager.getlocal("allianceMemberQuitTip1"),
            callback: this.doQuit,
            handler: this,
            needCancel: true
        });
    };
    AllianceMemberScrollItem.prototype.quitBtnClick2 = function () {
        // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
        // 	title:"allianceMemberQuit",
        // 	msg:LanguageManager.getlocal("allianceMemberQuitTip2"),
        // 	callback:this.doQuit2,
        // 	handler:this,
        // 	needCancel:true
        // });
        var baseVo = Api.acVoApi.checkActivityStartByAidAndType("rankActive", "14");
        //有展示期 所以 - 86400
        if (Api.switchVoApi.checkOpenRankActive() && baseVo && baseVo.et - 86400 > GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceRankActiveTip"));
            return;
        }
        //风云擂台不可以踢人
        var arr = [AcConst.AID_BATTLEGROUND];
        for (var i in arr) {
            var vo = Api.acVoApi.getActivityVoByAidAndCode(arr[i]);
            if (vo && vo.isInActy()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceKickBattleTip"));
                return;
            }
        }
        var dis = Config.AlliancebaseCfg.reduceContribution * 100 + "%";
        var rewardStr = LanguageManager.getlocal("alliance_disTip", [dis]);
        // let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "allianceManageBtn4",
            msg: rewardStr,
            callback: this.doDis,
            handler: this,
            needCancel: true
        });
    };
    AllianceMemberScrollItem.prototype.doDis = function () {
        // this.hide();
        // ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEPSWDPOPUPVIEW,{});
        // this.hide();
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETIMEPOPUPVIEW, { type: 2, pswd: "", title: "allianceManageBtn4" });
    };
    AllianceMemberScrollItem.prototype.doQuit = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_EXITALLIANCE, {});
    };
    AllianceMemberScrollItem.prototype.doQuit2 = function () {
        // ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEPSWDPOPUPVIEW,{});
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETIMEPOPUPVIEW, { type: 2, pswd: "", title: "allianceManageBtn4" });
    };
    AllianceMemberScrollItem.prototype.refreshData = function () {
        var aVo = Api.allianceVoApi.getAllianceMemberInfoById(this._applyData.uid);
        this._applyData = aVo;
        var nameStr = "(" + LanguageManager.getlocal("allianceMemberPo" + aVo.po) + ")";
        this._posTF.text = nameStr;
    };
    AllianceMemberScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AllianceMemberScrollItem.prototype.dispose = function () {
        this._applyData = null;
        // this._applyBtn = null;
        // this._cancelApplyBtn = null;
        this._itemIndex = null;
        this._nameTf = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceMemberScrollItem;
}(ScrollListItem));
__reflect(AllianceMemberScrollItem.prototype, "AllianceMemberScrollItem");
