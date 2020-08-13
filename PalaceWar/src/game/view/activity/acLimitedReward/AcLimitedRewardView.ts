/**
 * 限时活动奖励
 * author dmj
 * date 2017/11/07
 * @class AcLimitedRewardView
 */
class AcLimitedRewardView extends AcCommonView
{
	private _scrollList:ScrollList;
	private _activeCfgList:Array<AcBaseVo> = [];
	private _getAllRewardBtn:BaseButton = null;
	private _actTimeArr:number[] =[];
	private _isGetAll:boolean = false;

	public constructor() 
	{
		super();
	}

	protected getContainerY():number
	{
		return 14;
	}

	public initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD),this.useCallback,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_LIMITREWARD_ITEM_CLICK,this.refreshList,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETALLLIMITEDREWARD, this.getAllRewardCallback, this);
		this.refreshList();
		// let cfg:Config.AcCfg.LimitedRewardCfg = <Config.AcCfg.LimitedRewardCfg>this.acVo.config;
		// this._activeCfgList = cfg.getLimitedRewardItemList();
		let temW = GameConfig.stageWidth - 10;
		let temH = GameConfig.stageHeigth - 160;
		let desc:string=this.acVo&&this.acVo.checkIsHasExtraTime()?"limitedRewardDesc":"limitedRewardDesc_old";
		let descTF = ComponentManager.getTextField(LanguageManager.getlocal(desc),TextFieldConst.FONTSIZE_TITLE_SMALL);
		descTF.x = GameConfig.stageWidth/2 - descTF.width/2;
		descTF.y = 5;
		this.addChildToContainer(descTF);

		let bg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = temW;
		bg.height = temH;
		bg.x = 5;
		bg.y = descTF.y + descTF.height + 15;
		this.addChildToContainer(bg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,temW - 10,temH - 10 - 80);
		this._scrollList = ComponentManager.getScrollList(AcLimitedRewardScrollItem,this._activeCfgList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(10,bg.y + 10);


		if (Api.playerVoApi.getPlayerVipLevel()>=3 || Api.playerVoApi.getPlayerLevel()>=10)
		{
			//一键领取
			let getAllRewardBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "acLimitedRewardGetAll", this.getAllRewardBtnClick, this);
			getAllRewardBtn.setPosition(bg.x + bg.width/2 - getAllRewardBtn.width/2, bg.y + bg.height - 40 - getAllRewardBtn.height/2);
			this.addChildToContainer(getAllRewardBtn);
			this._getAllRewardBtn = getAllRewardBtn;
			if (this.isCanGetAllReward()){
				this._getAllRewardBtn.setGray(false);
			}
			else{
				this._getAllRewardBtn.setGray(true);
			}
		}
		else
		{
			let allText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
			allText.text = LanguageManager.getlocal("limitedGetAllTip");
			allText.setPosition(bg.x + bg.width/2 - allText.width/2, bg.y + bg.height - 35 - allText.height/2);
			this.addChildToContainer(allText);
		}
		
	}

	private getAllRewardBtnClick():void{
		if (this.isCanGetAllReward()){
			if (this._isGetAll){
				return;
			}
			this._isGetAll = true;
			let uid = Api.playerVoApi.getPlayerID();
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETALLLIMITEDREWARD,{"uid": uid});
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal("acLimitedRewardGetAllTip"));
		}
	}

	private getAllRewardCallback(evt:egret.Event):void{
		this._isGetAll = false;
		if (!evt.data.ret){
			return ;
		}
		let rData = evt.data.data.data;
		let rewardList = GameData.formatRewardItem(rData.rewards);
		this._actTimeArr = App.CommonUtil.playRewardFlyAction(rewardList);
		if (rData.replacerewards) {
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
		}
		if(this._scrollList)
		{
			this._scrollList.refreshData(this._activeCfgList);
		}


		if (this._getAllRewardBtn)
		{
			if (this.isCanGetAllReward()){
				this._getAllRewardBtn.setGray(false);
			}
			else{
				this._getAllRewardBtn.setGray(true);
			}
		}
		
	}

	private isCanGetAllReward():boolean{
		if (this._activeCfgList.length > 0){
			for (let i=0; i < this._activeCfgList.length; i++){
				let vo = this._activeCfgList[i];
				if (vo && vo.isStart && vo.isShowRedDot){
					return true;
				}
			}
		}
		return false;
	}

	protected getRuleInfo():string
	{
		if(this.acVo&&this.acVo.checkIsHasExtraTime())
		{
			return super.getRuleInfo();
		}
		return null;
	}

	private refreshList():void
	{
		let list:AcBaseVo[] = Api.acVoApi.getActivityVoListByAid(this.aid);
		list.sort((a:AcLimitedRewardVo,b:AcLimitedRewardVo)=>{
			// 有红点的在前，没红点的在后
			if (a.red != b.red) {
				return a.red?-1:1;
			}
			return a.code - b.code;
		});
		this._activeCfgList.length=0;
		for (const key in list) {
			if (list.hasOwnProperty(key)) {
				const vo = list[key];
				if(vo&&vo.isStart)
				{
					this._activeCfgList.push(vo);
				}
				
			}
		}
		if(this._scrollList)
		{
			this._scrollList.refreshData(this._activeCfgList);
		}
	}


	protected getTitleStr():string
	{
		return "ac"+App.StringUtil.firstCharToUper(this.aid)+"_Title";
	}


	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"progress6_bg","dinner_rankbg","dinnerrankpopupview","dinner_rank_titlebg","achievement_state3",
					"common_titlebg","signin_had_get"
					]);
	}

	private useCallback(event:egret.Event):void
	{
		for(let i=0;i<this._activeCfgList.length;i++)
		{
			let acLimitedRewardScrollItem = <AcLimitedRewardScrollItem>this._scrollList.getItemByIndex(i);
			if(acLimitedRewardScrollItem)
			{
				acLimitedRewardScrollItem.checkBtnState();
			}
		}
		if (this._getAllRewardBtn)
		{
			if (this.isCanGetAllReward()){
				this._getAllRewardBtn.setGray(false);
			}
			else{
				this._getAllRewardBtn.setGray(true);
			}
		}
		
	}

	private tick():void
	{

	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD),this.useCallback,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LIMITREWARD_ITEM_CLICK,this.refreshList,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETALLLIMITEDREWARD, this.getAllRewardCallback, this);
		this._scrollList = null;
		this._activeCfgList = [];
		this._getAllRewardBtn = null;
		if (this._actTimeArr.length > 0){
			for (let i=0; i < this._actTimeArr.length; i++){
				egret.clearTimeout(this._actTimeArr[i]);
			}
		}
		this._actTimeArr = [];
		this._isGetAll = false;
		super.dispose();
	}
}