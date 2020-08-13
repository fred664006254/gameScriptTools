var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 三国加入确认面板
 * author qianjun
 * date 2017/11/24
 * @class ConfirmPopupView
 * 参数 ：title,msg,callback,handler  needCancel
 *
 */
var BigIconLeftMorePopupView = /** @class */ (function (_super) {
    __extends(BigIconLeftMorePopupView, _super);
    function BigIconLeftMorePopupView() {
        var _this = _super.call(this) || this;
        //左侧icon list
        _this._leftIconList = [];
        _this._leftIconMsgList = [];
        _this._leftIconMsgListBak = [];
        _this._stop = false;
        _this._leftIconArrowContainer = null;
        _this._callback = null;
        return _this;
    }
    BigIconLeftMorePopupView.prototype.getBgName = function () {
        return "public_lefticonbg";
    };
    BigIconLeftMorePopupView.prototype.getCloseBtnName = function () {
        return null; //`popupview_closebtn2`;
    };
    BigIconLeftMorePopupView.prototype.initBg = function () {
        var view = this;
        var tmpY = view.param.data.posY;
        _super.prototype.initBg.call(this);
        view._leftIconArrowContainer = new BaseDisplayObjectContainer();
        view._leftIconArrowContainer.width = 67;
        view._leftIconArrowContainer.height = 54;
        view._leftIconArrowContainer.anchorOffsetX = this._leftIconArrowContainer.width / 2;
        view._leftIconArrowContainer.x = 50;
        view._leftIconArrowContainer.y = tmpY;
        view._leftIconArrowContainer.scaleX = 1;
        view.addChild(view._leftIconArrowContainer);
        var arrow = BaseBitmap.create("public_lefticonarrow");
        view._leftIconArrowContainer.addChild(arrow);
        var eff = ComponentManager.getCustomMovieClip("lefticonarrow", 10);
        eff.width = 67;
        eff.height = 54;
        eff.playWithTime(-1);
        view._leftIconArrowContainer.addChild(eff);
        view._leftIconArrowContainer.addTouchTap(function () {
            //打开弹窗
            view._leftIconArrowContainer.alpha = 0;
            view.hide();
        }, view, null);
    };
    // 打开该面板时，需要传参数msg
    BigIconLeftMorePopupView.prototype.initView = function () {
        var view = this;
        var arr = Config.BigiconCfg.getBigIcon();
        var maxlen = Config.BigiconCfg.getMaxIconLength();
        view.viewBg.height = 173 + (Math.ceil((arr.length - maxlen) / 3) - 1) * 110;
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsRuLang) {
            view.viewBg.height = 193 + (Math.ceil((arr.length - maxlen) / 3) - 1) * 130;
        }
    };
    BigIconLeftMorePopupView.prototype.resetBgSize = function () {
        var view = this;
        var tmpY = view.param.data.posY;
        _super.prototype.resetBgSize.call(this);
        var arr = Config.BigiconCfg.getBigIcon();
        var maxlen = Config.BigiconCfg.getMaxIconLength();
        var pow = Math.ceil((arr.length - maxlen) / 3);
        view.viewBg.x = 110;
        view.viewBg.y = tmpY - 35 - (pow - 1) * 115;
        view.container.x = view.viewBg.x;
        view.container.y = view.viewBg.y;
        view.sortLeftIcon();
        view.initLeftIcon();
        view.checkLeftRedpoint();
        view.setLeftIconPos();
        view.viewBg.x = -view.viewBg.width;
        view.container.x = -view.viewBg.width;
        view._leftIconArrowContainer.alpha = 0;
        var speed = 1.5;
        view._stop = true;
        egret.Tween.get(view.viewBg).to({ x: 110 }, (view.viewBg.width + 110) / speed).call(function () {
            egret.Tween.removeTweens(view.viewBg);
            view._leftIconArrowContainer.alpha = 1;
        }, view);
        egret.Tween.get(view.container).to({ x: 110 }, (view.viewBg.width + 110) / speed).call(function () {
            egret.Tween.removeTweens(view.container);
            view._stop = false;
        }, view);
    };
    BigIconLeftMorePopupView.prototype.tick = function () {
        this.sortLeftIcon();
        this.initLeftIcon();
        this.checkLeftRedpoint();
        this.setLeftIconPos();
        if (GameData.checkTimeLimitWife()) {
            var container = this.container.getChildByName("timelimitwife_");
            if (container) {
                var vo = Api.shopVoApi.getPayInfoById2("g16");
                var cfg = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
                var str = App.DateUtil.getFormatBySecond(vo.st + cfg.lastTime - GameData.serverTime, 1);
                var timeTF = container.getChildByName("timelimitwife_TF");
                if (timeTF) {
                    timeTF.text = str;
                }
            }
        }
        else {
            this.removeLeftIcon("timelimitwife");
        }
    };
    BigIconLeftMorePopupView.prototype.sortLeftIcon = function () {
        var iconStr = null;
        var iconMsg = null;
        this._leftIconMsgListBak = this._leftIconMsgList;
        this._leftIconMsgList = [];
        var arr = Config.BigiconCfg.getBigIcon();
        var maxlen = Config.BigiconCfg.getMaxIconLength();
        for (var i = maxlen; i < arr.length; ++i) {
            if (arr[i]) {
                this._leftIconMsgList.push(arr[i]);
            }
        }
    };
    //初始化左侧icon栏
    BigIconLeftMorePopupView.prototype.initLeftIcon = function (init) {
        if (init === void 0) { init = false; }
        var l = this._leftIconMsgList.length;
        var lBak = this._leftIconMsgListBak.length;
        var change = false;
        //remove icon
        for (var j = lBak - 1; j >= 0; j--) {
            var isdelete = true;
            for (var i = l - 1; i >= 0; i--) {
                if ((this._leftIconMsgList[i].activity + this._leftIconMsgList[i].type) == (this._leftIconMsgListBak[j].activity + this._leftIconMsgListBak[j].type)) {
                    isdelete = false;
                }
            }
            if (isdelete) {
                change = true;
                this.removeLeftIcon(this._leftIconMsgListBak[j].activity);
            }
        }
        //add icon
        for (var i = 0; i < l; i++) {
            var isadd = true;
            if (this._leftIconMsgList[i].activity == "battlePass" && Number(this._leftIconMsgList[i].type) == 4) {
                continue;
            }
            if (this._leftIconMsgList[i].activity == "timelimitwife" && !GameData.checkTimeLimitWife()) {
                continue;
            }
            for (var j = 0; j < lBak; j++) {
                if ((this._leftIconMsgList[i].activity + this._leftIconMsgList[i].type) == (this._leftIconMsgListBak[j].activity + this._leftIconMsgListBak[j].type)) {
                    isadd = false;
                }
            }
            if (isadd) {
                change = true;
                this.createLeftIcon(this._leftIconMsgList[i]);
            }
        }
        for (var i in this._leftIconList) {
            var name_1 = this._leftIconList[i].name.split("_")[0];
            var isdelete = true;
            for (var j in this._leftIconMsgList) {
                if (this._leftIconMsgList[j].activity == name_1) {
                    isdelete = false;
                    break;
                }
            }
            if (isdelete) {
                this.removeLeftIcon(this._leftIconList[i].name, true);
            }
        }
    };
    BigIconLeftMorePopupView.prototype.createLeftIcon = function (iconMsg) {
        var modelName = iconMsg.activity;
        var type = iconMsg.type;
        for (var i in this._leftIconList) {
            if (this._leftIconList[i].name && this._leftIconList[i].name == (modelName + "_" + type)) {
                return;
            }
        }
        var iconContainer;
        var ismainui = iconMsg.ismainui && iconMsg.ismainui == 1;
        //主页面图标
        if (ismainui) {
            var str = null;
            if (modelName == "timelimitwife") {
                var vo = Api.shopVoApi.getPayInfoById2("g16");
                var cfg = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
                str = App.DateUtil.getFormatBySecond(vo.st + cfg.lastTime - GameData.serverTime, 1);
            }
            iconContainer = App.CommonUtil.createMainUIIcon(iconMsg.activity.toLowerCase() + "_icon", iconMsg.activity.toLowerCase() + "_icon_name", true, 0, {
                aid: modelName.toLowerCase(),
                type: type + ""
            }, str);
            iconContainer.addTouchTap(function () {
                //引导过程种不响应
                if (Api.rookieVoApi.isGuiding) {
                    return;
                }
                var viewName = App.StringUtil.firstCharToUper(modelName) + "View";
                var popupViewName = App.StringUtil.firstCharToUper(modelName) + "PopupView";
                var param = null;
                if (egret.hasDefinition(viewName) == false && egret.hasDefinition(popupViewName)) {
                    viewName = popupViewName;
                }
                if (modelName == "rechargeVip") {
                    viewName += "|1";
                }
                else if (modelName == "firstrecharge") {
                    if (Api.switchVoApi.checkWeChatFirstcharge()) {
                        viewName = ViewConst.POPUP.FIRSTRECHARGEVIEW;
                    }
                    else {
                        viewName = ViewConst.COMMON.WELFAREVIEWFIRSTRECHARGE;
                    }
                }
                else if (modelName == "monthcard") {
                    viewName = ViewConst.COMMON.WELFAREVIEWMONTHCARD;
                }
                else if (modelName == "yearcard") {
                    viewName = ViewConst.COMMON.WELFAREVIEWYEARCARD;
                }
                else if (modelName == "candyget") {
                    viewName = ViewConst.POPUP.CANDYGETPOPUPVIEW;
                }
                else if (modelName == "newcharge") {
                    viewName = ViewConst.COMMON.WELFAREVIEWRECHARGEBOX;
                }
                else if (modelName == "sign2" || modelName == "sign3" || modelName == "sign7" || modelName == "augustsign") {
                    viewName = ViewConst.COMMON.WELFAREVIEWSIGNIN;
                }
                else if (modelName == "rebate") {
                    viewName = ViewConst.COMMON.WELFAREVIEWREBATE;
                }
                else if (modelName == "rebate2") {
                    viewName = ViewConst.COMMON.WELFAREVIEWREBATE2;
                }
                else if (modelName == "fqStrategy") {
                    if (Api.switchVoApi.checkOpenStrengthen() && Config.GameprojectCfg.closeFunction && Api.playerVoApi.getPlayerLevel() < Config.GameprojectCfg.closeFunction) {
                        viewName = ViewConst.COMMON.FQSTRATEGYVIEWTAB3;
                    }
                    else {
                        viewName = ViewConst.COMMON.FQSTRATEGYVIEW;
                    }
                }
                else if (modelName == 'playerReturn') {
                    viewName == ViewConst.COMMON.PLAYERRETURNVIEW;
                }
                else if (modelName == "timelimitwife") {
                    viewName = ViewConst.POPUP.TIMELIMITWIFEVIEW;
                }
                else if (modelName == "limitedgift") {
                    viewName = ViewConst.POPUP.LIMITEDGIFTVIEW;
                }
                else if (modelName == "wywegameqq") {
                    viewName = ViewConst.POPUP.EGAMEQQPOPUPVIEW;
                }
                // else if(modelName == "strengthen")
                // {
                // 	viewName=ViewConst.POPUP.STRENGTHENPOPUPVIEW;
                // }
                else if (modelName == "welfare") {
                    var firstRechargeflag = Api.shopVoApi.getPayFlag();
                    if (firstRechargeflag == 0 && Api.rechargeVoApi.checkFirstRecharge() && !Api.switchVoApi.checkClosePay()) {
                        viewName = ViewConst.COMMON.WELFAREVIEWFIRSTRECHARGE;
                    }
                }
                else if (modelName == "sevenDaysSignUp1" || modelName == "sevenDaysSignUp2" || modelName == "sevenDaysSignUp7") {
                    viewName = ViewConst.COMMON.SEVENDAYSSIGNUPVIEW;
                }
                else if (modelName == "newCrossServerAtkRace") {
                    viewName = "AcNewCrossServerAtkRaceView";
                }
                //不要跟随着随意加if了，大部分都是无用的，尽量走规范
                ViewController.getInstance().openView(viewName);
                // window.open("https://www.baidu.com");
            }, this);
        }
        //活动图标
        else {
            iconContainer = Api.acVoApi.getAcIconListByAid(iconMsg.activity, [], null, {
                aid: modelName,
                type: type + ""
            })[0];
        }
        iconContainer.name = modelName + "_" + type;
        this._leftIconList.push(iconContainer);
        this.addChildToContainer(iconContainer);
        return iconContainer;
    };
    BigIconLeftMorePopupView.prototype.removeLeftIcon = function (modelName, isChildName) {
        if (isChildName === void 0) { isChildName = false; }
        var l = this._leftIconList.length;
        var iconname = "";
        if (isChildName) {
            iconname = modelName;
        }
        else {
            for (var _i = 0, _a = this._leftIconMsgList; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.activity == modelName) {
                    iconname = i.activity + "_" + i.type;
                    break;
                }
            }
        }
        for (var i = l - 1; i >= 0; i--) {
            if (this._leftIconList[i].name && this._leftIconList[i].name == iconname) {
                this._leftIconList[i].dispose();
                this._leftIconList.splice(i, 1);
                break;
            }
        }
    };
    BigIconLeftMorePopupView.prototype.getLeftIcon = function (modelName) {
        var iconname = "";
        for (var _i = 0, _a = this._leftIconMsgList; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.activity == modelName) {
                iconname = i.activity + "_" + i.type;
                break;
            }
        }
        var l = this._leftIconList.length;
        var obj = null;
        for (var i = l - 1; i >= 0; i--) {
            if (this._leftIconList[i].name && this._leftIconList[i].name == iconname) {
                obj = this._leftIconList[i];
                break;
            }
        }
        return obj;
    };
    BigIconLeftMorePopupView.prototype.checkLeftRedpoint = function () {
        //活动部分 首冲月卡年卡在原有方法中处理
        var leftactlist = this._leftIconList;
        var leftred = false;
        for (var i in leftactlist) {
            var unit = leftactlist[i].name;
            var aid = unit.split("_")[0];
            var type = unit.split("_")[1] ? unit.split("_")[1] : '';
            var vo = null;
            if (type == "") {
                if (aid == "battlePass") {
                    var voList = Api.acVoApi.getActivityVoListByAid(aid);
                    for (var i_1 = 0; i_1 < voList.length; ++i_1) {
                        var acvo = voList[i_1];
                        if (Number(acvo.code) != 4 && Number(acvo.code) != 7) {
                            vo = acvo;
                            break;
                        }
                    }
                }
                else {
                    vo = Api.acVoApi.getActivityVoByAidAndCode(aid);
                }
            }
            else {
                vo = Api.acVoApi.checkActivityStartByAidAndType(aid, type);
            }
            if (vo && vo.isStart && (vo.isShowRedDot == true)) { //
                App.CommonUtil.addIconToBDOC(leftactlist[i]);
                leftred = true;
                var redpot = leftactlist[i].getChildByName("reddot");
                if (redpot) {
                    redpot.x = 90;
                    redpot.y = 20;
                }
            }
            else {
                App.CommonUtil.removeIconFromBDOC(leftactlist[i]);
            }
        }
        if (leftred) {
            App.CommonUtil.addIconToBDOC(this._leftIconArrowContainer);
            var redpot = this._leftIconArrowContainer.getChildByName("reddot");
            if (redpot) {
                redpot.x = this._leftIconArrowContainer.scaleX == 1 ? 45 : 0;
                redpot.y = 0;
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._leftIconArrowContainer);
        }
    };
    BigIconLeftMorePopupView.prototype.setLeftIconPos = function () {
        var view = this;
        var tmpY = this.param.data.posY;
        var arr = Config.BigiconCfg.getBigIcon();
        var maxlen = Config.BigiconCfg.getMaxIconLength();
        var pow = Math.ceil((arr.length - maxlen) / 3);
        view.viewBg.y = tmpY - 35 - (pow - 1) * 115;
        view.viewBg.height = 173 + (Math.ceil((arr.length - maxlen) / 3) - 1) * 110;
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsRuLang) {
            view.viewBg.height = 193 + (Math.ceil((arr.length - maxlen) / 3) - 1) * 130;
        }
        view.container.y = view.viewBg.y;
        for (var i in this._leftIconMsgList) {
            var unit = this._leftIconMsgList[i];
            var icon = this.container.getChildByName(unit.activity + "_" + unit.type);
            if (icon) {
                icon.x = 30 + (Number(i) % 3) * 135 + icon.anchorOffsetX;
                icon.y = tmpY - this.container.y - Math.floor(Number(i) / 3) * 117 + icon.anchorOffsetY - 15;
            }
        }
        if (view._leftIconMsgList.length == 0) {
            view.hide();
        }
    };
    BigIconLeftMorePopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    BigIconLeftMorePopupView.prototype.getTitleStr = function () {
        return null;
    };
    BigIconLeftMorePopupView.prototype.hide = function () {
        var _this = this;
        var view = this;
        if (view._stop) {
            return;
        }
        var speed = 1.5;
        view._leftIconArrowContainer.alpha = 0;
        egret.Tween.get(view.viewBg).to({ x: -view.viewBg.width }, (110 + view.viewBg.width) / speed).call(function () {
            egret.Tween.removeTweens(view.viewBg);
        }, view);
        egret.Tween.get(view.container).to({ x: -view.viewBg.width }, (110 + view.viewBg.width) / speed).call(function () {
            egret.Tween.removeTweens(view.container);
            if (_this.param.data.callback) {
                _this.param.data.callback.apply(_this.param.data.handler, [_this]);
            }
            _super.prototype.hide.call(_this);
        }, view);
    };
    //是否展示弹窗动效
    BigIconLeftMorePopupView.prototype.isShowOpenAni = function () {
        return false;
    };
    BigIconLeftMorePopupView.prototype.dispose = function () {
        //左侧icon list
        this._stop = false;
        this._leftIconList = [];
        this._leftIconMsgList = [];
        this._leftIconMsgListBak = [];
        this._leftIconArrowContainer.dispose();
        _super.prototype.dispose.call(this);
    };
    return BigIconLeftMorePopupView;
}(PopupView));
//# sourceMappingURL=BigIconLeftMorePopupView.js.map