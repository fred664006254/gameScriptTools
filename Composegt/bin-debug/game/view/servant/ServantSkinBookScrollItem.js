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
 * 门客皮肤头像
 * author yanyuling
 * date 2018/3/5
 * @class ServantSkinScrollItem
 */
var ServantSkinBookScrollItem = (function (_super) {
    __extends(ServantSkinBookScrollItem, _super);
    function ServantSkinBookScrollItem() {
        var _this = _super.call(this) || this;
        _this._skincfg = undefined;
        _this._skinId = undefined;
        return _this;
    }
    ServantSkinBookScrollItem.prototype.init = function (skinId, index, serId) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY), this.collectHandlerCallBack, this);
        this._skinId = "" + skinId;
        this._servantId = serId;
        var serSkincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var addAbility = serSkincfg.addAbility;
        this._bookId = addAbility[index];
        var blv = Api.servantVoApi.getSerSkinBookId(this._skinId, this._bookId);
        var bookcfg = GameConfig.config.abilityCfg[this._bookId];
        var bookprobg = BaseBitmap.create("public_9v_bg09");
        bookprobg.width = 582;
        bookprobg.height = 110;
        // bookprobg.x = this.viewBg.x + this.viewBg.width/2 - bookprobg.width/2;
        bookprobg.y = 0;
        bookprobg.visible = false;
        this.addChild(bookprobg);
        var leftBg = BaseBitmap.create("public_left");
        leftBg.width = 109;
        leftBg.height = bookprobg.height - 12;
        leftBg.x = 5.5;
        leftBg.y = 5.5;
        leftBg.visible = false;
        this.addChild(leftBg);
        // let bookprobg = BaseBitmap.create("public_9_managebg");
        // bookprobg.width = 552;
        // bookprobg.height = 74;
        // this.addChild(bookprobg);
        // bookprobg.addTouchTap(this.bookTouchHandler , this,[this._bookId]);
        var bicon = BaseLoadBitmap.create("servant_infoPro" + bookcfg.type);
        bicon.width = 80;
        bicon.height = 90;
        bicon.x = bookprobg.x + 40;
        bicon.y = bookprobg.y + bookprobg.height / 2 - bicon.height / 2;
        this.addChild(bicon);
        var starsp = this.getServantBookStars(bookcfg.num);
        starsp.x = leftBg.x + leftBg.width + 35;
        starsp.y = bicon.y + 60;
        this.addChild(starsp);
        var bnameTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN_NEW);
        bnameTxt.text = LanguageManager.getlocal("servant_attrNameTxt" + this._bookId) + "Lv" + blv;
        bnameTxt.x = leftBg.x + leftBg.width + 35;
        bnameTxt.y = bookprobg.y + 5;
        bnameTxt.name = "bnameTxt";
        this.addChild(bnameTxt);
        var bnameTypeTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN_NEW);
        bnameTypeTxt.text = LanguageManager.getlocal("servantInfo_attrTxt" + bookcfg.type) + " " + (bookcfg.num * blv);
        bnameTypeTxt.x = bnameTxt.x;
        bnameTypeTxt.y = bnameTxt.y + 35;
        this.addChild(bnameTypeTxt);
    };
    ServantSkinBookScrollItem.prototype.bookTouchHandler = function (obj, param) {
        var bid = param;
        var uidata = {
            aid: bid,
            bookId: bid,
            servantId: this._servantId,
            index: 0,
            skinId: this._skinId,
            isSkin: true,
        };
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTBOOKLEVELUPPOPUPVIEW, uidata);
    };
    ServantSkinBookScrollItem.prototype.getServantBookStars = function (num) {
        var objContainer = new BaseDisplayObjectContainer;
        for (var index = 1; index <= num; index++) {
            var starImg = BaseBitmap.create("servant_star");
            // starImg.setScale(0.5);
            starImg.x = (index - 1) * starImg.width * starImg.scaleX;
            starImg.y = 0;
            objContainer.addChild(starImg);
        }
        return objContainer;
    };
    ServantSkinBookScrollItem.prototype.collectHandlerCallBack = function (event) {
        var rdata = event.data.data;
        if (rdata.ret != 0) {
            return;
        }
        var newBlv = Api.servantVoApi.getSerSkinBookId(this._skinId, this._bookId);
        var bnameTxt = this.getChildByName("bnameTxt");
        bnameTxt.text = LanguageManager.getlocal("servant_attrNameTxt" + this._bookId) + "Lv" + newBlv;
    };
    ServantSkinBookScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY), this.collectHandlerCallBack, this);
        this._skincfg = null;
        this._skinId = null;
        this._servantId = null;
        this._bookId = null;
        _super.prototype.dispose.call(this);
    };
    return ServantSkinBookScrollItem;
}(BaseDisplayObjectContainer));
__reflect(ServantSkinBookScrollItem.prototype, "ServantSkinBookScrollItem");
