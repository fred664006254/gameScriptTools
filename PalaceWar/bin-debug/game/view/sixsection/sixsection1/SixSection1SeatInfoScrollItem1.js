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
* 据点 item
* date 2020.5.13
* author ycg
* @name SixSection1SeatInfoScrollItem1
*/
var SixSection1SeatInfoScrollItem1 = /** @class */ (function (_super) {
    __extends(SixSection1SeatInfoScrollItem1, _super);
    function SixSection1SeatInfoScrollItem1() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._titleBg = null;
        _this._holdTimeDown = null;
        _this._getTime = null;
        _this._getTimeDown = null;
        _this._getInfo = null;
        _this._getBtn = null;
        _this._getInfoEnd = null;
        _this._getTxt = null;
        _this._loseInfo = null;
        _this._attackName = null;
        return _this;
    }
    SixSection1SeatInfoScrollItem1.prototype.initItem = function (index, data, param) {
        this._data = data;
        this.width = 530;
        var bg = BaseBitmap.create("public_popupscrollitembg");
        // bg.height = 260;
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        var titleBg = BaseBitmap.create("sixsection1_spointresult_titlebg");
        titleBg.width = this.width - 150;
        titleBg.setPosition(bg.x + 5, bg.y + 5);
        this.addChild(titleBg);
        this._titleBg = titleBg;
        var baseCfg = data.baseCfg.baseCfg;
        // console.log("inititem ", data);
        var seatName = "sixSection1BuildName" + (baseCfg.index + 1);
        var titleName = ComponentManager.getTextField((index + 1) + "." + LanguageManager.getlocal(seatName) + "<u>(" + data.data.x + "," + data.data.y + ")</u>", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleName.setPosition(titleBg.x + 5, titleBg.y + titleBg.height / 2 - titleName.height / 2);
        this.addChild(titleName);
        titleName.addTouchTap(this.clickLine, this, [data.data.x]);
        //占领时间
        var holdTime = App.DateUtil.getFormatBySecond(GameData.serverTime - data.data.attackst, 4);
        var timeDown = ComponentManager.getTextField(holdTime, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeDown.setPosition(titleBg.x + titleBg.width - timeDown.width - 35, titleBg.y + titleBg.height / 2 - timeDown.height / 2);
        this.addChild(timeDown);
        this._holdTimeDown = timeDown;
        //席位
        var seat = BaseBitmap.create("sixsection1_seaticon");
        seat.setPosition(bg.x + 10, titleBg.y + titleBg.height + 20);
        this.addChild(seat);
        //剩余采集时间
        var getTimeStr = LanguageManager.getlocal("sixSection1SeatInfoPointGetTime", ["" + LanguageManager.getlocal("sixSection1SeatInfoTimeEnd")]);
        var getTimeDownStr = "";
        var getInfoNum = 0;
        if (data.status == 0 || data.status == 1) {
            var remainTime = data.data.st + Math.ceil(data.data.remain * 3600 / baseCfg.shujijingyanSpeed);
            var getTimeNum = remainTime - GameData.serverTime;
            if (getTimeNum > 0) {
                getTimeStr = LanguageManager.getlocal("sixSection1SeatInfoPointGetTime", ["" + App.DateUtil.getFormatBySecond(getTimeNum, 1)]);
            }
            var collSt = data.data.st;
            if (data.data.collectSt) {
                collSt = data.data.collectSt;
            }
            if (collSt + baseCfg.minGetTime * 60 > GameData.serverTime) {
                getTimeDownStr = LanguageManager.getlocal("sixSection1SeatInfoPointGetTimeDown", [App.DateUtil.getFormatBySecond(collSt + baseCfg.minGetTime * 60 - GameData.serverTime, 1)]);
            }
            else {
                getTimeDownStr = "";
            }
            getInfoNum = Math.floor((GameData.serverTime - data.data.st) * baseCfg.shujijingyanSpeed / 3600);
            if (getInfoNum > data.data.remain) {
                getInfoNum = data.data.remain;
            }
        }
        var getTime = ComponentManager.getTextField(getTimeStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        getTime.setPosition(seat.x + seat.width + 10, titleBg.y + titleBg.height + 10);
        this.addChild(getTime);
        this._getTime = getTime;
        //采集倒计时
        var getTimeDown = ComponentManager.getTextField(getTimeDownStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_RED2);
        getTimeDown.setPosition(getTime.x + getTime.width + 10, getTime.y);
        this.addChild(getTimeDown);
        this._getTimeDown = getTimeDown;
        if (getTimeDownStr) {
            getTimeDown.visible = true;
        }
        else {
            getTimeDown.visible = false;
        }
        //待采集资源
        var getInfo = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoPointGetInfo", ["" + getInfoNum]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        getInfo.setPosition(getTime.x, getTime.y + getTime.height + 10);
        this.addChild(getInfo);
        this._getInfo = getInfo;
        //抢夺损失
        var loseInfo = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoLoseRes", ["" + 0]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        loseInfo.setPosition(getTime.x, getInfo.y + getInfo.height + 10);
        this.addChild(loseInfo);
        this._loseInfo = loseInfo;
        //抢夺者名字
        var attackName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_RED);
        attackName.setPosition(loseInfo.x, loseInfo.y + loseInfo.height + 10);
        this.addChild(attackName);
        attackName.visible = false;
        this._attackName = attackName;
        //采集
        var getBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "sixSection1SeatInfoPointGet", this.getBtnClick, this);
        getBtn.setPosition(bg.x + bg.width - getBtn.width - 10, bg.y + 65);
        this.addChild(getBtn);
        this._getBtn = getBtn;
        //已结算
        var getInfoEnd = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoEnd"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
        getInfoEnd.setPosition(bg.x + bg.width - getInfoEnd.width - 30, bg.y + 85);
        this.addChild(getInfoEnd);
        this._getInfoEnd = getInfoEnd;
        this._getInfoEnd.visible = false;
        //阵容
        var zhenrongBg = BaseBitmap.create("sixsection1_seatinfoservant_bg");
        zhenrongBg.width = bg.width - 10;
        zhenrongBg.height = 136 - 36;
        zhenrongBg.setPosition(bg.x + bg.width / 2 - zhenrongBg.width / 2, bg.y + 155 + 30);
        this.addChild(zhenrongBg);
        bg.height = zhenrongBg.y + zhenrongBg.height + 5 + 10;
        //public_line3
        //阵容title
        // let zhenrongTitleBg = BaseBitmap.create("public_titlebg");
        // zhenrongTitleBg.setPosition(zhenrongBg.x + 83, zhenrongBg.y + 10);
        // this.addChild(zhenrongTitleBg);
        var zhenrongTitleBg = BaseBitmap.create("public_line3");
        // zhenrongTitleBg.setPosition(zhenrongBg.x + 83, zhenrongBg.y + 10);
        this.addChild(zhenrongTitleBg);
        var zhenrongTitle = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoPointzhenrong"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        // zhenrongTitle.setPosition(zhenrongTitleBg.x + 15, zhenrongTitleBg.y + zhenrongTitleBg.height/2 - zhenrongTitle.height/2);
        zhenrongTitleBg.width += (zhenrongTitle.width + 30);
        zhenrongTitle.setPosition(zhenrongBg.x + zhenrongBg.width / 2 - zhenrongTitle.width / 2, zhenrongBg.y - zhenrongTitle.height - 5);
        zhenrongTitleBg.setPosition(zhenrongBg.x + zhenrongBg.width / 2 - zhenrongTitleBg.width / 2, zhenrongTitle.y + zhenrongTitle.height / 2 - zhenrongTitleBg.height / 2);
        this.addChild(zhenrongTitle);
        //采集中
        var getTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoPointGeting"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        getTxt.setPosition(zhenrongBg.x + 10, zhenrongBg.y + zhenrongBg.height / 2 - getTxt.height / 2);
        this.addChild(getTxt);
        this._getTxt = getTxt;
        //门客
        var servantList = data.data.sids;
        var servantScale = 0.4;
        for (var i = 0; i < 5; i++) {
            var servantX = zhenrongBg.x + 83 + i * (194 * servantScale + 5) - 3;
            if (servantList[i]) {
                var servantCfg = Config.ServantCfg.getServantItemById(servantList[i]);
                var servantVo = Api.servantVoApi.getServantObj(servantList[i]);
                var cardbg = BaseLoadBitmap.create(servantVo.qualityBoxImgPath);
                cardbg.width = 194;
                cardbg.height = 192;
                cardbg.setScale(servantScale);
                cardbg.x = servantX;
                // cardbg.y = zhenrongTitleBg.y + zhenrongTitleBg.height + 12;
                cardbg.y = zhenrongBg.y + 12;
                cardbg.name = "cardbg";
                this.addChild(cardbg);
                var servantImg = BaseLoadBitmap.create(servantVo.halfImgPath);
                // let servantImg = BaseLoadBitmap.create(servantCfg.halfIcon);
                servantImg.width = 180;
                servantImg.height = 177;
                servantImg.x = cardbg.x + cardbg.width / 2 - servantImg.width / 2 - 5;
                servantImg.y = cardbg.y + cardbg.height / 2 - servantImg.height / 2 - 2;
                servantImg.setScale(servantScale);
                this.addChild(servantImg);
            }
            else {
                var cardbg = BaseLoadBitmap.create("servant_cardbg_0");
                cardbg.width = 194;
                cardbg.height = 192;
                cardbg.setScale(servantScale);
                cardbg.x = servantX;
                // cardbg.y = zhenrongTitleBg.y + zhenrongTitleBg.height + 12;
                cardbg.y = zhenrongBg.y + 12;
                cardbg.name = "cardbg";
                this.addChild(cardbg);
            }
        }
        this.refreshItem();
        TickManager.addTick(this.tick, this);
    };
    SixSection1SeatInfoScrollItem1.prototype.refreshItem = function () {
        var data = this._data;
        var baseCfg = data.baseCfg.baseCfg;
        var getTimeStr = LanguageManager.getlocal("sixSection1SeatInfoPointGetTime", ["" + LanguageManager.getlocal("sixSection1SeatInfoTimeEnd")]);
        var getTimeDownStr = "";
        var getInfoNum = 0;
        var endTime = -1;
        if (data.status == 0 || data.status == 1) {
            endTime = data.data.st + Math.ceil(data.data.remain * 3600 / baseCfg.shujijingyanSpeed);
            var getTimeNum = endTime - GameData.serverTime;
            if (getTimeNum > 0) {
                getTimeStr = LanguageManager.getlocal("sixSection1SeatInfoPointGetTime", ["" + App.DateUtil.getFormatBySecond(getTimeNum, 1)]);
            }
            var collSt = data.data.st;
            if (data.data.collectSt) {
                collSt = data.data.collectSt;
            }
            if (collSt + baseCfg.minGetTime * 60 > GameData.serverTime) {
                getTimeDownStr = LanguageManager.getlocal("sixSection1SeatInfoPointGetTimeDown", [App.DateUtil.getFormatBySecond(collSt + baseCfg.minGetTime * 60 - GameData.serverTime, 1)]);
            }
            else {
                getTimeDownStr = "";
            }
            getInfoNum = Math.floor((GameData.serverTime - data.data.st) * baseCfg.shujijingyanSpeed / 3600);
            if (getInfoNum > data.data.remain) {
                getInfoNum = data.data.remain;
            }
        }
        else {
            //
            this._getTimeDown.visible = false;
        }
        //采集剩余倒计时
        this._getTime.text = getTimeStr;
        //可采集倒计时
        if (getTimeDownStr) {
            this._getBtn.visible = false;
            this._getTimeDown.visible = true;
            this._getTimeDown.text = getTimeDownStr;
            this._getTimeDown.x = this._getTime.x + this._getTime.width + 10;
        }
        else {
            this._getTimeDown.visible = false;
        }
        this._attackName.visible = false;
        //待采集资源
        if (endTime > GameData.serverTime) {
            this._getInfo.text = LanguageManager.getlocal("sixSection1SeatInfoPointGetInfo", ["" + getInfoNum]);
            this._loseInfo.visible = false;
            if (!getTimeDownStr && getInfoNum >= 1) {
                this._getBtn.visible = true;
            }
            else {
                this._getBtn.visible = false;
            }
            this._getInfoEnd.visible = false;
        }
        else {
            //已结束
            this._loseInfo.visible = false;
            this._getBtn.visible = false;
            //抢夺损失
            if (data.data.fres || data.data.fuid) {
                this._loseInfo.visible = true;
                this._attackName.visible = true;
                this._loseInfo.text = LanguageManager.getlocal("sixSection1SeatInfoLoseRes", ["" + data.data.fres]);
                this._attackName.text = LanguageManager.getlocal("sixSection1HoldResultItemPlayerInfo") + data.data.fname;
            }
            // else{
            //     this._getInfo.text = LanguageManager.getlocal("sixSection1SeatInfoGetRes", [""+data.data.fres]);
            // }
            this._getInfo.text = LanguageManager.getlocal("sixSection1SeatInfoGetRes", ["" + data.data.res]);
            //采集中
            this._getTxt.text = LanguageManager.getlocal("sixSection1SeatInfoEnd");
            //已结算
            this._getInfoEnd.visible = true;
        }
        if (!this._loseInfo.visible) {
            this._getTime.y = this._titleBg.y + this._titleBg.height + 25;
            this._getTimeDown.y = this._getTime.y;
            this._getInfo.y = this._getTime.y + this._getTime.height + 10;
        }
        var holdTime = App.DateUtil.getFormatBySecond(GameData.serverTime - this._data.data.attackst, 4);
        this._holdTimeDown.text = holdTime;
        this._holdTimeDown.x = this._titleBg.x + this._titleBg.width - this._holdTimeDown.width - 35;
    };
    SixSection1SeatInfoScrollItem1.prototype.tick = function () {
        this.refreshItem();
    };
    SixSection1SeatInfoScrollItem1.prototype.getBtnClick = function () {
        if (!Api.sixsection1VoApi.isInPeriousTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1EndTip"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_COLLECT, { x: this._data.data.x, y: this._data.data.y });
    };
    SixSection1SeatInfoScrollItem1.prototype.clickLine = function (evt, index) {
        var lineNum = this._data.data.x;
        var sixSection1View = ViewController.getInstance().getView(ViewConst.COMMON.SIXSECTION1VIEW);
        App.LogUtil.log(" this._data " + this._data.x + " yy " + this._data.data.y);
        sixSection1View.jumpToFloor(lineNum, this._data.data.y);
        var baseView = ViewController.getInstance().getView(ViewConst.POPUP.SIXSECTION1SEATINFOPOPUPVIEW);
        baseView.hide();
    };
    SixSection1SeatInfoScrollItem1.prototype.getSpaceX = function () {
        return 5;
    };
    SixSection1SeatInfoScrollItem1.prototype.getSpaceY = function () {
        return 5;
    };
    SixSection1SeatInfoScrollItem1.prototype.dispose = function () {
        TickManager.removeTick(this.tick, this);
        this._holdTimeDown = null;
        this._getTime = null;
        this._getTimeDown = null;
        this._getInfo = null;
        this._getInfoEnd = null;
        this._getBtn = null;
        this._getTxt = null;
        this._loseInfo = null;
        this._attackName = null;
        _super.prototype.dispose.call(this);
    };
    return SixSection1SeatInfoScrollItem1;
}(ScrollListItem));
//# sourceMappingURL=SixSection1SeatInfoScrollItem1.js.map