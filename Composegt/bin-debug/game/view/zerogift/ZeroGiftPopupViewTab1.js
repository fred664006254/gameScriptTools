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
var ZeroGiftPopupViewTab1 = (function (_super) {
    __extends(ZeroGiftPopupViewTab1, _super);
    function ZeroGiftPopupViewTab1() {
        var _this = _super.call(this) || this;
        _this.hasInit = false;
        // this.initView();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        return _this;
    }
    ZeroGiftPopupViewTab1.prototype.initView = function () {
        if (this.hasInit == false) {
            var X = this.x;
            this.hasInit = true;
            var des4888 = BaseBitmap.create("zerogift_des4888");
            des4888.x = -1; //(GameConfig.stageWidth - des4888.width) / 2 - X//-9;
            des4888.y = 110;
            this.addChild(des4888);
            //龙骨动画组，第一个为头像
            var head = BaseBitmap.create("zerogift_headicon");
            head.x = 147, head.y = des4888.y + 190;
            this.addChild(head);
            //权势增幅
            var shili = BaseBitmap.create("zerogift_shili_40000");
            shili.x = (GameConfig.stageWidth - shili.width) / 2 - X; //150
            shili.y = 565; //head.y + 270;
            this.addChild(shili);
            //六个物品，
            var rewardString = Config.ZerogiftCfg.getList(1), contentList = GameData.formatRewardItem(rewardString); //shopItemCfg.contentList;
            var _scroRect = new egret.Rectangle(0, 0, 380, 200);
            var _scrollList = ComponentManager.getScrollList(ZeroGiftItem, contentList, _scroRect);
            _scrollList.x = 104;
            _scrollList.y = shili.y + 42;
            this.addChild(_scrollList);
            var buyBtn = ComponentManager.getButton(("acredlotuswarrior_btn-1"), "zeroprice_" + 4888, this.touchBtn, this, null, null, TextFieldConst.FONTSIZE_TITLE_BIG);
            buyBtn.x = 151;
            buyBtn.y = 825;
            this.addChild(buyBtn);
            this.buyBtn = buyBtn;
            buyBtn.setColor(TextFieldConst.COLOR_BTN_YELLOW);
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BUY_ZEROGIFT, this.receiveData, this);
            var zeroGift = Api.otherInfoVoApi.getOtherInfo().info["zeroGift"];
            if (zeroGift) {
                if (zeroGift["flags"]['1'] >= 1) {
                    buyBtn.setText("atkrace_buy_already");
                    buyBtn.setEnable(false);
                    buyBtn.removeTextIcon();
                }
                else {
                    buyBtn.addTextIcon("public_icon1", 1);
                }
            }
        }
    };
    ZeroGiftPopupViewTab1.prototype.touchBtn = function () {
        var view = ViewController.getInstance().getView("ZeroGiftPopupView");
        view.toBuy('1', 4888);
    };
    ZeroGiftPopupViewTab1.prototype.receiveData = function (event) {
        //购买成功，按键置灰，
        var zeroGift = Api.otherInfoVoApi.getOtherInfo().info["zeroGift"];
        if (zeroGift) {
            if (zeroGift["flags"]['1'] >= 1) {
                this.buyBtn.setText("atkrace_buy_already");
                this.buyBtn.setEnable(false);
                this.buyBtn.removeTextIcon();
            }
        }
    };
    ZeroGiftPopupViewTab1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.buyBtn = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BUY_ZEROGIFT, this.receiveData, this);
        this.hasInit = false;
    };
    return ZeroGiftPopupViewTab1;
}(CommonViewTab));
__reflect(ZeroGiftPopupViewTab1.prototype, "ZeroGiftPopupViewTab1");
