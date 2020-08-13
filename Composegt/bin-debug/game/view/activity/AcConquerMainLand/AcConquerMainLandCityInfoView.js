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
 * 区服活动排名
 * author qianjun
 */
var AcConquerMainLandCityInfoView = (function (_super) {
    __extends(AcConquerMainLandCityInfoView, _super);
    function AcConquerMainLandCityInfoView() {
        var _this = _super.call(this) || this;
        // 滑动列表
        _this._info = null;
        _this._list = null;
        //定时刷新
        _this._freshTime = 300;
        return _this;
    }
    AcConquerMainLandCityInfoView.prototype.getUiCode = function () {
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
    AcConquerMainLandCityInfoView.prototype.isHaveTitle = function () {
        return true;
    };
    Object.defineProperty(AcConquerMainLandCityInfoView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandCityInfoView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandCityInfoView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandCityInfoView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandCityInfoView.prototype, "cityNum", {
        get: function () {
            return this.param.data.cityNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandCityInfoView.prototype, "cityLevel", {
        get: function () {
            return this.param.data.cityLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandCityInfoView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandCityInfoView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        var arr = ["popupview_bg3", "popupview_bg4", "popupview_bg5", "mainland_cityitem_bg", "mainland_cityitem_noarmy", "mlcity_instate-" + this.getUiCode()];
        if (this.param.data.cityLevel < 3) {
            arr.push("mainlandtiaofu" + code + "-");
            arr.push("mainlandtitleeji" + code + "-");
            arr.push("mainlandtitleyji" + code + "-");
        }
        return _super.prototype.getResourceList.call(this).concat(arr);
    };
    AcConquerMainLandCityInfoView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        var level = view.param.data.cityLevel;
        var num = view.param.data.cityNum;
        this._freshTime = 300;
        var contentBg = this.container.getChildByName('newTitleBg');
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE, view.hide, view);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip13-" + code), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (PlatformManager.checkIsViSp()) {
            tipTxt.size -= 2;
        }
        tipTxt.setPosition(contentBg.x + contentBg.width / 2 - tipTxt.width / 2, this.y + 30);
        view.addChildToContainer(tipTxt);
        var arr = [];
        var landinfo = view.cfg.mainLand[level - 1];
        for (var i in view._info) {
            var unit = view._info[i];
            arr.push({
                level: level,
                num: num,
                pos: Number(unit.segment),
                pic: Number(unit.pic),
                uid: Number(unit.uid),
                npc: Number(unit.npc) == 1,
                titleid: unit.title,
                ptitleid: unit.ptitle,
                name: unit.name,
                team: unit.team,
                teamnum: Number(unit.teamnum),
                zid: Number(unit.zid),
            });
        }
        arr.sort(function (a, b) {
            return a.pos - b.pos;
        });
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 550, 340);
        if (Number(this.cityLevel) > 1) {
            rect2.setTo(0, 0, 550, 670);
        }
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandCityInfoItem, arr, rect2, view.code);
        scrollList.setPosition(60, 80);
        view.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        view._list = scrollList;
        view.setChildIndex(view.closeBtn, 9999);
        if (this.cityLevel == '1' || this.cityLevel == '7') {
            contentBg.height = 430;
        }
        else {
            contentBg.height = 760;
        }
    };
    AcConquerMainLandCityInfoView.prototype.getRequestData = function () {
        var view = this;
        var level = view.param.data.cityLevel;
        var num = view.param.data.cityNum;
        return {
            requestType: NetRequestConst.REQUEST_MAINLAND_GETCITYINFO, requestData: {
                activeId: view.vo.aidAndCode,
                mainland: level,
                building: num
            }
        };
    };
    AcConquerMainLandCityInfoView.prototype.freshList = function () {
        var view = this;
        if (view._list) {
            var arr = [];
            var code = view.getUiCode();
            var level = view.param.data.cityLevel;
            var num = view.param.data.cityNum;
            var landinfo = view.cfg.mainLand[level - 1];
            for (var i in view._info) {
                var unit = view._info[i];
                arr.push({
                    level: level,
                    num: num,
                    pos: Number(unit.segment),
                    pic: Number(unit.pic),
                    uid: Number(unit.uid),
                    npc: Number(unit.npc) == 1,
                    titleid: unit.title,
                    titlelv: unit.titlelv || 0,
                    ptitleid: unit.ptitle,
                    name: unit.name,
                    team: unit.team,
                    teamnum: Number(unit.teamnum),
                    zid: Number(unit.zid),
                });
            }
            arr.sort(function (a, b) {
                return a.pos - b.pos;
            });
            view._list.refreshData(arr, view.code);
        }
    };
    AcConquerMainLandCityInfoView.prototype.receiveData = function (data) {
        var view = this;
        view._info = data.data.data.buildinginfo;
        view.freshList();
    };
    // protected resetBgSize():void{
    // 	super.resetBgSize();
    // 	this.closeBtn.x = 551;
    // 	// let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`loctombranktip-${this.code}`),22,TextFieldConst.COLOR_LIGHT_YELLOW);
    // 	// App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt, this.viewBg, [0,this.viewBg.height]);
    // 	// this.addChild(tipTxt);
    // 	// tipTxt.visible = false;
    // 	// this._tipTxt = tipTxt;
    // }
    // protected getShowWidth():number{
    // 	return 590;
    // }
    AcConquerMainLandCityInfoView.prototype.getShowHeight = function () {
        if (this.cityLevel == '1' || this.cityLevel == '7') {
            return 520;
        }
        else {
            return 850;
        }
    };
    // 标题背景名称
    // protected getTitleBgName():string{
    // 	return null;
    // }
    // 标题背景名称
    AcConquerMainLandCityInfoView.prototype.getTitleStr = function () {
        return "acmainlandcity" + this.cityLevel + "_" + this.cityNum + "-" + this.code;
    };
    AcConquerMainLandCityInfoView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcConquerMainLandCityInfoView.prototype.tick = function () {
        if (this._freshTime && this._freshTime > 0) {
            this._freshTime--;
        }
        else {
            this._freshTime = 300;
            var view = this;
            var level = view.param.data.cityLevel;
            var num = view.param.data.cityNum;
            this.request(NetRequestConst.REQUEST_MAINLAND_GETCITYINFO, {
                activeId: view.vo.aidAndCode,
                mainland: level,
                building: num
            });
        }
    };
    AcConquerMainLandCityInfoView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE, view.hide, view);
        view._info = null;
        view._list = null;
        view._freshTime = 300;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandCityInfoView;
}(PopupView));
__reflect(AcConquerMainLandCityInfoView.prototype, "AcConquerMainLandCityInfoView");
