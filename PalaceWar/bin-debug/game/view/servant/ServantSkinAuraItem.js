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
 * 门客皮肤光环
 * author dmj
 * date 2017/9/28
 * @class ServantSelectedScrollItem
 */
var ServantSkinAuraItem = (function (_super) {
    __extends(ServantSkinAuraItem, _super);
    function ServantSkinAuraItem() {
        var _this = _super.call(this) || this;
        _this._levelbg = null;
        _this._levelTxt = null;
        _this._curEffTxt = null;
        _this._nextEffTxt = null;
        _this._needTxt = null;
        _this._btn = null;
        _this._icon = null;
        _this._itemIcon = null;
        return _this;
    }
    ServantSkinAuraItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._data = data;
        view.width = 520;
        view.height = 145 + view.getSpaceY();
        var bg = BaseBitmap.create('public_9_bg14');
        bg.width = 520;
        bg.height = view.height - view.getSpaceY();
        //public_9_managebg
        view.addChild(bg);
        //icon
        var icon = BaseLoadBitmap.create("servant_skinaura_Icon" + data.id);
        icon.width = icon.height = 108;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, bg, [12, 0]);
        view.addChild(icon);
        view._icon = icon;
        var levelbg = BaseBitmap.create('public_9_managebg');
        levelbg.width = 381;
        levelbg.height = 75;
        //public_9_managebg
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelbg, bg, [125, 15]);
        view._levelbg = levelbg;
        view.addChild(levelbg);
        var levelTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_BLACK);
        view._levelTxt = levelTxt;
        var servantCfg = Config.ServantCfg.getServantItemById(data.servantId);
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(data.skinId);
        var tmp = skincfg.aura[data.id];
        var curvalue = '0';
        var nextvalue = '0';
        var curEffTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_BLACK);
        view._curEffTxt = curEffTxt;
        var nextEffTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_BLACK);
        view._nextEffTxt = nextEffTxt;
        var needTxt = null;
        var servant = Api.servantVoApi.getServantObj(data.servantId);
        var skinvo = servant.getSkinInfobyId(data.skinId);
        var curLevel = skinvo ? skinvo.getSkinAuraLv(data.id - 1) : 0;
        if (curLevel + 1 > tmp.maxLv) {
            //提示升到满级
            needTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_WARN_RED2);
        }
        else {
            //升级所需
            needTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_BLACK);
        }
        var itemcfg = Config.ItemCfg.getItemCfgById(tmp.growNeed);
        var itemIcon = BaseLoadBitmap.create(itemcfg.icon);
        itemIcon.width = itemIcon.height = 100;
        itemIcon.setScale(0.37);
        view._itemIcon = itemIcon;
        view.addChild(itemIcon);
        var buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'servantInfoLevelup', function () {
            var haveNum = Api.itemVoApi.getItemNumInfoVoById(skincfg.aura[data.id].growNeed);
            if (servant.getOwnSkinIdList().indexOf(data.skinId) == -1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("skin_notOwnTip"));
                return;
            }
            var tmpskinvo = servant.getSkinInfobyId(data.skinId);
            var curLevel2 = tmpskinvo ? tmpskinvo.getSkinAuraLv(data.id - 1) : 0;
            if (haveNum >= tmp.growNumNeed[curLevel2]) {
                //发送消息
                NetManager.request(NetRequestConst.REQUST_SERVANT_UPSKINAURA, {
                    servantId: data.servantId,
                    skinId: data.skinId,
                    auraId: data.id,
                });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyTitle"));
            }
        }, view);
        var haveNum = Api.itemVoApi.getItemNumInfoVoById(skincfg.aura[data.id].growNeed);
        buyBtn.setGray((haveNum < tmp.growNumNeed[curLevel]) || servant.getOwnSkinIdList().indexOf(data.skinId) == -1);
        buyBtn.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, buyBtn, levelbg, [10, levelbg.height + 7]);
        view.addChild(buyBtn);
        view._btn = buyBtn;
        view._needTxt = needTxt;
        view.addChild(levelTxt);
        view.addChild(curEffTxt);
        view.addChild(nextEffTxt);
        view.addChild(needTxt);
        view.freshView();
    };
    ServantSkinAuraItem.prototype.freshBtn = function () {
        var view = this;
        var data = view._data;
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(data.skinId);
        var tmp = skincfg.aura[data.id];
        var servant = Api.servantVoApi.getServantObj(data.servantId);
        var skinvo = servant.getSkinInfobyId(data.skinId);
        var curLevel = skinvo ? skinvo.getSkinAuraLv(data.id - 1) : 0;
        var haveNum = Api.itemVoApi.getItemNumInfoVoById(skincfg.aura[data.id].growNeed);
        view._btn.setGray(haveNum < tmp.growNumNeed[curLevel] || servant.getOwnSkinIdList().indexOf(data.skinId) == -1);
    };
    ServantSkinAuraItem.prototype.refreshItem = function () {
        var view = this;
        view.freshView();
        var bookIcon = view._icon;
        var upgradeClip = ComponentManager.getCustomMovieClip("servant_book_lvup", 7, 100);
        // upgradeClip.setScale(1.3);
        upgradeClip.x = -47;
        var deltaY = -139;
        upgradeClip.y = deltaY;
        view.addChild(upgradeClip);
        upgradeClip.playWithTime(1);
        var tmpNode = view;
        egret.Tween.get(upgradeClip).wait(700).to({ y: deltaY }, 500).call(function () {
            tmpNode.removeChild(upgradeClip);
            upgradeClip = null;
        }, this);
        var servant_book_lvup_word = BaseBitmap.create("servant_book_lvup8");
        servant_book_lvup_word.anchorOffsetX = servant_book_lvup_word.width / 2;
        servant_book_lvup_word.anchorOffsetY = servant_book_lvup_word.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servant_book_lvup_word, bookIcon);
        var wordY = servant_book_lvup_word.y;
        servant_book_lvup_word.setScale(0.3);
        view.addChild(servant_book_lvup_word);
        egret.Tween.get(servant_book_lvup_word).to({ scaleX: 1, scaleY: 1 }, 160).wait(800).to({ y: wordY, alpha: 0 }, 500).call(function () {
            tmpNode.removeChild(servant_book_lvup_word);
            servant_book_lvup_word = null;
        }, this);
        var servant_book_lvup_light = BaseBitmap.create("servant_book_lvup_light");
        servant_book_lvup_light.anchorOffsetX = servant_book_lvup_light.width / 2;
        servant_book_lvup_light.anchorOffsetY = servant_book_lvup_light.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servant_book_lvup_light, bookIcon);
        view.addChild(servant_book_lvup_light);
        servant_book_lvup_light.setScale(0);
        egret.Tween.get(servant_book_lvup_light, { loop: false }).to({ scaleX: 0.3, scaleY: 0.3 }, 40).to({ scaleX: 1, scaleY: 1 }, 40).to({ scaleX: 1.4, scaleY: 0.75, alpha: 0 }, 40).call(function () {
            tmpNode.removeChild(servant_book_lvup_light);
            servant_book_lvup_light = null;
        }, this);
    };
    ServantSkinAuraItem.prototype.freshView = function () {
        var view = this;
        var data = view._data;
        var levelTxt = view._levelTxt;
        var levelbg = view._levelbg;
        var curEffTxt = view._curEffTxt;
        var nextEffTxt = view._nextEffTxt;
        var needText = view._needTxt;
        var servantCfg = Config.ServantCfg.getServantItemById(data.servantId);
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(data.skinId);
        var tmp = skincfg.aura[data.id];
        var curvalue = '0';
        var nextvalue = '0';
        var servant = Api.servantVoApi.getServantObj(data.servantId);
        var skinvo = servant.getSkinInfobyId(data.skinId);
        var curLevel = skinvo ? skinvo.getSkinAuraLv(data.id - 1) : 0;
        if (tmp.growAtt >= 1) {
            curvalue = App.MathUtil.strip(tmp.growAtt * curLevel) + '';
            nextvalue = App.MathUtil.strip(tmp.growAtt * (curLevel + 1)) + '';
        }
        else {
            var tmpnum = tmp.growAtt * 100 * curLevel;
            curvalue = App.MathUtil.strip(tmpnum) + '%';
            tmpnum = tmp.growAtt * 100 * (curLevel + 1);
            nextvalue = App.MathUtil.strip(tmpnum) + '%';
        }
        levelTxt.text = LanguageManager.getlocal('discussServantLevel', [curLevel.toString()]);
        curEffTxt.text = LanguageManager.getlocal('servantskincureff', [servantCfg.name, LanguageManager.getlocal("servantInfo_speciality" + data.id), String(TextFieldConst.COLOR_QUALITY_RED), curvalue]);
        if (curLevel + 1 > tmp.maxLv) {
            nextEffTxt.text = LanguageManager.getlocal('servantskinnextmaxlevel', [String(TextFieldConst.COLOR_BLACK)]);
            //提示升到满级
            needText.text = LanguageManager.getlocal('servantskinmaxlevel');
            needText.textColor = TextFieldConst.COLOR_WARN_RED2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, needText, levelbg, [0, levelbg.height + 15]);
            view._btn.visible = view._itemIcon.visible = false;
        }
        else {
            nextEffTxt.text = LanguageManager.getlocal('servantskinnexteff', [servantCfg.name, LanguageManager.getlocal("servantInfo_speciality" + data.id), String(TextFieldConst.COLOR_WARN_GREEN2), nextvalue]);
            //升级所需
            var itemcfg = Config.ItemCfg.getItemCfgById(tmp.growNeed);
            needText.text = LanguageManager.getlocal('servantskinlevelupneed', [String(TextFieldConst.COLOR_QUALITY_BLUE), tmp.growNumNeed[curLevel]]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, needText, levelbg, [55, levelbg.height + 15]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._itemIcon, needText, [needText.textWidth + 5, 0]);
            view._btn.visible = view._itemIcon.visible = true;
        }
        var tmpY = (levelbg.height - levelTxt.textHeight - curEffTxt.textHeight - nextEffTxt.textHeight) / 4;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelTxt, levelbg, [10, tmpY]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, curEffTxt, levelTxt, [0, levelTxt.textHeight + tmpY]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nextEffTxt, curEffTxt, [0, curEffTxt.textHeight + tmpY]);
        // if(Api.servantVoApi.isShowAuralevelUpRedForEnter(data.servantId)){
        //     App.CommonUtil.addIconToBDOC(view._btn);
        // }else{
        //     App.CommonUtil.removeIconFromBDOC(view._btn);
        // }
    };
    ServantSkinAuraItem.prototype.getSpaceY = function () {
        return 0;
    };
    ServantSkinAuraItem.prototype.dispose = function () {
        var view = this;
        view._data = null;
        view._levelbg = null;
        view._levelTxt = null;
        view._curEffTxt = null;
        view._nextEffTxt = null;
        view._needTxt = null;
        view._btn = null;
        view._icon = null;
        view._itemIcon = null;
        _super.prototype.dispose.call(this);
    };
    return ServantSkinAuraItem;
}(ScrollListItem));
__reflect(ServantSkinAuraItem.prototype, "ServantSkinAuraItem");
//# sourceMappingURL=ServantSkinAuraItem.js.map