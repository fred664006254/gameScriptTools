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
 * 竞猜选择item
 */
var AcGroupWifeBattleGuessSelectItem = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleGuessSelectItem, _super);
    function AcGroupWifeBattleGuessSelectItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcGroupWifeBattleGuessSelectItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleGuessSelectItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleGuessSelectItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleGuessSelectItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_GROUPWIFEBATTLE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleGuessSelectItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleGuessSelectItem.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcGroupWifeBattleGuessSelectItem.prototype.initItem = function (index, data, itemrapam) {
        var _this = this;
        this.width = 545 - 33.5;
        this.height = 65; //rankbg_1
        this._code = itemrapam;
        var nameStr = "battlelistbg1";
        if (index % 2 == 0) {
            nameStr = 'battlelistbg2';
        }
        var bit = BaseBitmap.create(nameStr);
        bit.scaleX = (bit.width - 33.5 - 40) / bit.width;
        bit.x = 0;
        bit.height = this.height;
        this.addChild(bit);
        var tarColor = TextFieldConst.COLOR_BROWN;
        var orderid = index + 1;
        var pos = data.pos[0];
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        nameTxt.text = data.alliName;
        nameTxt.x = pos.x + (pos.width - nameTxt.width) / 2 - 25;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        pos = data.pos[1];
        var serverTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        serverTxt.text = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.server);
        serverTxt.x = pos.x + (pos.width - serverTxt.width) / 2 - 25;
        serverTxt.y = nameTxt.y;
        this.addChild(serverTxt);
        pos = data.pos[2];
        var powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        powerTxt.text = App.StringUtil.changeIntToText(Number(data.total));
        powerTxt.x = pos.x + (pos.width - powerTxt.width) / 2 - 25;
        powerTxt.y = nameTxt.y;
        this.addChild(powerTxt);
        pos = data.pos[3];
        var powerAddTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        powerAddTxt.text = App.StringUtil.changeIntToText(Number(data.affect));
        powerAddTxt.x = pos.x + (pos.width - powerAddTxt.width) / 2 - 25;
        powerAddTxt.y = nameTxt.y;
        this.addChild(powerAddTxt);
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acPunishBtn6", function () {
            if (_this.vo.getCurRound() == 1) {
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: LanguageManager.getlocal("acGroupWifeBattlecheertip18-" + _this.getUiCode(), ["" + data.alliName]),
                    title: "acGroupWifeBattlecheertip17-" + _this.getUiCode(),
                    touchMaskClose: true,
                    callback: function () {
                        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHEER, {
                            activeId: _this.acTivityId,
                            allianceId: data.mid
                        });
                    },
                    handle: _this,
                    needClose: 1,
                    needCancel: true
                });
            }
            else {
                var str = LanguageManager.getlocal("acGroupWifeBattlecheertip3-" + _this.getUiCode());
                App.CommonUtil.showTip(str);
            }
        }, this);
        btn.setScale(0.9);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, this, [-30, 0]);
        this.addChild(btn);
    };
    AcGroupWifeBattleGuessSelectItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcGroupWifeBattleGuessSelectItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcGroupWifeBattleGuessSelectItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleGuessSelectItem;
}(ScrollListItem));
//# sourceMappingURL=AcGroupWifeBattleGuessSelectItem.js.map