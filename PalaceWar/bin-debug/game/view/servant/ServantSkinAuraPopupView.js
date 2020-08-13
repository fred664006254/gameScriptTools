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
 * 皮肤光环详情
 * author qianjun
 */
var ServantSkinAuraPopupView = (function (_super) {
    __extends(ServantSkinAuraPopupView, _super);
    function ServantSkinAuraPopupView() {
        var _this = _super.call(this) || this;
        _this._servantNpc = null;
        _this._skinNameBg = null;
        _this._skinNameTxt = null;
        _this._attrBg = null;
        _this._bottombg = null;
        _this._skinAddTxt1 = null;
        _this._skinAddTxt2 = null;
        _this._skinAddTxt3 = null;
        _this._skinAddTxt4 = null;
        _this._haveTxt = null;
        _this._list = null;
        _this._curSkinId = '';
        _this._itemIcon = null;
        _this._skinArr = [];
        _this._switchDelta = 500;
        _this._infoGroup = null;
        _this._tipTxt = null;
        return _this;
    }
    ServantSkinAuraPopupView.prototype.initView = function () {
        var view = this;
        var data = view.param.data;
        var servantId = data.servantId;
        var skinId = data.skinId;
        view._curSkinId = data.skinId;
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var itemcfg = Config.ItemCfg.getItemCfgById(skincfg.aura[1].growNeed);
        var servantSkinList = Config.ServantskinCfg.getIdListBySerVantId(servantId); //[skinId,skinId]
        var servantCfg = Config.ServantCfg.getServantItemById(servantId);
        // 门客变换和计谋变化
        // App.MessageHelper.addEventListener('levelup', view.rerfreshLevelUp, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_SERVANT_UPSKINAURA, view.rerfreshLevelUp, this);
        var bg = BaseBitmap.create("servantskinaurabg");
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        view.addChildToContainer(bg);
        var npc = BaseLoadBitmap.create("");
        npc.width = 405;
        npc.height = 467;
        npc.setScale(232 / 405);
        npc.mask = new egret.Rectangle(0, 0, 640, 350);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, npc, bg, [25, 0]);
        view.addChildToContainer(npc);
        view._servantNpc = npc;
        var infoGroup = new BaseDisplayObjectContainer();
        infoGroup.width = 217;
        infoGroup.height = 212;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, infoGroup, bg, [62, 0]);
        view.addChildToContainer(infoGroup);
        view._infoGroup = infoGroup;
        var namebg = BaseBitmap.create('skin_detail_namebg');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, namebg, infoGroup, [0, -10], true);
        infoGroup.addChild(namebg);
        view._skinNameBg = namebg;
        var skinNameStr = ComponentManager.getTextField('', 24, TextFieldConst.COLOR_QUALITY_ORANGE); //
        skinNameStr.lineSpacing = 5;
        skinNameStr.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinNameStr, namebg, [0, 44.5]);
        infoGroup.addChild(skinNameStr);
        view._skinNameTxt = skinNameStr;
        var attrbg = BaseBitmap.create('public_9_downbg');
        attrbg.width = 220;
        attrbg.height = 106;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, attrbg, namebg, [0, namebg.height + 13]);
        infoGroup.addChild(attrbg);
        view._attrBg = attrbg;
        for (var i = 1; i < 5; ++i) {
            var addTxt = ComponentManager.getTextField('', 18, TextFieldConst.COLOR_QUALITY_YELLOW); //
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, addTxt, attrbg, [20, 12 + (i - 1) * 22]);
            infoGroup.addChild(addTxt);
            view["_skinAddTxt" + i] = addTxt;
        }
        var listbg = BaseBitmap.create('public_9_probiginnerbg');
        listbg.width = 530;
        listbg.height = 585;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, bg, [0, bg.height]);
        view.addChildToContainer(listbg);
        var itemRect = new egret.Rectangle(0, 0, listbg.width - 10, listbg.height - 5);
        var scrollList = ComponentManager.getScrollList(ServantSkinAuraItem, null, itemRect);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg);
        view.addChildToContainer(scrollList);
        view._list = scrollList;
        var bottombg = BaseBitmap.create("public_9_bg1");
        bottombg.width = 530;
        bottombg.height = 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bottombg, bg, [0, 800]);
        view.addChildToContainer(bottombg);
        view._bottombg = bottombg;
        var haveNum = 0;
        var haveTxt = ComponentManager.getTextField('', 22, TextFieldConst.COLOR_LIGHT_YELLOW); //
        view.addChildToContainer(haveTxt);
        var itemIcon = BaseLoadBitmap.create(itemcfg.icon);
        itemIcon.width = itemIcon.height = 100;
        itemIcon.setScale(0.37);
        view._itemIcon = itemIcon;
        view.addChildToContainer(itemIcon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, haveTxt, bottombg);
        view._haveTxt = haveTxt;
        var arrow_leftBtn = ComponentManager.getButton("btn_leftpage", "", view.switchHandler, view, ["left"]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, arrow_leftBtn, bg, [10, 0]);
        view.addChildToContainer(arrow_leftBtn);
        var arrow_rightBtn = ComponentManager.getButton("btn_leftpage", "", view.switchHandler, view, ["right"]);
        arrow_rightBtn.anchorOffsetX = arrow_rightBtn.width / 2;
        arrow_rightBtn.scaleX = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, arrow_rightBtn, bg, [10, 0]);
        view.addChildToContainer(arrow_rightBtn);
        if (servantSkinList && servantSkinList.length > 1) {
            arrow_leftBtn.visible = arrow_rightBtn.visible = true;
            view._skinArr = [];
            view._skinArr = Api.chatVoApi.arr_clone(servantSkinList);
        }
        else {
            arrow_leftBtn.visible = arrow_rightBtn.visible = false;
        }
        view.container.mask = new egret.Rectangle(GameData.popupviewOffsetX, 0, 570 + GameData.popupviewOffsetX, GameConfig.stageHeigth);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinTip", [itemcfg.name]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt, bottombg, [-10, bottombg.height + 25]);
        view.addChildToContainer(tipTxt);
        view._tipTxt = tipTxt;
        view.freshView();
    };
    ServantSkinAuraPopupView.prototype.switchHandler = function (param) {
        var view = this;
        var curS = egret.getTimer();
        if (curS - view._switchDelta < 300) {
            return;
        }
        view._switchDelta = curS;
        var newserId = "";
        var arr = view._skinArr;
        var len = arr.length;
        for (var index = 0; index < len; index++) {
            if (arr[index] == view._curSkinId) {
                if (param == "left") {
                    if (index == 0) {
                        newserId = arr[len - 1];
                    }
                    else {
                        newserId = arr[index - 1];
                    }
                }
                else if (param == "right") {
                    if (index == len - 1) {
                        newserId = arr[0];
                    }
                    else {
                        newserId = arr[index + 1];
                    }
                }
                break;
            }
        }
        // if(newserId && newserId == view._curSkinId){
        // 	return;
        // }	
        view._curSkinId = newserId;
        // this.refreshBaseUIInfo(); //刷新重置id后的基础文本信息& 按钮状态
        var tmpX = view._servantNpc.x;
        var tarPosX1 = tmpX + 180;
        var tarPosX2 = tmpX - 180;
        if (param == "left") {
            tarPosX1 = tmpX - 180;
            tarPosX2 = tmpX + 180;
        }
        egret.Tween.get(view._infoGroup).to({ alpha: 0 }, 100).
            wait(200).
            to({ alpha: 1 }, 200).
            call(function () {
            egret.Tween.removeTweens(view._infoGroup);
        }, view);
        egret.Tween.get(view._servantNpc).to({ x: tarPosX1, alpha: 0 }, 200).
            wait(100).
            call(view.freshView, view).
            set({ x: tarPosX2 }).
            to({ x: tmpX, alpha: 1 }, 200).
            call(function () {
            egret.Tween.removeTweens(view._servantNpc);
        }, view);
    };
    ServantSkinAuraPopupView.prototype.freshView = function () {
        var view = this;
        var skinId = view._curSkinId;
        var namebg = view._skinNameBg;
        var skinNameStr = view._skinNameTxt;
        var attrbg = view._attrBg;
        view._servantNpc.setload("skin_full_" + skinId);
        var srvantCfg = Config.ServantCfg.getServantItemById(view.param.data.servantId);
        skinNameStr.text = LanguageManager.getlocal("servantSkinName" + skinId) + '\n' + ("<font color =0xffffff>" + srvantCfg.name + "</font>");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinNameStr, namebg, [0, 34.5]);
        var cfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        for (var i = 1; i < 5; ++i) {
            var value = '0';
            var servant = Api.servantVoApi.getServantObj(view.param.data.servantId);
            var skinvo = servant.getSkinInfobyId(skinId);
            var curLevel = skinvo ? skinvo.getSkinAuraLv(Number(i) - 1) : 0;
            if (cfg.aura[i].growAtt >= 1) {
                var tmp = cfg.aura[i].growAtt * curLevel;
                value = App.MathUtil.strip(tmp) + '';
            }
            else {
                var tmp = cfg.aura[i].growAtt * 100 * curLevel;
                value = App.MathUtil.strip(tmp) + '%';
            }
            view["_skinAddTxt" + i].text = LanguageManager.getlocal("servantSkinAuraAdd" + i, [String(0xffffff), value]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.left, view["_skinAddTxt" + i], attrbg, [20]);
        }
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var haveNum = Api.itemVoApi.getItemNumInfoVoById(skincfg.aura[1].growNeed);
        var itemcfg = Config.ItemCfg.getItemCfgById(skincfg.aura[1].growNeed);
        view._haveTxt.text = LanguageManager.getlocal('servantskinhave', [haveNum.toString()]);
        view._itemIcon.setload(itemcfg.icon);
        var tmpX = (view._bottombg.width - view._haveTxt.textWidth - view._itemIcon.width * view._itemIcon.scaleX - 10) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._haveTxt, view._bottombg, [tmpX, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._itemIcon, view._haveTxt, [view._haveTxt.textWidth + 10, 0]);
        var arr = [];
        for (var i = 1; i < 5; ++i) {
            arr.push({
                id: i,
                skinId: skinId,
                servantId: view.param.data.servantId
            });
        }
        view._list.refreshData(arr);
        view._tipTxt.text = LanguageManager.getlocal("servantSkinTip", [itemcfg.name]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view._tipTxt, view._bottombg, [-10, view._bottombg.height + 25]);
    };
    ServantSkinAuraPopupView.prototype.rerfreshLevelUp = function (evt) {
        var view = this;
        var index = evt.data.data.data.auraId;
        for (var i = 0; i < 4; ++i) {
            var item = view._list.getItemByIndex(i);
            item.freshBtn();
            if (i == (index - 1)) {
                item.refreshItem();
            }
        }
        var skinId = view._curSkinId;
        var cfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var value = '0';
        var servant = Api.servantVoApi.getServantObj(view.param.data.servantId);
        var skinvo = servant.getSkinInfobyId(skinId);
        var curLevel = skinvo ? skinvo.getSkinAuraLv(Number(index) - 1) : 0;
        if (cfg.aura[index].growAtt >= 1) {
            var tmp = cfg.aura[index].growAtt * curLevel;
            value = App.MathUtil.strip(tmp) + '';
        }
        else {
            var tmp = cfg.aura[index].growAtt * 100 * curLevel;
            value = App.MathUtil.strip(tmp) + '%';
        }
        view["_skinAddTxt" + index].text = LanguageManager.getlocal("servantSkinAuraAdd" + index, [String(0xffffff), value]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.left, view["_skinAddTxt" + index], view._attrBg, [20]);
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var haveNum = Api.itemVoApi.getItemNumInfoVoById(skincfg.aura[1].growNeed);
        var itemcfg = Config.ItemCfg.getItemCfgById(skincfg.aura[1].growNeed);
        view._haveTxt.text = LanguageManager.getlocal('servantskinhave', [haveNum.toString()]);
        var tmpX = (view._bottombg.width - view._haveTxt.textWidth - view._itemIcon.width * view._itemIcon.scaleX - 10) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._haveTxt, view._bottombg, [tmpX, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._itemIcon, view._haveTxt, [view._haveTxt.textWidth + 10, 0]);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA);
    };
    ServantSkinAuraPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'servantskinaurabg', 'skin_detail_namebg', 'servant_book_lvup', 'servant_book_lvup8', 'servant_book_lvup_light'
        ]);
    };
    ServantSkinAuraPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    ServantSkinAuraPopupView.prototype.getShowHeight = function () {
        return 910 + 10;
    };
    // protected getShowWidth():number{
    //     return 570;
    // }
    ServantSkinAuraPopupView.prototype.getTitleStr = function () {
        return 'servantskinaura';
    };
    ServantSkinAuraPopupView.prototype.dispose = function () {
        var view = this;
        BaseLoadBitmap.release(view._servantNpc);
        view._servantNpc = null;
        BaseLoadBitmap.release(view._itemIcon);
        view._itemIcon = null;
        view._skinNameBg = null;
        view._skinNameTxt = null;
        view._attrBg = null;
        view._bottombg = null;
        view._skinAddTxt1 = null;
        view._skinAddTxt2 = null;
        view._skinAddTxt3 = null;
        view._skinAddTxt4 = null;
        view._haveTxt = null;
        view._list = null;
        App.MessageHelper.removeEventListener('levelup', view.rerfreshLevelUp, view);
        view._skinArr = [];
        view._switchDelta = 0;
        view._infoGroup = null;
        view._tipTxt = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_SERVANT_UPSKINAURA, view.rerfreshLevelUp, this);
        _super.prototype.dispose.call(this);
    };
    return ServantSkinAuraPopupView;
}(PopupView));
__reflect(ServantSkinAuraPopupView.prototype, "ServantSkinAuraPopupView");
//# sourceMappingURL=ServantSkinAuraPopupView.js.map