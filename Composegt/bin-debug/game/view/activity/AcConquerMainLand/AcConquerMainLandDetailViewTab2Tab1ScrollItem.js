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
 * 冲榜列表节点
 * author yanyuling
 * date 2017/11/06
 * @class AcArrowRankListScrollItem
 */
var AcConquerMainLandDetailViewTab2Tab1ScrollItem = (function (_super) {
    __extends(AcConquerMainLandDetailViewTab2Tab1ScrollItem, _super);
    function AcConquerMainLandDetailViewTab2Tab1ScrollItem() {
        var _this = _super.call(this) || this;
        _this._aidAndCode = null;
        return _this;
    }
    Object.defineProperty(AcConquerMainLandDetailViewTab2Tab1ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab2Tab1ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandDetailViewTab2Tab1ScrollItem.prototype.initItem = function (index, data, itemParam) {
        var key = data.key;
        var rItem = data;
        var id = rItem.id;
        var scroStartY = 10;
        this._aidAndCode = itemParam;
        var innerbg = BaseBitmap.create("public_9v_bg14");
        innerbg.width = 620;
        innerbg.height = 420;
        innerbg.x = 0;
        innerbg.y = scroStartY - 10;
        this.addChild(innerbg);
        var innerKuang = BaseBitmap.create("public_9v_bg12");
        innerKuang.width = innerbg.width - 20;
        innerKuang.height = innerbg.height - 10;
        this.addChild(innerKuang);
        innerKuang.setPosition(10, 5);
        var itemContainer = new BaseDisplayObjectContainer();
        //第几名
        var officeBg = BaseBitmap.create("public_ts_bg01");
        officeBg.width = 250;
        officeBg.x = innerbg.width / 2 - officeBg.width / 2;
        officeBg.y = 15;
        var txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
        if (Number(id) < 4) {
            txt.text = LanguageManager.getlocal("acRank_rank" + id);
        }
        else {
            txt.text = LanguageManager.getlocal("acRank_rank4", [String(rItem.minRank), String(rItem.maxRank)]);
        }
        txt.width = 230;
        txt.x = innerbg.width / 2 - txt.width / 2;
        txt.textAlign = "center";
        txt.y = scroStartY + 20 - txt.height / 2;
        var firstTop = BaseBitmap.create("acarrowfirsttop");
        firstTop.x = innerbg.width / 2 - firstTop.width / 2;
        firstTop.y = -3;
        var addH = 10;
        var tmpX = 23;
        var scaleNum = 1;
        if (Number(id) == 1) {
            scroStartY += 75;
            this.addChild(firstTop);
            scaleNum = 0.8;
            tmpX = 250;
            var maskbg = BaseBitmap.create("public_9v_bg01");
            maskbg.x = 5;
            maskbg.y = 30;
            maskbg.width = 230;
            maskbg.height = 680;
            maskbg.name = "maskbg";
            this.addChild(maskbg);
            var userPic = 1;
            var nameString = LanguageManager.getlocal("acOneYearRank_name_noone");
            // console.log(type(rankFirstInfo));
            var rankFirstInfo = this.vo.getPrankList()[0];
            if (rankFirstInfo != null) {
                if (rankFirstInfo.pic) {
                    userPic = rankFirstInfo.pic;
                }
                if (rankFirstInfo.name) {
                    nameString = LanguageManager.getlocal("acwipeBossPlayerName", [rankFirstInfo.name]);
                }
            }
            var roleNode = Api.playerVoApi.getPlayerPortrait(this.cfg.mainReward, userPic);
            roleNode.y = 30;
            roleNode.x = 0;
            roleNode.setScale(0.8);
            this.addChild(roleNode);
            roleNode.mask = maskbg;
            var nameStr = ComponentManager.getTextField(nameString, 20, TextFieldConst.COLOR_BROWN);
            nameStr.x = tmpX;
            nameStr.y = 85;
            this.addChild(nameStr);
            if (rankFirstInfo && rankFirstInfo.name) {
                var scoreStr = ComponentManager.getTextField((LanguageManager.getlocal('acConquerMainLandScore-1') + ': ' + App.StringUtil.changeIntToText(rankFirstInfo.score)), 20, TextFieldConst.COLOR_BROWN);
                scoreStr.x = tmpX;
                scoreStr.y = nameStr.y + nameStr.height + 10;
                this.addChild(scoreStr);
            }
        }
        else {
            this.addChild(officeBg);
            this.addChild(txt);
        }
        var rIcons = rItem.rewardIcons;
        scroStartY += 40;
        var widLendth = 600;
        var stX = 0;
        var stY = 0;
        var lineNum = 5;
        if (id == '1') {
            lineNum = 4;
        }
        for (var idx = 0; idx < rIcons.length; idx++) {
            var element = rIcons[idx];
            element.setScale(scaleNum);
            element.x = stX;
            element.y = stY;
            stX += (element.width * element.scaleX + 8);
            //换行处理
            if (idx >= lineNum && idx % lineNum == 0) {
                stX = 0;
                addH += element.height + 5;
                if (Number(id) == 1) {
                    addH = addH - 5;
                }
                stY += element.height * element.scaleY + 15;
                element.x = stX;
                element.y = stY;
                stX += (element.width * element.scaleX + 8);
            }
            itemContainer.addChild(element);
        }
        var rectWidth = 600;
        var rectHeight = 320;
        var rectX = 30;
        var rectY = 60;
        if (id == '1') {
            rectWidth = 400;
            rectHeight = 250;
            rectX = 240;
            rectY = 150;
        }
        this.addChild(itemContainer);
        itemContainer.setPosition(rectX, rectY);
        innerbg.height = itemContainer.y + itemContainer.height + 40;
        innerKuang.height = innerbg.height - 10;
        this.height = innerbg.height + 10;
    };
    AcConquerMainLandDetailViewTab2Tab1ScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcConquerMainLandDetailViewTab2Tab1ScrollItem.prototype.getSpaceY = function () {
        return 15;
    };
    AcConquerMainLandDetailViewTab2Tab1ScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandDetailViewTab2Tab1ScrollItem;
}(ScrollListItem));
__reflect(AcConquerMainLandDetailViewTab2Tab1ScrollItem.prototype, "AcConquerMainLandDetailViewTab2Tab1ScrollItem");
