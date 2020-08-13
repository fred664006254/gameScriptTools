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
 * 帮会助威选择item
 */
var AcBattleGroundCheerSelectItem = (function (_super) {
    __extends(AcBattleGroundCheerSelectItem, _super);
    function AcBattleGroundCheerSelectItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcBattleGroundCheerSelectItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerSelectItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerSelectItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerSelectItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_BATTLEGROUND;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerSelectItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundCheerSelectItem.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcBattleGroundCheerSelectItem.prototype.initItem = function (index, data, itemrapam) {
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
        // return {
        //     num : num,
        //     alliName : info.name,
        //     alliId : id,
        //     total : total,
        // 	period : status,
        // 	server : info.zid,
        // 	mid : info.id,
        // };
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
        // if ( this._uiData.vip != "0")
        // {
        //     let vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(this._uiData.vip).icon);
        //     vipFlag.setScale(0.65);
        //     vipFlag.x =   nameTxt.x + nameTxt.width  ;
        //     vipFlag.y = nameTxt.y ;
        //     this.addChild(vipFlag);
        // }
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acPunishBtn6", function () {
            if (_this.vo.getCurRound() == 1) {
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: LanguageManager.getlocal("battlegroundcheertip18-" + _this.getUiCode(), ["" + data.alliName]),
                    title: "battlegroundcheertip17-" + _this.getUiCode(),
                    touchMaskClose: true,
                    callback: function () {
                        NetManager.request(NetRequestConst.REQUEST_BATTLEGROUND_CHEER, {
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
                var str = LanguageManager.getlocal("battlegroundcheertip3-" + _this.getUiCode());
                App.CommonUtil.showTip(str);
            }
        }, this);
        btn.setScale(0.9);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, this, [-20, 0]);
        this.addChild(btn);
        // let lineImg = BaseBitmap.create("public_line1");
        // lineImg.width = this.width;
        // lineImg.x = 0;
        // lineImg.y = this.height - lineImg.height;
        // this.addChild(lineImg);
    };
    AcBattleGroundCheerSelectItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcBattleGroundCheerSelectItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcBattleGroundCheerSelectItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundCheerSelectItem;
}(ScrollListItem));
__reflect(AcBattleGroundCheerSelectItem.prototype, "AcBattleGroundCheerSelectItem");
//# sourceMappingURL=AcBattleGroundCheerSelectItem.js.map