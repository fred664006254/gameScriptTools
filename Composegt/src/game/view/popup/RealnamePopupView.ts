class RealnamePopupView  extends PopupView
{
    private rewardArrList:Array<any> =[];
    private _goBtn:BaseButton =null;
    private touchBoo:Boolean =false;
    private isRealNameBoo:boolean =false;
    public constructor() 
	{
		super();
	}

	public initView():void
	{	
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETCERTIFICATION),this.refreshUIInfo,this);	
        let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 528;
		bg.height = 230; 
        bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 20
        this.addChildToContainer(bg); 
 
        let re_data =  Config.GameprojectCfg.rewardFKYLC3; 
        this.rewardArrList = GameData.formatRewardItem(re_data);
        let itemContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
        let l:number=this.rewardArrList.length;
        let scaleNum:number=1; 
        var newnum :number =0;
        for(let i:number=0;i<l;i++)
        {
            let icon:BaseDisplayObjectContainer=GameData.getItemIcon(this.rewardArrList[i]);
            var num= i%5;
            icon.setPosition((icon.width+30)*num,(icon.height+20)*Math.floor(i/5));
            icon.scaleX =scaleNum;
            icon.scaleY =scaleNum;
            itemContainer.addChild(icon);
            newnum =(icon.height+20)*Math.floor(i/5);
        }
        itemContainer.setPosition(this.viewBg.x+(this.viewBg.width-itemContainer.width)/2,80);
        this.addChildToContainer(itemContainer);

        this._goBtn =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"realnameBtn",this.collectHandler,this);
        this._goBtn.x = bg.x+bg.width/2-this._goBtn.width/2;
        this._goBtn.y = bg.y+bg.height -this._goBtn.height/2+55;
        this.addChildToContainer(this._goBtn);  
        
        this.restBtnType();
    }
    private restBtnType():void
    {
        //实名认证是否认证过   ture已经认证
        RSDKHelper.ifRealNameAuth((result)=>{
            if(result)
            { 
                this.isRealNameBoo = result;
                NetManager.request(MessageConst.MESSAGE_REALNAME,null); 
            }
        }) 

        if(Api.otherInfoVoApi.certification())
        {
            let collectflag = BaseBitmap.create("collectflag");
            collectflag.x =this._goBtn.x+20;
            collectflag.y = this._goBtn.y; 
            collectflag.scaleX=0.6;
            collectflag.scaleY=0.6; 
            this.addChildToContainer(collectflag);  
            this._goBtn.visible =false; 
            return;
        }

        if(this.isRealNameBoo)
        {
             this._goBtn.visible =true;
             this._goBtn.setText("taskCollect"); 
        } 
    }

    private checkRealName():void
    { 
        RSDKHelper.getRealNameAuth((data)=>{
            if(data=="0"||data=="2")
            {
                 NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETCERTIFICATION,null); 
                 NetManager.request(MessageConst.MESSAGE_REALNAME,null);  
            }
        }) 
    }
 
    private collectHandler(evt:egret.TouchEvent):void
    {   
        if(this.isRealNameBoo)
        {
             NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETCERTIFICATION,null); 
             NetManager.request(MessageConst.MESSAGE_REALNAME,null);  
        }
        else
        {
            this.checkRealName();
        }
    } 
    public refreshUIInfo(evt:egret.Event):void
    {
        if(evt.data.ret)
        {
            this.restBtnType();
           	App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(evt.data.data.data.rewards)); 
        } 
    } 

	public dispose():void
	{ 
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETCERTIFICATION),this.refreshUIInfo,this);	
        this.touchBoo=false;
        this._goBtn=null;
        super.dispose();
    }
}