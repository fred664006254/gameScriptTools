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
  * 中秋活动 Tab1
  * @author 张朝阳
  * date 2018/8/28
  * @class AcMidAutumnViewTab1
  */
var AcMidAutumnViewTab1 = (function (_super) {
    __extends(AcMidAutumnViewTab1, _super);
    function AcMidAutumnViewTab1() {
        var _this = _super.call(this) || this;
        _this._findNumTF = null;
        _this._progress = null;
        _this._boxInfoList = [];
        _this._oneNeedNumTF = null;
        _this._isSendMessage = false;
        _this._activityID = null;
        _this._maxBoxNum = 0;
        _this._guanghuanBM = null;
        _this._guanghuanContainer = null;
        _this._bg = null;
        _this._type = null;
        _this._speakStr = null;
        _this._speakTF = null;
        // private _speakTail:BaseBitmap = null;
        _this._speakBg = null;
        _this._servantBM = null;
        _this._messageLength = 0;
        _this._item1 = null;
        _this._item2 = null;
        _this._item3 = null;
        _this._dragon1 = null;
        _this._gaizi1 = null;
        _this._gaizi2 = null;
        _this._gaizi3 = null;
        _this._timeText = null;
        /**
         * 记录一下奖励
         */
        _this._nowReward = null;
        _this.initView();
        return _this;
    }
    AcMidAutumnViewTab1.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY, this.lotteryHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMA, this.receiveBoxHandle, this);
        this._activityID = this.aid + "-" + this.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._maxBoxNum = cfg.getBoxList()[cfg.getBoxList().length - 1].needNum;
        var bg = null;
        if (ResourceManager.hasRes("acmidautumnview_bg" + this.code)) {
            bg = BaseLoadBitmap.create("acmidautumnview_bg" + this.code);
        }
        else {
            bg = BaseLoadBitmap.create("acmidautumnview_bg1");
            if (this.code == "7") {
                bg = BaseLoadBitmap.create("acmidautumnview_bg6");
            }
        }
        if (this.code == "1" || this.code == "8") {
            bg.width = 624;
            bg.height = 970;
            bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth - this.getViewTitleButtomY() - bg.height + 20); //250);
        }
        else if (this.code == "3") {
            bg.width = 640;
            bg.height = 1136;
            bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth - this.getViewTitleButtomY() - bg.height + 20); //250);
        }
        else if (this.code == "4") {
            bg.width = 640;
            bg.height = 1136;
            bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth - this.getViewTitleButtomY() - bg.height); //250);
        }
        else if (this.code == "6" || this.code == "7" || this.code == "9") {
            bg.width = 640;
            bg.height = 1136;
            bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, -69 - 89);
        }
        else {
            bg.width = 624;
            bg.height = 970;
            bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth - this.getViewTitleButtomY() - bg.height + 20); //250);
        }
        // bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2,GameConfig.stageHeigth -this.getViewTitleButtomY() - bg.height + 20);//250);
        this.addChild(bg);
        //遮照
        var bgY = bg.y;
        var bglazyHeght = bg.y;
        if (bgY >= 10) {
            bgY = 0;
            bglazyHeght = 0;
        }
        else {
            bgY = Math.abs(bg.y) + 10;
        }
        // let maskRect = new egret.Rectangle(0,bgY,bg.width,300+bg.height - Math.abs(bglazyHeght));
        // let maskRect = new egret.Rectangle(0,bgY,bg.width,bg.height - bgY);
        var maskbg = BaseBitmap.create("public_9_viewmask");
        maskbg.x = 0;
        maskbg.y = bg.y + bgY;
        maskbg.width = bg.width;
        maskbg.height = 300 + bg.height - Math.abs(bglazyHeght);
        // console.log(maskRect);
        maskbg.name = "maskbg";
        this.addChild(maskbg);
        bg.mask = maskbg;
        // 光晕的动画
        this._guanghuanContainer = new BaseDisplayObjectContainer();
        // this._guanghuanBM.scaleY = 0.35;
        //草 相关的特效
        if (this.code == "1" || this.code == "8") {
            this._guanghuanBM = BaseBitmap.create("acmidautumnview_guanghuan");
            this._guanghuanBM.anchorOffsetX = this._guanghuanBM.width / 2;
            this._guanghuanBM.anchorOffsetY = this._guanghuanBM.height / 2;
            // 草 1 
            var gress1effect = ComponentManager.getCustomMovieClip("gress1_", 5, 200);
            gress1effect.setScale(1.33);
            gress1effect.setPosition(bg.x + bg.width - gress1effect.width - 95 - 100, bg.y + bg.height - gress1effect.height - 135 - 80 - 200);
            this._guanghuanContainer.setPosition(gress1effect.x + gress1effect.width / 2, gress1effect.y + gress1effect.height);
            egret.Tween.get(this._guanghuanBM, { loop: true }).to({ rotation: 360 }, 2000);
            this._guanghuanContainer.addChild(this._guanghuanBM);
            this._guanghuanContainer.scaleY = 0.35;
            this._guanghuanBM.blendMode = egret.BlendMode.ADD;
            this.addChild(this._guanghuanContainer);
            this.addChild(gress1effect);
            gress1effect.playWithTime(-1);
            gress1effect.addTouchTap(this.effectClick, this, ["1"]);
            // 草 2 
            var gress2effect = ComponentManager.getCustomMovieClip("gress2_", 5, 200);
            gress2effect.setScale(1.33);
            gress2effect.setPosition(bg.x + 300 + 20, bg.y + bg.height - gress2effect.height - 130 - 200);
            this.addChild(gress2effect);
            gress2effect.playWithTime(-1);
            gress2effect.addTouchTap(this.effectClick, this, ["2"]);
            // 草 3 
            var gress3effect = ComponentManager.getCustomMovieClip("gress3_", 5, 200);
            gress3effect.setScale(1.33);
            gress3effect.setPosition(bg.x + 450 + 30, bg.y + bg.height - gress2effect.height - 160 - 200);
            this.addChild(gress3effect);
            gress3effect.playWithTime(-1);
            gress3effect.addTouchTap(this.effectClick, this, ["3"]);
            if (App.CommonUtil.check_dragon()) {
                var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones("wife_full_218");
                droWifeIcon.setScale(0.7);
                droWifeIcon.skewY = 180;
                droWifeIcon.x = bg.x + 190;
                droWifeIcon.y = bg.y + bg.height + 5 - 160;
                this.addChild(droWifeIcon);
            }
            else {
                // wife 的 图片
                var scaleNum = 0.6;
                var wifeBM = BaseLoadBitmap.create("wife_full_218");
                wifeBM.width = 640;
                wifeBM.height = 840;
                wifeBM.setScale(scaleNum);
                wifeBM.skewY = 180;
                wifeBM.setPosition(bg.x + wifeBM.width * scaleNum - 30, bg.y + bg.height - wifeBM.height * scaleNum + 5 - 160);
                this.addChild(wifeBM);
            }
            //说的话相关
            var talkBg = BaseBitmap.create("public_9v_bg11");
            talkBg.scaleX = -1;
            talkBg.width = 360;
            var talkTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnWifeTalk"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            talkTF.width = 320;
            talkBg.height = talkTF.height + 20;
            talkBg.setPosition(bg.x + 244 + 360, bg.y + bg.height - 660);
            talkTF.setPosition(280, talkBg.y + 20);
            this.addChild(talkBg);
            this.addChild(talkTF);
            var infoBtn = ComponentManager.getButton("acmidautumnview_infobtn", "", this.infoBtnClick, this);
            infoBtn.setPosition(bg.width - 110, bg.y + bg.height - infoBtn.height - 10 - 200);
            this.addChild(infoBtn);
            var newbottom_1 = BaseBitmap.create("public_bottombg1");
            newbottom_1.width = 640;
            newbottom_1.height = 190;
            newbottom_1.setPosition(0, GameConfig.stageHeigth - newbottom_1.height - 130);
            this.addChild(newbottom_1);
            // 进度相关
            var buttombg = BaseBitmap.create("public_9_bg49");
            buttombg.width = 612;
            buttombg.height = 110;
            buttombg.setPosition(bg.x + bg.width / 2 - buttombg.width / 2, 60);
            this.addChild(buttombg);
            buttombg.visible = false; //
            var numBg = BaseBitmap.create("common_numbg");
            numBg.setPosition(buttombg.x - 2, buttombg.y + buttombg.height / 2 - numBg.height / 2);
            this.addChild(numBg);
            var numTF = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnNumTitle"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            numTF.setPosition(numBg.x + numBg.width / 2 - numTF.width / 2, numBg.y + numBg.height - numTF.height - 5);
            this.addChild(numTF);
            this._findNumTF = ComponentManager.getTextField("999", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._findNumTF.width = 50;
            this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
            this._findNumTF.setPosition(numBg.x + numBg.width / 2 - this._findNumTF.width / 2, numBg.y + 12);
            this.addChild(this._findNumTF);
            this._progress = ComponentManager.getProgressBar("dailytask_dt_02", "dailytask_dt_01", 482);
            this._progress.setPosition(buttombg.x + 103, buttombg.y + buttombg.height - this._progress.height - 25);
            this.addChild(this._progress);
        }
        else if (this.code == "3") {
            this._guanghuanBM = ComponentManager.getCustomMovieClip("acmidautumn_select_", 11, 100);
            this._guanghuanContainer.width = 207;
            this._guanghuanContainer.height = 118;
            this._guanghuanBM.width = 207;
            this._guanghuanBM.height = 118;
            this._guanghuanBM.x = this._guanghuanContainer.width / 2 - this._guanghuanBM.width / 2;
            this._guanghuanBM.y = this._guanghuanContainer.height / 2 - this._guanghuanBM.height / 2;
            var desk = BaseBitmap.create("acmidautumnview_3_desk");
            desk.x = bg.x + bg.width - desk.width;
            desk.y = GameConfig.stageHeigth - desk.height - 205;
            this.addChild(desk);
            // egret.Tween.get(this._guanghuanBM,{loop:true}).to({rotation:360},2000);
            this._guanghuanBM.playWithTime(0);
            this._guanghuanBM.blendMode = egret.BlendMode.ADD;
            this._guanghuanContainer.addChild(this._guanghuanBM);
            // this._guanghuanContainer.scaleY = 0.56
            this.addChild(this._guanghuanContainer);
            //1
            this._item1 = BaseBitmap.create("acmidautumnview_3_item1");
            this._item1.setScale(0.9);
            this._item1.setPosition(desk.x + 180, desk.y);
            this._item1.addTouchTap(this.effectClick, this, ["1"]);
            this.addChild(this._item1);
            this._gaizi1 = BaseBitmap.create("acmidautumnview_3_gaizi");
            this._gaizi1.anchorOffsetX = this._gaizi1.width;
            this._gaizi1.anchorOffsetY = 60;
            this._gaizi1.setScale(0.9);
            this._gaizi1.x = this._item1.x + this._item1.width * this._item1.scaleX / 2 + this._gaizi1.width * this._gaizi1.scaleX / 2;
            this._gaizi1.y = this._item1.y + this._item1.height * this._item1.scaleY / 2 - this._gaizi1.height * this._gaizi1.scaleY / 2 - 8 + 60;
            this.addChild(this._gaizi1);
            var flower1 = BaseBitmap.create("acmidautumnview_3_flower");
            flower1.setScale(0.9);
            flower1.x = this._item1.x + this._item1.width * this._item1.scaleX / 2 - flower1.width * flower1.scaleX / 2;
            flower1.y = this._item1.y + this._item1.height * this._item1.scaleY / 2 - flower1.height * flower1.scaleY / 2 + 10;
            this.addChild(flower1);
            //2
            this._item2 = BaseBitmap.create("acmidautumnview_3_item2");
            this._item2.setPosition(desk.x + 80, desk.y + 55);
            this._item2.addTouchTap(this.effectClick, this, ["2"]);
            this.addChild(this._item2);
            this._gaizi2 = BaseBitmap.create("acmidautumnview_3_gaizi");
            this._gaizi2.anchorOffsetX = this._gaizi2.width;
            this._gaizi2.anchorOffsetY = 60;
            // gaizi2.anchorOffsetY = gaizi2.height;
            this._gaizi2.x = this._item2.x + this._item2.width / 2 + this._gaizi2.width / 2;
            this._gaizi2.y = this._item2.y + this._item2.height / 2 - this._gaizi2.height / 2 - 8 + 60;
            this.addChild(this._gaizi2);
            var flower2 = BaseBitmap.create("acmidautumnview_3_flower");
            flower2.x = this._item2.x + this._item2.width * this._item2.scaleX / 2 - flower2.width * flower2.scaleX / 2;
            flower2.y = this._item2.y + this._item2.height * this._item2.scaleY / 2 - flower2.height * flower2.scaleY / 2 + 10;
            this.addChild(flower2);
            //3
            this._item3 = BaseBitmap.create("acmidautumnview_3_item3");
            this._item3.setPosition(desk.x + 280, desk.y + 70);
            this._item3.addTouchTap(this.effectClick, this, ["3"]);
            this.addChild(this._item3);
            this._gaizi3 = BaseBitmap.create("acmidautumnview_3_gaizi");
            this._gaizi3.anchorOffsetX = this._gaizi3.width;
            this._gaizi3.anchorOffsetY = 60;
            // gaizi3.anchorOffsetY = gaizi3.height ;
            this._gaizi3.x = this._item3.x + this._item3.width / 2 + this._gaizi3.width / 2;
            this._gaizi3.y = this._item3.y + this._item3.height / 2 - this._gaizi3.height / 2 - 8 + 60;
            this.addChild(this._gaizi3);
            var flower3 = BaseBitmap.create("acmidautumnview_3_flower");
            flower3.x = this._item3.x + this._item3.width * this._item3.scaleX / 2 - flower3.width * flower3.scaleX / 2;
            flower3.y = this._item3.y + this._item3.height * this._item3.scaleY / 2 - flower3.height * flower3.scaleY / 2 + 10;
            this.addChild(flower3);
            // wife 的 图片
            var scaleNum = 0.6;
            var wifeBM = BaseLoadBitmap.create("wife_full_101");
            wifeBM.width = 640;
            wifeBM.height = 840;
            wifeBM.setScale(scaleNum);
            // wifeBM.skewY = 180
            wifeBM.setPosition(bg.x - 100, bg.y + bg.height - wifeBM.height * scaleNum - 180);
            this.addChild(wifeBM);
            //说的话相关
            var talkBg = BaseBitmap.create("public_9v_bg11");
            talkBg.scaleX = -1;
            talkBg.width = 360;
            var talkTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnWifeTalk3"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            talkTF.width = 320;
            talkBg.height = talkTF.height + 50;
            talkBg.setPosition(bg.x + 244 + 310, bg.y + bg.height - 690);
            talkTF.setPosition(280 - 60, talkBg.y + 20);
            this.addChild(talkBg);
            this.addChild(talkTF);
            // 进度相关
            var buttombg = BaseBitmap.create("public_9_bg49");
            buttombg.width = 612;
            buttombg.height = 110;
            buttombg.setPosition(bg.x + bg.width / 2 - buttombg.width / 2, 20);
            this.addChild(buttombg);
            buttombg.visible = false; //
            var numBg = BaseBitmap.create("common_numbg");
            numBg.setPosition(buttombg.x - 2, buttombg.y + buttombg.height / 2 - numBg.height / 2);
            this.addChild(numBg);
            var numTF = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnNumTitle"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            numTF.setPosition(numBg.x + numBg.width / 2 - numTF.width / 2, numBg.y + numBg.height - numTF.height - 5);
            this.addChild(numTF);
            this._findNumTF = ComponentManager.getTextField("999", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._findNumTF.width = 50;
            this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
            this._findNumTF.setPosition(numBg.x + numBg.width / 2 - this._findNumTF.width / 2, numBg.y + 12);
            this.addChild(this._findNumTF);
            this._progress = ComponentManager.getProgressBar("dailytask_dt_02", "dailytask_dt_01", 482);
            this._progress.setPosition(buttombg.x + 103, buttombg.y + buttombg.height - this._progress.height - 25);
            this.addChild(this._progress);
        }
        else if (this.code == "4") {
            this._guanghuanBM = ComponentManager.getCustomMovieClip("acmidautumn_select_", 11, 100);
            this._guanghuanContainer.width = 207;
            this._guanghuanContainer.height = 118;
            this._guanghuanBM.width = 207;
            this._guanghuanBM.height = 118;
            this._guanghuanBM.x = this._guanghuanContainer.width / 2 - this._guanghuanBM.width / 2;
            this._guanghuanBM.y = this._guanghuanContainer.height / 2 - this._guanghuanBM.height / 2;
            // egret.Tween.get(this._guanghuanBM,{loop:true}).to({rotation:360},2000);
            this._guanghuanBM.playWithTime(0);
            this._guanghuanBM.blendMode = egret.BlendMode.ADD;
            this._guanghuanContainer.addChild(this._guanghuanBM);
            // this._guanghuanContainer.scaleY = 0.56
            this.addChild(this._guanghuanContainer);
            //1
            this._item1 = BaseBitmap.create("acmidautumnview_4_item");
            this._item1.setScale(0.9);
            this._item1.setPosition(bg.x + 430 + 15, bg.y + 600 + 95);
            this._item1.addTouchTap(this.effectClick, this, ["1"]);
            this.addChild(this._item1);
            //2
            this._item2 = BaseBitmap.create("acmidautumnview_4_item");
            this._item2.setPosition(bg.x + 325, bg.y + 870 - 60);
            this._item2.addTouchTap(this.effectClick, this, ["2"]);
            this.addChild(this._item2);
            //3
            this._item3 = BaseBitmap.create("acmidautumnview_4_item");
            this._item3.setPosition(bg.x + 480, bg.y + 870 - 60);
            this._item3.addTouchTap(this.effectClick, this, ["3"]);
            this.addChild(this._item3);
            // wife 的 图片
            var scaleNum = 1;
            var wifeBM = BaseLoadBitmap.create("acmidautumnview_4_wife");
            wifeBM.width = 320;
            wifeBM.height = 528;
            wifeBM.setScale(scaleNum);
            // wifeBM.skewY = 180
            wifeBM.setPosition(bg.x, bg.y + bg.height - wifeBM.height - 160);
            this.addChild(wifeBM);
            //说的话相关
            var talkBg = BaseBitmap.create("public_9v_bg11");
            talkBg.scaleX = -1;
            talkBg.width = 360;
            var talkTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnWifeTalk4"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            talkTF.width = 320;
            talkBg.height = talkTF.height + 50;
            talkBg.setPosition(bg.x + 244 + 310, bg.y + bg.height - 690);
            talkTF.setPosition(280 - 50, talkBg.y + 20);
            this.addChild(talkBg);
            this.addChild(talkTF);
            // 进度相关
            var buttombg = BaseBitmap.create("public_9_bg49");
            buttombg.width = 612;
            buttombg.height = 110;
            buttombg.setPosition(bg.x + bg.width / 2 - buttombg.width / 2, 25);
            this.addChild(buttombg);
            buttombg.visible = false; //
            var numBg = BaseBitmap.create("common_numbg");
            numBg.setPosition(buttombg.x - 2, buttombg.y + buttombg.height / 2 - numBg.height / 2);
            this.addChild(numBg);
            var numTF = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnNumTitle"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            numTF.setPosition(numBg.x + numBg.width / 2 - numTF.width / 2, numBg.y + numBg.height - numTF.height - 5);
            this.addChild(numTF);
            this._findNumTF = ComponentManager.getTextField("999", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._findNumTF.width = 50;
            this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
            this._findNumTF.setPosition(numBg.x + numBg.width / 2 - this._findNumTF.width / 2, numBg.y + 12);
            this.addChild(this._findNumTF);
            this._progress = ComponentManager.getProgressBar("dailytask_dt_02", "dailytask_dt_01", 482);
            this._progress.setPosition(buttombg.x + 103, buttombg.y + buttombg.height - this._progress.height - 25);
            this.addChild(this._progress);
        }
        else if (this.code == "6" || this.code == "7" || this.code == "9") {
            if (App.CommonUtil.check_dragon() && ResourceManager.hasRes("wife_full_225_ske")) {
                var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones("wife_full_225");
                droWifeIcon.setScale(0.9);
                // droWifeIcon.setScale(0.7)
                // droWifeIcon.skewY = 180;
                droWifeIcon.x = bg.x + 230 + 20;
                // droWifeIcon.y = bg.y + bg.height + 5-240 +40;
                droWifeIcon.y = GameConfig.stageHeigth - 340;
                // GameConfig.stageHeigth - 190 -130 - desk.height+90;
                this.addChild(droWifeIcon);
            }
            else {
                // wife 的 图片
                var scaleNum = 0.65;
                var wifeBM = BaseLoadBitmap.create("wife_full_225");
                wifeBM.width = 640;
                wifeBM.height = 840;
                wifeBM.setScale(scaleNum);
                // wifeBM.skewY = 180
                wifeBM.setPosition(bg.x + 30, bg.y + bg.height - wifeBM.height * scaleNum + 5 - 280 + 60);
                this.addChild(wifeBM);
            }
            //说的话相关
            var talkBg = BaseBitmap.create("public_9v_bg11");
            talkBg.scaleX = -1;
            talkBg.width = 260;
            var talkTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnWifeTalk6"), 20, TextFieldConst.COLOR_BLACK);
            talkTF.width = 230;
            talkBg.height = talkBg.height > talkTF.height + 60 ? talkBg.height : talkTF.height + 60;
            talkBg.setPosition(bg.x + 320 + talkBg.width, GameConfig.stageHeigth - 820);
            talkTF.setPosition(talkBg.x - talkBg.width + 15, talkBg.y + 20);
            this.addChild(talkBg);
            this.addChild(talkTF);
            var infoBtn = ComponentManager.getButton("acmidautumnview_infobtn", "", this.infoBtnClick, this);
            infoBtn.setPosition(20, 100);
            this.addChild(infoBtn);
            var newbottom_2 = BaseBitmap.create("public_bottombg1");
            newbottom_2.width = 640;
            newbottom_2.height = 190;
            newbottom_2.setPosition(0, GameConfig.stageHeigth - newbottom_2.height - 130);
            this.addChild(newbottom_2);
            newbottom_2.visible = false;
            // 进度相关
            var buttombg = BaseBitmap.create("public_9_bg49");
            buttombg.width = 612;
            buttombg.height = 0;
            buttombg.setPosition(bg.x + bg.width / 2 - buttombg.width / 2, 60);
            this.addChild(buttombg);
            buttombg.visible = false; //
            var numBg = BaseBitmap.create("common_numbg");
            numBg.setPosition(buttombg.x - 2, buttombg.y + buttombg.height / 2 - numBg.height / 2);
            this.addChild(numBg);
            var numTF = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnNumTitle"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            numTF.setPosition(numBg.x + numBg.width / 2 - numTF.width / 2, numBg.y + numBg.height - numTF.height - 5);
            this.addChild(numTF);
            this._findNumTF = ComponentManager.getTextField("999", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._findNumTF.width = 50;
            this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
            this._findNumTF.setPosition(numBg.x + numBg.width / 2 - this._findNumTF.width / 2, numBg.y + 12);
            this.addChild(this._findNumTF);
            this._progress = ComponentManager.getProgressBar("dailytask_dt_02", "dailytask_dt_01", 482);
            this._progress.setPosition(buttombg.x + 103, buttombg.y + buttombg.height - this._progress.height + 25);
            this.addChild(this._progress);
            var desk = BaseBitmap.create("acmidautumnview_6_desk");
            desk.x = 0;
            desk.y = GameConfig.stageHeigth - 190 - 130 - desk.height + 110;
            // desk.y = GameConfig.stageHeigth- 190 -130 - desk.height+90;
            this.addChild(desk);
            // this._item1 = BaseBitmap.create("acmidautumnview_6_item1");
            // this._item2 = BaseBitmap.create("acmidautumnview_6_item2");
            // this._item3 = BaseBitmap.create("acmidautumnview_6_item3");
            // this._item1.x = desk.x+ 160;
            // this._item1.y = desk.y + 135;
            // this.addChild(this._item1);
            this._dragon1 = App.DragonBonesUtil.getLoadDragonBones("fanshu");
            this._dragon1.x = desk.x + 160 + 136;
            this._dragon1.y = desk.y + 135 + 48;
            this._dragon1.stop();
            this.addChild(this._dragon1);
            this._item2 = BaseBitmap.create("acmidautumnview_6_item2");
            this._item2.x = desk.x + 160;
            this._item2.y = desk.y + 135;
            this.addChild(this._item2);
        }
        else {
            this._guanghuanBM = BaseBitmap.create("acmidautumnview_guanghuan");
            this._guanghuanBM.anchorOffsetX = this._guanghuanBM.width / 2;
            this._guanghuanBM.anchorOffsetY = this._guanghuanBM.height / 2;
            // 草 1 
            var gress1effect = ComponentManager.getCustomMovieClip("gress1_", 5, 200);
            gress1effect.setScale(1.33);
            gress1effect.setPosition(bg.x + bg.width - gress1effect.width - 95 - 100, bg.y + bg.height - gress1effect.height - 135 - 80 - 200);
            this._guanghuanContainer.setPosition(gress1effect.x + gress1effect.width / 2, gress1effect.y + gress1effect.height);
            egret.Tween.get(this._guanghuanBM, { loop: true }).to({ rotation: 360 }, 2000);
            this._guanghuanContainer.addChild(this._guanghuanBM);
            this._guanghuanContainer.scaleY = 0.35;
            this._guanghuanBM.blendMode = egret.BlendMode.ADD;
            this.addChild(this._guanghuanContainer);
            this.addChild(gress1effect);
            gress1effect.playWithTime(-1);
            gress1effect.addTouchTap(this.effectClick, this, ["1"]);
            // 草 2 
            var gress2effect = ComponentManager.getCustomMovieClip("gress2_", 5, 200);
            gress2effect.setScale(1.33);
            gress2effect.setPosition(bg.x + 300 + 20, bg.y + bg.height - gress2effect.height - 130 - 200);
            this.addChild(gress2effect);
            gress2effect.playWithTime(-1);
            gress2effect.addTouchTap(this.effectClick, this, ["2"]);
            // 草 3 
            var gress3effect = ComponentManager.getCustomMovieClip("gress3_", 5, 200);
            gress3effect.setScale(1.33);
            gress3effect.setPosition(bg.x + 450 + 30, bg.y + bg.height - gress2effect.height - 160 - 200);
            this.addChild(gress3effect);
            gress3effect.playWithTime(-1);
            gress3effect.addTouchTap(this.effectClick, this, ["3"]);
            if (App.CommonUtil.check_dragon()) {
                var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones("wife_full_218");
                droWifeIcon.setScale(0.7);
                droWifeIcon.skewY = 180;
                droWifeIcon.x = bg.x + 190;
                droWifeIcon.y = bg.y + bg.height + 5 - 160;
                this.addChild(droWifeIcon);
            }
            else {
                // wife 的 图片
                var scaleNum = 0.6;
                var wifeBM = BaseLoadBitmap.create("wife_full_218");
                wifeBM.width = 640;
                wifeBM.height = 840;
                wifeBM.setScale(scaleNum);
                wifeBM.skewY = 180;
                wifeBM.setPosition(bg.x + wifeBM.width * scaleNum - 30, bg.y + bg.height - wifeBM.height * scaleNum + 5 - 160);
                this.addChild(wifeBM);
            }
            //说的话相关
            var talkBg = BaseBitmap.create("public_9v_bg11");
            talkBg.scaleX = -1;
            talkBg.width = 360;
            var talkTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnWifeTalk"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            talkTF.width = 320;
            talkBg.height = talkTF.height + 20;
            talkBg.setPosition(bg.x + 244 + 360, bg.y + bg.height - 660);
            talkTF.setPosition(280, talkBg.y + 20);
            this.addChild(talkBg);
            this.addChild(talkTF);
            var infoBtn = ComponentManager.getButton("acmidautumnview_infobtn", "", this.infoBtnClick, this);
            infoBtn.setPosition(bg.width - 110, bg.y + bg.height - infoBtn.height - 10 - 200);
            this.addChild(infoBtn);
            var newbottom_3 = BaseBitmap.create("public_bottombg1");
            newbottom_3.width = 640;
            newbottom_3.height = 190;
            newbottom_3.setPosition(0, GameConfig.stageHeigth - newbottom_3.height - 130);
            this.addChild(newbottom_3);
            // 进度相关
            var buttombg = BaseBitmap.create("public_9_bg49");
            buttombg.width = 612;
            buttombg.height = 110;
            buttombg.setPosition(bg.x + bg.width / 2 - buttombg.width / 2, 60);
            this.addChild(buttombg);
            buttombg.visible = false; //
            var numBg = BaseBitmap.create("common_numbg");
            numBg.setPosition(buttombg.x - 2, buttombg.y + buttombg.height / 2 - numBg.height / 2);
            this.addChild(numBg);
            var numTF = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnNumTitle"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            numTF.setPosition(numBg.x + numBg.width / 2 - numTF.width / 2, numBg.y + numBg.height - numTF.height - 5);
            this.addChild(numTF);
            this._findNumTF = ComponentManager.getTextField("999", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._findNumTF.width = 50;
            this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
            this._findNumTF.setPosition(numBg.x + numBg.width / 2 - this._findNumTF.width / 2, numBg.y + 12);
            this.addChild(this._findNumTF);
            this._progress = ComponentManager.getProgressBar("dailytask_dt_02", "dailytask_dt_01", 482);
            this._progress.setPosition(buttombg.x + 103, buttombg.y + buttombg.height - this._progress.height - 25);
            this.addChild(this._progress);
        }
        var newbottom = BaseBitmap.create("public_bottombg1");
        newbottom.width = 640;
        newbottom.height = 190;
        this.addChild(newbottom);
        newbottom.setPosition(0, GameConfig.stageHeigth - newbottom.height - 130);
        if (this.code != "1" && this.code != "5" && this.code != "8") {
            var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            // let stTxt = App.DateUtil.getFormatBySecond(vo.st, 9);
            // let etTxt = App.DateUtil.getFormatBySecond(vo.et-86400, 9);
            // - 86400 * 1
            if (this.code == "6" || this.code == "7" || this.code == "9") {
                //活动时间   
                this._timeText = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnAcInfoTime", ["<font color=0x21eb39>" + vo.acTime + "</font>"]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
                this._timeText.x = newbottom.x + newbottom.width / 2 - this._timeText.width / 2;
                this._timeText.y = newbottom.y - this._timeText.height - 5;
                newbottom.visible = false;
                newbottom.setPosition(0, GameConfig.stageHeigth - newbottom.height - 110);
                this._timeText.y = newbottom.y - this._timeText.height - 5;
            }
            else {
                //活动时间   
                this._timeText = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnAcInfoTime", [vo.acTime]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
                this._timeText.x = newbottom.x + newbottom.width / 2 - this._timeText.width / 2;
                this._timeText.y = newbottom.y - this._timeText.height - 5;
            }
            this.addChild(this._timeText);
        }
        //一次相关
        var oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.oneBtnClick, this);
        oneBtn.setPosition(85, newbottom.y + newbottom.height / 2 - oneBtn.height + 25);
        this.addChild(oneBtn);
        if (this.code == "6" || this.code == "7" || this.code == "9") {
            oneBtn.setPosition(85, newbottom.y + newbottom.height / 2 - oneBtn.height + 15);
        }
        var oneBtnIcon = BaseLoadBitmap.create("itemicon1001");
        oneBtnIcon.width = 35;
        oneBtnIcon.height = 35;
        oneBtnIcon.setPosition(oneBtn.x + oneBtn.width / 2 - oneBtnIcon.width / 2 + 12, oneBtn.y + oneBtn.height / 2 - oneBtnIcon.height / 2);
        this.addChild(oneBtnIcon);
        var oneBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        oneBtnIconTF.setPosition(oneBtnIcon.x - oneBtnIconTF.width, oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconTF.height / 2);
        this.addChild(oneBtnIconTF);
        var oneBtnIconNum = ComponentManager.getTextField("X1", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        oneBtnIconNum.setPosition(oneBtnIcon.x + oneBtnIcon.width, oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconNum.height / 2);
        this.addChild(oneBtnIconNum);
        var oneGemBM = BaseBitmap.create("public_icon1");
        oneGemBM.width = 42;
        oneGemBM.height = 42;
        oneGemBM.setPosition(oneBtn.x + oneBtn.width / 2 - oneGemBM.width, oneBtn.y - oneGemBM.height);
        this.addChild(oneGemBM);
        this._oneNeedNumTF = ComponentManager.getTextField(String(cfg.cost), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._oneNeedNumTF.setPosition(oneGemBM.x + oneGemBM.width, oneGemBM.y + oneGemBM.height / 2 - this._oneNeedNumTF.height / 2);
        this.addChild(this._oneNeedNumTF);
        var oneBtnKey = "acMidAutumnFindOne";
        if (this.code != "1" && this.code != "5" && this.code != "8") {
            oneBtnKey = oneBtnKey + this.code;
        }
        var findOneTF = ComponentManager.getTextField(LanguageManager.getlocal(oneBtnKey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        findOneTF.setPosition(oneBtn.x + oneBtn.width / 2 - findOneTF.width / 2, oneBtn.y + oneBtn.height + 2);
        this.addChild(findOneTF);
        //十次相关
        var tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.tenBtnClick, this);
        tenBtn.setPosition(GameConfig.stageWidth - tenBtn.width - 90, oneBtn.y);
        this.addChild(tenBtn);
        var tenBtnIcon = BaseLoadBitmap.create("itemicon1001");
        tenBtnIcon.width = 35;
        tenBtnIcon.height = 35;
        tenBtnIcon.setPosition(tenBtn.x + tenBtn.width / 2 - tenBtnIcon.width / 2 + 12, tenBtn.y + tenBtn.height / 2 - tenBtnIcon.height / 2);
        this.addChild(tenBtnIcon);
        var tenBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        tenBtnIconTF.setPosition(tenBtnIcon.x - tenBtnIconTF.width, tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconTF.height / 2);
        this.addChild(tenBtnIconTF);
        var tenBtnIconNum = ComponentManager.getTextField("X10", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        tenBtnIconNum.setPosition(tenBtnIcon.x + tenBtnIcon.width, tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconNum.height / 2);
        this.addChild(tenBtnIconNum);
        var tenGemBM = BaseBitmap.create("public_icon1");
        tenGemBM.width = 42;
        tenGemBM.height = 42;
        tenGemBM.setPosition(tenBtn.x + tenBtn.width / 2 - tenGemBM.width, tenBtn.y - tenGemBM.height);
        this.addChild(tenGemBM);
        var tenNeedGemTF = ComponentManager.getTextField(String(cfg.cost * 10 * cfg.discount), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tenNeedGemTF.setPosition(tenGemBM.x + tenGemBM.width, tenGemBM.y + tenGemBM.height / 2 - tenNeedGemTF.height / 2);
        this.addChild(tenNeedGemTF);
        var tenBtnKey = "acMidAutumnFindTen";
        if (this.code != "1" && this.code != "5" && this.code != "8") {
            tenBtnKey = tenBtnKey + this.code;
        }
        var findTenTF = ComponentManager.getTextField(LanguageManager.getlocal(tenBtnKey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        findTenTF.setPosition(tenBtn.x + tenBtn.width / 2 - findTenTF.width / 2, tenBtn.y + tenBtn.height + 2);
        this.addChild(findTenTF);
        var tipKey = "acmidAutumnTip";
        if (this.code != "1" && this.code != "5" && this.code != "8") {
            tipKey = tipKey + this.code;
        }
        var tipbg = null;
        if (this.code == "4") {
            // public_tipbg
            tipbg = BaseBitmap.create("public_tipbg");
            this.addChild(tipbg);
        }
        var tipTF = ComponentManager.getTextField(LanguageManager.getlocal(tipKey), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        tipTF.setPosition(bg.x + bg.width / 2 - tipTF.width / 2, 18);
        this.addChild(tipTF);
        if (this.code == "6" || this.code == "7" || this.code == "9") {
            tipTF.visible = false;
        }
        if (this.code == "4") {
            tipbg.scaleX = (tipTF.width + 40) / tipbg.width; //0.5;
            tipbg.scaleY = 0.5;
            tipbg.x = bg.x + bg.width / 2 - tipbg.width * tipbg.scaleX / 2;
            tipbg.y = 5;
        }
        this._bg = bg;
        this.effectClick(null, "2");
        this.initBox();
        this.refreshView();
        var bottomBg = BaseBitmap.create("public_9v_bg03");
        bottomBg.width = 640;
        bottomBg.height = GameConfig.stageHeigth - 205 + 54;
        bottomBg.x = 0;
        bottomBg.y = 0;
        this.addChild(bottomBg);
        if (this.code == "6" || this.code == "7" || this.code == "9") {
            bottomBg.visible = false;
        }
    };
    /**
     * 抽奖的返回数据
     */
    AcMidAutumnViewTab1.prototype.lotteryHandle = function (event) {
        var _this = this;
        var ret = event.data.ret;
        var data = event.data.data.data;
        if (ret) {
            if (this.code == "1" || this.code == "5" || this.code == "8") {
                var lottery_1 = ComponentManager.getCustomMovieClip("lottery_", 10, 150);
                lottery_1.blendMode = egret.BlendMode.ADD;
                if (this._type == "1") {
                    lottery_1.setScale(0.6);
                    lottery_1.x = this._bg.x + 380;
                    lottery_1.y = this._bg.y + this._bg.height - 270 - 200;
                }
                else if (this._type == "2") {
                    lottery_1.setScale(0.8);
                    lottery_1.x = this._bg.x + 280;
                    lottery_1.y = this._bg.y + this._bg.height - 195 - 200;
                }
                else if (this._type == "3") {
                    lottery_1.setScale(0.7);
                    lottery_1.x = this._bg.x + 440;
                    lottery_1.y = this._bg.y + this._bg.height - 210 - 200;
                }
                this.addChild(lottery_1);
                lottery_1.playWithTime(1);
                lottery_1.setEndCallBack(function () {
                    var rewards = data.otherrewards;
                    var otherReward = data.noterewards;
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "otherRewards": otherReward, "isPlayAni": true });
                    _this.refreshView();
                    _this._isSendMessage = false;
                    _this.removeChild(lottery_1);
                    lottery_1.dispose();
                    lottery_1 = null;
                }, this);
            }
            else if (this.code == "3") {
                var lottery_2 = ComponentManager.getCustomMovieClip("acmidautumn_open_", 16, 100);
                lottery_2.blendMode = egret.BlendMode.ADD;
                var offX = -80;
                var offY = -68;
                if (this._type == "1") {
                    this._gaizi1.rotation = 30;
                    // lottery.setScale(0.6);
                    lottery_2.x = this._item1.x + this._item1.width * this._item1.scaleX / 2 + offX;
                    lottery_2.y = this._item1.y + this._item1.height * this._item1.scaleY / 2 + 8 + offY;
                }
                else if (this._type == "2") {
                    this._gaizi2.rotation = 30;
                    // lottery.setScale(0.8);
                    lottery_2.x = this._item2.x + this._item2.width * this._item2.scaleX / 2 + offX;
                    lottery_2.y = this._item2.y + this._item2.height * this._item2.scaleY / 2 + 8 + offY;
                }
                else if (this._type == "3") {
                    this._gaizi3.rotation = 30;
                    // lottery.setScale(0.7);
                    lottery_2.x = this._item3.x + this._item3.width * this._item3.scaleX / 2 + offX;
                    lottery_2.y = this._item3.y + this._item3.height * this._item3.scaleY / 2 + 8 + offY;
                }
                this.addChild(lottery_2);
                lottery_2.playWithTime(1);
                lottery_2.setEndCallBack(function () {
                    var rewards = data.otherrewards;
                    var otherReward = data.noterewards;
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "otherRewards": otherReward, "isPlayAni": true });
                    _this.refreshView();
                    _this._isSendMessage = false;
                    _this.removeChild(lottery_2);
                    lottery_2.dispose();
                    lottery_2 = null;
                }, this);
            }
            else if (this.code == "4") {
                var lottery_3 = ComponentManager.getCustomMovieClip("lottery_", 10, 150);
                lottery_3.blendMode = egret.BlendMode.ADD;
                var offX = -167;
                var offY = -190;
                if (this._type == "1") {
                    // this._gaizi1.rotation = 30;
                    // lottery.setScale(0.6);
                    lottery_3.x = this._item1.x + this._item1.width * this._item1.scaleX / 2 + offX;
                    lottery_3.y = this._item1.y + this._item1.height * this._item1.scaleY / 2 + 8 + offY;
                }
                else if (this._type == "2") {
                    // this._gaizi2.rotation = 30;
                    // lottery.setScale(0.8);
                    lottery_3.x = this._item2.x + this._item2.width * this._item2.scaleX / 2 + offX;
                    lottery_3.y = this._item2.y + this._item2.height * this._item2.scaleY / 2 + 8 + offY;
                }
                else if (this._type == "3") {
                    // this._gaizi3.rotation = 30;
                    // lottery.setScale(0.7);
                    lottery_3.x = this._item3.x + this._item3.width * this._item3.scaleX / 2 + offX;
                    lottery_3.y = this._item3.y + this._item3.height * this._item3.scaleY / 2 + 8 + offY;
                }
                this.addChild(lottery_3);
                lottery_3.playWithTime(1);
                lottery_3.setEndCallBack(function () {
                    var rewards = data.otherrewards;
                    var otherReward = data.noterewards;
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "otherRewards": otherReward, "isPlayAni": true });
                    _this.refreshView();
                    _this._isSendMessage = false;
                    _this.removeChild(lottery_3);
                    lottery_3.dispose();
                    lottery_3 = null;
                }, this);
            }
            else if (this.code == "6" || this.code == "7" || this.code == "9") {
                //添加动画
                if (this._item2.visible) {
                    egret.Tween.get(this._item2)
                        .wait(200)
                        .set({ visible: false });
                }
                this._dragon1.playDragonMovie("idle", 1);
                egret.Tween.get(this)
                    .wait(1500)
                    .call(function () {
                    var rewards = data.otherrewards;
                    var otherReward = data.noterewards;
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "otherRewards": otherReward, "isPlayAni": true });
                    _this.refreshView();
                    _this._isSendMessage = false;
                });
            }
        }
    };
    /**
     * 宝箱的返回数据
     */
    AcMidAutumnViewTab1.prototype.receiveBoxHandle = function (event) {
        var ret = event.data.ret;
        var data = event.data.data.data;
        if (ret) {
            var rewards_1 = data.rewards;
            if (rewards_1 != this._nowReward) {
                var rewardItemvo = GameData.formatRewardItem(this._nowReward)[0];
                var servantReward = Config.ServantCfg.getServantItemById(rewardItemvo.id);
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "name": servantReward.name, "touch": servantReward.exchange, "message": "changeOtherRewardTip", "callback": function () {
                        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards_1, "isPlayAni": true });
                    }, "handler": this });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards_1, "isPlayAni": true });
            }
            this.refreshView();
        }
    };
    /**
     * 刷新UI
     */
    AcMidAutumnViewTab1.prototype.refreshView = function () {
        if (this._gaizi1 && this._gaizi2 && this._gaizi3) {
            this._gaizi1.rotation = 0;
            this._gaizi2.rotation = 0;
            this._gaizi3.rotation = 0;
        }
        this.refreshTF();
        this.refreshBox();
        this.refreshProgress();
    };
    AcMidAutumnViewTab1.prototype.refreshProgress = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var percent = vo.lotteryNum() / this._maxBoxNum;
        this._progress.setPercentage(percent);
    };
    AcMidAutumnViewTab1.prototype.refreshTF = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (vo.isFree) {
            this._oneNeedNumTF.text = LanguageManager.getlocal("sysFreeDesc");
        }
        else {
            this._oneNeedNumTF.text = String(cfg.cost);
        }
        this._findNumTF.text = String(vo.lotteryNum());
    };
    /**
     * 刷新宝箱
     */
    AcMidAutumnViewTab1.prototype.refreshBox = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var boxCfg = cfg.getBoxList();
        for (var i = 0; i < this._boxInfoList.length; i++) {
            var needNum = boxCfg[i].needNum;
            var voNum = vo.lotteryNum();
            var isRevice = vo.boxStatus(boxCfg[i].id);
            if (needNum <= voNum) {
                if (isRevice) {
                    this._boxInfoList[i].box.setRes("dailytask_box1_3");
                    this._boxInfoList[i].boxLight.setVisible(false);
                    egret.Tween.removeTweens(this._boxInfoList[i].box);
                    egret.Tween.removeTweens(this._boxInfoList[i].boxLight);
                }
                else {
                    this._boxInfoList[i].box.setRes("dailytask_box1_2");
                    this._boxInfoList[i].boxLight.setVisible(true);
                    egret.Tween.get(this._boxInfoList[i].boxLight, { loop: true }).to({ rotation: this._boxInfoList[i].boxLight.rotation + 360 }, 10000);
                    egret.Tween.get(this._boxInfoList[i].box, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                }
            }
            else {
                this._boxInfoList[i].box.setRes("dailytask_box1_1");
                this._boxInfoList[i].boxLight.setVisible(false);
                egret.Tween.removeTweens(this._boxInfoList[i].box);
                egret.Tween.removeTweens(this._boxInfoList[i].boxLight);
            }
        }
    };
    /**
     * 初始化宝箱
     */
    AcMidAutumnViewTab1.prototype.initBox = function () {
        var _this = this;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var boxCfg = cfg.getBoxList();
        var maxNum = boxCfg[boxCfg.length - 1].needNum;
        var _loop_1 = function (i) {
            var offestX = 0;
            if (i == 1) {
                offestX = 7;
            }
            else if (i == boxCfg.length - 1) {
                offestX = -3;
            }
            var boxbg = BaseBitmap.create("common_boxbg");
            var posX = this_1._progress.x + (boxCfg[i].needNum / maxNum) * this_1._progress.width;
            boxbg.setPosition(posX - boxbg.width / 2 + offestX, this_1._progress.y - boxbg.height - 15);
            this_1.addChild(boxbg);
            boxbg.visible = false;
            var boxLight = BaseBitmap.create("acturantable_taskbox_light");
            boxLight.anchorOffsetX = boxLight.width / 2;
            boxLight.anchorOffsetY = boxLight.height / 2;
            boxLight.setPosition(boxbg.x + boxbg.width / 2, boxbg.y + boxbg.height / 2 - 20);
            this_1.addChild(boxLight);
            var box = BaseBitmap.create("dailytask_box1_1");
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            box.setScale(0.75);
            box.setPosition(boxLight.x, boxLight.y);
            this_1.addChild(box);
            box.addTouchTap(function (even) {
                var vo = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
                var voNum = vo.lotteryNum();
                var isRevice = vo.boxStatus(boxCfg[i].id);
                var needNum = boxCfg[i].needNum;
                if (needNum <= voNum) {
                    if (!isRevice) {
                        _this._nowReward = boxCfg[i].getReward;
                        NetManager.request(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMA, { "activeId": _this._activityID, "lotteryId": boxCfg[i].id });
                        return;
                    }
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACMIDAUTUMNREWARDINFOPOPUPVIEW, { "code": _this.code, "aid": _this.aid, "itemCfg": boxCfg[i] });
            }, this_1);
            var livenuseeBg = BaseBitmap.create("dailytask_dt_03");
            livenuseeBg.x = posX - livenuseeBg.width / 2;
            livenuseeBg.y = this_1._progress.y + this_1._progress.height - 25;
            this_1.addChild(livenuseeBg);
            var boxDesc = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnBoxNum", [String(boxCfg[i].needNum)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            // boxDesc.setPosition(posX - boxDesc.width / 2 + offestX,this._progress.y +  this._progress.height + 3);
            this_1.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boxDesc, livenuseeBg);
            this_1.addChild(boxDesc);
            if ((this_1.code == "1" || this_1.code == "5" || this_1.code == "8") && i == boxCfg.length - 1) {
                this_1._speakStr = LanguageManager.getlocal("acmidAutumnSpeakTip");
                this_1._speakTF = ComponentManager.getTextField(this_1._speakStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
                // this._speakTail = BaseBitmap.create("public_9_bg25_tail");
                this_1._speakBg = BaseBitmap.create("public_9_qipao");
                this_1._speakBg.width = this_1._speakTF.width + 40;
                this_1._speakBg.height = 56;
                var posX_1 = box.x;
                if (posX_1 + this_1._speakBg.width + 5 > GameConfig.stageWidth) {
                    posX_1 = GameConfig.stageWidth - this_1._speakBg.width - 15;
                }
                this_1._speakBg.setPosition(posX_1, box.y - box.height / 2 - 40);
                this_1.addChild(this_1._speakBg);
                this_1._speakTF.setPosition(this_1._speakBg.x + this_1._speakBg.width / 2 - this_1._speakTF.width / 2, this_1._speakBg.y + this_1._speakBg.height / 2 - this_1._speakTF.height / 2 - 8);
                this_1.addChild(this_1._speakTF);
                // this._speakTail.skewY = 180
                // this._speakTail.setPosition(box.x,box.y - box.height / 2 - this._speakTail.height);
                // this.addChild(this._speakTail);
                this_1._servantBM = BaseLoadBitmap.create("servant_half_1052");
                var scale = 0.33;
                this_1._servantBM.height = 177;
                this_1._servantBM.width = 180;
                this_1._servantBM.setScale(scale);
                this_1._servantBM.setPosition(this_1._speakBg.x - this_1._servantBM.width * scale / 2, this_1._speakBg.y + this_1._speakBg.height - this_1._servantBM.height * scale - 10);
                this_1.addChild(this_1._servantBM);
                egret.Tween.get(this_1._speakBg, { loop: true }).call(function () {
                    _this._speakTF.text = "";
                    // this._speakTail.setVisible(true);
                    _this._servantBM.setVisible(true);
                    _this._speakTF.setVisible(true);
                    _this._speakBg.setVisible(true);
                    _this._messageLength = 0;
                    egret.Tween.get(_this._speakTF, { loop: true }).wait(150).call(function () {
                        _this._speakTF.text = _this._speakStr.substr(0, _this._messageLength);
                        _this._messageLength++;
                    }, _this);
                }, this_1).wait(this_1._speakStr.length * 150 + 2000).call(function () {
                    // this._speakTail.setVisible(false);
                    _this._servantBM.setVisible(false);
                    _this._speakTF.setVisible(false);
                    _this._speakBg.setVisible(false);
                    _this._messageLength = 0;
                    egret.Tween.removeTweens(_this._speakTF);
                }, this_1).wait(10000);
            }
            else if ((this_1.code == "6" || this_1.code == "7" || this_1.code == "9") && i == boxCfg.length - 1) {
                this_1._speakStr = LanguageManager.getlocal("acmidAutumnSpeakTip6");
                this_1._speakTF = ComponentManager.getTextField(this_1._speakStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
                this_1._speakBg = BaseBitmap.create("public_9_qipao");
                this_1._speakBg.width = this_1._speakTF.width + 40;
                this_1._speakBg.height = 56;
                var posX_2 = box.x;
                if (posX_2 + this_1._speakBg.width + 5 > GameConfig.stageWidth) {
                    posX_2 = GameConfig.stageWidth - this_1._speakBg.width - 15;
                }
                this_1._speakBg.setPosition(posX_2, box.y - box.height / 2 - 10);
                this_1.addChild(this_1._speakBg);
                this_1._speakTF.setPosition(this_1._speakBg.x + this_1._speakBg.width / 2 - this_1._speakTF.width / 2, this_1._speakBg.y + this_1._speakBg.height / 2 - this_1._speakTF.height / 2 - 8);
                this_1.addChild(this_1._speakTF);
                this_1._servantBM = BaseLoadBitmap.create("servant_half_1046");
                var scale = 0.33;
                this_1._servantBM.height = 177;
                this_1._servantBM.width = 180;
                this_1._servantBM.setScale(scale);
                this_1._servantBM.setPosition(this_1._speakBg.x - this_1._servantBM.width * scale / 2, this_1._speakBg.y + this_1._speakBg.height - this_1._servantBM.height * scale - 10);
                this_1.addChild(this_1._servantBM);
                egret.Tween.get(this_1._speakBg, { loop: true }).call(function () {
                    _this._speakTF.text = "";
                    // this._speakTail.setVisible(true);
                    _this._servantBM.setVisible(true);
                    _this._speakTF.setVisible(true);
                    _this._speakBg.setVisible(true);
                    _this._messageLength = 0;
                    egret.Tween.get(_this._speakTF, { loop: true }).wait(150).call(function () {
                        _this._speakTF.text = _this._speakStr.substr(0, _this._messageLength);
                        _this._messageLength++;
                    }, _this);
                }, this_1).wait(this_1._speakStr.length * 150 + 2000).call(function () {
                    _this._servantBM.setVisible(false);
                    _this._speakTF.setVisible(false);
                    _this._speakBg.setVisible(false);
                    _this._messageLength = 0;
                    egret.Tween.removeTweens(_this._speakTF);
                }, this_1).wait(10000);
            }
            var boxInfo = { "box": box, "boxLight": boxLight };
            this_1._boxInfoList.push(boxInfo);
        };
        var this_1 = this;
        for (var i = 0; i < boxCfg.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * 查看信息
     */
    AcMidAutumnViewTab1.prototype.infoBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACMIDAUTUMNACINFOPOPUPVIEW, { "code": this.code, "aid": this.aid });
    };
    /**
     * 买一次
     */
    AcMidAutumnViewTab1.prototype.oneBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isSendMessage) {
            return;
        }
        var cost = cfg.cost;
        if (vo.isFree) {
            cost = 0;
        }
        if (Api.playerVoApi.getPlayerGem() < cost) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        NetManager.request(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY, { "activeId": this._activityID, "isTenPlay": 0 });
        this._isSendMessage = true;
    };
    /**
     * 买十次
     */
    AcMidAutumnViewTab1.prototype.tenBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isSendMessage) {
            return;
        }
        var cost = cfg.cost * 10 * cfg.discount;
        if (Api.playerVoApi.getPlayerGem() < cost) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        NetManager.request(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY, { "activeId": this._activityID, "isTenPlay": 1 });
        this._isSendMessage = true;
    };
    /**
     * 特效的监听时间
     */
    AcMidAutumnViewTab1.prototype.effectClick = function (event, type) {
        if (this.code == "1" || this.code == "5" || this.code == "8") {
            this._type = type;
            if (type == "1") {
                this._guanghuanBM.setScale(0.6);
                this._guanghuanContainer.setPosition(this._bg.x + 480, this._bg.y + this._bg.height - 140);
            }
            else if (type == "2") {
                this._guanghuanBM.setScale(0.8);
                this._guanghuanContainer.setPosition(this._bg.x + 405, this._bg.y + this._bg.height - 30);
            }
            else if (type == "3") {
                this._guanghuanBM.setScale(0.7);
                this._guanghuanContainer.setPosition(this._bg.x + 550, this._bg.y + this._bg.height - 60);
            }
            this._guanghuanContainer.y = this._guanghuanContainer.y - 200;
        }
        else if (this.code == "3") {
            this._type = type;
            if (type == "1") {
                this._guanghuanBM.setScale(0.9);
                this._guanghuanBM.x = this._guanghuanContainer.width / 2 - this._guanghuanBM.width * this._guanghuanBM.scaleX / 2;
                this._guanghuanBM.y = this._guanghuanContainer.height / 2 - this._guanghuanBM.height * this._guanghuanBM.scaleY / 2;
                this._guanghuanContainer.x = this._item1.x + this._item1.width * this._item1.scaleX / 2 - this._guanghuanContainer.width / 2 - 5;
                this._guanghuanContainer.y = this._item1.y + this._item1.height * this._item1.scaleY / 2 - this._guanghuanContainer.height / 2 - 4;
            }
            else if (type == "2") {
                this._guanghuanBM.setScale(1);
                this._guanghuanBM.x = this._guanghuanContainer.width / 2 - this._guanghuanBM.width * this._guanghuanBM.scaleX / 2;
                this._guanghuanBM.y = this._guanghuanContainer.height / 2 - this._guanghuanBM.height * this._guanghuanBM.scaleY / 2;
                this._guanghuanContainer.x = this._item2.x + this._item2.width * this._item2.scaleX / 2 - this._guanghuanContainer.width / 2 - 5;
                this._guanghuanContainer.y = this._item2.y + this._item2.height * this._item2.scaleY / 2 - this._guanghuanContainer.height / 2 - 5;
            }
            else if (type == "3") {
                this._guanghuanBM.setScale(1);
                this._guanghuanBM.x = this._guanghuanContainer.width / 2 - this._guanghuanBM.width * this._guanghuanBM.scaleX / 2;
                this._guanghuanBM.y = this._guanghuanContainer.height / 2 - this._guanghuanBM.height * this._guanghuanBM.scaleY / 2;
                this._guanghuanContainer.x = this._item3.x + this._item3.width * this._item3.scaleX / 2 - this._guanghuanContainer.width / 2 - 5;
                this._guanghuanContainer.y = this._item3.y + this._item3.height * this._item3.scaleY / 2 - this._guanghuanContainer.height / 2 - 6;
            }
            // this._guanghuanContainer.y =this._guanghuanContainer.y-200;
        }
        else if (this.code == "4") {
            this._type = type;
            if (type == "1") {
                this._guanghuanBM.setScale(1);
                this._guanghuanBM.x = this._guanghuanContainer.width / 2 - this._guanghuanBM.width * this._guanghuanBM.scaleX / 2;
                this._guanghuanBM.y = this._guanghuanContainer.height / 2 - this._guanghuanBM.height * this._guanghuanBM.scaleY / 2;
                this._guanghuanContainer.x = this._item1.x + this._item1.width * this._item1.scaleX / 2 - this._guanghuanContainer.width / 2 - 12;
                this._guanghuanContainer.y = this._item1.y + this._item1.height * this._item1.scaleY / 2 - this._guanghuanContainer.height / 2 - 2;
            }
            else if (type == "2") {
                this._guanghuanBM.setScale(1.1);
                this._guanghuanBM.x = this._guanghuanContainer.width / 2 - this._guanghuanBM.width * this._guanghuanBM.scaleX / 2;
                this._guanghuanBM.y = this._guanghuanContainer.height / 2 - this._guanghuanBM.height * this._guanghuanBM.scaleY / 2;
                this._guanghuanContainer.x = this._item2.x + this._item2.width * this._item2.scaleX / 2 - this._guanghuanContainer.width / 2 - 14;
                this._guanghuanContainer.y = this._item2.y + this._item2.height * this._item2.scaleY / 2 - this._guanghuanContainer.height / 2 - 3;
            }
            else if (type == "3") {
                this._guanghuanBM.setScale(1.1);
                this._guanghuanBM.x = this._guanghuanContainer.width / 2 - this._guanghuanBM.width * this._guanghuanBM.scaleX / 2;
                this._guanghuanBM.y = this._guanghuanContainer.height / 2 - this._guanghuanBM.height * this._guanghuanBM.scaleY / 2;
                this._guanghuanContainer.x = this._item3.x + this._item3.width * this._item3.scaleX / 2 - this._guanghuanContainer.width / 2 - 14;
                this._guanghuanContainer.y = this._item3.y + this._item3.height * this._item3.scaleY / 2 - this._guanghuanContainer.height / 2 - 3;
            }
            // this._guanghuanContainer.y =this._guanghuanContainer.y-200;
        }
    };
    AcMidAutumnViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY, this.lotteryHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMA, this.receiveBoxHandle, this);
        if (this._speakTF) {
            egret.Tween.removeTweens(this._speakTF);
        }
        if (this._speakBg) {
            egret.Tween.removeTweens(this._speakBg);
        }
        if (this._item2) {
            egret.Tween.removeTweens(this._item2);
        }
        this._findNumTF = null;
        this._progress = null;
        this._oneNeedNumTF = null;
        this._isSendMessage = false;
        this._boxInfoList = [];
        this._maxBoxNum = null;
        this._guanghuanBM = null;
        this._speakStr = null;
        this._speakTF = null;
        this._nowReward = null;
        this._speakBg = null;
        this._servantBM = null;
        this._messageLength = 0;
        this._dragon1 = null;
        this._item1 = null;
        this._item2 = null;
        this._item3 = null;
        this._gaizi1 = null;
        this._gaizi2 = null;
        this._gaizi3 = null;
        _super.prototype.dispose.call(this);
    };
    return AcMidAutumnViewTab1;
}(AcCommonViewTab));
__reflect(AcMidAutumnViewTab1.prototype, "AcMidAutumnViewTab1");
