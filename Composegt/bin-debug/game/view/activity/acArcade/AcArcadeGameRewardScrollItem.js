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
  * 拉霸机奖池item
  * author 张朝阳
  * date 2019/6/12
  * @class AcArcadeGameRewardScrollItem
  */
var AcArcadeGameRewardScrollItem = (function (_super) {
    __extends(AcArcadeGameRewardScrollItem, _super);
    function AcArcadeGameRewardScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        return _this;
    }
    AcArcadeGameRewardScrollItem.prototype.getCnCode = function () {
        var code = this._aidAndCode.code;
        if (code == "2" || code == "3") {
            code = "1";
        }
        return code;
    };
    /**
     * 初始化itemview
     */
    AcArcadeGameRewardScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aidAndCode = itemParam;
        var bg = BaseBitmap.create("activity_db_01");
        bg.width = 520;
        this.addChild(bg);
        var titleBg = BaseBitmap.create("public_up3"); //arcadegame_topbg_2
        titleBg.width = 510;
        titleBg.height = 33;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 6);
        this.addChild(titleBg);
        var tilteTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameRewardScrollItemTitle" + this._itemData.id + "-" + this.getCnCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        if (index == 0) {
            var titleBg2 = BaseBitmap.create("arcadegame_topbg_2"); //
            titleBg2.width = titleBg.width;
            titleBg2.height = titleBg.height;
            titleBg2.setPosition(bg.x + bg.width / 2 - titleBg2.width / 2, bg.y + 4);
            this.addChild(titleBg2);
            tilteTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        }
        tilteTF.setPosition(titleBg.x + titleBg.width / 2 - tilteTF.width / 2, titleBg.y + titleBg.height / 2 - tilteTF.height / 2);
        this.addChild(tilteTF);
        var tilteTF2 = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameReward_display_txt"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        tilteTF2.setPosition(titleBg.x + 20, titleBg.y + titleBg.height + 8);
        this.addChild(tilteTF2);
        var offsetH = 0;
        var rewardScale = 0.8;
        var itemScale = 0.8;
        var itemHeight = 0;
        var num = 4;
        if (index == 0) {
            var public_listshotbg = BaseBitmap.create("public_listshotbg"); //
            public_listshotbg.setPosition(tilteTF2.x - 10, tilteTF2.y + 25);
            public_listshotbg.width = 490;
            this.addChild(public_listshotbg);
            var prizePool = this._itemData.prizePool;
            offsetH = tilteTF2.y + 30;
            for (var index = 0; index < prizePool.length; index++) {
                var bg2 = BaseBitmap.create("acarcadeview_logdown-1"); //
                bg2.setPosition(tilteTF2.x, offsetH);
                rewardScale = 0.6;
                bg2.setScale(rewardScale);
                this.addChild(bg2);
                var arrowsp = BaseBitmap.create("acarcadeview_arrow"); //
                arrowsp.setPosition(bg2.x + bg2.width * rewardScale + 10, bg2.y + bg2.height * rewardScale / 2 - arrowsp.height / 2);
                this.addChild(arrowsp);
                var rewards = prizePool[index][0];
                var rewardVo = GameData.formatRewardItem(rewards)[0];
                for (var i = 0; i < 4; i++) {
                    var rewardDB = GameData.getItemIcon(rewardVo, true, true);
                    itemScale = 0.55;
                    rewardDB.setScale(itemScale);
                    rewardDB.setPosition(bg2.x + (rewardDB.width * itemScale + 24) * i + 17, bg2.y + bg2.height / 2 * rewardScale - rewardDB.height * itemScale / 2);
                    this.addChild(rewardDB);
                    itemHeight = rewardDB.height * rewardScale + 15;
                    if (i == 3) {
                        rewardDB.setScale(0.8);
                        rewardDB.x = bg.x + bg.width - rewardDB.width * 0.8 - 25;
                        rewardDB.y = bg2.y + bg2.height / 2 * rewardScale - rewardDB.height * 0.8 / 2;
                    }
                }
                offsetH = bg2.y + bg2.height * rewardScale + 10;
            }
            public_listshotbg.height = offsetH + 5 - public_listshotbg.y;
            this.height = titleBg.height + offsetH;
        }
        else {
            var rewards = this._itemData.rewardPoolList();
            var rewardVoList = GameData.formatRewardItem(rewards);
            offsetH = tilteTF2.y + 30;
            var num_1 = 5;
            for (var i = 0; i < rewardVoList.length; i++) {
                var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
                rewardDB.setScale(itemScale);
                rewardDB.setPosition(titleBg.x + (i % num_1) * (rewardDB.width * itemScale + 11) + 25, titleBg.y + titleBg.height + Math.floor(i / num_1) * (rewardDB.height * itemScale + 20) + 40);
                this.addChild(rewardDB);
                itemHeight = rewardDB.height * itemScale + 15;
            }
            offsetH = (Math.floor(rewardVoList.length / num_1) + 1) * itemHeight + 30;
            this.height = titleBg.height + offsetH + 40;
        }
        bg.height = this.height;
    };
    AcArcadeGameRewardScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcArcadeGameRewardScrollItem.prototype.dispose = function () {
        this._itemData = null;
        _super.prototype.dispose.call(this);
    };
    return AcArcadeGameRewardScrollItem;
}(ScrollListItem));
__reflect(AcArcadeGameRewardScrollItem.prototype, "AcArcadeGameRewardScrollItem");
