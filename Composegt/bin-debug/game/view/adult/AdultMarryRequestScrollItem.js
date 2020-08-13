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
 *向我提亲的子嗣列表
 * author dky
 * date 2017/10/31
 * @class AdultMarryRequestScrollItem
 */
var AdultMarryRequestScrollItem = (function (_super) {
    __extends(AdultMarryRequestScrollItem, _super);
    function AdultMarryRequestScrollItem() {
        return _super.call(this) || this;
    }
    //{total:number,fatherName:string,et:number,id:number,aquality:number,st:number,name:string,uid:number,sex:number}
    AdultMarryRequestScrollItem.prototype.initItem = function (index, childInfo) {
        this.width = 618;
        this.height = 185 + this.getSpaceY();
        // childInfo.total
        this._childInfo = childInfo;
        var bg = BaseBitmap.create("public_listbg");
        bg.width = this.width - 5;
        bg.height = 185;
        bg.x = 5;
        this.addChild(bg);
        var childbg = BaseBitmap.create("adult_middlebg");
        this.addChild(childbg);
        childbg.x = bg.x + 6;
        childbg.y = bg.y + bg.height / 2 - childbg.height / 2 - 4;
        // let bg2:BaseBitmap = BaseBitmap.create("public_9_managebg");
        // bg2.width = 370;
        // bg2.height = 100;
        // bg2.x = childbg.x + childbg.width + 10;
        // bg2.y = childbg.y + 10;
        // this.addChild(bg2);
        var iconStr = "adult_boy";
        if (childInfo.sex == 2) {
            iconStr = "adult_girl";
        }
        var icon = BaseBitmap.create(iconStr);
        icon.x = bg.x + 40;
        icon.y = 13;
        icon.setScale(0.42);
        this.addChild(icon);
        var nameTF = ComponentManager.getTextField(childInfo.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        nameTF.x = childbg.x + childbg.width + 10;
        nameTF.y = childbg.y + 7;
        this.addChild(nameTF);
        var fatherStr = LanguageManager.getlocal("adultMarryFather") + childInfo.fatherName;
        var fatherTF = ComponentManager.getTextField(fatherStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        fatherTF.x = nameTF.x;
        fatherTF.y = nameTF.y + 27;
        this.addChild(fatherTF);
        var attrStr = LanguageManager.getlocal("servant_infoAttr") + childInfo.total;
        var attrTF = ComponentManager.getTextField(attrStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        attrTF.x = nameTF.x;
        attrTF.y = fatherTF.y + 27;
        this.addChild(attrTF);
        //新增亲家
        if (Api.adultVoApi.judgeIsSudan(childInfo.uid)) {
            var info = Api.adultVoApi.getFreiendNums(childInfo.uid);
            var friendnum = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinFriendNums', [info.num.toString()]), 20, TextFieldConst.COLOR_BROWN);
            // this.setLayoutPosition(LayoutConst.righttop, friendnum, bg2, [13,7]);
            friendnum.x = fatherTF.x + 280;
            friendnum.y = fatherTF.y;
            this.addChild(friendnum);
            var progress = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 120);
            this.setLayoutPosition(LayoutConst.horizontalCentertop, progress, friendnum, [0, friendnum.textHeight + 10]);
            this.addChild(progress);
            progress.setPercentage(info.percent, LanguageManager.getlocal("adultFriendDesc" + info.quality), TextFieldConst.COLOR_WHITE);
            //this.setLayoutPosition(LayoutConst.righttop, lynumTxt, bg2, [5,7]);
            progress.setTextSize(16);
            //属性加成
            if (!childInfo.visittype) {
                var level = 0;
                var childInfoList = Api.adultVoApi.getAdultVoListByIdByAttr(this._childInfo.aquality, this._childInfo.sex);
                if (childInfoList.length) {
                    var baifang = false;
                    var laifang = false;
                    var hufang = false;
                    if (childInfo.visit == Api.playerVoApi.getPlayerID()) {
                        laifang = true;
                    }
                    for (var i in childInfoList) {
                        var unit = childInfoList[i];
                        if (unit.visit == childInfo.uid) {
                            baifang = true;
                            break;
                        }
                    }
                    hufang = baifang && laifang;
                    if (hufang) {
                        level = 3;
                    }
                    else if (baifang) {
                        level = 1;
                    }
                    else if (laifang) {
                        level = 2;
                    }
                }
                if (level) {
                    var arrtnum = Config.SadunCfg["addExtent" + (level == 3 ? 2 : 1)] * 100;
                    var attradd = ComponentManager.getTextField(LanguageManager.getlocal("adultVisitLevel" + level, [arrtnum.toString()]), 20, 0x3e9b00);
                    this.setLayoutPosition(LayoutConst.lefttop, attradd, attrTF, [attrTF.textWidth + 10, 0]);
                    this.addChild(attradd);
                }
            }
        }
        else {
            var lynumTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinNums', [Api.adultVoApi.getLyinnum(childInfo.uid).toString()]), 20, TextFieldConst.COLOR_BROWN);
            // this.setLayoutPosition(LayoutConst.rightverticalCenter, lynumTxt, bg2, [30,0]);
            lynumTxt.x = fatherTF.x + 240;
            lynumTxt.y = fatherTF.y;
            this.addChild(lynumTxt);
        }
        var qualityBg = BaseBitmap.create("adult_namebg");
        qualityBg.x = childbg.x + 10;
        qualityBg.y = childbg.y + 10;
        qualityBg.setScale(0.7);
        this.addChild(qualityBg);
        var qualityBB = BaseLoadBitmap.create("adult_q" + childInfo.aquality);
        qualityBB.width = 46;
        qualityBB.height = 156;
        qualityBB.x = childbg.x + 10;
        qualityBB.y = childbg.y + 15;
        qualityBB.setScale(0.7);
        this.addChild(qualityBB);
        var tipbg = BaseBitmap.create('servant_middlebg');
        tipbg.width = 180;
        tipbg.height = 30;
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipbg, childbg, [0, 10]);
        this.addChild(tipbg);
        if (PlatformManager.checkIsTextHorizontal()) {
            qualityBg.rotation = -90;
            qualityBg.x = childbg.x + 40;
            qualityBg.y = childbg.y + childbg.height - 30;
            qualityBB.width = 156;
            qualityBB.height = 46;
            qualityBB.x = qualityBg.x;
            qualityBB.y = qualityBg.y - 32;
            this.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipbg, childbg, [0, 0]);
        }
        var lastTime = 0;
        if (this._childInfo.et) {
            lastTime = this._childInfo.et - GameData.serverTime;
        }
        this._timeText = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(lastTime, 1) + LanguageManager.getlocal("adultTimeEnd"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._timeText, tipbg);
        this.addChild(this._timeText);
        //绑定计时器
        if (1) {
            this.clearTimer();
            this._timer = new egret.Timer(1000);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.show_round, this);
            this._timer.start();
        }
        var str1 = '', str2 = '';
        if (childInfo.visittype) {
            str1 = "adultvisitaccept";
            str2 = "adultvisitrefuse";
        }
        else {
            var costStr = LanguageManager.getlocal("adultMarryRequestCost");
            var costTF = ComponentManager.getTextField(costStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            costTF.x = nameTF.x;
            costTF.y = attrTF.y + 27;
            this.addChild(costTF);
            var gemBg = BaseLoadBitmap.create("itemicon1");
            gemBg.setScale(0.35);
            gemBg.x = costTF.x + costTF.width - 7;
            gemBg.y = 90 - 2;
            this.addChild(gemBg);
            var costItemId = Config.AdultCfg.getItemCfgById(childInfo.aquality).needItem;
            var itemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
            var itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
            var costGem = Config.AdultCfg.getItemCfgById(childInfo.aquality).needGem;
            var costNum = costGem + "/" + itemCfg.name;
            var costNumTF = ComponentManager.getTextField(costNum, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
            costNumTF.x = nameTF.x + 110;
            costNumTF.y = costTF.y;
            this.addChild(costNumTF);
            str1 = "adultMarryRequestChooseChild";
            str2 = "adultMarryRequestRefuse";
        }
        // //拒绝
        //choose
        var chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, str1, this.chooseBtnClick, this);
        this.setLayoutPosition(LayoutConst.rightbottom, chooseBtn, this, [17, 25]);
        this.addChild(chooseBtn);
        //拒绝
        var refuseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, str2, this.refuseBtnClick, this);
        this.setLayoutPosition(LayoutConst.lefttop, refuseBtn, chooseBtn, [-refuseBtn.width - 10, 0]);
        this.addChild(refuseBtn);
    };
    AdultMarryRequestScrollItem.prototype.show_round = function () {
        var lastTime = this._childInfo.et - GameData.serverTime;
        this._timeText.text = App.DateUtil.getFormatBySecond(lastTime, 1) + LanguageManager.getlocal("adultTimeEnd");
        if (lastTime <= 0) {
            this._timeText.text = '';
            NetManager.request(NetRequestConst.REQUEST_RADULT_GETPROPOSEE, null);
            if (this._childInfo.visittype) {
                NetManager.request(NetRequestConst.REQUEST_SADUN_REFUSEVISIT, {
                    fchildId: this._childInfo.id,
                    fuid: this._childInfo.uid
                });
            }
        }
    };
    AdultMarryRequestScrollItem.prototype.refuseBtnClick = function () {
        // let data:any = {};
        // data.id = this._childInfo.uid;
        // data.childId = this._childInfo.id;
        if (this._childInfo.visittype) {
            NetManager.request(NetRequestConst.REQUEST_SADUN_REFUSEVISIT, {
                fchildId: this._childInfo.id,
                fuid: this._childInfo.uid
            });
            App.CommonUtil.showTip(LanguageManager.getlocal('adultrefusereceive', [this._childInfo.name, Api.adultVoApi.getSadunInfoByUid(this._childInfo.uid).name]));
        }
        else {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_REFUSEMARRY, { "id": this._childInfo.id, "childId": this._childInfo.id });
        }
    };
    AdultMarryRequestScrollItem.prototype.chooseBtnClick = function () {
        // let data:any = {};
        // data.id = this._childInfo.uid;
        // data.childId = this._childInfo.id;
        if (this._childInfo.visittype) {
            //弹出接待列表
            ViewController.getInstance().openView(ViewConst.COMMON.ADULTCHOOSERECEICEVIEW, { "childInfo": this._childInfo });
        }
        else {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSECHILD, { "childInfo": this._childInfo });
        }
    };
    AdultMarryRequestScrollItem.prototype.clearTimer = function () {
        var view = this;
        if (view._timer) {
            view._timer.stop();
            view._timer.removeEventListener(egret.TimerEvent.TIMER, view.show_round, view);
            view._timer = null;
        }
    };
    AdultMarryRequestScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AdultMarryRequestScrollItem.prototype.dispose = function () {
        this._intimacyTF = null;
        this._childInfo = null;
        this._timeText = null;
        this.clearTimer();
        _super.prototype.dispose.call(this);
    };
    return AdultMarryRequestScrollItem;
}(ScrollListItem));
__reflect(AdultMarryRequestScrollItem.prototype, "AdultMarryRequestScrollItem");
