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
 * 爆竹奖励item
 * author qianjun
 */
var AcNewYearCrackerRewardItem = (function (_super) {
    __extends(AcNewYearCrackerRewardItem, _super);
    function AcNewYearCrackerRewardItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._btn = null;
        _this._Index = 0;
        return _this;
    }
    Object.defineProperty(AcNewYearCrackerRewardItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearCrackerRewardItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearCrackerRewardItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearCrackerRewardItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_NEWYEARCRACKER;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearCrackerRewardItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearCrackerRewardItem.prototype.initItem = function (index, data, itemParam) {
        var view = this;
        view._data = data;
        view.width = 528;
        view._code = itemParam;
        view._id = data.id;
        view._Index = index;
        var reward = data.getReward;
        var rIcons = GameData.getRewardItemIcons(reward, true);
        var row = Math.ceil(rIcons.length / 5); //行数
        view.height = 100 + row * 108 * 0.85 + (row - 1) * 5 + 70 + view.getSpaceY();
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = view.width;
        bg.height = view.height - view.getSpaceY();
        view.addChild(bg);
        var charge_redBg = BaseBitmap.create("acmidautumnview_titlebg");
        charge_redBg.width = 485;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, charge_redBg, bg, [0, 10]);
        view.addChild(charge_redBg);
        var line = BaseBitmap.create("public_line3");
        view.addChild(line);
        var roundTxt = ComponentManager.getTextField(LanguageManager.getlocal("acNewYearCrackerName" + data.id + "-" + view._code), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        line.width = roundTxt.textWidth + 280;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, charge_redBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, roundTxt, line);
        view.addChild(roundTxt);
        var tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acNewYearCrackerRewardTip1-" + view._code, [data.needItem]), 20, TextFieldConst.COLOR_BROWN);
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acNewYearCrackerRewardTip2-" + view._code, [LanguageManager.getlocal("acNewYearCrackerName" + data.id + "-" + view._code)]), 20, TextFieldConst.COLOR_BROWN);
        var itemicon = BaseBitmap.create("crackericon1-" + view._code);
        itemicon.setScale(0.35);
        view.addChild(tipTxt1);
        view.addChild(itemicon);
        view.addChild(tipTxt2);
        var posX = (view.width - tipTxt1.textWidth - tipTxt2.textWidth - itemicon.width * itemicon.scaleX) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt1, bg, [posX, 55]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, itemicon, tipTxt1, [tipTxt1.textWidth, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt2, itemicon, [itemicon.width * itemicon.scaleX, 0]);
        var tmpY = 5;
        var tmpX = (bg.width - (Math.min(rIcons.length, 5) * (108 * 0.86) + (Math.min(rIcons.length, 5) - 1) * 8)) / 2;
        for (var i in rIcons) {
            var icon = rIcons[i];
            var idx = Number(i);
            icon.setScale(0.86);
            icon.x = tmpX + (idx % 5) * (108 * icon.scaleX + 8);
            icon.y = 90 + Math.floor(idx / 5) * (108 * icon.scaleY + 5);
            view.addChild(icon);
        }
        var progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 357);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progress, titelTxt, [0,titelTxt.height+5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, progress, bg, [10, 20]);
        view.addChild(progress);
        progress.setPercentage(view.vo.getCrackerNum() / data.needItem, view.vo.getCrackerNum() + "/" + data.needItem, TextFieldConst.COLOR_QUALITY_WHITE);
        if (view.vo.getJinduReward(data.id)) {
            var flag = BaseBitmap.create("collectflag");
            flag.setScale(0.6);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, flag, bg, [10, 10]);
            view.addChild(flag);
        }
        else {
            var btn = ComponentManager.getButton(view.vo.getCrackerNum() < data.needItem ? ButtonConst.BTN_SMALL_RED : ButtonConst.BTN_SMALL_YELLOW, view.vo.getCrackerNum() < data.needItem ? "acNewYearCrackerRewardBtn1-" + view._code : "acNewYearCrackerRewardBtn2-" + view._code, view.buyHandler, view);
            view.addChild(btn);
            // btn.setGray(!view.vo.isInActy());
            if (!view.vo.isInActy()) {
                if (view.vo.getCrackerNum() < data.needItem) {
                    btn.setGray(true);
                }
                else {
                    btn.setGray(false);
                    btn.setText("taskCollect");
                }
            }
            else {
                btn.setGray(false);
                if (view.vo.getCrackerNum() >= data.needItem) {
                    btn.setText("taskCollect");
                }
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, btn, bg, [10, 10]);
            view._btn = btn;
            // if(view.vo.isActyEnd()){
            // }
            // else{
            // 	if(view.vo.getCurRoundGetState(data.id) == 1){
            // 		App.CommonUtil.addIconToBDOC(btn);
            // 	}
            // }
        }
    };
    AcNewYearCrackerRewardItem.prototype.buyHandler = function (param) {
        var view = this;
        // if(!view.vo.isInActy()){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
        // 	return;
        // }
        // if(view.vo.getCrackerNum() < view._data.needItem){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("PlayerReturnTip2"));
        // 	return;
        // }
        //前往充值
        if (view.vo.getCrackerNum() < view._data.needItem) {
            if (!view.vo.isInActy()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
        else {
            if (view.vo.isStart && view.vo.checkIsInEndShowTime()) {
                NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETCRACKERREWARD, {
                    activeId: view.acTivityId,
                    rkey: Number(view._id),
                });
                return;
            }
            var detailview = ViewController.getInstance().getView(ViewConst.POPUP.ACNEWYEARCRACKERDETAILPOPUPVIEW);
            if (detailview) {
                detailview.hide();
            }
            ViewController.getInstance().getView(ViewConst.POPUP.ACNEWYEARCRACKERREWARDPOPUPVIEW).hide();
        }
        // view.vo.selIdx = view._Index;
        // NetManager.request(NetRequestConst.REQUST_ACTIVITY_TREASURECIRCLERERWARD,{
        // 	activeId : view.acTivityId,
        // 	circleId : view._data.num,
        // });
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH);
    };
    AcNewYearCrackerRewardItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcNewYearCrackerRewardItem.prototype.dispose = function () {
        var view = this;
        view._btn = null;
        view._id = 0;
        view._Index = 0;
        _super.prototype.dispose.call(this);
    };
    return AcNewYearCrackerRewardItem;
}(ScrollListItem));
__reflect(AcNewYearCrackerRewardItem.prototype, "AcNewYearCrackerRewardItem");
//# sourceMappingURL=AcNewYearCrackerRewardItem.js.map