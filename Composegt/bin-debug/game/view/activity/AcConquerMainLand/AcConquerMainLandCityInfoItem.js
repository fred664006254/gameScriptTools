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
 * author : qianjun
 * date : 2018.4.14
 * desc : 争夺点信息item
 */
var AcConquerMainLandCityInfoItem = (function (_super) {
    __extends(AcConquerMainLandCityInfoItem, _super);
    function AcConquerMainLandCityInfoItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcConquerMainLandCityInfoItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandCityInfoItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandCityInfoItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandCityInfoItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_CONQUERMAINLAND;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandCityInfoItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandCityInfoItem.prototype.getUiCode = function () {
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
    AcConquerMainLandCityInfoItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        // view.width = 165;
        // view.height = 285;
        view._data = data;
        var code = view.getUiCode();
        var cfg = view.cfg.mainLand[data.level - 1];
        var bg = BaseBitmap.create("mainland_cityitem_bg");
        view.width = bg.width + 10;
        view.height = bg.height + 10;
        view.addChild(bg);
        var nameStr = '';
        if (data.level > 3) {
            nameStr = LanguageManager.getlocal("acConquerMainLandWarBuild4-" + code, [data.pos]);
        }
        else {
            nameStr = LanguageManager.getlocal("acConquerMainLandWarBuild" + data.level + "_" + data.num + "_" + data.pos + "-" + code, [data.pos]);
        }
        var nameTxt = ComponentManager.getTextField("" + nameStr, 20, TextFieldConst.COLOR_WHITE);
        if (PlatformManager.checkIsViSp()) {
            nameTxt.size -= 4;
        }
        view.addChild(nameTxt);
        nameTxt.setPosition(bg.x + bg.width / 2 - nameTxt.width / 2, bg.y + 53);
        var num = 0;
        if (data.level == 7) {
            num = cfg.getScore[0][0];
        }
        else {
            num = cfg.getScore[data.num - 1][data.pos - 1];
        }
        num = num * view.vo.getTimeBuff();
        var scoretxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandPerScore-" + code, [num.toString()]), 16, TextFieldConst.COLOR_QUALITY_GREEN_NEW);
        scoretxt.setPosition(bg.x + bg.width / 2 - scoretxt.width / 2, nameTxt.y + 27);
        view.addChild(scoretxt);
        if (data.npc) {
            var tipbg = BaseBitmap.create("mainland_cityitem_noarmy");
            view.addChild(tipbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipbg, scoretxt, [0, scoretxt.height]);
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip27-" + code), 18, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, scoretxt, [0, scoretxt.height + 45]);
            view.addChild(tipTxt);
            var init = 0;
            if (view.cfg.mainLand[data.level - 1] && view.cfg.mainLand[data.level - 1].initial) {
                init = view.cfg.mainLand[data.level - 1].initial;
            }
            var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip28-" + code, [App.StringUtil.formatStringColor(init, TextFieldConst.COLOR_QUALITY_GREEN_NEW)]), 18, TextFieldConst.COLOR_BLACK);
            tipTxt2.lineSpacing = 5;
            tipTxt2.textAlign = egret.HorizontalAlign.CENTER;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt2, scoretxt, [0, scoretxt.height + 110]);
            view.addChild(tipTxt2);
        }
        else {
            //头像框
            var headContainer = Api.playerVoApi.getPlayerCircleHead(Number(data.pic), (data.ptitleid));
            view.addChild(headContainer);
            headContainer.setScale(0.9);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, headContainer, scoretxt, [-3.5, scoretxt.height - 2]);
            //玩家名
            var pname = data.name + '(' + Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.zid) + ')';
            var playernameTxt = ComponentManager.getTextField(pname, 16, TextFieldConst.COLOR_BROWN_NEW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, playernameTxt, headContainer, [1.5, headContainer.height - 4]);
            view.addChild(playernameTxt);
            playernameTxt.textColor = Number(data.uid) == Api.playerVoApi.getPlayerID() ? TextFieldConst.COLOR_QUALITY_GREEN : TextFieldConst.COLOR_BROWN_NEW;
            //称号
            var titleId = data.titleid;
            var width = 0;
            if (titleId) {
                var titleStr = Config.TitleCfg.getTitleIcon3WithLv(titleId, data.titlelv);
                var officerImg = BaseLoadBitmap.create(titleStr);
                officerImg.width = 186;
                officerImg.height = 42;
                officerImg.setScale(0.6);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, officerImg, bg, [0, 72]);
                this.addChild(officerImg);
            }
            else {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, playernameTxt, headContainer, [1.5, headContainer.height + 13]);
            }
        }
        if (Number(data.uid) == Api.playerVoApi.getPlayerID()) {
            var tipTxt = BaseBitmap.create("mlcity_instate-" + this.getUiCode());
            this.addChild(tipTxt);
            //ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip36-${code}`), 18, TextFieldConst.COLOR_BROWN);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt, bg, [0, 12]);
            view.addChild(tipTxt);
        }
        else {
            var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, data.npc ? "acConquerMainLandTip29-" + code : "acConquerMainLandTip14-" + code, function () {
                //争夺
                if (!view.vo.isCanJoin()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                    return;
                }
                var score = 0;
                if (data.npc) {
                    score = view.cfg.mainLand[data.level - 1].initial;
                }
                else {
                    for (var i in data.team) {
                        score += (data.team[i].dps);
                    }
                }
                ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDSENDFIGHTVIEW, {
                    aid: view.aid,
                    code: view.code,
                    level: data.level,
                    num: data.num,
                    pos: data.pos,
                    info: data,
                    data: {
                        score: score,
                        isNpc: data.npc
                    },
                    uid: data.uid,
                });
            }, view);
            btn.setScale(0.7);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, bg, [0, 10]);
            view.addChild(btn);
        }
    };
    AcConquerMainLandCityInfoItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcConquerMainLandCityInfoItem.prototype.dispose = function () {
        var view = this;
        view._data = null;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandCityInfoItem;
}(ScrollListItem));
__reflect(AcConquerMainLandCityInfoItem.prototype, "AcConquerMainLandCityInfoItem");
