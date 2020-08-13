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
 * 排行榜玩家信息弹板
 * author yanyuling
 * date 2017/10/25
 * @class RankUserinfoPopupView
 */
var RankUserinfoPopupView = (function (_super) {
    __extends(RankUserinfoPopupView, _super);
    function RankUserinfoPopupView() {
        return _super.call(this) || this;
    }
    RankUserinfoPopupView.prototype.initView = function () {
        var UIData = this.param.data;
        if (!UIData.crossZone) {
            UIData.crossZone = !(Number(UIData.rzid) == Number(ServerCfg.selectServer.zid));
            UIData.zid = UIData.rzid;
        }
        var isCrossWifeBattle = false;
        if (UIData.isCrossWifeBattle) {
            isCrossWifeBattle = true;
        }
        // SoundManager.playEffect(SoundConst.EFFECT_WIFE);
        //自己管理自己的节点
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._bottomnodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._bottomnodeContainer);
        // let tarWidth = 560;
        var tarWidth = 537;
        this._bottomnodeContainer.width = tarWidth;
        this._bottomnodeContainer.height = 98 + 9 + 261 + 88;
        var bg0 = BaseLoadBitmap.create("playerview_bg2");
        bg0.width = 640;
        bg0.height = 741;
        bg0.setScale(tarWidth / bg0.width);
        bg0.x = this.viewBg.width / 2 - bg0.width * bg0.scaleX / 2;
        bg0.y = -3 + 12;
        this._nodeContainer.addChild(bg0);
        var fanImg = BaseBitmap.create("public_9v_bg10");
        fanImg.width = 208;
        fanImg.height = 224;
        fanImg.x = this.viewBg.width - fanImg.width - 40 - 8;
        fanImg.y = 362 - fanImg.height;
        this._nodeContainer.addChild(fanImg);
        if (UIData.crossZone) {
            fanImg.y -= 40;
            fanImg.height += 40;
        }
        //开人望
        if (Api.switchVoApi.checkOpenPrestigeShow()) {
            fanImg.y -= 40;
            fanImg.height += 40;
        }
        var markLeft = BaseBitmap.create("public_v_huawen02");
        markLeft.anchorOffsetX = 4;
        markLeft.scaleX = -1;
        markLeft.x = fanImg.x + fanImg.width / 2;
        markLeft.y = fanImg.y + 50;
        this._nodeContainer.addChild(markLeft);
        var markRight = BaseBitmap.create("public_v_huawen02");
        markRight.anchorOffsetX = 4;
        markRight.x = fanImg.x + fanImg.width / 2;
        markRight.y = fanImg.y + 50;
        this._nodeContainer.addChild(markRight);
        var temX = fanImg.x + 100;
        var temY = fanImg.y;
        var nameTF = ComponentManager.getTextField(UIData.name, TextFieldConst.FONTSIZE_TITLE_SMALL, 0xeeeccd);
        // nameTF.border = true;
        nameTF.stroke = 1;
        nameTF.borderColor = TextFieldConst.COLOR_BLACK;
        nameTF.x = temX - nameTF.width / 2;
        nameTF.y = temY + 20;
        this._nodeContainer.addChild(nameTF);
        var uidIcon = BaseBitmap.create("playerview_pro13");
        uidIcon.x = fanImg.x + 1;
        uidIcon.y = nameTF.y + nameTF.height + 25;
        this._nodeContainer.addChild(uidIcon);
        var uidStr = UIData.ruid;
        var textSize = 20;
        if (PlatformManager.checkIsViSp()) {
            textSize = 18;
        }
        var uidTF = ComponentManager.getTextField(uidStr, textSize, TextFieldConst.COLOR_LIGHT_YELLOW);
        uidTF.anchorOffsetX = uidTF.width;
        uidTF.x = uidIcon.x + 198;
        uidTF.y = uidIcon.y + 5;
        if (PlatformManager.checkIsViSp()) {
            uidTF.y = uidIcon.y + 8;
        }
        this._nodeContainer.addChild(uidTF);
        var allName = UIData.gname;
        if (allName == "") {
            allName = LanguageManager.getlocal("allianceRankNoAlliance");
        }
        // let alliStr = LanguageManager.getlocal("acRank_myAlliancenick");
        var alliIcon = BaseBitmap.create("playerview_pro11");
        alliIcon.x = uidIcon.x;
        alliIcon.y = uidIcon.y + alliIcon.height + 8;
        this._nodeContainer.addChild(alliIcon);
        var allianceTxt = ComponentManager.getTextField(allName, 20, 0xffdb59);
        allianceTxt.anchorOffsetX = allianceTxt.width;
        allianceTxt.x = alliIcon.x + 198;
        allianceTxt.y = alliIcon.y + 5;
        if (PlatformManager.checkIsViSp()) {
            allianceTxt.y = alliIcon.y + 8;
        }
        this._nodeContainer.addChild(allianceTxt);
        var poIcon = BaseBitmap.create("playerview_pro12");
        poIcon.x = alliIcon.x;
        poIcon.y = alliIcon.y + poIcon.height + 8;
        this._nodeContainer.addChild(poIcon);
        var poStr = LanguageManager.getlocal("playerview_Nopo");
        var po = UIData.po;
        if (po > 0) {
            poStr = LanguageManager.getlocal("allianceMemberPo" + po);
        }
        var alliancePoTxt = ComponentManager.getTextField(poStr, 20, 0xffffff);
        alliancePoTxt.anchorOffsetX = alliancePoTxt.width;
        alliancePoTxt.x = poIcon.x + 198;
        alliancePoTxt.y = poIcon.y + 5;
        if (PlatformManager.checkIsViSp()) {
            alliancePoTxt.y = poIcon.y + 8;
        }
        this._nodeContainer.addChild(alliancePoTxt);
        var vipIcon = undefined;
        if (UIData.vip > 0) {
            vipIcon = BaseBitmap.create("playerview_pro10");
            vipIcon.x = poIcon.x;
            vipIcon.y = poIcon.y + vipIcon.height + 8;
            if (PlatformManager.checkIsViSp()) {
                vipIcon.y = poIcon.y + vipIcon.height + 10;
            }
            this._nodeContainer.addChild(vipIcon);
            // let vipImg = BaseLoadBitmap.create(Api.vipVoApi.getCurLevelVipCfg().icon);
            var vipImg = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(UIData.vip).icon);
            vipImg.width = 65;
            vipImg.height = 27;
            vipImg.anchorOffsetX = vipImg.width;
            vipImg.x = vipIcon.x + 201;
            vipImg.y = vipIcon.y;
            // vipImg.setScale(0.7)
            this._nodeContainer.addChild(vipImg);
        }
        //打开了人望
        var prestigeIcon = null;
        if (Api.switchVoApi.checkOpenPrestigeShow()) {
            prestigeIcon = BaseBitmap.create("playerview_pro17");
            prestigeIcon.x = poIcon.x;
            if (vipIcon == null) {
                prestigeIcon.y = poIcon.y + poIcon.height + 8;
            }
            else {
                prestigeIcon.y = vipIcon.y + vipIcon.height + 8;
            }
            this._nodeContainer.addChild(prestigeIcon);
            var prestigeTF = ComponentManager.getTextField(UIData.pem, textSize, TextFieldConst.COLOR_LIGHT_YELLOW);
            // uidTF.text = "爽肤水地方是";
            prestigeTF.anchorOffsetX = prestigeTF.width;
            prestigeTF.x = prestigeIcon.x + 198;
            prestigeTF.y = prestigeIcon.y + 5;
            if (PlatformManager.checkIsViSp()) {
                prestigeTF.y = prestigeIcon.y + 8;
            }
            this._nodeContainer.addChild(prestigeTF);
        }
        if (UIData.crossZone) {
            var serIcon = BaseBitmap.create("playerview_pro16");
            serIcon.x = alliIcon.x;
            if (prestigeIcon) {
                serIcon.y = prestigeIcon.y + prestigeIcon.height + 8;
            }
            else {
                if (vipIcon) {
                    serIcon.y = vipIcon.y + vipIcon.height + 8;
                }
                else {
                    serIcon.y = poIcon.y + poIcon.height + 8;
                }
            }
            this._nodeContainer.addChild(serIcon);
            var zidname = Api.mergeServerVoApi.getAfterMergeSeverName(UIData.ruid, false, null);
            var serverTxt = ComponentManager.getTextField(zidname, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            serverTxt.anchorOffsetX = serverTxt.width;
            serverTxt.x = serIcon.x + 198;
            serverTxt.y = serIcon.y + 5;
            this._nodeContainer.addChild(serverTxt);
        }
        var curLv = UIData.level;
        var posX = 20;
        if (UIData.title != "") {
            curLv = UIData.title;
            posX = -10;
        }
        // if (UIData.title != "")
        // {
        // 	curLv = UIData.title ;
        // 	posX = -10;
        // }
        var userContainer = Api.playerVoApi.getPlayerPortrait(curLv, UIData.pic);
        // userContainer.mask = egret.Rectangle.create().setTo(0,0,userContainer.width,500);
        userContainer.x = posX + 10;
        userContainer.y = 40;
        //衣服出左边框裁掉
        var maskX = bg0.x - userContainer.x;
        var maskWidth = userContainer.width - maskX;
        userContainer.mask = egret.Rectangle.create().setTo(maskX, 0, maskWidth, 500);
        userContainer.name = "userContainer";
        this._nodeContainer.addChild(userContainer);
        //下部信息部分
        var bottomInfoX = 330;
        var bottomInfoY = 0;
        this._bottomnodeContainer.x = this.viewBg.width / 2 - tarWidth / 2;
        this._bottomnodeContainer.y = 471 - 98;
        //底部需要往上移动
        var btY = bg0.y + bg0.height;
        var playerview_powerbg = BaseBitmap.create("playerview_powerbg");
        playerview_powerbg.x = 50 + 10;
        playerview_powerbg.y = this._bottomnodeContainer.y - 70;
        this._nodeContainer.addChild(playerview_powerbg);
        var myPowerImg = BaseBitmap.create("playerview_power_img");
        myPowerImg.setScale(0.9);
        myPowerImg.x = playerview_powerbg.x + 50;
        myPowerImg.y = playerview_powerbg.y + 10;
        this._nodeContainer.addChild(myPowerImg);
        var titleText1 = null;
        if (PlatformManager.checkIsViSp()) {
            titleText1 = ComponentManager.getTextField(App.StringUtil.changeIntToText(UIData.power), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        }
        else {
            titleText1 = ComponentManager.getTextField(App.StringUtil.changeIntToText(UIData.power), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        }
        // let titleText1 =  ComponentManager.getTextField(App.StringUtil.changeIntToText(UIData.power) ,24,TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText1.name = "powerTxt";
        titleText1.x = myPowerImg.x + myPowerImg.width - 5;
        titleText1.y = myPowerImg.y + myPowerImg.height / 2 - titleText1.height / 2;
        if (PlatformManager.checkIsViSp()) {
            titleText1.y += 3;
        }
        this._nodeContainer.addChild(titleText1);
        var officebg = BaseBitmap.create("prisonview_1"); //  prisonview_1
        // officebg.width = 260;
        // officebg.height = 40;
        officebg.x = playerview_powerbg.x;
        officebg.y = myPowerImg.y - 65;
        this._nodeContainer.addChild(officebg);
        var officeText1 = ComponentManager.getTextField(LanguageManager.getlocal("mainui_officer"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        officeText1.name = "powerTxt";
        officeText1.x = officebg.x + 50;
        officeText1.y = officebg.y + officebg.height / 2 - officeText1.height / 2;
        this._nodeContainer.addChild(officeText1);
        var officeTF = ComponentManager.getBitmapText(Api.playerVoApi.getPlayerOfficeByLevel(UIData.level), "office_fnt");
        officeTF.name = "officeTF";
        officeTF.setScale(0.9);
        officeTF.x = officeText1.x + officeText1.width - 5;
        officeTF.y = officeText1.y + officeText1.height / 2 - officeTF.height / 2 - 2;
        this._nodeContainer.addChild(officeTF);
        var playerview_probg = BaseBitmap.create("wifeview_balckbg");
        // playerview_probg.x = 10  ;
        // playerview_probg.height = 98;
        playerview_probg.scaleY = 98 / playerview_probg.height;
        playerview_probg.width = tarWidth;
        playerview_probg.y = 0;
        this._bottomnodeContainer.addChild(playerview_probg);
        // let bottomBg:BaseBitmap = BaseBitmap.create("public_9_bg22");
        // bottomBg.scaleX = tarWidth/bottomBg.width;
        // bottomBg.height =182;
        // bottomBg.y = playerview_probg.y + playerview_probg.height-10;
        // this._bottomnodeContainer.addChild(bottomBg);
        var proPosY = playerview_probg.y + 15;
        var proPosX = GameConfig.stageWidth / 2;
        for (var index = 1; index <= 8; index++) {
            // let tmpprocfg = proCfg[index-1]; tmpprocfg.proValue
            var fontSize = 20;
            if (PlatformManager.checkIsViSp()) {
                fontSize = 18;
            }
            var proText = ComponentManager.getTextField("", fontSize, TextFieldConst.COLOR_LIGHT_YELLOW);
            proText.name = "proText" + index;
            var ModT = 0;
            if (index == 1 || index == 4 || index == 7) {
                ModT = -1;
            }
            else if (index == 3 || index == 6 || index == 8) {
                ModT = 1;
            }
            proPosX = GameConfig.stageWidth / 2 + ModT * 180 - 20;
            // proPosX = tarWidth/2 + ModT*180;
            if (index > 1 && index % 3 == 1) {
                proPosY += 25;
            }
            var imgIdx = index;
            if (index >= 7) {
                imgIdx += 1;
            }
            var img = BaseBitmap.create("playerview_pro" + imgIdx);
            img.x = proPosX - img.width - 40;
            img.y = proPosY;
            this._bottomnodeContainer.addChild(img);
            proText.x = proPosX - 35;
            if (PlatformManager.checkIsViSp()) {
                proText.y = img.y + 7;
            }
            else {
                proText.y = img.y + 6;
            }
            if (index == 7 && UIData.crossZone) {
                proText.visible = false;
                img.visible = false;
            }
            // proText.y = img.y + img.height/2 - proText.height/2 ;
            this._bottomnodeContainer.addChild(proText);
        }
        this.refreshProTxt();
        //名字线
        // let line1 = BaseBitmap.create("public_line3");
        // line1.width = 500;
        // line1.x = tarWidth/2  - line1.width/2;
        // line1.y = bottomBg.y+ 30;
        // this._bottomnodeContainer.addChild(line1);
        var maskBg = BaseBitmap.create("public_tc_bg06");
        maskBg.width = tarWidth + 6;
        maskBg.height = 300;
        maskBg.x = 0 - 3;
        maskBg.y = 98;
        this._bottomnodeContainer.addChild(maskBg);
        //称号背景
        var probg1 = BaseBitmap.create("public_tc_bg01");
        probg1.width = 537;
        probg1.height = 261;
        probg1.x = tarWidth / 2 - probg1.width / 2;
        probg1.y = 98 + 9;
        var probg2 = BaseBitmap.create("public_tc_bg03");
        probg2.width = probg1.width - 20;
        probg2.height = probg1.height - 20;
        probg2.x = tarWidth / 2 - probg2.width / 2;
        probg2.y = probg1.y + (probg1.height - probg2.height) / 2;
        this._bottomnodeContainer.addChild(probg1);
        this._bottomnodeContainer.addChild(probg2);
        var playerRank_titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("playerRank_title"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        playerRank_titleTxt.x = tarWidth / 2 - playerRank_titleTxt.width / 2;
        playerRank_titleTxt.y = probg2.y + 20;
        var titleBg = BaseBitmap.create("public_biaoti2");
        titleBg.width = playerRank_titleTxt.width + 100;
        titleBg.x = tarWidth / 2 - titleBg.width / 2;
        titleBg.y = playerRank_titleTxt.y + playerRank_titleTxt.height / 2 - titleBg.height / 2;
        this._bottomnodeContainer.addChild(titleBg);
        this._bottomnodeContainer.addChild(playerRank_titleTxt);
        // bottomInfoY += 10;
        var titleinfo = UIData.titleinfo;
        var tupinfo = UIData.tupinfo || [];
        var startX = 25; //probg1.x+10;
        var startY = 10; //probg1.y + 65;
        var addH = 0;
        var titleNode = new BaseDisplayObjectContainer();
        var titleNum = 0;
        var keys = [];
        for (var key in titleinfo) {
            if (titleinfo.hasOwnProperty(key)) {
                if (Config.TitleCfg.getTitleCfgById(key)) {
                    keys.push(key);
                }
            }
        }
        keys.sort(function (kaya, kayb) {
            var tacfg = Config.TitleCfg.getTitleCfgById(kaya);
            var tbcfg = Config.TitleCfg.getTitleCfgById(kayb);
            return tacfg.sortId - tbcfg.sortId;
        });
        for (var index = 0; index < keys.length; index++) {
            var key_1 = keys[index];
            // for (var key in titleinfo) {
            if (titleinfo[key_1] >= 1) {
                if (Number(key_1) >= 4001) {
                    continue;
                }
                titleNum++;
                var tlv = tupinfo[key_1] ? tupinfo[key_1].tlv : "";
                var titlepath = Config.TitleCfg.getTitleIcon3WithLv(key_1, tlv);
                var officerImg = BaseLoadBitmap.create(titlepath);
                var deltaV = 0.8;
                officerImg.width = 186 * deltaV;
                officerImg.height = 42 * deltaV;
                if (startX > probg1.x + probg1.width - 100) {
                    startX = 25; //probg1.x+10;
                    startY += 50;
                    addH += 40;
                }
                officerImg.x = startX;
                officerImg.y = startY;
                // this._bottomnodeContainer.addChild(officerImg);
                titleNode.addChild(officerImg);
                startX += 170;
            }
        }
        titleNode.height += 40;
        var rect = new egret.Rectangle(0, 0, this.viewBg.width, probg1.height - 80);
        var titleScrollView = ComponentManager.getScrollView(titleNode, rect);
        titleScrollView.x = 0;
        titleScrollView.y = probg1.y + 65;
        titleScrollView.verticalScrollPolicy = "on";
        titleScrollView.horizontalScrollPolicy = "off";
        // titleScrollView.$setTouchEnabled
        this._bottomnodeContainer.addChild(titleScrollView);
        if (titleNum == 0) {
            var noTitleTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("rankUserinfo_noTitle"), 20, TextFieldConst.COLOR_BROWN);
            noTitleTipTxt.x = tarWidth / 2 - noTitleTipTxt.width / 2;
            noTitleTipTxt.y = probg1.y + probg1.height / 2 - noTitleTipTxt.height / 2;
            this._bottomnodeContainer.addChild(noTitleTipTxt);
        }
        // bottomBg.height += addH;
        // this.cacheAsBitmap=true;
        //是自己就不显示按钮
        if (UIData.ruid == Api.playerVoApi.getPlayerID()) {
            return;
        }
        var dinnerBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "dinner_shotJoin", this.dinerBtnHandler, this);
        dinnerBtn.x = tarWidth - dinnerBtn.width;
        dinnerBtn.y = this._bottomnodeContainer.height - dinnerBtn.height - 15;
        if (UIData.ruid == Api.playerVoApi.getPlayerID() || this.param.data.isDinnerHost || this.param.data.cantjoindinner) {
            dinnerBtn.visible = false;
        }
        else {
            dinnerBtn.visible = true;
        }
        this._bottomnodeContainer.addChild(dinnerBtn);
        var priBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "chatViewTab3Title", this.priBtnHandler, this);
        priBtn.x = dinnerBtn.x - 5 - priBtn.width;
        priBtn.y = dinnerBtn.y;
        // if(UIData.ruid == Api.playerVoApi.getPlayerID() || this.param.data.isDinnerHost)
        // {	
        // 	dinnerBtn.visible = false;
        // }else{
        // 	dinnerBtn.visible = true;
        // }
        this._bottomnodeContainer.addChild(priBtn);
        this._shieldBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "chatShield", this.shieldBtnHandler, this);
        this._shieldBtn.x = 0;
        this._shieldBtn.y = dinnerBtn.y;
        if (UIData.ruid == Api.playerVoApi.getPlayerID()) {
            this._shieldBtn.visible = false;
        }
        else {
            this._shieldBtn.visible = true;
        }
        // if(LocalStorageManager.get("shield" + UIData.ruid)){
        // 	this._shieldBtn.setText("chatCancelShield")
        // }
        if (Api.chatVoApi.getIsBlock(UIData.ruid)) {
            this._shieldBtn.setText("chatCancelShield");
        }
        else {
            this._shieldBtn.setText("chatShield");
        }
        this._bottomnodeContainer.addChild(this._shieldBtn);
        var friendflag = UIData.friendflag;
        var btnImg = ButtonConst.BTN_SMALL_BLUE;
        var btnTxt = "";
        if (friendflag == 1) {
            btnTxt = "friendsBtnTxt20";
        }
        else if (friendflag == 0) {
            btnImg = ButtonConst.BTN_SMALL_YELLOW;
            btnTxt = "friendsBtnTxt13";
        }
        else if (friendflag == -1) {
            btnImg = ButtonConst.BTN_SMALL_YELLOW;
            btnTxt = "friendsBtnTxt12";
        }
        this._friendsBtn = ComponentManager.getButton(btnImg, btnTxt, this.friendsBtnHandler, this);
        if (friendflag == 0) {
            this._friendsBtn.setEnable(false);
        }
        // this._friendsBtn.x = tarWidth/2 -  this._friendsBtn.width/2; //this._shieldBtn.x + this._shieldBtn.width + 10;
        this._friendsBtn.x = this._shieldBtn.x + this._shieldBtn.width + 5;
        this._friendsBtn.y = this._shieldBtn.y;
        this._bottomnodeContainer.addChild(this._friendsBtn);
        this._friendsBtn.visible = !UIData.crossZone;
        // priBtn.visible = dinnerBtn.visible = !UIData.crossZone;
        priBtn.visible = !UIData.crossZone && Api.switchVoApi.openChatType3();
        if (isCrossWifeBattle) {
            this._friendsBtn.visible = false;
            priBtn.visible = false;
            this._shieldBtn.visible = false;
            dinnerBtn.visible = false;
        }
    };
    RankUserinfoPopupView.prototype.priBtnHandler = function () {
        var view = this;
        var UIData = view.param.data;
        if (Api.switchVoApi.checkOpenchatvsvip() && Api.playerVoApi.getPlayerVipLevel() < UIData.vip) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatPirvateVipTip"));
            return;
        }
        if (Api.switchVoApi.checkCloseChat()) {
            App.CommonUtil.showTip("很抱歉，聊天系统维护中");
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.PRICHATVIEW, {
            isread: 1,
            issender: 0,
            sender: UIData.ruid,
            sendername: UIData.name,
        });
        view.hide();
    };
    RankUserinfoPopupView.prototype.friendsBtnHandler = function () {
        var friendflag = this.param.data.friendflag;
        if (friendflag == 1) {
            var breakMsg = LanguageManager.getlocal("friends_breakupTip1", [this.param.data.name]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                "msg": breakMsg,
                "needCancel": true,
                "title": "itemUseConstPopupViewTitle",
                "callback": this.doBreakup,
                "handler": this,
            });
        }
        else if (friendflag == 0) {
            // NetManager.request(NetRequestConst.REQUEST_FRIEND_APPLY,{fuid:this.param.data.ruid});
        }
        else if (friendflag == -1) {
            if (Api.friendVoApi.isMaxFriendsNums()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("friends_applyTip2"));
                return;
            }
            if (Api.friendVoApi.isMaxFriendsApply()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("friends_applyTip3", ["" + GameConfig.config.friendCfg.maxSendRequest]));
                return;
            }
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_APPLY), this.applyCallback, this);
            NetManager.request(NetRequestConst.REQUEST_FRIEND_APPLY, { fuid: this.param.data.ruid });
            this._friendsBtn.setText("friendsBtnTxt13");
            this._friendsBtn.setEnable(false);
        }
    };
    RankUserinfoPopupView.prototype.applyCallback = function (data) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_APPLY), this.applyCallback, this);
        var rData = data.data.data;
        if (rData.ret == 0) {
            var friendFlag = rData.data.friendFlag;
            if (friendFlag) {
                Api.friendVoApi.showFriendsNetFlags(friendFlag);
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("friends_applyTip1", [this.param.data.name]));
            }
        }
    };
    RankUserinfoPopupView.prototype.doBreakupCallback = function (data) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_UNFRIEND), this.doBreakupCallback, this);
        var rData = data.data.data;
        if (rData.ret == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("friends_breakupTip2", [this.param.data.name]));
        }
    };
    RankUserinfoPopupView.prototype.doBreakup = function () {
        this._friendsBtn.setText("friendsBtnTxt12");
        this._friendsBtn.setBtnBitMap(ButtonConst.BTN_SMALL_YELLOW);
        this._friendsBtn.setColor(TextFieldConst.COLOR_BTN_YELLOW);
        this.param.data.friendflag = -1;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_UNFRIEND), this.doBreakupCallback, this);
        NetManager.request(NetRequestConst.REQUEST_FRIEND_UNFRIEND, { fuid: this.param.data.ruid });
    };
    RankUserinfoPopupView.prototype.refreshProTxt = function () {
        var UIData = this.param.data;
        var bcid = Api.challengeVoApi.getBigChannelIdByCid(UIData.cid);
        var proCfg = [
            {
                txt: LanguageManager.getlocal("playerview_force"),
                proValue: App.StringUtil.changeIntToText(UIData.atk),
                proIcon: "",
            }, {
                txt: LanguageManager.getlocal("playerview_inte"),
                proValue: App.StringUtil.changeIntToText(UIData.inte),
                proIcon: "",
            }, {
                txt: LanguageManager.getlocal("playerview_wife"),
                proValue: UIData.wifenum,
                proIcon: "",
            }, {
                txt: LanguageManager.getlocal("playerview_policy"),
                proValue: App.StringUtil.changeIntToText(UIData.politics),
                proIcon: "",
            }, {
                txt: LanguageManager.getlocal("playerview_charm"),
                proValue: App.StringUtil.changeIntToText(UIData.charm),
                proIcon: "",
            }, {
                txt: LanguageManager.getlocal("playerview_child"),
                proValue: UIData.childnum,
                proIcon: "",
            }, {
                txt: LanguageManager.getlocal("rank_challenge") + ": ",
                proValue: bcid + "." + LanguageManager.getlocal("challengeTitle" + bcid),
                proIcon: "public_icon4",
            }, {
                txt: LanguageManager.getlocal("rank_imacy2"),
                proValue: UIData.imacy,
                proIcon: "public_icon3",
            }
        ];
        for (var index = 0; index < proCfg.length; index++) {
            var proText = this._bottomnodeContainer.getChildByName("proText" + (index + 1));
            proText.text = String(proCfg[index].proValue);
        }
    };
    RankUserinfoPopupView.prototype.shieldBtnHandler = function () {
        var UIData = this.param.data;
        if (Api.chatVoApi.getIsBlock(UIData.ruid)) {
            // LocalStorageManager.remove("shield" + UIData.ruid);
            // App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldMsg3"));
            // this._shieldBtn.setText("chatShield");
            // return;
            var rewardStr_1 = LanguageManager.getlocal("chatCancelBlockDesc", [UIData.name]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "chatCancelShield",
                msg: rewardStr_1,
                callback: this.doShield,
                handler: this,
                needCancel: true
            });
            return;
        }
        var rewardStr = LanguageManager.getlocal("chatShieldDesc", [UIData.name]);
        // let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "chatShield",
            msg: rewardStr,
            callback: this.doShield,
            handler: this,
            needCancel: true
        });
    };
    RankUserinfoPopupView.prototype.doShield = function () {
        var UIData = this.param.data;
        // LocalStorageManager.set("shield" + UIData.ruid,"true")
        if (Api.chatVoApi.getIsBlock(UIData.ruid)) {
            this.request(NetRequestConst.REQUEST_CHAT_UNBLOCK, { fuid: UIData.ruid });
        }
        else {
            var num = 0;
            if (Api.chatVoApi.getChatBlockVo().info) {
                num = Api.chatVoApi.getChatBlockVo().info.length;
                if (!num) {
                    num = 0;
                }
            }
            var snum = GameConfig.config.friendCfg.maxShieldPlayer;
            if (num >= snum) {
                App.CommonUtil.showTip(LanguageManager.getlocal("chatblockCountMax"));
                return;
            }
            this.request(NetRequestConst.REQUEST_CHAT_BLOCK, { fuid: UIData.ruid });
        }
        // if(LocalStorageManager.get("shield" + UIData.ruid)){
    };
    RankUserinfoPopupView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_CHAT_BLOCK) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldMsg2"));
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_CHAT_UNBLOCK) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldMsg3"));
        }
        if (Api.chatVoApi.getIsBlock(this.param.data.ruid)) {
            this._shieldBtn.setText("chatCancelShield");
        }
        else {
            this._shieldBtn.setText("chatShield");
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_PRICHAT_FRESHVIEW);
    };
    RankUserinfoPopupView.prototype.dinerBtnHandler = function () {
        if (Api.composemapVoApi.getMaxLv() < Config.DinnerCfg.getNeedLv()) {
            App.CommonUtil.showTip(Api.dinnerVoApi.getLockedString());
            return;
        }
        if (this.param.data.ishavedinner == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("dinner_shotJoinTip"));
            return;
        }
        //触发宴会引导
        if (Api.rookieVoApi.curGuideKey == "dinner") {
            this.hide();
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DINNER_GUIDE);
            return;
        }
        ViewController.getInstance().openView(ViewConst.BASE.GOTODINNEREDVIEW, { "info": { uid: this.param.data.ruid, name: this.param.data.name } });
        if (this.param.data.isFromDinner) {
            this.hide();
        }
    };
    RankUserinfoPopupView.prototype.getShowHeight = function () {
        return 910;
    };
    RankUserinfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "playerview_powerbg",
            "playerview_probg",
            "playerview_pro1",
            "playerview_pro2",
            "playerview_pro3",
            "playerview_pro4",
            "playerview_pro5",
            "playerview_pro6",
            "playerview_pro7",
            "playerview_pro8",
            "playerview_pro9",
            "playerview_pro10",
            "playerview_pro11",
            "playerview_pro12",
            "playerview_pro13",
            "playerview_pro16",
            "playerview_pro17",
            "playerview_power_img",
            "office_fnt",
            // "servant_mask",
            "wifeview_balckbg",
            "prisonview_1"
        ]);
    };
    RankUserinfoPopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._bottomnodeContainer = null;
        this.cacheAsBitmap = true;
        this._friendsBtn = null;
        _super.prototype.dispose.call(this);
    };
    return RankUserinfoPopupView;
}(PopupView));
__reflect(RankUserinfoPopupView.prototype, "RankUserinfoPopupView");
