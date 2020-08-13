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
 * 世界杯投票活动购买积分
 * author 钱竣
 */
var AcWorldCupBuyView = (function (_super) {
    __extends(AcWorldCupBuyView, _super);
    function AcWorldCupBuyView() {
        var _this = _super.call(this) || this;
        _this._useNum = 1;
        _this._maxNum = 0;
        _this._ratioTxt = null;
        _this._ratioTxt2 = null;
        _this._kuang = null;
        _this._socerIcon1 = null;
        _this._nameTF = null;
        _this._scoreTF = null;
        _this._dragProgressBar = null;
        return _this;
    }
    Object.defineProperty(AcWorldCupBuyView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupBuyView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupBuyView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcWorldCupBuyView.prototype.getTitleStr = function () {
        return 'AcWorldCupVoteText4';
    };
    AcWorldCupBuyView.prototype.resetBgSize = function () {
        if (this.getBgName() != "public_rule_bg") {
            this.closeBtn.y = this.viewBg.y - 15;
            this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 15);
        }
        else {
            this.closeBtn.y = this.viewBg.y - 18;
            this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37);
        }
    };
    AcWorldCupBuyView.prototype.initView = function () {
        var view = this;
        view.viewBg.width = 600;
        view.viewBg.height = 426;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPBUY), view.buyCallbackHandle, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0, 12]);
        var data = view.param.data;
        var countryID = data.countryID;
        var countryFlag = view.vo.getCountryById(data.countryID);
        // let itemInfoVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(itemId);
        view._maxNum = view.cfg.maxBuy - view.vo.getCurBuyNum();
        var effectTitle = LanguageManager.getlocal("effectTitle");
        var kuang = BaseBitmap.create("public_9_bg4");
        kuang.width = view.viewBg.width - 30;
        kuang.height = 266;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, kuang, view.viewBg, [0, view.titleTF.textHeight + 40]);
        view.addChild(kuang);
        view._kuang = kuang;
        var bg = BaseBitmap.create("public_9_bg32");
        bg.width = kuang.width - 10;
        bg.height = kuang.height - 8;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, kuang);
        view.addChild(bg);
        //点击物品增加文字说明 添加物品iconitem
        var bookBg = BaseBitmap.create("itembg_1");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bookBg, bg, [0, 10]);
        view.addChild(bookBg);
        var flag = BaseBitmap.create('itemicon1');
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, bookBg);
        view.addChild(flag);
        var nameTF = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupBuyText1', [view.cfg.cost.toString()]), 20, TextFieldConst.COLOR_BLACK);
        var icon = BaseBitmap.create('worldcupfootball');
        var scoreTF = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupBuyText2', [view.cfg.coinNum.toString()]), 20, TextFieldConst.COLOR_BLACK);
        var desc = (view.width - (nameTF.textWidth + 5 + icon.width + scoreTF.textWidth)) / 2;
        view.setLayoutPosition(LayoutConst.lefttop, nameTF, view, [desc, bg.y + 10 + bookBg.height + 20]);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, icon, nameTF, [nameTF.textWidth + 5, 0]);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, scoreTF, icon, [icon.width + 5, 0]);
        view.addChild(nameTF);
        view.addChild(icon);
        view.addChild(scoreTF);
        view._nameTF = nameTF;
        view._scoreTF = scoreTF;
        var dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", this._maxNum, this.dragCallback, this);
        view.setLayoutPosition(LayoutConst.lefttop, dragProgressBar, view, [100, scoreTF.y + scoreTF.textHeight + 20]);
        view.addChild(dragProgressBar);
        view._dragProgressBar = dragProgressBar;
        view._numBg = BaseBitmap.create("public_9_bg5");
        view._numBg.width = 120;
        view.setLayoutPosition(LayoutConst.lefttop, view._numBg, dragProgressBar, [343 + 10, -4]);
        view.addChild(view._numBg);
        view._useNum = 1 * view.cfg.coinNum;
        view._selectedNumTF = ComponentManager.getTextField(view._useNum + "", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        view._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
        view._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
        view._maxNumTF = ComponentManager.getTextField("/" + (view._maxNum * view.cfg.coinNum).toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        view._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
        var numTFW = (view._numBg.width - (view._selectedNumTF.textWidth + view._maxNumTF.textWidth)) / 2;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, view._selectedNumTF, view._numBg, [numTFW, 0]);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, view._maxNumTF, view._selectedNumTF, [view._selectedNumTF.textWidth, 0]);
        view.addChild(view._selectedNumTF);
        view.addChild(this._maxNumTF);
        var ratioTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupBuyText3'), 18, TextFieldConst.COLOR_QUALITY_YELLOW);
        var socerIcon1 = BaseBitmap.create('worldcupfootball');
        var ratioTxt2 = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupBuyText4', [view.vo.getCurPoints().toString(), (view.cfg.maxBuy - view.vo.getCurBuyNum()).toString()]), 18, TextFieldConst.COLOR_QUALITY_YELLOW);
        var widthDesc = ratioTxt.textWidth + 5 + socerIcon1.width + 5 + ratioTxt2.textWidth;
        view.setLayoutPosition(LayoutConst.leftbottom, ratioTxt, kuang, [(kuang.width - widthDesc) / 2, 20]);
        view.addChild(ratioTxt);
        view._ratioTxt = ratioTxt;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, socerIcon1, ratioTxt, [ratioTxt.textWidth + 5, 0]);
        view.addChild(socerIcon1);
        view._socerIcon1 = socerIcon1;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, ratioTxt2, socerIcon1, [socerIcon1.width + 5, 0]);
        view.addChild(ratioTxt2);
        view._ratioTxt2 = ratioTxt2;
        var buyBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "AcWorldCupVoteText4", view.buyHandler, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, buyBtn, view.viewBg, [0, 20]);
        view.addChild(buyBtn);
    };
    AcWorldCupBuyView.prototype.dragCallback = function (curNum) {
        var view = this;
        view._useNum = curNum * view.cfg.coinNum;
        view._selectedNumTF.text = view._useNum + "";
        var numTFW = view._selectedNumTF.width + view._maxNumTF.width;
        view._selectedNumTF.x = view._numBg.x + (view._numBg.width - numTFW) / 2;
        view._maxNumTF.x = view._selectedNumTF.x + view._selectedNumTF.width;
        view._nameTF.text = LanguageManager.getlocal('AcWorldCupBuyText1', [(view.cfg.cost * curNum).toString()]);
        view._scoreTF.text = LanguageManager.getlocal('AcWorldCupBuyText2', [(view.cfg.coinLimit * curNum).toString()]);
        view.fresh_score();
    };
    // protected getContainerY():number
    // {
    // 	return 0;
    // }
    AcWorldCupBuyView.prototype.fresh_score = function () {
        var view = this;
        var widthDesc = view._ratioTxt.textWidth + 5 + view._socerIcon1.width + 5 + view._ratioTxt2.textWidth;
        view.setLayoutPosition(LayoutConst.leftbottom, view._ratioTxt, view._kuang, [(view._kuang.width - widthDesc) / 2, 20]);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, view._socerIcon1, view._ratioTxt, [view._ratioTxt.textWidth + 5, 0]);
        view._ratioTxt2.text = LanguageManager.getlocal('AcWorldCupBuyText4', [view.vo.getCurPoints().toString(), view._maxNum.toString()]);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, view._ratioTxt2, view._socerIcon1, [view._socerIcon1.width + 5, 0]);
    };
    AcWorldCupBuyView.prototype.buyCallbackHandle = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        if (evt.data.data.ret < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buyItemTimesOver"));
            return;
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("acTailorbuyTip1"));
        var limit = view.cfg.maxBuy - view.vo.getCurBuyNum();
        view._maxNum = limit;
        view._maxNumTF.text = ("/" + (view._maxNum * view.cfg.coinNum).toString());
        view._dragProgressBar.setDragPercent(1, limit);
        view.fresh_score();
        if (limit == 0) {
            view.hide();
        }
    };
    AcWorldCupBuyView.prototype.buyHandler = function () {
        var view = this;
        if ((view.cfg.maxBuy < view.vo.getCurBuyNum())) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buyItemTimesOver"));
            return;
        }
        if (Api.playerVoApi.getPlayerGem() < (view._useNum / view.cfg.coinNum * view.cfg.cost)) {
            App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPBUY, {
            activeId: view.acTivityId,
            num: view._useNum / view.cfg.coinNum
        });
    };
    AcWorldCupBuyView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress2_bg", "progress2", "itemicon1"
        ]);
    };
    AcWorldCupBuyView.prototype.dispose = function () {
        var view = this;
        this._useNum = 1;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPBUY), view.buyCallbackHandle, view);
        if (this._selectedNumTF) {
            this._selectedNumTF.dispose();
            this._selectedNumTF = null;
        }
        if (this._maxNumTF) {
            this._maxNumTF.dispose();
            this._maxNumTF = null;
        }
        this._maxNum = 0;
        if (this._numBg) {
            this._numBg.dispose();
            this._numBg = null;
        }
        view._ratioTxt = null;
        view._ratioTxt2 = null;
        view._socerIcon1 = null;
        view._kuang = null;
        view._nameTF = null;
        view._maxNumTF = null;
        view._dragProgressBar = null;
        _super.prototype.dispose.call(this);
    };
    return AcWorldCupBuyView;
}(PopupView));
__reflect(AcWorldCupBuyView.prototype, "AcWorldCupBuyView");
//# sourceMappingURL=AcWorldCupBuyView.js.map