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
 * 麦田飘香大箱子item
 * author 赵占涛
 */
var AcRyeHarvestBigBoxItem = (function (_super) {
    __extends(AcRyeHarvestBigBoxItem, _super);
    function AcRyeHarvestBigBoxItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._Index = 0;
        _this._tadayTaskTxt = null;
        return _this;
    }
    Object.defineProperty(AcRyeHarvestBigBoxItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRyeHarvestBigBoxItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRyeHarvestBigBoxItem.prototype, "aid", {
        get: function () {
            return "ryeHarvest";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRyeHarvestBigBoxItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcRyeHarvestBigBoxItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 2:
                code = '1';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcRyeHarvestBigBoxItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcRyeHarvestBigBoxItem.prototype.initItem = function (index, data, itemParam) {
        var view = this;
        view._data = data;
        view.width = 518;
        view._code = itemParam;
        view._Index = index;
        var reward = data.getReward;
        var rIcons = GameData.getRewardItemIcons(reward, true, true);
        var row = Math.ceil(rIcons.length / 5); //行数
        view.height = 5 + 30 + 5 + row * 108 + (row - 1) * 5 + 10 + 80 + view.getSpaceY();
        var bg = BaseBitmap.create("activity_db_01");
        bg.width = view.width;
        bg.height = view.height - view.getSpaceY();
        view.addChild(bg);
        var titleBg = BaseBitmap.create("public_up3"); //arcadegame_topbg_2
        titleBg.width = 510;
        titleBg.height = 33;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 6);
        view.addChild(titleBg);
        //任务：1／10
        var tadayTaskTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        tadayTaskTxt.text = LanguageManager.getlocal("acRyeHarvestBigBoxTitle-" + this.getUiCode(), [String(this.vo.num), this._data.needValue]);
        tadayTaskTxt.x = 24;
        tadayTaskTxt.y = 24 - tadayTaskTxt.height / 2;
        this._tadayTaskTxt = tadayTaskTxt;
        this.addChild(tadayTaskTxt);
        var tmpY = 5;
        for (var i in rIcons) {
            var icon = rIcons[i];
            icon.setScale(0.8);
            var idx = Number(i);
            icon.x = 27 + (idx % 5) * (108 * 0.8 + 8);
            icon.y = 50 + Math.floor(idx / 5) * (108 * 0.8 + 5);
            view.addChild(icon);
        }
        if (view.vo.getBigBoxOneGetted(this._Index + 1)) {
            var flag = BaseBitmap.create("collectflag");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, flag, bg, [10, 20]);
            view.addChild(flag);
        }
        else {
            var str = "";
            var res = "";
            if (view.vo.num < data.needValue) {
                res = ButtonConst.BTN_SMALL_YELLOW;
                str = "taskGoBtn"; // 前往
            }
            else {
                res = ButtonConst.BTN_SMALL_YELLOW;
                str = "taskCollect"; // 领取
            }
            var btn = ComponentManager.getButton(res, str, view.buyHandler, view);
            view.addChild(btn);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, bg, [0, 20]);
            if (view.vo.num >= data.needValue) {
                if (view.vo.isActyEnd()) {
                    App.CommonUtil.removeIconFromBDOC(btn);
                }
                else {
                    App.CommonUtil.addIconToBDOC(btn);
                }
                btn.setGray(view.vo.isActyEnd());
            }
            else {
                btn.setGray(!view.vo.isInActivity());
            }
        }
    };
    AcRyeHarvestBigBoxItem.prototype.buyHandler = function (param) {
        var view = this;
        if (view.vo.isActyEnd()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (view.vo.num < view._data.needValue) {
            console.log("关闭对话框");
            ViewController.getInstance().hideView(ViewConst.POPUP.ACRYEHARVESTBIGBOXPOPUPVIEW);
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_RYEHARVEST_GETBIGPRIZE, {
                activeId: view.acTivityId,
                gid: view._Index + 1,
            });
        }
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM);
    };
    AcRyeHarvestBigBoxItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcRyeHarvestBigBoxItem.prototype.dispose = function () {
        var view = this;
        view._Index = 0;
        _super.prototype.dispose.call(this);
    };
    return AcRyeHarvestBigBoxItem;
}(ScrollListItem));
__reflect(AcRyeHarvestBigBoxItem.prototype, "AcRyeHarvestBigBoxItem");
