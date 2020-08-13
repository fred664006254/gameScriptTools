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
 * 请安列表item
 * date 2019.12.10
 * author ycg
 * @class EmperorAchieveViewScrollItem
 */
var EmperorOutWishScrollItem = (function (_super) {
    __extends(EmperorOutWishScrollItem, _super);
    function EmperorOutWishScrollItem() {
        return _super.call(this) || this;
    }
    EmperorOutWishScrollItem.prototype.initItem = function (index, data, param) {
        var _this = this;
        this.width = 532;
        this.height = 70;
        var uid = param.uid;
        App.LogUtil.log("init issame:" + data.isSame);
        if (data.isSame == 1) {
            var allianceFlag = BaseBitmap.create("emperorout_allianceflag");
            allianceFlag.setPosition(10, this.height / 2 - allianceFlag.height / 2);
            this.addChild(allianceFlag);
        }
        var name = ComponentManager.getTextField(data.data.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        name.setPosition(60, this.height / 2 - name.height / 2);
        this.addChild(name);
        var level = ComponentManager.getTextField(LanguageManager.getlocal("officialTitle" + data.data.level), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        level.anchorOffsetX = level.width / 2;
        level.setPosition(this.width / 2 - 20, this.height / 2 - level.height / 2);
        this.addChild(level);
        var wishNum = ComponentManager.getTextField("" + data.data.value, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        wishNum.anchorOffsetX = wishNum.width / 2;
        wishNum.setPosition(this.width / 2 + 110, this.height / 2 - wishNum.height / 2);
        this.addChild(wishNum);
        var bonusData = Api.emperorAchieveVoApi.getBonusData();
        var num = Config.EmperoroutingCfg.bonusTimes;
        if (bonusData) {
            var rNum = Object.keys(bonusData).length;
            num = num - rNum;
        }
        var outData = Api.emperorAchieveVoApi.getOutDataByuid(uid);
        var rewardBtn = ComponentManager.getButton("emperorout_rewardbtn", "emperorOutWishListRewardBtnName", function () {
            if (!outData || !Api.emperorAchieveVoApi.isInOuting(outData.st)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("emperorOutListEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "emperorOutListConfirmTitle",
                msg: LanguageManager.getlocal("emperorOutListRewardTip", [data.data.name]),
                callback: function () {
                    NetManager.request(NetRequestConst.REQUEST_EMPERORACHIEVE_BONUS, { fuid: data.data.uid });
                },
                handler: _this,
                needCancel: true,
            });
        }, this);
        rewardBtn.setPosition(this.width - rewardBtn.width - 20, this.height / 2 - rewardBtn.height / 2);
        this.addChild(rewardBtn);
        rewardBtn.setColor(TextFieldConst.COLOR_BROWN);
        rewardBtn.visible = true;
        rewardBtn.setEnable(true);
        var receiveFlag = BaseBitmap.create("emperorout_rewardflag");
        receiveFlag.setScale(0.7);
        receiveFlag.setPosition(this.width - receiveFlag.width * receiveFlag.scaleX - 10, this.height / 2 - receiveFlag.height * receiveFlag.scaleY / 2);
        this.addChild(receiveFlag);
        receiveFlag.visible = false;
        if (bonusData && bonusData[data.data.uid]) {
            rewardBtn.visible = false;
            receiveFlag.visible = true;
        }
        if (!outData || !Api.emperorAchieveVoApi.isInOuting(outData.st) || num <= 0) {
            // rewardBtn.setEnable(false); 
            rewardBtn.visible = false;
        }
        var lineImg = BaseBitmap.create("public_line1");
        lineImg.width = this.width + 20;
        lineImg.x = this.width / 2 - lineImg.width / 2;
        lineImg.y = this.height - lineImg.height;
        this.addChild(lineImg);
    };
    EmperorOutWishScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return EmperorOutWishScrollItem;
}(ScrollListItem));
__reflect(EmperorOutWishScrollItem.prototype, "EmperorOutWishScrollItem");
//# sourceMappingURL=EmperorOutWishScrollItem.js.map