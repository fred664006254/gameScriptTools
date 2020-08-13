/** 风华群芳   奖励列表
 * anthor
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcGroupWifeBattleRewardScrollItem = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleRewardScrollItem, _super);
    function AcGroupWifeBattleRewardScrollItem() {
        var _this = _super.call(this) || this;
        // 标题文本
        _this.titleText = null;
        //标题背景
        _this.titleBg = null;
        //内容背景
        _this.descBg = null;
        //内容图片
        _this.descImg = null;
        //内容购买按钮
        _this.descBtn = null;
        //内容时间文本
        _this.descTimeText = null;
        //数据
        _this._data = null;
        _this._itemIndex = null;
        _this._code = null;
        return _this;
    }
    AcGroupWifeBattleRewardScrollItem.prototype.initItem = function (index, data, typedata) {
        this._code = typedata.code;
        var nameStr = "battlerankbg";
        var bg = BaseBitmap.create(nameStr);
        bg.width = 626;
        bg.y = 0;
        bg.x = 10;
        this.addChild(bg);
        var fontTitleBg = BaseLoadBitmap.create("battletitle");
        fontTitleBg.width = 309;
        fontTitleBg.height = 32;
        fontTitleBg.setPosition(bg.width / 2 - fontTitleBg.width / 2, bg.y + 5);
        this.addChild(fontTitleBg);
        var rankNum = 0;
        var rank1 = 0;
        var rank2 = 0;
        if (typedata.type == 2) {
            rank1 = data.alnRank[0];
            rank2 = data.alnRank[1];
        }
        else {
            rank1 = data.idvRank[0];
            rank2 = data.idvRank[1];
        }
        var txtDesc2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        if (rank1 == rank2) {
            if (rank1 <= 3) {
                txtDesc2.text = LanguageManager.getlocal("acRank_rank" + rank1, [rank1 + ""]);
                txtDesc2.bold = true;
            }
            else {
                txtDesc2.text = LanguageManager.getlocal("acRank_rank6", [rank1 + ""]);
                txtDesc2.bold = false;
            }
        }
        else {
            txtDesc2.text = LanguageManager.getlocal("acRank_rank5", [rank1 + "", +rank2 + ""]);
        }
        txtDesc2.setPosition(fontTitleBg.x, fontTitleBg.y + fontTitleBg.height + 6 - 33);
        this.addChild(txtDesc2);
        fontTitleBg.width = 359 + txtDesc2.width + 10;
        fontTitleBg.x = (bg.width - fontTitleBg.width) / 2;
        txtDesc2.x = fontTitleBg.x + fontTitleBg.width / 2 - txtDesc2.width / 2;
        var moveY = 50;
        var rewardStr = data.getReward;
        var rewardStr2 = null;
        var posXtype2 = 0;
        //帮会奖励
        if (typedata.type == 2) {
            var rankbg = BaseBitmap.create("battle-rankb");
            rankbg.setPosition(bg.x, fontTitleBg.y + fontTitleBg.height + 2);
            this.addChild(rankbg);
            var memberGetTxt = ComponentManager.getTextField("", 20, 0xfff7e8);
            memberGetTxt.y = rankbg.y + 5; //-10;
            memberGetTxt.text = LanguageManager.getlocal("acRank_alliance_masterget1");
            memberGetTxt.x = bg.x + bg.width / 2 - memberGetTxt.width / 2 - 10;
            this.addChild(memberGetTxt);
            moveY = memberGetTxt.y + 35;
            rewardStr = data.lordReward; //帮主奖励 ;
            rewardStr2 = data.memberReward; //帮主奖励 ; 
        }
        var rewardVoList = GameData.formatRewardItem(rewardStr);
        var scaleValue = 0.85;
        var offestHeight = 0;
        var startWidth = 11.5;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            var rewardDBWidth = rewardDB.width;
            var posX = 5 + bg.x + startWidth + (((i) % 5) * (rewardDBWidth + startWidth + 4));
            var posY = moveY + (Math.floor((i) / 5) * (rewardDB.height + 9)); //* scaleValue + 5));
            rewardDB.setPosition(posX, posY + 10);
            this.addChild(rewardDB);
            offestHeight = rewardDB.height;
        }
        var num = 1;
        if (rewardVoList.length % 5 == 0) {
            num = 0;
        }
        bg.height += 106 * (Math.floor(rewardVoList.length / 5) + num) + 20; //- 25;
        // //帮会成员
        if (typedata.type == 2) {
            var rankbg2 = BaseBitmap.create("battle-rankb");
            rankbg2.setPosition(bg.x, bg.y + bg.height - 15);
            this.addChild(rankbg2);
            var memberGetTxt = ComponentManager.getTextField("", 20, 0xfff7e8);
            memberGetTxt.y = rankbg2.y + 4; // 44; 
            memberGetTxt.text = LanguageManager.getlocal("acRank_alliance_memberget");
            memberGetTxt.x = bg.x + bg.width / 2 - memberGetTxt.width / 2 - 10;
            this.addChild(memberGetTxt);
            var rewardVoList2 = GameData.formatRewardItem(rewardStr2);
            var scaleValue_1 = 0.85;
            var offestHeight_1 = 0;
            var startWidth_1 = 11.5;
            for (var i = 0; i < rewardVoList2.length; i++) {
                var rewardDB2 = GameData.getItemIcon(rewardVoList2[i], true, true);
                var rewardDBWidth = rewardDB2.width;
                var posX = 5 + bg.x + startWidth_1 + (((i) % 5) * (rewardDBWidth + startWidth_1));
                var posY = bg.y + bg.height + 20 + (Math.floor((i) / 5) * (rewardDB2.height + 1)); //* scaleValue + 5));
                rewardDB2.setPosition(posX, posY + 10);
                this.addChild(rewardDB2);
                offestHeight_1 = rewardDB2.height;
            }
            var num = 1;
            if (rewardVoList2.length % 5 == 0) {
                num = 0;
            }
            bg.height += 106 * (Math.floor(rewardVoList2.length / 5) + num) + 50;
        }
        this.height = bg.height + 2;
    };
    Object.defineProperty(AcGroupWifeBattleRewardScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_GROUPWIFEBATTLE, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleRewardScrollItem.prototype.getSpaceY = function () {
        return -150;
    };
    AcGroupWifeBattleRewardScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcGroupWifeBattleRewardScrollItem.prototype.dispose = function () {
        this.titleText = null;
        //标题背景
        this.titleBg = null;
        //内容背景
        this.descBg = null;
        //内容图片
        this.descImg = null;
        //内容购买按钮
        this.descBtn = null;
        //内容时间文本
        this.descTimeText = null;
        //数据
        this._data = null;
        this._itemIndex = null;
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleRewardScrollItem;
}(ScrollListItem));
//# sourceMappingURL=AcGroupWifeBattleRewardScrollItem.js.map