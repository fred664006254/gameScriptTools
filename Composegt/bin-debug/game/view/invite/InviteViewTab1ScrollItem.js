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
 * 邀请有礼人数scrollitem
 * author 赵占涛
 * date 2018/3/6
 * @class InviteViewTab1ScrollItem
 */
var InviteViewTab1ScrollItem = (function (_super) {
    __extends(InviteViewTab1ScrollItem, _super);
    function InviteViewTab1ScrollItem() {
        var _this = _super.call(this) || this;
        //领取按钮
        _this.getBtn = null;
        //当前是第几个cell
        _this._selectedIndex = 0;
        // 发送者是我
        _this.senderIsMe = false;
        return _this;
    }
    InviteViewTab1ScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_INVITE_GETINVITEREWARD, this.doGetRewardCallback, this);
        this.data = data;
        this._selectedIndex = index;
        var temW = GameConfig.stageWidth;
        var bg = BaseBitmap.create("activity_db_01");
        bg.width = 606;
        bg.height = 172;
        bg.x = temW / 2 - bg.width / 2;
        bg.y = 0;
        this.addChild(bg);
        var bg2 = BaseBitmap.create("activity_db_02");
        bg2.width = 602;
        bg2.height = 123;
        bg2.x = temW / 2 - bg2.width / 2;
        bg2.y = 40;
        this.addChild(bg2);
        // 需要人数
        var needNum = Config.InvitefriendCfg.friendNum[data.cfgId].needNum;
        // 邀请N名玩家
        var countLabel = ComponentManager.getTextField(LanguageManager.getlocal("inviteFriendCount", [String(needNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        countLabel.x = temW / 2 - countLabel.width / 2;
        countLabel.y = bg.y + 10;
        this.addChild(countLabel);
        var line1 = BaseBitmap.create("public_v_huawen01");
        line1.x = countLabel.x - line1.width - 10;
        line1.y = countLabel.y;
        this.addChild(line1);
        var line2 = BaseBitmap.create("public_v_huawen01");
        line2.scaleX = -1;
        line2.x = countLabel.x + countLabel.width + +line2.width + 10;
        line2.y = countLabel.y;
        this.addChild(line2);
        // 玩家头像
        var head;
        if (data.userPid) {
            var headStr = Api.inviteVoApi.getUserHeadByPid(data.userPid);
            if (headStr.substr(0, 4) === "http") {
                // headStr = decodeURIComponent(headStr);
                // 网络上的头像
                head = new BaseDisplayObjectContainer();
                head.width = 80;
                head.height = 80;
                var headIcon = BaseLoadBitmap.create(headStr);
                headIcon.width = 80;
                headIcon.height = 80;
                head.addChild(headIcon);
                var circle = new egret.Shape();
                circle.graphics.beginFill(0x0000ff);
                circle.graphics.drawCircle(40, 40, 40);
                circle.graphics.endFill();
                head.addChild(circle);
                headIcon.mask = circle;
                head.cacheAsBitmap = true;
            }
            else {
                // 游戏内头像
                head = new BaseDisplayObjectContainer();
                var posStr = "public_chatheadbg";
                var posBg = BaseBitmap.create(posStr);
                head.addChild(posBg);
                var rect1 = egret.Rectangle.create();
                rect1.setTo(0, 0, 136, 143);
                var posBB = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(headStr), rect1);
                posBB.x = 0;
                posBB.y = -7;
                posBB.setScale(2 / 3);
                head.addChild(posBB);
            }
        }
        else {
            head = BaseBitmap.create("nobodyIcon");
            // head = BaseLoadBitmap.create("http://thirdapp1.qlogo.cn/qzopenapp/43a357988b13b4b8f7aff5cf812ac0c3a21d7e096764d8cb80214d16323327c7/50");			
        }
        head.x = temW / 2 - bg.width / 2 + 10;
        head.y = bg2.y + bg2.height / 2 - head.height / 2;
        this.addChild(head);
        // 玩家名
        var nameStr;
        if (data.userPid) {
            nameStr = String(Api.inviteVoApi.getUserNicknameByPid(data.userPid));
        }
        else {
            nameStr = LanguageManager.getlocal("inviteNoName");
        }
        var nameLabel = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        nameLabel.x = head.x + head.width + 10;
        nameLabel.y = bg2.y + 17;
        this.addChild(nameLabel);
        // 奖励
        var temScale = 0.6;
        var rewardVoList = GameData.formatRewardItem(Config.InvitefriendCfg.friendNum[data.cfgId].content);
        for (var i = 0; i < rewardVoList.length; i++) {
            // getRewardItemIcons
            var icon = GameData.getItemIcon(rewardVoList[i], true, true);
            icon.x = head.x + head.width + 10 + 7 * (i + 1) + icon.width * temScale * i;
            icon.y = bg2.y + 43;
            icon.scaleX = icon.scaleY = temScale;
            this.addChild(icon);
        }
        // 进度
        var progressLabel = ComponentManager.getTextField(LanguageManager.getlocal("inviteProgress", [
            String(Math.min(needNum, Api.inviteVoApi.getInvitedNum())),
            String(needNum)
        ]), TextFieldConst.FONTSIZE_CONTENT_SMALL, Api.inviteVoApi.getInvitedNum() < needNum ? TextFieldConst.COLOR_BROWN : TextFieldConst.COLOR_QUALITY_GREEN);
        progressLabel.x = bg.x + bg.width - 70 - progressLabel.width / 2;
        progressLabel.y = bg2.y + 20;
        this.addChild(progressLabel);
        // 领取按钮与已领取标记
        var getRewardBtn;
        if (Api.inviteVoApi.getInviteNumGettedReward(data.cfgId)) {
            getRewardBtn = BaseBitmap.create("collectflag");
        }
        else {
            getRewardBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.getRewardButtonHandler, this);
            this.getBtn = getRewardBtn;
            getRewardBtn.name = "getRewardBtn";
            if (!data.userPid) {
                App.DisplayUtil.changeToGray(getRewardBtn);
            }
        }
        getRewardBtn.x = progressLabel.x + progressLabel.width / 2 - getRewardBtn.width / 2;
        getRewardBtn.y = bg2.y + bg2.height - getRewardBtn.height - 20;
        this.addChild(getRewardBtn);
    };
    // 领取奖励按钮点击回调
    InviteViewTab1ScrollItem.prototype.getRewardButtonHandler = function (param) {
        if (!Api.inviteVoApi.getInviteNumGettedReward(this.data.cfgId) && this.data.userPid) {
            NetManager.request(NetRequestConst.REQUEST_INVITE_GETINVITEREWARD, { ikey: this.data.cfgId });
            this.senderIsMe = true;
        }
    };
    InviteViewTab1ScrollItem.prototype.doGetRewardCallback = function (event) {
        var _a = event.data, ret = _a.ret, data = _a.data;
        if (ret && this.senderIsMe) {
            this.senderIsMe = false;
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards));
            if (this.getBtn) {
                var x = this.getBtn.x + this.getBtn.width / 2;
                var y = this.getBtn.y + this.getBtn.height / 2;
                this.getBtn.dispose();
                var getRewardBtn = void 0;
                getRewardBtn = BaseBitmap.create("collectflag");
                getRewardBtn.x = x - getRewardBtn.width / 2;
                getRewardBtn.y = y - getRewardBtn.height / 2;
                this.addChild(getRewardBtn);
            }
        }
    };
    InviteViewTab1ScrollItem.prototype.dispose = function () {
        this._rewardList = null;
        this.getBtn = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_INVITE_GETINVITEREWARD, this.doGetRewardCallback, this);
        _super.prototype.dispose.call(this);
    };
    return InviteViewTab1ScrollItem;
}(ScrollListItem));
__reflect(InviteViewTab1ScrollItem.prototype, "InviteViewTab1ScrollItem");
