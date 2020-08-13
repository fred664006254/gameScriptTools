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
 * 称帝战奖励item
 * author qianjun
 * @class EmperorWarRewardScrollItem
 */
var EmperorWarRewardScrollItem = (function (_super) {
    __extends(EmperorWarRewardScrollItem, _super);
    function EmperorWarRewardScrollItem() {
        return _super.call(this) || this;
    }
    EmperorWarRewardScrollItem.prototype.initItem = function (index, data) {
        var view = this;
        view.width = GameConfig.stageWidth - 42;
        var rIcons = data.rewardIcons;
        var length = rIcons.length;
        //type 1夺帝 2助威
        var title = null;
        var top = 0;
        var scroStartY = 56;
        var bgheight = (data.type == 1 ? 45 : 15) + Math.ceil(length / 5) * rIcons[0].height + (Math.ceil(length / 5) - 1) * 15 + 20;
        var titlebg = BaseBitmap.create("crossservantawardbbg");
        titlebg.width = 600;
        titlebg.height = 39;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, view);
        view.addChild(titlebg);
        var line1 = BaseBitmap.create("public_line3");
        line1.width = 480;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line1, view);
        view.addChild(line1);
        if (PlatformManager.checkIsTextHorizontal()) {
            line1.visible = false;
        }
        title = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (data.type == 1) {
            if (index == 0 && data.type == 1) {
                var titleImg = BaseLoadBitmap.create("user_title_3201_3");
                titleImg.setScale(0.95);
                titleImg.width = 155 * titleImg.scaleX;
                titleImg.height = 59 * titleImg.scaleY;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleImg, titlebg, [0, -3]);
                view.addChild(titleImg);
            }
            else {
                if (index < 2) {
                    title.text = LanguageManager.getlocal("acRank_rank" + (index + 1));
                }
                else {
                    title.text = LanguageManager.getlocal("acRank_rank4", [String(data.minRank), String(data.maxRank)]);
                }
            }
        }
        else {
            title.text = data.winNum == 3 ? LanguageManager.getlocal("emperorWarCheerWinEmp") : LanguageManager.getlocal("emperorWarCheerWin", [data.winNum.toString()]);
        }
        top = title.y + title.textHeight + 18;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, title, line1);
        view.addChild(title);
        //}
        // let bg = BaseBitmap.create("public_9_bg32");
        // bg.width = GameConfig.stageWidth - 42;
        // bg.height = bgheight;
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view, [0,top]);
        // view.addChild(bg);
        // if(data.type == 1){
        //     let returnTxt = ComponentManager.getTextField(LanguageManager.getlocal(`emperorWarReturnRWB`, [(data.return * 100).toString()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        //     view.setLayoutPosition(LayoutConst.horizontalCentertop, returnTxt, bg, [0,15]);
        //     view.addChild(returnTxt);
        // }
        //奖励物品
        var tmpX = (view.width - 5 * rIcons[0].width - 4 * 8) / 2;
        var maxY = 0;
        for (var index = 0; index < rIcons.length; index++) {
            var element = rIcons[index];
            element.x = tmpX;
            element.y = scroStartY;
            tmpX += (element.width + 8);
            //换行处理
            if (tmpX >= view.width) {
                tmpX = (view.width - 5 * rIcons[0].width - 4 * 8) / 2;
                ;
                scroStartY += element.height + 15;
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width + 8);
            }
            maxY = element.y;
            view.addChild(element);
        }
        view.height = maxY + 106 + 15;
    };
    EmperorWarRewardScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    EmperorWarRewardScrollItem.prototype.getSpaceY = function () {
        return 15;
    };
    EmperorWarRewardScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return EmperorWarRewardScrollItem;
}(ScrollListItem));
__reflect(EmperorWarRewardScrollItem.prototype, "EmperorWarRewardScrollItem");
//# sourceMappingURL=EmperorWarRewardScrollItem.js.map