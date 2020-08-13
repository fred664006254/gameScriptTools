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
 * 全服进度奖励item
 * @author ycg
 */
var AcGoodMatchDetailTab2ScrollItem = /** @class */ (function (_super) {
    __extends(AcGoodMatchDetailTab2ScrollItem, _super);
    function AcGoodMatchDetailTab2ScrollItem() {
        var _this = _super.call(this) || this;
        _this._aid = null;
        _this._code = null;
        return _this;
    }
    Object.defineProperty(AcGoodMatchDetailTab2ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailTab2ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailTab2ScrollItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailTab2ScrollItem.prototype, "aid", {
        get: function () {
            return this._aid;
        },
        enumerable: true,
        configurable: true
    });
    AcGoodMatchDetailTab2ScrollItem.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcGoodMatchDetailTab2ScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this.width = 530;
        //item bg
        var bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        var titleBg = BaseBitmap.create("ac_skinoflibai_chargeitem_red");
        this.addChild(titleBg);
        titleBg.x = bg.x;
        titleBg.y = 7;
        //title txt
        var titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchServerProcessInfo1", this.getTypeCode()), ["" + data.needNum2]);
        ;
        var titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt.x = titleBg.x + 15;
        titleTxt.y = titleBg.y + titleBg.height / 2 - titleTxt.height / 2;
        this.addChild(titleTxt);
        var rewardIconList = GameData.getRewardItemIcons(data.getReward, true, true);
        var scale = 0.8;
        var itemHeight = 108;
        var itemWidth = 108;
        var spaceX = 10;
        var spaceY = 10;
        var stX = bg.x + (bg.width - (itemWidth * scale + spaceX) * 5 + spaceX) / 2;
        var stY = titleBg.y + titleBg.height + 15;
        var offHeight = 80;
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = bg.width - 20;
        rewardBg.x = bg.x + bg.width / 2 - rewardBg.width / 2;
        rewardBg.y = stY - 10;
        this.addChild(rewardBg);
        for (var i = 0; i < rewardIconList.length; i++) {
            var rewardDB = rewardIconList[i];
            rewardDB.setScale(scale);
            rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 5)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
            this.addChild(rewardDB);
        }
        rewardBg.height = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + 20;
        var bgHeight = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + stY + offHeight;
        if (bgHeight > bg.height) {
            bg.height = bgHeight;
        }
        //进度条
        var progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 330);
        progress.setPosition(bg.x + 15, bg.y + bg.height - progress.height - 20);
        this.addChild(progress);
        var serverNum = this.vo.getServerProcessNum();
        var progressStr = LanguageManager.getlocal("acLotusDetailProcessNum-1", [String(serverNum), String(data.needNum2)]);
        progress.setPercentage(serverNum / data.needNum2, progressStr, TextFieldConst.COLOR_WHITE);
        if (serverNum >= data.needNum2) {
            titleBg.setRes("ac_skinoflibai_chargeitem_green");
        }
        var currNum = this.vo.getProcessNum();
        if (this.vo.isGetServerRewardById(data.id)) {
            var reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(bg.x + bg.width - reviceBM.width * 0.7 / 2 - 10, bg.y + bg.height - reviceBM.height * 0.7 / 2);
            this.addChild(reviceBM);
        }
        else {
            if (currNum >= data.needNum1) {
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", function () {
                    if ((!_this.vo.isStart)) {
                        _this.vo.showAcEndTip();
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_ACGOODMATCH_GETSERVERACHRWD, { activeId: _this.vo.aidAndCode, rkey: data.id });
                }, this);
                reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 10);
                this.addChild(reviceBtn);
                reviceBtn.setColor(TextFieldConst.COLOR_BLACK);
                if (serverNum < data.needNum2) {
                    reviceBtn.setEnable(false);
                }
                else {
                    reviceBtn.setEnable(true);
                }
            }
            else {
                var needNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchServerProcessInfo2", this.getTypeCode()), ["" + data.needNum1]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
                needNum.width = bg.x + bg.width - progress.width - progress.x - 10;
                needNum.lineSpacing = 3;
                needNum.textAlign = TextFieldConst.ALIGH_CENTER;
                needNum.setPosition(progress.x + progress.width + 5, rewardBg.y + rewardBg.height + 13);
                this.addChild(needNum);
            }
        }
        this.height = bg.y + bg.height + this.getSpaceY();
    };
    AcGoodMatchDetailTab2ScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcGoodMatchDetailTab2ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcGoodMatchDetailTab2ScrollItem.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        _super.prototype.dispose.call(this);
    };
    return AcGoodMatchDetailTab2ScrollItem;
}(ScrollListItem));
//# sourceMappingURL=AcGoodMatchDetailTab2ScrollItem.js.map