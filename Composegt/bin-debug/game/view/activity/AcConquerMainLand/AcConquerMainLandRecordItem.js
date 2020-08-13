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
 * desc:战功记录Item
*/
var AcConquerMainLandRecordItem = (function (_super) {
    __extends(AcConquerMainLandRecordItem, _super);
    function AcConquerMainLandRecordItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcConquerMainLandRecordItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandRecordItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandRecordItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandRecordItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_CONQUERMAINLAND;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandRecordItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandRecordItem.prototype.getUiCode = function () {
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
    AcConquerMainLandRecordItem.prototype.initItem = function (index, data, itemparam) {
        var _this = this;
        var view = this;
        /**参数
        *   time 时间戳
            type 1 开战提示 2倍率变动 3今日战斗结束 4我方成功占领 5敌方攻占 6我方撤出 7npc战斗
            cityId 地点
            uid 敌方uid
            army 军队 123
            lasttime 占领时长
            score 总获取战功
            buff 倍率
        */
        view._code = itemparam;
        view.width = 606;
        var code = view.getUiCode();
        var timeBgStr = "mainland_recorditem_timebg1";
        if (data.type == 5) {
            timeBgStr = "mainland_recorditem_timebg2";
        }
        var timeBg = BaseBitmap.create(timeBgStr);
        timeBg.setPosition(this.x + 20, this.y + 12);
        this.addChild(timeBg);
        var timeTxt = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(data.time, 13), 20, TextFieldConst.COLOR_BROWN_NEW);
        timeTxt.setPosition(timeBg.x + 10, timeBg.y + 8);
        this.addChild(timeTxt);
        var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN_NEW);
        tipTxt.width = 460;
        tipTxt.lineSpacing = 5;
        tipTxt.x = timeTxt.x;
        tipTxt.y = timeBg.y + timeBg.height + 10;
        var cityName = "";
        if (data.cityId) {
            cityName = view.vo.getCityName(data.citylevel + "_" + data.cityNum + "_" + data.cityIdx);
        }
        var param = new Array();
        switch (data.type) {
            case 1:
                tipTxt.text = LanguageManager.getlocal("acmainlandrecord" + data.type + "-" + code, [LanguageManager.getlocal("acmainlandwar" + data.army + "-" + code)]);
                break;
            case 2:
                tipTxt.text = LanguageManager.getlocal("acmainlandrecord" + data.type + "-" + code, [data.buff]);
                break;
            case 3:
                tipTxt.text = LanguageManager.getlocal("acmainlandrecord" + data.type + "-" + code, [LanguageManager.getlocal("acmainlandwar" + data.army + "-" + code)]);
                break;
            case 4:
            case 7:
                param.push({
                    text: LanguageManager.getlocal("acmainlandrecord4-" + code)
                }, {
                    text: cityName,
                    style: { "underline": true, textColor: 0x11a972 },
                });
                break;
            case 5:
                param.push({
                    text: LanguageManager.getlocal("acmainlandrecord" + data.type + "_1-" + code, [data.fname]),
                }, {
                    text: cityName + "\n",
                    style: { "underline": true, textColor: 0x11a972 },
                }, {
                    text: LanguageManager.getlocal("acmainlandrecord" + data.type + "_2-" + code, [LanguageManager.getlocal("acmainlandarmy" + data.army + "-" + code)]),
                }, {
                    text: cityName,
                    style: { "underline": true, textColor: 0x11a972 },
                }, {
                    text: LanguageManager.getlocal("acmainlandrecord" + data.type + "_3-" + code, [App.DateUtil.getFormatBySecond(data.lasttime, 14)]),
                }, {
                    text: LanguageManager.getlocal("acmainlandrecord" + data.type + "_4-" + code, [data.score]),
                    style: { textColor: 0xbb2800 },
                });
                break;
            case 6:
                param.push({
                    text: LanguageManager.getlocal("acmainlandrecord" + data.type + "_1-" + code, [LanguageManager.getlocal("acmainlandarmy" + data.army + "-" + code)]),
                }, {
                    text: cityName,
                    style: { "underline": true, textColor: 0x11a972 },
                }, {
                    text: LanguageManager.getlocal("acmainlandrecord" + data.type + "_2-" + code),
                }, {
                    text: cityName,
                    style: { "underline": true, textColor: 0x11a972 },
                }, {
                    text: LanguageManager.getlocal("acmainlandrecord" + data.type + "_3-" + code, [App.DateUtil.getFormatBySecond(data.lasttime, 14)]),
                }, {
                    text: LanguageManager.getlocal("acmainlandrecord" + data.type + "_4-" + code, [data.score]),
                    style: { textColor: 0xbb2800 },
                });
                break;
        }
        if (param.length) {
            tipTxt.textFlow = param;
        }
        view.height = Math.max(tipTxt.height + timeBg.height + 5, 50) + 50 + 5;
        if (data.cityId) {
            tipTxt.addTouchTap(function () {
                if (!view.vo.isInActivity()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acBattlePassTimeEnd"));
                    return;
                }
                //跳转前往战场
                var period = view.vo.getCurPeriod();
                if (period == 2) {
                    var warview = ViewController.getInstance().getView(ViewConst.COMMON.ACCONQUERMAINLANDWARVIEW);
                    var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
                    if (warview) {
                        baseview.hide();
                        ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDCITYINFOVIEW, {
                            aid: view.aid,
                            code: view.code,
                            cityLevel: data.citylevel,
                            cityNum: data.cityNum
                        });
                    }
                    else {
                        ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDWARVIEW, {
                            aid: view.aid,
                            code: view.code,
                            change: {
                                level: data.citylevel,
                                num: data.cityNum
                            }
                        });
                        baseview.hide();
                    }
                }
                else if (period == 3) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip25-" + code));
                }
            }, view, null);
        }
        if (data.cityId && data.type != 6) {
            var hfBtn = ComponentManager.getButton("mainland_recorditem_review", "", function () {
                if (data.type == 7) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acmainlandrecordtip1-" + code));
                    return;
                }
                var wardata = {
                    info: {
                        team: data.fightteam.mteam,
                        titleId: data.title,
                        zid: Api.mergeServerVoApi.getTrueZid(data.uid),
                        name: data.name,
                    },
                    tinfo: {
                        team: data.fightteam.fteam,
                        titleId: data.ftitle,
                        zid: Api.mergeServerVoApi.getTrueZid(data.fuid),
                        name: data.fname,
                    },
                };
                ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDWARSHOWVIEW, {
                    aid: _this.aid,
                    code: _this.code,
                    wardata: wardata,
                    result: data.type == 4 ? "win" : "fail",
                    cityName: view.vo.getCityName(data.citylevel + "_" + data.cityNum),
                    cityName2: view.vo.getCityName(data.citylevel + "_" + data.cityNum + "_" + data.cityIdx),
                });
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, hfBtn, this, [35, 0]);
            view.addChild(hfBtn);
        }
        view.addChild(tipTxt);
        var line = BaseBitmap.create("public_line4");
        this.addChild(line);
        line.width = this.width - 10;
        line.x = 8;
        line.y = this.height - line.height;
    };
    AcConquerMainLandRecordItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcConquerMainLandRecordItem.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandRecordItem;
}(ScrollListItem));
__reflect(AcConquerMainLandRecordItem.prototype, "AcConquerMainLandRecordItem");
