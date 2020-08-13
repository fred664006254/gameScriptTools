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
var AcLanternProcessItem = (function (_super) {
    __extends(AcLanternProcessItem, _super);
    function AcLanternProcessItem() {
        var _this = _super.call(this) || this;
        _this.itemData = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcLanternProcessItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternProcessItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternProcessItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternProcessItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_LANTERN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternProcessItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcLanternProcessItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
            case 3:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcLanternProcessItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        var view = this;
        view._code = itemParam.code;
        // getReward
        // value
        //id
        var id = itemParam.id;
        this.itemData = itemParam.code;
        var aid = this.aid;
        var code = this.code;
        var uicode = this.getUiCode();
        var vo = this.vo;
        var cfg = this.cfg;
        this.width = 530;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 530;
        bg.height = 140;
        this.addChild(bg);
        var titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        titleBg.width = 540;
        titleBg.height = 35;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("aclanterntip8", code), [String(data.answerfrequency)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var itemTopLine = BaseBitmap.create("public_line3");
        itemTopLine.width += titleTF.width;
        itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);
        var rewardVoList = GameData.formatRewardItem(data.getReward);
        var scale = 0.85;
        var itemHeight = 0;
        var rewardbg = BaseBitmap.create("public_9_managebg");
        rewardbg.width = 502;
        rewardbg.setPosition(titleBg.x + titleBg.width / 2 - rewardbg.width / 2, titleBg.y + titleBg.height + 3);
        this.addChild(rewardbg);
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true);
            rewardDB.setScale(scale);
            rewardDB.setPosition(rewardbg.x + 5 + ((rewardDB.width - 8) * (i % 5)), rewardbg.y + 5 + ((rewardDB.height - 8) * Math.floor(i / 5)));
            this.addChild(rewardDB);
            itemHeight = rewardDB.height;
        }
        rewardbg.height = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
        bg.height += (rewardbg.height - 20);
        var progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 350);
        progressBar.setPosition(rewardbg.x + 2, rewardbg.y + rewardbg.height + 20);
        this.addChild(progressBar);
        var percent = vo.getProcessNum() / data.answerfrequency;
        var textStr = vo.getProcessNum() + "/" + data.answerfrequency;
        var textColor = TextFieldConst.COLOR_WHITE;
        progressBar.setPercentage(percent, textStr, textColor);
        // let titelTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipAchievementPopupViewItemProgress-" + code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        // titelTxt.setPosition(progressBar.x + progressBar.width / 2 - titelTxt.width / 2, progressBar.y - titelTxt.height - 5);
        // this.addChild(titelTxt);
        if (vo.isGetprocessReward(data.id)) {
            var flagScale = 0.6;
            var flag = BaseBitmap.create("collectflag");
            flag.setScale(flagScale);
            flag.setPosition(bg.x + bg.width - flag.width * flagScale - 10, progressBar.y + progressBar.height / 2 - flag.height * flagScale / 2);
            this.addChild(flag);
        }
        else {
            var receiveBtn_1 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'taskCollect', function () {
                if (vo.isActyEnd()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                    return;
                }
                if (vo.getProcessNum() < data.answerfrequency) {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("aclanterntip7", view.getUiCode())));
                    return;
                }
                _this.vo.lastidx = _this._index;
                _this.vo.lastpos = receiveBtn_1.localToGlobal(receiveBtn_1.width / 2 + 50, 20);
                NetManager.request(NetRequestConst.REQUEST_LANTERN_PROCESSREWARD, { activeId: vo.aidAndCode, rkey: data.id });
            }, this);
            receiveBtn_1.setPosition(bg.x + bg.width - receiveBtn_1.width - 20, progressBar.y + progressBar.height / 2 - receiveBtn_1.height / 2);
            this.addChild(receiveBtn_1);
            if (vo.getProcessNum() >= data.answerfrequency) {
                receiveBtn_1.setGray(false);
            }
            else {
                receiveBtn_1.setGray(true);
            }
        }
        this.height = bg.height;
        if (id == data.id) {
            var light = BaseBitmap.create("public_9_bg57");
            light.width = bg.width + 10;
            light.height = bg.height + 14;
            light.setPosition(bg.x - 6, bg.y - 6);
            this.addChild(light);
            egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
        }
    };
    AcLanternProcessItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcLanternProcessItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcLanternProcessItem;
}(ScrollListItem));
__reflect(AcLanternProcessItem.prototype, "AcLanternProcessItem");
//# sourceMappingURL=AcLanternProcessItem.js.map