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
/*
author : qinajun
*/
var AcSingleDay2019DetailViewTab1 = (function (_super) {
    __extends(AcSingleDay2019DetailViewTab1, _super);
    function AcSingleDay2019DetailViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._numTxt = null;
        _this._tableGroup = null;
        _this._textGroup = null;
        _this._rollGroup = null;
        _this._stop = false;
        _this._lihuaIndex = 0;
        _this._listRoll = [];
        _this._lihuaCfg = {
            1: { color: 'hong', pos: [112, 118], scale: 1.5, wait: 0 },
            2: { color: 'huang', pos: [360, 50], scale: 1.5, wait: 200 },
            3: { color: 'lan', pos: [112, 50], scale: 1.5, wait: 400 },
            4: { color: 'huang', pos: [380, 70], scale: 1.5, wait: 650 },
            5: { color: 'hong', pos: [120, 80], scale: 1.5, wait: 900 },
            6: { color: 'lan', pos: [250, 120], scale: 1.5, wait: 1100 },
        };
        _this._endRotation = {
            1: 0,
            2: 37,
            3: 73,
            4: 110,
            5: 146,
            6: 182,
            7: 217,
            8: 252,
            9: 288,
            10: 323,
            0: 323,
        };
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcSingleDay2019DetailViewTab1.prototype.getStop = function () {
        return this._stop;
    };
    AcSingleDay2019DetailViewTab1.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcSingleDay2019DetailViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDay2019DetailViewTab1.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_SDNEWCHOU), this.rewardCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_SDNEWROLL), this.rollCallBack, this);
        var baseview = ViewController.getInstance().getView('AcSingleDay2019DetailView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var code = view.getUiCode();
        var line = BaseBitmap.create("newsingledaytab1line-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, view, [0, -10]);
        view.addChild(line);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SDNEWROLL, {
            activeId: this.acTivityId,
        });
        //顶部滚动条
        var topdescbg = BaseBitmap.create("newsingledaytab1tipibg-" + code);
        topdescbg.width = 505;
        topdescbg.height = 95;
        view.addChild(topdescbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topdescbg, view, [0, 15], true);
        var rollgroup = new BaseDisplayObjectContainer();
        rollgroup.width = topdescbg.width;
        rollgroup.height = topdescbg.height - 10;
        view.addChild(rollgroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rollgroup, topdescbg, [0, 5]);
        rollgroup.mask = new egret.Rectangle(0, 0, rollgroup.width, rollgroup.height);
        view._rollGroup = rollgroup;
        //大转盘
        var tablebg = BaseBitmap.create("newsingledaytablebg-" + code);
        view.addChild(tablebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tablebg, topdescbg, [0, topdescbg.height + 5]);
        var descbg = BaseBitmap.create("newsingledaytab1descbg-" + code);
        view.addChild(descbg);
        descbg.height = 110;
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDay2019Tip5-" + code), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(descTxt);
        descTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, tablebg, [0, tablebg.height - 75]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt, descbg, [0, 40]);
        var group = new BaseDisplayObjectContainer();
        group.width = 420;
        group.height = 420;
        group.anchorOffsetX = group.width / 2;
        group.anchorOffsetY = group.height / 2;
        view.addChild(group);
        view._tableGroup = group;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, group, tablebg, [0, 35]);
        var textgroup = new BaseDisplayObjectContainer();
        textgroup.width = group.width;
        textgroup.height = group.height;
        textgroup.anchorOffsetX = textgroup.width / 2;
        textgroup.anchorOffsetY = textgroup.height / 2;
        view.addChild(textgroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, textgroup, tablebg, [0, 40]);
        view._textGroup = textgroup;
        var table = BaseBitmap.create("newsingledaytable-" + code);
        table.anchorOffsetX = table.width / 2;
        table.anchorOffsetY = table.height / 2;
        table.x = table.anchorOffsetX;
        table.y = table.anchorOffsetY;
        table.rotation = -70;
        group.addChild(table);
        // let obj = {
        // 	666 : 3,
        // 	111 : 2,
        // 	33 : 1,
        // 	222 : 2,
        // 	1111 : 5,
        // 	88 : 1,
        // 	888 : 4,
        // 	333 :3 ,
        // }
        // let pos = {
        // 	1 : [135,35],
        // 	2 : [55,100],
        // 	3 : [23,195],
        // 	4 : [55,290],
        // 	5 : [135,345],
        // 	6 : [237,345],
        // 	7 : [321,290],
        // 	8 : [350,195],
        // 	9 : [323,100],
        // 	10 : [239,35],
        // }
        var pos = {
            1: [175, 10],
            2: [75, 40],
            3: [13, 120],
            4: [11, 225],
            5: [70, 315],
            6: [166, 340],
            7: [263, 310],
            8: [320, 225],
            9: [327, 130],
            10: [270, 50],
        };
        for (var i in view.cfg.pool1) {
            var id = Number(i) + 1;
            var unit = view.cfg.pool1[i];
            var reward = GameData.formatRewardItem(unit[0])[0];
            var group_1 = new BaseDisplayObjectContainer();
            group_1.name = "group" + id;
            group_1.width = 65;
            group_1.height = 41;
            textgroup.addChild(group_1);
            var iconres = 1;
            if (reward.num < 100) {
                iconres = 1;
            }
            else if (reward.num < 300) {
                iconres = 2;
            }
            else if (reward.num < 800) {
                iconres = 3;
            }
            else if (reward.num < 1000) {
                iconres = 4;
            }
            else if (reward.num >= 1000) {
                iconres = 5;
            }
            var icon_1 = BaseBitmap.create("newsingledaytab1icon" + iconres + "-" + code);
            icon_1.anchorOffsetX = icon_1.width / 2;
            icon_1.anchorOffsetY = icon_1.height / 2;
            icon_1.x = pos[id][0] + icon_1.anchorOffsetX;
            icon_1.y = pos[id][1] + icon_1.anchorOffsetY;
            icon_1.name = "icon" + id;
            view._tableGroup.addChild(icon_1);
            group_1.anchorOffsetX = group_1.width / 2;
            group_1.anchorOffsetY = -10;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, group, icon, [-3,icon.height]);
            group_1.setPosition(icon_1.x, icon_1.y);
            var numTxt_1 = BaseBitmap.create("newsingledaynum" + reward.num + "-" + code);
            group_1.addChild(numTxt_1);
        }
        var point = BaseBitmap.create("newsingledaypoint-" + code);
        view.addChild(point);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, point, group, [0, -10]);
        var bottombg = BaseBitmap.create("newsingledaybottombg-" + code);
        view.addChild(bottombg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view, [0, 0], true);
        var btn = ComponentManager.getButton("newsingledaytab1btn-" + code, "acSingleDay2019Tab1btn-" + code, function () {
            if (view._stop) {
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (view.vo.getItemNum() < 1) {
                //view.showTipView();
                App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDay2019Tip3-" + code));
            }
            else {
                //
                view._stop = true;
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SDNEWCHOU, {
                    activeId: view.acTivityId,
                });
            }
        }, view);
        view.addChild(btn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, btn, bottombg);
        var icon = BaseBitmap.create("newsingledayitemicon2-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, btn, [0, -icon.height - 5]);
        var numbg = BaseBitmap.create("specialview_commoni_namebg");
        numbg.width = btn.width;
        numbg.height = 35;
        view.addChild(numbg);
        view.addChild(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numbg, icon, [0, 0]);
        var numTxt = ComponentManager.getTextField("1/<font color=" + (view.vo.getItemNum() > 0 ? TextFieldConst.COLOR_WARN_GREEN : TextFieldConst.COLOR_WARN_RED) + ">" + view.vo.getItemNum() + "</font>", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._numTxt = numTxt;
        view.addChild(numTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numTxt, numbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._numTxt, view);
        var boneName = "firstSightLove_StarBg_ske";
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var dblight = App.DragonBonesUtil.getLoadDragonBones("firstSightLove_StarBg");
            dblight.setAnchorOffset(0, -886);
            view.addChild(dblight);
            dblight.x = 40;
            dblight.y = 100;
        }
        egret.Tween.get(view._tableGroup, { loop: true, onChange: function () {
                view._textGroup.rotation = view._tableGroup.rotation;
                // let total = this.cfg.lotteryPool.length;
                for (var i in view.cfg.pool1) {
                    var gid = Number(i) + 1;
                    var unit = view.cfg.pool1[i];
                    var reward = GameData.formatRewardItem(unit[0])[0];
                    var group_2 = view._textGroup.getChildByName("group" + gid);
                    group_2.rotation = 0 - view._tableGroup.rotation;
                    var item = view._tableGroup.getChildByName("icon" + gid);
                    item.rotation = 0 - view._tableGroup.rotation;
                }
            } }).to({ rotation: 360 }, 20000);
    };
    AcSingleDay2019DetailViewTab1.prototype.showLihua = function () {
        var _this = this;
        var index = this._lihuaIndex + 1;
        var item = this._lihuaCfg[index];
        if (item) {
            var lihuaclip_1 = ComponentManager.getCustomMovieClip("lihua" + item.color, 10, 40);
            lihuaclip_1.setScale(item.scale);
            lihuaclip_1.x = item.pos[0];
            lihuaclip_1.y = item.pos[1];
            lihuaclip_1.playWithTime(1);
            this.addChild(lihuaclip_1);
            lihuaclip_1.setEndCallBack(function () {
                _this._lihuaIndex++;
                lihuaclip_1.dispose();
                lihuaclip_1 = null;
                if (_this._lihuaIndex >= 5) {
                    _this._lihuaIndex = 0;
                    return;
                }
                _this.showLihua();
            }, this);
        }
        else {
            this.showLihua();
        }
    };
    AcSingleDay2019DetailViewTab1.prototype.rewardCallBack = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            view._stop = false;
            return;
        }
        var rewards = rData.rewards;
        view.playTurn(rewards, rData.rollList);
        var list = rData.rollList;
        if (list) {
            list = list.reverse();
            if (view._listRoll.length == 0) {
                view._listRoll = list;
                view.freshRoll();
            }
            else {
                view._listRoll = list;
            }
        }
    };
    AcSingleDay2019DetailViewTab1.prototype.playTurn = function (rewards, list) {
        var view = this;
        var speed = 360 / 25000 * 2;
        var speed2 = 360 / 10000 * 2;
        var speed3 = 360 / 5000 * 2;
        var speed4 = 360 / 2500 * 2;
        var id = 0;
        for (var i in view.cfg.pool1) {
            var unit = view.cfg.pool1[i];
            if (unit[0] === rewards) {
                id = Number(i) + 1;
                break;
            }
        }
        var endRotation = view._endRotation[id];
        //100ms 360度
        var rotation = view._tableGroup.rotation;
        egret.Tween.removeTweens(view._tableGroup);
        var parm = id > 3;
        var base = 360;
        var pos1 = parm ? 0 : (view._endRotation[id + 7]);
        var pos2 = parm ? view._endRotation[id - 2] : ((id + 8 > 10 ? 360 : 0) + view._endRotation[(id + 8) % 10]);
        var pos3 = parm ? view._endRotation[id - 1] : ((id + 9 > 10 ? 360 : 0) + view._endRotation[(id + 9) % 10]);
        var pos4 = parm ? view._endRotation[id] : ((id + 10 > 10 ? 360 : 0) + view._endRotation[(id + 10) % 10]);
        egret.Tween.get(view._tableGroup, { onChange: function () {
                view._textGroup.rotation = view._tableGroup.rotation;
                // let total = this.cfg.lotteryPool.length;
                for (var i in view.cfg.pool1) {
                    var gid = Number(i) + 1;
                    var unit = view.cfg.pool1[i];
                    var reward = GameData.formatRewardItem(unit[0])[0];
                    var group = view._textGroup.getChildByName("group" + gid);
                    group.rotation = 0 - view._tableGroup.rotation;
                    var item = view._tableGroup.getChildByName("icon" + gid);
                    item.rotation = 0 - view._tableGroup.rotation;
                }
            } }).
            to({ rotation: base + pos1 }, (base + pos1 - rotation) / speed4)
            .to({ rotation: base + pos2 }, ((pos2 - pos1) / speed3)).
            to({ rotation: base + pos3 }, ((pos3 - pos2) / speed2)).
            to({ rotation: base + pos4 }, ((pos4 - pos3) / speed)).call(function () {
            view._lihuaIndex = 0;
            if (list) {
                view.showLihua();
            }
        }, view).wait(1200).call(function () {
            var eff = ComponentManager.getCustomMovieClip("newsingledaytableeff", 9);
            view.addChild(eff);
            eff.width = 168;
            eff.height = 226;
            eff.playWithTime(-1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, eff, view._tableGroup, [5, -50]);
            egret.Tween.get(eff).wait(1500).call(function () {
                egret.Tween.removeTweens(eff);
                eff.dispose();
                eff = null;
                ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYREWARDSHOWVIEW, {
                    aid: view.aid,
                    code: view.code,
                    rewards: rewards,
                });
                view._textGroup.rotation = view._tableGroup.rotation = 0;
                for (var i in view.cfg.pool1) {
                    var gid = Number(i) + 1;
                    var unit = view.cfg.pool1[i];
                    var reward = GameData.formatRewardItem(unit[0])[0];
                    var group = view._textGroup.getChildByName("group" + gid);
                    group.rotation = 0;
                    var item = view._tableGroup.getChildByName("icon" + gid);
                    item.rotation = 0;
                }
                egret.Tween.removeTweens(view._tableGroup);
                egret.Tween.get(view._tableGroup, { loop: true, onChange: function () {
                        view._textGroup.rotation = view._tableGroup.rotation;
                        // let total = this.cfg.lotteryPool.length;
                        for (var i in view.cfg.pool1) {
                            var gid = Number(i) + 1;
                            var unit = view.cfg.pool1[i];
                            var reward = GameData.formatRewardItem(unit[0])[0];
                            var group = view._textGroup.getChildByName("group" + gid);
                            group.rotation = 0 - view._tableGroup.rotation;
                            var item = view._tableGroup.getChildByName("icon" + gid);
                            item.rotation = 0 - view._tableGroup.rotation;
                        }
                    } }).to({ rotation: 360 }, 20000);
                view._stop = false;
            }, view);
        }, this);
    };
    AcSingleDay2019DetailViewTab1.prototype.rollCallBack = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        if (data) {
            var list = [];
            for (var i in data.rollList) {
                list.push(data.rollList[i]);
            }
            list = list.reverse();
            view._listRoll = list;
            view.freshRoll();
        }
    };
    AcSingleDay2019DetailViewTab1.prototype.freshRoll = function () {
        var view = this;
        var group = view._rollGroup;
        group.removeChildren();
        var len = view._listRoll.length;
        var _loop_1 = function (i) {
            var unit = view._listRoll[i];
            var gamevo = GameData.formatRewardItem(unit[1])[0];
            var txt = group.getChildByName("txt" + i);
            var startY = 95 + i * 25;
            if (txt) {
                txt.text = LanguageManager.getlocal("acSingleDay2019Tip2-" + view.getUiCode(), [unit[0], gamevo.num, gamevo.name]);
            }
            else {
                txt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDay2019Tip2-" + view.getUiCode(), [unit[0], gamevo.num, gamevo.name]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                txt.name = "txt" + i;
                group.addChild(txt);
            }
            txt.y = startY;
            var speed = 0.05;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, txt, group, [0], true);
            egret.Tween.get(txt).to({ y: -25 }, (startY + 25) / speed).call(function () {
                txt.y = startY;
                txt.alpha = 0;
                egret.Tween.removeTweens(txt);
                if (i == (len - 1)) {
                    view.freshRoll();
                }
            }, view);
        };
        for (var i = 0; i < len; ++i) {
            _loop_1(i);
        }
    };
    AcSingleDay2019DetailViewTab1.prototype.update = function () {
        var view = this;
        view._numTxt.text = "1/<font color=" + (view.vo.getItemNum() > 0 ? TextFieldConst.COLOR_WARN_GREEN : TextFieldConst.COLOR_WARN_RED) + ">" + view.vo.getItemNum() + "</font>";
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._numTxt, view);
    };
    AcSingleDay2019DetailViewTab1.prototype.hide = function () {
        if (this._stop) {
            return;
        }
        _super.prototype.hide.call(this);
    };
    AcSingleDay2019DetailViewTab1.prototype.dispose = function () {
        var view = this;
        view._stop = false;
        view._numTxt = null;
        view._tableGroup = null;
        view._textGroup = null;
        view._rollGroup = null;
        view._lihuaIndex = 0;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_SDNEWCHOU), this.rewardCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_SDNEWROLL), this.rollCallBack, this);
        view._listRoll = [];
        _super.prototype.dispose.call(this);
    };
    return AcSingleDay2019DetailViewTab1;
}(CommonViewTab));
__reflect(AcSingleDay2019DetailViewTab1.prototype, "AcSingleDay2019DetailViewTab1");
//# sourceMappingURL=AcSingleDay2019DetailViewTab1.js.map