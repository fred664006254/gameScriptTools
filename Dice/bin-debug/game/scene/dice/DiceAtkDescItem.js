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
var DiceAtkDescItem = (function (_super) {
    __extends(DiceAtkDescItem, _super);
    function DiceAtkDescItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._bg = null;
        _this._iconbg = null;
        _this._numTxt = null;
        _this._gradeTipTxt = null;
        _this._diceid = "";
        _this._dbxq = null;
        _this._inbattle = false;
        _this._param = null;
        return _this;
    }
    DiceAtkDescItem.prototype.initItem = function (index, ndata, param) {
        //diceid : diceid,
        // info : this.param.data.info,
        // inbattle : inbattle
        var view = this;
        var diceid = param.diceid;
        view._diceid = diceid;
        view.width = 218 + 32;
        view.height = 72 + 10;
        var data = ndata.type;
        view._data = data;
        view._inbattle = param.inbattle;
        view._param = param;
        var bg = BaseBitmap.create("ab_bird_attr_infobg1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bg, view, [0, 0], true);
        view.addChild(bg);
        bg.width = 218;
        bg.height = 72;
        view._bg = bg;
        // let iconbg = BaseBitmap.create(`diceattr_icon1`);
        // view.addChild(iconbg);
        // iconbg.width = 60;
        // iconbg.height = 60;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, iconbg, bg, [4,0]);
        // view._iconbg= iconbg;
        var dicecfg = Config.DiceCfg.getCfgById(diceid);
        var icon = BaseLoadBitmap.create(dicecfg.getAtkIconByType(data));
        icon.width = icon.height = 62;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, bg, [5, 5]);
        view.addChild(icon);
        //let level = Api.DiceVoApi.getDiceLvById(diceid);
        var str = LangMger.getlocal("dice" + data);
        if (data == "specialDesc1" || data == "specialDesc2") {
            str = dicecfg["get" + data]();
        }
        var size = TextFieldConst.SIZE_20;
        //原生包 fontsize失效
        // if(App.DeviceUtil.isRuntime2()){
        // }
        var obj = {
            specialDesc1: {
                417: 1
            },
            specialDesc2: {
                // 203 : 1,
                402: 1,
                405: 1,
            }
        };
        if (obj[data] && obj[data][diceid]) {
            size = 14;
        }
        var typeNameTxt = ComponentMgr.getTextField(str, size, ColorEnums.white);
        typeNameTxt.stroke = 2;
        typeNameTxt.strokeColor = ColorEnums.black;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, typeNameTxt, bg, [80, 15]);
        view.addChild(typeNameTxt);
        var pwlv = 1;
        var pwerInfo = dicecfg.getAtkDetailPowerUpnumByType(view._data);
        var canpowerup = pwerInfo.str !== "";
        var lv = 0;
        if (view._inbattle && canpowerup) {
            if (param.info) {
                pwlv = param.info.pwlv;
                lv = param.info.lv;
            }
            else {
                pwlv = Api.BattleVoApi.getUpinfoPlvByDiceId(true, diceid);
            }
        }
        if (param.info) {
            lv = param.info.lv;
        }
        var num = dicecfg.getAtkDetailByType(data, pwlv, lv);
        var numTxt = ComponentMgr.getTextField("", TextFieldConst.SIZE_20);
        numTxt.stroke = 2;
        numTxt.text = str == "" ? "-" : num;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, numTxt, typeNameTxt, [0, typeNameTxt.height + 10]);
        view.addChild(numTxt);
        view._numTxt = numTxt;
        var upgradePernum = dicecfg.getAtkDetailPernumByType(data);
        var upgradePerTxt = ComponentMgr.getTextField(upgradePernum, TextFieldConst.SIZE_18, ColorEnums.green);
        upgradePerTxt.stroke = 0.8;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, upgradePerTxt, numTxt, [numTxt.width + 10, 0]);
        view.addChild(upgradePerTxt);
        view._gradeTipTxt = upgradePerTxt;
        if (App.CommonUtil.check_dragon()) {
            var dbxq = App.DragonBonesUtil.getLoadDragonBones("royalpass_xq");
            view._dbxq = dbxq;
            dbxq.blendMode = egret.BlendMode.ADD;
            view.addChild(dbxq);
            dbxq.setPosition(104, 36);
            view._dbxq.visible = false;
        }
        var checkother = false;
        if (view._param.info) {
            checkother = true;
        }
        if (!checkother) {
            view.freshInfo(view._inbattle ? 2 : 1);
        }
        else {
            upgradePerTxt.visible = false;
        }
    };
    DiceAtkDescItem.prototype.freshInfo = function (type) {
        //type 1升级模式 2power up模式
        var view = this;
        var diceid = view._diceid;
        var checkother = false;
        if (view._param.info) {
            checkother = true;
        }
        var level = checkother ? view._param.info.lv : Api.DiceVoApi.getDiceLvById(diceid);
        var dicecfg = Config.DiceCfg.getCfgById(diceid);
        var ismaxlevel = level == dicecfg.maxGrade;
        var havenum = checkother ? 0 : Api.DiceVoApi.getDiceNumById(diceid);
        var neednum = dicecfg.getNextLvCostNumByLv(level + 1);
        var ishave = checkother ? true : Api.DiceVoApi.isHaveDiceById(diceid);
        var canlevelup = ishave && havenum >= neednum && !ismaxlevel;
        var canpowerup = dicecfg.getAtkDetailPowerUpnumByType(view._data).str !== "";
        if (type == 1 && dicecfg.getAtkDetailPernumByType(view._data) == '') {
            view._gradeTipTxt.visible = false;
            view._bg.setRes("ab_bird_attr_infobg" + (type + (0)));
            view._gradeTipTxt.textColor = ColorEnums.white;
            if (view._dbxq) {
                view._dbxq.visible = false;
            }
            return;
        }
        view._gradeTipTxt.visible = true;
        var pwlv = 1;
        var lv = 0;
        var pwerInfo = dicecfg.getAtkDetailPowerUpnumByType(view._data);
        if (view._inbattle && canpowerup) {
            if (view._param.info) {
                pwlv = view._param.info.pwlv;
                lv = view._param.info.lv;
            }
            else {
                pwlv = Api.BattleVoApi.getUpinfoPlvByDiceId(true, diceid);
            }
        }
        view._numTxt.text = dicecfg.getAtkDetailByType(view._data, pwlv, lv);
        if (type == 1) {
            if (view._param.check) {
                view._bg.setRes("ab_bird_attr_infobg" + (type + (0)));
                view._gradeTipTxt.visible = false;
                if (view._dbxq) {
                    view._dbxq.visible = false;
                }
                return;
            }
            view._gradeTipTxt.text = dicecfg.getAtkDetailPernumByType(view._data);
            view._gradeTipTxt.visible = canlevelup;
            view._bg.setRes("ab_bird_attr_infobg" + (type + (canlevelup ? 1 : 0)));
            // view._iconbg.setRes(`diceattr_icon${type + (canlevelup ? 1 : 0)}`);
            view._gradeTipTxt.textColor = canlevelup ? ColorEnums.green : ColorEnums.white;
            if (canlevelup) {
                if (view._dbxq) {
                    view._dbxq.visible = true;
                }
            }
            else {
                if (view._dbxq) {
                    view._dbxq.visible = false;
                }
            }
        }
        else {
            if (canpowerup) {
                view._gradeTipTxt.text = dicecfg.getAtkDetailPowerUpnumByType(view._data).str;
                view._gradeTipTxt.textColor = ColorEnums.white;
                if (view._dbxq) {
                    view._dbxq.visible = true;
                    view._dbxq.playDragonMovie("idle", 0);
                }
            }
            else {
                view._gradeTipTxt.visible = false;
                if (view._dbxq) {
                    view._dbxq.visible = false;
                }
            }
            view._bg.setRes("ab_bird_attr_infobg" + (canpowerup ? 3 : 1));
            // view._iconbg.setRes(`diceattr_icon${canpowerup ? 3 : 1}`);
        }
        view._gradeTipTxt.stroke = 0.8;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._gradeTipTxt, view._numTxt, [view._numTxt.width + 10, 0]);
    };
    DiceAtkDescItem.prototype.openChangeTeam = function (dice, teamid) {
        var view = this;
        //打开替换队列模式
        view.addTouchTap(function () {
            NetManager.request(NetConst.DICE_USE, {
                diceId: dice,
                lineNo: teamid,
                upPos: view._index + 1
            });
        }, view);
    };
    DiceAtkDescItem.prototype.closeChangeTeam = function () {
        var view = this;
        //关闭替换队列模式
        view.removeTouchTap();
    };
    DiceAtkDescItem.prototype.getSpaceY = function () {
        return 0;
    };
    DiceAtkDescItem.prototype.getSpaceX = function () {
        return 0;
    };
    DiceAtkDescItem.prototype.dispose = function () {
        var view = this;
        view._data = null;
        view._bg = null;
        view._iconbg = null;
        view._numTxt = null;
        view._gradeTipTxt = null;
        view._diceid = "";
        if (view._dbxq) {
            view._dbxq.dispose();
            view._dbxq = null;
        }
        view._inbattle = false;
        view._param = null;
        _super.prototype.dispose.call(this);
    };
    return DiceAtkDescItem;
}(ScrollListItem));
__reflect(DiceAtkDescItem.prototype, "DiceAtkDescItem");
//# sourceMappingURL=DiceAtkDescItem.js.map