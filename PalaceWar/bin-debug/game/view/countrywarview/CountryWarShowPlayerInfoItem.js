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
 * author:qianjun
 * desc:门客战斗item
*/
var CountryWarShowPlayerInfoItem = (function (_super) {
    __extends(CountryWarShowPlayerInfoItem, _super);
    function CountryWarShowPlayerInfoItem() {
        var _this = _super.call(this) || this;
        _this.serverTxt = null;
        _this.nameTxt = null;
        _this._data = null;
        return _this;
    }
    CountryWarShowPlayerInfoItem.prototype.initItem = function (index, data) {
        var view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        this._data = data;
        this.width = 255;
        this.height = 38 + 5;
        if (data.empty) {
            return;
        }
        //等级头衔
        var str = Api.playerVoApi.getPlayerOfficeByLevel(data.level);
        var titleId = data.titleid;
        var width = 0;
        if (titleId) {
            var titleinfo = App.CommonUtil.getTitleData(titleId);
            if (titleinfo.title != "") {
                var title = Config.TitleCfg.getTitleCfgById(titleinfo.title);
                if (title && title.isTitle == 1 && title.titleType) {
                    str = title.titleName;
                }
                var titleImg = App.CommonUtil.getTitlePic(titleId);
                titleImg.width = 155;
                titleImg.height = 59;
                titleImg.setScale(0.65);
                width = 155 * 0.65;
                view.setLayoutPosition(LayoutConst.leftverticalCenter, titleImg, view, [20, 0]);
                view.addChild(titleImg);
            }
        }
        else {
            var zidname = LanguageManager.getlocal('allianceWarVsPlayerPos', [str]);
            var serverTxt = ComponentManager.getTextField(zidname, 20);
            view.setLayoutPosition(LayoutConst.leftverticalCenter, serverTxt, view, [20, 0]);
            view.addChild(serverTxt);
            view.serverTxt = serverTxt;
            width = serverTxt.textWidth;
            if (index == 0) {
                serverTxt.textColor = data.type == 'left' ? TextFieldConst.COLOR_QUALITY_BLUE : TextFieldConst.COLOR_QUALITY_YELLOW;
            }
        }
        var nameTxt = ComponentManager.getTextField(data.name, 20);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, view, [20 + width + 5, 0]);
        view.addChild(nameTxt);
        if (index == 0) {
            nameTxt.textColor = data.type == 'left' ? TextFieldConst.COLOR_QUALITY_BLUE : TextFieldConst.COLOR_QUALITY_YELLOW;
        }
        view.nameTxt = nameTxt;
        // else if(Api.mergeServerVoApi.judgeIsSameServer(data.zid,Api.mergeServerVoApi.getTrueZid())){
        // 	serverTxt.textColor = nameTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE; 
        // }
    };
    CountryWarShowPlayerInfoItem.prototype.refreshTextColor = function () {
        var view = this;
        if (view.serverTxt) {
            view.serverTxt.textColor = this._data.type == 'left' ? TextFieldConst.COLOR_QUALITY_BLUE : TextFieldConst.COLOR_QUALITY_YELLOW;
        }
        if (view.nameTxt) {
            view.nameTxt.textColor = this._data.type == 'left' ? TextFieldConst.COLOR_QUALITY_BLUE : TextFieldConst.COLOR_QUALITY_YELLOW;
        }
    };
    CountryWarShowPlayerInfoItem.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return CountryWarShowPlayerInfoItem;
}(ScrollListItem));
__reflect(CountryWarShowPlayerInfoItem.prototype, "CountryWarShowPlayerInfoItem");
//# sourceMappingURL=CountryWarShowPlayerInfoItem.js.map