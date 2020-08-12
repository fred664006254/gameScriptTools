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
var ActiveItem = (function (_super) {
    __extends(ActiveItem, _super);
    function ActiveItem() {
        var _this = _super.call(this) || this;
        _this._joinGroup = null;
        _this._notjoinGroup = null;
        _this._desbg = null;
        _this._winbg = null;
        _this._winnum = null;
        return _this;
    }
    ActiveItem.prototype.getMsgConstEventArr = function () {
        return [
            MsgConst.MODEL_FAIRARENA
        ];
    };
    ActiveItem.prototype.msgEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case MsgConst.MODEL_FAIRARENA:
                view.freshView();
                break;
        }
    };
    ActiveItem.prototype.dispose = function () {
        var view = this;
        view._desbg = null;
        view._joinGroup && view._joinGroup.dispose();
        view._joinGroup = null;
        view._notjoinGroup && view._notjoinGroup.dispose();
        view._notjoinGroup = null;
        _super.prototype.dispose.call(this);
    };
    ActiveItem.prototype.initItem = function (index, data) {
        var view = this;
        view.initEventListener();
        var islock = data.lock;
        view.width = GameConfig.stageWidth;
        view.height = 283 + 5;
        var itemgroup = new BaseDisplayObjectContainer();
        view.addChild(itemgroup);
        var bg = null;
        if (islock) {
            bg = BaseBitmap.create("activelock");
        }
        else {
            bg = BaseLoadBitmap.create(data.active + "_banner");
        }
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view, [0,0], true);
        itemgroup.addChild(bg);
        if (islock) {
            var lockTxt = ComponentMgr.getTextField(LangMger.getlocal("sysUnlock"), TextFieldConst.SIZE_30);
            lockTxt.stroke = 2;
            lockTxt.strokeColor = 0x401869;
            itemgroup.addChild(lockTxt);
            bg.x = 15;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, lockTxt, bg, [0, 35]);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemgroup, view, [0, 0]);
            var ruleBtn = ComponentMgr.getButton("activerulebtn", "", function () {
                //弹说明
                App.MsgHelper.dispEvt(MsgConst.END_TOUCH_LIST, {});
                ViewController.getInstance().openView(ViewConst.ACTIVERULEVIEW, {
                    title: LangMger.getlocal("fairArena"),
                    needCancel: false,
                    acInfoArr: [{ index: 1, acKey: data.active }, { index: 2, acKey: data.active }, { index: 3, acKey: data.active }],
                });
            }, view);
            view.addChild(ruleBtn);
            ruleBtn.setPosition(558, 2);
            ruleBtn.forbidClickBubble = true;
            var descbg = BaseBitmap.create(Api.FairArenaVoApi.isJoinJJC() ? "activedescbg2" : "activedescbg");
            itemgroup.addChild(descbg);
            this._desbg = descbg;
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, descbg, bg, [40, 40]);
            var title = BaseBitmap.create(data.active + "_banner_title");
            itemgroup.addChild(title);
            title.x = bg.x + 329;
            title.y = bg.y + 17;
            var joinGroup = new BaseDisplayObjectContainer();
            joinGroup.width = descbg.width;
            joinGroup.height = descbg.height;
            itemgroup.addChild(joinGroup);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, joinGroup, descbg);
            view._joinGroup = joinGroup;
            var notjoinGroup = new BaseDisplayObjectContainer();
            notjoinGroup.width = descbg.width;
            notjoinGroup.height = descbg.height;
            itemgroup.addChild(notjoinGroup);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, notjoinGroup, descbg);
            view._notjoinGroup = notjoinGroup;
            var joinTxt = ComponentMgr.getTextField(LangMger.getlocal("fairArenaProgress"), TextFieldConst.SIZE_24);
            joinGroup.addChild(joinTxt);
            joinTxt.strokeColor = 0x3c3c3c;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, joinTxt, joinGroup, [0, -joinTxt.height / 2]);
            var winnum = Api.FairArenaVoApi.getWinNum();
            var winbg = BaseLoadBitmap.create(this.getWinBgurl(winnum));
            joinGroup.addChild(winbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winbg, joinGroup, [20, 31]);
            this._winbg = winbg;
            var wintxt = BaseLoadBitmap.create("activewinnum" + winnum);
            joinGroup.addChild(wintxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, wintxt, winbg, [0, 0]);
            this._winnum = wintxt;
            var winNameTxt = ComponentMgr.getTextField(LangMger.getlocal("fairArenaWin"), TextFieldConst.SIZE_20, 0xFFF091);
            joinGroup.addChild(winNameTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, winNameTxt, joinGroup, [49, 15]);
            var line = BaseBitmap.create("activeline");
            line.height = 130;
            joinGroup.addChild(line);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, line, joinGroup, [135, 0]);
            var tmpX = 150;
            var startX = 145;
            for (var i = 1; i <= Config.FairarenaCfg.getFailNum(); ++i) {
                var losebg = BaseBitmap.create("activefailbg");
                losebg.setPosition(startX + losebg.width * (i - 1) + 3, 48);
                joinGroup.addChild(losebg);
                var loseIcon = BaseBitmap.create("activefailicon");
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, loseIcon, losebg);
                joinGroup.addChild(loseIcon);
                loseIcon.name = "loseIcon" + i;
                loseIcon.visible = i <= Api.FairArenaVoApi.getLoseNum();
            }
            var loseNameTxt = ComponentMgr.getTextField(LangMger.getlocal("fairArenaLose"), TextFieldConst.SIZE_20);
            loseNameTxt.width = 147;
            loseNameTxt.textAlign = egret.HorizontalAlign.CENTER;
            loseNameTxt.setPosition(startX, winNameTxt.y);
            joinGroup.addChild(loseNameTxt);
            var notjoinTxt = ComponentMgr.getTextField(LangMger.getlocal("sysJJCJoin"), TextFieldConst.SIZE_24);
            notjoinGroup.addChild(notjoinTxt);
            notjoinTxt.strokeColor = 0x3c3c3c;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, notjoinTxt, notjoinGroup, [0, -notjoinTxt.height / 2]);
            var costIcon = BaseBitmap.create("public_icon1");
            notjoinGroup.addChild(costIcon);
            var costTxt = ComponentMgr.getTextField("" + Config.FairarenaCfg.getCostGem(), TextFieldConst.SIZE_24);
            notjoinGroup.addChild(costTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costIcon, notjoinGroup, [(notjoinGroup.width - costIcon.width - costTxt.width - 15) / 2, 0]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, costIcon, [costIcon.width + 15, 0]);
            var isJoin = Api.FairArenaVoApi.isJoinJJC();
            view._joinGroup.visible = isJoin;
            view._notjoinGroup.visible = !isJoin;
            App.CommonUtil.addTouchScaleEffect(view, view.onClick, view);
            view.touchEnabled = !islock;
        }
    };
    ActiveItem.prototype.getWinBgurl = function (winnum) {
        var bgid = "1";
        if (winnum >= 1 && winnum <= 3) {
            bgid = "2";
        }
        else if (winnum >= 4 && winnum <= 6) {
            bgid = "3";
        }
        else if (winnum >= 7 && winnum <= 9) {
            bgid = "4";
        }
        else if (winnum >= 10 && winnum <= 11) {
            bgid = "5";
        }
        if (winnum == 12) {
            bgid = "6";
        }
        return "activewinbg" + bgid;
    };
    ActiveItem.prototype.onClick = function (evt) {
        var view = this;
        if (!Api.FairArenaVoApi.isJoinJJC()) {
            ViewController.getInstance().openView(ViewConst.BUYRESCONFIRMPOPUPVIEW, {
                title: LangMger.getlocal("purchase_admission_title"),
                msg: LangMger.getlocal("purchase_admission_des", [String(Config.FairarenaCfg.getCostGem())]),
                handler: view,
                needCancel: false,
                callback: function () {
                    //发消息去买公平竞技场的门票
                    if (Api.UserinfoVoApi.getGem() >= Config.FairarenaCfg.getCostGem()) {
                        NetManager.request(NetConst.FAIRARENA_START, {});
                    }
                    else {
                        App.CommonUtil.gemNotEnough(1);
                    }
                },
                needClose: 1,
                costnum: 100,
                costIcon: "ab_mainui_gem"
            });
        }
        else {
            App.LogUtil.log("打开公平竞技场界面");
            SceneController.getInstance().go("FairarenaScene", {});
        }
    };
    ActiveItem.prototype.freshView = function () {
        var view = this;
        if (view._index == 0) {
            for (var i = 1; i <= Config.FairarenaCfg.getFailNum(); ++i) {
                var loseIcon = view._joinGroup.getChildByName("loseIcon" + i);
                if (loseIcon) {
                    loseIcon.visible = i <= Api.FairArenaVoApi.getLoseNum();
                }
            }
            var isJoin = Api.FairArenaVoApi.isJoinJJC();
            this._desbg.texture = ResMgr.getRes(isJoin ? "activedescbg2" : "activedescbg");
            if (view._joinGroup) {
                view._joinGroup.visible = isJoin;
                var win = Api.FairArenaVoApi.getWinNum();
                this._winbg.setload(this.getWinBgurl(win));
                this._winnum.setload("activewinnum" + win);
            }
            if (view._notjoinGroup) {
                view._notjoinGroup.visible = !isJoin;
            }
        }
    };
    ActiveItem.prototype.getSpaceY = function () {
        return 0;
    };
    ActiveItem.prototype.getSpaceX = function () {
        return 0;
    };
    return ActiveItem;
}(ScrollListItem));
__reflect(ActiveItem.prototype, "ActiveItem");
//# sourceMappingURL=ActiveItem.js.map