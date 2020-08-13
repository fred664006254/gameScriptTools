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
 * author:qianjun
 * desc:情缘绘卷Item
*/
var QingyuanItem = (function (_super) {
    __extends(QingyuanItem, _super);
    function QingyuanItem() {
        var _this = _super.call(this) || this;
        _this._reddotgroup = null;
        _this._data = null;
        return _this;
    }
    QingyuanItem.prototype.initItem = function (index, data) {
        var view = this;
        view._data = data;
        view.width = 531;
        view.height = 250 + 20;
        var type = data.type;
        var namebg = BaseBitmap.create("qingyuanitemtitlebg");
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("qingyuantitlename" + data.type), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        namebg.width = titleTxt.textWidth + 70;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, namebg, view, [0, 0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleTxt, namebg);
        titleTxt.addTouchTap(function () {
            // ViewController.getInstance().openView(`QingyuantestView`, data);
        }, view, null);
        var bg = BaseBitmap.create("qingyuanitembg" + data.type);
        var kuang = BaseBitmap.create("qingyuanitem" + data.type);
        kuang.width = 515;
        kuang.height = 229;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, kuang, view, [0, 17], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, kuang, [0, 9]);
        view.addChild(bg);
        //人物形象
        // let poscfg = {
        // 	fourrenegade : [
        // 		{x : -9, y : 23, emptyx : 8, emptyy : 3, sid : 20011}, 
        // 		{x : 318, y : 22, emptyx : 299, emptyy : 8, sid : 20021}, 
        // 		{x : 232, y : 17, emptyx : 216, emptyy : 20, sid : 20031},
        // 		{x : 59, y : 15, emptyx : 82, emptyy : 5, sid : 20041}, 
        // 	],
        // };//(view.width - data.need.length * 150) / 2;
        var rolegroup = new BaseDisplayObjectContainer();
        rolegroup.width = 498;
        rolegroup.height = 211;
        rolegroup.x = bg.x;
        rolegroup.y = 26;
        rolegroup.name = "rolegroup";
        rolegroup.mask = new egret.Rectangle(0, 0, bg.width, bg.height);
        view.addChild(rolegroup);
        var qingyuanbg = BaseBitmap.create("qingyuanbgmask");
        qingyuanbg.width = 515;
        qingyuanbg.scaleY = 0.7;
        view.addChild(qingyuanbg);
        qingyuanbg.x = 8;
        qingyuanbg.y = 210;
        view.addChild(kuang);
        for (var i in data.need) {
            var unit = data.need[i];
            var rewardvo = GameData.formatRewardItem(unit)[0];
            var str = "";
            var id = rewardvo.id;
            var info = Api.encounterVoApi.getNeedInfo(data.type, id.toString());
            var role = BaseBitmap.create(type + "role" + id);
            var poscfg = data.coordinateOutside[id];
            role.x = poscfg.x;
            role.y = poscfg.y;
            role.mask = new egret.Rectangle(0, 0, role.width, 357);
            rolegroup.addChild(role);
            role.name = "role" + (Number(i) + 1);
            role.setScale(0.7);
            if (info.isopen) {
                //已解锁
                if (info.have && Api.encounterVoApi.getActiveBuffIndex(data.type, Number(i) + 1)) {
                    App.DisplayUtil.changeToNormal(role);
                }
                else {
                    App.DisplayUtil.changeToAlpha(role);
                }
            }
            else {
                App.DisplayUtil.changeToBlack(role);
                // let square:egret.Shape = new egret.Shape();
                // square.graphics.beginFill(0x090b1a);
                // square.graphics.drawRect(role.x,role.y,role.width * role.scaleX, 250);
                // square.graphics.endFill();
                // square.alpha = 1;
                // rolegroup.addChild(square);
                // square.mask = role;
                // let unlock = BaseBitmap.create(`qingyuannpcempty`);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, unlock, role);
                // rolegroup.addChild(unlock);
            }
        }
        // view.setIndex();
        view.addChild(namebg);
        view.addChild(titleTxt);
        view.addTouchTap(function () {
            //打开弹窗
            ViewController.getInstance().openView(ViewConst.POPUP.QINGYUANDETAILVIEW, data);
            //ViewController.getInstance().openView(`QingyuantestView`, data);
        }, view);
        var group = new BaseDisplayObjectContainer();
        view.addChild(group);
        view._reddotgroup = group;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, group, view, [0, 30], true);
        var reddot = BaseBitmap.create("qingyuannew");
        group.addChild(reddot);
        group.visible = Api.encounterVoApi.checkRed(view._data.type);
        var click = ComponentManager.getCustomMovieClip("qingyuanred", 15, 70);
        click.width = 110;
        click.height = 81;
        click.playWithTime(-1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, click, reddot, [-10, 3]);
        group.addChild(click);
    };
    QingyuanItem.prototype.setIndex = function () {
        var view = this;
        var data = view._data;
        var type = data.type;
        var rolegroup = view.getChildByName("rolegroup");
        var haveidx = 0;
        var nothaveidx = 0;
        var notopenidx = 0;
        var imageIndex = {
            have: {},
            nothave: {},
            notopen: {}
        };
        for (var i in data.need) {
            var unit = data.need[i];
            var rewardvo = GameData.formatRewardItem(unit)[0];
            var str = "";
            var id = rewardvo.id;
            var info = Api.encounterVoApi.getNeedInfo(data.type, id.toString());
            if (info.isopen) {
                //已解锁
                if (info.have && Api.encounterVoApi.getActiveBuffIndex(data.type, Number(i) + 1)) {
                    ++haveidx;
                    imageIndex.have[Number(i) + 1] = haveidx;
                }
                else {
                    ++nothaveidx;
                    imageIndex.nothave[Number(i) + 1] = nothaveidx;
                }
            }
            else {
                ++notopenidx;
                imageIndex.notopen[Number(i) + 1] = notopenidx;
            }
        }
        for (var i in imageIndex.notopen) {
            var role = rolegroup.getChildByName("role" + i);
            rolegroup.setChildIndex(role, imageIndex.notopen[i]);
        }
        for (var i in imageIndex.nothave) {
            var role = rolegroup.getChildByName("role" + i);
            rolegroup.setChildIndex(role, imageIndex.nothave[i] + Object.keys(imageIndex.notopen).length);
        }
        for (var i in imageIndex.have) {
            var role = rolegroup.getChildByName("role" + i);
            rolegroup.setChildIndex(role, imageIndex.have[i] + Object.keys(imageIndex.notopen).length + Object.keys(imageIndex.nothave).length);
        }
    };
    QingyuanItem.prototype.refresh = function () {
        var view = this;
        view._reddotgroup.visible = Api.encounterVoApi.checkRed(view._data.type);
        var rolegroup = view.getChildByName("rolegroup");
        for (var i in view._data.need) {
            var unit = view._data.need[i];
            var rewardvo = GameData.formatRewardItem(unit)[0];
            var str = "";
            var info = Api.encounterVoApi.getNeedInfo(view._data.type, rewardvo.id.toString());
            var role = rolegroup.getChildByName("role" + (Number(i) + 1));
            if (role) {
                if (info.isopen) {
                    //已解锁
                    if (info.have && Api.encounterVoApi.getActiveBuffIndex(view._data.type, Number(i) + 1)) {
                        App.DisplayUtil.changeToNormal(role);
                    }
                    else {
                        App.DisplayUtil.changeToAlpha(role);
                    }
                }
            }
        }
        // view.setIndex();
    };
    /**
      * 不同格子X间距
      */
    QingyuanItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    QingyuanItem.prototype.getSpaceY = function () {
        return 0;
    };
    QingyuanItem.prototype.dispose = function () {
        var view = this;
        view._reddotgroup = null;
        view.removeTouchTap();
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return QingyuanItem;
}(ScrollListItem));
__reflect(QingyuanItem.prototype, "QingyuanItem");
//# sourceMappingURL=QingyuanItem.js.map