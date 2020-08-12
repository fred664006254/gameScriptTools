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
 * 宝箱详细信息弹窗
 * author qianjun
 *
 */
var BoxRewardDetailPopupView = (function (_super) {
    __extends(BoxRewardDetailPopupView, _super);
    function BoxRewardDetailPopupView() {
        var _this = _super.call(this) || this;
        _this._bg1 = null;
        _this._conBtn = null;
        return _this;
    }
    // 打开该面板时，需要传参数msg
    BoxRewardDetailPopupView.prototype.initView = function () {
        var view = this;
        var param = view.param.data;
        var boxid = param.boxId;
        //是否是购买模式
        var isbuy = param.isbuy;
        var boxCfg = Config.BoxCfg.getBoxCfgById(boxid);
        var bg = BaseBitmap.create("popupview_content1");
        bg.width = 500;
        bg.x = view.viewBg.x + view.viewBg.width / 2 - bg.width / 2 - 2;
        // bg.y = 130;
        view.addChildToContainer(bg);
        //中部奖励
        var rewardGroup = new BaseDisplayObjectContainer();
        rewardGroup.width = bg.width;
        view.addChildToContainer(rewardGroup);
        //筛子卡片物品
        var cardgroup = new BaseDisplayObjectContainer();
        rewardGroup.addChild(cardgroup);
        var count = 1;
        var _loop_1 = function (i) {
            var cardnum = boxCfg.getCardNumByType(i);
            if (cardnum) {
                var group = new BaseDisplayObjectContainer();
                cardgroup.addChild(group);
                group.name = "card" + i;
                var cardlevel = BaseBitmap.create("dicecardlevel" + i);
                group.addChild(cardlevel);
                if (i > 1) {
                    if (App.CommonUtil.check_dragon() && i === 4) {
                        var db = App.DragonBonesUtil.getLoadDragonBones("carShow_effect", 0);
                        group.addChild(db);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, db, cardlevel, [0, 0]);
                    }
                    else {
                        var stresslight = BaseBitmap.create("dicestreelight" + i);
                        group.addChild(stresslight);
                        stresslight.alpha = 0;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, stresslight, cardlevel, [-2, 0]);
                        var dtnum = 30;
                        var ft = BattleStatus.timeparam;
                        egret.Tween.get(stresslight, { loop: true })
                            .to({ alpha: 1 }, dtnum * ft).to({ alpha: 0 }, dtnum * 2 * ft);
                    }
                }
                var random = boxCfg.getCardRatioShow(i);
                var numstr = cardnum.toString();
                if (random) {
                    numstr = "0~" + cardnum;
                }
                else {
                    numstr = "x" + numstr;
                }
                var cardNameTxt = ComponentMgr.getTextField(LangMger.getlocal("boxcardnum", [LangMger.getlocal("boxcardtype" + i), numstr]), TextFieldConst.SIZE_CONTENT_NORMAL_POPUP, ColorEnums.black);
                cardNameTxt.textFlow = [
                    { text: LangMger.getlocal("boxcardtype" + i), style: { "textColor": GameConfig.getQualityColor(i), "strokeColor": 0, "stroke": 1 }, },
                    { text: "\n" },
                    { text: numstr }
                ];
                // cardNameTxt.textColor =GameConfig.getQualityColor(i);
                // cardNameTxt.strokeColor = 0
                // cardNameTxt.stroke = 1;
                cardNameTxt.lineSpacing = 3;
                group.addChild(cardNameTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, cardNameTxt, cardlevel, [cardlevel.width + 3, 0]);
                if (boxCfg.getCardPoolShow(i)) {
                    var extBtn_1 = ComponentMgr.getButton("dicecardext", "", function () {
                        //扩展弹窗
                        App.CommonUtil.showBoxExtendTip(boxid, i, extBtn_1.localToGlobal());
                        // let view = this;
                        // let exttip = new BoxExtendTip();
                        // exttip.init(boxid, i, extBtn.localToGlobal());
                        // view.addChild(exttip);
                    }, view);
                    group.addChild(extBtn_1);
                    extBtn_1.setScale(0.9);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, extBtn_1, cardNameTxt, [cardNameTxt.width, 0]);
                }
                group.x = count & 1 ? 0 : 170;
                group.y = (Math.ceil(count / 2) - 1) * (50 + 10);
                ++count;
            }
        };
        for (var i = 1; i < 5; ++i) {
            _loop_1(i);
        }
        //金币、钻石
        var goldgroup = null;
        var tmpH = 0;
        var tmpX = 0;
        if (boxCfg.goldNum) {
            goldgroup = new BaseDisplayObjectContainer();
            rewardGroup.addChild(goldgroup);
            var icon = BaseBitmap.create("ab_mainui_gold");
            goldgroup.addChild(icon);
            var numTxt = ComponentMgr.getTextField(boxCfg.goldNum.toString(), TextFieldConst.SIZE_CONTENT_NORMAL_POPUP, ColorEnums.black);
            goldgroup.addChild(numTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numTxt, icon, [icon.width + 6, 0]);
            goldgroup.x = (rewardGroup.width - (cardgroup.width + goldgroup.width + 35)) / 2;
            tmpX = goldgroup.x;
            tmpH += goldgroup.height;
        }
        var gemgroup = null;
        if (boxCfg.gemNum) {
            gemgroup = new BaseDisplayObjectContainer();
            rewardGroup.addChild(gemgroup);
            var icon = BaseBitmap.create("ab_mainui_gem");
            gemgroup.addChild(icon);
            var numTxt = ComponentMgr.getTextField(boxCfg.gemNum.toString(), TextFieldConst.SIZE_CONTENT_NORMAL_POPUP, ColorEnums.black);
            gemgroup.addChild(numTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numTxt, icon, [icon.width + 6, 0]);
            gemgroup.x = goldgroup ? goldgroup.x : ((rewardGroup.width - (cardgroup.width + gemgroup.width + 35)) / 2);
            tmpX = gemgroup.x;
            tmpH += gemgroup.height;
        }
        rewardGroup.height = Math.max(52, cardgroup.height);
        if (tmpX) {
            cardgroup.x = rewardGroup.width - cardgroup.width - tmpX;
        }
        else {
            cardgroup.x = (rewardGroup.width - cardgroup.width) / 2;
        }
        cardgroup.y = (rewardGroup.height - cardgroup.height) / 2;
        if (goldgroup && gemgroup) {
            goldgroup.y = (rewardGroup.height - tmpH - 10) / 2;
            gemgroup.y = goldgroup.y + goldgroup.height + 10;
        }
        else {
            if (goldgroup) {
                goldgroup.y = (rewardGroup.height - tmpH) / 2;
            }
            if (gemgroup) {
                gemgroup.y = (rewardGroup.height - tmpH) / 2;
            }
        }
        bg.height = rewardGroup.height + 70;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rewardGroup, bg);
        var conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, isbuy ? param.costNum : LangMger.getlocal("confirmBtn"), view.clickConHandler, view);
        if (isbuy) {
            conBtn.addTextIcon(param.costIcon);
        }
        conBtn.setColor(ColorEnums.white);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conBtn, bg, [0,bg.height+20]);
        view.addChild(conBtn);
        this._conBtn = conBtn;
    };
    // 获取container初始y坐标 		
    // protected getContainerY():number{
    // 	return 30-this._titleBg.height;
    // }
    // 重新实现背景图
    BoxRewardDetailPopupView.prototype.initBg = function () {
        // let bg1 = BaseBitmap.create(`boxrewarddetailpopupview1`);
        // this.addChild(bg1);
        // this._bg1 = bg1;
        var bg2 = BaseBitmap.create("boxrewarddetailpopupviewbg");
        this.addChild(bg2);
        this.viewBg = bg2;
        this.viewBg.touchEnabled = true;
    };
    // 不要标题
    BoxRewardDetailPopupView.prototype.initTitle = function () {
    };
    BoxRewardDetailPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var view = this;
        this.container.y = view.viewBg.y + 198;
        var title = ComponentMgr.getTextField('11', TextFieldConst.SIZE_40, 0xC5D4F7);
        this.addChild(title);
        title.width = 571;
        title.textAlign = egret.HorizontalAlign.CENTER;
        title.x = this.viewBg.x;
        title.y = this.viewBg.y + 142;
        title.text = this.param.data.title;
        title.stroke = 1.5;
        title.strokeColor = 0x0C2C77;
        title.y = this.viewBg.y + 140;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, this.closeBtn, this.viewBg, [29, 32]);
        var param = view.param.data;
        var boxid = param.boxId;
        var boxCfg = Config.BoxCfg.getBoxCfgById(boxid);
        var boxicon = BaseLoadBitmap.create(boxCfg.icon, null, {
            callbackThisObj: view,
            callback: function () {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, boxicon, view.viewBg, [0, -177]);
            },
        });
        if (App.CommonUtil.check_dragon()) {
            var db1 = App.DragonBonesUtil.getLoadDragonBones("boxShow_2_effect", 0);
            view.addChild(db1);
            db1.setPosition(320, this.viewBg.y + 257);
            view.setChildIndex(db1, view.getChildIndex(view.viewBg));
        }
        view.addChild(boxicon);
        boxicon.touchEnabled = true;
        if (App.CommonUtil.check_dragon()) {
            var db1 = App.DragonBonesUtil.getLoadDragonBones("boxShow_1_effect", 0);
            view.addChild(db1);
            db1.setPosition(320, this.viewBg.y + 257);
        }
        // let timeparam = BattleStatus.timeparam;
        // let fg = BaseLoadBitmap.create(`itembox${boxid}g`, null, {
        // 	callback:()=>{
        // 		if(fg){
        // 			fg.blendMode = egret.BlendMode.ADD;
        // 			fg.alpha = 0;
        // 			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, fg, view.viewBg, [-10, - boxicon.height / 2 -14]);
        // 			egret.Tween.get(fg, {loop : true}).to({alpha : 0.7}, timeparam * 30).to({alpha : 0}, timeparam * 30).to({alpha : 0.7}, timeparam * 30).to({alpha : 0}, timeparam * 30);
        // 		}
        // 	},
        // 	callbackThisObj: view
        // });
        // this.addChild(fg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this._conBtn, this.viewBg, [0, 20]);
        if (param.boxId == "1007") {
            // 支援宝箱要有取消按钮
            this._conBtn.setBtnBitMap(ButtonConst.BTN_CONFIRM);
            this._conBtn.setText(LangMger.getlocal("watchAd1"));
            var adIcon = BaseBitmap.create("watching_ad_icon2");
            this._conBtn.addChild(adIcon);
            adIcon.anchorOffsetX = adIcon.width / 2;
            adIcon.anchorOffsetY = adIcon.height / 2;
            // adIcon.rotation = -25; 
            adIcon.y = 10;
            adIcon.x = 5;
            // // 取消按钮
            // let cntBtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, LangMger.getlocal("canelStr"), this.closeHandler, this);
            // this.addChild(cntBtn);
            // cntBtn.y = this._conBtn.y;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.left, cntBtn, this.viewBg, [30,0]);
            // App.DisplayUtil.setLayoutPosition(LayoutConst.right, this._conBtn, this.viewBg, [30,0]);
        }
        if (param.boxId == "1006") {
            this._conBtn.setBtnBitMap(ButtonConst.BTN_CONFIRM);
            this._conBtn.setText(LangMger.getlocal("sysopen"));
        }
    };
    // protected isTouchMaskClose():boolean{
    // 	return false;
    // }
    BoxRewardDetailPopupView.prototype.clickConHandler = function (data) {
        var param = this.param;
        if (!param.data.clickNotAutoHide) {
            this.hide();
        }
        if (param.data.callback) {
            param.data.callback.apply(param.data.handler, [this]);
        }
    };
    // protected getTitleStr(){
    //     return this.param.data.title;
    // }
    BoxRewardDetailPopupView.prototype.getCloseBtnName = function () {
        return this.param.data.needClose === 1 ? _super.prototype.getCloseBtnName.call(this) : null;
    };
    BoxRewardDetailPopupView.prototype.closeHandler = function () {
        var param = this.param;
        if (param.data.closecallback) {
            param.data.closecallback.apply(param.data.handler, [this]);
        }
        _super.prototype.closeHandler.call(this);
    };
    BoxRewardDetailPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    BoxRewardDetailPopupView.prototype.getResourceList = function () {
        var array = [];
        array.concat(_super.prototype.getResourceList.call(this));
        return array.concat([
            "boxrewardpopupview"
        ]);
    };
    BoxRewardDetailPopupView.prototype.getParent = function () {
        if (this.param.data.inLayer) {
            return this.param.data.inLayer;
        }
        else {
            return _super.prototype.getParent.call(this);
        }
    };
    BoxRewardDetailPopupView.prototype.dispose = function () {
        this._bg1 = null;
        this._conBtn = null;
        _super.prototype.dispose.call(this);
    };
    return BoxRewardDetailPopupView;
}(PopupView));
__reflect(BoxRewardDetailPopupView.prototype, "BoxRewardDetailPopupView");
//# sourceMappingURL=BoxRewardDetailPopupView.js.map