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
var TitleScrollItem = (function (_super) {
    __extends(TitleScrollItem, _super);
    function TitleScrollItem() {
        return _super.call(this) || this;
    }
    TitleScrollItem.prototype.initItem = function (index, itemInfoVo) {
        if (!itemInfoVo || !itemInfoVo.id) {
            var itembg = BaseLoadBitmap.create("itembg_0");
            itembg.x = itembg.y = 5;
            itembg.width = itembg.height = 108;
            this.addChild(itembg);
            return;
        }
        _super.prototype.initItem.call(this, index, itemInfoVo);
        var cfg = Config.TitleCfg.getTitleCfgById(itemInfoVo.id);
        if (cfg && cfg.isChangePic()) {
            var idx = this.getChildIndex(this._item);
            var lv = itemInfoVo.lv;
            if (Api.switchVoApi.checkOpenChangeTitle()) {
                if (cfg.isTitle == 2) {
                    var pTitle = Api.playerVoApi.getPlayerPtitle();
                    if (pTitle.ptitle && pTitle.ptitle == String(itemInfoVo.id)) {
                        lv = pTitle.plv;
                    }
                }
                else if (cfg.isTitle == 1 || cfg.isTitle == 4) {
                    var titleData = Api.playerVoApi.getTitleInfo();
                    if (titleData.title && titleData.title == String(itemInfoVo.id)) {
                        lv = titleData.tlv;
                    }
                }
            }
            var icon = App.CommonUtil.getHeadPic(itemInfoVo.id, lv, itemInfoVo);
            icon.x = this._itembg.x + this._itembg.width / 2 - 100 / 2;
            icon.y = this._itembg.y + this._itembg.height / 2 - 100 / 2;
            this.addChildAt(icon, idx + 1);
        }
        if (Api.switchVoApi.checkOpenTitleLv() && itemInfoVo.isLvUp == 1) {
            var lvbg = BaseBitmap.create("public_itemlvbg");
            lvbg.setPosition(this._itembg.width - lvbg.width + 2, 8);
            this.addChild(lvbg);
            var levelTf = ComponentManager.getBitmapText(LanguageManager.getlocal("servant_lv", [String(itemInfoVo.lv)]), "titlelv_fnt");
            levelTf.x = this._itembg.x + this._itembg.width - 4 - levelTf.width;
            levelTf.y = this._itembg.y;
            this.addChild(levelTf);
        }
        if (Api.switchVoApi.checkTitleUpgrade() && itemInfoVo.isTitle == 1 && (itemInfoVo.titleType < 3 || itemInfoVo.titleType == 7)) {
            var info = Api.titleupgradeVoApi.getTitleInfo(itemInfoVo.id);
            if (info && info.level) {
                var lvbg = BaseBitmap.create("public_itemlvbg");
                lvbg.setPosition(this._itembg.width - lvbg.width + 2, 8);
                this.addChild(lvbg);
                var levelTf = ComponentManager.getBitmapText(LanguageManager.getlocal("servant_lv", [String(info.level)]), "titlelv_fnt");
                levelTf.x = this._itembg.x + this._itembg.width - 4 - levelTf.width;
                levelTf.y = this._itembg.y;
                this.addChild(levelTf);
            }
        }
    };
    return TitleScrollItem;
}(ItemScrollItem));
__reflect(TitleScrollItem.prototype, "TitleScrollItem");
//# sourceMappingURL=TitleScrollItem.js.map