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
* 编号查询 item
* date 2020.5.13
* author ycg
* @name SixSection1SeatInfoScrollItem4
*/
var SixSection1SeatInfoScrollItem4 = (function (_super) {
    __extends(SixSection1SeatInfoScrollItem4, _super);
    function SixSection1SeatInfoScrollItem4() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._powerTf = null;
        return _this;
    }
    SixSection1SeatInfoScrollItem4.prototype.initItem = function (index, data, param) {
        this._data = data;
        this.width = 530;
        var bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        var titleBg = BaseBitmap.create("sixsection1_spointresult_titlebg");
        titleBg.setPosition(bg.x + 5, bg.y + 5);
        this.addChild(titleBg);
        titleBg.width = bg.width - 45;
        var buildName = "";
        if (data.type == "director") {
            buildName = LanguageManager.getlocal("sixSection1TitlePopupItemName" + (data.buildCfg.baseCfg.index + 1));
        }
        else {
            buildName = LanguageManager.getlocal("sixSection1BuildName" + (data.buildCfg.baseCfg.index + 1));
        }
        var titleName = ComponentManager.getTextField((index + 1) + "." + "<u>" + buildName + "</u>", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleName.setPosition(titleBg.x + 5, titleBg.y + titleBg.height / 2 - titleName.height / 2);
        this.addChild(titleName);
        titleName.addTouchTap(this.nameClick, this, [data.data.x]);
        if (data.type == "director") {
            var title = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1TitlePopupViewTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED3);
            title.setPosition(titleBg.x + titleBg.width - title.width - 35, titleBg.y + titleBg.height / 2 - title.height / 2);
            this.addChild(title);
        }
        // let timeDownStr = App.DateUtil.getFormatBySecond(data.st, 4);
        // let timeDown = ComponentManager.getTextField(timeDownStr, TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_LIGHT_YELLOW);
        // timeDown.setPosition(titleBg.x + titleBg.width - timeDown.width - 35, titleBg.y + titleBg.height/2 - timeDown.height/2);
        // this.addChild(timeDown);
        //席位
        var seat = BaseBitmap.create("sixsection1_seaticon");
        seat.setPosition(bg.x + 10, titleBg.y + titleBg.height + 10);
        this.addChild(seat);
        //剩余采集时间/影响力上上限
        var remianResStr = "";
        var getResNumStr = "";
        if (data.type == "director") {
            getResNumStr = LanguageManager.getlocal("sixSection1SeatInfoSearchInfluence", ["" + data.buildCfg.baseCfg.maxInfluence]);
            remianResStr = LanguageManager.getlocal("sixSection1SeatInfoSearchInfluenceSpeed", ["" + data.buildCfg.baseCfg.influenceSpeed]);
        }
        else {
            var getResNum = Math.floor((data.st - data.data.st) * data.buildCfg.baseCfg.shujijingyanSpeed / 3600);
            if (getResNum > data.data.remain) {
                getResNum = data.data.remain;
            }
            remianResStr = LanguageManager.getlocal("sixSection1HoldSeatRes3", ["" + (data.data.remain - getResNum), "" + data.buildCfg.baseCfg.max]);
            getResNumStr = LanguageManager.getlocal("sixSection1SeatInfoPointGetInfo", ["" + getResNum]);
        }
        //待采集资源/影响力上限
        var getRes = ComponentManager.getTextField(getResNumStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        getRes.setPosition(seat.x + seat.width + 10, seat.y + 10);
        this.addChild(getRes);
        //剩余资源/影响力速度
        var remainRes = ComponentManager.getTextField(remianResStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        remainRes.setPosition(getRes.x, getRes.y + getRes.height + 10);
        this.addChild(remainRes);
        //消耗影响力
        if (data.type != "director") {
            var holdNeedStr = "sixSection1HoldSeatNeed1";
            var influenceData = Api.sixsection1VoApi.getInfluenceData();
            var need = data.buildCfg.baseCfg.influenceNeed;
            if (influenceData.num < need) {
                holdNeedStr = "sixSection1HoldSeatNeed2";
            }
            var needPower = ComponentManager.getTextField(LanguageManager.getlocal(holdNeedStr, ["" + need, "" + Math.floor(influenceData.num)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
            needPower.setPosition(remainRes.x, remainRes.y + remainRes.height + 10);
            this.addChild(needPower);
            bg.height = needPower.y + needPower.height + 10;
            this._powerTf = needPower;
            this.refreshPower();
        }
        else {
            bg.height = remainRes.y + remainRes.height + 10;
        }
        var goBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskGoBtn", this.goBtnClick, this, [data.data.x]);
        goBtn.setPosition(bg.x + bg.width - goBtn.width - 1, titleBg.y + titleBg.height + (bg.height - titleBg.height - 5) / 2 - goBtn.height / 2);
        this.addChild(goBtn);
        TickManager.addTick(this.tick, this);
    };
    SixSection1SeatInfoScrollItem4.prototype.goBtnClick = function (index) {
        this.nameClick(null, index);
    };
    SixSection1SeatInfoScrollItem4.prototype.nameClick = function (evt, index) {
        var lineNum = this._data.data.x;
        var colNum = this._data.data.y;
        if (this._data.type == "director") {
            ViewController.getInstance().openView(ViewConst.POPUP.SIXSECTION1TITLEPOPUPVIEW, { lineNum: lineNum, colNum: colNum });
        }
        else {
            var sixSection1View = ViewController.getInstance().getView(ViewConst.COMMON.SIXSECTION1VIEW);
            sixSection1View.jumpToFloor(lineNum, colNum);
        }
        var baseView = ViewController.getInstance().getView(ViewConst.POPUP.SIXSECTION1SEATINFOPOPUPVIEW);
        baseView.hide();
    };
    SixSection1SeatInfoScrollItem4.prototype.refreshPower = function () {
        if (this._powerTf) {
            var svTime = GameData.serverTime;
            var influData = Api.sixsection1VoApi.getInfluenceData();
            if (influData) {
                var dt = Math.floor((svTime - influData.st) / 60);
                var currNum = Math.floor(influData.num + dt * influData.speed / 60);
                if (influData.max <= currNum) {
                    currNum = influData.max;
                    if (influData.num > influData.max) {
                        currNum = influData.num;
                    }
                }
                var need = this._data.buildCfg.baseCfg.influenceNeed;
                var holdNeedStr = "sixSection1HoldSeatNeed1";
                if (currNum < need) {
                    holdNeedStr = "sixSection1HoldSeatNeed2";
                }
                this._powerTf.text = LanguageManager.getlocal(holdNeedStr, ["" + need, "" + Math.floor(currNum)]);
            }
        }
    };
    SixSection1SeatInfoScrollItem4.prototype.tick = function () {
        if (this._powerTf) {
            var svTime = GameData.serverTime;
            var influData = Api.sixsection1VoApi.getInfluenceData();
            if (influData && (svTime - influData.st) % 60 == 0) {
                var dt = Math.floor((svTime - influData.st) / 60);
                var currNum = Math.floor(influData.num + dt * influData.speed / 60);
                if (influData.max <= currNum) {
                    currNum = influData.max;
                    if (influData.num > influData.max) {
                        currNum = influData.num;
                    }
                }
                var need = this._data.buildCfg.baseCfg.influenceNeed;
                var holdNeedStr = "sixSection1HoldSeatNeed1";
                if (currNum < need) {
                    holdNeedStr = "sixSection1HoldSeatNeed2";
                }
                this._powerTf.text = LanguageManager.getlocal(holdNeedStr, ["" + need, "" + Math.floor(currNum)]);
            }
        }
    };
    SixSection1SeatInfoScrollItem4.prototype.getSpaceX = function () {
        return 5;
    };
    SixSection1SeatInfoScrollItem4.prototype.getSpaceY = function () {
        return 5;
    };
    SixSection1SeatInfoScrollItem4.prototype.dispose = function () {
        TickManager.removeTick(this.tick, this);
        this._powerTf = null;
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return SixSection1SeatInfoScrollItem4;
}(ScrollListItem));
__reflect(SixSection1SeatInfoScrollItem4.prototype, "SixSection1SeatInfoScrollItem4");
//# sourceMappingURL=SixSection1SeatInfoScrollItem4.js.map