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
var LevyScrollItemDetailBuffItem = (function (_super) {
    __extends(LevyScrollItemDetailBuffItem, _super);
    function LevyScrollItemDetailBuffItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    Object.defineProperty(LevyScrollItemDetailBuffItem.prototype, "buffIndex", {
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    LevyScrollItemDetailBuffItem.prototype.initItem = function (index, data, itemParam) {
        this._data = data;
        this.width = 520;
        this.height = 70;
        //征收条目的index
        var itemIndex = itemParam.itemIndex;
        var buffCfg = Api.levyVoApi.getBuffCfg(itemIndex, this.buffIndex);
        var tarColor = TextFieldConst.COLOR_BROWN_NEW;
        var condBg = BaseBitmap.create("public_ts_bg01");
        condBg.width = 420;
        condBg.setPosition(this.width / 2 - condBg.width / 2, 10);
        this.addChild(condBg);
        var starRes = "levy_star1";
        if (Api.levyVoApi.getBuffIsFull(itemIndex, this.buffIndex)) {
            starRes = "levy_star2";
        }
        else {
            if (Api.levyVoApi.checkLevyItemIsLaunch(itemIndex)) {
                var btnRes = "";
                switch (buffCfg.condType) {
                    case 1:
                        btnRes = "levy_uplevelbtn";
                        break;
                    case 2:
                        btnRes = "levy_upabilitybtn";
                        break;
                    case 3:
                        btnRes = "levy_getBtn";
                        break;
                    default:
                        break;
                }
                var goBtn = ComponentManager.getButton(btnRes, '', this.goBtnClick, this, [{ itemIndex: itemIndex, condType: buffCfg.condType }]);
                this.addChild(goBtn);
                goBtn.setPosition(condBg.x + condBg.width - 30, condBg.y + condBg.height / 2 - goBtn.height / 2);
            }
        }
        var star = BaseBitmap.create(starRes);
        star.setScale(0.7);
        this.addChild(star);
        star.x = 80;
        star.y = condBg.y;
        var condParam = [buffCfg.condNum + ''];
        if (buffCfg.condType == 3) {
            var __condNum = buffCfg.condNum;
            condParam = [
                LanguageManager.getlocal("servantQuality_name" + __condNum[0]),
                __condNum[1] + ""
            ];
        }
        var conditonStr = LanguageManager.getlocal("levy_buffitem_conditon_type" + buffCfg.condType, condParam) + ("(" + Api.levyVoApi.getBuffStateStr(itemIndex, this.buffIndex) + ")");
        var conditonTxt = ComponentManager.getTextField(conditonStr, 20, tarColor);
        this.addChild(conditonTxt);
        conditonTxt.setPosition(star.x + star.width - 5, star.y + 7);
        for (var i = 0; i < buffCfg.levyBuffID.length; i++) {
            var buffAddNum = 0;
            buffAddNum = Api.levyVoApi.getBuffAddNumById(buffCfg.levyBuffID[i]);
            var buffInfoCfg = Config.LevyCfg.getBuffInfoCfg(buffCfg.levyBuffID[i]);
            var buffDescStr = LanguageManager.getlocal("levy_buffitem_buffdesc", [
                LanguageManager.getlocal("servantInfo_speciality" + buffInfoCfg.attType),
                Math.round(buffInfoCfg.rate * 100) + "%",
                LanguageManager.getlocal("affair_rewardType" + buffInfoCfg.resType),
            ]) + ("(" + LanguageManager.getlocal("levy_buffitem_buffaddnow", [buffAddNum + ""]) + ")");
            var buffDescTxt = ComponentManager.getTextField(buffDescStr, 18, TextFieldConst.COLOR_QUALITY_ORANGE_NEW);
            this.addChild(buffDescTxt);
            buffDescTxt.setPosition(this.width / 2 - buffDescTxt.width / 2, star.y + star.height + i * (buffDescTxt.height + 10));
            this.height = buffDescTxt.y + buffDescTxt.height + 20;
        }
        var line = BaseBitmap.create("public_line4");
        this.addChild(line);
        line.width = this.width - 10;
        line.x = 8;
        line.y = this.height - line.height;
    };
    LevyScrollItemDetailBuffItem.prototype.goBtnClick = function (param) {
        if (param.itemIndex && param.condType) {
            var sids = Api.levyVoApi.getLevyItemServantIds(param.itemIndex);
            var servantId = '';
            if (sids && param.condType == 1) {
                var minLevel = 0;
                for (var key in sids) {
                    if (sids.hasOwnProperty(key)) {
                        var serObj = Api.servantVoApi.getServantObj(sids[key]);
                        if (!servantId && !minLevel) {
                            servantId = sids[key];
                            minLevel = serObj.level;
                        }
                        if (serObj.level < minLevel) {
                            servantId = sids[key];
                            minLevel = serObj.level;
                        }
                    }
                }
            }
            else if (sids && param.condType == 2) {
                var minAb = 0;
                for (var key in sids) {
                    if (sids.hasOwnProperty(key)) {
                        var serObj = Api.servantVoApi.getServantObj(sids[key]);
                        if (!servantId && !minAb) {
                            servantId = sids[key];
                            minAb = serObj.getTotalBookValue();
                        }
                        if (serObj.getTotalBookValue() < minAb) {
                            servantId = sids[key];
                            minAb = serObj.getTotalBookValue();
                        }
                    }
                }
            }
            else if (param.condType == 3) {
                if (Api.shopVoApi.isCanShowFirstCharge()) {
                    ViewController.getInstance().openView(ViewConst.POPUP.FIRSTRECHARGEVIEW);
                }
                else {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEWTAB2);
                }
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, servantId);
        }
    };
    /**
     * 不同格子Y间距
     */
    LevyScrollItemDetailBuffItem.prototype.getSpaceY = function () {
        return 0;
    };
    LevyScrollItemDetailBuffItem.prototype.dispose = function () {
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return LevyScrollItemDetailBuffItem;
}(ScrollListItem));
__reflect(LevyScrollItemDetailBuffItem.prototype, "LevyScrollItemDetailBuffItem");
