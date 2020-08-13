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
var WifeBanish = (function (_super) {
    __extends(WifeBanish, _super);
    function WifeBanish() {
        var _this = _super.call(this) || this;
        _this._scrollContiner = null;
        _this._carriageNum = null;
        _this._remainNum = null;
        _this._addBtn = null;
        _this._carriageTab = [];
        _this._clickPos = 0;
        _this._clickWife = "";
        _this.param = 0;
        return _this;
    }
    WifeBanish.prototype.init = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_BANISH, this.banishCallBack, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_BUYBANISHPOS, this.buyCarriageCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_FINISH, this.finishBanishCallBack, this);
        var topBg = BaseBitmap.create("forpeople_top");
        topBg.setPosition(0, -15);
        this.addChild(topBg);
        var numBg = BaseBitmap.create("public_9_bg59");
        numBg.width = 162;
        numBg.setPosition(10, 0);
        this.addChild(numBg);
        this._carriageNum = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._carriageNum.setPosition(16, numBg.y + 6);
        this.addChild(this._carriageNum);
        this._addBtn = ComponentManager.getButton("btn_common_add", null, this.addHandle, this);
        this._addBtn.setPosition(175, numBg.y - 2);
        this.addChild(this._addBtn);
        if (Config.BanishCfg.getMaxUnit() <= Api.wifebanishVoApi.getPosNum()) {
            this._addBtn.visible = false;
        }
        var limitation = Config.BanishCfg.getLimitation();
        var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("banishNumTip1", [String(limitation)]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        desc1.setPosition(GameConfig.stageWidth - 50 - desc1.width, -8);
        this.addChild(desc1);
        this._remainNum = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._remainNum.y = desc1.y + desc1.height + 5;
        this.addChild(this._remainNum);
        this.resetCarriageNum();
        this._scrollContiner = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 45, GameConfig.stageWidth, GameConfig.stageHeigth - 150);
        var scrollView = ComponentManager.getScrollView(this._scrollContiner, rect);
        scrollView.name = "scrollView";
        this.addChild(scrollView);
        var line = BaseBitmap.create("dinner_line");
        line.setPosition(0, 45 - line.height);
        this.addChild(line);
        scrollView.bounces = false;
        var house = BaseBitmap.create("banish_house");
        this._scrollContiner.addChild(house);
        var num = Config.BanishCfg.getMaxUnit();
        num += Api.wifebanishVoApi.getTotalPosNum();
        var maxUnit = num;
        var floorNum = Math.ceil(maxUnit / 2);
        for (var i = 0; i < floorNum; i++) {
            var floorTile = BaseBitmap.create("banish_floor");
            floorTile.y = house.height + floorTile.height * i;
            this._scrollContiner.addChild(floorTile);
        }
        var posNum = Api.wifebanishVoApi.getTotalPosNum();
        for (var i = 1; i <= posNum; i++) {
            var carriage = new WifeBanishCarriage();
            carriage.init(i, this.goToBanish, this.goHome, this);
            carriage.setPosition((i - 1) % 2 * 352, 180 + Math.floor((i - 1) / 2) * 188);
            this._scrollContiner.addChild(carriage);
            this._carriageTab.push(carriage);
            var vo = Api.wifebanishVoApi.getBanishInfoVo(carriage.id);
            if (vo) {
                carriage.setWife(vo);
            }
            else {
                carriage.setHorse();
            }
        }
    };
    WifeBanish.prototype.goToBanish = function (id, index, code) {
        var curNum = Api.wifebanishVoApi.getBanishNum();
        if (Api.wifeVoApi.getWifeNum() - Config.BanishCfg.getLimitation() - curNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("banish_beyond_tip", [String(Config.BanishCfg.getLimitation())]));
            return;
        }
        var totalnum = Api.wifebanishVoApi.getTotalPosNum();
        var vo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS, code);
        if (id > Api.wifebanishVoApi.getPosNum() && vo && !vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("servantExileSelectServantPopupViewShowTip4"));
            return;
        }
        this._clickPos = index;
        this.param = id;
        ViewController.getInstance().openView(ViewConst.POPUP.BANISHCHOOSEPOPUPVIEW, { f: this.goToBanishCallback, o: this });
    };
    WifeBanish.prototype.goToBanishCallback = function (wife) {
        NetManager.request(NetRequestConst.REQUEST_WIFE_BANISH, { wifeId: wife, pos: this.param });
    };
    WifeBanish.prototype.goHome = function (id, wife, index) {
        var days = Math.ceil((this._carriageTab[index - 1].posInfo.et - GameData.serverTime) / 86400);
        var needNum = Config.BanishCfg.getUnitGem() * days;
        var wifecfg = Config.WifeCfg.getWifeCfgById(wife);
        var message = LanguageManager.getlocal("banish_callback", [(wifecfg.name), String(needNum)]);
        var mesObj = {
            confirmCallback: this.goHomeCallback,
            handler: this,
            icon: "itemicon1",
            iconBg: "itembg_1",
            num: Api.playerVoApi.getPlayerGem(),
            useNum: needNum,
            msg: message,
            id: 1,
        };
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
        this._clickWife = wife;
        this._clickPos = index;
    };
    WifeBanish.prototype.goHomeCallback = function () {
        NetManager.request(NetRequestConst.REQUEST_WIFE_FINISH, { wifeId: this._clickWife });
    };
    WifeBanish.prototype.resetCarriageNum = function () {
        var curNum = Api.wifebanishVoApi.getBanishNum();
        var totalNum = Api.wifebanishVoApi.getTotalPosNum();
        this._carriageNum.text = LanguageManager.getlocal("banishCarriageNum", [String(curNum), String(totalNum)]);
        var num = Api.wifeVoApi.getWifeNum() - curNum;
        this._remainNum.text = LanguageManager.getlocal("banishNumTip2", [String(num)]);
        this._remainNum.x = GameConfig.stageWidth - 50 - this._remainNum.width;
        for (var i = 0; i < this._carriageTab.length; i++) {
            this._carriageTab[i].setIsShowTip(num > 0);
        }
    };
    WifeBanish.prototype.addHandle = function () {
        var needNum = Config.BanishCfg.getSeatCost(String(Api.wifebanishVoApi.getPosNum()));
        var message = LanguageManager.getlocal("banish_buyCarriage", [String(needNum)]);
        var mesObj = {
            confirmCallback: this.buyCarriageHandler,
            handler: this,
            icon: "itemicon1",
            iconBg: "itembg_1",
            num: Api.playerVoApi.getPlayerGem(),
            useNum: needNum,
            msg: message,
            id: 1,
        };
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
    };
    WifeBanish.prototype.buyCarriageHandler = function () {
        // NetManager.request(NetRequestConst.REQUEST_WIFE_BANISH,{wifeId:"101",pos:"1"});
        NetManager.request(NetRequestConst.REQUEST_WIFE_BUYBANISHPOS, {});
    };
    WifeBanish.prototype.buyCarriageCallback = function (event) {
        var ret = event.data.ret;
        if (ret) {
            if (Config.BanishCfg.getMaxUnit() <= Api.wifebanishVoApi.getPosNum()) {
                this._addBtn.visible = false;
            }
            // let i:number = Api.wifebanishVoApi.getPosNum();
            // let carriage:WifeBanishCarriage = new WifeBanishCarriage();
            // carriage.init(i,this.goToBanish,this.goHome,this);
            // carriage.setPosition((i-1)%2*352,180+Math.floor((i-1)/2)*188);
            // this._scrollContiner.addChild(carriage);
            // this._carriageTab.push(carriage);
            // carriage.setHorse();
            this._scrollContiner.dispose();
            this._scrollContiner = null;
            this._carriageTab = [];
            this._scrollContiner = new BaseDisplayObjectContainer();
            var rect = egret.Rectangle.create();
            rect.setTo(0, 45, GameConfig.stageWidth, GameConfig.stageHeigth - 150);
            var tmp = this.getChildByName("scrollView");
            if (tmp) {
                tmp.dispose();
                tmp = null;
            }
            var scrollView = ComponentManager.getScrollView(this._scrollContiner, rect);
            scrollView.name = "scrollView";
            this.addChild(scrollView);
            scrollView.bounces = false;
            var house = BaseBitmap.create("banish_house");
            this._scrollContiner.addChild(house);
            var num = Config.BanishCfg.getMaxUnit();
            num += Api.wifebanishVoApi.getTotalPosNum();
            var maxUnit = num;
            var floorNum = Math.ceil(maxUnit / 2);
            for (var i = 0; i < floorNum; i++) {
                var floorTile = BaseBitmap.create("banish_floor");
                floorTile.y = house.height + floorTile.height * i;
                this._scrollContiner.addChild(floorTile);
            }
            var posNum = Api.wifebanishVoApi.getTotalPosNum();
            for (var i = 1; i <= posNum; i++) {
                var carriage = new WifeBanishCarriage();
                carriage.init(i, this.goToBanish, this.goHome, this);
                carriage.setPosition((i - 1) % 2 * 352, 180 + Math.floor((i - 1) / 2) * 188);
                this._scrollContiner.addChild(carriage);
                this._carriageTab.push(carriage);
                var vo = Api.wifebanishVoApi.getBanishInfoVo(carriage.id);
                if (vo) {
                    carriage.setWife(vo);
                }
                else {
                    carriage.setHorse();
                }
            }
            this.resetCarriageNum();
            App.CommonUtil.showTip(LanguageManager.getlocal("banish_buyCarriage_tip"));
        }
    };
    WifeBanish.prototype.banishCallBack = function (event) {
        var ret = event.data.ret;
        if (ret) {
            this.resetCarriageStatusByIndex(this._clickPos);
            this.resetCarriageNum();
            this.horseGo(this._clickPos);
        }
    };
    WifeBanish.prototype.finishBanishCallBack = function (event) {
        var ret = event.data.ret;
        if (ret) {
            this.resetCarriageNum();
            this.horseBack(this._clickPos);
            App.CommonUtil.showTip(LanguageManager.getlocal("banish_back_tip"));
        }
    };
    WifeBanish.prototype.resetCarriageStatusByIndex = function (i) {
        var carriage = this._carriageTab[i - 1];
        var vo = Api.wifebanishVoApi.getBanishInfoVo(carriage.id);
        if (vo && vo.et >= GameData.serverTime) {
            carriage.setWife(vo);
        }
        else {
            carriage.setHorse();
        }
    };
    WifeBanish.prototype.horseGo = function (i) {
        App.CommonUtil.showTip(LanguageManager.getlocal("banish_go_tip"));
        var oneHorse = BaseBitmap.create("banish_go_1");
        var horseClip = ComponentManager.getCustomMovieClip("banish_go_", 6);
        horseClip.frameRate = 100;
        horseClip.setPosition(GameConfig.stageWidth / 2 - oneHorse.width / 2 + 5, this._carriageTab[i - 1].y);
        this._scrollContiner.addChild(horseClip);
        horseClip.playWithTime(0);
        var time = (this._scrollContiner.height - horseClip.y - oneHorse.height) * 10;
        egret.Tween.get(horseClip).wait(100).call(function () {
            horseClip.stop();
        }).wait(900).call(function () {
            horseClip.playWithTime(0);
        }).to({ y: this._scrollContiner.height - oneHorse.height }, time).call(function () {
            horseClip.dispose();
        });
        BaseBitmap.release(oneHorse);
    };
    WifeBanish.prototype.horseBack = function (i) {
        this._carriageTab[i - 1].goBack();
        var oneHorse = BaseBitmap.create("banish_back_1");
        var horseClip = ComponentManager.getCustomMovieClip("banish_back_", 6);
        horseClip.frameRate = 100;
        horseClip.setPosition(GameConfig.stageWidth / 2 - oneHorse.width / 2 + 5, this._scrollContiner.height - oneHorse.height);
        this._scrollContiner.addChild(horseClip);
        horseClip.playWithTime(0);
        var that = this;
        var time = (horseClip.y - this._carriageTab[i - 1].y) * 10;
        egret.Tween.get(horseClip).to({ y: this._carriageTab[i - 1].y }, time).call(function () {
            horseClip.stop();
        }).wait(1000).call(function () {
            horseClip.dispose();
            that.resetCarriageStatusByIndex(i);
        });
        BaseBitmap.release(oneHorse);
    };
    WifeBanish.prototype.tick = function () {
        for (var i = 0; i < this._carriageTab.length; i++) {
            if (this._carriageTab[i].refreshTime()) {
                this.horseBack(i + 1);
                App.CommonUtil.showTip(LanguageManager.getlocal("banish_back_tip"));
            }
        }
    };
    WifeBanish.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_BANISH, this.banishCallBack, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_BUYBANISHPOS, this.buyCarriageCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_FINISH, this.finishBanishCallBack, this);
        this._scrollContiner = null;
        this._carriageNum = null;
        this._addBtn = null;
        this._carriageTab.length = 0;
        this._clickPos = 0;
        this._clickWife = "";
        this._remainNum = null;
        _super.prototype.dispose.call(this);
    };
    return WifeBanish;
}(BaseDisplayObjectContainer));
__reflect(WifeBanish.prototype, "WifeBanish");
//# sourceMappingURL=WifeBanish.js.map