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
  * author ycg
  * date 2019/9/30
  * @class AcRechargeBoxSPView
  */
var AcRechargeBoxSPView = (function (_super) {
    __extends(AcRechargeBoxSPView, _super);
    function AcRechargeBoxSPView() {
        var _this = _super.call(this) || this;
        _this._topbg = null;
        _this.boxInfoList = null;
        _this._roleIcon = null;
        _this._isWife = true;
        _this._timeBg = null;
        _this._acTimeTf = null;
        return _this;
    }
    AcRechargeBoxSPView.prototype.initView = function () {
        var _this = this;
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
        this._topbg.width = 640;
        this._topbg.height = 220;
        this._topbg.x = GameConfig.stageWidth / 2 - this._topbg.width / 2;
        this._topbg.y = this.titleBg.y + this.titleBg.height - 7;
        this.addChildToContainer(this._topbg);
        var innerBg = null;
        if (ResourceManager.hasRes("acrechargeboxspview_border_" + this.getTypeCode())) {
            innerBg = BaseLoadBitmap.create("acrechargeboxspview_border_" + this.getTypeCode());
        }
        else {
            innerBg = BaseLoadBitmap.create("acrechargeboxspview_border_1");
        }
        var bottomBg = null;
        if (ResourceManager.hasRes("acrechargeboxspview_buttombg_" + this.getTypeCode())) {
            bottomBg = BaseLoadBitmap.create("acrechargeboxspview_buttombg_" + this.getTypeCode());
        }
        else {
            bottomBg = BaseLoadBitmap.create("acrechargeboxspview_buttombg_1");
        }
        bottomBg.width = 640;
        // bottomBg.height =  GameConfig.stageHeigth - this._topbg.height - 69 - 16 - 3;
        bottomBg.height = 832;
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = this._topbg.y + this._topbg.height + 3;
        innerBg.width = 618;
        if (this.getTypeCode() == "2") {
            innerBg.width = 620;
        }
        innerBg.height = 570;
        innerBg.x = bottomBg.x + bottomBg.width / 2 - innerBg.width / 2 - 2;
        innerBg.y = bottomBg.y + 20;
        this.addChildToContainer(bottomBg);
        this.addChildToContainer(innerBg);
        //衣装icon
        var showData = null;
        var roleIcon = null;
        if (this.getTypeCode() == "1") {
            showData = cfg.getShowWifeData();
            App.LogUtil.log("showdata: " + showData[0].idType + " 1:" + showData[1].idType + "  2:" + showData[2].idType);
            var wifeId = (showData[1].idType).split("_")[1];
            var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
            roleIcon = BaseLoadBitmap.create(wifeCfg.body);
            roleIcon.setScale(0.4);
            var roleRect = new egret.Rectangle(0, 0, 212 / roleIcon.scaleX, 220 / roleIcon.scaleY);
            roleIcon.mask = roleRect;
            // roleIcon.setPosition(this._topbg.x, this._topbg.y + this._topbg.height - roleIcon.height - 3);
            roleIcon.setPosition(this._topbg.x, this._topbg.y);
            this.addChildToContainer(roleIcon);
            this._roleIcon = roleIcon;
        }
        else if (this.getTypeCode() == "2") {
            // let servantSkin = vo.getShowSkinData();
            // let servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(servantSkin);
            // roleIcon = BaseLoadBitmap.create(servantSkinCfg.body);
            // roleIcon.visivle = false;
        }
        // roleIcon.setScale(0.4);
        // let roleRect = new egret.Rectangle(0, 0, 212/roleIcon.scaleX, 220/roleIcon.scaleY);
        // roleIcon.mask = roleRect;
        // // roleIcon.setPosition(this._topbg.x, this._topbg.y + this._topbg.height - roleIcon.height - 3);
        // roleIcon.setPosition(this._topbg.x, this._topbg.y);
        // this.addChildToContainer(roleIcon);
        // this._roleIcon = roleIcon;
        //衣装预览
        if (this.getTypeCode() == "1") {
            var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect.width = 208;
            skinTxtEffect.height = 154;
            skinTxtEffect.setPosition(10, 200);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            this.addChildToContainer(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            skinTxtEffect.touchEnabled = false;
            var skinTxtStr = "acwealthcarpview_servantskintxt";
            if (this.getTypeCode() == "1") {
                skinTxtStr = "acgiftreturnview_common_skintxt";
            }
            var skinTxt = BaseBitmap.create(skinTxtStr);
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
            this.addChildToContainer(skinTxt);
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            skinTxt.touchEnabled = false;
            var skinTxteffect = BaseBitmap.create(skinTxtStr);
            skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
            skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
            this.addChildToContainer(skinTxteffect);
            skinTxteffect.blendMode = egret.BlendMode.ADD;
            skinTxteffect.alpha = 0;
            egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            skinTxteffect.touchEnabled = false;
            //透明点击区域
            var touchPos = BaseBitmap.create("public_alphabg");
            touchPos.width = 180;
            touchPos.height = 176;
            touchPos.setPosition(this._topbg.x + 15, this._topbg.y + 55);
            this.addChildToContainer(touchPos);
            touchPos.addTouchTap(function () {
                if (_this.getTypeCode() == "1") {
                    var wifeRechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(showData[1].needGem);
                    var servantRechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(showData[0].needGem);
                    var wifeTopMsg = LanguageManager.getlocal("acRechargeBoxSpWifeTopMsg-" + _this.code, ["" + wifeRechargeCfg.gemCost]);
                    var servantTopMsg = LanguageManager.getlocal("acRechargeBoxSpWifeSkinTopMsg-" + _this.code, ["" + servantRechargeCfg.gemCost]);
                    var wifeOtherTip = LanguageManager.getlocal("acRechargeBoxSpPreviewWifeTip-" + _this.code);
                    var wifId = Config.WifeCfg.formatRewardItemVoStr(showData[1].idType);
                    var servantId = Config.ServantCfg.formatRewardItemVoStr(showData[0].idType);
                    var titleId = Config.TitleCfg.formatRewardItemVoStr(showData[2].idType);
                    // let titleId = Config.TitleCfg.formatRewardItemVoStr("4029");
                    var showType = showData[1].idType;
                    if (!_this._isWife) {
                        showType = showData[0].idType;
                    }
                    var data = { data: [
                            { idType: servantId, topMsg: servantTopMsg, bgName: "", scale: 0.73, offY: -3 },
                            { idType: wifId, topMsg: wifeTopMsg, bgName: "", scale: 0.62, otherTip: wifeOtherTip },
                            { idType: titleId }
                        ], showType: showType };
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
                    egret.setTimeout(function () {
                        _this.changeRoleIcon();
                    }, _this, 200);
                }
                else if (_this.getTypeCode() == "2") {
                    // let skinid = vo.getShowSkinData();
                    // let topMsg = LanguageManager.getlocal("acRechargeBoxSpServantSkinTopMsg-"+this.getTypeCode(), [""+vo.getShowSkinNeedRecharge()]);
                    // let serSkinId = Config.ServantskinCfg.formatRewardItemVoStr(skinid);
                    // let servantBg = "acnationalday_servant_bg-1";
                    // let data = {data:[
                    // 	{idType: serSkinId, topMsg:topMsg, bgName:servantBg},
                    // ], showType:null};
                    // ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
                }
            }, this);
        }
        //活动时间
        var actimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        actimeTF.width = 400; //580
        actimeTF.lineSpacing = 5;
        // actimeTF.setPosition(this._topbg.x + 30,this._topbg.y + 210);
        actimeTF.setPosition(this._topbg.x + 225, this._topbg.y + 100);
        this.addChildToContainer(actimeTF);
        var acDesc = null;
        if (LanguageManager.checkHasKey("acRechargeBoxSPDesc" + "_" + this.code)) {
            acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPDesc" + "_" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        }
        else {
            acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPDesc_1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        }
        acDesc.setPosition(actimeTF.x, actimeTF.y + actimeTF.height + 5);
        acDesc.width = 400; //580
        acDesc.lineSpacing = 5;
        this.addChildToContainer(acDesc);
        var boxList = cfg.getBoxListData();
        this.boxInfoList = [];
        for (var i = 0; i < boxList.length; i++) {
            var boxCfg = boxList[i];
            var rechargecfg = Config.RechargeCfg.getRechargeItemCfgByKey(boxCfg.needGem);
            if (i % 3 == 0) {
                var bg1 = null;
                if (ResourceManager.hasRes("acrechargeboxspview_firstbg_" + this.getTypeCode())) {
                    bg1 = BaseLoadBitmap.create("acrechargeboxspview_firstbg_" + this.getTypeCode());
                }
                else {
                    bg1 = BaseLoadBitmap.create("acrechargeboxspview_firstbg_1");
                }
                if (this.getTypeCode() == "1") {
                    bg1.width = 605;
                    bg1.height = 243;
                }
                else if (this.getTypeCode() == "2") {
                    bg1.width = 584;
                    bg1.height = 244;
                }
                bg1.setPosition(innerBg.x + innerBg.width / 2 - bg1.width / 2, innerBg.y + 25 + Math.floor(i / 3) * 258);
                this.addChildToContainer(bg1);
            }
            var boxBgStr = null;
            if (boxCfg.childList.length > 1) {
                if (ResourceManager.hasRes("acrechargeboxspview_yellowbg_" + this.getTypeCode())) {
                    boxBgStr = "acrechargeboxspview_yellowbg_" + this.getTypeCode();
                }
                else {
                    boxBgStr = "acrechargeboxspview_yellowbg_1";
                }
            }
            else {
                if (ResourceManager.hasRes("acrechargeboxspview_whitebg_" + this.getTypeCode())) {
                    boxBgStr = "acrechargeboxspview_whitebg_" + this.getTypeCode();
                }
                else {
                    boxBgStr = "acrechargeboxspview_whitebg_1";
                }
            }
            var boxBg = BaseBitmap.create(boxBgStr);
            boxBg.x = bottomBg.x + 40 + (605 - boxBg.width * 3) / 4 + ((boxBg.width) * (i % 3));
            boxBg.y = innerBg.y + 37 + Math.floor(i / 3) * 253;
            if (this.getTypeCode() == "2") {
                boxBg.x = bottomBg.x + 47 + (605 - boxBg.width * 3) / 4 + ((boxBg.width) * (i % 3));
                boxBg.y = innerBg.y + 45 + Math.floor(i / 3) * 258;
            }
            this.addChildToContainer(boxBg);
            var box = null;
            var boxCanGetEffect = null;
            if (boxCfg.childList.length > 1) {
                if (ResourceManager.hasRes("acrechargeboxspview_box1_" + this.getTypeCode())) {
                    box = BaseLoadBitmap.create("acrechargeboxspview_box1_" + this.getTypeCode());
                }
                else {
                    box = BaseLoadBitmap.create("acrechargeboxspview_box1_1");
                }
                box.width = 186;
                box.height = 186;
                if (this.getTypeCode() == "2") {
                    box.width = 210;
                    box.height = 118;
                }
                box.anchorOffsetX = box.width / 2;
                box.anchorOffsetY = box.height / 2;
                box.setPosition(boxBg.x + boxBg.width / 2, boxBg.y + boxBg.height / 2 - 25);
                if (this.getTypeCode() == "2") {
                    box.setPosition(boxBg.x + boxBg.width / 2 - 10, boxBg.y + boxBg.height / 2 - 20);
                    // boxCanGetEffect = ComponentManager.getCustomMovieClip("acrechargeboxsp_cangeteff", 10, 70);
                    // boxCanGetEffect.setPosition(box.x - 110, box.y -160);
                }
            }
            else {
                if (ResourceManager.hasRes("acrechargeboxspview_basebox1_" + this.getTypeCode())) {
                    box = BaseLoadBitmap.create("acrechargeboxspview_basebox1_" + this.getTypeCode());
                }
                else {
                    box = BaseLoadBitmap.create("acrechargeboxspview_basebox1_1");
                }
                box.width = 122;
                box.height = 124;
                if (this.getTypeCode() == "2") {
                    box.width = 116;
                    box.height = 90;
                }
                box.anchorOffsetX = box.width / 2;
                box.anchorOffsetY = box.height / 2;
                box.setPosition(boxBg.x + boxBg.width / 2, boxBg.y + box.height / 2 + 17);
                if (this.getTypeCode() == "2") {
                    box.setPosition(boxBg.x + boxBg.width / 2 - 10, boxBg.y + boxBg.height / 2 + 0);
                    // boxCanGetEffect = ComponentManager.getCustomMovieClip("acrechargeboxsp_cangeteff", 10, 70);
                    // boxCanGetEffect.setPosition(box.x - 110, box.y - 160);
                }
            }
            if (this.getTypeCode() == "2") {
                boxCanGetEffect = ComponentManager.getCustomMovieClip("acrechargeboxsp_cangeteff", 10, 70);
                boxCanGetEffect.setPosition(box.x - 110, box.y - 160);
            }
            //tailor_get_light
            var light = BaseBitmap.create("tailor_get_light");
            light.anchorOffsetX = light.width / 2;
            light.anchorOffsetY = light.height / 2;
            light.setPosition(box.x, box.y);
            light.setScale(0.75);
            this.addChildToContainer(light);
            light.setVisible(false);
            this.addChildToContainer(box);
            box.addTouchTap(this.boxClick, this, [boxCfg.needGem]);
            if (boxCanGetEffect) {
                this.addChildToContainer(boxCanGetEffect);
                boxCanGetEffect.playWithTime(0);
                boxCanGetEffect.visible = false;
            }
            var gemBM = BaseLoadBitmap.create("itemicon1");
            gemBM.width = 40;
            gemBM.height = 40;
            gemBM.setPosition(boxBg.x + 20, boxBg.y + boxBg.height - gemBM.height - 5);
            this.addChildToContainer(gemBM);
            var gemNum = ComponentManager.getTextField(rechargecfg ? "" + rechargecfg.gemCost : "" + boxCfg.thirdPayGem, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
            gemNum.setColor(TextFieldConst.COLOR_QUALITY_WHITE);
            gemNum.setPosition(gemBM.x + gemBM.width + 5, gemBM.y + gemBM.height / 2 - gemNum.height / 2);
            this.addChildToContainer(gemNum);
            var rechargeNum = vo.getBoxReChargeNum(boxCfg.needGem);
            var receiveNum = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPReceiveNum", [String(rechargeNum), String(boxCfg.limit)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_WHITE);
            if (this.getTypeCode() == "2") {
                receiveNum.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
            }
            var rechargebgStr = "acrechargeboxspview_textbg_1";
            if (ResourceManager.hasRes("acrechargeboxspview_textbg_" + this.code)) {
                rechargebgStr = "acrechargeboxspview_textbg_" + this.code;
            }
            else {
                if (this.getTypeCode() == "2") {
                    rechargebgStr = "acrechargetimebg";
                }
            }
            var rechargebg = BaseBitmap.create(rechargebgStr);
            rechargebg.setPosition(boxBg.x + boxBg.width / 2 - rechargebg.width / 2 - 10, boxBg.y + boxBg.height - rechargebg.height / 2 + 20);
            receiveNum.setPosition(rechargebg.x + rechargebg.width / 2, rechargebg.y + rechargebg.height / 2 - receiveNum.height / 2);
            receiveNum.anchorOffsetX = receiveNum.width / 2;
            var rechargeLine = BaseBitmap.create("shopview_line");
            rechargeLine.width = 15;
            rechargeLine.setPosition(receiveNum.x + receiveNum.width / 2 - rechargeLine.width, receiveNum.y + receiveNum.height / 2 - rechargeLine.height / 2);
            rechargeLine.visible = false;
            var rechargeDiscount = ComponentManager.getTextField(String(boxCfg.limit), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN3);
            rechargeDiscount.setPosition(receiveNum.x + receiveNum.width / 2, receiveNum.y);
            rechargeDiscount.visible = false;
            if (boxCfg.childList.length > 1) {
                if (this.getTypeCode() == "1") {
                    rechargeLine.visible = true;
                    rechargeDiscount.visible = true;
                    var tNum = 3;
                    if (this.getTypeCode() == "1") {
                        tNum = 5;
                    }
                    receiveNum.text = LanguageManager.getlocal("acRechargeBoxSPReceiveNum", [String(rechargeNum), String(tNum)]);
                }
                else {
                    receiveNum.text = LanguageManager.getlocal("acRechargeBoxSPReceiveNum", [String(rechargeNum), String(boxCfg.limit)]);
                }
            }
            this.addChildToContainer(rechargebg);
            this.addChildToContainer(receiveNum);
            this.addChildToContainer(rechargeLine);
            this.addChildToContainer(rechargeDiscount);
            var boxInfo = { "boxBg": boxBg, "needGem": boxCfg.needGem, "lightBM": light, "boxBM": box, "rechargeTF": receiveNum, "rechargebg": rechargebg, "rechargeLine": rechargeLine, "rechargeDiscount": rechargeDiscount, "boxCanGetEffect": boxCanGetEffect };
            this.boxInfoList.push(boxInfo);
        }
        this.refreshView();
        var flowerBM = null;
        if (ResourceManager.hasRes("acrechargeboxspview_flower_" + this.getTypeCode())) {
            flowerBM = BaseBitmap.create("acrechargeboxspview_flower_" + this.getTypeCode());
        }
        else {
            flowerBM = BaseBitmap.create("acrechargeboxspview_flower_1");
        }
        flowerBM.setPosition(this._topbg.x, this._topbg.y + this._topbg.height);
        if (this.getTypeCode() == "2") {
            flowerBM.setPosition(0, innerBg.y + innerBg.height);
        }
        this.addChildToContainer(flowerBM);
        var buttomBg3 = null;
        if (ResourceManager.hasRes("acrechargeboxspview_bg3_" + this.getTypeCode())) {
            buttomBg3 = BaseLoadBitmap.create("acrechargeboxspview_bg3_" + this.getTypeCode());
        }
        else {
            buttomBg3 = BaseLoadBitmap.create("acrechargeboxspview_bg3_1");
        }
        buttomBg3.width = 640;
        buttomBg3.height = 99;
        buttomBg3.setPosition(bottomBg.x + bottomBg.width / 2 - buttomBg3.width / 2, GameConfig.stageHeigth - buttomBg3.height);
        this.addChildToContainer(buttomBg3);
        if (this.getTypeCode() == "2") {
            buttomBg3.visible = false;
        }
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = innerBg.y + innerBg.height - this._timeBg.height - 10;
        this.addChildToContainer(this._timeBg);
        this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSpTimeCountDown", [vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 60 + this._acTimeTf.width;
        this._timeBg.x = GameConfig.stageWidth / 2 - this._timeBg.width / 2;
        this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        this.addChildToContainer(this._acTimeTf);
    };
    AcRechargeBoxSPView.prototype.tick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this._acTimeTf.text = LanguageManager.getlocal("acRechargeBoxSpTimeCountDown", [vo.getCountDown()]);
        this._timeBg.width = 60 + this._acTimeTf.width;
        this._timeBg.x = GameConfig.stageWidth / 2 - this._timeBg.width / 2;
        this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
    };
    AcRechargeBoxSPView.prototype.changeRoleIcon = function () {
        this._isWife = !this._isWife;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var showData = null;
        if (this.getTypeCode() == "1") {
            showData = cfg.getShowWifeData();
            var iconStr = "";
            if (this._isWife) {
                var wifeId = (showData[1].idType).split("_")[1];
                var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
                iconStr = wifeCfg.body;
                this._roleIcon.setload(iconStr);
                this._roleIcon.setScale(0.4);
                var roleRect = new egret.Rectangle(0, 0, 212 / this._roleIcon.scaleX, 220 / this._roleIcon.scaleY);
                this._roleIcon.mask = roleRect;
            }
            else {
                var servantId = (showData[0].idType).split("_")[1];
                // let wifeCfg = Config.WifeskinCfg.getWifeCfgById(wifeId);
                var servantCfg = Config.ServantCfg.getServantItemById(servantId);
                iconStr = servantCfg.fullIcon;
                this._roleIcon.setload(iconStr);
                this._roleIcon.setScale(0.55);
                var roleRect = new egret.Rectangle(0, 0, 212 / this._roleIcon.scaleX, 220 / this._roleIcon.scaleY);
                this._roleIcon.mask = roleRect;
            }
            App.LogUtil.log("iconstr:  " + iconStr);
        }
    };
    AcRechargeBoxSPView.prototype.refreshView = function () {
        for (var i = 0; i < this.boxInfoList.length; i++) {
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
                boxInfo.boxBM.rotation = 0;
                if (boxInfo.boxCanGetEffect) {
                    boxInfo.boxCanGetEffect.visible = false;
                }
                if (boxCfg.childList.length > 1) {
                    if (ResourceManager.hasRes("acrechargeboxspview_box3_" + this.code)) {
                        boxInfo.boxBM.setload("acrechargeboxspview_box3_" + this.code);
                    }
                    else {
                        boxInfo.boxBM.setload("acrechargeboxspview_box3_1");
                    }
                }
                else {
                    if (ResourceManager.hasRes("acrechargeboxspview_basebox3_" + this.code)) {
                        boxInfo.boxBM.setload("acrechargeboxspview_basebox3_" + this.code);
                    }
                    else {
                        boxInfo.boxBM.setload("acrechargeboxspview_basebox3_1");
                    }
                }
                boxInfo.rechargeLine.visible = false;
                boxInfo.rechargeDiscount.visible = false;
                boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxSPReceiveNum3");
                boxInfo.rechargeTF.x = boxInfo.rechargebg.x + boxInfo.rechargebg.width / 2;
                if (this.getTypeCode() == "2") {
                    boxInfo.rechargebg.setRes("acrechargetimebg");
                }
            }
            else {
                if (rechargeNum > receiveNum) {
                    if (boxCfg.childList.length > 1) {
                        if (this.getTypeCode() == "1") {
                            if (ResourceManager.hasRes("acrechargeboxspview_box2_" + this.code)) {
                                boxInfo.boxBM.setload("acrechargeboxspview_box2_" + this.code);
                            }
                            else {
                                boxInfo.boxBM.setload("acrechargeboxspview_box2_1");
                            }
                        }
                        else if (this.getTypeCode() == "2") {
                            if (ResourceManager.hasRes("acrechargeboxspview_box1_" + this.code)) {
                                boxInfo.boxBM.setload("acrechargeboxspview_box1_" + this.code);
                            }
                            else {
                                boxInfo.boxBM.setload("acrechargeboxspview_box1_1");
                            }
                            //加特效
                        }
                    }
                    else {
                        if (this.getTypeCode() == "1") {
                            if (ResourceManager.hasRes("acrechargeboxspview_basebox2_" + this.code)) {
                                boxInfo.boxBM.setload("acrechargeboxspview_basebox2_" + this.code);
                            }
                            else {
                                boxInfo.boxBM.setload("acrechargeboxspview_basebox2_1");
                            }
                        }
                        else if (this.getTypeCode() == "2") {
                            if (ResourceManager.hasRes("acrechargeboxspview_basebox1_" + this.code)) {
                                boxInfo.boxBM.setload("acrechargeboxspview_basebox1_" + this.code);
                            }
                            else {
                                boxInfo.boxBM.setload("acrechargeboxspview_basebox1_1");
                            }
                            //加特效
                        }
                    }
                    if (boxInfo.boxCanGetEffect) {
                        boxInfo.boxCanGetEffect.visible = true;
                    }
                    if (this.getTypeCode() == "2") {
                        boxInfo.rechargebg.setRes("public_9_bg88");
                    }
                    if (this.getTypeCode() == "2") {
                        boxInfo.lightBM.setVisible(false);
                    }
                    else {
                        boxInfo.lightBM.setVisible(true);
                        egret.Tween.get(boxInfo.lightBM, { loop: true }).to({ rotation: boxInfo.lightBM.rotation + 360 }, 10000);
                        egret.Tween.get(boxInfo.boxBM, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                    }
                    boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxSPReceiveNum2");
                    boxInfo.rechargeTF.textColor = TextFieldConst.COLOR_QUALITY_WHITE;
                    boxInfo.rechargeLine.visible = false;
                    boxInfo.rechargeDiscount.visible = false;
                    boxInfo.rechargeTF.x = boxInfo.rechargebg.x + boxInfo.rechargebg.width / 2;
                }
                else {
                    egret.Tween.removeTweens(boxInfo.lightBM);
                    egret.Tween.removeTweens(boxInfo.boxBM);
                    boxInfo.lightBM.setVisible(false);
                    boxInfo.boxBM.rotation = 0;
                    if (boxInfo.boxCanGetEffect) {
                        boxInfo.boxCanGetEffect.visible = false;
                    }
                    if (boxCfg.childList.length > 1) {
                        if (ResourceManager.hasRes("acrechargeboxspview_box1_" + this.code)) {
                            boxInfo.boxBM.setload("acrechargeboxspview_box1_" + this.code);
                        }
                        else {
                            boxInfo.boxBM.setload("acrechargeboxspview_box1_1");
                        }
                        var tNum = 3;
                        if (this.getTypeCode() == "1") {
                            tNum = 5;
                            boxInfo.rechargeLine.visible = true;
                            boxInfo.rechargeDiscount.visible = true;
                            boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxSPReceiveNum", [String(rechargeNum), String(tNum)]);
                        }
                        else {
                            boxInfo.rechargeLine.visible = false;
                            boxInfo.rechargeDiscount.visible = false;
                            boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxSPReceiveNum", [String(rechargeNum), String(boxCfg.limit)]);
                        }
                        boxInfo.rechargeTF.x = boxInfo.rechargebg.x + boxInfo.rechargebg.width / 2 - boxInfo.rechargeDiscount.width / 2;
                        boxInfo.rechargeLine.x = boxInfo.rechargeTF.x + boxInfo.rechargeTF.width / 2 - boxInfo.rechargeLine.width + 3;
                        boxInfo.rechargeDiscount.x = boxInfo.rechargeTF.x + boxInfo.rechargeTF.width / 2;
                    }
                    else {
                        if (ResourceManager.hasRes("acrechargeboxspview_basebox1_" + this.code)) {
                            boxInfo.boxBM.setload("acrechargeboxspview_basebox1_" + this.code);
                        }
                        else {
                            boxInfo.boxBM.setload("acrechargeboxspview_basebox1_1");
                        }
                        boxInfo.rechargeLine.visible = false;
                        boxInfo.rechargeDiscount.visible = false;
                        boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxSPReceiveNum", [String(rechargeNum), String(boxCfg.limit)]);
                        boxInfo.rechargeTF.x = boxInfo.rechargebg.x + boxInfo.rechargebg.width / 2;
                    }
                    if (this.getTypeCode() == "2") {
                        boxInfo.rechargebg.setRes("acrechargetimebg");
                    }
                }
            }
            boxInfo.rechargeTF.anchorOffsetX = boxInfo.rechargeTF.width / 2;
            if (this.getTypeCode() == "2") {
                boxInfo.rechargeTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            }
        }
    };
    /**
     * 宝箱的点击事件
     */
    AcRechargeBoxSPView.prototype.boxClick = function (event, needGem) {
        var _this = this;
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
        if (this.getTypeCode() == "1" || this.getTypeCode() == "2") {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var boxCfg = cfg.getBoxData(String(needGem));
            if (boxCfg.childList.length == 1) {
                //只有一个档位
                ViewController.getInstance().openView(ViewConst.POPUP.ACRECHARGEBOXSPPOPUPVIEW, { "aid": this.aid, "code": this.code, "boxId": needGem });
            }
            else {
                //多个档位
                ViewController.getInstance().openView(ViewConst.POPUP.ACRECHARGEBOXSPREWARDVIEW, { "aid": this.aid, "code": this.code, "boxId": needGem });
                egret.setTimeout(function () {
                    _this.changeRoleIcon();
                }, this, 200);
            }
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.ACRECHARGEBOXSPPOPUPVIEW, { "aid": this.aid, "code": this.code, "boxId": needGem });
        }
    };
    AcRechargeBoxSPView.prototype.getTypeCode = function () {
        return this.code;
    };
    AcRechargeBoxSPView.prototype.getResourceList = function () {
        var resByCode = [];
        if (this.getTypeCode() == "1") {
            resByCode = [
                "acrechargeboxspview_yellowbg_1",
                "acrechargeboxspview_whitebg_1", "acrechargeboxspview_textbg_1", "acrechargeboxspview_flower_1", "acrechargeboxspview_title_bg1"
            ];
        }
        else if (this.getTypeCode() == "2") {
            resByCode = [
                "acrechargeboxspview_flower_2", "acrechargeboxspview_title_bg2"
            ];
        }
        return _super.prototype.getResourceList.call(this).concat(resByCode).concat([
            "tailor_get_light", "acwealthcarpview_servantskintxt", "shopview_line", "acgiftreturnview_common_skintxt", "acrechargeboxspview_yellowbg_1",
            "acrechargeboxspview_whitebg_1", "acrechargeboxspview_textbg_1", "acrechargeboxspview_flower_1", "acrechargetimebg", "acnationalday_servant_bg-1"
        ]);
    };
    AcRechargeBoxSPView.prototype.getTitleBgName = function () {
        if (ResourceManager.hasRes("acrechargeboxspview_title_bg" + this.getTypeCode())) {
            return "acrechargeboxspview_title_bg" + this.getTypeCode();
        }
        return "commonview_titlebg";
    };
    AcRechargeBoxSPView.prototype.getTitleStr = function () {
        return null;
    };
    AcRechargeBoxSPView.prototype.getRuleInfo = function () {
        if (LanguageManager.checkHasKey("acRechargeBoxSPRule_" + this.getTypeCode())) {
            return "acRechargeBoxSPRule_" + this.getTypeCode();
        }
        else {
            return "acRechargeBoxSPRule_1";
        }
    };
    AcRechargeBoxSPView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcRechargeBoxSPView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD, this.refreshView, this);
        this._topbg = null;
        this.boxInfoList = [];
        _super.prototype.dispose.call(this);
    };
    return AcRechargeBoxSPView;
}(AcCommonView));
__reflect(AcRechargeBoxSPView.prototype, "AcRechargeBoxSPView");
//# sourceMappingURL=AcRechargeBoxSPView.js.map