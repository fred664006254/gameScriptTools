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
var BetheKingRankRoleNode = (function (_super) {
    __extends(BetheKingRankRoleNode, _super);
    function BetheKingRankRoleNode() {
        return _super.call(this) || this;
    }
    BetheKingRankRoleNode.prototype.init = function (ranIdx, rankData) {
        this._rankData = rankData;
        this._ranIdx = ranIdx;
        this.width = 312;
        this.height = 400;
        var roleImg = undefined;
        if (rankData) {
            var curLv = rankData.level;
            if (rankData.title != "") {
                curLv = rankData.title;
            }
            roleImg = Api.playerVoApi.getPlayerPortrait(curLv, rankData.pic);
        }
        else {
            roleImg = BaseBitmap.create("palace_role_empty");
        }
        roleImg.mask = new egret.Rectangle(0, 0, 400, 240);
        roleImg.scaleX = roleImg.scaleY = 0.6;
        if (roleImg.width > 700) {
            roleImg.x = this.width / 2 - 130;
        }
        else {
            roleImg.x = this.width / 2 - roleImg.width / 2 * roleImg.scaleX - 20;
        }
        this.addChild(roleImg);
        var bg = BaseBitmap.create("betheking_rolebg_king");
        var rankImg = BaseBitmap.create("rank_" + String(ranIdx + 1));
        bg.y = 100;
        rankImg.y = bg.y + 18;
        rankImg.x = bg.x + 190;
        var startX = 30;
        var startY = 30;
        if (ranIdx > 0) {
            // roleImg.x = this.width/2 - roleImg.width/2 *roleImg.scaleX ;
            roleImg.x += 20;
            bg.texture = ResourceManager.getRes("betheking_rolebg");
            bg.width = 220;
            bg.y = 120;
            rankImg.x = bg.x + 200;
            rankImg.y = bg.y;
            startX = 0;
            startY = 20 - 3;
        }
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        if (ranIdx == 0 && rankData) {
            //序列帧
            var skinClip = ComponentManager.getCustomMovieClip("betheking_rolebg_king_ani", 5, 180);
            skinClip.width = 430;
            skinClip.height = 210;
            ;
            // skinClip.blendMode = egret.BlendMode.ADD;
            skinClip.x = bg.x - 55;
            skinClip.y = bg.y - 37;
            this.addChild(skinClip);
            skinClip.playWithTime(999);
        }
        this.addChild(rankImg);
        var tarColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        if (rankData) {
            var nameTxt = ComponentManager.getTextField("", 18, tarColor);
            nameTxt.text = rankData ? rankData.name : "";
            nameTxt.y = bg.y + startY;
            nameTxt.x = bg.x + startX + 20;
            this.addChild(nameTxt);
            var officerTxt = ComponentManager.getTextField("", 18, tarColor);
            var textStr = rankData ? rankData.cheer_num : "";
            officerTxt.text = LanguageManager.getlocal("betheking_popularity") + ": " + textStr;
            officerTxt.y = nameTxt.y + 23;
            officerTxt.x = nameTxt.x;
            this.addChild(officerTxt);
            var powerTxt = ComponentManager.getTextField("", 18, tarColor);
            var textStr2 = rankData ? App.StringUtil.changeIntToText(Number(rankData.v)) : "0";
            powerTxt.text = LanguageManager.getlocal("betheking_kingpower") + ": " + textStr2;
            powerTxt.x = nameTxt.x;
            powerTxt.y = officerTxt.y + 23;
            this.addChild(powerTxt);
        }
        else {
            var emptyTxt = ComponentManager.getTextField("", 18, tarColor);
            emptyTxt.text = LanguageManager.getlocal("betheKing_norankRole");
            if (ranIdx == 0) {
                emptyTxt.x = bg.x + 236 / 2 - emptyTxt.width / 2 + 20;
                emptyTxt.y = bg.y + 97 / 2 - emptyTxt.height / 2 + 20;
            }
            else {
                emptyTxt.x = bg.x + 236 / 2 - emptyTxt.width / 2 - 10;
                emptyTxt.y = bg.y + 97 / 2 - emptyTxt.height / 2;
            }
            this.addChild(emptyTxt);
        }
    };
    BetheKingRankRoleNode.prototype.refreshUI = function (idx, rankData) {
        this.removeChildren();
        this.init(idx, rankData);
        // //没有上榜人员
        // if(!rankData && !this._rankData ){
        //     return;
        // }
        // let ainD = rankData ? rankData : this._rankData;
        // let desrD = rankData ? this._rankData : rankData;
        // for (var key in ainD) {
        //     if (ainD.hasOwnProperty(key) || desrD.hasOwnProperty(key) ) {
        //         if(desrD[key] != ainD[key]){
        //             this.removeChildren();
        //             this.init(this._ranIdx ,rankData);
        //             break;
        //         }
        //     }
        // }
    };
    BetheKingRankRoleNode.prototype.dispose = function () {
        this._rankData = null;
        this._ranIdx = 0;
        _super.prototype.dispose.call(this);
    };
    return BetheKingRankRoleNode;
}(BaseDisplayObjectContainer));
__reflect(BetheKingRankRoleNode.prototype, "BetheKingRankRoleNode");
