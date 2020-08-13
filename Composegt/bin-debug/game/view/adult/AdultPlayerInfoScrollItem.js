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
 玩家信息列表
 * author qianjun
 * date 2017/10/30
 * @class AdultPlayerInfoScrollItem
 */
var AdultPlayerInfoScrollItem = (function (_super) {
    __extends(AdultPlayerInfoScrollItem, _super);
    function AdultPlayerInfoScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    AdultPlayerInfoScrollItem.prototype.initItem = function (index, bData) {
        this.width = 520;
        this.height = 130 + this.getSpaceY();
        // childInfo.total
        this._data = bData;
        this._itemIndex = index;
        var bg = BaseBitmap.create("public_listbg");
        bg.x = 5;
        bg.width = this.width;
        bg.height = 130;
        this.addChild(bg);
        var iconContainer = new BaseDisplayObjectContainer();
        this.addChild(iconContainer);
        // let posBg : BaseBitmap = BaseBitmap.create(bData.title == '' ? 'public_chatheadbg' : Api.playerVoApi.getVipHeadBgByTitle(bData.title));
        // iconContainer.addChild(posBg)
        // let rect1:egret.Rectangle=egret.Rectangle.create();
        // rect1.setTo(0,0,136,143);
        // let posBB = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(bData.pic),rect1);
        // posBB.x = 0;
        // posBB.y =-7;
        // posBB.setScale(2/3);
        // iconContainer.addChild(posBB);
        var headContainer = Api.playerVoApi.getPlayerCircleHead(Number(bData.pic), "" + bData.title);
        iconContainer.addChild(headContainer);
        headContainer.y = -10;
        iconContainer.width = 103;
        iconContainer.height = 100;
        App.CommonUtil.addTouchScaleEffect(iconContainer, this.clickItemHandler, this);
        var namebg = BaseBitmap.create("public_biaoti2");
        namebg.width = 180;
        this.setLayoutPosition(LayoutConst.lefttop, namebg, bg, [iconContainer.x + iconContainer.width + 30, 10]);
        this.addChild(namebg);
        var nameStr = bData.name;
        this._nameTf = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._nameTf, namebg, [0, 0]);
        this.addChild(this._nameTf);
        this.setLayoutPosition(LayoutConst.leftverticalCenter, iconContainer, bg, [15, 4]);
        if (bData.type == 'choosevisit' && bData.laifang) {
            var descbg = BaseBitmap.create('servant_middlebg');
            descbg.width = 114;
            descbg.height = 24;
            this.setLayoutPosition(LayoutConst.horizontalCenterbottom, descbg, iconContainer, [0, 0]);
            this.addChild(descbg);
            var havevisitTxt = ComponentManager.getTextField(LanguageManager.getlocal('adulthavevisited'), 18, TextFieldConst.COLOR_BROWN);
            this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, havevisitTxt, descbg);
            this.addChild(havevisitTxt);
        }
        if (bData.type == 'marry') {
            var info = Api.adultVoApi.getAdultInfoVoById(bData.childid);
            var str = ''; //Api.adultVoApi.getVisitLevel(childInfo);
            var baifang = false;
            var laifang = false;
            var hufang = false;
            if (info.visit == bData.uid) {
                baifang = true;
            }
            if (Api.adultVoApi.isLaifang(bData.uid)) {
                laifang = true;
            }
            hufang = baifang && laifang;
            if (hufang) {
                str = 'adulthavehufang';
            }
            else if (baifang) {
                str = 'adulthavevisit';
            }
            else if (laifang) {
                str = 'adulthavevisited';
            }
            // if(visitlevel){
            // 	let arrtnum = Config.SadunCfg[`addExtent${visitlevel == 3 ? 2 : 1}`] * 100;
            // 	let attradd = ComponentManager.getTextField(LanguageManager.getlocal(`adultVisitLevel${visitlevel}`,[arrtnum.toString()]), 20, 0x3e9b00);
            // 	this.setLayoutPosition(LayoutConst.lefttop, attradd, attrTF, [attrTF.textWidth + 10,0]);
            // 	this.addChild(attradd);
            // }
            if (str != '') {
                var descbg = BaseBitmap.create('servant_middlebg');
                descbg.width = 114;
                descbg.height = 24;
                this.setLayoutPosition(LayoutConst.horizontalCenterbottom, descbg, iconContainer, [0, 0]);
                this.addChild(descbg);
                var havevisitTxt = ComponentManager.getTextField(LanguageManager.getlocal(str), 18);
                this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, havevisitTxt, descbg);
                this.addChild(havevisitTxt);
            }
        }
        // let lineImg = BaseBitmap.create("public_line1");
        // lineImg.width = 400;
        // this.setLayoutPosition(LayoutConst.lefttop, lineImg, this._nameTf, [-10,this._nameTf.textHeight + 5]);
        // this.addChild(lineImg);
        var leadStr = LanguageManager.getlocal("mainui_shili") + bData.power;
        var leadTF = ComponentManager.getTextField(leadStr, 18, TextFieldConst.COLOR_BROWN);
        leadTF.x = namebg.x + 20;
        leadTF.y = namebg.y + namebg.height + 5;
        this.addChild(leadTF);
        var attrStr = LanguageManager.getlocal("mainui_officer") + Api.playerVoApi.getPlayerOfficeByLevel(bData.level);
        var attrTF = ComponentManager.getTextField(attrStr, 18, TextFieldConst.COLOR_BROWN);
        attrTF.x = leadTF.x;
        attrTF.y = leadTF.y + leadTF.height + 5;
        this.addChild(attrTF);
        var gstr = bData.mygname == "" ? LanguageManager.getlocal('nothing') : bData.mygname;
        var conStr = LanguageManager.getlocal("acRank_myAlliancenick", [gstr]);
        var conrTF = ComponentManager.getTextField(conStr, 18, TextFieldConst.COLOR_BROWN);
        conrTF.x = leadTF.x;
        conrTF.y = attrTF.y + attrTF.height + 5;
        this.addChild(conrTF);
        var timeDis = GameData.serverTime - bData.offtime;
        var timeStr = LanguageManager.getlocal(timeDis <= 0 ? "chatblockonline" : "chatblockoffline", [App.DateUtil.getFormatBySecond(timeDis, 4)]);
        if (timeStr == LanguageManager.getlocal('chat_time4')) {
            timeStr = LanguageManager.getlocal('chat_time3', ['1']);
        }
        else {
            //timeStr = timeStr.substring(0, timeStr.length - 1);
        }
        var timeTF = ComponentManager.getTextField(timeStr, 18, TextFieldConst.COLOR_BROWN);
        timeTF.setColor(timeDis <= 0 ? TextFieldConst.COLOR_WARN_GREEN : 0x858583);
        timeTF.visible = false;
        // timeTF.x = 120;
        // timeTF.y = conrTF.y + conrTF.height + 7;
        // timeTF.x = this.width - timeTF.width - 25;
        // // timeTF.textColor = textColor;
        // timeTF.y = this._nameTf.y;
        var quitBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "", this.cancelBlock, this);
        this.setLayoutPosition(LayoutConst.rightbottom, quitBtn, bg, [20, 10]);
        this.addChild(quitBtn);
        this.setLayoutPosition(LayoutConst.horizontalCentertop, timeTF, quitBtn, [0, -timeTF.textHeight - 40]);
        this.addChild(timeTF);
        if (bData.type == 'choosevisit') {
            var adultbfzhong = BaseLoadBitmap.create('adultbfzhong');
            adultbfzhong.width = 105;
            adultbfzhong.height = 69;
            this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, adultbfzhong, quitBtn);
            this.addChild(adultbfzhong);
            adultbfzhong.visible = Api.adultVoApi.isUidInVisit(bData.uid);
            quitBtn.setText('adultchoosevisitviewTitle');
            quitBtn.visible = !adultbfzhong.visible;
            var friendTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultfriendnum', [bData.friend]), 18, TextFieldConst.COLOR_BROWN);
            this.setLayoutPosition(LayoutConst.horizontalCentertop, friendTxt, quitBtn, [0, -18 - 3]);
            this.addChild(friendTxt);
        }
        else {
            quitBtn.visible = false;
            //新增亲家
            var info = Api.adultVoApi.getFreiendNums(this._data.uid);
            var progress = null;
            var friendnum = null;
            var lynumTxt = null;
            if (Api.adultVoApi.judgeIsSudan(this._data.uid)) {
                progress = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 120);
                this.setLayoutPosition(LayoutConst.rightbottom, progress, bg, [90, 35]);
                this.addChild(progress);
                progress.setPercentage(info.percent, LanguageManager.getlocal("adultFriendDesc" + info.quality), TextFieldConst.COLOR_WHITE);
                progress.setTextSize(16);
                friendnum = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinFriendNums', [info.num.toString()]), 18, TextFieldConst.COLOR_BROWN);
                this.setLayoutPosition(LayoutConst.horizontalCentertop, friendnum, progress, [0, -friendnum.textHeight - 5]);
                this.addChild(friendnum);
            }
            else {
                lynumTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinNums', [Api.adultVoApi.getLyinnum(this._data.uid).toString()]), 18, TextFieldConst.COLOR_BROWN);
                this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lynumTxt, quitBtn, [0, -15]);
                this.addChild(lynumTxt);
            }
            if (bData.type == 'marry') {
                this.setLayoutPosition(LayoutConst.rightbottom, quitBtn, this, [20, 20]);
                quitBtn.visible = true;
                quitBtn.setText('adultMarry');
                if (progress) {
                    progress.visible = false;
                }
                if (lynumTxt) {
                    this.setLayoutPosition(LayoutConst.horizontalCentertop, lynumTxt, quitBtn, [0, -lynumTxt.textHeight - 3]);
                }
                else if (friendnum) {
                    this.setLayoutPosition(LayoutConst.horizontalCentertop, friendnum, quitBtn, [0, -friendnum.textHeight - 3]);
                }
            }
        }
    };
    AdultPlayerInfoScrollItem.prototype.clickItemHandler = function (event) {
        this.showUserInfo();
    };
    AdultPlayerInfoScrollItem.prototype.showUserInfo = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._data.uid });
    };
    AdultPlayerInfoScrollItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
        ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW, data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
    };
    AdultPlayerInfoScrollItem.prototype.cancelBlock = function () {
        var data = this._data;
        if (data.type == 'choosevisit') {
            var itemid = 1411;
            var info = Api.adultVoApi.getAdultInfoVoById(this._data.childid);
            var itemUseCount = Api.adultVoApi.getVisitUseByQuality(info.aquality);
            var itemCount = Api.itemVoApi.getItemNumInfoVoById(itemid);
            var itemCfg = Config.ItemCfg.getItemCfgById(itemid);
            var message = LanguageManager.getlocal("adultvisiconfirm", [itemCfg.name + "x" + itemUseCount, this._data.name]);
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {
                confirmCallback: this.useItemConfirmCallbackHandler,
                handler: this,
                icon: itemCfg.icon,
                iconBg: itemCfg.iconBg,
                num: itemCount,
                useNum: itemUseCount,
                msg: message,
                id: itemid
            });
        }
        else {
            //this.request(NetRequestConst.REQUEST_RADULT_PROPOSE, { childId: this._adultInfoVo.id });
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSE_SADUNMARRY, { "fuid": this._data.uid, "childId": this._data.id });
            // NetManager.request(NetRequestConst.REQUEST_RADULT_PROPOSE, {
            // 	childId : this._data.childid, 
            // 	fuid : this._data.uid ,
            // 	protype : 2
            // });
            // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CLICKMARRY,{"id":this._data.id,"childId":this._data.childId});
        }
    };
    AdultPlayerInfoScrollItem.prototype.useItemConfirmCallbackHandler = function (evt) {
        NetManager.request(NetRequestConst.REQUEST_SADUN_VISIT, {
            childId: this._data.childid,
            fuid: this._data.uid,
            protype: 3
        });
        Api.adultVoApi.setVisitId(this._data.uid);
        //App.CommonUtil.showTip(LanguageManager.getlocal('adultissendVisit'));
    };
    AdultPlayerInfoScrollItem.prototype.doShield = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CANCEBLOCK, { "uid": this._data.uid, "name": this._data.name });
    };
    AdultPlayerInfoScrollItem.prototype.getSpaceY = function () {
        return 1;
    };
    AdultPlayerInfoScrollItem.prototype.dispose = function () {
        this._data = null;
        // this._applyBtn = null;
        // this._cancelApplyBtn = null;
        this._itemIndex = null;
        this._nameTf = null;
        _super.prototype.dispose.call(this);
    };
    return AdultPlayerInfoScrollItem;
}(ScrollListItem));
__reflect(AdultPlayerInfoScrollItem.prototype, "AdultPlayerInfoScrollItem");
