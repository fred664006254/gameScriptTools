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
var AcConquerMainLandDetailViewTab2Tab2ScrollItem = (function (_super) {
    __extends(AcConquerMainLandDetailViewTab2Tab2ScrollItem, _super);
    function AcConquerMainLandDetailViewTab2Tab2ScrollItem() {
        var _this = _super.call(this) || this;
        _this._aidAndCode = null;
        return _this;
    }
    Object.defineProperty(AcConquerMainLandDetailViewTab2Tab2ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab2Tab2ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandDetailViewTab2Tab2ScrollItem.prototype.initItem = function (index, data, itemParam) {
        var key = data.key;
        var rItem = data;
        var id = rItem.id;
        var scroStartY = 10;
        this._aidAndCode = itemParam;
        var innerbg = BaseBitmap.create("public_9v_bg14");
        innerbg.width = 620;
        innerbg.height = 380;
        if (id == '1') {
            innerbg.height = 420;
        }
        innerbg.x = 0;
        innerbg.y = scroStartY - 10;
        this.addChild(innerbg);
        var innerKuang = BaseBitmap.create("public_9v_bg12");
        innerKuang.width = innerbg.width - 20;
        innerKuang.height = innerbg.height - 10;
        this.addChild(innerKuang);
        innerKuang.setPosition(10, 5);
        //第几名
        var officeBg = BaseBitmap.create("public_ts_bg01");
        officeBg.width = 250;
        officeBg.x = innerbg.width / 2 - officeBg.width / 2;
        officeBg.y = 15;
        var itemContainer = new BaseDisplayObjectContainer();
        //第几名
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
        var addH = 10;
        var scaleNum = 1;
        if (Number(id) == 1) {
            var winbg = BaseBitmap.create("accrossserverwipeboss_rankbg");
            winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
            winbg.y = innerbg.y + 25;
            this.addChild(winbg);
            var red1 = BaseBitmap.create("accrossserverwipeboss_rank1");
            red1.x = winbg.x - red1.width / 2;
            red1.y = winbg.y + winbg.height / 2 - red1.height / 2;
            this.addChild(red1);
            var server = LanguageManager.getlocal("acOneYearRank_name_noone");
            if (this.vo.getWinServer()) {
                server = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, this.vo.getWinServer());
            }
            var serverTxt = ComponentManager.getTextField(server, 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            serverTxt.x = winbg.x + winbg.width / 2 - serverTxt.width / 2;
            serverTxt.y = winbg.y + winbg.height / 2 - serverTxt.height / 2;
            this.addChild(serverTxt);
        }
        else {
            this.addChild(officeBg);
            this.addChild(txt);
        }
        var rIcons = rItem.rewardIcons;
        scroStartY += 40;
        var stX = 0;
        var stY = 0;
        var lineNum = 5;
        scaleNum = 1;
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
        var rectHeight = 280;
        var rectX = 30;
        var rectY = 60;
        if (id == '1') {
            rectY = 100;
        }
        this.addChild(itemContainer);
        itemContainer.setPosition(rectX, rectY);
        innerbg.height = itemContainer.y + itemContainer.height + 40;
        innerKuang.height = innerbg.height - 10;
        this.height = innerbg.height + 10;
    };
    AcConquerMainLandDetailViewTab2Tab2ScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcConquerMainLandDetailViewTab2Tab2ScrollItem.prototype.getSpaceY = function () {
        return 15;
    };
    AcConquerMainLandDetailViewTab2Tab2ScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandDetailViewTab2Tab2ScrollItem;
}(ScrollListItem));
__reflect(AcConquerMainLandDetailViewTab2Tab2ScrollItem.prototype, "AcConquerMainLandDetailViewTab2Tab2ScrollItem");
