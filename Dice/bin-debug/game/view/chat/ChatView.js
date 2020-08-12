/*
 *@description: 龙珠项目战斗表情
 *@author: hwc
 *@date: 2020-04-21 21:57:23
 *@version 0.0.1
 */
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
var ChatView = (function (_super) {
    __extends(ChatView, _super);
    function ChatView() {
        var _this = _super.call(this) || this;
        _this.expList = null;
        _this.expbg = null;
        _this.itemCB = null;
        return _this;
    }
    ChatView.prototype.init = function () {
        var view = this;
        // 遮罩层
        var mask = BaseBitmap.create("public_alphabg");
        this.addChild(mask);
        mask.width = GameConfig.stageWidth;
        mask.height = GameConfig.stageHeigth;
        mask.x = 0;
        mask.y = 0;
        mask.addTouchTap(function () {
            SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
            view.parent.removeChild(view);
        }, view);
        var urls = ["dianzan", "fennu", "daku", "daxiao", "koubizi", "kaixin", "juqi", "leile", "xuanyao", "wanku"];
        // 是否购买高级表情
        var flag = Api.ShopVoApi.getEmotionHasBuyById(1);
        var expGroup = new BaseDisplayObjectContainer();
        this.addChild(expGroup);
        this.expList = expGroup;
        // 表情背景
        var expBg = BaseBitmap.create("chatview_exp_bg3");
        this.expbg = expBg;
        expGroup.addChild(expBg);
        expBg.height = flag ? 171 : 100;
        var freeExp = Config.ExpressionCfg.getFreeExpression();
        var dx = 5;
        for (var index = 0; index < freeExp.length; index++) {
            var item = freeExp[index];
            var itemBg = BaseBitmap.create("chatview_exp_item_bg");
            expGroup.addChild(itemBg);
            itemBg.x = expBg.x + 15 + (dx + itemBg.width) * index;
            if (flag) {
                itemBg.y = expBg.y + expBg.height - itemBg.height - 40;
            }
            else {
                itemBg.y = expBg.y + expBg.height - itemBg.height - 36;
            }
            var exp = BaseBitmap.create("chat_view_" + urls[index]);
            expGroup.addChild(exp);
            exp.x = itemBg.x;
            exp.y = itemBg.y;
            itemBg.addTouchTap(this.itemOnClick, this, [urls[index]]);
        }
        if (flag) {
            var buyExp = Config.ExpressionCfg.getBuyExpre();
            for (var index = 0; index < buyExp.length; index++) {
                var item = buyExp[index];
                var itemBg = BaseBitmap.create("chatview_exp_item_bg");
                expGroup.addChild(itemBg);
                itemBg.x = expBg.x + 15 + (dx + itemBg.width) * index;
                itemBg.y = expBg.y + expBg.height - itemBg.height * 2 - 45;
                var exp = BaseBitmap.create("chat_view_" + urls[index + 5]);
                expGroup.addChild(exp);
                exp.x = itemBg.x;
                exp.y = itemBg.y;
                itemBg.addTouchTap(this.itemOnClick, this, [urls[index + 5]]);
            }
        }
    };
    ChatView.prototype.setExpListXY = function (x, y) {
        if (!this.expList) {
            return;
        }
        this.expList.setPosition(x, GameConfig.stageHeigth - y - this.expList.height);
    };
    ChatView.prototype.setExpBg = function (url) {
        if (!url || !this.expbg) {
            return;
        }
        this.expbg.texture = ResMgr.getRes(url);
    };
    ChatView.prototype.itemOnClick = function (params, data) {
        NetManager.request(NetConst.BATTLE_OPT, { opt: 5, upId: data });
        if (this.itemCB) {
            this.itemCB();
        }
        this.parent.removeChild(this);
    };
    ChatView.prototype.dispose = function () {
        this.expList = null;
        this.expbg = null;
        this.itemCB = null;
        _super.prototype.dispose.call(this);
    };
    return ChatView;
}(BaseDisplayObjectContainer));
__reflect(ChatView.prototype, "ChatView");
//# sourceMappingURL=ChatView.js.map