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
 * 进度奖励item
 * @author ycg
 */
var AcKiteDetailPopupViewTab2ScrollItem = (function (_super) {
    __extends(AcKiteDetailPopupViewTab2ScrollItem, _super);
    function AcKiteDetailPopupViewTab2ScrollItem() {
        var _this = _super.call(this) || this;
        _this.itemParam = null;
        return _this;
    }
    Object.defineProperty(AcKiteDetailPopupViewTab2ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupViewTab2ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupViewTab2ScrollItem.prototype, "aid", {
        get: function () {
            return this.itemParam.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupViewTab2ScrollItem.prototype, "code", {
        get: function () {
            return this.itemParam.code;
        },
        enumerable: true,
        configurable: true
    });
    AcKiteDetailPopupViewTab2ScrollItem.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcKiteDetailPopupViewTab2ScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this.itemParam = itemParam;
        this.width = 530;
        //item bg
        var bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        var titleBg = BaseBitmap.create(this.getDefaultRes("ackite_processtitlebg"));
        this.addChild(titleBg);
        titleBg.x = bg.x + bg.width / 2 - titleBg.width / 2;
        bg.y = titleBg.y + 13;
        //title txt
        var titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteDetailProcessTitle", this.getTypeCode()), ["" + data.need]);
        ;
        var titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt.x = this.width / 2 - titleTxt.width / 2;
        titleTxt.y = titleBg.y + 14;
        this.addChild(titleTxt);
        var rewardIconList = GameData.getRewardItemIcons(data.getReward, true, true);
        var scale = 0.8;
        var itemHeight = 108;
        var itemWidth = 108;
        var spaceX = 10;
        var spaceY = 10;
        var stX = bg.x + (bg.width - (itemWidth * scale + spaceX) * 5 + spaceX) / 2;
        var stY = bg.y + 45;
        var offHeight = 85;
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
        var bgHeight = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + stY + offHeight;
        if (bgHeight > bg.height) {
            bg.height = bgHeight;
        }
        rewardBg.height = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + 20;
        //进度条
        var progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 320);
        progress.setPosition(bg.x + 15, bg.y + bg.height - progress.height - 25);
        this.addChild(progress);
        var currNum = this.vo.useNum;
        var progressStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteDetailProcess", this.getTypeCode()), [String(currNum), String(data.need)]);
        progress.setPercentage(currNum / data.need, progressStr, TextFieldConst.COLOR_WHITE);
        var rStatus = this.vo.getBoxStatusByIndex(data.id);
        if (rStatus == 3) {
            var reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(bg.x + bg.width - reviceBM.width * 0.7 / 2 - 10, bg.y + bg.height - reviceBM.height * 0.7 / 2);
            this.addChild(reviceBM);
        }
        else {
            var reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", function () {
                if ((!_this.vo.isStart)) {
                    _this.vo.showAcEndTip();
                    return;
                }
                if (rStatus == 2) {
                    NetManager.request(NetRequestConst.REQUEST_ACKITE_GETBOXREWARD, { activeId: _this.vo.aidAndCode, gid: data.id });
                }
            }, this);
            reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 15);
            this.addChild(reviceBtn);
            reviceBtn.setColor(TextFieldConst.COLOR_BLACK);
            if (rStatus == 1) {
                reviceBtn.setEnable(false);
            }
        }
        if (itemParam.id && Number(itemParam.id) == Number(data.id)) {
            var light = BaseBitmap.create("public_9_bg57");
            light.width = bg.width + 10;
            light.height = bg.height + 16;
            light.setPosition(bg.x - 6, bg.y - 8);
            this.addChildAt(light, this.getChildIndex(bg) + 1);
            egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
        }
        this.height = bg.y + bg.height + this.getSpaceY();
    };
    //根据资源名字得到完整资源名字
    AcKiteDetailPopupViewTab2ScrollItem.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode ? defaultCode : "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else if (ResourceManager.hasRes(resName + "-" + defaultCode)) {
            return resName + "-" + defaultCode;
        }
        else {
            return resName;
        }
    };
    AcKiteDetailPopupViewTab2ScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcKiteDetailPopupViewTab2ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcKiteDetailPopupViewTab2ScrollItem.prototype.dispose = function () {
        this.itemParam = null;
        _super.prototype.dispose.call(this);
    };
    return AcKiteDetailPopupViewTab2ScrollItem;
}(ScrollListItem));
__reflect(AcKiteDetailPopupViewTab2ScrollItem.prototype, "AcKiteDetailPopupViewTab2ScrollItem");
//# sourceMappingURL=AcKiteDetailPopupViewTab2ScrollItem.js.map