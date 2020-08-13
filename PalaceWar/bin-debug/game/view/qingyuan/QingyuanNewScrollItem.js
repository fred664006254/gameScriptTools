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
 * 情缘 new item
 * author ycg
 * date 2020.4.7
 */
var QingyuanNewScrollItem = (function (_super) {
    __extends(QingyuanNewScrollItem, _super);
    function QingyuanNewScrollItem() {
        var _this = _super.call(this) || this;
        _this._bg = null;
        _this._roleGroup = null;
        _this._data = null;
        _this._tabbarGroup = null;
        _this.selectedTabIndex = 0;
        _this.tabViewData = [];
        _this.lastSelectedTabIndex = 0;
        _this._tabViewHeigth = 0;
        return _this;
    }
    QingyuanNewScrollItem.prototype.getRoleRes = function (reward) {
        var rewardvo = GameData.formatRewardItem(reward)[0];
        if (rewardvo.type == 8) {
            //门客
            var cfg = Config.ServantCfg.getServantItemById(rewardvo.id);
            var imgStr = cfg.fullIcon;
            return { img: imgStr, w: 405, h: 467, scale: 0.45 };
        }
        else if (rewardvo.type == 10) {
            //红颜
            var cfg = Config.WifeCfg.getWifeCfgById(rewardvo.id);
            var imgStr = cfg.body;
            return { img: imgStr, w: 640, h: 840, scale: 0.25 };
        }
        else if (rewardvo.type == 16) {
            //红颜皮肤
            var cfg = Config.WifeskinCfg.getWifeCfgById(rewardvo.id);
            var imgStr = cfg.body;
            return { img: imgStr, w: 640, h: 840, scale: 0.25 };
        }
        else if (rewardvo.type == 19) {
            //门客皮肤
            var cfg = Config.ServantskinCfg.getServantSkinItemById(rewardvo.id);
            var imgStr = cfg.body;
            return { img: imgStr, w: 405, h: 467, scale: 0.45 };
        }
    };
    QingyuanNewScrollItem.prototype.initItem = function (index, data, param) {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ENCOUNTER_ACTIVATE, this.activateCallback, this);
        var view = this;
        view._data = data;
        this.width = GameConfig.stageWidth;
        var bg = BaseBitmap.create("qingyuannew_itembg");
        view.addChild(bg);
        bg.x = GameConfig.stageWidth / 2 - bg.width / 2;
        bg.y = 5;
        this._bg = bg;
        var roleBgImg = "qingyuannew_rolebg1";
        if (param && param.kind) {
            roleBgImg = "qingyuannew_rolebg" + param.kind;
        }
        var roleBg = BaseBitmap.create(roleBgImg);
        roleBg.setPosition(bg.x + bg.width / 2 - roleBg.width / 2, bg.y + 12);
        view.addChild(roleBg);
        var rolegroup = new BaseDisplayObjectContainer();
        rolegroup.width = roleBg.width;
        rolegroup.height = roleBg.height;
        rolegroup.x = bg.x + bg.width / 2 - rolegroup.width / 2;
        rolegroup.y = bg.y + 12;
        rolegroup.name = "rolegroup";
        rolegroup.mask = new egret.Rectangle(0, 0, rolegroup.width, rolegroup.height - 10 + 2);
        view.addChild(rolegroup);
        view._roleGroup = rolegroup;
        App.LogUtil.log("initItem data ", data.need);
        var type = data.type;
        for (var i in data.need) {
            var unit = data.need[i];
            var rewardvo = GameData.formatRewardItem(unit)[0];
            var str = "";
            var id = rewardvo.id;
            var info = Api.encounterVoApi.getNeedInfo(data.type, id.toString());
            // let role = BaseBitmap.create(`${type}role${id}`); 
            // let poscfg = data.coordinateOutside[id];
            // role.x = poscfg.x;
            // role.y = poscfg.y;
            // role.mask = new egret.Rectangle(0,0,role.width,357);
            // rolegroup.addChild(role);
            // role.name = `role${Number(i) + 1}`;
            // role.setScale(0.7);//0.7
            var roleData = this.getRoleRes(unit);
            var role = BaseLoadBitmap.create(roleData.img);
            role.width = roleData.w;
            role.height = roleData.h;
            var poscfg = data.coordinateOutside[id];
            role.x = poscfg.x;
            role.y = poscfg.y;
            // role.mask = new egret.Rectangle(0,0,role.width,357);
            rolegroup.addChild(role);
            role.name = "role" + (Number(i) + 1);
            role.setScale(roleData.scale);
            if (info.isopen) {
                //已解锁
                // if (data.collect.length > 0){
                //     if(info.have && Api.encounterVoApi.getActiveBuffIndex(data.type, Number(i) + 1)){
                //         App.DisplayUtil.changeToNormal(role);
                //     }
                //     else{
                //         App.DisplayUtil.changeToAlpha(role);
                //     }
                // }
                // else{
                //     if (info.have){
                //         App.DisplayUtil.changeToNormal(role);
                //     }
                // }
                if (info.have) {
                    App.DisplayUtil.changeToNormal(role);
                }
                else {
                    App.DisplayUtil.changeToAlpha(role);
                }
            }
            else {
                App.DisplayUtil.changeToBlack(role);
            }
        }
        var textSize = 16;
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang() || PlatformManager.checkIsThSp()) {
            textSize = 14;
        }
        if (!PlatformManager.checkIsThSp()) {
            for (var i in data.need) {
                var unit = data.need[i];
                var rewardvo = GameData.formatRewardItem(unit)[0];
                var id = rewardvo.id;
                var info = Api.encounterVoApi.getNeedInfo(data.type, id.toString());
                if (info.isopen) {
                    var descbg = BaseBitmap.create("qingyuanrolenamebg");
                    var nametxt = ComponentManager.getTextField(rewardvo.name, textSize, TextFieldConst.COLOR_LIGHT_YELLOW);
                    descbg.width = nametxt.width + 34;
                    var poscfg = data.coordinateName[id];
                    descbg.x = poscfg.x - descbg.width / 2;
                    descbg.y = poscfg.y;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nametxt, descbg);
                    rolegroup.addChild(descbg);
                    rolegroup.addChild(nametxt);
                    if (data.task.length > 0) {
                        // nametxt.size = 16;
                        var attrNum = Api.encounterVoApi.getAttrById(unit, data.task[0].type);
                        var attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("qingyuanattrtype" + data.task[0].type, ["" + attrNum]), textSize, TextFieldConst.COLOR_WARN_GREEN);
                        rolegroup.addChild(attrTxt);
                        attrTxt.textAlign = TextFieldConst.ALIGH_CENTER;
                        descbg.height = nametxt.height + attrTxt.height + 20;
                        descbg.width = (nametxt.width > attrTxt.width ? nametxt.width : attrTxt.width) + 34;
                        descbg.x = poscfg.x - descbg.width / 2;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nametxt, descbg, [0, 8]);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, attrTxt, descbg, [0, 8]);
                    }
                }
            }
        }
        // let group = new BaseDisplayObjectContainer();
        // view.addChild(group);
        // view._reddotgroup = group;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, group, view, [0,30], true);
        var qingyuanNameBg = BaseBitmap.create("qingyuannew_qingyuannamebg");
        qingyuanNameBg.setPosition(roleBg.x, roleBg.y);
        this.addChild(qingyuanNameBg);
        // let currHaveKey = "qingyuantaskprocess1";
        var roleHaveNum = Api.encounterVoApi.getCurrHaveNum(data.type);
        var roleMaxLen = data.need.length;
        // if (roleHaveNum >= roleMaxLen){
        //     currHaveKey = "qingyuantaskprocess2";
        // }
        var currHaveStr = LanguageManager.getlocal("qingyuanCollectProcess", ["" + roleHaveNum, "" + roleMaxLen]);
        var qingyuanName = ComponentManager.getTextField(LanguageManager.getlocal("qingyuantitlename" + data.type) + currHaveStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        qingyuanName.setPosition(qingyuanNameBg.x + 15, qingyuanNameBg.y + qingyuanNameBg.height / 2 - qingyuanName.height / 2 + 1);
        this.addChild(qingyuanName);
        var reddot = BaseBitmap.create("qingyuannew_newflag");
        this.addChild(reddot);
        reddot.visible = Api.encounterVoApi.checkRedByType(data.type);
        reddot.setPosition(roleBg.x + roleBg.width - reddot.width + 8, roleBg.y - 13);
        var flag = BaseBitmap.create("qingyuannew_itemflag");
        flag.setPosition(roleBg.x - 23, roleBg.y - 21);
        this.addChild(flag);
        if (data.collect.length > 0 && data.task.length > 0) {
            App.LogUtil.log("tabgroup ******");
            var textArr = ["qingyuantabname1", "qingyuantabname2"];
            var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN2_TAB, textArr, this.clickTabbarHandler, this);
            this.addChild(tabbarGroup);
            tabbarGroup.setSpace(0);
            tabbarGroup.setPosition(roleBg.x, roleBg.y + roleBg.height);
            this._tabbarGroup = tabbarGroup;
            // this._tabbarGroup.setColor(0xe1ba86,0x472c26);
            if (data.tabIndex) {
                this.selectedTabIndex = Number(data.tabIndex) - 1;
                this._tabbarGroup.selectedIndex = this.selectedTabIndex;
            }
            this.changeTab();
            var offH = roleBg.height + tabbarGroup.height + this._tabViewHeigth + 50;
            bg.height = offH > bg.height ? offH : bg.height;
            this.freshTabBarRed();
        }
        else {
            var viewName = "QingyuanNewItemRewardTab1";
            if (data.task.length > 0) {
                viewName = "QingyuanNewItemRewardTab2";
            }
            App.LogUtil.log("viewName " + viewName);
            var tabveiwClass = egret.getDefinitionByName(viewName);
            var tabView = new tabveiwClass({ data: this._data });
            tabView.setPosition(this.width / 2 - tabView.width / 2, roleBg.y + roleBg.height + 15);
            this.addChild(tabView);
            var offH = roleBg.height + tabView.height + 50 + 15;
            bg.height = offH > bg.height ? offH : bg.height;
        }
        this.height = bg.height + bg.y;
    };
    QingyuanNewScrollItem.prototype.clickTabbarHandler = function (data) {
        var index = Number(data.index);
        if (this.checkTabCondition(index) == false) {
            // 重新checkTabCondition方法处理
            this._tabbarGroup.selectedIndex = this.selectedTabIndex;
            return;
        }
        this.lastSelectedTabIndex = this.selectedTabIndex;
        this.selectedTabIndex = index;
        this._tabbarGroup.selectedIndex = index;
        this.changeTab();
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ENCOUNTER_FRESHUI, { type: this._data.type, tabIndex: index + 1, isFreshData: true });
    };
    // (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
    QingyuanNewScrollItem.prototype.checkTabCondition = function (index) {
        return true;
    };
    QingyuanNewScrollItem.prototype.changeTab = function () {
        var tabveiwClass = egret.getDefinitionByName("QingyuanNewItemRewardTab" + (this.selectedTabIndex + 1));
        if (tabveiwClass) {
            var tabView = new tabveiwClass({ data: this._data });
            tabView.setPosition(this.width / 2 - tabView.width / 2, this._tabbarGroup.y + this._tabbarGroup.height);
            tabView["param"] = { data: this._data };
            this.addChild(tabView);
            this._tabViewHeigth = tabView.height;
        }
    };
    QingyuanNewScrollItem.prototype.activateCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            if (this._tabbarGroup) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ENCOUNTER_FRESHUI, { type: this._data.type, tabIndex: this.selectedTabIndex + 1 });
            }
            else {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ENCOUNTER_FRESHUI);
            }
        }
    };
    QingyuanNewScrollItem.prototype.freshTabBarRed = function () {
        if (this._tabbarGroup) {
            if (Api.encounterVoApi.checkRedByType(this._data.type)) {
                var data = Api.encounterVoApi.checkRedIndexByType(this._data.type);
                if (data.type1) {
                    this._tabbarGroup.addRedPoint(0);
                    this._tabbarGroup.setRedPos(0, 128, 0);
                }
                else {
                    this._tabbarGroup.removeRedPoint(0);
                }
                if (data.type2) {
                    this._tabbarGroup.addRedPoint(1);
                    this._tabbarGroup.setRedPos(1, 128, 0);
                }
                else {
                    this._tabbarGroup.removeRedPoint(1);
                }
            }
        }
    };
    QingyuanNewScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    QingyuanNewScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ENCOUNTER_ACTIVATE, this.activateCallback, this);
        this._bg = null;
        this._data = null;
        this._tabbarGroup = null;
        this.selectedTabIndex = 0;
        this.tabViewData = [];
        this.lastSelectedTabIndex = 0;
        this._roleGroup = null;
        _super.prototype.dispose.call(this);
    };
    return QingyuanNewScrollItem;
}(ScrollListItem));
__reflect(QingyuanNewScrollItem.prototype, "QingyuanNewScrollItem");
//# sourceMappingURL=QingyuanNewScrollItem.js.map