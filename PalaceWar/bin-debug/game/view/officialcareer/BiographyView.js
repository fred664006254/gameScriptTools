/**
 * 仕途之路 列传本纪
 * author shaoliang
 * date 2020/2/6
 * @class BiographyView
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
var BiographyView = (function (_super) {
    __extends(BiographyView, _super);
    function BiographyView() {
        var _this = _super.call(this) || this;
        _this._curPageText = null;
        _this._prePageText = null;
        _this._nextPageText = null;
        _this._prePageArrow = null;
        _this._nextPageArrow = null;
        _this._curPageNum = 1;
        _this._maxPageNum = 1;
        _this._infoTab = []; //[{info:[],newType:1/2}]
        _this._pageLine = 3; //每夜显示几行
        _this._scrollList = null;
        return _this;
    }
    BiographyView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "biographyview", "biographyview_bg2", "arena_bottom", "biographyview_bg3", "biographyview_bg5",
            "biographyview_titlebg1", "biographyview_titlebg2", "acluckycarpviewcommonwordbg"
        ]);
    };
    BiographyView.prototype.getTitleStr = function () {
        return "biography_title";
    };
    BiographyView.prototype.initView = function () {
        //list 
        var listArray = Api.biographyVoApi.getList();
        listArray.sort(function (a, b) {
            var cfga = Config.BiographyCfg.getCfgBgId(a.id);
            var cfgb = Config.BiographyCfg.getCfgBgId(b.id);
            if (cfga.sortID > cfgb.sortID) {
                return 1;
            }
            else if (cfga.sortID == cfgb.sortID) {
                return b.ts - a.ts;
            }
            return -1;
        });
        var list1type1 = [];
        var list1type2 = [];
        //过期
        var list2type1 = [];
        var list2type2 = [];
        for (var i = 0; i < listArray.length; i++) {
            var cfg = Config.BiographyCfg.getCfgBgId(listArray[i].id);
            var endt = 0;
            if (cfg.lastTime) {
                endt = listArray[i].ts + cfg.lastTime * 86400;
            }
            //过期
            if (endt && GameData.serverTime > endt) {
                if (cfg.type == 1) {
                    list2type1.push(listArray[i]);
                }
                else {
                    list2type2.push(listArray[i]);
                }
            }
            else {
                if (cfg.type == 1) {
                    list1type1.push(listArray[i]);
                }
                else {
                    list1type2.push(listArray[i]);
                }
            }
        }
        //btype 2级title
        for (var i = 0; i < list1type2.length; i += 2) {
            var oneArray = [];
            oneArray.push(list1type2[i]);
            if (list1type2[i + 1]) {
                oneArray.push(list1type2[i + 1]);
            }
            var newtype = (i == 0) ? true : false;
            var bbtype = (i == 0) ? 2 : 0;
            this._infoTab.push({ info: oneArray, newType: newtype, type: 1, btype: bbtype });
        }
        for (var i = 0; i < list1type1.length; i += 2) {
            var oneArray = [];
            oneArray.push(list1type1[i]);
            if (list1type1[i + 1]) {
                oneArray.push(list1type1[i + 1]);
            }
            var newtype = (i == 0 && list1type2.length == 0) ? true : false;
            var bbtype = (i == 0) ? 1 : 0;
            this._infoTab.push({ info: oneArray, newType: newtype, type: 1, btype: bbtype });
        }
        //无内容
        if (list1type1.length + list1type2.length == 0) {
            this._infoTab.push({ info: null, newType: 1, type: 1, empty: true });
        }
        //过期
        for (var i = 0; i < list2type2.length; i += 2) {
            var oneArray = [];
            oneArray.push(list2type2[i]);
            if (list2type2[i + 1]) {
                oneArray.push(list2type2[i + 1]);
            }
            var newtype = (i == 0) ? true : false;
            var bbtype = (i == 0) ? 2 : 0;
            this._infoTab.push({ info: oneArray, newType: newtype, type: 2, btype: bbtype });
        }
        for (var i = 0; i < list2type1.length; i += 2) {
            var oneArray = [];
            oneArray.push(list2type1[i]);
            if (list2type1[i + 1]) {
                oneArray.push(list2type1[i + 1]);
            }
            var newtype = (i == 0 && list2type2.length == 0) ? true : false;
            var bbtype = (i == 0) ? 1 : 0;
            this._infoTab.push({ info: oneArray, newType: newtype, type: 2, btype: bbtype });
        }
        //无内容
        if (list2type1.length + list2type2.length == 0) {
            this._infoTab.push({ info: null, newType: 1, type: 2, empty: true });
        }
        this._maxPageNum = Math.ceil(this._infoTab.length / this._pageLine);
        var middlebg = BaseBitmap.create("public_9_bg23");
        middlebg.width = GameConfig.stageWidth - 10;
        middlebg.height = GameConfig.stageHeigth - 160;
        middlebg.y = -8;
        middlebg.x = 5;
        this.addChildToContainer(middlebg);
        var downBottom = BaseBitmap.create("arena_bottom");
        downBottom.y = GameConfig.stageHeigth - downBottom.height;
        downBottom.x = 0;
        this.addChild(downBottom);
        this._curPageText = ComponentManager.getTextField("1", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._curPageText.width = 200;
        this._curPageText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._curPageText, downBottom);
        this.addChild(this._curPageText);
        // this._prePageText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW); 
        // this._prePageText.textFlow = new Array<egret.ITextElement>(
        //     { text: LanguageManager.getlocal("acqapage1-1"), style: { "underline": true} }
        // );
        // this._prePageText.addTouchTap(this.doPreHandle,this,null);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter,this._prePageText,downBottom,[47,0]);
        // this.addChild(this._prePageText);
        // this._nextPageText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW); 
        // this._nextPageText.textFlow = new Array<egret.ITextElement>(
        //     { text: LanguageManager.getlocal("acqapage2-1"), style: { "underline": true} }
        // );
        // this._nextPageText.addTouchTap(this.doNextHandle,this,null);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter,this._nextPageText,downBottom,[-47,0]);
        // this.addChild(this._nextPageText);
        this._prePageArrow = ComponentManager.getButton("biography_arrow1", null, this.doPreHandle, this); //BaseBitmap.create("biography_arrow");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._prePageArrow, downBottom, [22, 0]);
        // this._prePageArrow.addTouchTap(this.doPreHandle,this,null);
        this.addChild(this._prePageArrow);
        this._prePageText = BaseBitmap.create("biography_prepage");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._prePageText, downBottom, [22 + this._prePageArrow.width, -3]);
        // this._prePageText.addTouchTap(this.doPreHandle,this,null);
        // this.addChild(this._prePageText);
        this._nextPageArrow = ComponentManager.getButton("biography_arrow2", null, this.doNextHandle, this);
        this._nextPageArrow.setPosition(downBottom.width - 22 - this._nextPageArrow.width, this._prePageArrow.y);
        // this._nextPageArrow.addTouchTap(this.doNextHandle,this,null);
        this.addChild(this._nextPageArrow);
        this._nextPageText = BaseBitmap.create("biography_nextpage");
        this._nextPageText.setPosition(this._nextPageArrow.x - this._nextPageArrow.width - this._nextPageText.width, this._prePageText.y);
        // this._nextPageText.addTouchTap(this.doNextHandle,this,null);
        // this.addChild(this._nextPageText);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 180);
        var scrollList = ComponentManager.getScrollList(BiographyScrollItem, [], rect);
        scrollList.setPosition(0, middlebg.y + 10);
        scrollList.bounces = false;
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this._scrollList = scrollList;
        this.addChildToContainer(scrollList);
        this.resetInfo();
    };
    BiographyView.prototype.resetInfo = function () {
        this._curPageText.text = LanguageManager.getlocal("acAlliance_progress", [String(this._curPageNum), String(this._maxPageNum)]);
        this._prePageArrow.visible = this._prePageText.visible = this._curPageNum > 1;
        this._nextPageArrow.visible = this._nextPageText.visible = this._curPageNum < this._maxPageNum;
        var startIdx = (this._curPageNum - 1) * this._pageLine;
        var endIdx = Math.min((startIdx + 3), this._infoTab.length);
        var tempArray = [];
        for (var i = startIdx; i < endIdx; i++) {
            tempArray.push(this._infoTab[i]);
        }
        this._scrollList.refreshData(tempArray);
        this._scrollList.setScrollTop(0);
        if (this._maxPageNum == 0) {
            this._curPageText.visible = false;
        }
    };
    BiographyView.prototype.doPreHandle = function () {
        if (this._curPageNum <= 1) {
            return;
        }
        this._curPageNum--;
        this.resetInfo();
    };
    BiographyView.prototype.doNextHandle = function () {
        if (this._curPageNum >= this._maxPageNum) {
            return;
        }
        this._curPageNum++;
        this.resetInfo();
    };
    BiographyView.prototype.dispose = function () {
        this._curPageText = null;
        this._prePageText = null;
        this._nextPageText = null;
        this._curPageNum = 1;
        this._maxPageNum = 1;
        this._infoTab.length = 0;
        this._scrollList = null;
        this._prePageArrow = null;
        this._nextPageArrow = null;
        _super.prototype.dispose.call(this);
    };
    return BiographyView;
}(CommonView));
__reflect(BiographyView.prototype, "BiographyView");
//# sourceMappingURL=BiographyView.js.map