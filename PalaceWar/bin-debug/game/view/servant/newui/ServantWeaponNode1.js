/**
 * 门客新UI 神器下部1
 * 神器锻造
 * author shaoliang
 * date 2019/7/31
 * @class ServantWeaponNode1
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
var ServantWeaponNode1 = (function (_super) {
    __extends(ServantWeaponNode1, _super);
    function ServantWeaponNode1() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._weaponVo = null;
        _this._weaponCfg = null;
        _this._titleTxt = null;
        _this._itemNode = null;
        _this._items = [];
        _this._checkFlag = null;
        _this._lvupStatus = 0; // 0 可以锻造 1道具不足可以升 2道具不足不能升 3 神器等级最大  4 不能超过门客等级
        //升级按钮
        _this._upNode = null;
        _this._lvMaxText = null;
        return _this;
    }
    ServantWeaponNode1.prototype.init = function (servantId, bottomH) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADE), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADETEN), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WEAPON_RESET, this.resetInfo, this);
        this._servantId = servantId;
        this._weaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(servantId);
        this._weaponCfg = Config.ServantweaponCfg.getWeaponItemByServantId(servantId);
        var nodebg = BaseBitmap.create("public_9_managebg");
        nodebg.width = 520;
        nodebg.height = bottomH - 50;
        nodebg.setPosition(95, 34);
        this.addChild(nodebg);
        if (nodebg.height > 300) {
            nodebg.height = 300;
        }
        var titlebg = BaseBitmap.create("servant_title_bg");
        titlebg.width = 310;
        titlebg.setPosition(nodebg.x + nodebg.width / 2 - titlebg.width / 2, 20);
        this.addChild(titlebg);
        var titleTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        titleTxt.x = titlebg.x + 40;
        titleTxt.y = titlebg.y + 8;
        titleTxt.width = titlebg.width - 80;
        titleTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(titleTxt);
        this._titleTxt = titleTxt;
        // let ruleBtn = ComponentManager.getButton("btn_rule","",this.clickRuleBtnHandler,this);
        // ruleBtn.setPosition(418,6);
        // ruleBtn.setScale(0.8);
        // this.addChild(ruleBtn);
        var itembg = BaseLoadBitmap.create("public_consume_bg");
        itembg.width = nodebg.width;
        itembg.height = 150;
        itembg.setPosition(nodebg.x, nodebg.y + 70);
        this.addChild(itembg);
        this._itemNode = new BaseDisplayObjectContainer();
        this._itemNode.x = nodebg.x;
        this._itemNode.y = nodebg.y;
        this.addChild(this._itemNode);
        this._upNode = new BaseDisplayObjectContainer();
        this.addChild(this._upNode);
        //勾选底
        var probg = BaseBitmap.create("hold_dinner_box");
        probg.x = nodebg.x + 350;
        probg.y = nodebg.y + 100;
        this._upNode.addChild(probg);
        //连升十级
        var tenTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        tenTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        tenTxt.text = LanguageManager.getlocal("weaponInfo_tenTips");
        tenTxt.width = 130;
        tenTxt.x = probg.x + 40;
        tenTxt.y = probg.y + 10;
        this._upNode.addChild(tenTxt);
        this._checkFlag = BaseLoadBitmap.create("hold_dinner_check");
        this._checkFlag.width = this._checkFlag.height = 38;
        this._checkFlag.x = probg.x;
        this._checkFlag.y = probg.y;
        this._checkFlag.alpha = ServantInfoView.WALPHA;
        this._upNode.addChild(this._checkFlag);
        this._checkFlag.addTouchTap(this.changeCheckFlagStatus, this);
        var levelupBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "weapon_forge", this.levelupBtnClickHandler, this);
        levelupBtn.x = probg.x;
        levelupBtn.y = probg.y + 43;
        levelupBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._upNode.addChild(levelupBtn);
        this._levelupBtn = levelupBtn;
        this._lvMaxText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._lvMaxText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this._lvMaxText.text = LanguageManager.getlocal("weapon_levelmax_tip1");
        this._lvMaxText.width = nodebg.width;
        this._lvMaxText.textAlign = egret.HorizontalAlign.CENTER;
        this._lvMaxText.lineSpacing = 5;
        this._lvMaxText.x = nodebg.x;
        this._lvMaxText.y = itembg.y + itembg.height / 2 - this._lvMaxText.height / 2;
        this.addChild(this._lvMaxText);
        var gainTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        gainTxt.textColor = TextFieldConst.COLOR_BROWN;
        gainTxt.text = LanguageManager.getlocal("weapon_gain_res_tip");
        gainTxt.width = nodebg.width;
        gainTxt.textAlign = egret.HorizontalAlign.CENTER;
        gainTxt.x = nodebg.x;
        gainTxt.y = nodebg.y + 35;
        this.addChild(gainTxt);
        this.resetLvText();
        this.resetInfo();
    };
    ServantWeaponNode1.prototype.clickRuleBtnHandler = function () {
        var msg = LanguageManager.getlocal("weapon_upgrade_rule");
        ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW, msg);
    };
    ServantWeaponNode1.prototype.levelupBtnClickHandler = function () {
        Api.rookieVoApi.checkNextStep();
        if (this._lvupStatus > 1) {
            Api.rookieVoApi.removeWaitingGuide();
            App.CommonUtil.showTip(LanguageManager.getlocal("weapon_levelup_tip" + (this._lvupStatus - 1)));
            return;
        }
        if (this._checkFlag.alpha == 0) {
            NetManager.request(NetRequestConst.REQUEST_WEAPON_UPGRADE, { weaponId: this._weaponVo.id });
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_WEAPON_UPGRADETEN, { weaponId: this._weaponVo.id });
        }
    };
    ServantWeaponNode1.prototype.resetLvText = function () {
        this._titleTxt.text = LanguageManager.getlocal("weapon_level", [String(this._weaponVo.lv)]);
    };
    ServantWeaponNode1.prototype.resetInfo = function () {
        this._itemNode.removeChildren();
        App.DisplayUtil.changeToNormal(this._levelupBtn);
        this._lvupStatus = 0;
        this._items.length = 0;
        this._lvMaxText.visible = false;
        this._upNode.visible = true;
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        if (this._weaponVo.lv >= this._weaponCfg.getMaxLv()) {
            this._lvupStatus = 3;
            this._upNode.visible = false;
            this._lvMaxText.visible = true;
        }
        else if (this._weaponVo.lv >= servantInfoObj.level) {
            this._lvupStatus = 4;
        }
        if (this._lvupStatus > 0) {
            App.DisplayUtil.changeToGray(this._levelupBtn);
        }
        if (this._lvupStatus == 0 || this._lvupStatus == 4) {
            var itemString = "";
            var targetLv = this._weaponVo.lv + 1;
            if (this._checkFlag.alpha == 1) {
                targetLv = this._weaponVo.lv + 10;
            }
            if (targetLv >= this._weaponCfg.getMaxLv()) {
                targetLv = this._weaponCfg.getMaxLv();
            }
            // if (this._lvupStatus != 4 &&  targetLv >= servantInfoObj.level)
            // {
            //     targetLv = servantInfoObj.level;
            // }
            for (var i = this._weaponVo.lv; i < targetLv; i++) {
                if (itemString) {
                    itemString += "|";
                }
                itemString += Config.ServantweaponCfg.weaponLv[String(i)].needItem;
            }
            var itemsVo = GameData.formatRewardItem(itemString);
            var newItemsVo = [];
            //去重
            for (var i = 0; i < itemsVo.length; i++) {
                var oneVo = itemsVo[i];
                var had = false;
                for (var j = 0; j < newItemsVo.length; j++) {
                    var otherVo = newItemsVo[j];
                    if (oneVo.id == otherVo.id) {
                        had = true;
                        otherVo.num += oneVo.num;
                        break;
                    }
                }
                if (had == false) {
                    newItemsVo.push(oneVo);
                }
            }
            for (var i = 0; i < newItemsVo.length; i++) {
                var oneVo = newItemsVo[i];
                var icon = GameData.getItemIcon(oneVo, true);
                icon.setScale(0.62);
                icon.getChildByName("numLb").visible = false;
                if (icon.getChildByName("numbg")) {
                    icon.getChildByName("numbg").visible = false;
                }
                icon.setPosition(53 + i * 100, 103);
                this._itemNode.addChild(icon);
                this._items.push(icon);
                var hasNum = Api.itemVoApi.getItemNumInfoVoById(oneVo.id);
                var numTxt = ComponentManager.getTextField(String(hasNum) + "/" + oneVo.num, TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
                numTxt.setPosition(icon.x + 33 - numTxt.width / 2, icon.y + 67);
                if (hasNum >= oneVo.num) {
                    numTxt.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
                }
                else {
                    if (this._lvupStatus != 4) {
                        this._lvupStatus = 1;
                    }
                    numTxt.setColor(TextFieldConst.COLOR_WARN_RED);
                }
                this._itemNode.addChild(numTxt);
            }
            this._itemNode.x = 215 - newItemsVo.length * 40;
            if (this._lvupStatus == 1) {
                var onelvitemString = Config.ServantweaponCfg.weaponLv[String(this._weaponVo.lv)].needItem;
                var onelvitemsVo = GameData.formatRewardItem(onelvitemString);
                for (var i = 0; i < onelvitemsVo.length; i++) {
                    var oneVo = onelvitemsVo[i];
                    var hasNum = Api.itemVoApi.getItemNumInfoVoById(oneVo.id);
                    if (hasNum < oneVo.num) {
                        this._lvupStatus = 2;
                        App.DisplayUtil.changeToGray(this._levelupBtn);
                    }
                }
            }
        }
    };
    ServantWeaponNode1.prototype.changeCheckFlagStatus = function () {
        this._checkFlag.alpha = (this._checkFlag.alpha + 1) % 2;
        ServantInfoView.WALPHA = this._checkFlag.alpha;
        // if (this._checkFlag.alpha == 1){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_tenTips2"));
        // }
        this.resetInfo();
    };
    //升级之后刷新数据
    ServantWeaponNode1.prototype.refreshInfoAfterUpdate = function (p) {
        if (p.data.ret == true) {
            //发送通知播放动画，需要传参数，爆点的位置和数量
            Api.weaponVoApi.recentUpType = 1;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WEAPON_UPLEVEL2, [this._items.length, 150]);
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WEAPON_RESET);
            this.resetLvText();
        }
    };
    ServantWeaponNode1.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADE), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADETEN), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WEAPON_RESET, this.resetInfo, this);
        this._servantId = null;
        this._weaponVo = null;
        this._weaponCfg = null;
        this._titleTxt = null;
        this._itemNode = null;
        this._checkFlag = null;
        this._levelupBtn = null;
        this._lvupStatus = 0;
        this._items.length = 0;
        this._upNode = null;
        this._lvMaxText = null;
        _super.prototype.dispose.call(this);
    };
    return ServantWeaponNode1;
}(BaseDisplayObjectContainer));
__reflect(ServantWeaponNode1.prototype, "ServantWeaponNode1");
//# sourceMappingURL=ServantWeaponNode1.js.map