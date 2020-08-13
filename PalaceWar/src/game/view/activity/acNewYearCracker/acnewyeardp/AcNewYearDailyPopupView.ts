/**
 * 春节活动 奖励宝箱奖励预览弹板
 */
class AcNewYearDailyPopupView  extends PopupView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _rbg:BaseBitmap =null;
    private _goBtn:BaseButton =null;
    private isShowBtnType:number =0; 
    private _rewardNum:number =0;
    private _btnType:number =0;
    private _name:string="";
    private _btnTypeNum:number=0;
    private _code:string ="";
    private collectflag:BaseBitmap =null;
    public constructor() 
	{
		super();
	}

	public initView():void
	{	

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.refreshUIInfo,this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        this.isShowBtnType  = 2;
        let reward =this.param.data.reward;   
        this.isShowBtnType = this.param.data.isShowBtnType; 
        this._rewardNum =this.param.data.rewardNum;
        this._code =  this.param.data.code; 
       
        let ofy:number=91;
        let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 205;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 116-ofy;
		this._nodeContainer.addChild(bg);
        this._rbg=bg;
    
    	let rewardArr: BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(reward,true); 
        let lineNum = Math.ceil(rewardArr.length / 4);
        var  rbg:BaseBitmap = BaseBitmap.create("public_9_bg1");
		rbg.width = bg.width-20;
		rbg.height = 120*lineNum;
		rbg.x = this.viewBg.x + this.viewBg.width/2 - rbg.width/2;
        rbg.y =  bg.y + 20;
		this._nodeContainer.addChild(rbg);
        bg.height = rbg.height + 90;
        let rewardX = rbg.x + 20;
        let rewardY = rbg.y +10;
        var iconContainer:BaseDisplayObjectContainer =  new BaseDisplayObjectContainer();
        this.addChildToContainer(iconContainer);
        for (var index = 0; index < rewardArr.length; index++) {
			let icon: BaseDisplayObjectContainer = rewardArr[index];
            if (index > 0 )
            {   
                rewardX +=  (icon.width+10);
                if( index%4 == 0){
                    rewardX = rbg.x + 10;
                    rewardY += icon.height + 5;
                }
            }
			icon.x = rewardX ;
            icon.y = rewardY; 
            iconContainer.addChild(icon);  
		} 
         iconContainer.x = rbg.x+(rbg.width-iconContainer.width)/2-55-GameData.popupviewOffsetX;
         this._nodeContainer.addChild(iconContainer);
        
        this.setConfirmBtnPosition(0,0);
        this._goBtn =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.collectHandler,this);
        this._goBtn.x = rbg.x+rbg.width/2-this._goBtn.width/2;
        this._goBtn.y = rbg.y+rbg.height -this._goBtn.height/2+40;
        this._nodeContainer.addChild(this._goBtn);  

        let collectflag = BaseBitmap.create("collectflag");
        collectflag.x =215;
        collectflag.y = 167;
        collectflag.scaleX=0.6;
        collectflag.scaleY=0.6;  
        collectflag.visible =false;
        this._nodeContainer.addChild(collectflag);   
        this.collectflag = collectflag;

        // 2不显示，1可领取 3，已领取
        if(this.isShowBtnType==2)
        {
            this._goBtn.visible =false; 
            this.collectflag.visible =false;
        }
        if(this.isShowBtnType==1)
        {
            this._goBtn.setText("taskCollect");  
            this.collectflag.visible =false;
        } 
        if(this.isShowBtnType==3)
        {
            this._goBtn.visible =false;
            this.collectflag.visible =true;
        }
    }
    private collectHandler(evt:egret.TouchEvent):void
    {
        let tmpVo = <AcNewYearCrackerVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_NEWYEARCRACKER,this._code); 
        if(tmpVo.isStart)
        {
           App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GETRACKERTASKREWARDS),this.refreshUIInfo,this);
           NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETRACKERTASKREWARDS,{"activeId":AcConst.AID_NEWYEARCRACKER+"-"+this._code,"ftype":2,"diffday":tmpVo.getCurDay()});
	
        }
        else
        { 
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return; 
        }
     	
    } 

    public refreshUIInfo(evt:egret.Event):void
    { 
        if(evt.data.ret&&this._nodeContainer)
        {
            this._goBtn.visible =false;
            this.collectflag.visible =true; 
            if(evt.data.data.data.replacerewards)
            {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: evt.data.data.data.replacerewards});
            }
           
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(evt.data.data.data.rewards));
           
         
        } 
    }  

	public dispose():void
	{ 
        this._rbg =null;
        this._goBtn=null;
        this.isShowBtnType =0; 
        this._nodeContainer = null
        this._rewardNum  =0;
        this._btnType=0;
        this._name =null;
        this._btnTypeNum =null; 
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GETRACKERTASKREWARDS),this.refreshUIInfo,this);
        super.dispose();
    }
}