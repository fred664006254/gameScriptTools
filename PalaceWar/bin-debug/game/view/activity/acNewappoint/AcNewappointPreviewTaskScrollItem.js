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
 * 任务item
 */
var AcNewappointPreviewTaskScrollItem = /** @class */ (function (_super) {
    __extends(AcNewappointPreviewTaskScrollItem, _super);
    function AcNewappointPreviewTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._aid = null;
        _this._code = null;
        _this._data = null;
        return _this;
    }
    AcNewappointPreviewTaskScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this._data = data;
        this.width = 530;
        //item bg
        var bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        bg.height = 165;
        var titleBg = BaseBitmap.create("shopview_itemtitle");
        this.addChild(titleBg);
        titleBg.x = bg.x;
        titleBg.y = bg.y + 7;
        //title txt
        var titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewScoreItemName1", this.getTypeCode()));
        if (data.taskType != 1) {
            titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewScoreItemName2", this.getTypeCode()), ["" + data.taskValue]);
            ;
        }
        var titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleBg.width = titleTxt.width + 50;
        titleTxt.x = titleBg.x + 20;
        titleTxt.y = titleBg.y + titleBg.height / 2 - titleTxt.height / 2;
        this.addChild(titleTxt);
        var rewards = "1065_0_" + data.getScore + "_" + this.getTypeCode();
        var rewardIconList = GameData.getRewardItemIcons(rewards, true, true);
        var scale = 0.8;
        var itemHeight = 108;
        var itemWidth = 108;
        var spaceX = 10;
        var spaceY = 10;
        // let stX = bg.x + (bg.width - (itemWidth * scale + spaceX) * 5 + spaceX)/2;
        var stX = bg.x + 25;
        var stY = titleBg.y + titleBg.height + 15;
        // let rewardBg = BaseBitmap.create("public_scrolllistbg");
        // rewardBg.width = bg.width - 20;
        // rewardBg.x = bg.x + bg.width/2 - rewardBg.width/2;
        // rewardBg.y = stY - 10;
        // this.addChild(rewardBg);
        for (var i = 0; i < rewardIconList.length; i++) {
            var rewardDB = rewardIconList[i];
            rewardDB.setScale(scale);
            rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 5)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
            this.addChild(rewardDB);
        }
        if (Api.acnewappointApi.isGetTaskReward(data.id)) {
            var reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(bg.x + bg.width - reviceBM.width * 0.7 / 2 - 10, bg.y + bg.height / 2);
            this.addChild(reviceBM);
        }
        else {
            var reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", function () {
                if (!Api.acnewappointApi.isInActivity()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewappointTip2", _this.getTypeCode())));
                    return;
                }
                var acData = Api.acnewappointApi.getAcData();
                var ast = acData.yrst;
                var newZid = acData.newzid;
                var reqData = { t: "getsorcetask", pid: LoginManager.getLocalUserName(), yrst: ast, newzid: newZid, rkey: data.id };
                NetManager.http.get(ServerCfg.svrCfgUrl, reqData, _this.reviceCallback, _this.reviceErrorCallback, _this);
            }, this);
            reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 25);
            this.addChild(reviceBtn);
            reviceBtn.setColor(TextFieldConst.COLOR_BLACK);
            var currNum = Api.acnewappointApi.getTaskNum();
            if (data.taskType == 1) {
                if (!Api.acnewappointApi.isJoin()) {
                    reviceBtn.setEnable(false);
                }
            }
            else {
                if (currNum < data.taskValue) {
                    reviceBtn.setEnable(false);
                }
                //process 
                var processInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewScoreProcess", this.getTypeCode()), ["" + currNum, "" + data.taskValue]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
                processInfo.setPosition(reviceBtn.x + reviceBtn.width / 2 - processInfo.width / 2, reviceBtn.y - processInfo.height - 5);
                this.addChild(processInfo);
            }
            if (!Api.acnewappointApi.isInActivity()) {
                reviceBtn.setEnable(true);
                App.DisplayUtil.changeToGray(reviceBtn);
            }
        }
        this.height = bg.height + this.getSpaceY();
    };
    AcNewappointPreviewTaskScrollItem.prototype.reviceCallback = function (data) {
        if (data) {
            if (data.ret == -1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("requestFailCode-1"));
                return;
            }
            if (data && data.activeData) {
                //奖励
                var rewards = "1065_0_" + this._data.getScore + "_" + this.getTypeCode();
                var rewardVoList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rewardVoList);
                if (data.replacerewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": data.replacerewards });
                }
                Api.acnewappointApi.setAcData(data.activeData);
            }
        }
    };
    AcNewappointPreviewTaskScrollItem.prototype.reviceErrorCallback = function () {
        App.CommonUtil.showTip(LanguageManager.getlocal("requestFailCode-1"));
    };
    Object.defineProperty(AcNewappointPreviewTaskScrollItem.prototype, "code", {
        // private get cfg() : Config.AcCfg.NewappointCfg{
        //     return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        // }
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewappointPreviewTaskScrollItem.prototype, "aid", {
        get: function () {
            return this._aid;
        },
        enumerable: true,
        configurable: true
    });
    AcNewappointPreviewTaskScrollItem.prototype.getTypeCode = function () {
        return this.code;
    };
    AcNewappointPreviewTaskScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcNewappointPreviewTaskScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcNewappointPreviewTaskScrollItem.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return AcNewappointPreviewTaskScrollItem;
}(ScrollListItem));
//# sourceMappingURL=AcNewappointPreviewTaskScrollItem.js.map