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
 * 称号人物形象
 * author qianjun
 * date 2017/11/01
 * @class DiscussRole
 */
var CouncilRole = (function (_super) {
    __extends(CouncilRole, _super);
    function CouncilRole() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    CouncilRole.prototype.init = function () {
        this.width = GameConfig.stageWidth;
        var roleImg = BaseLoadBitmap.create("palace_role_empty");
        roleImg.width = 517;
        roleImg.height = 775;
        this.setLayoutPosition(LayoutConst.horizontalCentertop, roleImg, this, [0, 60]);
        roleImg.visible = true;
        roleImg.addTouchTap(this.roleImgClickHandler, this);
        this.addChild(roleImg);
        this._roleImg = roleImg;
        var shadowImg = BaseBitmap.create("palace_role_shadow");
        shadowImg.anchorOffsetX = shadowImg.width / 2;
        shadowImg.x = this.width / 2;
        // shadowImg.x = roleImg.x + roleImg.width/2 - shadowImg.width/2;
        this.addChildAt(shadowImg, 0);
        this._shadowImg = shadowImg;
        this._shadowImg.y = this._roleImg.y + this._roleImg.height - this._shadowImg.height / 2 - 20;
        //横版名字变竖版名字
        // if (PlatformManager.checkIsTextHorizontal()){
        // 	let titleImg = BaseLoadBitmap.create("user_title_3000_3");
        // 	titleImg.width = 213;
        // 	titleImg.height = 47;
        // 	this.addChild(titleImg)
        // 	this._titleImg = titleImg;
        // } else {
        // 	let titleImg = BaseLoadBitmap.create("user_title_3000_3");
        // 	titleImg.width = 47;
        // 	titleImg.height = 103;
        // 	// titleImg.y = 30;
        // 	this.addChild(titleImg)
        // 	this._titleImg = titleImg;
        // }
    };
    /**
     * 刷新展示
     */
    CouncilRole.prototype.refreshUIWithData = function (data) {
        this._roleTitleId = data.titleId;
        this._roleImg.visible = false;
        var oldroleNode = this.getChildByName("roleNode");
        if (oldroleNode)
            this.removeChild(oldroleNode);
        if ((Config.TitleCfg.isTheKingTitleId(this._roleTitleId) && data.uid && data.uid != "") || (data instanceof PalaceRoleInfoVo && data.uid && data.uid > 0)) {
            var titlecfg = Config.TitleCfg.getTitleCfgById(this._roleTitleId);
            var isCross = titlecfg.isCross;
            this._roleUid = data.uid;
            var roleNode = undefined;
            var resPath = "palace_db_" + data.titleId;
            if (App.DeviceUtil.CheckWebglRenderMode() && ResourceManager.hasRes(resPath + "_ske")) 
            // if(data.titleId == "3201")
            {
                roleNode = App.DragonBonesUtil.getLoadDragonBones(resPath);
                // roleNode.width = 470;
                // roleNode.height = 429;
                roleNode.setScale(1.4);
                roleNode.y = 100;
                //this.setLayoutPosition(LayoutConst.horizontalCentertop, roleNode, this._roleImg);
                var rect1 = egret.Rectangle.create();
                rect1.setTo(0, 0, 136, 143);
                var myHead = BaseLoadBitmap.create("user_head" + data.pic, rect1);
                myHead.visible = false;
                myHead.width = 136;
                myHead.height = 143;
                // myHead.x = 87;
                // myHead.x = myBody.x + myBody.width/2 - myHead.width/2
                myHead.name = "myHead";
                myHead.visible = true;
                this.setLayoutPosition(LayoutConst.horizontalCentertop, myHead, this, [0, roleNode.y - 87]);
                this.addChild(myHead);
                this._shadowImg.y = roleNode.y + 670 - this._shadowImg.height / 2 - 15;
                this._shadowImg.visible = false;
                roleNode.x = this.width / 2 - roleNode.width / 2;
            }
            else {
                roleNode = Api.playerVoApi.getPlayerPortrait(Number(data.titleId), data.pic);
                if (Config.TitleCfg.isTheKingTitleId(this._roleTitleId)) {
                    var rect12 = egret.Rectangle.create();
                    rect12.setTo(0, 0, 712, 668);
                    var myBody = roleNode.getChildByName("myBody");
                    myBody.setload("user_body_full_3201_2", rect12);
                    myBody.width = 712;
                    myBody.height = 668;
                    myBody.visible = true;
                    var myHead = roleNode.getChildByName("myHead");
                    myHead.x = 356 - 70;
                    myHead.visible = true;
                }
                if ((Number(this._roleTitleId) >= 3101 && Number(this._roleTitleId) <= 3108)) {
                    roleNode.x = this.width / 2 - roleNode.width / 2 + 165;
                }
                else {
                    roleNode.x = this.width / 2 - roleNode.width / 2;
                }
                roleNode.y = 60;
                this._shadowImg.y = roleNode.y + roleNode.height - this._shadowImg.height / 2 - 20;
                this._shadowImg.visible = true;
            }
            roleNode.name = "roleNode";
            this.addChild(roleNode);
            roleNode.addTouchTap(this.roleImgClickHandler, this);
            this.swapChildren(this._shadowImg, roleNode);
        }
        else {
            this._roleUid = 0;
            this._shadowImg.visible = false;
            this._roleImg.y = 60;
            this._roleImg.width = 517;
            this._roleImg.height = 775;
            if (Config.TitleCfg.isTheKingTitleId(this._roleTitleId)) {
                this._roleImg.setload('palace_king_empty');
                this._roleImg.width = 517;
                this._roleImg.height = 775;
            }
            // this._roleImg.anchorOffsetX = this._roleImg.width/2 ;
            this._roleImg.x = this.width / 2 - this._roleImg.width / 2;
            this._roleImg.visible = true;
        }
    };
    CouncilRole.prototype.getHeight = function () {
        return 832;
    };
    CouncilRole.prototype.roleImgClickHandler = function () {
        if (this._roleUid == 0) {
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._roleUid });
    };
    CouncilRole.prototype.dispose = function () {
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this);
        this._roleImg = null;
        this._shadowImg = null;
        this._headImg = null;
        this._roleUid = null;
        this._roleTitleId = null;
        _super.prototype.dispose.call(this);
    };
    return CouncilRole;
}(BaseDisplayObjectContainer));
__reflect(CouncilRole.prototype, "CouncilRole");
