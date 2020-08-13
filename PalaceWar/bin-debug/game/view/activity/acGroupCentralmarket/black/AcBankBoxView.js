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
  * 港台活动-钱庄
  * @class AcRechargeBoxView
  */
var AcBankBoxView = (function (_super) {
    __extends(AcBankBoxView, _super);
    function AcBankBoxView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._topbg = null;
        _this._code = "2";
        _this.boxInfoList = null;
        _this._currAid = null;
        _this._currCode = null;
        _this._acCDTxt = null;
        return _this;
    }
    AcBankBoxView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWBANKBOXREWARD, this.refreshView, this);
        this._currAid = this.aid; //this.param.data.aid;
        this._currCode = this.code; //this.param.data.code;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._currAid, this._currCode);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._currAid, this._currCode);
        var bottomBg = BaseLoadBitmap.create("acrechargeboxview_buttombg");
        bottomBg.width = 640;
        bottomBg.height = 832;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 105;
        this.addChildToContainer(bottomBg);
        this._topbg = BaseLoadBitmap.create("acrechargeboxview_bg");
        this._topbg.width = 640;
        this._topbg.height = 221;
        this._topbg.setPosition(0, -15);
        this.addChildToContainer(this._topbg);
        var actimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        actimeTF.width = 365;
        actimeTF.setPosition(this._topbg.x + 240, this._topbg.y + 110);
        this.addChildToContainer(actimeTF);
        var acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acBankBoxDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.setPosition(actimeTF.x, actimeTF.y + actimeTF.height);
        acDesc.width = 365;
        this.addChildToContainer(acDesc);
        var acCDTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        acCDTxt.x = acDesc.x;
        acCDTxt.y = acDesc.y + acDesc.height + 5;
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        this.tick();
        if (this._code != "1") {
            var bottomBg2 = BaseBitmap.create("public_9_bg56");
            bottomBg2.width = 630;
            bottomBg2.height = bottomBg.y + bottomBg.height - this._topbg.y - this._topbg.height - 55;
            bottomBg2.setPosition(bottomBg.x + bottomBg.width / 2 - bottomBg2.width / 2, this._topbg.y + this._topbg.height + 5);
            this.addChildToContainer(bottomBg2);
        }
        var boxList = cfg.getBoxListData();
        this.boxInfoList = [];
        for (var i = 0; i < boxList.length; i++) {
            var boxCfg = boxList[i];
            var rechargecfg = Config.RechargeCfg.getRechargeItemCfgByKey(boxCfg.needGem);
            if (i % 3 == 0) {
                var line1 = BaseBitmap.create("acrechargeboxview_line");
                line1.width = 604;
                line1.setPosition(bottomBg.x + bottomBg.width / 2 - line1.width / 2, this._topbg.y + this._topbg.height + 25 + (Math.floor(i / 3) * 260));
                var bgStr = "bankfirstbg"; //+this.code;
                if (this._code == "1") {
                    bgStr = "bankfirstbg";
                    if (Math.floor(i / 3) > 0) {
                        bgStr = "secondbg";
                    }
                    line1.y = this._topbg.y + this._topbg.height + 25 + (Math.floor(i / 3) * 290);
                }
                var bg1 = BaseLoadBitmap.create(bgStr);
                bg1.width = 605;
                bg1.height = 243;
                bg1.setPosition(line1.x + line1.width / 2 - bg1.width / 2, line1.y + line1.height / 2);
                this.addChildToContainer(bg1);
                this.addChildToContainer(line1);
                if (this._code != "1") {
                    bg1.y += 20;
                }
            }
            var boxBgStr = "acrechargeboxview_whitebg";
            if (boxCfg.needGem == "g6" && this._code == "1") {
                boxBgStr = "acrechargeboxview_redbg";
            }
            var boxBg = BaseLoadBitmap.create(boxBgStr);
            boxBg.width = 151;
            boxBg.height = 190;
            var PosX = bottomBg.x + 18 + (605 - 172 * 3) / 4 + ((172) * (i % 3));
            boxBg.setPosition(PosX, this._topbg.y + this._topbg.height + 27 + (Math.floor(i / 3) * 290));
            if (this._code != "1") {
                boxBg.x += 35;
                boxBg.y = this._topbg.y + this._topbg.height + 48 + (Math.floor(i / 3) * 260);
            }
            this.addChildToContainer(boxBg);
            var box = BaseBitmap.create("acrechargeboxview_box1_" + this._code);
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            if (this._code == "1") {
                box.setPosition(boxBg.x + boxBg.width / 2, boxBg.y + 80 + box.height / 2);
            }
            else {
                box.setPosition(boxBg.x + boxBg.width / 2, boxBg.y + box.height / 2 + 17);
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
            var gemBM = BaseLoadBitmap.create("itemicon1");
            gemBM.width = 40;
            gemBM.height = 40;
            if (this._code == "1") {
                gemBM.setPosition(boxBg.x + 50, boxBg.y + 30);
            }
            else {
                gemBM.setPosition(boxBg.x + 20, boxBg.y + boxBg.height - gemBM.height - 5);
            }
            this.addChildToContainer(gemBM);
            if (boxCfg.needGem == "g6" && this._code == "1") {
                gemBM.x = boxBg.x + 30;
                if (PlatformManager.checkIsThSp()) {
                    var gemNum = ComponentManager.getTextField(String(rechargecfg.gemCost), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
                    gemNum.setPosition(gemBM.x + gemBM.width + 5, gemBM.y + gemBM.height / 2 - gemNum.height / 2);
                    this.addChildToContainer(gemNum);
                }
                else {
                    var gemNumBitMap = ComponentManager.getBitmapText(String(rechargecfg.gemCost), "socre_fnt");
                    gemNumBitMap.setScale(0.7);
                    gemNumBitMap.setPosition(gemBM.x + gemBM.width, gemBM.y + gemBM.height / 2 - gemNumBitMap.height / 2 + 3);
                    this.addChildToContainer(gemNumBitMap);
                }
                var giveBM = BaseBitmap.create("acrechargeboxview_give");
                giveBM.setPosition(box.x + 22, box.y);
                this.addChildToContainer(giveBM);
                var decorateBM = BaseBitmap.create("acrechargeboxview_decorate");
                decorateBM.setPosition(box.x - decorateBM.width + 27, box.y + 5);
                this.addChildToContainer(decorateBM);
                box.y -= 8;
            }
            else {
                var gemNum = ComponentManager.getTextField(String(rechargecfg.gemCost), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
                if (this._code != "1") {
                    gemNum.setColor(TextFieldConst.COLOR_QUALITY_WHITE);
                }
                gemNum.setPosition(gemBM.x + gemBM.width + 5, gemBM.y + gemBM.height / 2 - gemNum.height / 2);
                this.addChildToContainer(gemNum);
            }
            var rechargeNum = vo.getBoxReChargeNum(boxCfg.needGem);
            var receiveNum = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxReceiveNum-1", [String(rechargeNum), String(boxCfg.limit)]), 18, TextFieldConst.COLOR_QUALITY_WHITE);
            // if(this.code == "1")
            // {
            // 	receiveNum.setPosition(boxBg.x + 172 / 2 - receiveNum.width / 2,boxBg.y + 176 - receiveNum.height - 30);
            // }
            // else
            // {
            receiveNum.setPosition(boxBg.x + 172 / 2 - receiveNum.width / 2, boxBg.y + 176 + 100);
            var rechargebgStr = "public_9_bg48";
            if (this._code != "1") {
                rechargebgStr = "public_9_bg50";
            }
            var rechargebg = BaseBitmap.create(rechargebgStr);
            rechargebg.width = receiveNum.width;
            rechargebg.setPosition(receiveNum.x + receiveNum.width / 2 - rechargebg.width / 2, receiveNum.y + receiveNum.height / 2 - rechargebg.height / 2);
            this.addChildToContainer(rechargebg);
            this.addChildToContainer(receiveNum);
            var boxInfo = { "boxBg": boxBg, "needGem": boxCfg.needGem, "lightBM": light, "boxBM": box, "rechargeTF": receiveNum, "rechargebg": rechargebg };
            this.boxInfoList.push(boxInfo);
        }
        this.refreshView();
        if (this._code != "1") {
            var flowerBM = BaseBitmap.create("acrechargeboxview_flower");
            flowerBM.setPosition(this._topbg.x, this._topbg.y + this._topbg.height);
            this.addChildToContainer(flowerBM);
            var buttomBg3 = BaseLoadBitmap.create("acrechargeboxview_bg3_" + this._code);
            buttomBg3.width = 640;
            buttomBg3.height = 99;
            buttomBg3.setPosition(bottomBg.x + bottomBg.width / 2 - buttomBg3.width / 2, bottomBg.y + bottomBg.height - buttomBg3.height);
            this.addChildToContainer(buttomBg3);
        }
    };
    AcBankBoxView.prototype.refreshView = function () {
        for (var i = 0; i < this.boxInfoList.length; i++) {
            var vo = Api.acVoApi.getActivityVoByAidAndCode(this._currAid, this._currCode);
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._currAid, this._currCode);
            var boxInfo = this.boxInfoList[i];
            var boxCfg = cfg.getBoxData(boxInfo.needGem);
            var rechargeNum = vo.getBoxReChargeNum(boxInfo.needGem);
            var receiveNum = vo.getBoxReceiveNum(boxInfo.needGem);
            if (Number(boxCfg.limit) <= receiveNum) {
                egret.Tween.removeTweens(boxInfo.lightBM);
                egret.Tween.removeTweens(boxInfo.boxBM);
                boxInfo.lightBM.setVisible(false);
                boxInfo.boxBM.setRes("acrechargeboxview_box3_" + this._code);
                boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxReceiveNum3");
            }
            else {
                if (rechargeNum > receiveNum) {
                    boxInfo.lightBM.setVisible(true);
                    boxInfo.boxBM.setRes("acrechargeboxview_box2_" + this._code);
                    egret.Tween.get(boxInfo.lightBM, { loop: true }).to({ rotation: boxInfo.lightBM.rotation + 360 }, 10000);
                    egret.Tween.get(boxInfo.boxBM, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                    boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxReceiveNum2");
                }
                else {
                    egret.Tween.removeTweens(boxInfo.lightBM);
                    egret.Tween.removeTweens(boxInfo.boxBM);
                    boxInfo.lightBM.setVisible(false);
                    boxInfo.boxBM.setRes("acrechargeboxview_box1_" + this._code);
                    boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxReceiveNum-1", [String(rechargeNum), String(boxCfg.limit)]);
                }
            }
            boxInfo.rechargebg.width = boxInfo.rechargeTF.width + 20;
            // if(this.code == "1")
            // {
            // 	boxInfo.rechargeTF.setPosition(boxInfo.boxBg.x + boxInfo.boxBg.width / 2 - boxInfo.rechargeTF.width / 2,boxInfo.boxBg.y + boxInfo.boxBg.height - boxInfo.rechargeTF.height - 30);
            // }
            // else
            // {
            boxInfo.rechargeTF.setPosition(boxInfo.boxBg.x + 172 / 2 - boxInfo.rechargeTF.width / 2 - 10, boxInfo.boxBg.y + 176 + 10);
            // }
            // boxInfo.rechargeTF.setPosition(boxInfo.boxBg.x + boxInfo.boxBg.width / 2 - boxInfo.rechargeTF.width / 2,boxInfo.boxBg.y + boxInfo.boxBg.height - boxInfo.rechargeTF.height - 20);
            boxInfo.rechargebg.setPosition(boxInfo.rechargeTF.x + boxInfo.rechargeTF.width / 2 - boxInfo.rechargebg.width / 2, boxInfo.rechargeTF.y + boxInfo.rechargeTF.height / 2 - boxInfo.rechargebg.height / 2);
        }
    };
    /**
     * 宝箱的点击事件
     */
    AcBankBoxView.prototype.boxClick = function (event, needGem) {
        ViewController.getInstance().openView(ViewConst.POPUP.BANKBOXDEPOPUPVIEW, { "aid": this._currAid, "code": this._currCode, "boxId": needGem });
    };
    AcBankBoxView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "common_9_bg", "tailor_get_light", "acrechargeboxview" + this._code
        ]);
    };
    AcBankBoxView.prototype.getRuleInfo = function () {
        return "bankBoxPopupRule";
    };
    AcBankBoxView.prototype.tick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._currAid, this._currCode);
        var deltaT = vo.getAcResidueTime();
        if (this._acCDTxt) {
            if (deltaT > 0) {
                this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            }
            else {
                this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [LanguageManager.getlocal("acAlliance_acCDEnd")]);
            }
        }
    };
    AcBankBoxView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWBANKBOXREWARD, this.refreshView, this);
        this._topbg = null;
        this.boxInfoList = null;
        this._acCDTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcBankBoxView;
}(AcCommonView));
__reflect(AcBankBoxView.prototype, "AcBankBoxView");
//# sourceMappingURL=AcBankBoxView.js.map