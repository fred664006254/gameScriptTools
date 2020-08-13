class AcIcebreakingGiftView extends PopupView
{
    protected viewBg:BaseLoadBitmap;
    private residueTitle:BaseBitmap = null;
    private residueCount:BaseBitmapText|BaseTextField = null;
    private title:BaseBitmap = null;
    
    

    
    private goldbg:BaseBitmap = null;
    private goldText:BaseBitmapText|BaseTextField = null;
    private descText:BaseTextField  = null;
    private timerText:BaseTextField = null;
    

    //抢按钮
	private goButton:BaseButton = null;
    //领取按钮
    private getButton: BaseButton = null;
    private circle:BaseBitmap = null;

    private bottomText:BaseTextField = null;

    private sendgemnum:number = 0;
    private loginfo:any[] = null;
    private isRefreshData = false;

	// private aid:string = null;

    private _isClose = false;
    
    private _vo = null;

	public constructor() 
	{
		super();
		// this.aid=App.StringUtil.firstCharToLower(this.getClassName().replace("Ac","").replace("View",""));
	}
    private get vo() : AcIcebreakingGiftVo{
        return <AcIcebreakingGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);

    }
    private  get cfg ():Config.AcCfg.IcebreakingGiftCfg
    {
		let cfg = <Config.AcCfg.IcebreakingGiftCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		return cfg;
	}
    private get aid():string
    {
        return App.StringUtil.firstCharToLower(this.getClassName().replace("Ac","").replace("View",""));
    }
	protected get code():string
	{
		if(this.param && this.param.data){
			return this.param.data;
		} else {
			return "";
		}
		
	}
	protected initView():void
	{	
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACICEBREAKINGGIFT_REFRESHVO,this.refreshUI,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETICEBREAKINGGIFT),this.goBtnCallback,this);

        this._isClose = this.vo.isClose;

        //剩余元宝
        this.residueTitle = BaseBitmap.create("icebreakinggift_count");
        this.addChildToContainer(this.residueTitle);

        //剩余元宝数量
        this.residueCount = ComponentManager.getBitmapText("0".toString(),"activity_fnt");
        this.residueCount.setScale(0.8);
        this.addChildToContainer(this.residueCount);
        
        //恭喜大人抢到
        this.title = BaseBitmap.create("icebreakinggift_title");
        this.title.x = this.viewBg.width/2 - this.title.width/2;
        this.title.y = this.viewBg.y + 80;
        this.addChildToContainer(this.title);
        
        //元宝背景
        this.goldbg = BaseBitmap.create("icebreakinggift_goldbg1");
        this.goldbg.x =  this.viewBg.width/2 - this.goldbg.width/2;
        this.goldbg.y = this.viewBg.y + 185;
        this.addChildToContainer(this.goldbg);

        //元宝数量
        this.goldText = ComponentManager.getBitmapText("0".toString(),"activity_fnt");  
        this.goldText.x = this.goldbg.x + 150;
        this.goldText.y = this.goldbg.y +35;
        this.addChildToContainer(this.goldText);

		// 抢按钮
		this.goButton = ComponentManager.getButton("icebreakinggift_getbtn",null,this.goHandler,this);
		this.goButton.x = this.viewBg.width / 2 - this.goButton.width/2;
		this.goButton.y = this.viewBg.y + 255;
		this.addChildToContainer(this.goButton);
        
        this.circle = BaseBitmap.create("icebreakinggift_circle");
        this.circle.anchorOffsetX = this.circle.width/2;
        this.circle.anchorOffsetY = this.circle.height/2;
        this.circle.x = this.goButton.x + this.goButton.width/2;
        this.circle.y = this.goButton.y + this.goButton.height/2 - 10;
        egret.Tween.get(this.circle,{loop:true}).to({rotation:this.circle.rotation-360},10000);
        this.addChildToContainer(this.circle)

        // 领取按钮
		this.getButton = ComponentManager.getButton("firstchargebutton01","acIcebreakingGiftGetBtn",this.getHandler,this);
		this.getButton.x = this.viewBg.width / 2 - this.getButton.width/2;
		this.getButton.y = this.viewBg.y + 355;
        this.getButton.setColor(TextFieldConst.COLOR_BROWN);
		this.addChildToContainer(this.getButton);

        //描述
        this.descText = ComponentManager.getTextField(LanguageManager.getlocal("acIcebreakingGiftDesc"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.descText.textAlign = egret.HorizontalAlign.CENTER;
        this.descText.lineSpacing = 5;
        this.descText.x = this.viewBg.width / 2 - this.descText.width/2;
        this.descText.y = this.viewBg.y + 420;
        this.addChildToContainer(this.descText);

        let t = this.vo.et - GameData.serverTime;
        if(t < 0){
            t = 0;
        }
        let timeTxt = App.DateUtil.getFormatBySecond(t,8);
        this.timerText = ComponentManager.getTextField(LanguageManager.getlocal("acIcebreakingGiftTime",[timeTxt]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.timerText.x =  this.viewBg.width/2 - this.timerText.width/2;
        this.timerText.y = this.viewBg.y + 484;
        this.addChildToContainer(this.timerText);
   
        this.bottomText = ComponentManager.getTextField(LanguageManager.getlocal("acIcebreakingGiftBottom"),24,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.bottomText.x =  this.viewBg.width/2 - this.bottomText.width/2;
        this.bottomText.y = this.viewBg.y + 770;
        this.addChildToContainer(this.bottomText);
        this.initScroll();
        this.refreshUI();
	}
    protected getRequestData():{requestType:string,requestData:any}
	{	
	
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_ICEBREAKINGGIFTINDEX,requestData:{activeId: this.aid+"-"+this.code}};
	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if(data.ret && data.data.ret == 0){
            

            this.loginfo = data.data.data.loginfo;
            this.sendgemnum = Number(data.data.data.sendgemnum);
            if(this.isRefreshData){
                this.isRefreshData = false;
                if(!this.sendgemnum){
                    this.sendgemnum = 0;
                }
                let count = this.cfg.getTotalGem() >= this.sendgemnum? this.cfg.getTotalGem() - this.sendgemnum:0;
                this.residueCount.text = count + "";
            }
            
        }

        
        
	}
    private initScroll():void
    {
		let content = new BaseDisplayObjectContainer();
		content.width = 450;
		content.height = 210;
		let alphabg =BaseBitmap.create("public_alphabg");
		alphabg.width = content.width;
		alphabg.height = content.height;
		content.addChild(alphabg);
		
		let infoObj = null;
		let startY = 20;

        if(!this.loginfo ||!this.loginfo.length ){
            let emptyText = ComponentManager.getTextField(LanguageManager.getlocal("acIcebreakingGiftEmpty"),20,0xe7d98f);
            emptyText.x = content.width/2 - emptyText.width/2;
            emptyText.y = content.height/2 - emptyText.height/2;
            content.addChild(emptyText);
        }

		for(let i = 0;i < this.loginfo.length; i ++){
			infoObj = this.loginfo[i];

            let nameText = ComponentManager.getTextField(LanguageManager.getlocal("acIcebreakingGiftLoop",[infoObj["lname"],infoObj["gemnum"].toString()]),20,0xe7d98f);
            nameText.x = 40;
            nameText.y = startY + 30 * i;
			content.addChild(nameText);

		}

		if(startY + 30 * this.loginfo.length + 30 > 220){
			content.height = startY + 30 * this.loginfo.length + 30;
			alphabg.height = content.height;
		}

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,450,220);
		let c = ComponentManager.getScrollView(content,rect);
		c.x = this.viewBg.width/2 - c.width/2;
		c.y = this.viewBg.y + 550;
		c.bounces = false;
		c.horizontalScrollPolicy = "off";
		this.addChildToContainer(c);
    }
    private refreshUI():void
    {
       
        this._isClose = this.vo.isClose;
       
        if(!this.sendgemnum){
            this.sendgemnum = 0;
        }
        let count = this.cfg.getTotalGem() >= this.sendgemnum? this.cfg.getTotalGem() - this.sendgemnum:0;
        this.residueCount.text = count + "";
        this.residueTitle.x = GameConfig.stageWidth / 2 - (this.residueTitle.width +10+ this.residueCount.width) / 2;
        this.residueCount.x = this.residueTitle.x + this.residueTitle.width + 10;
        
        let n = this.vo.getAddgem();
        n = n >= 0?n:0;
        this.goldText.text = n+"";

        if(this._isClose){
            this.viewBg.setload("icebreakinggift_close1");
            this.residueTitle.y = this.viewBg.y + 145;
            this.residueCount.y = this.residueTitle.y + this.residueTitle.height/2 - this.residueCount.height * this.residueCount.scaleY/2 + 5;
            this.title.visible = false;
            this.goldbg.visible = false;
            this.goldText.visible = false;
            this.goButton.visible = true;
            this.circle.visible = true;
            this.getButton.visible = false;
            this.descText.visible = false;

            this.closeBtn.x = this.viewBg.width - this.closeBtn.width;
            this.closeBtn.y = this.viewBg.y + 100;

            if(count == 0){
                this.goButton.setEnable(false);
                this.circle.visible = false;
            }
        } else {

            this.viewBg.setload("icebreakinggift_open1");
            this.residueTitle.y = this.viewBg.y + 0;
            this.residueCount.y = this.residueTitle.y + this.residueTitle.height/2 - this.residueCount.height * this.residueCount.scaleY/2 + 5;
            this.title.visible = true;
            this.goldbg.visible = true;
            this.goldText.visible = true;
            this.goButton.visible = false;
            this.circle.visible = false;
            this.getButton.visible = true;
            this.descText.visible = true;


            if(this.vo.btnStatus == 0){
                this.getButton.setEnable(true);
                this.getButton.setText("acIcebreakingGiftGetBtn");
            } else if(this.vo.btnStatus==1){
                this.getButton.setEnable(true);
                this.getButton.setText("acIcebreakingGiftGetBtn");
            } else {
                this.getButton.setEnable(false);
                this.getButton.setText("acIcebreakingGiftGetOverBtn");
            }

            this.closeBtn.x = this.viewBg.width - this.closeBtn.width;
            this.closeBtn.y = this.viewBg.y + 43;
        }

    }

	protected initBg():void
    {
        this.viewBg = BaseLoadBitmap.create("icebreakinggift_close1");
  
        this.viewBg.width = 640;
        this.viewBg.height = 896;
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);
    }
	/**
	 * 重新一下关闭按钮 
	 * 仅适用于新的分享
	 */
	protected getCloseBtnName():string
	{
		return "btn_lantern";
	}

	/**
	 * 重置背景的高度 主要设置 btn的位置
	 * 仅适用于新的分享
	 */
	protected resetBgSize():void
	{   
        this.closeBtn.setScale(0.9);
        if(this._isClose){
            this.closeBtn.x = this.viewBg.width - this.closeBtn.width;
            this.closeBtn.y = this.viewBg.y + 100;
        } else {

            this.closeBtn.x = this.viewBg.width - this.closeBtn.width;
            this.closeBtn.y = this.viewBg.y + 43;
        }
        
	}

	protected getTitleStr():string
	{
		return null;
	}
	
	private goHandler():void
	{		
        let t = this.vo.et - GameData.serverTime;
        if(t<0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acChristmasActiveOver"));
            return;
        }
        if(!this.sendgemnum){
            this.sendgemnum = 0;
        }
        let count = this.cfg.getTotalGem() >= this.sendgemnum? this.cfg.getTotalGem() - this.sendgemnum:0;

        if(count <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acIcebreakingGiftZero"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETICEBREAKINGGIFT,{activeId : this.aid+"-"+this.code, opentype:1});
	}
    private goBtnCallback(event:egret.Event):void{
        
        
        if(event.data.data.ret == 0){
            let num = event.data.data.data.addgem;
    
            let n = num&&num>=0?num:0;

            this.vo.setAddgem(n);
            this.goldText.text = n+"";


            let err = event.data.data.data.errorTag ? Number(event.data.data.data.errorTag) : 0;
            if(err == 1){
                App.CommonUtil.showTip(LanguageManager.getlocal("acIcebreakingGiftZero"));
                this.isRefreshData = true;
                let equestData=this.getRequestData();
                this.request(equestData.requestType,equestData.requestData);
            } else {
                //0-->跳转充值 1-->可领取 2-->已经领取
                if(this.vo.btnStatus == 0){
                    ViewController.getInstance().openView(ViewConst.POPUP.ACICEBREAKINGGIFTRESULTVIEW,{aid: this.aid,code:this.code,parentNode: this});

                } else if(this.vo.btnStatus==1){
                    App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETICEBREAKINGGIFT),this.goBtnCallback,this);
                    App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETICEBREAKINGGIFT),this.getBtnCallback,this);

                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETICEBREAKINGGIFT,{activeId : this.aid+"-"+this.code, opentype:2});
                } 
            }

            
            // ViewController.getInstance().openView(ViewConst.POPUP.ACICEBREAKINGGIFTRESULTVIEW,{aid: this.aid,code:this.code,parentNode: this});

        }
     
          
    }
	private getHandler():void
	{		

        let t = this.vo.et - GameData.serverTime;
        if(t<0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acChristmasActiveOver"));
            return;
        }
        //0-->跳转充值 1-->可领取 2-->已经领取
        if(this.vo.btnStatus == 0){
            ViewController.getInstance().openView(ViewConst.POPUP.ACICEBREAKINGGIFTRESULTVIEW,{aid: this.aid,code:this.code,parentNode: this});

        } else if(this.vo.btnStatus==1){
            App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETICEBREAKINGGIFT),this.goBtnCallback,this);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETICEBREAKINGGIFT),this.getBtnCallback,this);

            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETICEBREAKINGGIFT,{activeId : this.aid+"-"+this.code, opentype:2});
        }


	}

    private getBtnCallback(event:egret.Event):void{
        
        if(event.data.data.ret == 0){
            let num = event.data.data.data.addgem;
            let n = num ? num : 0;
            
            if(n > 0){
                let p = new egret.Point(this.getButton.x + this.getButton.width/2,this.getButton.y + this.getButton.height/2);
                let rewardList = GameData.formatRewardItem("1_1001_"+n);
                App.CommonUtil.playRewardFlyAction(rewardList,p);
                this.sendgemnum += num;
                this.refreshUI();
            }
        }    
    }
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					
				"firstchargebutton01","activity_fnt"
					]);
	}
    private tick():void
    {



        let t = this.vo.et - GameData.serverTime;
        
        if(t < 0){
            t = 0;
            TickManager.removeTick(this.tick,this);
            this.timerText.text = LanguageManager.getlocal("acChristmasActiveOver");
            this.timerText.x =  this.viewBg.width/2 - this.timerText.width/2;
          
    
        } else {
            let t = this.vo.et - GameData.serverTime;
            if(t < 0){
                t = 0;
            }
       
            let timeTxt = App.DateUtil.getFormatBySecond(t,8);
            this.timerText.text = LanguageManager.getlocal("acIcebreakingGiftTime",[timeTxt]);
            this.timerText.x =  this.viewBg.width/2 - this.timerText.width/2;
            
        }

    } 
	public dispose():void
	{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACICEBREAKINGGIFT_REFRESHVO,this.refreshUI,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETICEBREAKINGGIFT),this.goBtnCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETICEBREAKINGGIFT),this.getBtnCallback,this);

        this.residueTitle = null;
        this.residueCount = null;
        this.title = null;
    
    

    
        this.goldbg = null;
        this.goldText = null;
        this.descText  = null;
        this.timerText = null;
 

    //抢按钮
	    this.goButton = null;
    //领取按钮
        this.getButton = null;

        this.bottomText = null;



        this.sendgemnum = 0;
        this.loginfo = null;

        egret.Tween.removeTweens(this.circle);
        this.circle = null;
        this._isClose = false;
        this.isRefreshData = false;
        this._vo = null;
		super.dispose();
	}
}