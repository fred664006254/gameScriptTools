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
 *
 * @date: 2020-05-09 11:28:44
 * @class DiceSceneTab2
 */
var DiceSceneTab2 = (function (_super) {
    __extends(DiceSceneTab2, _super);
    function DiceSceneTab2() {
        var _this = _super.call(this) || this;
        _this.showShin = null;
        _this.skinGroup = new BaseDisplayObjectContainer();
        _this.useSkinGroup = new BaseDisplayObjectContainer();
        _this.getSkinGroup = new BaseDisplayObjectContainer();
        _this.noGetSkinGroup = new BaseDisplayObjectContainer();
        _this.getSkinY = 0;
        _this.noGetSkinY = 0;
        _this.lastGetItemY = 0;
        _this.itemHight = 0;
        _this.useSkinID = "";
        _this.getSkinDAta = [];
        _this.noGetSkinDAta = [];
        _this.initView();
        return _this;
        //this.setSkip("1004");
        // FIXME: 刷新界面是操作
    }
    DiceSceneTab2.prototype.getNetConstEventArr = function () {
        return [
            NetConst.DICE_BUYSKIN, NetConst.DICE_USESKIN
        ];
    };
    DiceSceneTab2.prototype.netEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case NetConst.DICE_BUYSKIN:
                view.buySkin(evt);
                break;
            case NetConst.DICE_USESKIN:
                view.refreshview(evt);
                break;
        }
    };
    DiceSceneTab2.prototype.dispose = function () {
        this.skinGroup = null;
        this.useSkinGroup = null;
        this.getSkinGroup = null;
        this.noGetSkinGroup = null;
        this.getSkinY = null;
        this.lastGetItemY = null;
        this.useSkinID = null;
        this.getSkinDAta = null;
        this.noGetSkinDAta = null;
        _super.prototype.dispose.call(this);
    };
    DiceSceneTab2.prototype.initView = function () {
        this.initEventListener();
        this.refreshData();
        this.skinGroup.width = GameConfig.stageWidth;
        this.useSkinGroup.width = GameConfig.stageWidth;
        this.getSkinGroup.width = GameConfig.stageWidth;
        this.noGetSkinGroup.width = GameConfig.stageWidth;
        this.creatMoren();
        this.reLineGet();
        this.creatGet();
        this.reLineNoGet();
        this.creatNoGet();
        this.creatUi();
        var skinScroll = ComponentMgr.getScrollView(this.skinGroup, new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 310));
        this.addChild(skinScroll);
        skinScroll.x = 0;
        skinScroll.y = 40;
    };
    DiceSceneTab2.prototype.creatUi = function () {
        this.skinGroup.addChild(this.useSkinGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this.useSkinGroup, this.skinGroup, [0, 0]);
        this.skinGroup.addChild(this.getSkinGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this.getSkinGroup, this.skinGroup, [0, 0]);
        this.skinGroup.addChild(this.noGetSkinGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this.noGetSkinGroup, this.skinGroup, [0, 0]);
    };
    //刷新界面
    DiceSceneTab2.prototype.refreshView = function () {
        this.refreshData();
        this.useSkinGroup.removeChildren();
        this.getSkinGroup.removeChildren();
        this.noGetSkinGroup.removeChildren();
        this.creatMoren();
        this.reLineGet();
        this.creatGet();
        this.reLineNoGet();
        this.creatNoGet();
        this.creatUi();
    };
    // 默认皮肤
    DiceSceneTab2.prototype.creatMoren = function () {
        this.showShin = this.createSkinItem(this.useSkinID, 10, true, true);
        this.useSkinGroup.addChild(this.showShin);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this.showShin, this.useSkinGroup, [0, 0]);
    };
    // 已获得的皮肤
    DiceSceneTab2.prototype.creatGet = function () {
        var _this = this;
        this.getSkinDAta.forEach(function (item, index) {
            var skinItem = _this.createSkinItem(item, _this.getSkinY + index * 400, true, false);
            _this.getSkinGroup.addChild(skinItem);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, skinItem, _this.getSkinGroup, [0, 0]);
            _this.itemHight = skinItem.y + skinItem.height;
        });
    };
    // 未获得的皮肤
    DiceSceneTab2.prototype.creatNoGet = function () {
        var _this = this;
        this.noGetSkinDAta.forEach(function (item, index) {
            var skinItem = _this.createSkinItem(item, _this.noGetSkinY + index * 430, false, false, true);
            _this.noGetSkinGroup.addChild(skinItem);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, skinItem, _this.noGetSkinGroup, [0, 0]);
        });
    };
    //刷新使用的data数据
    DiceSceneTab2.prototype.refreshData = function () {
        this.useSkinID = String(Api.LineVoApi.getUseSkinID());
        this.getSkinDAta = Api.LineVoApi.getHadSkins();
        this.noGetSkinDAta = Api.LineVoApi.getNotHadSkins();
    };
    DiceSceneTab2.prototype.reLineGet = function () {
        var line1 = BaseBitmap.create("public_line1");
        this.skinGroup.addChild(line1);
        line1.width = this.showShin.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this.showShin, this.skinGroup, [0, 0]);
        line1.y = this.showShin.y + this.showShin.height + 10;
        var txtHad = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
        txtHad.width = this.skinGroup.width;
        txtHad.textAlign = egret.HorizontalAlign.CENTER;
        this.skinGroup.addChild(txtHad);
        txtHad.text = LangMger.getlocal("dice_battle_skin_tip1");
        txtHad.x = 0;
        txtHad.y = line1.y + line1.height + 20;
        this.getSkinY = txtHad.y + txtHad.height + 5;
    };
    DiceSceneTab2.prototype.reLineNoGet = function () {
        var line2 = BaseBitmap.create("public_line1");
        this.skinGroup.addChild(line2);
        line2.width = this.showShin.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this.showShin, this.skinGroup, [0, 0]);
        line2.y = this.lastGetItemY + this.itemHight + 20;
        var txtNoHad = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
        txtNoHad.width = this.skinGroup.width;
        txtNoHad.textAlign = egret.HorizontalAlign.CENTER;
        this.skinGroup.addChild(txtNoHad);
        txtNoHad.text = LangMger.getlocal("dice_battle_skin_tip2");
        txtNoHad.x = 0;
        txtNoHad.y = line2.y + line2.height + 20;
        this.noGetSkinY = txtNoHad.y + txtNoHad.height + 5;
    };
    DiceSceneTab2.prototype.createSkinItem = function (skinID, y, had, isUseing, isnew) {
        var skinItem = new BaseDisplayObjectContainer();
        skinItem.name = "skinItem" + skinID;
        skinItem.y = y;
        var skinBg = BaseLoadBitmap.create("battleskin_" + skinID);
        skinItem.addChild(skinBg);
        skinBg.y = 32;
        skinItem.width = skinBg.width;
        var titleBg = BaseBitmap.create("dice_skin_title_bg_" + skinID);
        skinItem.addChild(titleBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, titleBg, skinBg, [0, 0]);
        var titleTxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_36, ColorEnums.white);
        skinItem.addChild(titleTxt);
        titleTxt.text = LangMger.getlocal("dice_battle_skin_title_" + skinID);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleTxt, titleBg, [0, 23]);
        if (isnew) {
            var newSkinBg = BaseBitmap.create("dice_skin_new_icon");
            skinItem.addChild(newSkinBg);
            newSkinBg.x = -20;
            newSkinBg.y = skinBg.y;
            var newTxt = ComponentMgr.getTextField('NEW', TextFieldConst.SIZE_30, ColorEnums.white);
            skinItem.addChild(newTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, newTxt, newSkinBg, [15, 32]);
        }
        if (!had) {
            //App.DisplayUtil.changeToGray(skinBg);
            var noGetNumBg = BaseBitmap.create("dice_numerical_floor_bg");
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, noGetNumBg, skinBg, [0, noGetNumBg.height / 2]);
            // let buyBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, "", this.buyBtnOnClick, this, [skinID]);
            skinItem.addChild(noGetNumBg);
            //App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, noGetNumBg, skinBg, [0,- noGetNumBg.height / 2]);
            var icon = this.btnIconAndTxt(skinID);
            skinItem.addChild(icon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, noGetNumBg, [0, 0]);
            skinBg.touchEnabled = true;
            skinBg.addTouchTap(this.buyBtnOnClick, this, [skinID]);
        }
        else {
            if (!isUseing && Config.BattleskinCfg.getIsDefaultSkin(skinID)) {
                var buyBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, "", this.setSkip, this, [skinID]);
                skinItem.addChild(buyBtn);
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, buyBtn, skinBg, [0, 0]);
                var newTxt = ComponentMgr.getTextField('dice_battle_skin_inuse', TextFieldConst.SIZE_30, ColorEnums.white);
                newTxt.text = LangMger.getlocal("dice_battle_skin_inuse");
                buyBtn.addChild(newTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, newTxt, buyBtn, [0, 0]);
            }
        }
        if (skinID == this.useSkinID && !isUseing && Config.BattleskinCfg.getIsDefaultSkin(skinID)) {
            App.DisplayUtil.changeToGray(skinBg);
            var buyBtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, "", this.unloadSkip, this);
            skinItem.addChild(buyBtn);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, buyBtn, skinBg, [0, 0]);
            var newTxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
            newTxt.text = LangMger.getlocal("dice_battle_skin_nouse");
            buyBtn.addChild(newTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, newTxt, buyBtn, [0, 0]);
        }
        if (skinID == this.useSkinID && isUseing && Config.BattleskinCfg.getIsDefaultSkin(skinID)) {
            var buyBtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, "", this.unloadSkip, this);
            skinItem.addChild(buyBtn);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, buyBtn, skinBg, [0, 0]);
            var newTxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
            newTxt.text = LangMger.getlocal("dice_battle_skin_nouse");
            buyBtn.addChild(newTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, newTxt, buyBtn, [0, 0]);
        }
        return skinItem;
    };
    DiceSceneTab2.prototype.btnIconAndTxt = function (skinID) {
        var group = new BaseDisplayObjectContainer();
        var item = Config.BattleskinCfg.getSkinInfoByID(skinID);
        var icon = BaseBitmap.create();
        group.addChild(icon);
        var txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
        group.addChild(txt);
        switch (item.getType) {
            case 3:
                icon.texture = ResMgr.getRes("trophy_icon");
                icon.setScale(0.5);
                txt.text = String(item.needScore);
                break;
            case 2:
                icon.texture = ResMgr.getRes("ab_mainui_gem");
                txt.text = String(item.costGem);
                break;
            default:
                break;
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, txt, icon, [icon.width * icon.scaleX + 5, 0]);
        return group;
    };
    DiceSceneTab2.prototype.buyBtnOnClick = function (event, data) {
        var item = Config.BattleskinCfg.getSkinInfoByID(data);
        var view = this;
        switch (item.getType) {
            case 2:
                var gemnum = Api.UserinfoVoApi.getGem();
                if (gemnum < item.costGem) {
                    App.CommonUtil.gemNotEnough(2);
                    // App.CommonUtil.showTip(LangMger.getlocal("sysgemNotEnough"));
                }
                else {
                    ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                        title: "战场皮肤",
                        msg: "\u786E\u5B9A\u8981\u8D2D\u4E70" + LangMger.getlocal("dice_battle_skin_title_" + data) + "\u76AE\u80A4",
                        handler: view,
                        iconURL: "ab_mainui_gem",
                        confirmTxt: String(item.costGem),
                        //needCancel : true,
                        callback: function () {
                            NetManager.request(NetConst.DICE_BUYSKIN, { skinId: data });
                        },
                    });
                }
                break;
            case 3:
                var capnum = Api.UserinfoVoApi.getScore();
                if (capnum < item.needScore) {
                    App.CommonUtil.showTip("\u5956\u676F\u4E0D\u8DB3");
                }
                else {
                    ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                        title: "战场皮肤",
                        msg: "\u786E\u5B9A\u8981\u8D2D\u4E70" + LangMger.getlocal("dice_battle_skin_title_" + data) + "\u76AE\u80A4",
                        handler: view,
                        iconURL: "ab_mainui_gem",
                        confirmTxt: String(item.needScore),
                        callback: function () {
                            NetManager.request(NetConst.DICE_BUYSKIN, { skinId: data });
                        },
                    });
                }
                break;
            default:
                break;
        }
    };
    DiceSceneTab2.prototype.refreshview = function (evt) {
        this.refreshView();
        console.log(evt);
    };
    DiceSceneTab2.prototype.setSkip = function (id) {
        NetManager.request(NetConst.DICE_USESKIN, { skinId: id });
    };
    DiceSceneTab2.prototype.unloadSkip = function () {
        var itemID = Config.BattleskinCfg.getSkinIDs();
        NetManager.request(NetConst.DICE_USESKIN, { skinId: itemID[0] });
    };
    DiceSceneTab2.prototype.buySkin = function (evt) {
        this.refreshView();
        console.log(evt);
    };
    return DiceSceneTab2;
}(CommonViewTab));
__reflect(DiceSceneTab2.prototype, "DiceSceneTab2");
//# sourceMappingURL=DiceSceneTab2.js.map