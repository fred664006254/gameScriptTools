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
 * 议事事件item
 * qianjun
 * date 2017/10/12
 * @class DiscussEventSuccessItem
 */
var CouncilEventSuccessItem = (function (_super) {
    __extends(CouncilEventSuccessItem, _super);
    function CouncilEventSuccessItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    Object.defineProperty(CouncilEventSuccessItem.prototype, "api", {
        get: function () {
            return Api.councilVoApi;
        },
        enumerable: true,
        configurable: true
    });
    CouncilEventSuccessItem.prototype.initItem = function (index, data) {
        var view = this;
        view.width = 634;
        view.height = 200;
        view._data = data;
        //底图
        var bg = BaseBitmap.create('discusslistbg');
        bg.width = 634;
        bg.height = 188;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);
        var eid = data.eventId;
        var type = data.eventNeedType;
        var joinNum = data.joinNum;
        //玩家头像
        var picbg = BaseBitmap.create("discusspicbg");
        view.setLayoutPosition(LayoutConst.leftverticalCenter, picbg, bg, [25, 0]);
        view.addChild(picbg);
        var userContainer = Api.playerVoApi.getPlayerPortrait(data.level, data.pic);
        userContainer.mask = egret.Rectangle.create().setTo(100, 0, picbg.width, 150);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, userContainer, picbg, [-5, -10]);
        view.addChild(userContainer);
        userContainer.addTouchTap(view.clickItemHandler, view);
        //排名
        var rankid = Math.min(4, index + 1);
        var rankbg = BaseBitmap.create("discussrank" + rankid);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, rankbg, picbg);
        view.addChild(rankbg);
        var rankTxt = ComponentManager.getTextField(LanguageManager.getlocal('acRank_rank6', [(index + 1).toString()]), 20);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rankTxt, rankbg);
        view.addChild(rankTxt);
        var kaung = BaseBitmap.create("public_9_bg4");
        kaung.width = 470;
        kaung.height = 155;
        view.setLayoutPosition(LayoutConst.lefttop, kaung, picbg, [picbg.width + 10, 0]);
        view.addChild(kaung);
        //玩家名
        var nameTxt = ComponentManager.getTextField(data.name, 20, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, picbg, [picbg.width + 20, 10]);
        view.addChild(nameTxt);
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            nameTxt.textColor = 0xfcf3b4;
        }
        //总属性
        var needTypeTxt = ComponentManager.getTextField(LanguageManager.getlocal("discussViewAttrTotal", [type == 0 ? '' : LanguageManager.getlocal("servantInfo_speciality" + type), App.StringUtil.changeIntToText(data.totalNum)]), 20, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.righttop, needTypeTxt, bg, [40, nameTxt.y]);
        view.addChild(needTypeTxt);
        //奖励
        var isVistTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_BLACK);
        var str = view.api.getRewardByRank(index + 1);
        if (str && str != '') {
            var unit = str.split('|');
            var num = unit[0].split('_');
            isVistTxt.text = LanguageManager.getlocal("allianceTaskrewardStr", [num[2]]);
        }
        view.setLayoutPosition(LayoutConst.lefttop, isVistTxt, nameTxt, [0, nameTxt.textHeight + 10]);
        view.addChild(isVistTxt);
        var line = BaseBitmap.create("public_line1");
        line.width = 470;
        view.setLayoutPosition(LayoutConst.lefttop, line, isVistTxt, [0, isVistTxt.textHeight + 2]);
        view.addChild(line);
        var sinfo = data.sinfo;
        var arr = [];
        for (var i in data.sinfo) {
            var servantid = i;
            var info = data.sinfo[i];
            var servanthalf = "servant_half_" + servantid;
            if (info.servantSkin) {
                servanthalf = "skin_half_" + info.servantSkin;
            }
            arr.push({
                data: {
                    qualityBoxImgPath: "servant_cardbg_" + info.clv,
                    halfImgPath: servanthalf
                }
            });
        }
        var tmpRect = new egret.Rectangle(0, 0, 450, 90);
        var scrollList = ComponentManager.getScrollList(CouncilEventSearvantItem, arr, tmpRect);
        scrollList.verticalScrollPolicy = 'off';
        view.setLayoutPosition(LayoutConst.lefttop, scrollList, isVistTxt, [-5, isVistTxt.textHeight]);
        view.addChild(scrollList);
    };
    CouncilEventSuccessItem.prototype.clickItemHandler = function (event) {
        this.showUserInfo();
    };
    CouncilEventSuccessItem.prototype.showUserInfo = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._data.uid });
    };
    CouncilEventSuccessItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
        ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
    };
    CouncilEventSuccessItem.prototype.getSpaceY = function () {
        return 10;
    };
    CouncilEventSuccessItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return CouncilEventSuccessItem;
}(ScrollListItem));
__reflect(CouncilEventSuccessItem.prototype, "CouncilEventSuccessItem");
//# sourceMappingURL=CouncilEventSuccessItem.js.map