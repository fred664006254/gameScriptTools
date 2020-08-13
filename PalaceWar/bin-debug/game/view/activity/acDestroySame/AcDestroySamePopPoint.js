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
 * 南瓜节点
 * author 陈可
 * date 2017/9/22
 * @class ScrollListItem
 */
var AcDestroySamePopPoint = (function (_super) {
    __extends(AcDestroySamePopPoint, _super);
    function AcDestroySamePopPoint() {
        var _this = _super.call(this) || this;
        _this._idx = 0;
        _this.aid = "";
        _this.code = "";
        _this._select = null;
        _this._calin = false;
        return _this;
    }
    Object.defineProperty(AcDestroySamePopPoint.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySamePopPoint.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySamePopPoint.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDestroySamePopPoint.prototype.getUiCode = function () {
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
    AcDestroySamePopPoint.prototype.init = function (id, aid, code, type) {
        if (type === void 0) { type = 0; }
        this._idx = id;
        this.aid = aid;
        this.code = code;
        this.width = 108;
        this.height = 108;
        var uicode = this.getUiCode();
        var pos = this.getPoint();
        if (!type) {
            type = this.vo.getPopPos(pos.x, pos.y);
        }
        var typecolor = type;
        /*
        4 蓝橙黄
        5 黄紫蓝
        6 橙黄紫
        7 紫蓝橙
        **/
        // if(Number(uicode) == 4){
        // 	let color = [];
        // 	switch(Number(code)){
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
        // 	typecolor = color[type - 1];
        // }
        var cardbg = BaseLoadBitmap.create(App.CommonUtil.getResByCode("destroysameiconbg" + typecolor, uicode));
        cardbg.width = 108;
        cardbg.height = 108;
        this.addChild(cardbg);
        cardbg.name = "cardbg";
        var cardpop = BaseBitmap.create(App.CommonUtil.getResByCode("destroyicon" + typecolor, uicode));
        this.addChild(cardpop);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardpop, cardbg);
        cardpop.name = "cardpop";
        var select = BaseLoadBitmap.create("destroysameiconselect");
        select.width = 134;
        select.height = 134;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, select, cardbg);
        this.addChild(select);
        select.visible = false;
        this._select = select;
        select.touchEnabled = false;
        this.addTouchTap(this.touchPoint, this, null);
    };
    //获取横纵坐标
    AcDestroySamePopPoint.prototype.getPoint = function () {
        return {
            x: Math.ceil(this._idx / 3),
            y: this._idx % 3 == 0 ? 3 : this._idx % 3,
        };
    };
    AcDestroySamePopPoint.prototype.setSelect = function (flag) {
        this._select.visible = flag;
        this._select.alpha = 1;
        if (flag) {
            egret.Tween.removeTweens(this._select);
            egret.Tween.get(this._select, { loop: true }).to({ alpha: 0 }, 800).to({ alpha: 1 }, 800).wait(100);
        }
    };
    AcDestroySamePopPoint.prototype.setInCal = function (flag) {
        this._calin = flag;
    };
    AcDestroySamePopPoint.prototype.getInCal = function () {
        return this._calin;
    };
    //选中的区域南瓜播放碎裂效果
    AcDestroySamePopPoint.prototype.showEffect = function (func, obj) {
        var _this = this;
        var view = this;
        var framnum = 11;
        var tmpW = 400;
        var tmpH = 350;
        if (Number(this.getUiCode()) == 3) {
            framnum = 7;
            tmpW = 300;
            tmpH = 300;
        }
        if (Number(this.getUiCode()) == 4) {
            framnum = 10;
            tmpW = 250;
            tmpH = 280;
        }
        var posuigame = Number(this.getUiCode()) < 3 ? "destroysameposui" : "destroysameposui-" + this.getUiCode();
        var clip = ComponentManager.getCustomMovieClip(posuigame, framnum);
        clip.width = tmpW;
        clip.height = tmpH;
        clip.anchorOffsetX = clip.width / 2;
        clip.anchorOffsetY = clip.height / 2;
        this.addChild(clip);
        clip.x = 50;
        clip.y = 110;
        if (Number(this.getUiCode()) == 3) {
            clip.x = 62;
            clip.y = 60;
        }
        if (Number(this.getUiCode()) == 4) {
            clip.x = 43;
            clip.y = 95;
        }
        clip.playWithTime(1);
        var cardbg = view.getChildByName("cardbg");
        var cardpop = view.getChildByName("cardpop");
        egret.Tween.removeTweens(this._select);
        var flash = BaseBitmap.create("destroysameposuiflash");
        this.addChild(flash);
        flash.touchEnabled = false;
        flash.alpha = 0;
        flash.blendMode = egret.BlendMode.ADD;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flash, cardbg);
        if (Number(this.getUiCode()) == 4) {
            egret.Tween.get(flash).to({ alpha: 1 }, 200).call(function () {
                flash.alpha = 0;
                cardbg.alpha = cardpop.alpha = _this._select.alpha = 0;
                egret.Tween.removeTweens(flash);
                flash.dispose();
                flash = null;
            }, view);
        }
        else {
            cardbg.alpha = cardpop.alpha = this._select.alpha = 0;
        }
        clip.setEndCallBack(function () {
            clip.dispose();
            clip = null;
            func.apply(obj);
        }, view);
        // func.apply(obj);
    };
    AcDestroySamePopPoint.prototype.getSelect = function () {
        return this._select.visible;
    };
    AcDestroySamePopPoint.prototype.touchPoint = function () {
        var baseview = ViewController.getInstance().getView("AcDestroySameView");
        if (baseview && baseview.getStop()) {
            return;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE, 0);
        this.vo.pointidx = this._idx;
        this.makeLinePoint();
        this._select.visible = true;
    };
    //获取可消除区域
    AcDestroySamePopPoint.prototype.makeLinePoint = function () {
        var view = this;
        view._calin = true;
        var pos = this.getPoint();
        var type = this.vo.getPopPos(pos.x, pos.y);
        //上下左右 四个方向
        var arr = [
            {
                x: pos.x, y: pos.y - 1
            },
            {
                x: pos.x, y: pos.y + 1
            },
            {
                x: pos.x - 1, y: pos.y
            },
            {
                x: pos.x + 1, y: pos.y
            }
        ];
        //let mainview = <AcDestroySameView>ViewController.getInstance().getView(`AcDestroySameView`);
        for (var i in arr) {
            var unit = arr[i];
            var unittype = this.vo.getPopPos(unit.x, unit.y);
            if (unittype == type) {
                view._select.visible = true;
                var id = (unit.x - 1) * 3 + unit.y;
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE, id);
            }
        }
    };
    AcDestroySamePopPoint.prototype.dispose = function () {
        this._idx = 0;
        this._select = null;
        this._calin = false;
        this.removeTouchTap();
        _super.prototype.dispose.call(this);
    };
    return AcDestroySamePopPoint;
}(BaseDisplayObjectContainer));
__reflect(AcDestroySamePopPoint.prototype, "AcDestroySamePopPoint");
//# sourceMappingURL=AcDestroySamePopPoint.js.map