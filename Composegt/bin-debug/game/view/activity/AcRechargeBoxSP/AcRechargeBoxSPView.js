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
  * 特别宝箱
  * author jiangliuyang
  * date 2019/1/7
  * @class AcRechargeBoxSPView
  */
var AcRechargeBoxSPView = (function (_super) {
    __extends(AcRechargeBoxSPView, _super);
    function AcRechargeBoxSPView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._topbg = null;
        _this.boxInfoList = null;
        return _this;
    }
    AcRechargeBoxSPView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD, this.refreshView, this);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (ResourceManager.hasRes("acrechargeboxspview_bg_" + this.code)) {
            this._topbg = BaseLoadBitmap.create("acrechargeboxspview_bg_" + this.code);
        }
        else {
            this._topbg = BaseLoadBitmap.create("acrechargeboxspview_bg_1");
        }
        if (ResourceManager.hasRes("acrechargeboxspview_title_txt" + this.code)) {
            var titletxt = BaseBitmap.create("acrechargeboxspview_title_txt" + this.code);
            titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
            titletxt.y = 5;
            this.addChild(titletxt);
        }
        this._topbg.width = 626;
        this._topbg.height = 296;
        if (this.code == "8") {
            this._topbg.width = 640;
            this._topbg.height = 123;
        }
        this._topbg.x = GameConfig.stageWidth / 2 - this._topbg.width / 2;
        this._topbg.y = 69;
        this.addChild(this._topbg);
        if (this.code == "7") {
            var flag = BaseBitmap.create("oneyear_flag");
            flag.x = GameConfig.stageWidth - flag.width - 60;
            flag.y = 35;
            this.addChild(flag);
        }
        // let shadow = BaseBitmap.create("commonview_titlebgshadow");
        // shadow.width = GameConfig.stageWidth;
        // shadow.height = 8;\
        // this.addChild(shadow);
        // public_9v_bg03
        var border = BaseBitmap.create("public_9v_bg03");
        border.width = GameConfig.stageWidth;
        border.height = GameConfig.stageHeigth;
        // border.y = -15;
        this.addChild(border);
        var innerBg = null;
        if (ResourceManager.hasRes("acrechargeboxspview_border_" + this.code)) {
            innerBg = BaseLoadBitmap.create("acrechargeboxspview_border_" + this.code);
        }
        else {
            innerBg = BaseLoadBitmap.create("acrechargeboxspview_border_1");
        }
        var bottomBg = null;
        if (ResourceManager.hasRes("acrechargeboxspview_buttombg_" + this.code)) {
            bottomBg = BaseLoadBitmap.create("acrechargeboxspview_buttombg_" + this.code);
        }
        else {
            bottomBg = BaseLoadBitmap.create("acrechargeboxspview_buttombg_1");
        }
        bottomBg.width = 620;
        bottomBg.height = GameConfig.stageHeigth - this._topbg.height - 69 - 16 - 3;
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = this._topbg.y + this._topbg.height + 3; //GameConfig.stageHeigth - this._topbg.height - bottomBg.height - 69;
        innerBg.width = 608;
        innerBg.height = bottomBg.height - 50;
        innerBg.x = bottomBg.x + bottomBg.width / 2 - innerBg.width / 2;
        innerBg.y = bottomBg.y + 5;
        this.addChild(bottomBg);
        this.addChild(innerBg);
        // innerBg.visible = this._suffix == "";
        var actimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        actimeTF.width = 580;
        actimeTF.lineSpacing = 5;
        actimeTF.setPosition(this._topbg.x + 30, this._topbg.y + 210);
        this.addChild(actimeTF);
        var acDesc = null;
        if (LanguageManager.checkHasKey("acRechargeBoxSPDesc" + "_" + this.code)) {
            acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPDesc" + "_" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        }
        else {
            acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPDesc_1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        }
        acDesc.setPosition(actimeTF.x, actimeTF.y + actimeTF.height + 5);
        acDesc.width = 580;
        acDesc.lineSpacing = 5;
        this.addChild(acDesc);
        if (this.code == "8") {
            border.visible = false;
            bottomBg.visible = false;
            innerBg.visible = false;
            actimeTF.width = 620;
            actimeTF.setPosition(this._topbg.x + 10, this._topbg.y + 15);
            acDesc.width = 620;
            acDesc.setPosition(actimeTF.x, actimeTF.y + actimeTF.height + 5);
            this.initcode8box();
        }
        else {
            var boxList = cfg.getBoxListData();
            this.boxInfoList = [];
            for (var i = 0; i < boxList.length; i++) {
                var boxCfg = boxList[i];
                var rechargecfg = Config.RechargeCfg.getRechargeItemCfgByKey(boxCfg.needGem);
                if (i % 3 == 0 && this.code != "8") {
                    var bg1 = null;
                    if (ResourceManager.hasRes("acrechargeboxspview_firstbg_" + this.code)) {
                        bg1 = BaseLoadBitmap.create("acrechargeboxspview_firstbg_" + this.code);
                    }
                    else {
                        bg1 = BaseLoadBitmap.create("acrechargeboxspview_firstbg_1");
                    }
                    bg1.width = 576;
                    bg1.height = 243;
                    bg1.setPosition(innerBg.x + innerBg.width / 2 - bg1.width / 2, innerBg.y + 15 + Math.floor(i / 3) * 253);
                    this.addChild(bg1);
                }
                var boxBgStr = null;
                if (boxCfg.childList.length > 1) {
                    if (ResourceManager.hasRes("acrechargeboxspview_yellowbg_" + this.code)) {
                        boxBgStr = "acrechargeboxspview_yellowbg_" + this.code;
                    }
                    else {
                        boxBgStr = "acrechargeboxspview_yellowbg_1";
                    }
                }
                else {
                    if (ResourceManager.hasRes("acrechargeboxspview_whitebg_" + this.code)) {
                        boxBgStr = "acrechargeboxspview_whitebg_" + this.code;
                    }
                    else {
                        boxBgStr = "acrechargeboxspview_whitebg_1";
                    }
                }
                var boxBg = BaseBitmap.create(boxBgStr);
                boxBg.x = bottomBg.x + 40 + (605 - boxBg.width * 3) / 4 + ((boxBg.width) * (i % 3));
                boxBg.y = innerBg.y + 37 + Math.floor(i / 3) * 253;
                this.addChild(boxBg);
                var box = null;
                if (boxCfg.childList.length > 1) {
                    if (ResourceManager.hasRes("acrechargeboxspview_box1_" + this.code)) {
                        box = BaseLoadBitmap.create("acrechargeboxspview_box1_" + this.code);
                    }
                    else {
                        box = BaseLoadBitmap.create("acrechargeboxspview_box1_1");
                    }
                    box.width = 186;
                    box.height = 186;
                    box.anchorOffsetX = box.width / 2;
                    box.anchorOffsetY = box.height / 2;
                    box.setPosition(boxBg.x + boxBg.width / 2, boxBg.y + boxBg.height / 2 - 25);
                }
                else {
                    if (ResourceManager.hasRes("acrechargeboxspview_basebox1_" + this.code)) {
                        box = BaseLoadBitmap.create("acrechargeboxspview_basebox1_" + this.code);
                    }
                    else {
                        box = BaseLoadBitmap.create("acrechargeboxspview_basebox1_1");
                    }
                    box.width = 122;
                    box.height = 124;
                    box.anchorOffsetX = box.width / 2;
                    box.anchorOffsetY = box.height / 2;
                    box.setPosition(boxBg.x + boxBg.width / 2, boxBg.y + box.height / 2 + 17);
                }
                //tailor_get_light
                var light = BaseBitmap.create("tailor_get_light");
                light.anchorOffsetX = light.width / 2;
                light.anchorOffsetY = light.height / 2;
                light.setPosition(box.x, box.y);
                light.setScale(0.75);
                this.addChild(light);
                light.setVisible(false);
                this.addChild(box);
                box.addTouchTap(this.boxClick, this, [boxCfg.needGem]);
                var gemBM = BaseLoadBitmap.create("itemicon1");
                gemBM.width = 40;
                gemBM.height = 40;
                gemBM.setPosition(boxBg.x + 20, boxBg.y + boxBg.height - gemBM.height - 5);
                this.addChild(gemBM);
                var gemNum = ComponentManager.getTextField(rechargecfg ? "" + rechargecfg.gemCost : "" + boxCfg.thirdPayGem, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
                gemNum.setColor(TextFieldConst.COLOR_QUALITY_WHITE);
                gemNum.setPosition(gemBM.x + gemBM.width + 5, gemBM.y + gemBM.height / 2 - gemNum.height / 2);
                this.addChild(gemNum);
                if ("" + this.code == "5") {
                    // gemBM.
                    gemBM.visible = false;
                    gemNum.text = boxCfg.VND + "VND";
                    gemNum.x = boxBg.x + boxBg.width / 2 - gemNum.width / 2;
                }
                var rechargeNum = vo.getBoxReChargeNum(boxCfg.needGem);
                var receiveNum = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPReceiveNum", [String(rechargeNum), String(boxCfg.limit)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_WHITE);
                var rechargebgStr = "acrechargeboxspview_textbg_1";
                if (ResourceManager.hasRes("acrechargeboxspview_textbg_" + this.code)) {
                    rechargebgStr = "acrechargeboxspview_textbg_" + this.code;
                }
                var rechargebg = BaseBitmap.create(rechargebgStr);
                rechargebg.setPosition(boxBg.x + boxBg.width / 2 - rechargebg.width / 2 - 10, boxBg.y + boxBg.height - rechargebg.height / 2 + 20);
                receiveNum.setPosition(rechargebg.x + rechargebg.width / 2, rechargebg.y + rechargebg.height / 2 - receiveNum.height / 2);
                receiveNum.anchorOffsetX = receiveNum.width / 2;
                this.addChild(rechargebg);
                this.addChild(receiveNum);
                var boxInfo = { "boxBg": boxBg, "needGem": boxCfg.needGem, "lightBM": light, "boxBM": box, "rechargeTF": receiveNum, "rechargebg": rechargebg };
                this.boxInfoList.push(boxInfo);
            }
        }
        this.refreshView();
        var flowerBM = null;
        if (ResourceManager.hasRes("acrechargeboxspview_flower_" + this.code)) {
            flowerBM = BaseBitmap.create("acrechargeboxspview_flower_" + this.code);
        }
        else {
            flowerBM = BaseBitmap.create("acrechargeboxspview_flower_1");
        }
        flowerBM.setPosition(this._topbg.x, this._topbg.y + this._topbg.height);
        this.addChild(flowerBM);
        if (this.code == "6") {
            flowerBM.setPosition(this._topbg.x + 8, this._topbg.y + this._topbg.height + 10);
        }
        var buttomBg3 = null;
        if (ResourceManager.hasRes("acrechargeboxspview_bg3_" + this.code)) {
            buttomBg3 = BaseLoadBitmap.create("acrechargeboxspview_bg3_" + this.code);
        }
        else {
            buttomBg3 = BaseLoadBitmap.create("acrechargeboxspview_bg3_1");
        }
        buttomBg3.width = 620;
        buttomBg3.height = 89;
        buttomBg3.setPosition(bottomBg.x + bottomBg.width / 2 - buttomBg3.width / 2, bottomBg.y + bottomBg.height - buttomBg3.height);
        this.addChild(buttomBg3);
        if (this.code == "8") {
            buttomBg3.setVisible(false);
        }
    };
    AcRechargeBoxSPView.prototype.initcode8box = function () {
        console.log("code 8 is add");
        //初始化界面
        var nodeContainer = new BaseDisplayObjectContainer();
        nodeContainer.height = GameConfig.stageHeigth - 104;
        this.addChildToContainer(nodeContainer);
        var wifeid = "2211";
        var dragonScale = 1;
        var dragonY = GameConfig.stageHeigth - 10;
        var imgScale = 0.8;
        var imgY = GameConfig.stageHeigth - 660;
        var fY = 1136 - 267 + 80;
        if (App.CommonUtil.check_dragon() && ResourceManager.hasRes("wife_full3_" + wifeid + "_ske") && Api.wifeVoApi.isHaveBone("wife_full3_" + wifeid + "_ske")) {
            var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones("wife_full3_" + wifeid);
            droWifeIcon.setScale(dragonScale);
            droWifeIcon.x = 150;
            droWifeIcon.y = dragonY;
            nodeContainer.addChild(droWifeIcon);
        }
        else {
            // wife 的 图片
            var wifeBM = BaseLoadBitmap.create("wife_skin_" + wifeid);
            wifeBM.width = 640;
            wifeBM.height = 840;
            wifeBM.setScale(imgScale);
            wifeBM.x = -100;
            wifeBM.y = imgY;
            nodeContainer.addChild(wifeBM);
        }
        // 
        var code8DescSp = BaseLoadBitmap.create("acrechargeboxspview_dectext_8");
        code8DescSp.setPosition(30, 175);
        this.addChild(code8DescSp);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var boxList = cfg.getBoxListBaseData();
        boxList.sort(function (a, b) {
            return b.id - a.id;
        });
        var bg1 = BaseLoadBitmap.create("acrechargeboxspview_desk_1_8");
        bg1.setPosition(292, GameConfig.stageHeigth - 518);
        this.addChild(bg1);
        var bg2 = BaseLoadBitmap.create("acrechargeboxspview_desk_2_8");
        bg2.setPosition(216, GameConfig.stageHeigth - 321);
        this.addChild(bg2);
        var bg3 = BaseLoadBitmap.create("acrechargeboxspview_desk_3_8");
        bg3.setPosition(135, GameConfig.stageHeigth - 125);
        this.addChild(bg3);
        this.boxInfoList = [];
        //第一排桌子
        for (var i = 0; i < boxList.length; i++) {
            var BoxStr = "acrechargeboxspview_box";
            var boxCfg = boxList[i];
            var offsetX = 0;
            var offsetY = 0;
            var rechargecfg = Config.RechargeCfg.getRechargeItemCfgByKey(boxCfg.needGem);
            if (i == 0) {
                BoxStr = BoxStr + "3_1_8";
                offsetX = 77;
                offsetY = 118;
            }
            else if (i == 1 || i == 2) {
                BoxStr = BoxStr + "2_1_8";
                offsetX = 67;
                offsetY = 92;
            }
            else {
                BoxStr = BoxStr + "1_1_8";
                offsetX = 55;
                offsetY = 86;
            }
            var boxBg = BaseBitmap.create("acrechargeboxspview_whitebg_8");
            if (i == 0) {
                boxBg.x = 325;
                boxBg.y = bg1.y;
            }
            else if (i == 1) {
                boxBg.x = 243;
                boxBg.y = bg2.y;
            }
            else if (i == 2) {
                boxBg.x = 403;
                boxBg.y = bg2.y;
            }
            else if (i == 3) {
                boxBg.x = 164;
                boxBg.y = bg3.y;
            }
            else if (i == 4) {
                boxBg.x = 323;
                boxBg.y = bg3.y;
            }
            else if (i == 5) {
                boxBg.x = 482;
                boxBg.y = bg3.y;
            }
            var box = BaseLoadBitmap.create(BoxStr);
            box.anchorOffsetX = offsetX;
            box.anchorOffsetY = offsetY;
            box.setPosition(boxBg.x + boxBg.width / 2, boxBg.y);
            var light = BaseBitmap.create("tailor_get_light");
            light.anchorOffsetX = light.width / 2;
            light.anchorOffsetY = light.height / 2;
            light.setPosition(box.x, box.y);
            light.setScale(0.75);
            this.addChild(light);
            this.addChild(boxBg);
            light.setVisible(false);
            this.addChild(box);
            box.addTouchTap(this.boxClick, this, [boxCfg.needGem]);
            var gemBM = BaseLoadBitmap.create("itemicon1");
            gemBM.width = 30;
            gemBM.height = 30;
            gemBM.setPosition(boxBg.x + 20, boxBg.y + boxBg.height - gemBM.height - 10);
            this.addChild(gemBM);
            var gemNum = ComponentManager.getTextField(rechargecfg ? "" + rechargecfg.gemCost : "" + boxCfg.thirdPayGem, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
            gemNum.setColor(TextFieldConst.COLOR_QUALITY_WHITE);
            gemNum.setPosition(gemBM.x + gemBM.width + 5, gemBM.y + gemBM.height / 2 - gemNum.height / 2);
            this.addChild(gemNum);
            var rechargeNum = vo.getBoxReChargeNum(boxCfg.needGem);
            var receiveNum = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPReceiveNum", [String(rechargeNum), String(boxCfg.limit)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_WHITE);
            var rechargebg = BaseBitmap.create("acrechargeboxspview_textbg_1");
            rechargebg.setScale(0.94);
            rechargebg.setPosition(boxBg.x + boxBg.width / 2 - rechargebg.width * 0.94 / 2, boxBg.y + boxBg.height - rechargebg.height / 2 + 20);
            receiveNum.setPosition(rechargebg.x + rechargebg.width * 0.94 / 2, rechargebg.y + rechargebg.height / 2 - receiveNum.height / 2);
            receiveNum.anchorOffsetX = receiveNum.width / 2;
            this.addChild(rechargebg);
            this.addChild(receiveNum);
            var boxInfo1 = { "boxBg": boxBg, "needGem": boxCfg.needGem, "lightBM": light, "boxBM": box, "rechargeTF": receiveNum, "rechargebg": rechargebg };
            this.boxInfoList.push(boxInfo1);
        }
        //衣装预览
        var showBtnBg = BaseBitmap.create("mainui_bottombtnbg");
        showBtnBg.x = 15;
        showBtnBg.y = GameConfig.stageHeigth - 100;
        this.addChild(showBtnBg);
        var showBtn = ComponentManager.getButton("moonnight_showbtn-1", "", this.showBtnHandler, this);
        showBtn.x = showBtnBg.x + showBtnBg.width / 2 - showBtn.width / 2;
        showBtn.y = showBtnBg.y + showBtnBg.height / 2 - showBtn.height / 2;
        this.addChild(showBtn);
        var showBtnTxt = BaseBitmap.create("moonnight_showbtntxt-1");
        showBtnTxt.x = showBtnBg.x + showBtnBg.width / 2 - showBtnTxt.width / 2;
        showBtnTxt.y = showBtnBg.y + showBtnBg.height - showBtnTxt.height;
        this.addChild(showBtnTxt);
    };
    AcRechargeBoxSPView.prototype.showBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.ACRECHARGEBOXSPSHOWVIEW, { aid: this.aid, code: this.code });
    };
    AcRechargeBoxSPView.prototype.refreshView = function () {
        for (var i = 0; i < this.boxInfoList.length; i++) {
            var baseBoxStr = "acrechargeboxspview_basebox";
            var BoxStr = "acrechargeboxspview_box";
            if (this.code == "8") {
                if (i == 0) {
                    BoxStr = BoxStr + "3_";
                }
                else if (i == 1 || i == 2) {
                    BoxStr = BoxStr + "2_";
                }
                else {
                    BoxStr = BoxStr + "1_";
                }
                baseBoxStr = BoxStr;
            }
            var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var boxInfo = this.boxInfoList[i];
            var boxCfg = cfg.getBoxData(boxInfo.needGem);
            var rechargeNum = vo.getBoxReChargeNum(boxInfo.needGem);
            var receiveNum = vo.getBoxReceiveNum(boxInfo.needGem);
            boxInfo.rechargeTF.textColor = TextFieldConst.COLOR_QUALITY_WHITE;
            if (Number(boxCfg.limit) <= receiveNum) {
                egret.Tween.removeTweens(boxInfo.lightBM);
                egret.Tween.removeTweens(boxInfo.boxBM);
                boxInfo.lightBM.setVisible(false);
                if (boxCfg.childList.length > 1) {
                    if (ResourceManager.hasRes(BoxStr + "3_" + this.code)) {
                        boxInfo.boxBM.setload(BoxStr + "3_" + this.code);
                    }
                    else {
                        boxInfo.boxBM.setload(BoxStr + "3_1");
                    }
                }
                else {
                    if (ResourceManager.hasRes(baseBoxStr + "3_" + this.code)) {
                        boxInfo.boxBM.setload(baseBoxStr + "3_" + this.code);
                    }
                    else {
                        boxInfo.boxBM.setload(baseBoxStr + "3_1");
                    }
                }
                boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxSPReceiveNum3");
            }
            else {
                if (rechargeNum > receiveNum) {
                    boxInfo.lightBM.setVisible(true);
                    if (boxCfg.childList.length > 1) {
                        if (ResourceManager.hasRes(BoxStr + "2_" + this.code)) {
                            boxInfo.boxBM.setload(BoxStr + "2_" + this.code);
                        }
                        else {
                            boxInfo.boxBM.setload(BoxStr + "2_1");
                        }
                    }
                    else {
                        if (ResourceManager.hasRes(baseBoxStr + "2_" + this.code)) {
                            boxInfo.boxBM.setload(baseBoxStr + "2_" + this.code);
                        }
                        else {
                            boxInfo.boxBM.setload(baseBoxStr + "2_1");
                        }
                    }
                    egret.Tween.get(boxInfo.lightBM, { loop: true }).to({ rotation: boxInfo.lightBM.rotation + 360 }, 10000);
                    egret.Tween.get(boxInfo.boxBM, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                    boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxSPReceiveNum2");
                    boxInfo.rechargeTF.textColor = TextFieldConst.COLOR_QUALITY_WHITE;
                }
                else {
                    egret.Tween.removeTweens(boxInfo.lightBM);
                    egret.Tween.removeTweens(boxInfo.boxBM);
                    boxInfo.lightBM.setVisible(false);
                    if (boxCfg.childList.length > 1) {
                        if (ResourceManager.hasRes(BoxStr + "1_" + this.code)) {
                            boxInfo.boxBM.setload(BoxStr + "1_" + this.code);
                        }
                        else {
                            boxInfo.boxBM.setload(BoxStr + "1_1");
                        }
                    }
                    else {
                        if (ResourceManager.hasRes(baseBoxStr + "1_" + this.code)) {
                            boxInfo.boxBM.setload(baseBoxStr + "1_" + this.code);
                        }
                        else {
                            boxInfo.boxBM.setload(baseBoxStr + "1_1");
                        }
                    }
                    boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxSPReceiveNum", [String(rechargeNum), String(boxCfg.limit)]);
                }
            }
            boxInfo.rechargeTF.anchorOffsetX = boxInfo.rechargeTF.width / 2;
        }
    };
    /**
     * 宝箱的点击事件
     */
    AcRechargeBoxSPView.prototype.boxClick = function (event, needGem) {
        var pos = 0;
        switch (needGem) {
            case "g1":
                pos = 1;
                break;
            case "g2":
                pos = 2;
                break;
            case "g3":
                pos = 3;
                break;
            case "g4":
                pos = 4;
                break;
            case "g5":
                pos = 5;
                break;
            case "g6":
                pos = 6;
                break;
        }
        if (pos > 0) {
            // NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:pos, kid:NetRequestConst.KID_RECHARGEBOXSPAC});
        }
        if (this.code == "7") {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var boxCfg = cfg.getBoxData(String(needGem));
            if (boxCfg.childList.length == 1) {
                //只有一个档位
                ViewController.getInstance().openView(ViewConst.POPUP.ACRECHARGEBOXSPPOPUPVIEW, { "aid": this.aid, "code": this.code, "boxId": needGem });
            }
            else {
                //多个档位
                ViewController.getInstance().openView(ViewConst.POPUP.ACRECHARGEBOXSPREWARDVIEW, { "aid": this.aid, "code": this.code, "boxId": needGem });
            }
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.ACRECHARGEBOXSPPOPUPVIEW, { "aid": this.aid, "code": this.code, "boxId": needGem });
        }
    };
    AcRechargeBoxSPView.prototype.getResourceList = function () {
        var resByCode = [];
        if (this.code == "1" || this.code == "3") {
            resByCode = [
                "acrechargeboxspview_yellowbg_1",
                "acrechargeboxspview_whitebg_1", "acrechargeboxspview_textbg_1", "acrechargeboxspview_flower_1"
            ];
        }
        else if (this.code == "2") {
            resByCode = [
                "acrechargeboxspview_yellowbg_1",
                "acrechargeboxspview_whitebg_1", "acrechargeboxspview_textbg_1", "acrechargeboxspview_flower_2"
            ];
        }
        else if (this.code == "6") {
            resByCode = [
                "acrechargeboxspview_yellowbg_1",
                "acrechargeboxspview_whitebg_1", "acrechargeboxspview_textbg_1", "acrechargeboxspview_flower_6",
                "acrechargeboxspview_flower_6",
                "acrechargeboxspview_title_bg6",
                "acrechargeboxspview_title_txt6",
            ];
        }
        else if (this.code == "7") {
            resByCode = [
                "acrechargeboxspview_yellowbg_1",
                "acrechargeboxspview_whitebg_1", "acrechargeboxspview_textbg_1", "acrechargeboxspview_flower_2",
                "acrechargeboxspview_title_bg7",
                "acrechargeboxspview_title_txt7",
                "acrechargeboxspview_bluebtn",
                "acrechargeboxspview_yellowbtn",
                "acrechargeboxspview_rewardtitle",
                "acrechargeboxspview_rewardbg0",
                "acrechargeboxspview_rewardbg1",
                "acrechargeboxspview_rewardbg2",
                "oneyear_flag"
            ];
        }
        else if (this.code == "8") {
            resByCode = [
                "acrechargeboxspview_yellowbg_1",
                "acrechargeboxspview_whitebg_8", "acrechargeboxspview_textbg_1", "acrechargeboxspview_flower_2",
                "acrechargeboxspview_title_bg8",
                "acrechargeboxspview_title_txt8",
                "acrechargeboxspview_bluebtn",
                "acrechargeboxspview_yellowbtn",
                "acrechargeboxspview_rewardtitle",
                "acrechargeboxspview_rewardbg0",
                "acrechargeboxspview_rewardbg1",
                "acrechargeboxspview_rewardbg2",
                "oneyear_flag",
                "acrechargeboxspbg_8",
                "acrechargeboxspview_dectext_8",
                "acrechargeboxspview_desk_1_8",
                "acrechargeboxspview_desk_2_8",
                "acrechargeboxspview_desk_3_8",
                "moonnight_showbtn-1",
                "moonnight_showbtntxt-1"
            ];
        }
        else {
            resByCode = [
                "acrechargeboxspview_yellowbg_1",
                "acrechargeboxspview_whitebg_1", "acrechargeboxspview_textbg_1", "acrechargeboxspview_flower_1"
            ];
        }
        return _super.prototype.getResourceList.call(this).concat(resByCode).concat([
            "tailor_get_light",
        ]);
    };
    AcRechargeBoxSPView.prototype.getTitleBgName = function () {
        // return this.code == "6" ? "acrechargeboxspview_title_bg6" : "commonview_db_04";
        if (ResourceManager.hasRes("acrechargeboxspview_title_bg" + this.code)) {
            return "acrechargeboxspview_title_bg" + this.code;
        }
        else {
            return "commonview_db_04";
        }
    };
    AcRechargeBoxSPView.prototype.getTitleStr = function () {
        return this.code == "6" || this.code == "7" || this.code == "8" ? "" : _super.prototype.getTitleStr.call(this);
    };
    AcRechargeBoxSPView.prototype.getBgName = function () {
        return this.code == "8" ? "acrechargeboxspbg_8" : _super.prototype.getTitleStr.call(this);
    };
    AcRechargeBoxSPView.prototype.getRuleInfo = function () {
        if (LanguageManager.checkHasKey("acRechargeBoxSPRule_" + this.code)) {
            return "acRechargeBoxSPRule_" + this.code;
        }
        else {
            return "acRechargeBoxSPRule_1";
        }
    };
    AcRechargeBoxSPView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD, this.refreshView, this);
        this._topbg = null;
        this.boxInfoList = null;
        _super.prototype.dispose.call(this);
    };
    return AcRechargeBoxSPView;
}(AcCommonView));
__reflect(AcRechargeBoxSPView.prototype, "AcRechargeBoxSPView");
