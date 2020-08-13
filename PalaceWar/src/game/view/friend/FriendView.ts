/**
 * 好友
 * author yanyuling
 * date 2018/06/21
 * @class FriendView
 */

class FriendView  extends CommonView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	private _bottomNodeList = [];
	private _innerbg:BaseBitmap ;
	private _tabbarGroup:TabBarGroup;
	public constructor() {
		super();
	}

	protected get uiType():string
	{
		return "2";
	}

	protected getContainerY():number
	{
		return 14;
	}

	protected getBigFrame():string
	{	
		return null;
	}

	public initView():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_REFRESH_LISTITEM3,this.refreshGroupRedPoints,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_SWITCH_TAB,this.switchTabHandler,this);
		if(Api.switchVoApi.checkOpenNewInvite()){
			NetManager.request(NetRequestConst.REQUEST_NEWINVITE_GETINFO,{
			});
		}
		if(Api.switchVoApi.checkOpenPlayerComeBack()){
			NetManager.request(NetRequestConst.REQUEST_REBACK_GETINFO,{
			});
		}
		
		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);
		this._innerbg = BaseBitmap.create("public_9_bg23");
		this._innerbg.width = GameConfig.stageWidth-10;
		this._innerbg.x = 5;
		this._nodeContainer.addChild(this._innerbg);

		let tabbg = BaseBitmap.create("commonview_tabbar_bg2");
		this._nodeContainer.addChild(tabbg);

		let tabName = ["friendsTabBtn1","friendsTabBtn2","friendsTabBtn3","friendsTabBtn4"];
		let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB2,tabName,this.tabBtnClickHandler,this);
       	tabbarGroup.setSpace(0);
		tabbarGroup.anchorOffsetX = tabbarGroup.width/2;
		tabbarGroup.x = GameConfig.stageWidth/2;
        tabbarGroup.y = -10;
		tabbarGroup.name = "tabbarGroup";
		this._tabbarGroup = tabbarGroup;
		tabbg.y = tabbarGroup.y+6;
        this._nodeContainer.addChild(tabbarGroup);
		this._innerbg.y = tabbarGroup.y + tabbarGroup.height+5;
		this._innerbg.height = GameConfig.stageHeigth - this.container.y - this._innerbg.y - 30;
		this._nodeContainer.y-=10;

		let tarHeight = GameConfig.stageHeigth - this.container.y - tabbarGroup.height - tabbarGroup.y;
		let friendsItem1 = new FriendItem1(tarHeight);
		let friendsItem2 = new FriendItem2(tarHeight);
		let friendsItem3 = new FriendItem3(tarHeight);
		let friendsItem4 = new FriendItem4(tarHeight);

		friendsItem1.y = tabbarGroup.y+tabbarGroup.height+5;
		friendsItem2.y = friendsItem1.y ;
		friendsItem3.y = friendsItem1.y ;
		friendsItem4.y = friendsItem1.y ;

		this._nodeContainer.addChild(friendsItem1);
		this._nodeContainer.addChild(friendsItem2);
		this._nodeContainer.addChild(friendsItem3);
		this._nodeContainer.addChild(friendsItem4);

		this._bottomNodeList.push( friendsItem1 );
		this._bottomNodeList.push( friendsItem2 );
		this._bottomNodeList.push( friendsItem3 );
		this._bottomNodeList.push( friendsItem4 );
		this.tabBtnClickHandler({index:0});

		this.refreshGroupRedPoints();
	}

	protected refreshGroupRedPoints()
	{
		//请求列表
		if(Api.friendVoApi.isShowRedForItem3()){
			this._tabbarGroup.addRedPoint(2);
			this._tabbarGroup.setRedPos(2,121,0);
		}else{
			this._tabbarGroup.removeRedPoint(2);
		}
	}
	protected switchTabHandler(event: egret.Event)
	{
		this.tabBtnClickHandler(event.data)
		this._tabbarGroup.selectedIndex = event.data.index;
	}
	protected tabBtnClickHandler(params:any)
    {
		for (var index = 0; index < this._bottomNodeList.length; index++) {
			this._bottomNodeList[index].visible = false;
		}
		let tarIdx = params.index;
		this._bottomNodeList[tarIdx].visible = true;
		if(tarIdx <= 2)
		{
			this._innerbg.height = GameConfig.stageHeigth - this.container.y - this._innerbg.y - 80;
		}else{
			this._innerbg.height = GameConfig.stageHeigth - this.container.y - this._innerbg.y - 30;
		}
    }


	protected receiveData(data: { ret: boolean, data: any }): void
    {
		if(data.ret){
			let rData = data.data;
			if(rData.ret == 0)
			{
				let cmd = rData.cmd;
				if(cmd == NetRequestConst.REQUEST_SADUN_GETFRIENDLISTINFO){
					Api.friendVoApi.sadunList = rData.data.sadunList;
				}
			}
		}
    }
	protected getRequestData():{requestType:string,requestData:any} 
	{
		if(Api.switchVoApi.checkopenSadun()){
			return {requestType:NetRequestConst.REQUEST_SADUN_GETFRIENDLISTINFO,requestData:{}};
		}
		return null;
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "friends_applyflag","friends_arrow1","friends_arrow2",
			"friends_progress","friends_progressbg","progress3_bg",
			"arena_bottom","friends_seprate_bg","friend_bigBtn_down","friend_bigBtn","friends_sendflag",
			"commonview_tabbar_bg2"
		]);
	}

	public hide()
	{
		Api.friendVoApi.hideSaduList(false);
		Api.friendVoApi.hideFriendsList(false);
		super.hide();
	}
	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_REFRESH_LISTITEM3,this.refreshGroupRedPoints,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_SWITCH_TAB,this.switchTabHandler,this);

		this._nodeContainer = null;
		this._bottomNodeList = [];
		this._innerbg = null;
		this._tabbarGroup = null;

		super.dispose();
	}
}