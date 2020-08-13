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
//
var AcCrossServerHegemonyMatchViewTab3 = /** @class */ (function (_super) {
    __extends(AcCrossServerHegemonyMatchViewTab3, _super);
    function AcCrossServerHegemonyMatchViewTab3(param) {
        var _this = _super.call(this) || this;
        _this._timeCdText = null;
        _this.startCurMatchTime = (12 * 24 + 21) * 60 * 60;
        _this._mapContainer = null;
        _this._redBg = null;
        _this._winNameBgList = [];
        _this._winNameTextList = [];
        _this._nameBgList = [];
        _this._nameTextList = [];
        _this._lineList = [];
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonyMatchViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyMatchViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyMatchViewTab3.prototype.getListType = function () {
        return 1;
    };
    AcCrossServerHegemonyMatchViewTab3.prototype.initView = function () {
        var redBg = BaseBitmap.create("accshegemony_matchredbg");
        redBg.x = GameConfig.stageWidth / 2 - redBg.width / 2;
        redBg.y = 8;
        this.addChild(redBg);
        this._redBg = redBg;
        var matchName = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyMatchTab3"), 24, TextFieldConst.COLOR_WARN_YELLOW2);
        matchName.x = redBg.x + redBg.width / 2 - matchName.width / 2;
        matchName.y = redBg.y + 8;
        this.addChild(matchName);
        this._timeCdText = ComponentManager.getTextField(" ", 24, TextFieldConst.COLOR_WARN_YELLOW);
        this._timeCdText.x = GameConfig.stageWidth / 2 - this._timeCdText.width / 2;
        this._timeCdText.y = matchName.y + matchName.height + 5;
        this.addChild(this._timeCdText);
        this.refreshTimeText();
        this.createMatchMap();
        this.initMatchMap();
    };
    AcCrossServerHegemonyMatchViewTab3.prototype.createMatchMap = function () {
        this._mapContainer = new BaseDisplayObjectContainer();
        this._mapContainer.width = GameConfig.stageWidth;
        this._mapContainer.height = 460 * 2;
        var touchAlpha = BaseBitmap.create("public_alphabg");
        touchAlpha.width = this._mapContainer.width;
        touchAlpha.height = this._mapContainer.height;
        this._mapContainer.addChild(touchAlpha);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, 890 - 8 - (1136 - GameConfig.stageHeigth));
        var mapScrollView = ComponentManager.getScrollView(this._mapContainer, rect);
        mapScrollView.x = GameConfig.stageWidth / 2 - mapScrollView.width / 2;
        mapScrollView.y = this._redBg.y + this._redBg.height;
        this.addChild(mapScrollView);
        //130
        for (var i = 0; i < 2; i++) {
            var startY = i * 450; //460
            ///////////up
            var winBgUp = BaseBitmap.create("accshegemony_matchnamebg2");
            winBgUp.x = GameConfig.stageWidth / 2 - winBgUp.width / 2;
            winBgUp.y = startY + 183 - winBgUp.height / 2;
            this._mapContainer.addChild(winBgUp);
            this._winNameBgList.push(winBgUp);
            var winTextUp = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_WARN_YELLOW);
            this._mapContainer.addChild(winTextUp);
            this._winNameTextList.push(winTextUp);
            var bgUp1 = BaseBitmap.create("accshegemony_matchnamebg1");
            bgUp1.x = 100 - bgUp1.width / 2;
            bgUp1.y = startY + 117 - bgUp1.height / 2;
            this._mapContainer.addChild(bgUp1);
            this._nameBgList.push(bgUp1);
            var textUp1 = ComponentManager.getTextField("", 22, 0x9adbff);
            this._mapContainer.addChild(textUp1);
            this._nameTextList.push(textUp1);
            var bgUp2 = BaseBitmap.create("accshegemony_matchnamebg1");
            bgUp2.x = 100 - bgUp2.width / 2;
            bgUp2.y = startY + 344 - bgUp2.height / 2;
            this._mapContainer.addChild(bgUp2);
            this._nameBgList.push(bgUp2);
            var textUp2 = ComponentManager.getTextField("", 22, 0x9adbff);
            this._mapContainer.addChild(textUp2);
            this._nameTextList.push(textUp2);
            var upLine1 = BaseBitmap.create("accshegemony_matchline3_1");
            upLine1.x = 210 - upLine1.width / 2;
            upLine1.y = startY + 230 - upLine1.height / 2;
            this._mapContainer.addChild(upLine1);
            var upLine2 = BaseBitmap.create("accshegemony_matchline3_2");
            upLine2.x = 210 - upLine2.width / 2;
            upLine2.y = startY + 230 - upLine2.height / 2;
            this._mapContainer.addChild(upLine2);
            upLine2.visible = false;
            var upLine3 = BaseBitmap.create("accshegemony_matchline3_3");
            upLine3.x = 210 - upLine3.width / 2;
            upLine3.y = startY + 230 - upLine3.height / 2;
            this._mapContainer.addChild(upLine3);
            upLine3.visible = false;
            var upLine = { line1: upLine1, line2: upLine2, line3: upLine3 };
            this._lineList.push(upLine);
            ////////////down
            var winBgDown = BaseBitmap.create("accshegemony_matchnamebg2");
            winBgDown.x = GameConfig.stageWidth / 2 - winBgDown.width / 2;
            winBgDown.y = startY + 280 - winBgDown.height / 2;
            this._mapContainer.addChild(winBgDown);
            this._winNameBgList.push(winBgDown);
            var winTextDown = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_WARN_YELLOW);
            this._mapContainer.addChild(winTextDown);
            this._winNameTextList.push(winTextDown);
            var bgDown1 = BaseBitmap.create("accshegemony_matchnamebg1");
            bgDown1.x = 540 - bgDown1.width / 2;
            bgDown1.y = startY + 117 - bgDown1.height / 2;
            this._mapContainer.addChild(bgDown1);
            this._nameBgList.push(bgDown1);
            var textDown1 = ComponentManager.getTextField("", 22, 0x9adbff);
            this._mapContainer.addChild(textDown1);
            this._nameTextList.push(textDown1);
            var bgDown2 = BaseBitmap.create("accshegemony_matchnamebg1");
            bgDown2.x = 540 - bgDown2.width / 2;
            bgDown2.y = startY + 344 - bgDown2.height / 2;
            this._mapContainer.addChild(bgDown2);
            this._nameBgList.push(bgDown2);
            var textDown2 = ComponentManager.getTextField("", 22, 0x9adbff);
            this._mapContainer.addChild(textDown2);
            this._nameTextList.push(textDown2);
            var downLine1 = BaseBitmap.create("accshegemony_matchline3_1");
            downLine1.setScale(-1);
            downLine1.x = 430 - downLine1.width * downLine1.scaleX / 2;
            downLine1.y = startY + 230 - downLine1.height * downLine1.scaleY / 2;
            this._mapContainer.addChild(downLine1);
            var downLine2 = BaseBitmap.create("accshegemony_matchline3_3");
            downLine2.setScale(-1);
            downLine2.x = 430 - downLine2.width * downLine2.scaleX / 2;
            downLine2.y = startY + 230 - downLine2.height * downLine2.scaleY / 2;
            downLine2.visible = false;
            this._mapContainer.addChild(downLine2);
            var downLine3 = BaseBitmap.create("accshegemony_matchline3_2");
            downLine3.setScale(-1);
            downLine3.x = 430 - downLine3.width * downLine3.scaleX / 2;
            downLine3.y = startY + 230 - downLine3.height * downLine3.scaleY / 2;
            downLine3.visible = false;
            this._mapContainer.addChild(downLine3);
            var downLine = { line1: downLine1, line2: downLine2, line3: downLine3 };
            this._lineList.push(downLine);
            if (i != 2 - 1) {
                var line = BaseBitmap.create("accshegemony_matchline");
                line.x = GameConfig.stageWidth / 2 - line.width / 2;
                line.y = startY + 450 - line.height / 2;
                this._mapContainer.addChild(line);
            }
        }
    };
    AcCrossServerHegemonyMatchViewTab3.prototype.initMatchMap = function () {
        var dataList = Api.crossServerHegemonyVoApi.getDetailPkInfo(2);
        // let dataList = [];
        for (var i = 0; i < this._nameBgList.length; i += 2) {
            var nameBg1 = this._nameBgList[i];
            var nameText1 = this._nameTextList[i];
            var nameBg2 = this._nameBgList[i + 1];
            var nameText2 = this._nameTextList[i + 1];
            if (i / 2 < dataList.length) {
                if (dataList[i / 2]["name1"]) {
                    nameText1.text = dataList[i / 2]["name1"];
                }
                else {
                    nameText1.text = LanguageManager.getlocal("countryWarRewardType9");
                    nameText1.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
                }
                if (dataList[i / 2]["name2"]) {
                    nameText2.text = dataList[i / 2]["name2"];
                }
                else {
                    nameText2.text = LanguageManager.getlocal("countryWarRewardType9");
                    nameText2.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
                }
            }
            else {
                nameText1.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1", ["8"]);
                nameText2.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1", ["8"]);
            }
            nameText1.x = nameBg1.x + nameBg1.width / 2 - nameText1.width / 2;
            nameText1.y = nameBg1.y + nameBg1.height / 2 - nameText1.height / 2;
            nameText2.x = nameBg2.x + nameBg2.width / 2 - nameText2.width / 2;
            nameText2.y = nameBg2.y + nameBg2.height / 2 - nameText2.height / 2;
        }
        for (var j = 0; j < this._winNameBgList.length; j++) {
            var nameBg = this._winNameBgList[j];
            var nameText = this._winNameTextList[j];
            if (j < dataList.length) {
                if (dataList[j]["win"] == -1) {
                    nameText.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1", ["4"]);
                }
                else if (dataList[j]["win"] == 1) {
                    nameText.text = dataList[j]["name1"];
                }
                else {
                    nameText.text = dataList[j]["name2"];
                }
            }
            else {
                nameText.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1", ["4"]);
            }
            nameText.x = nameBg.x + nameBg.width / 2 - nameText.width / 2;
            nameText.y = nameBg.y + nameBg.height / 2 - nameText.height / 2;
        }
        // for(let i = 0 ;i < this._nameBgList.length; i ++){
        //     let nameBg = this._nameBgList[i];
        //     let nameText = this._nameTextList[i];
        //     nameText.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1",["8"]);
        //     nameText.x = nameBg.x + nameBg.width/2 - nameText.width/2;
        //     nameText.y = nameBg.y + nameBg.height/2 - nameText.height/2;
        // }
        // for(let j = 0 ;j < this._winNameBgList.length; j ++){
        //     let nameBg = this._winNameBgList[j];
        //     let nameText = this._winNameTextList[j];
        //     nameText.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1",["4"]);
        //     nameText.x = nameBg.x + nameBg.width/2 - nameText.width/2;
        //     nameText.y = nameBg.y + nameBg.height/2 - nameText.height/2;
        // }   
    };
    AcCrossServerHegemonyMatchViewTab3.prototype.refreshTimeText = function () {
        var curStatus = this.vo.getCurStatus();
        var timeStr = "";
        var zeroSt = App.DateUtil.getWeeTs(this.vo.st) + 24 * 60 * 60;
        if (curStatus < 13) {
            //显示开战时间
            var time = zeroSt + this.startCurMatchTime;
            timeStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTimeTip1", [String(App.DateUtil.getFormatBySecond(time, 13))]);
            this._timeCdText.text = timeStr;
        }
        else if (curStatus == 13) {
            //显示倒计时，或者正在战斗 //或者战斗结束
            var sTime = zeroSt + this.startCurMatchTime;
            var oTime = zeroSt + this.startCurMatchTime + Api.crossServerHegemonyVoApi.getMatchTime();
            if (sTime > GameData.serverTime) {
                //显示倒计时
                var time = sTime - GameData.serverTime;
                timeStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTimeTip2", [String(App.DateUtil.getFormatBySecond(time, 1))]);
                this._timeCdText.text = timeStr;
            }
            else if (sTime <= GameData.serverTime && oTime >= GameData.serverTime) {
                //正在进行
                var time = oTime - GameData.serverTime;
                timeStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTimeTip3", [String(App.DateUtil.getFormatBySecond(time, 1))]);
                this._timeCdText.text = timeStr;
            }
            else {
                //战斗结束
                timeStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTimeTip4");
                this._timeCdText.text = timeStr;
            }
        }
        else if (curStatus > 13) {
            //显示战斗结束
            timeStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTimeTip4");
            this._timeCdText.text = timeStr;
        }
        this._timeCdText.x = GameConfig.stageWidth / 2 - this._timeCdText.width / 2;
    };
    AcCrossServerHegemonyMatchViewTab3.prototype.tick = function () {
        this.refreshTimeText();
    };
    AcCrossServerHegemonyMatchViewTab3.prototype.dispose = function () {
        this._timeCdText = null;
        this.startCurMatchTime = 0;
        this._mapContainer = null;
        this._redBg = null;
        this._winNameBgList = [];
        this._winNameTextList = [];
        this._nameBgList = [];
        this._nameTextList = [];
        this._lineList = [];
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyMatchViewTab3;
}(CommonViewTab));
//# sourceMappingURL=AcCrossServerHegemonyMatchViewTab3.js.map