/**
 * 好友申请列表
 * author yanyuling
 * date 2018/106/22
 * @class FriendApplyPopupView
 */

class FriendApplyPopupView  extends PopupView
{
	private _nodeContainer:BaseDisplayObjectContainer;
    private _scrollView:ScrollList;
    private _friendsTxt:BaseTextField;
    private _applyList = [];
	public constructor() {
		super();
	}

	public initView():void
	{	
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_CANCELAPPLY),this.applyCancelCallback,this);

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
       
       let bg1= BaseBitmap.create("public_9_bg32");
        bg1.width = 530;
        bg1.height = 650;
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
       	scrollView.setEmptyTip(LanguageManager.getlocal("friends_emptyTip4") )
        this._scrollView = scrollView;
        this.doRefreshList();
    }

    protected doRefreshList()
	{
        if(this._scrollView){
            let uiType = null;
            let dataList = [];
            for (var index = 0; index < this._applyList.length; index++) {
                let tmpData = this._applyList[index];
                if(Api.friendVoApi.isAppliedByUid(tmpData.uid)){
                    // tmpData["uiType"] = FriendScrollItem.UITYPE6;
                    uiType = FriendScrollItem.UITYPE6;
                    dataList.push(tmpData);
                }
            }
			this._scrollView.refreshData(dataList,{uiType:uiType});
		}

        let maxSendRequest = GameConfig.config.friendCfg.maxSendRequest;
		this._friendsTxt.text = LanguageManager.getlocal("friends_applyNumTxt",[ Api.friendVoApi.getApplyCount() + "/" + maxSendRequest]); 
        this._friendsTxt.anchorOffsetX = this._friendsTxt.width/2;
    }
    protected getShowHeight():number
	{
		return 735;
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}

    protected applyCancelCallback(data: egret.Event): void
    {
        if(data.data.ret){
            let rData = data.data.data;
            if(rData.ret == 0)
            {
                // this.doRefreshList();
                 egret.Tween.get(this,{loop:false}).wait(150).call(this.doRefreshList,this);
            }
        }
    }
    protected receiveData(data: { ret: boolean, data: any }): void
    {
        if(data.ret){
            let rData = data.data;
            if(rData.ret == 0)
            {
                let cmd = rData.cmd;
                if(cmd == NetRequestConst.REQUEST_FRIEND_APPLYLIST){
                    let applyList = rData.data.applyList;
                    this._applyList = applyList ;
                    Api.friendVoApi.applyList = applyList;
                }
            }
        }
    }

    protected getRequestData():{requestType:string,requestData:any} 
	{
		return {requestType:NetRequestConst.REQUEST_FRIEND_APPLYLIST,requestData:{}};
	}
    public dispose()
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_CANCELAPPLY),this.applyCancelCallback,this);
        this._nodeContainer =null;
        this._scrollView = null;
        this._friendsTxt = null;
        this._applyList = null;

        super.dispose()
    }
}