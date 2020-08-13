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
 * 政令详情UI
 * author yanyuling
 * date 2018/05/28
 * @class DecreePapeInfoView
 */
var DecreePapeInfoView = (function (_super) {
    __extends(DecreePapeInfoView, _super);
    function DecreePapeInfoView() {
        var _this = _super.call(this) || this;
        _this._selGdid = "";
        return _this;
    }
    DecreePapeInfoView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_SETGD), this.isetGDCallback, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeRightContainer = new BaseDisplayObjectContainer();
        this._nodeRightContainer.x = -GameConfig.stageWidth;
        this.addChildToContainer(this._nodeRightContainer);
        this.addChildToContainer(this._nodeContainer);
        var paperIdx = this.param.data.gdId;
        // paperIdx = 1;
        var startY = GameConfig.stageHeigth / 2;
        var paperbg = BaseBitmap.create("decree_paper2");
        paperbg.x = 0;
        paperbg.y = startY - paperbg.height / 2;
        var decree_paper_open = BaseBitmap.create("decree_paper_open");
        decree_paper_open.width = GameConfig.stageWidth - paperbg.width;
        decree_paper_open.x = GameConfig.stageWidth - paperbg.x - decree_paper_open.width - 5;
        decree_paper_open.y = paperbg.y;
        this._nodeRightContainer.addChild(decree_paper_open);
        this._nodeContainer.addChild(paperbg);
        var policyIcon = BaseBitmap.create("decree_book");
        policyIcon.x = paperbg.x + paperbg.width / 2 - policyIcon.width / 2 + 5;
        policyIcon.y = paperbg.y + 85;
        this._nodeContainer.addChild(policyIcon);
        var nameTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        nameTxt.text = LanguageManager.getlocal("decreePaper_Name" + paperIdx);
        nameTxt.x = paperbg.x + paperbg.width / 2 - nameTxt.width / 2;
        nameTxt.y = paperbg.y + 250;
        this._nodeContainer.addChild(nameTxt);
        var descTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        descTxt.multiline = true;
        descTxt.lineSpacing = 3;
        descTxt.width = paperbg.width - 30;
        descTxt.text = LanguageManager.getlocal("decreePaper_Desc" + paperIdx);
        descTxt.x = paperbg.x + paperbg.width / 2 - descTxt.width / 2;
        descTxt.y = nameTxt.y + 40;
        this._nodeContainer.addChild(descTxt);
        var clostBtn = ComponentManager.getButton(ButtonConst.POPUP_CLOSE_BTN_1, "", this.hide, this);
        clostBtn.x = GameConfig.stageWidth - clostBtn.width + 15;
        clostBtn.y = decree_paper_open.y - clostBtn.height + 45;
        clostBtn.alpha = 0;
        // this._nodeRightContainer.addChild(clostBtn);
        var paperCfg = Config.PolicyCfg.getGovDecreeByType(paperIdx);
        var paperKeys = Object.keys(paperCfg);
        paperKeys.sort(function (dataA, dataB) {
            return dataA.sort - dataB.sort;
        });
        var leveeTime = Config.PolicyCfg.leveeTime;
        startY = decree_paper_open.y + 15;
        var isDissTime = false;
        // let deltaSec =  GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime);
        // if( deltaSec >= leveeTime[0] * 3600 && deltaSec <= leveeTime[1] * 3600 )
        if (Api.promoteVoApi.isDuringDiscussionTime()) {
            isDissTime = true;
        }
        var leveeGemDiscount = Config.PolicyCfg.leveeGemDiscount;
        for (var index = 1; index <= paperKeys.length; index++) {
            var tmpcfg = paperCfg[paperKeys[index - 1]];
            var paperbg_1 = BaseBitmap.create("decree_paper_listbg");
            paperbg_1.x = decree_paper_open.x + decree_paper_open.width / 2 - paperbg_1.width / 2;
            paperbg_1.y = startY;
            this._nodeRightContainer.addChild(paperbg_1);
            paperbg_1.touchEnabled = true;
            paperbg_1.addTouchTap(this.PaperImgClickHandler, this, [tmpcfg.id]);
            var addTimes1 = tmpcfg.addTimes1;
            var addTimes2 = tmpcfg.addTimes2;
            var addExtent1 = String(tmpcfg.addExtent1 * 100);
            var addExtent2 = String(tmpcfg.addExtent2 * 100);
            if (isDissTime) {
                addExtent1 = String(tmpcfg.leveeTimeEff1 * 100);
                addExtent2 = String(tmpcfg.leveeTimeEff2 * 100);
            }
            var descTxt_1 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            descTxt_1.multiline = true;
            descTxt_1.lineSpacing = 3;
            descTxt_1.width = paperbg_1.width - 60;
            descTxt_1.text = LanguageManager.getlocal("decreePaper_Desc" + paperIdx + "_1", ["" + addTimes1, addExtent1]);
            descTxt_1.x = paperbg_1.x + 30;
            descTxt_1.y = paperbg_1.y + 15;
            this._nodeRightContainer.addChild(descTxt_1);
            var descTxt2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            descTxt_1.multiline = true;
            descTxt2.lineSpacing = 3;
            descTxt2.width = paperbg_1.width - 60;
            descTxt2.text = LanguageManager.getlocal("decreePaper_Desc" + paperIdx + "_2", ["" + addTimes2, addExtent2]);
            descTxt2.x = descTxt_1.x;
            descTxt2.y = descTxt_1.y + 28;
            this._nodeRightContainer.addChild(descTxt2);
            var goldIcon = BaseLoadBitmap.create("itemicon1");
            goldIcon.setScale(0.45);
            goldIcon.x = paperbg_1.x + 330;
            goldIcon.y = paperbg_1.y + paperbg_1.height - 45;
            this._nodeRightContainer.addChild(goldIcon);
            var costStr = "" + tmpcfg.gdCost;
            if (tmpcfg.gdCost == 0) {
                costStr = LanguageManager.getlocal("sysFreeDesc");
            }
            var leveeTimeEff1 = String(tmpcfg.leveeTimeEff1 * 100);
            var costTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            costTxt.text = costStr;
            costTxt.y = goldIcon.y + 14;
            this._nodeRightContainer.addChild(costTxt);
            if (isDissTime) {
                goldIcon.x = paperbg_1.x + 180;
                if (tmpcfg.gdCost == 0) {
                    costTxt.text = costStr;
                }
                else {
                    costTxt.text = LanguageManager.getlocal("decreePaperDetail_costTxt", [costStr, String(tmpcfg.gdCost - leveeGemDiscount * tmpcfg.gdCost)]);
                }
            }
            costTxt.x = goldIcon.x + 45;
            var arrowImg = BaseBitmap.create("decree_arrow2");
            arrowImg.x = paperbg_1.x + paperbg_1.width - arrowImg.width - 10;
            arrowImg.y = paperbg_1.y + paperbg_1.height / 2 - arrowImg.height / 2;
            this._nodeRightContainer.addChild(arrowImg);
            startY += paperbg_1.height + 3;
        }
        var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_YELLOW);
        var time1 = App.DateUtil.formatSvrHourByLocalTimeZone(leveeTime[0]).hour;
        var time2 = App.DateUtil.formatSvrHourByLocalTimeZone(leveeTime[1]).hour;
        tipTxt.text = LanguageManager.getlocal("decreePaperTipTxt", ["" + time1, "" + time2]);
        tipTxt.anchorOffsetX = tipTxt.width / 2;
        tipTxt.x = GameConfig.stageWidth / 2;
        tipTxt.y = GameConfig.stageHeigth - 50;
        this._nodeContainer.addChild(tipTxt);
        var tipTxt2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_YELLOW);
        if (isDissTime) {
            tipTxt2.text = LanguageManager.getlocal("decreePaperTipTxt2");
        }
        else {
            tipTxt2.text = LanguageManager.getlocal("decreePaperTipTxt3");
        }
        tipTxt2.anchorOffsetX = tipTxt2.width / 2;
        tipTxt2.x = GameConfig.stageWidth / 2;
        tipTxt2.y = paperbg.y + paperbg.height;
        this._nodeContainer.addChild(tipTxt2);
        this._nodeRightContainer.addChild(clostBtn);
        var moveT = 1000;
        egret.Tween.get(this._nodeRightContainer, { loop: false }).to({ x: 0 }, moveT);
        egret.Tween.get(clostBtn, { loop: false }).wait(moveT).to({ alpha: 1 }, 300);
    };
    DecreePapeInfoView.prototype.PaperImgClickHandler = function (obj, param) {
        var isInDuss = Api.promoteVoApi.isDuringDiscussionTime();
        if (!isInDuss) {
            ViewController.getInstance().openView(ViewConst.POPUP.DECREEPAPERCHOOSEPOPUPVIEW, { gdid: param });
            return;
        }
        this._selGdid = "" + param;
        var gdCfg = Config.PolicyCfg.getGovDecreeById("" + param);
        var costGold = gdCfg.gdCost;
        var leveeGemDiscount = Config.PolicyCfg.leveeGemDiscount;
        if (isInDuss) {
            costGold = Math.ceil(leveeGemDiscount * costGold);
        }
        if (costGold > Api.playerVoApi.getPlayerGem()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("decreePaperSetNotEnoughTip"));
            return;
        }
        var costStr = "" + costGold;
        if (costGold == 0) {
            costStr = LanguageManager.getlocal("sysFreeDesc");
        }
        var gdName = LanguageManager.getlocal("decreePaper_Name" + gdCfg.type) + "-" + LanguageManager.getlocal("decreePaper_subName" + gdCfg.sort);
        var mesObj = {
            confirmCallback: this.doChangeRequest,
            handler: this,
            icon: "itemicon1",
            iconBg: "itembg_1",
            num: Api.playerVoApi.getPlayerGem(),
            msg: LanguageManager.getlocal("decreeChooseTxt1", [costStr, gdName]),
            id: 1,
            useNum: costGold,
            linespacing: 6,
            height: 250
        };
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
    };
    DecreePapeInfoView.prototype.doChangeRequest = function () {
        var gdCfg = Config.PolicyCfg.getGovDecreeById(this._selGdid);
        NetManager.request(NetRequestConst.REQUEST_POLICY_SETGD, { gdid: this._selGdid, gdtype: gdCfg.type });
    };
    DecreePapeInfoView.prototype.isetGDCallback = function (event) {
        if (event && event.data && event.data.ret) {
            var rData = event.data.data;
            App.CommonUtil.showTip(LanguageManager.getlocal("decree_paper_setSuccessTip"));
            ViewController.getInstance().openView(ViewConst.POPUP.DECREEPAPERDETAILPOPUPVIEW);
            ViewController.getInstance().hideView(ViewConst.BASE.DECREEPAPERVIEW);
            this.hide();
        }
        else {
            // App.CommonUtil.showTip(LanguageManager.getlocal("decree_paper_setFailedTip"));
            // return;
        }
    };
    DecreePapeInfoView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "decree_paper2", "decree_paper_open", "decree_book", "decree_paper_listbg", "decree_arrow2",
        ]);
    };
    DecreePapeInfoView.prototype.getTitleStr = function () {
        return "";
    };
    DecreePapeInfoView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_SETGD), this.isetGDCallback, this);
        this._nodeContainer = null;
        this._selGdid = "";
        this._nodeRightContainer = null;
        _super.prototype.dispose.call(this);
    };
    return DecreePapeInfoView;
}(BaseView));
__reflect(DecreePapeInfoView.prototype, "DecreePapeInfoView");
//# sourceMappingURL=DecreePapeInfoView.js.map