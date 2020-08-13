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
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcConquerMainLandCityInfoItem.prototype.getScorePer = function (data, jizhan) {
        if (jizhan === void 0) { jizhan = true; }
        var cfg = this.cfg.mainLand[data.level - 1];
        var num = 0;
        if (data.level == 7) {
            num = cfg.getScore[0][0];
        }
        else {
            if (cfg.getScore[data.num - 1]) {
                num = cfg.getScore[data.num - 1][data.pos - 1];
            }
            else {
                num = cfg.getScore[cfg.getScore.length - 1][data.pos - 1];
            }
        }
        if (jizhan) {
            num = num * this.vo.getTimeBuff();
        }
        return num;
    };
    AcConquerMainLandCityInfoItem.prototype.initItem = function (index, data, itemparam) {
        var _this = this;
        var view = this;
        view._code = itemparam;
        view.width = 165;
        view.height = 285;
        view._data = data;
        var code = view.getUiCode();
        var cfg = view.cfg.mainLand[data.level - 1];
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = view.width;
        bg.height = view.height - 5;
        view.addChild(bg);
        var topbg = BaseBitmap.create("battledown9bg");
        topbg.width = 150;
        topbg.height = 35;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [0, 10]);
        view.addChild(topbg);
        var nameStr = '';
        if (data.level > 3) {
            nameStr = LanguageManager.getlocal("acConquerMainLandWarBuild4-" + code, [data.pos]);
        }
        else {
            nameStr = LanguageManager.getlocal("acConquerMainLandWarBuild" + data.level + "_" + data.num + "_" + data.pos + "-" + code, [data.pos]);
        }
        var nameTxt = ComponentManager.getTextField("" + nameStr, 22, TextFieldConst.COLOR_BROWN);
        topbg.width = 150;
        topbg.height = 35;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, topbg);
        view.addChild(nameTxt);
        var num = this.getScorePer(data);
        var scoretxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandPerScore-" + code, [num.toString()]), 18, TextFieldConst.COLOR_WARN_RED2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scoretxt, topbg, [0, topbg.height + 5]);
        view.addChild(scoretxt);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip36-" + code), 18, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt, bg, [0, 20]);
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
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, bg, [0, 10]);
        if (data.npc) {
            var tipTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip" + (data.level == 7 ? "41" : "27") + "-" + code), 18, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt_1, scoretxt, [0, scoretxt.height + 40]);
            view.addChild(tipTxt_1);
            var init = 0;
            if (view.cfg.mainLand[data.level - 1] && view.cfg.mainLand[data.level - 1].initial) {
                init = view.cfg.mainLand[data.level - 1].initial;
            }
            var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip28-" + code, [init.toString()]), 18, TextFieldConst.COLOR_BLACK);
            tipTxt2.lineSpacing = 5;
            tipTxt2.textAlign = egret.HorizontalAlign.CENTER;
            if (this.vo.checkIsJJL) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt2, scoretxt, [0, scoretxt.height + 110]);
            }
            else {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt2, scoretxt, [0, scoretxt.height + 100]);
            }
            view.addChild(tipTxt2);
        }
        else {
            //头像框
            var headContainer = Api.playerVoApi.getPlayerCircleHead(Number(data.pic), (data.ptitleid));
            view.addChild(headContainer);
            headContainer.addTouchTap(function () {
                NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, {
                    ruid: data.uid,
                    rzid: Api.mergeServerVoApi.getTrueZid(data.uid)
                });
            }, this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, headContainer, scoretxt, [5, scoretxt.height + 2]);
            //玩家名
            var playernameTxt = ComponentManager.getTextField(data.name, 18, TextFieldConst.COLOR_BROWN);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, playernameTxt, headContainer, [-5, headContainer.height]);
            view.addChild(playernameTxt);
            playernameTxt.textColor = Number(data.uid) == Api.playerVoApi.getPlayerID() ? TextFieldConst.COLOR_WARN_YELLOW2 : TextFieldConst.COLOR_BROWN;
            //称号
            // let titleId = data.titleid;
            // let width = 0;
            // if(titleId){
            // 	let titleinfo = App.CommonUtil.getTitleData(titleId);
            // 	if(titleinfo.title != ``){
            // 		let titleImg = App.CommonUtil.getTitlePic(titleinfo);
            // 		titleImg.width = 155;
            // 		titleImg.height = 59;
            // 		titleImg.setScale(0.7);
            // 		width = 155 * 0.7;
            // 		view.setLayoutPosition(LayoutConst.horizontalCentertop, titleImg, playernameTxt, [0,14]);
            // 		view.addChild(titleImg);
            // 	}
            // }
            //军事力量
            var score = 0;
            for (var i in data.team) {
                score += (data.team[i].dps);
            }
            var armynumTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip29", code), [App.StringUtil.changeIntToText(score)]), 18, TextFieldConst.COLOR_BROWN);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, armynumTxt, playernameTxt, [0, playernameTxt.height]);
            view.addChild(armynumTxt);
            armynumTxt.y = playernameTxt.y + playernameTxt.textHeight + (((Number(data.uid) == Api.playerVoApi.getPlayerID() ? tipTxt.y : btn.y) - playernameTxt.y - playernameTxt.textHeight) - armynumTxt.height) / 2;
            if (this.vo.checkIsJJL) {
                armynumTxt.textColor = TextFieldConst.COLOR_WARN_GREEN2;
                armynumTxt.y = scoretxt.height + 180;
            }
        }
        if (Number(data.uid) == Api.playerVoApi.getPlayerID()) {
            if (this.vo.checkIsJJL) {
                var jjbtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acConquerMainLandTip43-" + view.getUiCode(), function () {
                    //嘉奖
                    if (!view.vo.isCanJoin()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                        return;
                    }
                    if (view.vo.getCurPeriod() == 3) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip48"));
                        return;
                    }
                    if (view.vo.getItemNum() == 0) {
                        App.CommonUtil.showTip(LanguageManager.getlocal('itemNumNotEnough'));
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDITEMUSEPOPUPVIEW, {
                        aid: _this.aid,
                        code: _this.code,
                        army: data.teamnum,
                        scoreper: _this.getScorePer(data, false)
                    });
                }, view);
                view.addChild(jjbtn);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, jjbtn, bg, [0, 10]);
            }
            else {
                view.addChild(tipTxt);
            }
        }
        else {
            view.addChild(btn);
        }
    };
    AcConquerMainLandCityInfoItem.prototype.getSpaceX = function () {
        return 5;
    };
    AcConquerMainLandCityInfoItem.prototype.dispose = function () {
        var view = this;
        view._data = null;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandCityInfoItem;
}(ScrollListItem));
__reflect(AcConquerMainLandCityInfoItem.prototype, "AcConquerMainLandCityInfoItem");
//# sourceMappingURL=AcConquerMainLandCityInfoItem.js.map