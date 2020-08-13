/**
 * 门客新UI 神器下部2
 * 神器加工
 * author shaoliang
 * date 2019/7/31
 * @class ServantWeaponNode2
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ServantWeaponNode2 = /** @class */ (function (_super) {
    __extends(ServantWeaponNode2, _super);
    function ServantWeaponNode2() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._weaponVo = null;
        _this._weaponCfg = null;
        _this._titleTxt = null;
        _this._itemNode = null;
        _this._lvupStatus = 0; // 0 可以锻造 1 道具不足  2 神器等级最大  3 不能超过门客等级
        _this._scrollNode = null;
        _this._attrIconTab = [];
        _this._items = [];
        _this._scrollview = null;
        _this._lvMaxText = null;
        _this._attrTab = [];
        _this._attrTab2 = [];
        return _this;
    }
    ServantWeaponNode2.prototype.init = function (servantId, bottomH) {
        var _this = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPABILITY), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WEAPON_RESET, this.resetInfo, this);
        this._servantId = servantId;
        this._weaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(servantId);
        this._weaponCfg = Config.ServantweaponCfg.getWeaponItemByServantId(servantId);
        this._scrollNode = new BaseDisplayObjectContainer();
        var rect = new egret.Rectangle(0, 0, 520, bottomH - 34);
        var scrollview = ComponentManager.getScrollView(this._scrollNode, rect);
        scrollview.x = 95;
        scrollview.y = 24;
        this.addChild(scrollview);
        this._scrollview = scrollview;
        var nodebg = BaseBitmap.create("public_9_managebg");
        nodebg.width = 520;
        // nodebg.height = bottomH - 50;
        nodebg.height = 232;
        nodebg.setPosition(0, 15);
        this._scrollNode.addChild(nodebg);
        // if (nodebg.height>300)
        // {
        //     nodebg.height=300;
        // }
        var titlebg = BaseBitmap.create("servant_title_bg");
        titlebg.width = 310;
        titlebg.setPosition(nodebg.x + nodebg.width / 2 - titlebg.width / 2, nodebg.y - 15);
        this._scrollNode.addChild(titlebg);
        var titleTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        titleTxt.x = titlebg.x + 40;
        titleTxt.y = titlebg.y + 8;
        titleTxt.width = titlebg.width - 80;
        titleTxt.textAlign = egret.HorizontalAlign.CENTER;
        this._scrollNode.addChild(titleTxt);
        this._titleTxt = titleTxt;
        //  let ruleBtn = ComponentManager.getButton("btn_rule","",this.clickRuleBtnHandler,this);
        // ruleBtn.setPosition(418,6);
        // ruleBtn.setScale(0.8);
        // this.addChild(ruleBtn);
        // let alphabg = BaseBitmap.create("public_alphabg");
        // alphabg.width = nodebg.width;
        // alphabg.height = 270;
        // this._scrollNode.addChild( alphabg);
        var itembg = BaseBitmap.create("public_consume_bg");
        itembg.width = nodebg.width;
        itembg.height = 112;
        itembg.setPosition(0, 130);
        this._scrollNode.addChild(itembg);
        this._itemNode = new BaseDisplayObjectContainer();
        this._itemNode.x = 0;
        this._itemNode.y = nodebg.y;
        this._scrollNode.addChild(this._itemNode);
        var levelupBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "weapon_promotion", this.levelupBtnClickHandler, this);
        levelupBtn.x = 350;
        levelupBtn.y = itembg.y + itembg.height / 2 - levelupBtn.height / 2;
        levelupBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._scrollNode.addChild(levelupBtn);
        this._levelupBtn = levelupBtn;
        for (var i = 1; i <= 4; i++) {
            var attrIcon = new ServantNewAttrIcon();
            attrIcon.init(i);
            attrIcon.setPosition(50 + (i - 1) * 110, 40);
            this._scrollNode.addChild(attrIcon);
            this._attrIconTab.push(attrIcon);
            attrIcon.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.WEAPONATTRDETAILSPOPUPVIEW, { id: _this._weaponVo.id, showAttr: true });
            }, this);
        }
        this._lvMaxText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._lvMaxText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this._lvMaxText.text = LanguageManager.getlocal("weapon_levelmax_tip2");
        this._lvMaxText.width = nodebg.width;
        this._lvMaxText.textAlign = egret.HorizontalAlign.CENTER;
        this._lvMaxText.lineSpacing = 5;
        this._lvMaxText.x = 0;
        this._lvMaxText.y = itembg.y + itembg.height / 2 - this._lvMaxText.height / 2;
        this._scrollNode.addChild(this._lvMaxText);
        //机缘特性
        var nodebg4 = BaseBitmap.create("public_9_managebg");
        nodebg4.width = 520;
        nodebg4.height = 121;
        nodebg4.setPosition(0, nodebg.y + nodebg.height + 20);
        this._scrollNode.addChild(nodebg4);
        var titlebg4 = BaseBitmap.create("servant_title_bg");
        titlebg4.width = 310;
        titlebg4.setPosition(nodebg.x + nodebg4.width / 2 - titlebg4.width / 2, nodebg4.y - 15);
        this._scrollNode.addChild(titlebg4);
        var titleTxt4 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        titleTxt4.text = LanguageManager.getlocal("weapon_attribute3");
        titleTxt4.x = titlebg4.x + 40;
        titleTxt4.y = titlebg4.y + 8;
        titleTxt4.width = titlebg4.width - 80;
        titleTxt4.textAlign = egret.HorizontalAlign.CENTER;
        this._scrollNode.addChild(titleTxt4);
        for (var i = 1; i <= 1; i++) {
            var oneattr = new WeaponAttr2Item();
            oneattr.init(i, this._weaponVo.id);
            this._scrollNode.addChild(oneattr);
            this._attrTab2.push(oneattr);
            oneattr.setPosition(15 + (i - 1) % 2 * 250, nodebg4.y + Math.floor((i - 1) / 2) * 90 + 30);
        }
        //高级
        var nodebg2 = BaseBitmap.create("public_9_managebg");
        nodebg2.width = 520;
        nodebg2.height = 210;
        nodebg2.setPosition(0, nodebg4.y + nodebg4.height + 20);
        this._scrollNode.addChild(nodebg2);
        var titlebg2 = BaseBitmap.create("servant_title_bg");
        titlebg2.width = 310;
        titlebg2.setPosition(nodebg.x + nodebg2.width / 2 - titlebg2.width / 2, nodebg2.y - 15);
        this._scrollNode.addChild(titlebg2);
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        titleTxt2.text = LanguageManager.getlocal("weapon_attribute1");
        titleTxt2.x = titlebg2.x + 40;
        titleTxt2.y = titlebg2.y + 8;
        titleTxt2.width = titlebg2.width - 80;
        titleTxt2.textAlign = egret.HorizontalAlign.CENTER;
        this._scrollNode.addChild(titleTxt2);
        //基础
        var nodebg3 = BaseBitmap.create("public_9_managebg");
        nodebg3.width = 520;
        nodebg3.height = 210;
        nodebg3.setPosition(0, nodebg2.y + nodebg2.height + 20);
        this._scrollNode.addChild(nodebg3);
        var titlebg3 = BaseBitmap.create("servant_title_bg");
        titlebg3.width = 310;
        titlebg3.setPosition(nodebg.x + nodebg3.width / 2 - titlebg3.width / 2, nodebg3.y - 15);
        this._scrollNode.addChild(titlebg3);
        var titleTxt3 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        titleTxt3.text = LanguageManager.getlocal("weapon_attribute2");
        titleTxt3.x = titlebg3.x + 40;
        titleTxt3.y = titlebg3.y + 8;
        titleTxt3.width = titlebg3.width - 80;
        titleTxt3.textAlign = egret.HorizontalAlign.CENTER;
        this._scrollNode.addChild(titleTxt3);
        for (var i = 1; i <= 8; i++) {
            var oneattr = new WeaponAttrItem();
            oneattr.init(i, this._weaponVo.id);
            this._scrollNode.addChild(oneattr);
            this._attrTab.push(oneattr);
            if (i > 4) {
                oneattr.setPosition(15 + (i - 1) % 2 * 250, nodebg2.y + Math.floor((i - 5) / 2) * 90 + 30);
            }
            else {
                oneattr.setPosition(15 + (i - 1) % 2 * 250, nodebg3.y + Math.floor((i - 1) / 2) * 90 + 30);
            }
        }
        this.resetLvText();
        this.resetInfo();
    };
    ServantWeaponNode2.prototype.clickRuleBtnHandler = function () {
        var msg = LanguageManager.getlocal("weapon_promotion_rule");
        ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW, msg);
    };
    ServantWeaponNode2.prototype.levelupBtnClickHandler = function () {
        if (this._lvupStatus > 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("weapon_levelup2_tip" + this._lvupStatus));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_WEAPON_UPABILITY, { weaponId: this._weaponVo.id });
    };
    ServantWeaponNode2.prototype.resetLvText = function () {
        this._titleTxt.text = LanguageManager.getlocal("weapon_promotion_level", [String(this._weaponVo.clv)]);
    };
    ServantWeaponNode2.prototype.resetInfo = function () {
        this._itemNode.removeChildren();
        App.DisplayUtil.changeToNormal(this._levelupBtn);
        this._lvupStatus = 0;
        this._items.length = 0;
        this._lvMaxText.visible = false;
        this._levelupBtn.visible = true;
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        if (this._weaponVo.clv >= this._weaponCfg.getMaxPromotionLv()) {
            this._lvupStatus = 2;
            var info = this._weaponCfg.getWeaponPromotionStarAndAdd(this._weaponVo.clv - 1);
            for (var i = 0; i < 4; i++) {
                this._attrIconTab[i].setInfo([info[0][i], 0, 0]);
            }
            this._lvMaxText.visible = true;
            this._levelupBtn.visible = false;
        }
        else if (this._weaponVo.clv >= this._weaponVo.lv) {
            this._lvupStatus = 3;
        }
        if (this._lvupStatus > 0) {
            App.DisplayUtil.changeToGray(this._levelupBtn);
        }
        if (this._lvupStatus == 0 || this._lvupStatus == 3) {
            var itemString = Config.ServantweaponCfg.getWeaponPromotionItemById(String(this._weaponVo.clv)).needItem;
            var itemsVo = GameData.formatRewardItem(itemString);
            var maxSize = itemsVo.length;
            for (var i = 0; i < itemsVo.length; i++) {
                var oneVo = itemsVo[i];
                var icon = GameData.getItemIcon(oneVo, true);
                icon.setScale(0.62);
                icon.getChildByName("numLb").visible = false;
                if (icon.getChildByName("numbg")) {
                    icon.getChildByName("numbg").visible = false;
                }
                icon.setPosition(53 + i * 100, 130);
                this._itemNode.addChild(icon);
                this._items.push(icon);
                var hasNum = Api.itemVoApi.getItemNumInfoVoById(oneVo.id);
                var numTxt = ComponentManager.getTextField(String(hasNum) + "/" + oneVo.num, TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
                numTxt.setPosition(icon.x + 31 - numTxt.width / 2, icon.y + 67);
                if (hasNum >= oneVo.num) {
                    numTxt.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
                }
                else {
                    if (this._lvupStatus != 3) {
                        this._lvupStatus = 1;
                    }
                    numTxt.setColor(TextFieldConst.COLOR_WARN_RED);
                    App.DisplayUtil.changeToGray(this._levelupBtn);
                }
                this._itemNode.addChild(numTxt);
            }
            this._itemNode.x = 125 - itemsVo.length * 40;
            var info = this._weaponCfg.getWeaponPromotionStarAndAdd(this._weaponVo.clv);
            for (var i = 0; i < 4; i++) {
                this._attrIconTab[i].setInfo([info[0][i], info[1][i], info[2][i]]);
            }
        }
        for (var i = 0; i < this._attrTab.length; i++) {
            this._attrTab[i].setPower();
        }
        for (var i = 0; i < this._attrTab2.length; i++) {
            this._attrTab2[i].setPower();
        }
    };
    //升级之后刷新数据
    ServantWeaponNode2.prototype.refreshInfoAfterUpdate = function (p) {
        if (p.data.ret == true) {
            Api.weaponVoApi.recentUpType = 2;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WEAPON_UPLEVEL2, [this._items.length, 167 - this._scrollview.scrollTop]);
            this.resetInfo();
            this.resetLvText();
        }
    };
    ServantWeaponNode2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPABILITY), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WEAPON_RESET, this.resetInfo, this);
        this._servantId = null;
        this._weaponVo = null;
        this._weaponCfg = null;
        this._titleTxt = null;
        this._itemNode = null;
        this._levelupBtn = null;
        this._lvupStatus = 0;
        this._scrollNode = null;
        this._attrIconTab.length = 0;
        this._items.length = 0;
        this._scrollview = null;
        this._lvMaxText = null;
        this._attrTab.length = 0;
        this._attrTab2.length = 0;
        ;
        _super.prototype.dispose.call(this);
    };
    return ServantWeaponNode2;
}(BaseDisplayObjectContainer));
//# sourceMappingURL=ServantWeaponNode2.js.map