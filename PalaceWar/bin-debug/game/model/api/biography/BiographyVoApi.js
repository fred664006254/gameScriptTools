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
 * 列传本纪api
 * author shaoliang
 * date 2020/2/6
 * @class BiographyVoApi
 */
var BiographyVoApi = (function (_super) {
    __extends(BiographyVoApi, _super);
    function BiographyVoApi() {
        var _this = _super.call(this) || this;
        _this.biographyVo = null;
        _this.showInfo = null;
        _this.showNum = 0;
        _this._rewardsQueue = [];
        return _this;
    }
    /**
     * 当前传记
     */
    BiographyVoApi.prototype.getInfo = function () {
        return this.biographyVo.info;
    };
    /**
     * 历史传记
     */
    BiographyVoApi.prototype.getList = function () {
        return this.biographyVo.list;
    };
    BiographyVoApi.prototype.getBookInfoContainerByInfo = function (data, isMe, uid, nam) {
        if (isMe === void 0) { isMe = false; }
        var container = new BaseDisplayObjectContainer();
        var cfg = Config.BiographyCfg.getCfgBgId(data.id);
        var base = BaseBitmap.create("biography_base" + cfg.type);
        base.setPosition(0, 148);
        container.addChild(base);
        var book = BaseBitmap.create("biography_book" + cfg.type);
        book.setPosition(base.x + base.width / 2 - book.width / 2, 0);
        container.addChild(book);
        var nameplate = BaseBitmap.create("biography_nameplate" + cfg.type);
        container.addChild(nameplate);
        var titleStr = cfg.name;
        var playerName;
        var serverstr;
        var datestr;
        if (isMe) {
            datestr = App.DateUtil.getFormatBySecond(data.ts, 20);
            if (nam) {
                playerName = nam;
            }
            else {
                playerName = Api.playerVoApi.getPlayerName();
            }
            if (uid) {
                serverstr = Api.mergeServerVoApi.getAfterMergeSeverName(uid);
            }
            else {
                serverstr = Api.mergeServerVoApi.getAfterMergeSeverName(null);
            }
        }
        else {
            datestr = App.DateUtil.getFormatBySecond(data.st, 20);
            playerName = data.name;
            serverstr = Api.mergeServerVoApi.getSeverName(data.zid);
        }
        var name = ComponentManager.getTextField(cfg.typeName, TextFieldConst.FONTSIZE_CONTENT_COMMON, cfg.typeNameColor);
        container.addChild(name);
        var title = ComponentManager.getTextField(titleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xad3519);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, book, [0, 39]);
        container.addChild(title);
        var playername = ComponentManager.getTextField(playerName, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        playername.setPosition(book.x + book.width / 2 - playername.width / 2, book.y + 70);
        container.addChild(playername);
        // let ornament = BaseBitmap.create("biography_ornament");
        // ornament.width = playername.width+ornament.width;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,ornament,book,[0,playername.y+playername.height/2-ornament.height/2]);
        // container.addChild(ornament);
        var servertext = ComponentManager.getTextField(serverstr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, servertext, book, [0, playername.y + 25]);
        container.addChild(servertext);
        var datatext = ComponentManager.getTextField(datestr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, datatext, book, [0, servertext.y + 25]);
        container.addChild(datatext);
        if (cfg.type == 1) {
            book.x -= 15;
            var addclip = ComponentManager.getCustomMovieClip("biography_type1_add", 10, 100);
            addclip.blendMode = egret.BlendMode.ADD;
            addclip.setPosition(10, 0);
            addclip.playWithTime(0);
            container.addChild(addclip);
            var childnum = container.numChildren;
            for (var i = 0; i < childnum; i++) {
                container.getChildAt(i).x += 10;
            }
            base.x = 0;
        }
        else {
            var addclip = ComponentManager.getCustomMovieClip("biography_type2_add", 10, 100);
            addclip.blendMode = egret.BlendMode.ADD;
            addclip.setPosition(0, 0);
            addclip.playWithTime(0);
            container.addChild(addclip);
        }
        nameplate.setPosition(base.x + base.width / 2 - nameplate.width / 2, base.y);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, name, nameplate, [0, 2]);
        return container;
    };
    BiographyVoApi.prototype.checkShowBiographyRewars = function (rewards) {
        var rewardVo = GameData.formatRewardItem(rewards);
        var bioId = "";
        for (var i = 0; i < rewardVo.length; i++) {
            var oneVo = rewardVo[i];
            if (oneVo.type == 35) {
                if (!GameData.isInArray(String(oneVo.id), this._rewardsQueue)) {
                    this._rewardsQueue.push(String(oneVo.id));
                }
            }
        }
        this.checkShowRewars();
    };
    BiographyVoApi.prototype.checkShowRewars = function () {
        if (this._rewardsQueue.length > 0) {
            var bioId = this._rewardsQueue.shift();
            if (bioId) {
                var t = this.getLastTimeById(bioId);
                var info = {
                    zid: Api.mergeServerVoApi.getTrueZid(Api.playerVoApi.getPlayerID()),
                    name: Api.playerVoApi.getPlayerName(),
                    level: Api.playerVoApi.getPlayerLevel(),
                    uid: Api.playerVoApi.getPlayerID(),
                    pic: Api.playerVoApi.getPlayePicId(),
                    id: bioId,
                    st: t,
                    title: Api.playerVoApi.getTitleInfo(),
                };
                Api.biographyVoApi.showInfo = info;
                ViewController.getInstance().openView(ViewConst.COMMON.BIOGRAPHYSHOWVIEW, {});
            }
        }
    };
    BiographyVoApi.prototype.getLastTimeById = function (bid) {
        var t = 0;
        var listArray = Api.biographyVoApi.getList();
        for (var i = 0; i < listArray.length; i++) {
            var oneItem = listArray[i];
            if (oneItem.id == bid) {
                if (oneItem.ts > t) {
                    t = oneItem.ts;
                }
            }
        }
        return t;
    };
    BiographyVoApi.prototype.dispose = function () {
        this.showInfo = null;
        this.showNum = 0;
        this._rewardsQueue.length = 0;
        _super.prototype.dispose.call(this);
    };
    return BiographyVoApi;
}(BaseVoApi));
__reflect(BiographyVoApi.prototype, "BiographyVoApi");
//# sourceMappingURL=BiographyVoApi.js.map