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
/*
author : qinajun
desc : 劳动活动 排行
*/
var AcArenaPopupViewTab2 = (function (_super) {
    __extends(AcArenaPopupViewTab2, _super);
    function AcArenaPopupViewTab2() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._nodeContainer = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcArenaPopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaPopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaPopupViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcArenaPopupViewTab2.prototype.initView = function () {
        var view = this;
        // let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = 620;
        view.width = 545;
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 540;
        Bg.height = 550;
        Bg.x = 20;
        Bg.y = 55;
        view.addChild(Bg);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
        view._nodeContainer = new BaseDisplayObjectContainer();
        // this.addChild(this._nodeContainer);
        var str = '';
        /**
         *
         * */
        var rankList = view.vo.getArr('rankReward');
        var tmpX = 0;
        var scroStartY = 3;
        for (var index = 0; index < rankList.length; index++) {
            var id = index;
            var rItem = rankList[index];
            var key = rItem.id;
            var winbg = BaseBitmap.create("public_9_bg33");
            winbg.width = 535;
            winbg.height = 33;
            winbg.y = scroStartY;
            winbg.x = 3;
            this._nodeContainer.addChild(winbg);
            var line1 = BaseBitmap.create("public_line3");
            line1.width = 480;
            line1.x = winbg.x + winbg.width / 2 - line1.width / 2;
            line1.y = winbg.y + winbg.height / 2 - line1.height / 2;
            this._nodeContainer.addChild(line1);
            var rewardStr = rItem.getReward;
            var rIcons = rItem.rewardIcons;
            var rank = rItem.rank;
            var txt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            var order = Number(key);
            if (order < 4) {
                txt.text = LanguageManager.getlocal("acRank_rank6", [order.toString()]);
            }
            else {
                if (rank[0] < rank[1]) {
                    txt.text = txt.text = LanguageManager.getlocal("acRank_rank4", [String(rank[0]), String(rank[1])]);
                }
                else {
                    txt.text = LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
                }
            }
            txt.x = winbg.x + winbg.width / 2 - txt.width / 2;
            txt.y = winbg.y + winbg.height / 2 - txt.height / 2;
            this._nodeContainer.addChild(txt);
            var len = rIcons.length;
            var tmpl = Math.min(5, len);
            tmpX = 35; //(540 - tmpl * 108 * 0.8 - (tmpl - 1) * 12) / 2;
            var startY = winbg.y + winbg.height + 25;
            scroStartY = startY;
            for (var innerIdx = 0; innerIdx < len; innerIdx++) {
                var element = rIcons[innerIdx];
                element.setScale(0.8);
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (108 * element.scaleX + 12);
                if (tmpX >= 540) {
                    tmpX = 35; //(540 - tmpl * 108 * 0.8 - (tmpl - 1) * 12) / 2;
                    scroStartY += element.height * element.scaleX + 12;
                    element.x = tmpX;
                    element.y = scroStartY;
                    tmpX += (108 * element.scaleX + 12);
                }
                element.cacheAsBitmap = true;
                this._nodeContainer.addChild(element);
            }
            scroStartY += 120;
            this._nodeContainer.height = scroStartY - 10;
        }
        // 膜拜背景
        var bottomBg = BaseBitmap.create("public_9_bg1");
        bottomBg.width = 540;
        bottomBg.height = 112;
        bottomBg.x = 20;
        bottomBg.y = Bg.y + Bg.height + 10;
        view.addChild(bottomBg);
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'rankViewTitle', function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACARENARANKVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, rankBtn, bottomBg, [15, 20]);
        view.addChild(rankBtn);
        var txt3 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        var rankstr = '';
        var rankV = view.vo.getMyPrank();
        if (rankV == 0) {
            rankstr = LanguageManager.getlocal('atkracedes4');
        }
        else {
            rankstr = rankV.toString();
        }
        var color = String(0x21eb39);
        txt3.text = LanguageManager.getlocal("tombrank1-" + view.code, [color, rankstr]);
        txt3.x = bottomBg.x + 30;
        txt3.y = bottomBg.y + 25;
        this.addChild(txt3);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acLaborrewardtip1-" + view.code), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.x = txt3.x;
        tipTxt.y = txt3.y + txt3.textHeight + 10;
        this.addChild(tipTxt);
        var rect = new egret.Rectangle(0, 0, 540, 540);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.x = 20;
        scrollView.y = 55;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
        scrollView.bounces = false;
    };
    AcArenaPopupViewTab2.prototype.dispose = function () {
        this._nodeContainer = null;
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
        _super.prototype.dispose.call(this);
    };
    return AcArenaPopupViewTab2;
}(AcCommonViewTab));
__reflect(AcArenaPopupViewTab2.prototype, "AcArenaPopupViewTab2");
//# sourceMappingURL=AcArenaPopupViewTab2.js.map