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
 对战信息logitem
 * author qianjun
 */
var AcConquerMainLandLogItem = (function (_super) {
    __extends(AcConquerMainLandLogItem, _super);
    function AcConquerMainLandLogItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcConquerMainLandLogItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandLogItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandLogItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandLogItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_CONQUERMAINLAND;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandLogItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandLogItem.prototype.getUiCode = function () {
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
    AcConquerMainLandLogItem.prototype.initItem = function (index, data, itemparam) {
        var _this = this;
        var view = this;
        view._data = data;
        view._code = itemparam;
        this.width = 580;
        // childInfo.total
        this._data = data;
        this._code = itemparam;
        this._itemIndex = index;
        var code = view.getUiCode();
        // let nameTxt = ComponentManager.getTextField(`${index + 1}. ${LanguageManager.getlocal(`atkraceyamenid`,[data.winId])}`, 20, TextFieldConst.COLOR_WARN_YELLOW2);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nameTxt, view, [0,5]);
        // view.addChild(nameTxt);
        var str = index + 1 + ".";
        var cityname = view.vo.getCityName(data.citylevel + "_" + data.cityNum + "_" + data.cityIdx);
        //撤军
        if (data.callback) {
            str = LanguageManager.getlocal("acConquerMainLandLog5_1-" + code, [data.winName, cityname]);
        }
        else {
            /**1
            * 通报标头→玩家ID 成功夺取 地标名
            * 进攻胜利通报：玩家ID 已成功夺取 地标名
            * 防御胜利通报：玩家ID 成功防御 地标名
            * */
            var str1 = LanguageManager.getlocal("acConquerMainLandLog1_" + data.title.type + "-" + code, [data.winName, cityname]);
            /**2
            * （通报内容）→玩家ID 出动大军，来势汹汹，击败了 玩家ID2，成功夺取了 地标名！
            * */
            var str2 = "";
            if (data.report.type == 5) {
                str2 = LanguageManager.getlocal("acConquerMainLandLog2_" + data.report.type + "_" + data.report.rid + "-" + code, [data.winName, data.loseName, cityname]);
            }
            else {
                str2 = LanguageManager.getlocal("acConquerMainLandLog2_" + data.report.type + "-" + code, [data.winName, data.loseName, cityname]);
            }
            /**3
            * （接②，连胜通报）→并取得x连胜！
            * */
            var str3 = "";
            if (data.win.type) {
                str3 = LanguageManager.getlocal("acConquerMainLandLog3_" + data.win.type + "-" + code, [data.win.type == 1 ? data.win.num : data.loseName, data.win.num]);
            }
            str = str1 + "\n" + str2 + str3;
        }
        /**4
        * 时间戳
        * */
        // str += `\n${App.DateUtil.getFormatBySecond(data.time, 9)}`;   
        var descTxt = ComponentManager.getTextField(str, 18, TextFieldConst.COLOR_BROWN_NEW);
        descTxt.width = 450;
        descTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt, view, [25, 10]);
        view.addChild(descTxt);
        var timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBattileGroundTime-" + view._code, [App.DateUtil.getFormatBySecond(data.time, 13)]), 18, TextFieldConst.COLOR_BROWN_NEW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, descTxt, [0, descTxt.textHeight + 7]);
        view.addChild(timeTxt);
        this.height = timeTxt.y + timeTxt.textHeight + 15;
        var line = BaseBitmap.create("public_line4");
        line.width = view.width - 10;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view, [3, 0]);
        this.addChild(line);
        var hfBtn = ComponentManager.getButton("dinner_detail", "", function () {
            //刷新界面
            var attackwin = data.title.type == 1;
            var wardata = {
                info: {
                    team: attackwin ? data.winteam : data.loseteam,
                    titleId: attackwin ? data.winTitle : data.loseTitle,
                    zid: attackwin ? data.winzid : data.losezid,
                    name: attackwin ? data.winName : data.loseName,
                },
                tinfo: {
                    team: !attackwin ? data.winteam : data.loseteam,
                    titleId: !attackwin ? data.winTitle : data.loseTitle,
                    zid: !attackwin ? data.winzid : data.losezid,
                    name: !attackwin ? data.winName : data.loseName,
                },
            };
            ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDWARSHOWVIEW, {
                aid: _this.aid,
                code: _this.code,
                wardata: wardata,
                result: "win",
                attackwin: attackwin,
                cityName: view.vo.getCityName(data.citylevel + "_" + data.cityNum),
                cityName2: view.vo.getCityName(data.citylevel + "_" + data.cityNum + "_" + data.cityIdx),
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, hfBtn, view, [10, 0]);
        view.addChild(hfBtn);
        hfBtn.visible = !data.callback;
    };
    AcConquerMainLandLogItem.prototype.clickItemHandler = function (event) {
        this.showUserInfo();
    };
    AcConquerMainLandLogItem.prototype.showUserInfo = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._data.uid });
    };
    AcConquerMainLandLogItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
        ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW, data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
    };
    AcConquerMainLandLogItem.prototype.cancelBlock = function () {
        var data = this._data;
        if (data.type == 'choosevisit') {
            var itemid = 1411;
            var info = Api.adultVoApi.getAdultInfoVoById(this._data.childid);
            var itemUseCount = Api.adultVoApi.getVisitUseByQuality(info.aquality);
            var itemCount = Api.itemVoApi.getItemNumInfoVoById(itemid);
            var itemCfg = Config.ItemCfg.getItemCfgById(itemid);
            var message = LanguageManager.getlocal("adultvisiconfirm", [itemCfg.name + "x" + itemUseCount, this._data.name]);
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {
                confirmCallback: this.useItemConfirmCallbackHandler,
                handler: this,
                icon: itemCfg.icon,
                iconBg: itemCfg.iconBg,
                num: itemCount,
                useNum: itemUseCount,
                msg: message,
                id: itemid
            });
        }
        else {
            //this.request(NetRequestConst.REQUEST_RADULT_PROPOSE, { childId: this._adultInfoVo.id });
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSE_SADUNMARRY, { "fuid": this._data.uid, "childId": this._data.id });
            // NetManager.request(NetRequestConst.REQUEST_RADULT_PROPOSE, {
            // 	childId : this._data.childid, 
            // 	fuid : this._data.uid ,
            // 	protype : 2
            // });
            // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CLICKMARRY,{"id":this._data.id,"childId":this._data.childId});
        }
    };
    AcConquerMainLandLogItem.prototype.useItemConfirmCallbackHandler = function (evt) {
        NetManager.request(NetRequestConst.REQUEST_SADUN_VISIT, {
            childId: this._data.childid,
            fuid: this._data.uid || 0,
            protype: 3
        });
        Api.adultVoApi.setVisitId(this._data.uid);
        //App.CommonUtil.showTip(LanguageManager.getlocal('adultissendVisit'));
    };
    AcConquerMainLandLogItem.prototype.doShield = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CANCEBLOCK, { "uid": this._data.uid, "name": this._data.name });
    };
    AcConquerMainLandLogItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcConquerMainLandLogItem.prototype.dispose = function () {
        this._data = null;
        // this._applyBtn = null;
        // this._cancelApplyBtn = null;
        this._itemIndex = null;
        this._nameTf = null;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandLogItem;
}(ScrollListItem));
__reflect(AcConquerMainLandLogItem.prototype, "AcConquerMainLandLogItem");
