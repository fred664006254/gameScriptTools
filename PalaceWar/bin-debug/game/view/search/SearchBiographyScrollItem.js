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
var SearchBiographyScrollItem = /** @class */ (function (_super) {
    __extends(SearchBiographyScrollItem, _super);
    function SearchBiographyScrollItem() {
        return _super.call(this) || this;
    }
    SearchBiographyScrollItem.prototype.initItem = function (index, data) {
        var bg = BaseBitmap.create("biographyview_atticbg2");
        this.addChild(bg);
        /*
        {
                "name":"张三",
                "title":"{"clothes":"3806","title":"3806","clv":1,"tlv":1}",
                "id":"1001",
                "st":"1580572800",
                "uid":"1000563",
                "power":"978017",
                "pic":"5",
                "zid":"1"
            },
            */
        //玩家形象
        var titleId = data.level;
        if (data.title && data.title.clothes && data.title.clothes != "") {
            titleId = data.title.clothes;
        }
        // titleId="3151";
        var player = Api.playerVoApi.getPlayerPortrait(titleId, data.pic);
        player.y = 25;
        var rect = new egret.Rectangle();
        player.y = 25;
        rect.setTo(0, 0, player.width, 240);
        if (titleId == "3151") {
            if (Api.playerVoApi.getUserSex(data.pic) == 1) {
                player.y = 0;
                rect.setTo(0, 0, player.width, 267);
            }
            else {
                player.y = -20;
                rect.setTo(0, 0, player.width, 288);
            }
        }
        if (player.width > 340) {
            player.x = (340 - player.width) / 2;
        }
        player.setScale(0.9);
        this.addChild(player);
        player.mask = rect;
        // if (titleId)
        // {
        //     if (Config.TitleCfg.checkHasSpecialHead(titleId))
        //     {
        //         player.y = -75;
        //         let rect = new egret.Rectangle();
        //         rect.setTo(player.width/2-141,0,player.width,240+110);
        //         player.mask = rect;
        //     }
        // }
        if (data.title && data.title.title && data.title.title != "") {
            var titleIcon = App.CommonUtil.getTitlePic(data.title.title, data.title.tlv);
            // BaseLoadBitmap.create(Config.TitleCfg.getTitleCfgById(data.title.title).titleIcon3);
            titleIcon.setScale(0.8);
            titleIcon.setPosition(70, 190);
            this.addChild(titleIcon);
        }
        //右侧信息
        var rightContainer = Api.biographyVoApi.getBookInfoContainerByInfo(data);
        rightContainer.setPosition(228, 28);
        this.addChild(rightContainer);
        rightContainer.addTouchTap(this.showInfo, this, data);
        this.height = bg.height + 10;
    };
    SearchBiographyScrollItem.prototype.showInfo = function (event, data) {
        // let info = {
        // 	zid:Api.mergeServerVoApi.getTrueZid(Api.playerVoApi.getPlayerID()),
        // 	name:Api.playerVoApi.getPlayerName(),
        // 	level:Api.playerVoApi.getPlayerLevel(),
        // 	uid:Api.playerVoApi.getPlayerID(),
        // 	pic:Api.playerVoApi.getPlayePicId(),
        // 	id:data.id,
        // 	st:data.ts,
        // 	title:Api.playerVoApi.getTitleInfo(),
        // }
        Api.biographyVoApi.showInfo = data;
        ViewController.getInstance().openView(ViewConst.COMMON.BIOGRAPHYSHOWVIEW, {});
    };
    SearchBiographyScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    SearchBiographyScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SearchBiographyScrollItem;
}(ScrollListItem));
//# sourceMappingURL=SearchBiographyScrollItem.js.map