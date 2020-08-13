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
        this.height = 208 + this.getSpaceY();
        // childInfo.total
        this._childInfo = childInfo;
        var bg = BaseBitmap.create("public_9_bg31");
        bg.width = this.width;
        bg.height = 208;
        bg.x = 5;
        // nameBg.x = 25;
        // nameBg.y = 40;
        this.addChild(bg);
        var childbg = BaseBitmap.create("adult_smallbg");
        this.addChild(childbg);
        childbg.x = bg.x + 10;
        childbg.y = bg.y + bg.height / 2 - childbg.height / 2;
        var bg2 = BaseBitmap.create("public_9_managebg");
        bg2.width = 370;
        bg2.height = 100;
        bg2.x = childbg.x + childbg.width + 10;
        bg2.y = childbg.y + 10;
        this.addChild(bg2);
        var iconStr = "adult_boy";
        if (childInfo.sex == 2) {
            iconStr = "adult_girl";
        }
        if (Api.switchVoApi.checkOpenAdultImage() && childInfo.aquality != 7) {
            iconStr = "adult_" + childInfo.sex + "_" + childInfo.aquality;
        }
        var qualityBg = BaseBitmap.create("adult_namebg");
        qualityBg.x = childbg.x + 10;
        qualityBg.y = childbg.y + 10;
        this.addChild(qualityBg);
        var qualityBB = BaseBitmap.create("adult_q" + childInfo.aquality);
        qualityBB.x = childbg.x + 10;
        qualityBB.y = childbg.y + 15;
        qualityBB.setScale(0.7);
        this.addChild(qualityBB);
        if (PlatformManager.checkIsThSp()) {
            qualityBB.setPosition(qualityBg.x + qualityBg.width / 2 - qualityBB.width / 2, qualityBg.y + qualityBg.height / 2 - qualityBB.height / 2 + 7);
        }
        var icon = BaseLoadBitmap.create(iconStr);
        icon.x = bg.x + 40;
        icon.y = 20;
        icon.setScale(0.45);
        this.addChild(icon);
        var nameTF = ComponentManager.getTextField(childInfo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        nameTF.x = bg2.x + 5;
        nameTF.y = bg2.y + 7;
        this.addChild(nameTF);
        var fatherStr = LanguageManager.getlocal("adultMarryFather") + childInfo.fatherName;
        var fatherTF = ComponentManager.getTextField(fatherStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        fatherTF.x = nameTF.x;
        fatherTF.y = nameTF.y + nameTF.height + 10;
        this.addChild(fatherTF);
        var attrStr = LanguageManager.getlocal("servant_infoAttr") + childInfo.total;
        var attrTF = ComponentManager.getTextField(attrStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        attrTF.x = nameTF.x;
        attrTF.y = fatherTF.y + nameTF.height + 10;
        this.addChild(attrTF);
        //新增亲家
        if (Api.adultVoApi.judgeIsSudan(childInfo.uid)) {
            var info = Api.adultVoApi.getFreiendNums(childInfo.uid);
            var friendnum = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinFriendNums', [info.num.toString()]), 20, TextFieldConst.COLOR_BLACK);
            this.setLayoutPosition(LayoutConst.righttop, friendnum, bg2, [13, 7]);
            this.addChild(friendnum);
            var progress = ComponentManager.getProgressBar("progress11", "progress11_bg", 102);
            this.setLayoutPosition(LayoutConst.horizontalCentertop, progress, friendnum, [0, friendnum.textHeight + 10]);
            this.addChild(progress);
            progress.setPercentage(info.percent, LanguageManager.getlocal("adultFriendDesc" + info.quality), TextFieldConst.COLOR_WHITE);
            //this.setLayoutPosition(LayoutConst.righttop, lynumTxt, bg2, [5,7]);
            progress.setTextSize(18);
            //属性加成
            if (!childInfo.visittype) {
                // let str = '';//Api.adultVoApi.getVisitLevel(childInfo);
                // if(childInfo.visit == bData.uid){
                // 	baifang = true;
                // }
                // hufang = baifang && laifang;
                // if(hufang){
                // 	str = 'adulthavehufang';
                // }else if(baifang){
                // 	str = 'adulthavevisit';
                // }else if(laifang){
                // 	str = 'adulthavevisited';
                // }
                // if(childInfo.visit == Api.playerVoApi.getPlayerID()){
                // 	laifang = true;
                // }
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
                // let visitlevel = Api.adultVoApi.getVisitLevel(childInfo);
                // if(visitlevel){
                // 	let arrtnum = Config.SadunCfg[`addExtent${visitlevel == 3 ? 2 : 1}`] * 100;
                // 	let attradd = ComponentManager.getTextField(LanguageManager.getlocal(`adultVisitLevel${visitlevel}`,[arrtnum.toString()]), 20, 0x3e9b00);
                // 	this.setLayoutPosition(LayoutConst.lefttop, attradd, attrTF, [attrTF.textWidth + 10,0]);
                // 	this.addChild(attradd);
                // }
            }
        }
        else {
            var lynumTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinNums', [Api.adultVoApi.getLyinnum(childInfo.uid).toString()]), 20, TextFieldConst.COLOR_BLACK);
            this.setLayoutPosition(LayoutConst.rightverticalCenter, lynumTxt, bg2, [30, 0]);
            this.addChild(lynumTxt);
        }
        var tipbg = BaseBitmap.create('public_9_bg15');
        tipbg.width = 180;
        tipbg.height = 30;
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipbg, childbg, [0, 10]);
        this.addChild(tipbg);
        var lastTime = 0;
        if (this._childInfo.et) {
            lastTime = this._childInfo.et - GameData.serverTime;
        }
        this._timeText = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(lastTime, 1) + LanguageManager.getlocal("adultTimeEnd"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_WHITE);
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._timeText, tipbg);
        this.addChild(this._timeText);
        //绑定计时器
        if (1) {
            this.clearTimer();
            this._timer = new egret.Timer(1000);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.show_round, this);
            this._timer.start();
            this.show_round();
        }
        var str1 = '', str2 = '';
        if (childInfo.visittype) {
            str1 = "adultvisitaccept";
            str2 = "adultvisitrefuse";
        }
        else {
            var costStr = LanguageManager.getlocal("adultMarryRequestCost");
            var costTF = ComponentManager.getTextField(costStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            this.setLayoutPosition(LayoutConst.lefttop, costTF, bg2, [5, bg2.height + 5]);
            this.addChild(costTF);
            var gemBg = BaseLoadBitmap.create("itemicon1");
            gemBg.setScale(0.45);
            this.setLayoutPosition(LayoutConst.lefttop, gemBg, costTF, [-20, costTF.textHeight - 5]);
            this.addChild(gemBg);
            var costItemId = Config.AdultCfg.getItemCfgById(childInfo.aquality).needItem;
            var itemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
            var itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
            var costGem = Config.AdultCfg.getItemCfgById(childInfo.aquality).needGem;
            var costNum = costGem.toString();
            var costNumTF = ComponentManager.getTextField(costNum, 18, TextFieldConst.COLOR_WARN_GREEN2);
            this.setLayoutPosition(LayoutConst.lefttop, costNumTF, costTF, [23, costTF.textHeight + 10]);
            this.addChild(costNumTF);
            str1 = "adultMarryRequestChooseChild";
            str2 = "adultMarryRequestRefuse";
        }
        //choose
        var chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, str1, this.chooseBtnClick, this);
        // chooseBtn.x = refuseBtn.x + refuseBtn.width + 5;
        // chooseBtn.y = costTF.y + costTF.height + 7;
        this.setLayoutPosition(LayoutConst.rightbottom, chooseBtn, this, [10, 20]);
        this.addChild(chooseBtn);
        chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
        //拒绝
        var refuseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, str2, this.refuseBtnClick, this);
        //this.setLayoutPosition(LayoutConst.);
        this.setLayoutPosition(LayoutConst.lefttop, refuseBtn, chooseBtn, [-refuseBtn.width - 15, 0]);
        this.addChild(refuseBtn);
        refuseBtn.setColor(TextFieldConst.COLOR_BLACK);
    };
    AdultMarryRequestScrollItem.prototype.show_round = function () {
        var lastTime = this._childInfo.et - GameData.serverTime;
        this._timeText.text = App.DateUtil.getFormatBySecond(lastTime, 1) + LanguageManager.getlocal("adultTimeEnd");
        if (lastTime <= 0) {
            if (this._childInfo.visittype) {
                Api.adultVoApi.param = [this._childInfo.name, this._childInfo.fatherName];
                NetManager.request(NetRequestConst.REQUEST_SADUN_REFUSEVISIT, {
                    fchildId: this._childInfo.id,
                    fuid: this._childInfo.uid
                });
            }
            else {
            }
        }
    };
    AdultMarryRequestScrollItem.prototype.refuseBtnClick = function () {
        if (this._childInfo.visittype) {
            Api.adultVoApi.param = [this._childInfo.name, this._childInfo.fatherName];
            NetManager.request(NetRequestConst.REQUEST_SADUN_REFUSEVISIT, {
                fchildId: this._childInfo.id,
                fuid: this._childInfo.uid
            });
            Api.adultVoApi.param = [this._childInfo.name, Api.adultVoApi.getSadunInfoByUid(this._childInfo.uid).name];
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
            ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSERECEICEVIEW, { "childInfo": this._childInfo });
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
//# sourceMappingURL=AdultMarryRequestScrollItem.js.map