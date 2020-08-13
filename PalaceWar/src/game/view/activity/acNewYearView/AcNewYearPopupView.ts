/**
 * 春节活动 奖励宝箱奖励预览弹板
 */
class AcNewYearPopupView  extends PopupView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _rbg:BaseBitmap =null;
    private _goBtn:BaseButton =null;
    private isShowBtnType:number =0;
    private _isshow:boolean =false;
    private _rewardNum:number =0;
    private _btnType:number =0;
    private _name:string="";
    private _btnTypeNum:number=0;
    private _code:string ="";
    public constructor() 
	{
		super();
	}

	public initView():void
	{	

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.refreshUIInfo,this);

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        let reward =this.param.data.reward; // "6_1030_1|6_1020_1|6_1030_1|6_1020_1";//this.param.data.reward; 
        this.isShowBtnType = this.param.data.isShowBtnType;
        this._isshow =this.param.data.isshow;
        this._rewardNum =this.param.data.rewardNum;
        this._code =  this.param.data.code;

         // 第一页面 礼包状态 
        if(this.param.data._name)
        {
            this._name = this.param.data._name;
            this._btnTypeNum  = this.param.data._btnTypeNum;
        }
       
        let ofy:number=91;
        let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 170;
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
        bg.height = rbg.height + 40;
        let rewardX = rbg.x + 20;
        let rewardY = rbg.y +6;
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
         iconContainer.x = rbg.x+(rbg.width-iconContainer.width)/2-55-GameData.popupviewOffsetX;//-rewardX;
         this._nodeContainer.addChild(iconContainer);
        
        this.setConfirmBtnPosition(0,0);
        this._goBtn =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.collectHandler,this);
        this._goBtn.x = rbg.x+rbg.width/2-this._goBtn.width/2;
        this._goBtn.y = rbg.y+rbg.height -this._goBtn.height/2+55;
        this._nodeContainer.addChild(this._goBtn);  

        if(this._name=="newYear1")
        {
            this._goBtn.visible =false; 
            let curr_acNewYearVo = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR,this._code);
            if(curr_acNewYearVo.getBtnType(this._rewardNum))
            {
                var collectflag = BaseBitmap.create("collectflag");
                collectflag.x =215+GameData.popupviewOffsetX+15;
                collectflag.y = 200;
                collectflag.scaleX=0.6;
                collectflag.scaleY=0.6;  
                this._nodeContainer.addChild(collectflag);   
            }
            else
            {   if(collectflag)
                {   
                    collectflag.visible= false;
                    
                } else
                {
                    //可以领取
                    if(this._btnTypeNum ==2)
                    {
                         this._goBtn.visible =true;
                         this._goBtn.setText("taskCollect");

                    }
                }
            }
            return
        }
         

        // 2不显示，1可领取 3，已领取
        if(this.isShowBtnType==2)
        {
            this._goBtn.visible =false; 
        }
        if(this.isShowBtnType==1)
        {
            this._goBtn.setText("taskCollect");  
        }

        if(AcNewYearViewTab2.dayStatus)
        {
            this._goBtn.visible=false;
        }
        else
        {   
            let tmpVo  = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR,this._code); 
            if(tmpVo.taskinfo.dayFlag==2)
            {
                this._goBtn.visible = false; 
                let collectflag = BaseBitmap.create("collectflag");
                collectflag.x =215+GameData.popupviewOffsetX+15;
                collectflag.y = 200;
                collectflag.scaleX=0.6;
                collectflag.scaleY=0.6;  
                this._nodeContainer.addChild(collectflag);  
            } 
            else if(tmpVo.taskinfo.dayFlag==1)
            {
                this._goBtn.visible = true; 
                this._goBtn.setText("taskCollect");  
            } 
            else
            {
                 this._goBtn.setEnable(true);
            }
        }  
        
    }
    private collectHandler(evt:egret.TouchEvent):void
    {
        //领取状态 第一页面礼包
        if(this._btnTypeNum==2)
        {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD,{"activeId":AcConst.AID_ACNEWYEAR+"-"+this._code,"questType":this._rewardNum+"","ftype":3});
        }
        else
        {
            if(this.isShowBtnType==1)
            {
                 NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD,{"activeId":AcConst.AID_ACNEWYEAR+"-"+this._code,"questType":1001+"","ftype":2});
            }else
            {
                 this.hide();
            }
        }
       
    } 
    public refreshUIInfo(evt:egret.Event):void
    {
    
        if(evt.data.ret)
        {
            let collectflag = BaseBitmap.create("collectflag");
            collectflag.x =215+GameData.popupviewOffsetX+15;
            collectflag.y = 185;
            collectflag.scaleX=0.6;
            collectflag.scaleY=0.6;  
            this._nodeContainer.addChild(collectflag);  
            this._goBtn.visible =false; 
           	App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(evt.data.data.data.rewards));
            if (evt.data.data.data.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: evt.data.data.data.replacerewards });
            }
        }

    }
     protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}

	public dispose():void
	{ 
        this._rbg =null;
        this._goBtn=null;
        this.isShowBtnType =0;
        this._isshow =false;
        this._nodeContainer = null
        this._rewardNum  =0;
        this._btnType=0;
        this._name =null;
        this._btnTypeNum =null; 
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.refreshUIInfo,this);
        super.dispose();
    }
}