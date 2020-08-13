/**
 * 邀请有礼充值scrollitem
 * author 赵占涛
 * date 2018/3/6
 * @class InviteViewTab3ScrollItem
 */
class InviteViewTab3ScrollItem extends ScrollListItem
{
	//领取按钮
	private getBtn:BaseButton = null;
	//当前是第几个cell
	private _selectedIndex:number = 0;
	private _rewardList:Array<RewardItemVo>;
	private data:{cfgId:string, arriveCount:number};
	// 发送者是我
	private senderIsMe:boolean = false;
	// 可领取次数label
	private progressLabel:BaseTextField;
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:{cfgId:string, arriveCount:number})
    {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_INVITE_GETRECHARGEREWARD,this.doGetRewardCallback,this);
		this.data = data;
		// 配置信息
		let cfgInfo = Config.InvitefriendCfg.friendRecharge[data.cfgId];
		this._selectedIndex = index;
		let temW = GameConfig.stageWidth;
		let temH = 145;

		let bg = BaseBitmap.create("activity_db_01");
		bg.width = 606;
		bg.height = 172;
		bg.x = temW/2 - bg.width/2;
		bg.y = 0;
		this.addChild(bg);
		
		let bg2 = BaseBitmap.create("activity_db_02");
		bg2.width = 602;
		bg2.height = 123;
		bg2.x = temW/2 - bg2.width/2;
		bg2.y = 40;
		this.addChild(bg2);
		
		// 充值达到
		let countLabel:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("inviteFriendRecharge",[String(cfgInfo.needRecharge)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		countLabel.x = temW/2 - countLabel.width/2;
		countLabel.y = bg.y + 10;
		this.addChild(countLabel);

		let line1 = BaseBitmap.create("public_v_huawen01");
		line1.x = countLabel.x - line1.width - 10;
		line1.y =  countLabel.y;
		this.addChild(line1);
		let line2 = BaseBitmap.create("public_v_huawen01");
		line2.scaleX = -1;
		line2.x = countLabel.x + countLabel.width + + line2.width + 10;
		line2.y =  countLabel.y;
		this.addChild(line2);

		// 奖励
		let temScale = 0.8;
		let rewardVoList:Array<RewardItemVo> = GameData.formatRewardItem(cfgInfo.content);
		for(let i = 0;i<rewardVoList.length;i++)
		{
			// getRewardItemIcons
			let icon = GameData.getItemIcon(rewardVoList[i],true,true);
			icon.x = bg.x + 10 + 7*(i + 1) + icon.width*temScale*i;
			icon.y = bg2.y + bg2.height/2 - icon.height*temScale/2;
			icon.scaleX = icon.scaleY = temScale;
			this.addChild(icon);

		}

		// 进度
		let progressLabel:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("invitePowerProgress", [
			String(Math.min(cfgInfo.limit, cfgInfo.limit - Api.inviteVoApi.getInviteRechargeGettedReward(data.cfgId))), 
			String(cfgInfo.limit)
			]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		progressLabel.x = bg.x + bg.width - 70 - progressLabel.width/2;
		progressLabel.y = bg2.y + 20;
		this.addChild(progressLabel);
		this.progressLabel = progressLabel;

		// 领取或已达成按钮
		let getRewardBtn;
		if (Api.inviteVoApi.getInviteRechargeGettedReward(data.cfgId) >= cfgInfo.limit) {
			// 已达成
			getRewardBtn = BaseBitmap.create("collectflag");
		} else {
			getRewardBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.getRewardButtonHandler ,this);  
			this.getBtn = getRewardBtn;   
			getRewardBtn.name = "getRewardBtn";
			if (Api.inviteVoApi.getInviteRechargeGettedReward(data.cfgId) >= data.arriveCount) {
				App.DisplayUtil.changeToGray(getRewardBtn);
			}
		}
		getRewardBtn.x = progressLabel.x + progressLabel.width/2 - getRewardBtn.width/2;
		getRewardBtn.y = bg2.y + bg2.height - getRewardBtn.height - 20;
		this.addChild(getRewardBtn);
	}
	// 领取奖励按钮点击回调
	private getRewardButtonHandler(param:any):void
	{
		if (Api.inviteVoApi.getInviteRechargeGettedReward(this.data.cfgId) < Config.InvitefriendCfg.friendRecharge[this.data.cfgId].limit 
			&& Api.inviteVoApi.getInviteRechargeGettedReward(this.data.cfgId) < this.data.arriveCount) {
			NetManager.request(NetRequestConst.REQUEST_INVITE_GETRECHARGEREWARD,{ikey:this.data.cfgId});
			this.senderIsMe = true;
		}
	}

	
	private doGetRewardCallback(event:egret.Event):void
	{
		let {ret,data}=<{ret:boolean,data:any}>event.data;
		if (ret && this.senderIsMe) {
			this.senderIsMe = false;
			let cfgInfo = Config.InvitefriendCfg.friendRecharge[this.data.cfgId];
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards));
			if (Api.inviteVoApi.getInviteRechargeGettedReward(this.data.cfgId) >= cfgInfo.limit) {
				var x = this.getBtn.x + this.getBtn.width/2;
				var y = this.getBtn.y + this.getBtn.height/2;
				this.getBtn.dispose();

				let getRewardBtn;
				getRewardBtn = BaseBitmap.create("collectflag");
				getRewardBtn.x = x - getRewardBtn.width/2;
				getRewardBtn.y = y - getRewardBtn.height/2;
				this.addChild(getRewardBtn);
			} else if (Api.inviteVoApi.getInviteRechargeGettedReward(this.data.cfgId) >= this.data.arriveCount) {
				App.DisplayUtil.changeToGray(this.getBtn);
			}
			this.progressLabel.text = LanguageManager.getlocal("invitePowerProgress", [
				String(Math.min(cfgInfo.limit, cfgInfo.limit - Api.inviteVoApi.getInviteRechargeGettedReward(this.data.cfgId))), 
				String(cfgInfo.limit)
			]);
		}
	}

	public dispose():void
	{
		this.getBtn = null;
		this._rewardList = null;
		this.data = null;
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_INVITE_GETRECHARGEREWARD, this.doGetRewardCallback, this);
		super.dispose();
	}
}