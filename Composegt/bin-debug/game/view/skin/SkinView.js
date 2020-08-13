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
 * 皮肤
 * author yanyuling
 * date 2018/08/13
 * @class SkinView
 */
var SkinView = (function (_super) {
    __extends(SkinView, _super);
    function SkinView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = -1;
        _this._curMyTabIdx = -1;
        _this._mySkinProTxtList = [];
        _this._skinNetData = undefined;
        return _this;
    }
    SkinView.prototype.initView = function () {
        // ViewController.getInstance().openView(ViewConst.COMMON.SKINLEVELUPVIEW,{skinId:"1011"});
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.y = -15;
        this._myNodeContainer = new BaseDisplayObjectContainer();
        // this._myNodeContainer.y = -15;
        this._myNodeContainer.visible = false;
        this.addChildToContainer(this._nodeContainer);
        var bottomBg = BaseBitmap.create("public_9v_bg03");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - 110;
        bottomBg.x = 0;
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        var innerbg = BaseBitmap.create("public_9v_bg02");
        innerbg.width = GameConfig.stageWidth - 10;
        innerbg.height = GameConfig.stageHeigth - this.container.y - 50;
        innerbg.y = bottomBg.y + 5;
        innerbg.x = 5;
        this._nodeContainer.addChild(innerbg);
        var bottom = BaseBitmap.create("chatview_bottom");
        bottom.x = GameConfig.stageWidth / 2 - bottom.width / 2;
        bottom.y = GameConfig.stageHeigth - this.container.y - bottom.height + 15; //-221;
        var topTab = [];
        if (Api.switchVoApi.checkOpenServantSkin()) {
            topTab.push("skinViewTab1");
        }
        if (!Api.switchVoApi.checkCloseWifeskin()) {
            topTab.push("skinViewTab2");
        }
        topTab.push("skinViewTab3");
        var tabbarGroup1 = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, topTab, this.tabBtnClickHandler, this);
        tabbarGroup1.x = 15; // GameConfig.stageWidth/2 -tabbarGroup1.width/2 ;
        // tabbarGroup1.y = innerbg.y - tabbarGroup1.height;
        this._nodeContainer.addChild(tabbarGroup1);
        var rectH1 = bottom.y - tabbarGroup1.y - tabbarGroup1.height + 30; // innerbg.height - 10;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, rectH1);
        this._scrollList = ComponentManager.getScrollList(SkinScrollItem, [], rect);
        this._scrollList.y = tabbarGroup1.y + tabbarGroup1.height + 5;
        this._scrollList.x = 10;
        this._nodeContainer.addChild(this._scrollList);
        //我的皮肤列表部分
        this._nodeContainer.addChild(this._myNodeContainer);
        var infobg = BaseBitmap.create("skin_myskinInfobg");
        infobg.y = this._scrollList.y; // innerbg.y;
        this._myNodeContainer.addChild(infobg);
        this._infobg = infobg;
        var tabList = [];
        if (Api.switchVoApi.checkOpenServantSkin()) {
            tabList.push("skinViewMyTab1");
        }
        if (!Api.switchVoApi.checkCloseWifeskin()) {
            tabList.push("skinViewMyTab2");
        }
        var tabbarGroup = ComponentManager.getTabBarGroup("skin_mytab1", tabList, this.tabBtnClickHandler2, this);
        tabbarGroup.setColor(0x230602, 0x230602);
        tabbarGroup.x = GameConfig.stageWidth / 2 - tabbarGroup.width / 2;
        tabbarGroup.y = infobg.y - 33;
        this._myNodeContainer.addChild(tabbarGroup);
        var skin_mytab_cover1 = BaseBitmap.create("skin_mytab_cover");
        skin_mytab_cover1.x = 8;
        skin_mytab_cover1.y = infobg.y - 2;
        this._myNodeContainer.addChild(skin_mytab_cover1);
        var skin_mytab_cover2 = BaseBitmap.create("skin_mytab_cover");
        skin_mytab_cover2.scaleX = -1;
        skin_mytab_cover2.x = GameConfig.stageWidth - skin_mytab_cover1.x;
        skin_mytab_cover2.y = skin_mytab_cover1.y;
        this._myNodeContainer.addChild(skin_mytab_cover2);
        var myskintitlebg = BaseBitmap.create("skin_mydetail_top2");
        myskintitlebg.x = GameConfig.stageWidth / 2 - myskintitlebg.width / 2;
        myskintitlebg.y = tabbarGroup.y + tabbarGroup.height - 15; //-221;
        this._myNodeContainer.addChild(myskintitlebg);
        this._mySkinTitleTxt = ComponentManager.getTextField("", 20, 0xfce6b4);
        this._mySkinTitleTxt.x = myskintitlebg.x + myskintitlebg.width / 2;
        this._mySkinTitleTxt.y = myskintitlebg.y + 4;
        this._myNodeContainer.addChild(this._mySkinTitleTxt);
        var rectH2 = bottom.y - infobg.y - infobg.height + 30;
        // GameConfig.stageHeigth - this.container.y - tabbarGroup.y - tabbarGroup.height ;
        var rect2 = new egret.Rectangle(0, 0, GameConfig.stageWidth, rectH2);
        this._myScrollList = ComponentManager.getScrollList(SkinScrollItem, [], rect2);
        this._myScrollList.y = infobg.y + infobg.height + 5;
        this._myScrollList.x = this._scrollList.x;
        this._myScrollList.setEmptyTip(LanguageManager.getlocal("skin_notOwnTip"));
        this._myNodeContainer.addChild(this._myScrollList);
        this._nodeContainer.addChild(bottomBg);
        this._nodeContainer.addChild(bottom);
        this.tabBtnClickHandler({ index: 0 });
    };
    SkinView.prototype.refreshMySkinListTopInfo = function () {
        var preIdx = this._curMyTabIdx;
        if (!Api.switchVoApi.checkOpenServantSkin() && preIdx == 0) {
            preIdx = 1;
        }
        var str1 = LanguageManager.getlocal("skinViewMyTab" + (preIdx + 1));
        var str2 = "";
        var needNum = 10;
        var addVList = [];
        if (preIdx == 0) {
            needNum = 4;
            addVList = Api.servantVoApi.getAllServantSkinAbilityAdd();
            var skinNum = Api.servantVoApi.getAllServantSkinNums();
            str2 = skinNum + "/" + Config.ServantskinCfg.getSkinMaxNum();
            this._mySkinTitleTxt.text = LanguageManager.getlocal("skin_mySkinNumTxt", [str1, str2]);
        }
        else {
            addVList = Api.wifeSkinVoApi.getAllWifeSkinProAdd();
            var skinNum = Api.wifeSkinVoApi.getWifeSkinNums();
            str2 = skinNum + "/" + Config.WifeskinCfg.getMaxLength();
        }
        this._mySkinTitleTxt.text = LanguageManager.getlocal("skin_mySkinNumTxt", [str1, str2]);
        this._mySkinTitleTxt.anchorOffsetX = this._mySkinTitleTxt.width / 2;
        var startY = this._mySkinTitleTxt.y + 30;
        var deltaY = 23;
        if (needNum == 4) {
            startY += 20;
            deltaY = 40;
        }
        for (var index = 0; index < 10; index++) {
            var txt = this._mySkinProTxtList[index];
            if (!txt) {
                txt = ComponentManager.getTextField("", 18, 0x230602);
                this._myNodeContainer.addChild(txt);
                this._mySkinProTxtList.push(txt);
            }
            if (index % 2 == 0) {
                txt.x = 100;
            }
            else {
                txt.x = 400;
            }
            txt.y = startY + Math.floor(index / 2) * deltaY;
            if (index < needNum) {
                var keyStr = "skin_myPro" + preIdx + "_" + index;
                var addProV = (addVList[index]).toFixed(0);
                if (index >= 6) {
                    keyStr = "skin_myPro" + preIdx + "_" + (index - 6);
                    addProV = (addVList[index] * 100).toFixed(0) + "%";
                }
                txt.text = LanguageManager.getlocal("skin_myPro" + preIdx + "_" + index, ["" + addProV]);
                txt.visible = true;
            }
            else {
                txt.visible = false;
            }
        }
    };
    SkinView.prototype.refreshRankList = function () {
        //刷新列表
        var list = [];
        if (this._curTabIdx == 0) {
            list = Config.ServantskinCfg.getServantSkinList();
            for (var key in list) {
                if (list.hasOwnProperty(key)) {
                    list[key]["uiType"] = 0;
                    list[key]["myown"] = undefined;
                }
            }
            this._scrollList.refreshData(list);
            this._scrollList.visible = true;
            this._myNodeContainer.visible = false;
        }
        else if (this._curTabIdx == 1) {
            list = Config.WifeskinCfg.getWifeCfgList();
            for (var key in list) {
                if (list.hasOwnProperty(key)) {
                    list[key]["uiType"] = 0;
                    list[key]["myown"] = undefined;
                }
            }
            this._scrollList.refreshData(list);
            this._scrollList.visible = true;
            this._myNodeContainer.visible = false;
        }
        else if (this._curTabIdx == 2) {
            if (this._curMyTabIdx == -1) {
                this.tabBtnClickHandler2({ index: 0 });
            }
            else {
                this.tabBtnClickHandler2({ index: this._curMyTabIdx });
            }
            this._scrollList.visible = false;
            this._myNodeContainer.visible = true;
        }
    };
    SkinView.prototype.tabBtnClickHandler2 = function (params) {
        this._curMyTabIdx = params.index;
        var list = [];
        var uiTypeV = 1;
        if (this._curMyTabIdx == 0) {
            if (Api.switchVoApi.checkOpenServantSkin()) {
                list = Config.ServantskinCfg.getServantSkinList();
                uiTypeV = 1;
            }
            else {
                list = Config.WifeskinCfg.getWifeCfgList();
                uiTypeV = 2;
            }
        }
        else {
            list = Config.WifeskinCfg.getWifeCfgList();
            uiTypeV = 2;
        }
        list.sort(function (dataA, dataB) {
            dataA["uiType"] = uiTypeV;
            dataB["uiType"] = uiTypeV;
            dataA["myown"] = 1;
            dataB["myown"] = 1;
            return Number(dataA.id) - Number(dataB.id);
        });
        var ownList = [];
        var notOwnList = [];
        for (var index = 0; index < list.length; index++) {
            var tmp = list[index];
            var id = tmp.id;
            if (uiTypeV == 1) {
                if (Api.servantVoApi.isOwnSkinOfSkinId(id)) {
                    ownList.push(tmp);
                }
                else {
                    tmp["myown"] = 1;
                    notOwnList.push(tmp);
                }
            }
            else if (uiTypeV == 2) {
                if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(id)) {
                    ownList.push(tmp);
                }
                else {
                    tmp["myown"] = 1;
                    notOwnList.push(tmp);
                }
            }
        }
        ownList = ownList.concat(notOwnList);
        this._myScrollList.refreshData(ownList);
        this.refreshMySkinListTopInfo();
    };
    SkinView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        if (!Api.switchVoApi.checkOpenServantSkin()) {
            this._curTabIdx++;
        }
        if (Api.switchVoApi.checkCloseWifeskin() && this._curTabIdx > 0) {
            this._curTabIdx++;
        }
        this.refreshRankList();
    };
    SkinView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (rData.ret == 0) {
            this._skinNetData = rData.data;
        }
    };
    SkinView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUST_CROSSSKIN_GETSKINFIRST, requestData: {} };
    };
    SkinView.prototype.getRuleInfo = function () {
        if (Api.switchVoApi.checkOpenServantSkin() && !Api.switchVoApi.checkCloseWifeskin()) {
            return "skinview_description1";
        }
        else if (Api.switchVoApi.checkOpenServantSkin()) {
            return "skinview_description3";
        }
        return "skinview_description2";
    };
    SkinView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_boxbg", "skin_boxbg2", "dragonboattarbg",
            "skin_myskinInfobg",
            "skin_mytab1_down",
            "skin_mytab1",
            "chatview_bottom", "skin_mydetail_top2", "skin_mytab_cover",
        ]);
    };
    SkinView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._myNodeContainer = null;
        this._curTabIdx = -1;
        this._scrollList = null;
        this._myScrollList = null;
        this._mySkinTitleTxt = null;
        this._curMyTabIdx = -1;
        this._skinNetData = null;
        this._mySkinProTxtList = [];
        this._infobg = null;
        _super.prototype.dispose.call(this);
    };
    return SkinView;
}(CommonView));
__reflect(SkinView.prototype, "SkinView");
