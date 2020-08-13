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
 * author hyd
 * date 2019/8/29
 * @class AtkraceFameScrollItem
 */
var AtkraceFameScrollItem = (function (_super) {
    __extends(AtkraceFameScrollItem, _super);
    function AtkraceFameScrollItem() {
        return _super.call(this) || this;
    }
    AtkraceFameScrollItem.prototype.initItem = function (index, data, itemParam) {
        this.width = 616;
        // this.height = 200 + this.getSpaceY();
        this._data = data;
        var id = data.id;
        var fameList = Config.AtkraceCfg.getFameList();
        var maxLevel = fameList.length;
        var servantList = itemParam;
        var servantNum = 0;
        if (servantList[id] && servantList[id].length) {
            servantNum = servantList[id].length;
        }
        var bgImg = "aktracefame_scrollerbg" + (Number(id) > 9 ? Number(id) - 8 : 1);
        this._bgBB = BaseBitmap.create(bgImg);
        // this._bgBB.height = 162;
        this.addChild(this._bgBB);
        if (Number(id) <= Number(maxLevel)) {
            this.showIcons(index, data, servantList);
            var tipContainer = this.getItemTip(id, fameList, servantNum);
            this.addChild(tipContainer);
        }
        this._titleBB = this.getItemTitle(id);
        this._titleBB.x = this._bgBB.x + this._bgBB.width / 2 - this._titleBB.width / 2 + 15;
        this._titleBB.y = this._bgBB.y - 12;
        if (Number(id) > 9) {
            this._titleBB.x -= 10;
        }
        this.addChild(this._titleBB);
        //置灰
        var maxServantLv = 1;
        for (var key in servantList) {
            if (servantList.hasOwnProperty(key)) {
                var element = servantList[key][0];
                var fameLv = Number(Api.servantVoApi.getServantObj(element).fameLv);
                if (maxServantLv < fameLv) {
                    maxServantLv = fameLv;
                }
            }
        }
        if (id > maxServantLv) {
            App.DisplayUtil.changeToGray(this);
        }
    };
    AtkraceFameScrollItem.prototype.showIcons = function (index, data, servantList) {
        var itemBB = BaseBitmap.create("atkracefame_scrollitem_bg");
        itemBB.width = this.width - 25;
        itemBB.height = 130;
        itemBB.x = 14;
        itemBB.y = 25;
        this.addChild(itemBB);
        var servantIconBaseWidth = 132;
        var statusContanier = new BaseDisplayObjectContainer();
        var servantCount = 0;
        if (servantList[data.id] && servantList[data.id].length) {
            servantCount = servantList[data.id].length;
        }
        for (var index = 0; index < servantCount; index++) {
            var servantId = servantList[data.id][index];
            var servantIcon = this.getAtkraceFameIcon(data, servantId);
            // wifeIcon.setScale(0.6)
            servantIcon.x = (servantIconBaseWidth + 20) * index;
            var num = index % 4;
            servantIcon.x = 10 * (num + 1) + servantIconBaseWidth * num + 2;
            servantIcon.y = (servantIcon.height + 5) * (Math.floor((index) / 4));
            statusContanier.addChild(servantIcon);
        }
        this.addChild(statusContanier);
        statusContanier.x = this.width / 2 - statusContanier.width / 2;
        statusContanier.y = 160;
        var addH = 135 + 140 * (Math.ceil((servantCount) / 4));
        if (!addH) {
            addH = 0;
            itemBB.visible = false;
        }
        itemBB.height = addH;
        this._bgBB.height = 40 + addH;
    };
    AtkraceFameScrollItem.prototype.getAtkraceFameIcon = function (data, servantId) {
        var iconContainer = new BaseDisplayObjectContainer();
        var iconBg = BaseBitmap.create("atkracefame_headbg");
        iconBg.name = "bg2";
        iconContainer.addChild(iconBg);
        var servantInfo = Api.servantVoApi.getServantObj(servantId);
        var servantCfg = Config.ServantCfg.getServantItemById(servantId);
        var iconStr = servantInfo.halfImgPath;
        var icon = BaseLoadBitmap.create(iconStr);
        icon.setPosition(0, 5);
        icon.setScale(0.6);
        var iconMask = BaseBitmap.create("atkracefame_headmask");
        iconMask.setPosition(5, 5);
        iconContainer.addChild(iconMask);
        iconContainer.cacheAsBitmap = true;
        icon.mask = iconMask;
        iconContainer.addChild(icon);
        iconContainer.addTouchTap(this.clickItemHandler, this, [servantId]);
        var nameBg = BaseBitmap.create("wifestatus_namebg");
        nameBg.setPosition(iconContainer.width / 2 - nameBg.width / 2, 105);
        iconContainer.addChild(nameBg);
        var nameTF = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
        nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2;
        nameTF.y = nameBg.y + nameBg.height / 2 - nameTF.height / 2;
        iconContainer.addChild(nameTF);
        //红点
        if (Api.atkraceVoApi.checkServantCanUpFame(servantId)) {
            var redDotSp = BaseBitmap.create("public_dot2");
            redDotSp.x = 100;
            redDotSp.y = 10;
            iconContainer.addChild(redDotSp);
        }
        return iconContainer;
    };
    AtkraceFameScrollItem.prototype.getItemTitle = function (level) {
        level = Number(level);
        var uiNum = level > 9 ? (level - 8) : 1;
        var titleContainer = new BaseDisplayObjectContainer();
        var titleBg = BaseBitmap.create("aktracefame_scrollertitlebg" + uiNum);
        titleContainer.addChild(titleBg);
        var title = BaseBitmap.create("atkracefame_level" + level);
        titleContainer.addChild(title);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, title, titleBg);
        return titleContainer;
    };
    AtkraceFameScrollItem.prototype.getItemTip = function (level, fameCfg, servantNum) {
        level = Number(level);
        var uiNum = level > 9 ? (level - 8) : 1;
        var nowFame = Config.AtkraceCfg.getFameCfgBylevel(level);
        var attrType = nowFame.att1Type;
        var tipContainer = new BaseDisplayObjectContainer();
        var titleTipBg = BaseBitmap.create("public_9_bg79");
        titleTipBg.width = 530;
        titleTipBg.height = 32;
        //titleTipBg.x = 2;
        tipContainer.addChild(titleTipBg);
        var tipTextStr_1 = LanguageManager.getlocal('atkraceFameUpFameNeed', [nowFame.expNeed + '']);
        var tipText_1 = ComponentManager.getTextField(tipTextStr_1, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipContainer.addChild(tipText_1);
        tipText_1.setPosition(titleTipBg.x + 30, titleTipBg.y + 6);
        var tipTextStr_2 = LanguageManager.getlocal('atkraceFameServantNum', [servantNum + '']);
        var tipText_2 = ComponentManager.getTextField(tipTextStr_2, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipContainer.addChild(tipText_2);
        //todo
        tipText_2.setPosition(titleTipBg.x + titleTipBg.width - tipText_2.width - 30, tipText_1.y);
        var attrStr_3 = '+' + nowFame.att1;
        if (attrType == 2) {
            attrStr_3 = '+' + App.MathUtil.toFixed(nowFame.att1 * 100, 1) + '%';
        }
        var tipTextStr_3 = LanguageManager.getlocal('atkraceFameAllServant') + LanguageManager.getlocal('atkraceFameAddAtk', [attrStr_3]);
        var tipText_3 = ComponentManager.getTextField(tipTextStr_3, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        tipContainer.addChild(tipText_3);
        tipText_3.setPosition(titleTipBg.x + 10, titleTipBg.y + 45);
        var tipTextStr_4 = LanguageManager.getlocal('atkraceFameAddCrt', ['+' + App.MathUtil.toFixed(nowFame.att2 * 100, 1) + '%']);
        var tipText_4 = ComponentManager.getTextField(tipTextStr_4, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        tipContainer.addChild(tipText_4);
        tipText_4.setPosition(tipText_3.x + tipText_3.width + 20, tipText_3.y);
        var tipTextStr_5 = LanguageManager.getlocal('atkraceFameSingleServant') + LanguageManager.getlocal('atkraceFameAddServant', ['+' + nowFame.att3]);
        var tipText_5 = ComponentManager.getTextField(tipTextStr_5, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        tipContainer.addChild(tipText_5);
        tipText_5.setPosition(tipText_3.x, tipText_3.y + tipText_3.height + 15);
        tipContainer.setPosition(50, 40);
        return tipContainer;
    };
    AtkraceFameScrollItem.prototype.clickItemHandler = function (event, servantId) {
        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEFAMESERVANTPOPUPVIEW, { servantId: servantId, level: this._data.id });
    };
    AtkraceFameScrollItem.prototype.getSpaceY = function () {
        return -40;
    };
    AtkraceFameScrollItem.prototype.dispose = function () {
        this._data = null;
        this._bgBB = null;
        this._titleBB = null;
        _super.prototype.dispose.call(this);
    };
    return AtkraceFameScrollItem;
}(ScrollListItem));
__reflect(AtkraceFameScrollItem.prototype, "AtkraceFameScrollItem");
//# sourceMappingURL=AtkraceFameScrollItem.js.map