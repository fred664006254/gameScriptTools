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
 * 邀请有礼权势scrollitem
 * author 赵占涛
 * date 2018/3/6
 * @class InviteViewTab2ScrollItem
 */
var InviteViewTab2ScrollItem = (function (_super) {
    __extends(InviteViewTab2ScrollItem, _super);
    function InviteViewTab2ScrollItem() {
        var _this = _super.call(this) || this;
        //领取按钮
        _this.getBtn = null;
        //当前是第几个cell
        _this._selectedIndex = 0;
        // 发送者是我
        _this.senderIsMe = false;
        return _this;
    }
    InviteViewTab2ScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_INVITE_GETPOWERREWARD, this.doGetRewardCallback, this);
        this.data = data;
        // 配置信息
        var cfgInfo = Config.InvitefriendCfg.friendPower[data.cfgId];
        this._selectedIndex = index;
        var temW = GameConfig.stageWidth;
        var temH = 145;
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
        // 权势达到
        var countLabel = ComponentManager.getTextField(LanguageManager.getlocal("inviteFriendPower", [String(cfgInfo.needPower)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
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
        // 奖励
        var temScale = 0.8;
        var rewardVoList = GameData.formatRewardItem(cfgInfo.content);
        for (var i = 0; i < rewardVoList.length; i++) {
            // getRewardItemIcons
            var icon = GameData.getItemIcon(rewardVoList[i], true, true);
            icon.x = bg.x + 10 + 7 * (i + 1) + icon.width * temScale * i;
            icon.y = bg2.y + bg2.height / 2 - icon.height * temScale / 2;
            icon.scaleX = icon.scaleY = temScale;
            this.addChild(icon);
        }
        // 进度
        var progressLabel = ComponentManager.getTextField(LanguageManager.getlocal("invitePowerProgress", [
            String(Math.min(cfgInfo.limit, cfgInfo.limit - Api.inviteVoApi.getInvitePowerGettedReward(data.cfgId))),
            String(cfgInfo.limit)
        ]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        progressLabel.x = bg.x + bg.width - 70 - progressLabel.width / 2;
        progressLabel.y = bg2.y + 20;
        this.addChild(progressLabel);
        this.progressLabel = progressLabel;
        // 领取或已达成按钮
        var getRewardBtn;
        if (Api.inviteVoApi.getInvitePowerGettedReward(data.cfgId) >= cfgInfo.limit) {
            // 已达成
            getRewardBtn = BaseBitmap.create("collectflag");
        }
        else {
            getRewardBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.getRewardButtonHandler, this);
            this.getBtn = getRewardBtn;
            getRewardBtn.name = "getRewardBtn";
            if (Api.inviteVoApi.getInvitePowerGettedReward(data.cfgId) >= data.arriveCount) {
                App.DisplayUtil.changeToGray(getRewardBtn);
            }
        }
        getRewardBtn.x = progressLabel.x + progressLabel.width / 2 - getRewardBtn.width / 2;
        getRewardBtn.y = bg2.y + bg2.height - getRewardBtn.height - 20;
        this.addChild(getRewardBtn);
    };
    // 领取奖励按钮点击回调
    InviteViewTab2ScrollItem.prototype.getRewardButtonHandler = function (param) {
        if (Api.inviteVoApi.getInvitePowerGettedReward(this.data.cfgId) < Config.InvitefriendCfg.friendPower[this.data.cfgId].limit
            && Api.inviteVoApi.getInvitePowerGettedReward(this.data.cfgId) < this.data.arriveCount) {
            NetManager.request(NetRequestConst.REQUEST_INVITE_GETPOWERREWARD, { ikey: this.data.cfgId });
            this.senderIsMe = true;
        }
    };
    InviteViewTab2ScrollItem.prototype.doGetRewardCallback = function (event) {
        var _a = event.data, ret = _a.ret, data = _a.data;
        if (ret && this.senderIsMe) {
            this.senderIsMe = false;
            var cfgInfo = Config.InvitefriendCfg.friendPower[this.data.cfgId];
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards));
            if (Api.inviteVoApi.getInvitePowerGettedReward(this.data.cfgId) >= cfgInfo.limit) {
                var x = this.getBtn.x + this.getBtn.width / 2;
                var y = this.getBtn.y + this.getBtn.height / 2;
                this.getBtn.dispose();
                var getRewardBtn = void 0;
                getRewardBtn = BaseBitmap.create("collectflag");
                getRewardBtn.x = x - getRewardBtn.width / 2;
                getRewardBtn.y = y - getRewardBtn.height / 2;
                this.addChild(getRewardBtn);
            }
            else if (Api.inviteVoApi.getInvitePowerGettedReward(this.data.cfgId) >= this.data.arriveCount) {
                App.DisplayUtil.changeToGray(this.getBtn);
            }
            this.progressLabel.text = LanguageManager.getlocal("invitePowerProgress", [
                String(Math.min(cfgInfo.limit, cfgInfo.limit - Api.inviteVoApi.getInvitePowerGettedReward(this.data.cfgId))),
                String(cfgInfo.limit)
            ]);
        }
    };
    InviteViewTab2ScrollItem.prototype.dispose = function () {
        this.getBtn = null;
        this._rewardList = null;
        this.data = null;
        this.progressLabel = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_INVITE_GETPOWERREWARD, this.doGetRewardCallback, this);
        _super.prototype.dispose.call(this);
    };
    return InviteViewTab2ScrollItem;
}(ScrollListItem));
__reflect(InviteViewTab2ScrollItem.prototype, "InviteViewTab2ScrollItem");
