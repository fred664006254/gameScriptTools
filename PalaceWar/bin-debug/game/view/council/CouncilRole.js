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
        _this._roleUid = 0;
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
        var titleinfo = App.CommonUtil.getTitleData(data.titleId);
        this._roleTitleId = titleinfo.title;
        this._roleImg.visible = false;
        var oldroleNode = this.getChildByName("roleNode");
        if (oldroleNode)
            this.removeChild(oldroleNode);
        var pic = data.pic;
        // if (data.titleId && Config.TitleCfg.checkHasSpecialHead(data.titleId))
        // {
        // 	pic= Config.TitleCfg.getSpecialHead(data.titleId,pic);
        // }
        if ((Config.TitleCfg.isTheKingTitleId(this._roleTitleId) && data.uid != "") || (data instanceof PalaceRoleInfoVo && data.uid > 0)) {
            var titlecfg = Config.TitleCfg.getTitleCfgById(this._roleTitleId);
            var isCross = titlecfg.isCross;
            this._roleUid = data.uid;
            var roleNode_1 = undefined;
            var resPath = "palace_db_" + this._roleTitleId;
            var flag = true;
            if (App.DeviceUtil.CheckWebglRenderMode() && ResourceManager.hasRes(resPath + "_ske") && flag) 
            // if(data.titleId == "3201")
            {
                var myHair_1 = null;
                var loadIdx_1 = 0;
                roleNode_1 = App.DragonBonesUtil.getLoadDragonBones(resPath, 0, "idle", function () {
                    loadIdx_1++;
                    if (loadIdx_1 >= 3) {
                        if (roleNode_1) {
                            roleNode_1.visible = true;
                        }
                        if (myHead_1) {
                            myHead_1.visible = true;
                        }
                        if (myHair_1) {
                            myHair_1.visible = true;
                        }
                    }
                }, this);
                if (loadIdx_1 == 0) {
                    roleNode_1.visible = false;
                }
                // roleNode.width = 470;
                // roleNode.height = 429;
                roleNode_1.setScale(1.4);
                roleNode_1.y = 100;
                var hairPic = "user_hair" + pic;
                if (pic <= 5 || (!ResourceManager.hasRes(hairPic))) {
                    hairPic = "user_hair" + 7;
                }
                var rect12 = egret.Rectangle.create();
                rect12.setTo(0, 0, 85, 140);
                myHair_1 = BaseLoadBitmap.create(hairPic, rect12, { callback: function () {
                        loadIdx_1++;
                        if (loadIdx_1 >= 3) {
                            if (roleNode_1) {
                                roleNode_1.visible = true;
                            }
                            if (myHead_1) {
                                myHead_1.visible = true;
                            }
                            if (myHair_1) {
                                myHair_1.visible = true;
                            }
                        }
                    }, callbackThisObj: this });
                myHair_1.visible = false;
                myHair_1.name = "myHair";
                this.addChild(myHair_1);
                //this.setLayoutPosition(LayoutConst.horizontalCentertop, roleNode, this._roleImg);
                var rect1 = egret.Rectangle.create();
                rect1.setTo(0, 0, 136, 143);
                var myHead_1 = BaseLoadBitmap.create("user_head" + pic, rect1, { callback: function () {
                        loadIdx_1++;
                        if (loadIdx_1 >= 2) {
                            if (roleNode_1) {
                                roleNode_1.visible = true;
                            }
                            if (myHead_1) {
                                myHead_1.visible = true;
                            }
                        }
                    }, callbackThisObj: this });
                if (loadIdx_1 == 0) {
                    myHead_1.visible = false;
                }
                myHead_1.width = 136;
                myHead_1.height = 143;
                myHead_1.name = "myHead";
                this.setLayoutPosition(LayoutConst.horizontalCentertop, myHead_1, this, [0, roleNode_1.y - 87]);
                this.setLayoutPosition(LayoutConst.horizontalCentertop, myHair_1, this, [0, roleNode_1.y - 87]);
                this.addChild(myHead_1);
                this._shadowImg.y = roleNode_1.y + 670 - this._shadowImg.height / 2 - 15;
                this._shadowImg.visible = false;
            }
            else {
                // let arr:string[] = data.titleId.split("_");
                // let curLv:string;
                // if (!Config.TitleCfg.getIsTitleOnly(arr[0]))
                // {
                //     curLv = arr[0];
                // }
                roleNode_1 = Api.playerVoApi.getPlayerPortrait(Number(this._roleTitleId), pic);
                if (Config.TitleCfg.isTheKingTitleId(this._roleTitleId)) {
                    var rect12 = egret.Rectangle.create();
                    rect12.setTo(0, 0, 712, 668);
                    var myBody = roleNode_1.getChildByName("myBody");
                    myBody.setload("user_body_full_3201_2", rect12);
                    myBody.width = 712;
                    myBody.height = 668;
                    myBody.visible = true;
                    var myHead = roleNode_1.getChildByName("myHead");
                    myHead.x = 356 - 70;
                    myHead.visible = true;
                }
                roleNode_1.y = 60;
                this._shadowImg.y = roleNode_1.y + roleNode_1.height - this._shadowImg.height / 2 - 20;
                this._shadowImg.visible = true;
            }
            roleNode_1.name = "roleNode";
            roleNode_1.x = this.width / 2 - roleNode_1.width / 2;
            this.addChild(roleNode_1);
            roleNode_1.addTouchTap(this.roleImgClickHandler, this);
            this.swapChildren(this._shadowImg, roleNode_1);
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
            this._roleImg.anchorOffsetX = this._roleImg.width / 2;
            // this._roleImg.x = this.width/2 -this._roleImg.width/2 ;
            this._roleImg.visible = true;
        }
    };
    // protected userShotCallback(event:egret.Event)
    // {
    //     let data = event.data.data.data;
    //     if(data.ruid == this._roleUid)
    //     {
    //         ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
    //     }
    // }
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
//# sourceMappingURL=CouncilRole.js.map