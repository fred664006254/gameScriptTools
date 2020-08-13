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
 * 皇陵海层面item
 * author qianjun
 * date 2017/12/07
 */
var AcTombSeaFloorItem = (function (_super) {
    __extends(AcTombSeaFloorItem, _super);
    function AcTombSeaFloorItem() {
        var _this = _super.call(this) || this;
        _this._icon = null;
        _this._midDescBg = null;
        _this._bloodTxt = null;
        _this._killerTxt = null;
        _this._bossnumTxt = null;
        _this._boxnumTxt = null;
        _this._data = null;
        return _this;
    }
    ;
    Object.defineProperty(AcTombSeaFloorItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombSeaFloorItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombSeaFloorItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombSeaFloorItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_TOMB;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombSeaFloorItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcTombSeaFloorItem.prototype.getUicode = function () {
        var baseview = ViewController.getInstance().getView('AcTombView');
        return baseview.getUiCode();
    };
    AcTombSeaFloorItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        var code = this.getUicode();
        view._data = data;
        view._code = itemparam;
        view.width = GameConfig.stageWidth;
        var finalBoss = data.id == 0;
        view.height = finalBoss ? 337 : 172;
        var bgstr = finalBoss ? "tombbossitem" : "tombbg4";
        var bg = BaseBitmap.create(bgstr + "-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bg, view, [0, 0], true);
        view.addChild(bg);
        if (finalBoss) {
            var middletop = BaseBitmap.create("tombbg2-" + code);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, middletop, view, [0, 0], true);
            view.addChild(middletop);
            //1未开启 2已发现
            var status_1 = view.vo.getFinalbossStatusById();
            var cfg_1 = view.cfg.getBossNpcItemCfgById(7);
            var iconStr = '';
            if (status_1 == 2) {
                iconStr = cfg_1.getnpcIcon(code);
            }
            else {
                iconStr = "teamiconstatus" + 1 + "-" + code;
            }
            var icon = BaseLoadBitmap.create(iconStr);
            icon.width = 77;
            icon.height = 77;
            icon.addTouchTap(function () {
                if (view.vo.moviePlay) {
                    return;
                }
                var status = view.vo.getFinalbossStatusById();
                if (status == 1) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("tombfloorbosstip3-" + code, [view.cfg.needKillNum.toString(), view.vo.getCurKillNum().toString()]));
                }
                else if (status == 2) {
                    ViewController.getInstance().openView(ViewConst.COMMON.ACTOMBBATTLEVIEW, {
                        aid: view.aid,
                        code: view.code,
                        foeId: cfg_1.id,
                        bosskey: 1,
                        rewards: view.vo.getTombKillerRewards(cfg_1.id, 1),
                        id: 0,
                    });
                }
                // let status = view.vo.getBoxStatusById(data.idx);
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, icon, bg, [0, 30]);
            view.addChild(icon);
            view._icon = icon;
            var descbg = BaseBitmap.create('public_9_downbg');
            view.addChild(descbg);
            descbg.width = 328;
            view._midDescBg = descbg;
            var numTxt = ComponentManager.getTextField("", 20);
            view.addChild(numTxt);
            view._bossnumTxt = numTxt;
            var boxnumTxt = ComponentManager.getTextField("", 20);
            view.addChild(boxnumTxt);
            view._boxnumTxt = boxnumTxt;
            var blodTxt = ComponentManager.getTextField("", 20);
            view.addChild(blodTxt);
            view._bloodTxt = blodTxt;
            var killerTxt = ComponentManager.getTextField("", 20);
            view.addChild(killerTxt);
            view._killerTxt = killerTxt;
            view.freshBloodTxt();
        }
        else {
            var floorNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("tombfloornum-" + code, [data.id]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, floorNumTxt, bg, [0, 9]);
            view.addChild(floorNumTxt);
            var arr = view.vo.getBoxDataByFloor(data.id);
            //物品列表
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 614, 80);
            var scrollList = ComponentManager.getScrollList(AcTombSeaBoxItem, arr, rect, view.code);
            //scrollList.setContentPosY(middletop.height);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0, 67]);
            view.addChild(scrollList);
            scrollList.horizontalScrollPolicy = 'off';
            scrollList.bounces = false;
            view._list = scrollList;
        }
        //status 1 未开启 2 怪物或宝箱 3 已开启
    };
    AcTombSeaFloorItem.prototype.freshData = function () {
        var view = this;
        for (var i = 0; i < 6; ++i) {
            var item = view._list.getItemByIndex(i);
            item.update();
        }
    };
    AcTombSeaFloorItem.prototype.freshBossInfo = function () {
        var view = this;
        var code = view.getUicode();
        //1未开启 2已发现
        var status = view.vo.getFinalbossStatusById();
        var cfg = view.cfg.getBossNpcItemCfgById(7);
        var iconStr = '';
        if (status == 2) {
            iconStr = cfg.getnpcIcon(code);
        }
        else {
            iconStr = "teamiconstatus" + 1 + "-" + code;
        }
        view._icon.setload(iconStr);
        //总boss血量
        view.freshBloodTxt();
        if (view.vo.getOpenEndlessBoss()) {
            view.addEndlessEff();
        }
    };
    AcTombSeaFloorItem.prototype.freshAfterDig = function (index) {
        var view = this;
        var item = view._list.getItemByIndex(index);
        if (item) {
            item.freshAfterDig();
        }
    };
    AcTombSeaFloorItem.prototype.freshAfterAttack = function (index) {
        var view = this;
        var item = view._list.getItemByIndex(index);
        if (item) {
            item.update();
        }
    };
    AcTombSeaFloorItem.prototype.freshBloodTxt = function () {
        var view = this;
        var cfg = view.cfg.getBossNpcItemCfgById(7);
        var status = view.vo.getFinalbossStatusById();
        var bossnum = view.vo.getLastBossNum();
        var boxnum = view.vo.getLastBoxNum();
        var code = view.getUicode();
        view._bossnumTxt.text = LanguageManager.getlocal("loctombfloorbosstip6-" + code, [bossnum.toString()]);
        view._boxnumTxt.text = LanguageManager.getlocal("loctombfloorbosstip5-" + code, [boxnum.toString()]);
        var num = view.vo.getTombBlood(7, 1);
        var maxHp = view.vo.getTombMaxHp(7);
        if (isNaN(num)) {
            num = maxHp;
        }
        if (status == 2) {
            var value = Math.max(num / maxHp * 100, 0.001);
            if (num <= 0) {
                value = 0;
                view._killerTxt.text = LanguageManager.getlocal("tombfloorbosstip2-" + code, [view.vo.getTombKiller(cfg.id, 1)]);
                App.DisplayUtil.changeToGray(view._icon);
            }
            var str = parseFloat(App.MathUtil.toFixed(value, 4).slice(0, -1)).toString();
            view._bloodTxt.text = LanguageManager.getlocal("tombfloorbosstip" + (value == 0 ? 4 : 1) + "-" + code, [cfg.getnpcName(code), String(num > 0 ? TextFieldConst.COLOR_WARN_GREEN : TextFieldConst.COLOR_WARN_RED3), str]);
        }
        view._midDescBg.height = view._bossnumTxt.textHeight + view._boxnumTxt.textHeight + view._killerTxt.textHeight + view._bloodTxt.textHeight + 10 + (status == 1 ? 0 : (num > 0 ? 10 : 20)) + 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._midDescBg, view, [0, 20], true);
        if (status == 1) {
            if (view._bloodTxt) {
                view._bloodTxt.text = "";
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._bossnumTxt, view._midDescBg, [0, 20]);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._bloodTxt, view._midDescBg, [0, 20]);
            if (num <= 0) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._killerTxt, view._bloodTxt, [0, view._bloodTxt.textHeight + 10]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._bossnumTxt, view._killerTxt, [0, view._killerTxt.textHeight + 10]);
            }
            else {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._bossnumTxt, view._bloodTxt, [0, view._bloodTxt.textHeight + 10]);
            }
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._boxnumTxt, view._bossnumTxt, [0, view._bossnumTxt.textHeight + 10]);
    };
    AcTombSeaFloorItem.prototype.addEndlessEff = function () {
        //添加不死特效
        var view = this;
        if (view.vo.getOpenEndlessBoss()) {
            App.DisplayUtil.changeToNormal(view._icon);
            if (view.getChildByName("dooreff")) {
            }
            else {
                var dooreff = ComponentManager.getCustomMovieClip("finaldooreff", 12);
                dooreff.width = 207;
                dooreff.height = 166;
                dooreff.playWithTime(-1);
                dooreff.blendMode = egret.BlendMode.ADD;
                view.addChild(dooreff);
                dooreff.name = "dooreff";
                dooreff.setScale(2);
                dooreff.x = 110;
                dooreff.y = 80;
                var tiptxtbg = BaseBitmap.create("public_itemtipbg2");
                view.addChild(tiptxtbg);
                var tiptxt = ComponentManager.getTextField(LanguageManager.getlocal("tombfloorbosstip7"), 18);
                view.addChild(tiptxt);
                tiptxtbg.width = tiptxt.width + 50;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxtbg, view._icon, [0, view._icon.height]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tiptxt, tiptxtbg);
            }
        }
    };
    AcTombSeaFloorItem.prototype.dispose = function () {
        this._list = null;
        this._icon = null;
        if (this._killerTxt) {
            this._killerTxt = null;
        }
        if (this._midDescBg) {
            this._midDescBg = null;
        }
        if (this._bloodTxt) {
            this._bloodTxt = null;
        }
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return AcTombSeaFloorItem;
}(ScrollListItem));
__reflect(AcTombSeaFloorItem.prototype, "AcTombSeaFloorItem");
//# sourceMappingURL=AcTombSeaFloorItem.js.map