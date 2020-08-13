/**
 * author jiangliuyang
 * date 2018/12/13
 * @class BethekingView
 */
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
var AcBeTheKingView = (function (_super) {
    __extends(AcBeTheKingView, _super);
    function AcBeTheKingView() {
        var _this = _super.call(this) || this;
        _this.dataMap = [
            ["+5%", "100"],
            ["+10%", "350"],
            ["+15%", "650"],
            ["+20%", "1200"],
            ["+25%", "2300"]
        ];
        return _this;
    }
    AcBeTheKingView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "bethekingview", "betheking_enter", "strengthen_button",
        ]);
    };
    AcBeTheKingView.prototype.initView = function () {
        var gem = Api.prestigeVoApi.getPem();
        if (this.acVo && this.acVo.isStart) {
            gem = this.acVo["buff"];
            // NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:1, kid:"bethekingAc"});
        }
        var cost = Config.GameprojectCfg.cost;
        var v1 = Config.GameprojectCfg.prestigeRate1;
        var v2 = Config.GameprojectCfg.prestigeRate2;
        var v3 = Config.GameprojectCfg.prestigeRate3;
        var plus = gem == 0 ? 0 : (gem / (gem * v1 + v2) + v3); //0.25;
        var plusStr = Math.round(plus * 10000) / 100 + "";
        var pressV = plus / 0.3;
        var gateStr = "betheking_gateclose";
        if (this.acVo && !this.acVo.isDuringPreview()) {
            gateStr = "betheking_gateopen";
        }
        var gate = BaseLoadBitmap.create(gateStr);
        gate.width = 640;
        gate.height = 1136;
        gate.x = 0;
        gate.y = GameConfig.stageHeigth - 1136 - 69;
        this.addChildToContainer(gate);
        this._gateBg = gate;
        var titlebg = BaseLoadBitmap.create("betheking_titlebg");
        titlebg.width = 640;
        titlebg.height = 240;
        titlebg.x = 0;
        titlebg.y = 69;
        this.addChild(titlebg);
        var detailText = ComponentManager.getTextField(LanguageManager.getlocal("bethekingViewDesc", ["1", cost + ""]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        detailText.lineSpacing = 4;
        detailText.textAlign = egret.HorizontalAlign.CENTER;
        detailText.x = GameConfig.stageWidth / 2 - detailText.width / 2;
        detailText.y = titlebg.y + 7;
        if (PlatformManager.checkIsTextHorizontal()) {
            detailText.lineSpacing = 1;
            detailText.y = titlebg.y + 2;
        }
        this.addChild(detailText);
        var progress = ComponentManager.getProgressBar("betheking_progress", "betheking_progress_border", 396);
        progress.x = GameConfig.stageWidth / 2 - progress.width / 2;
        progress.y = titlebg.y + 113;
        progress.setPercentage(pressV);
        this.addChild(progress);
        var dragonLeft = BaseBitmap.create("betheking_dragon");
        dragonLeft.x = GameConfig.stageWidth / 2 - 522 / 2;
        dragonLeft.y = progress.y + progress.height - dragonLeft.height;
        var dragonRight = BaseBitmap.create("betheking_dragon");
        dragonRight.scaleX = -1;
        dragonRight.x = GameConfig.stageWidth / 2 + 522 / 2;
        dragonRight.y = dragonLeft.y;
        this.addChild(dragonLeft);
        this.addChild(dragonRight);
        var preSpace = progress.width / 6;
        for (var i = 0; i < 5; i++) {
            var splite = BaseBitmap.create("betheking_splite");
            splite.x = progress.x + preSpace * (1 + i) - splite.width / 2;
            splite.y = progress.y + progress.height - 25;
            this.addChild(splite);
            var text1 = ComponentManager.getTextField(this.dataMap[i][0], 16, TextFieldConst.COLOR_LIGHT_YELLOW);
            text1.x = splite.x + splite.width / 2 - text1.width / 2;
            text1.y = progress.y - text1.height - 2;
            this.addChild(text1);
            var text2 = ComponentManager.getTextField(this.dataMap[i][1], 16, TextFieldConst.COLOR_LIGHT_YELLOW);
            text2.x = splite.x + splite.width / 2 - text2.width / 2;
            text2.y = progress.y + progress.height + 2;
            this.addChild(text2);
        }
        // let splite = BaseBitmap.create("public_splite");
        // splite.x = 400;
        // splite.y = 400;
        // splite.name = "test";
        // this.addChild(splite);
        var countText = ComponentManager.getTextField(LanguageManager.getlocal("bethekingViewCount", [gem + ""]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        var plusText = ComponentManager.getTextField(LanguageManager.getlocal("bethekingViewPlus", [plusStr]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        var space = 20;
        var allWidth = countText.width + space + plusText.width;
        var startX = GameConfig.stageWidth / 2 - allWidth / 2;
        countText.x = startX;
        countText.y = dragonLeft.y + dragonLeft.height + 28;
        plusText.x = countText.x + countText.width + space;
        plusText.y = countText.y;
        this.addChild(countText);
        this.addChild(plusText);
        var buttomBg = BaseBitmap.create("public_bottombg1");
        buttomBg.height = 120;
        buttomBg.setPosition(0, GameConfig.stageHeigth - this.container.y - buttomBg.height);
        this._btmText = ComponentManager.getTextField(LanguageManager.getlocal("betheKing_enter_tip2", [""]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._btmText.x = buttomBg.x + buttomBg.width / 2;
        this._btmText.y = buttomBg.y + buttomBg.height / 2 - this._btmText.height / 2;
        this._btmText.multiline = true;
        this._btmText.lineSpacing = 5;
        this._btmText.textAlign = egret.HorizontalAlign.CENTER;
        this._btmText.verticalAlign = egret.HorizontalAlign.CENTER;
        if (this.acVo && this.acVo.isStart) {
            // ""+this._acVo.buff
            var enterBtn = ComponentManager.getButton("betheking_enter", "", this.enterHandler, this);
            enterBtn.x = GameConfig.stageWidth / 2 - enterBtn.width / 2;
            enterBtn.y = GameConfig.stageHeigth / 2 - enterBtn.height / 2 - 100;
            this.addChildToContainer(enterBtn);
            this._enterBtn = enterBtn;
            if (this.acVo.isDuringPreview()) {
                App.DisplayUtil.changeToGray(this._enterBtn);
            }
            var tipbg = BaseBitmap.create("public_lockbg");
            tipbg.width = 450;
            tipbg.height = 80;
            tipbg.x = GameConfig.stageWidth / 2 - tipbg.width / 2;
            tipbg.y = enterBtn.y + enterBtn.height + 15;
            this.addChildToContainer(tipbg);
            var tipText = ComponentManager.getTextField(LanguageManager.getlocal("betheKing_enter_tip1"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            if (gem == 0) {
                tipText.text = LanguageManager.getlocal("betheKing_enter_tip3");
            }
            tipText.multiline = true;
            tipText.lineSpacing = 5;
            tipText.x = tipbg.x + tipbg.width / 2;
            tipText.y = tipbg.y + tipbg.height / 2 - tipText.height / 2;
            tipText.anchorOffsetX = tipText.width / 2;
            tipText.textAlign = egret.HorizontalAlign.CENTER;
            tipText.verticalAlign = egret.HorizontalAlign.CENTER;
            this.addChildToContainer(tipText);
            this._tipText = tipText;
            this._btmText.text = LanguageManager.getlocal("betheKing_pretimeTips");
            this._btmText.anchorOffsetX = this._btmText.width / 2;
            this.tick();
        }
        else {
            var wifeImg = BaseLoadBitmap.create("wife_full_2019");
            var scaleV = 0.67;
            wifeImg.width = 640;
            wifeImg.height = 840;
            wifeImg.setScale(scaleV);
            wifeImg.x = GameConfig.stageWidth / 2 - wifeImg.width / 2 * scaleV - 20;
            wifeImg.y = buttomBg.y - wifeImg.height * scaleV + 10;
            this.addChildToContainer(wifeImg);
            // servant.
            this._btmText.text = LanguageManager.getlocal("betheKing_pretimeTips");
            this._btmText.anchorOffsetX = this._btmText.width / 2;
        }
        this.addChildToContainer(buttomBg);
        this.addChildToContainer(this._btmText);
    };
    AcBeTheKingView.prototype.tick = function () {
        if (this.acVo && this.acVo.isStart) {
            if (this.acVo.isDuringPreview()) {
                this._gateBg.setload("betheking_gateclose"); // = ResourceManager.getRes("betheking_gateclose");
                var presecs = this.acVo.st + 86400 - GameData.serverTime;
                var str_ = App.DateUtil.getFormatBySecond(presecs, 8);
                this._btmText.text = LanguageManager.getlocal("betheKing_enter_tip4", [str_]);
                App.DisplayUtil.changeToGray(this._enterBtn);
            }
            else if (this.acVo.et - GameData.serverTime - 86400 >= 0) {
                var zidgroup = this.acVo.zidgroup;
                // console.log("zidgroup->",zidgroup);
                var ziStr = "";
                var needShowBtn = false;
                if (zidgroup) {
                    var maxNum = 4;
                    for (var key in zidgroup) {
                        if (zidgroup.hasOwnProperty(key)) {
                            if (maxNum <= 0) {
                                needShowBtn = true;
                                break;
                            }
                            maxNum--;
                            var element = zidgroup[key];
                            var str = Api.mergeServerVoApi.getAfterMergeSeverName(Api.playerVoApi.getPlayerID(), true, zidgroup[key]);
                            ziStr += str + ",";
                        }
                    }
                }
                ziStr = ziStr.substr(0, ziStr.length - 1);
                this._gateBg.setload("betheking_gateopen"); // = ResourceManager.getRes("betheking_gateopen");
                var str_ = App.DateUtil.getFormatBySecond(this.acVo.et - GameData.serverTime - 86400, 8);
                this._btmText.text = LanguageManager.getlocal("betheKing_enter_tip2", [ziStr, str_]);
                if (!this._serverBtn) {
                    this._serverBtn = ComponentManager.getButton("btn_lookdetail", null, this.serverBtnListener, this, [zidgroup]);
                }
                this._serverBtn.x = this._btmText.x + this._btmText.width / 2 + 10;
                this._serverBtn.y = this._btmText.y - 10;
                this.addChildToContainer(this._serverBtn);
                App.DisplayUtil.changeToNormal(this._enterBtn);
            }
            else {
                this._tipText.text = LanguageManager.getlocal("betheKing_enter_tip5");
                this._tipText.anchorOffsetX = this._tipText.width / 2;
                App.DisplayUtil.changeToNormal(this._enterBtn);
                this._btmText.text = LanguageManager.getlocal("betheKing_pretimeTips");
            }
            this._btmText.anchorOffsetX = this._btmText.width / 2;
        }
        return true;
    };
    AcBeTheKingView.prototype.serverBtnListener = function (zidGroup) {
        console.log(zidGroup);
        ViewController.getInstance().openView(ViewConst.POPUP.SERVERSHOWPOPUPVIEW, { zidGroup: zidGroup });
    };
    AcBeTheKingView.prototype.enterHandler = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.acVo.isDuringPreview()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("betheking_previewtimes"));
            return;
        }
        var gem = Api.prestigeVoApi.getPem();
        if (this.acVo) {
            gem = this.acVo["buff"];
        }
        // if(gem == 0){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("betheKing_enter_tip3"));
        // 	return;
        // }
        ViewController.getInstance().openView(ViewConst.COMMON.BETHEKINGVENTERVIEW, { aid: this.aid, code: this.acVo.code });
    };
    AcBeTheKingView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (rData.ret == 0) {
            var cmd = rData.cmd;
            if (cmd == NetRequestConst.REQUEST_KINGS_KINGINFO) {
                var rdata = rData.data;
                this.acVo.setRankInfos(rdata.ranks);
                this.acVo.zidgroup = rdata.zidgroup;
                this.acVo.merank = rdata.merank;
                this.acVo.mepoint = rdata.mepoint;
            }
        }
    };
    AcBeTheKingView.prototype.getRequestData = function () {
        if (!this.acVo || !this.acVo.isStart) {
            return;
        }
        return { requestType: NetRequestConst.REQUEST_KINGS_KINGINFO, requestData: { activeId: this.acVo.aidAndCode } };
    };
    AcBeTheKingView.prototype.getRuleInfo = function () {
        return "betheKingRuleInfo";
    };
    AcBeTheKingView.prototype.getTitleStr = function () {
        return "bethekingViewTitle";
    };
    AcBeTheKingView.prototype.dispose = function () {
        this._enterBtn = null;
        this._btmText = null;
        this._gateBg = null;
        this._tipText = null;
        this._serverBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcBeTheKingView;
}(AcCommonView));
__reflect(AcBeTheKingView.prototype, "AcBeTheKingView");
