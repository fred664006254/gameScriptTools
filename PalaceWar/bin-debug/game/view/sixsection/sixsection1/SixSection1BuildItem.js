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
* 兵部 单个建筑 item
* date 2020.5.8
* author ycg
* @name SixSection1BuildItem
*/
var SixSection1BuildItem = /** @class */ (function (_super) {
    __extends(SixSection1BuildItem, _super);
    function SixSection1BuildItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._itemIndex = 0;
        _this._timeBg = null;
        _this._timeDown = null;
        _this._seat = null;
        _this._person = null;
        _this._emptySeat = null;
        _this._selEff = null;
        return _this;
    }
    SixSection1BuildItem.prototype.initItem = function (index, data, param) {
        var _this = this;
        this._itemIndex = index;
        this._data = data;
        var isBig = param.isBig;
        var baseIndex = data.baseCfg.index;
        var container = new BaseDisplayObjectContainer();
        this.addChild(container);
        //座位
        var seatImg = "sixsection1_seat" + (baseIndex + 1);
        var seat = BaseBitmap.create(seatImg);
        container.width = seat.width;
        container.height = seat.height + 30;
        this._seat = seat;
        //人
        var person = BaseBitmap.create("sixsection1_seat_person");
        container.addChild(person);
        person.x = container.width / 2 - person.width / 2;
        person.y = 2;
        person.visible = false;
        this._person = person;
        seat.setPosition(0, 30);
        container.addChild(seat);
        if (baseIndex == 0) {
            container.height = 405;
            seat.y = 264;
            person.y = 237;
            person.x = container.width / 2 - person.width / 2 + 8;
        }
        //阴影
        var buildMask = BaseBitmap.create("sixsection1_seatmask_" + (baseIndex + 1));
        buildMask.setPosition(seat.x, seat.y);
        buildMask.setScale(4);
        container.addChild(buildMask);
        buildMask.alpha = 0;
        //空座位
        var emptySeat = BaseBitmap.create("sixsection1_seat_empty");
        container.addChild(emptySeat);
        emptySeat.setPosition(container.width / 2 - emptySeat.width / 2, seat.y + seat.height / 2 - emptySeat.height / 2);
        emptySeat.visible = false;
        this._emptySeat = emptySeat;
        //选中特效
        var selEff = ComponentManager.getCustomMovieClip("sixsection1_seatseleff", 10, 70);
        selEff.width = 239;
        selEff.height = 180;
        selEff.setScale(0.8);
        selEff.setPosition(seat.x + seat.width / 2 - selEff.width * selEff.scaleX / 2, seat.y + seat.height / 2 - selEff.height * selEff.scaleY / 2);
        container.addChild(selEff);
        this._selEff = selEff;
        selEff.visible = false;
        // this.addTouchTap(this.seatClick, this, [index + 1]);
        this.addTouch(function (event) {
            switch (event.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    buildMask.alpha = 0.5;
                    break;
                case egret.TouchEvent.TOUCH_TAP:
                    buildMask.alpha = 0.5;
                    break;
                case egret.TouchEvent.TOUCH_CANCEL:
                    buildMask.alpha = 0;
                    break;
                case egret.TouchEvent.TOUCH_END:
                    buildMask.alpha = 0;
                    _this.seatClick(null, index + 1);
                    break;
            }
        }, this);
        //倒计时
        var timeBg = BaseBitmap.create("public_9_viewmask");
        timeBg.width = seat.width;
        timeBg.height = 20;
        timeBg.setPosition(container.width / 2 - timeBg.width / 2, seat.y + seat.height - timeBg.height);
        container.addChild(timeBg);
        timeBg.visible = false;
        this._timeBg = timeBg;
        var timeDown = ComponentManager.getTextField("", 14, TextFieldConst.COLOR_WHITE);
        timeDown.setPosition(timeBg.x, timeBg.y + timeBg.height / 2 - 7);
        container.addChild(timeDown);
        this._timeDown = timeDown;
        timeDown.visible = false;
        this.width = container.width;
        this.height = container.height;
        // this.update();
        TickManager.addTick(this.tick, this);
        // this.cacheAsBitmap = true;
    };
    SixSection1BuildItem.prototype.update = function () {
        var lineNum = this._data.lineNum;
        var seatInfo = Api.sixsection1VoApi.getSeatDataByPos(lineNum, this._itemIndex);
        var baseCfg = this._data.baseCfg;
        // App.LogUtil.log("builditem update "+lineNum);
        // console.log("update seatInfo ",seatInfo);
        // if (!Api.sixsection1VoApi.isInPeriousTime()){
        //     return;
        // }
        if (seatInfo && Object.keys(seatInfo).length > 0) {
            var et = Math.ceil(seatInfo.remain * 3600 / baseCfg.shujijingyanSpeed) + seatInfo.st;
            if (GameData.serverTime >= et) {
                this._timeBg.visible = false;
                this._timeDown.visible = false;
                this._emptySeat.visible = true;
                this._person.visible = false;
                this._seat.visible = false;
                if (this._data.baseCfg.index == 0) {
                    this._emptySeat.visible = false;
                    this._seat.visible = true;
                    App.DisplayUtil.changeToGray(this._seat);
                }
                else {
                    App.DisplayUtil.changeToGray(this._emptySeat);
                }
            }
            else {
                this._timeBg.visible = true;
                this._timeDown.visible = true;
                this._emptySeat.visible = false;
                this._person.visible = true;
                this._seat.visible = true;
                App.DisplayUtil.changeToNormal(this._seat);
                var timeNum = et - GameData.serverTime;
                if (timeNum < 0) {
                    timeNum = 0;
                }
                if (seatInfo.uid == Api.playerVoApi.getPlayerID()) {
                    this._timeDown.setColor(TextFieldConst.COLOR_WARN_YELLOW);
                }
                else {
                    this._timeDown.setColor(TextFieldConst.COLOR_WHITE);
                }
                this._timeDown.text = App.DateUtil.getFormatBySecond(timeNum, 1);
                this._timeDown.x = this._timeBg.x + this._timeBg.width / 2 - this._timeDown.width / 2;
            }
        }
        else {
            App.DisplayUtil.changeToNormal(this._seat);
            this._timeBg.visible = false;
            this._timeDown.visible = false;
            this._emptySeat.visible = false;
            this._person.visible = false;
            this._seat.visible = true;
        }
    };
    SixSection1BuildItem.prototype.tick = function () {
        if (this._timeDown && this._timeDown.visible) {
            var baseCfg = this._data.baseCfg;
            var mapInfo = Api.sixsection1VoApi.getMapInfoByFloor(this._data.lineNum);
            if (!Api.sixsection1VoApi.isInPeriousTime()) {
                this._timeBg.visible = false;
                this._timeDown.visible = false;
                TickManager.removeTick(this.tick, this);
                return;
            }
            if (mapInfo && mapInfo.length > 0) {
                var data = mapInfo[this._itemIndex];
                var et = data.st + Math.ceil(data.remain * 3600 / baseCfg.shujijingyanSpeed);
                var dt = et - GameData.serverTime;
                if (dt <= 0) {
                    dt = 0;
                    this._timeBg.visible = false;
                    this._timeDown.visible = false;
                    TickManager.removeTick(this.tick, this);
                    App.LogUtil.log("tick end");
                    this.update();
                }
                else {
                    this._timeDown.text = App.DateUtil.getFormatBySecond(dt, 1);
                    this._timeDown.x = this._timeBg.x + this._timeBg.width / 2 - this._timeDown.width / 2;
                    // this._timeDown.y = this._seat.y + this._seat.height * this._seat.scaleY - this._timeDown.height;
                }
            }
        }
        // this.update();
    };
    SixSection1BuildItem.prototype.seatClick = function (evt, index) {
        App.LogUtil.log("seatClick " + index + "linenum " + this._data.lineNum);
        if (!Api.sixsection1VoApi.isInPeriousTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1EndTip"));
            return;
        }
        var mapInfo = Api.sixsection1VoApi.getMapInfoByFloor(this._data.lineNum);
        var uid = null;
        var endTime = 0;
        var seatCfg = this._data.baseCfg;
        if (mapInfo && mapInfo[this._itemIndex] && Object.keys(mapInfo[this._itemIndex]).length > 0) {
            //席位有人
            var info = mapInfo[this._itemIndex];
            uid = info.uid;
            endTime = info.st + Math.ceil(info.remain * 3600 / seatCfg.shujijingyanSpeed);
        }
        //判断时间是否已结束
        if (endTime > 0 && GameData.serverTime > endTime) {
            uid = null;
            //暂无资源
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1HoldSeatNotResTip"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.SIXSECTION1HOLDSEATPOPUPVIEW, { data: this._data, index: this._itemIndex, uid: uid });
    };
    SixSection1BuildItem.prototype.showLight = function () {
        var _this = this;
        this._selEff.visible = true;
        this._selEff.playWithTime(3);
        this._selEff.setEndCallBack(function () {
            _this._selEff.visible = false;
        }, this);
    };
    SixSection1BuildItem.prototype.getSpaceX = function () {
        return 0;
    };
    SixSection1BuildItem.prototype.getSpaceY = function () {
        return 0;
    };
    SixSection1BuildItem.prototype.dispose = function () {
        TickManager.removeTick(this.tick, this);
        this._itemIndex = 0;
        this._data = null;
        this._timeBg = null;
        this._timeDown = null;
        this._seat = null;
        this._person = null;
        this._emptySeat = null;
        this._selEff = null;
        _super.prototype.dispose.call(this);
    };
    return SixSection1BuildItem;
}(ScrollListItem));
//# sourceMappingURL=SixSection1BuildItem.js.map