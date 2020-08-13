/**
 * 好友api
 * author yanyuling
 * date 2018/06/25
 * @class FriendVoApi
 */
class FriendVoApi extends BaseVoApi
{
	private friendVo:FriendVo;
    public recommendList = []; //推荐列表
    public applyList = []; //自己的申请列表
    public shieldList = []; //屏蔽列表
	public friendList = []; //好友列表
	public receiveList = []; //被申请列表
	public sadunList = []; //被申请列表
	public _hideSadlist:boolean = false;
	public _hideFriendList:boolean = false;
	public constructor() 
	{
		super();
	}

	public isShowNpc():boolean
    {
		// return true;
		if ( GameConfig.config.friendCfg.needLv <= Api.playerVoApi.getPlayerLevel() ){
			return true;
		}
        return false;
    }

	public getGetGiftTimes()
	{
		return this.friendVo?this.friendVo.recnum:0;
	}

	public isGiftCollectEnable()
	{
		/**
		 * 达到领取上限后，不再显示红点
		 */
		if (this.getGetGiftTimes() >= GameConfig.config.friendCfg.maxGetNum)
		{
			return false;
		}
		if(this.friendVo)
		{
			for (var key in this.friendVo.info) {
				let rec = this.friendVo.info[key]["rec"];
				if(rec && rec == 1)
				{
					return true;
				}
			}
		}
		return false;
	}

	public isShowRedForItem3()
	{
		return this.friendVo&&Object.keys(this.friendVo.receive).length > 0;
	}

	public getFriendsCount()
	{
		return this.friendVo?Object.keys(this.friendVo.info).length:0;
	}
	public getApplyCount()
	{
		return this.friendVo?Object.keys(this.friendVo.apply).length:0;
	}

	public getSendTimes()
	{
		let num = 0;
		for (var key in this.friendVo.info) {
			if(this.friendVo.info[key]["send"] == 1)
			{
				num++ ;
			}
		}
		return num;
	}
	public isMaxFriendsNums()
	{
		let max = GameConfig.config.friendCfg.maxFriend;
		if(this.getFriendsCount() == max)
		{
			return true;
		}
		return false;
	}
	
	//申请数量是否已达上限
	public isMaxFriendsApply()
	{
		let max = GameConfig.config.friendCfg.maxSendRequest;
		if(this.getApplyCount() == max)
		{
			return true;
		}
		return false;
	}

	public isBatchSendGiftEnable()
	{
		for (var key in this.friendVo.info) {
			let tmpInfo = this.friendVo.info[key];
			if (tmpInfo["send"] == 0) {
				return true;
			}
		}
		return false;
	}
	//是否已申请
	public isAppliedByUid(uid:string)
	{
		for (var key in this.friendVo.apply) {
			if (key == ""+uid) {
				return true;
			}
		}
		return false;
	}
	//是否是好友
	public isFriendByUid(uid:string){
		if(this.friendVo && this.friendVo.info && this.friendVo.info[""+uid] )
		{
			return true;
		}
		return false;
	}
	//是否是亲家
	public isSadunByUid(uid:string){
		for(let unit of this.sadunList){
			if(Number(unit.uid) == Number(uid)){
				return true;
			}
		}
		return false;
	}

	public isGetGiftEnableByUid(uid:string){
		let info = this.friendVo.info[""+uid]
		if(info && info.rec == 1)
		{
			return true;
		}
		return false;
	}
	//是否可赠送
	public isSendEnable(uid:string)
	{
		let info = this.friendVo.info[""+uid];
		if(info && info.send == 0)
		{
			return true;
		}
		return false;
	}

	public isInvalidInList3(uid:string)
	{
		if(this.friendVo.receive[""+uid])
		{
			return true;
		}
		return false
	}
	//主界面是否显示红点
	public isShowRedForEnter()
	{
		return this.friendVo?(this.isShowRedForItem3() || this.isGiftCollectEnable()):Api.redpointVoApi.checkRedPoint("friend");
	}

	public showFriendsNetFlags(flag:number)
	{
		App.CommonUtil.showTip(LanguageManager.getlocal("friends_netFlag"+flag));
	}

	public hideSaduList(isHide:boolean)
	{
		this._hideSadlist = isHide;
		if(this.sadunList.length > 0){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_HIDE_FRIENDS_OR_SADUN);
		}
	}
	public isHideSaduList():boolean
	{
		return this._hideSadlist;
	}	

	public hideFriendsList(isHide:boolean)
	{
		this._hideFriendList = isHide;
		if(this.friendList.length > 0){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_HIDE_FRIENDS_OR_SADUN);
		}
	}

	public isHideFriendsList():boolean
	{
		return this._hideFriendList;
	}

	public dispose()
	{
		this.friendVo = null;
		this.recommendList = [];
		this.applyList = []; 
		this.shieldList = [];
		this.friendList = [];
		this.receiveList = [];
		this.sadunList = [];
		this._hideSadlist = false;
		this._hideFriendList = false;

		super.dispose();
	}

}