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
var AcDestroySameRewardItem = (function (_super) {
    __extends(AcDestroySameRewardItem, _super);
    function AcDestroySameRewardItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcDestroySameRewardItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameRewardItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameRewardItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameRewardItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_DESTROYSAME;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameRewardItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcDestroySameRewardItem.prototype.getUiCode = function () {
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
    AcDestroySameRewardItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        var code = view.getUiCode();
        view.width = 530;
        view.height = 250;
        //创建ui
        //背景图片
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = view.width;
        bg.height = view.height;
        this.addChild(bg);
        var typecolor = index + 1;
        // if(Number(code) == 4){
        // 	let color = [];
        // 	switch(Number(view._code)){
        // 		case 4:
        // 		case 5:
        // 			color = [3,1,2];
        // 			break;
        // 		case 6:
        // 		case 7:
        // 			color = [2,4,3];
        // 			break;
        // 		case 8:
        // 		case 9:
        // 			color = [1,2,4];
        // 			break;
        // 		case 10:
        // 		case 11:
        // 			color = [4,3,1];
        // 			break;
        // 	}
        // 	typecolor = color[index];
        // }
        var card = BaseBitmap.create(App.CommonUtil.getResByCode("destroycard" + typecolor, code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, card, bg, [15, 0]);
        this.addChild(card);
        if (Number(this.getUiCode()) == 3) {
            var icon = BaseBitmap.create("destroybigicon" + (index + 1) + "-3");
            this.addChild(icon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, card, [0, 51]);
            var eff = "destoysameegg" + (index + 1) + "eff";
            var eggeff = ComponentManager.getCustomMovieClip(eff, 10);
            eggeff.width = 160;
            eggeff.height = 180;
            eggeff.blendMode = egret.BlendMode.ADD;
            this.addChild(eggeff);
            eggeff.playWithTime(-1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, eggeff, card, [0, 21]);
        }
        var titlebg = BaseBitmap.create("countrywarrewardview_itembg");
        titlebg.scaleX = 340 / titlebg.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, titlebg, card, [card.width + 3, 0]);
        this.addChild(titlebg);
        var line = BaseBitmap.create("public_line3");
        this.addChild(line);
        var titletxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("AcDestroysameicontype" + typecolor, this.code, code)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        line.width = titletxt.width + 270;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, titlebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titletxt, titlebg);
        this.addChild(titletxt);
        var itembg = BaseBitmap.create("public_9_managebg");
        itembg.width = 300;
        itembg.height = 195;
        this.addChild(itembg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, itembg, titlebg, [20, titlebg.height + 3]);
        var arr = view.cfg["pumpkinPool" + (index + 1)];
        var str = "";
        for (var i in arr) {
            if (Number(i) == (arr.length - 1)) {
                str += "" + arr[i][0];
            }
            else {
                str += arr[i][0] + "|";
            }
        }
        var rewardArr = GameData.formatRewardItem(str);
        var scroStartY = itembg.y + 8;
        var len = 3;
        var scalx = 83 / 108;
        var tmpX = itembg.x + (itembg.width - len * 108 * scalx - (len - 1) * 15) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            iconItem.setScale(0.8);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 10);
            if (tmpX > (itembg.x + itembg.width)) {
                tmpX = itembg.x + (itembg.width - len * 108 * scalx - (len - 1) * 15) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 10);
            }
            this.addChild(iconItem);
        }
    };
    AcDestroySameRewardItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcDestroySameRewardItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcDestroySameRewardItem.prototype.dispose = function () {
        // this._lastReqIdx = null;
        _super.prototype.dispose.call(this);
    };
    return AcDestroySameRewardItem;
}(ScrollListItem));
__reflect(AcDestroySameRewardItem.prototype, "AcDestroySameRewardItem");
//# sourceMappingURL=AcDestroySameRewardItem.js.map