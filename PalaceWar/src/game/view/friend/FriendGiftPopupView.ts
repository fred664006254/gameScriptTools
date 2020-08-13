/**
 * 好友礼物列表
 * author yanyuling
 * date 2018/106/22
 * @class FriendGiftPopupView
 */

class FriendGiftPopupView  extends PopupView
{
	private _nodeContainer:BaseDisplayObjectContainer;
    private _scrollView:ScrollList;
    private _friendsTxt:BaseTextField;
    private _isGetEnable:boolean = false;
    private _dataList = [];
	public constructor() {
		super();
	}

	public initView():void
	{	
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_UNFRIEND),this.doRefreshList,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_RECEIVEALL),this.bigBtnCallBack,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_RECEIVEGIFT),this.receiveGiftCallBack,this);

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
       
        let bg1= BaseBitmap.create("public_9_bg32");
        bg1.width = 530;
        bg1.height = 597;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = 5;
        this._nodeContainer.addChild(bg1);

        let bottombg =  BaseBitmap.create("public_9_cell_title");
        bottombg.width = bg1.width;
        bottombg.x = bg1.x;
        bottombg.y = bg1.y + bg1.height - bottombg.height;
        this._nodeContainer.addChild(bottombg);

        this._friendsTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WHITE);
		this._friendsTxt.x = this.viewBg.width/2;
		this._friendsTxt.y = bottombg.y + 3;
		this._nodeContainer.addChild(this._friendsTxt);

        let rect = new egret.Rectangle(0,0,520,bg1.height -  10-bottombg.height);
        let dataList = [];
        let scrollView = ComponentManager.getScrollList(FriendScrollItem,dataList,rect);
        scrollView.x = bg1.x + 5;
        scrollView.y = bg1.y + 5;
        this._nodeContainer.addChild(scrollView);
       	scrollView.setEmptyTip(LanguageManager.getlocal("friends_emptyTip2") )
        this._scrollView = scrollView;
        this.doRefreshList();

        let bigBtn = ComponentManager.getButton("friend_bigBtn","friendsBtnTxt11",this.bigBtnHandler,this);
        bigBtn.x = this.viewBg.width/2 - bigBtn.width/2;
        bigBtn.y = bottombg.y + 40;
        bigBtn.name = "collectBtn";
        this._nodeContainer.addChild(bigBtn);

    }

    protected receiveGiftCallBack(data: egret.Event): void
    {
        if(data.data.ret){
            let rData = data.data.data;
            if(rData.ret == 0)
            {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_REFRESH_GIFTRED); //刷新领取礼物按钮的红点
                let rewards = rData.data.rewards;
                let rewardList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rewardList);
                egret.Tween.get(this,{loop:false}).wait(150).call(this.doRefreshList,this);
            }
        }
    }

    protected bigBtnCallBack(data: egret.Event): void
    {
        if(data.data.ret){
            let rData = data.data.data;
            if(rData.ret == 0)
            {
                let friendFlag = rData.data.friendFlag;
                if(friendFlag){
                    Api.friendVoApi.showFriendsNetFlags(friendFlag);
                    return;
                }
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_REFRESH_GIFTRED); //刷新领取礼物按钮的红点
                let rewards = rData.data.rewards;
                if(rewards){
                    let rewardList = GameData.formatRewardItem(rewards);
                    App.CommonUtil.playRewardFlyAction(rewardList);
                    // rewards = rewards.split("_");
                    // rewards[2] = "1";
                    // let newRweards = rewards.join("_");
                    // for (var index = 0; index < this._dataList.length; index++) {
                    //     let rewardList = GameData.formatRewardItem(newRweards);
                    //     let nameStr = this._dataList[index].name
                    //     egret.Tween.get(this,{loop:false}).wait(150).call(()=>{
                    //          App.CommonUtil.playRewardFlyAction(rewardList);
                    //          App.CommonUtil.showTip(LanguageManager.getlocal("friends_sendtip1",[nameStr]));
                    //     },this);
                    // }
                 }
                 this.doRefreshList();
            }
        }
    }
    protected bigBtnHandler()
    {
        if(!this._isGetEnable){
			App.CommonUtil.showTip(LanguageManager.getlocal("friends_emptyTip2"));
			return;
		}
        if (Api.friendVoApi.getGetGiftTimes() >= GameConfig.config.friendCfg.maxGetNum)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("friends_netFlag5"));
			return;
		}
        NetManager.request(NetRequestConst.REQUEST_FRIEND_RECEIVEALL,{});
    }

    protected doRefreshList()
	{
        let uiType = null;
        this._isGetEnable = false;
		if(this._scrollView){
            this._dataList = [];
            for (var index = 0; index < Api.friendVoApi.friendList.length; index++) {
                let tmpData = Api.friendVoApi.friendList[index];
                if(Api.friendVoApi.isGetGiftEnableByUid(tmpData.uid)){
                    // tmpData["uiType"] = FriendScrollItem.UITYPE5;
                    uiType = FriendScrollItem.UITYPE5;
                    this._dataList.push(tmpData);
                }
            } 
            if(this._dataList.length > 0)
            {
                this._isGetEnable = true;
            }
			this._scrollView.refreshData(this._dataList,{uiType:uiType});
		}

        let maxGetNum = GameConfig.config.friendCfg.maxGetNum;
        let getNums = Api.friendVoApi.getGetGiftTimes();
        this._friendsTxt.text = LanguageManager.getlocal("friends_collectNumTxt",[getNums+ "/" + maxGetNum]);
        this._friendsTxt.anchorOffsetX = this._friendsTxt.width/2;
    }

    protected getShowHeight():number
	{
		return 763;
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}
    public dispose()
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_RECEIVEGIFT),this.receiveGiftCallBack,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_UNFRIEND),this.doRefreshList,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_RECEIVEALL),this.bigBtnCallBack,this);
        this._nodeContainer =null;
        this._scrollView.dispose();
        this._scrollView = null;
        this._friendsTxt = null;

        super.dispose()
    }
}