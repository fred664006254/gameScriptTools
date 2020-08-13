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
 * 我的衣装
 * author qianjun
 * date 2018/08/13
 * @class SkinView
 */
var SkinViewTab3 = (function (_super) {
    __extends(SkinViewTab3, _super);
    function SkinViewTab3() {
        var _this = _super.call(this) || this;
        _this._mySkinProTxtList = [];
        _this._infobg = null;
        _this._curMyTabIdx = -1;
        _this.initView();
        return _this;
    }
    SkinViewTab3.prototype.initView = function () {
        // ViewController.getInstance().openView(ViewConst.COMMON.SKINLEVELUPVIEW,{skinId:"1011"});
        var view = this;
        var skinView = ViewController.getInstance().getView("SkinView");
        view.width = GameConfig.stageWidth;
        view.height = skinView.getTabViewHeight();
        //我的皮肤列表部分
        view._myNodeContainer = new BaseDisplayObjectContainer();
        view.addChild(this._myNodeContainer);
        var infobg = BaseBitmap.create("skin_myskinInfobg2");
        infobg.y = 0;
        infobg.x = GameConfig.stageWidth / 2 - infobg.width / 2;
        this._myNodeContainer.addChild(infobg);
        this._infobg = infobg;
        this._mySkinTitleTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._mySkinTitleTxt.x = infobg.x + infobg.width / 2;
        this._mySkinTitleTxt.y = infobg.y + 8;
        this._myNodeContainer.addChild(this._mySkinTitleTxt);
        var tabList = [];
        if (Api.switchVoApi.checkOpenServantSkin()) {
            tabList.push("skinViewMyTab1");
        }
        if (!Api.switchVoApi.checkCloseWifeskin()) {
            tabList.push("skinViewMyTab2");
        }
        var tabbarGroup = ComponentManager.getTabBarGroup("skin_mytab1", tabList, this.tabBtnClickHandler2, this);
        tabbarGroup.x = GameConfig.stageWidth / 2 - tabbarGroup.width / 2;
        tabbarGroup.y = infobg.y + infobg.height + 1; //
        this._myNodeContainer.addChild(tabbarGroup);
        var rectH2 = view.height - tabbarGroup.y - tabbarGroup.height;
        var rect2 = new egret.Rectangle(0, 0, GameConfig.stageWidth, rectH2);
        this._myScrollList = ComponentManager.getScrollList(SkinScrollItem, [], rect2);
        this._myScrollList.y = tabbarGroup.y + tabbarGroup.height + 1;
        this._myScrollList.setEmptyTip(LanguageManager.getlocal("skin_notOwnTip"));
        this._myNodeContainer.addChild(this._myScrollList);
        this.refreshRankList();
    };
    SkinViewTab3.prototype.refreshWhenSwitchBack = function () {
        this.refreshRankList();
    };
    SkinViewTab3.prototype.refreshRankList = function () {
        if (this._curMyTabIdx == -1) {
            this.tabBtnClickHandler2({ index: 0 });
        }
        else {
            this.tabBtnClickHandler2({ index: this._curMyTabIdx });
        }
    };
    SkinViewTab3.prototype.tabBtnClickHandler2 = function (params) {
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
                    notOwnList.push(tmp);
                }
            }
            else if (uiTypeV == 2) {
                if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(id)) {
                    ownList.push(tmp);
                }
                else {
                    notOwnList.push(tmp);
                }
            }
        }
        ownList = ownList.concat(notOwnList);
        this._myScrollList.refreshData(ownList);
        this.refreshMySkinListTopInfo();
    };
    SkinViewTab3.prototype.refreshMySkinListTopInfo = function () {
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
        // let startY = this._infobg.y + 55;
        // let deltaY = 25;
        // if(needNum == 4)
        // {
        // 	startY += 30 ;
        // 	deltaY = 40;
        // }
        // for (var index = 0; index < 10; index++) {
        // 	let txt = <BaseTextField>this._mySkinProTxtList[index];
        // 	if(!txt ){
        // 		txt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
        // 		this._myNodeContainer.addChild(txt);
        // 		this._mySkinProTxtList.push(txt);
        // 	}
        // 	if(index%2 == 0)
        // 	{
        // 		txt.x = 100;
        // 	}else{
        // 		txt.x = 400;
        // 	}
        // 	txt.y = startY + Math.floor(index/2)*deltaY;
        // 	if(index < needNum)
        // 	{
        // 		let keyStr = "skin_myPro" + preIdx + "_" + index ;
        // 		let addProV = (addVList[index]).toFixed(0);
        // 		if(index >= 6)
        // 		{
        // 			 keyStr = "skin_myPro" + preIdx + "_" + (index-6) ;
        // 			 addProV = (addVList[index] *100).toFixed(0) + "%";
        // 		}
        // 		txt.text = LanguageManager.getlocal("skin_myPro" + preIdx + "_" + index,[ addProV]);
        // 		txt.visible = true;
        // 	}else{
        // 		txt.visible = false;
        // 	}
        // }
    };
    SkinViewTab3.prototype.dispose = function () {
        this._myNodeContainer = null;
        this._myScrollList = null;
        this._mySkinTitleTxt = null;
        this._mySkinProTxtList = [];
        this._infobg = null;
        this._curMyTabIdx = -1;
        _super.prototype.dispose.call(this);
    };
    return SkinViewTab3;
}(CommonViewTab));
__reflect(SkinViewTab3.prototype, "SkinViewTab3");
//# sourceMappingURL=SkinViewTab3.js.map