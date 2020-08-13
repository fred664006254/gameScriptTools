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
var AcJadeViewTotalScrollItem = (function (_super) {
    __extends(AcJadeViewTotalScrollItem, _super);
    function AcJadeViewTotalScrollItem() {
        var _this = _super.call(this) || this;
        /**
         * 充值进度条
         */
        _this._progress = null;
        _this._rechargeBtn = null;
        _this._vo = null;
        return _this;
    }
    AcJadeViewTotalScrollItem.prototype.initItem = function (index, data, param) {
        this._vo = Api.acVoApi.getActivityVoByAidAndCode(param.aid, param.code);
        var key = data.key;
        var innerbg = BaseBitmap.create("rechargevie_db_01");
        innerbg.width = 612;
        innerbg.x = 0;
        innerbg.y = 0;
        this.addChild(innerbg);
        var line1 = null;
        var txt = null;
        var descColor = TextFieldConst.COLOR_BROWN;
        if (data.rankV1 <= this._vo.getRechargeValue() && (data.rankV2 >= this._vo.getRechargeValue() || data.rankV2 == -1)) {
            descColor = 0xde7b46;
            line1 = BaseBitmap.create("acjadeview_red");
            txt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        }
        else {
            line1 = BaseBitmap.create("public_ts_bg01");
            txt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
        }
        line1.width = 260;
        line1.x = this.width / 2 - line1.width / 2;
        line1.y = 30 - line1.height / 2;
        //第几名
        txt.text = LanguageManager.getlocal("acJadeView_totalrank" + (index + 1));
        txt.width = 230;
        txt.x = this.width / 2 - txt.width / 2;
        txt.textAlign = "center";
        txt.y = 30 - txt.height / 2;
        this.addChild(line1);
        this.addChild(txt);
        this.height = innerbg.y + innerbg.height + 10;
        //描述1
        var desc1 = ComponentManager.getTextField("", 18, descColor);
        desc1.text = LanguageManager.getlocal("acJadeView_totaldesc1", [data.rankV1]);
        // desc.width =230;
        desc1.x = this.width / 2 - txt.width / 2;
        desc1.textAlign = "center";
        desc1.y = 67 - txt.height / 2;
        this.addChild(desc1);
        var reward = data.reward;
        var rewardArr = GameData.formatRewardItem(reward);
        var itemicon = null;
        var baseWidth = 106;
        var baseHeight = 106;
        var spaceX = 10;
        var spaceY = 10;
        var startX = this.width / 2 - (baseWidth * 5 + spaceX * 4) / 2;
        var startY = 55 + 25;
        var lastY = 0;
        for (var i = 0; i < rewardArr.length; i++) {
            itemicon = GameData.getItemIcon(rewardArr[i], true, false);
            itemicon.x = startX + (i % 5) * (baseWidth + spaceX);
            itemicon.y = startY + Math.floor(i / 5) * (baseHeight + spaceY);
            this.addChild(itemicon);
            if (i == rewardArr.length - 1) {
                lastY = itemicon.y;
            }
        }
        // innerbg.height = lastY + baseHeight + 25;
        this._progress = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 400);
        this._progress.setPosition(20, lastY + baseHeight + 10);
        this._progress.setText(this._vo.getRechargeValue() + "/" + data.rankV1 + LanguageManager.getlocal("acJadeTotalListGem"));
        this._progress.setPercentage(this._vo.getRechargeValue() / data.rankV1);
        this.addChild(this._progress);
        this._rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acCarnivalToChargeBtnText", this.rechargeHandler, this);
        this._rechargeBtn.setPosition(this._progress.x + this._progress.width + 45, this._progress.y - 5);
        this.addChild(this._rechargeBtn);
        //描述2
        var desc2 = ComponentManager.getTextField("", 18, descColor);
        if (data.rankV1 - this._vo.getRechargeValue() <= 0) {
            desc2.text = LanguageManager.getlocal("acJadeView_totaldesc3");
        }
        else {
            desc2.text = LanguageManager.getlocal("acJadeView_totaldesc2", [(data.rankV1 - this._vo.getRechargeValue()).toString()]);
        }
        desc2.textAlign = "center";
        desc2.x = this._progress.x + this._progress.width / 2 - desc2.width / 2;
        desc2.y = this._progress.y + this._progress.height + 5;
        this.addChild(desc2);
        innerbg.height = this._progress.y + this._progress.height + 45;
        this.height = innerbg.height;
    };
    /**
     * 打开充值界面
     */
    AcJadeViewTotalScrollItem.prototype.rechargeHandler = function (event) {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcJadeViewTotalScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcJadeViewTotalScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcJadeViewTotalScrollItem.prototype.dispose = function () {
        this._progress = null;
        this._rechargeBtn = null;
        this._vo = null;
        _super.prototype.dispose.call(this);
    };
    return AcJadeViewTotalScrollItem;
}(ScrollListItem));
__reflect(AcJadeViewTotalScrollItem.prototype, "AcJadeViewTotalScrollItem");
