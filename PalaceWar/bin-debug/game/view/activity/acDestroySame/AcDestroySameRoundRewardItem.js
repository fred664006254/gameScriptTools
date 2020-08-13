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
 * author : qianjun
 * desc : 奖励展示
 */
var AcDestroySameRoundRewardItem = (function (_super) {
    __extends(AcDestroySameRoundRewardItem, _super);
    function AcDestroySameRoundRewardItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcDestroySameRoundRewardItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameRoundRewardItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameRoundRewardItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameRoundRewardItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_DESTROYSAME;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameRoundRewardItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcDestroySameRoundRewardItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                code = "4";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcDestroySameRoundRewardItem.prototype.initItem = function (index, data, itemparam) {
        var _this = this;
        var view = this;
        view._code = itemparam;
        var code = view.getUiCode();
        view.width = 510;
        view.height = 250;
        //创建ui
        //背景图片
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 510;
        bg.height = 240;
        view.addChild(bg);
        var bottom2 = BaseBitmap.create("activity_charge_red");
        view.addChild(bottom2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bottom2, bg);
        var tiiptxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("AcDestroySamekillreward", this.code, code), [(data).toString()]), 20);
        view.addChild(tiiptxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tiiptxt, bottom2, [15, 0]);
        var rewardgroup = new BaseDisplayObjectContainer();
        rewardgroup.width = 465;
        view.addChild(rewardgroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rewardgroup, bg, [0, bottom2.y + bottom2.height + 15]);
        var cfg = view.cfg.bossList[data];
        var rewardArr = GameData.formatRewardItem(cfg.getReward);
        var scroStartY = 2;
        var tmpX = 0;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            iconItem.setScale(0.8);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 7);
            if (tmpX > bg.width - 8) {
                tmpX = 0;
                scroStartY += (iconItem.height * iconItem.scaleX) + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 7);
            }
            rewardgroup.addChild(iconItem);
        }
        scroStartY += 110;
        bg.height = scroStartY + 135;
        this.height = bg.height;
        var getbtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
            //
            if (view.vo.getCurround() <= data) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("AcDestroySameTip2", _this.code, code)));
                return;
            }
            if (!view.vo.bossrwd || typeof view.vo.bossrwd[data] == "undefined") {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("AcDestroySameTip3", _this.code, code)));
                return;
            }
            if (_this.vo.et < GameData.serverTime) {
                App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
                return;
            }
            _this.vo.lastidx = index;
            _this.vo.lastpos = getbtn.localToGlobal(getbtn.width / 2 + 50, 20);
            NetManager.request(NetRequestConst.REQUEST_DESTROYSAME_REWARD, {
                activeId: _this.acTivityId,
                rkey: data
            });
        }, view);
        view.addChild(getbtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, getbtn, bg, [0, 20]);
        var isgray = false;
        if (view.vo.getCurround() <= data) {
            isgray = true;
        }
        if (!view.vo.bossrwd || typeof view.vo.bossrwd[data] == "undefined") {
            isgray = true;
        }
        getbtn.setGray(isgray);
        var flag = BaseBitmap.create("collectflag");
        flag.setScale(0.7);
        view.addChild(flag);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, getbtn);
        flag.visible = view.vo.isGetRoundReward(data);
        getbtn.visible = !flag.visible;
    };
    AcDestroySameRoundRewardItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcDestroySameRoundRewardItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcDestroySameRoundRewardItem.prototype.dispose = function () {
        // this._lastReqIdx = null;
        _super.prototype.dispose.call(this);
    };
    return AcDestroySameRoundRewardItem;
}(ScrollListItem));
__reflect(AcDestroySameRoundRewardItem.prototype, "AcDestroySameRoundRewardItem");
//# sourceMappingURL=AcDestroySameRoundRewardItem.js.map