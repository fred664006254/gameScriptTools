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
 * 排行列表节点
 */
var AcConquerMainLandPRankItem = (function (_super) {
    __extends(AcConquerMainLandPRankItem, _super);
    function AcConquerMainLandPRankItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcConquerMainLandPRankItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandPRankItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandPRankItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandPRankItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_CONQUERMAINLAND;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandPRankItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandPRankItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcConquerMainLandPRankItem.prototype.initItem = function (index, data, item) {
        this._code = item;
        this.width = 545;
        this.height = 80; //rankbg_1
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        var orderid = index + 1;
        var pos = data.pos[0];
        if (index < 3) {
            var rankbg = BaseBitmap.create("rankbg_" + String(index + 1));
            rankbg.width = this.width;
            rankbg.height = this.height;
            rankbg.x = this.width / 2 - rankbg.width / 2;
            rankbg.y = this.height / 2 - rankbg.height / 2;
            this.addChild(rankbg);
            var rankImg = BaseBitmap.create("rankinglist_rankn" + String(index + 1));
            rankImg.x = pos.x + (pos.width - rankImg.width) / 2 - 32;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            rankTxt.text = String(index + 1);
            rankTxt.x = pos.x + (pos.width - rankTxt.width) / 2 - 32;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        pos = data.pos[1];
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        nameTxt.text = data.name;
        nameTxt.x = pos.x + (pos.width - nameTxt.width) / 2 - 32;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        if (PlatformManager.checkIsRuSp()) {
            nameTxt.x += 20;
        }
        pos = data.pos[2];
        var serverTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        serverTxt.text = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.zid);
        serverTxt.x = pos.x + (pos.width - serverTxt.width) / 2 - 32;
        serverTxt.y = nameTxt.y;
        this.addChild(serverTxt);
        pos = data.pos[3];
        var powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        powerTxt.text = App.StringUtil.changeIntToText(Number(data.score), 4);
        powerTxt.x = pos.x + (pos.width - powerTxt.width) / 2 - 32;
        powerTxt.y = nameTxt.y;
        this.addChild(powerTxt);
        if (!this.vo.checkIsJJL) {
            pos = data.pos[4];
            var powerAddTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            powerAddTxt.text = App.StringUtil.changeIntToText(Number(data.add) * this.vo.getTimeBuff());
            powerAddTxt.x = pos.x + (pos.width - powerAddTxt.width) / 2 - 32;
            powerAddTxt.y = nameTxt.y;
            this.addChild(powerAddTxt);
        }
        // if ( this._uiData.vip != "0")
        // {
        //     let vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(this._uiData.vip).icon);
        //     vipFlag.setScale(0.65);
        //     vipFlag.x =   nameTxt.x + nameTxt.width  ;
        //     vipFlag.y = nameTxt.y ;
        //     this.addChild(vipFlag);
        // }
        var lineImg = BaseBitmap.create("public_line1");
        lineImg.width = this.width;
        lineImg.x = 0;
        lineImg.y = this.height - lineImg.height;
        this.addChild(lineImg);
        this.addTouchTap(function () {
            NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, {
                ruid: data.uid,
                rzid: Api.mergeServerVoApi.getTrueZid(data.uid)
            });
        }, this);
    };
    AcConquerMainLandPRankItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    AcConquerMainLandPRankItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcConquerMainLandPRankItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandPRankItem;
}(ScrollListItem));
__reflect(AcConquerMainLandPRankItem.prototype, "AcConquerMainLandPRankItem");
//# sourceMappingURL=AcConquerMainLandPRankItem.js.map