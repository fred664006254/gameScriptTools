/*
    author : shaoliang
    date : 2019.6.28
    desc : 新蛮王
*/
class DailybossnewView extends CommonView
{   

	private _leftTimeTxt:BaseTextField;
	private _enterBtn:BaseButton;
	private _gate:BaseLoadBitmap;

	private _rankBtn:BaseButton;

    // private _bossData:any;
	// private _lastReward:{score:number,myrank:number,rewardType:number,joinNum:number,rewards:string};

    public constructor()
	{
		super();
	}

    protected getResourceList():string[]{
      
        return super.getResourceList().concat([
            `dailybossnew_bg1`,"dailybossnew_rank","dailybossnew_score","dailyboss_enter"
        ]);
    }

    protected getBgName():string{
		return `dailybossnew_bg1`;
    }

    protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_NEWBOSS_GET,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if(data.ret)
		{
			if(data.data.data)
			{
				// if(data.data.data.bossData)
				// {
				// 	this._bossData=data.data.data.bossData;
				// }
				// if(data.data.data.lastReward)
				// {
				// 	this._lastReward=data.data.data.lastReward;
				// }
			}
		}
	}

    protected initBg():void{
        let view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
    
        let bgName : string = this.getBgName();
		if(bgName){
			this.viewBg = BaseBitmap.create(bgName);
            this.addChild(this.viewBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
        }
    }

    protected initView():void
	{	
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWBOSS_GETREWARD),this.resetBtn,this);
		this._gate=BaseLoadBitmap.create("dailybossnew_gate");
        this._gate.setPosition(167,597+this.viewBg.y-this.container.y);
		this.addChildToContainer(this._gate);
		this._gate.visible = false;

        let titleW:number=368;
		let titleH:number=68;

        let title:BaseLoadBitmap=BaseLoadBitmap.create("dailybossnew_title");
		title.setPosition((GameConfig.stageWidth-368)/2,20);
		this.addChildToContainer(title);

		let timeBg:BaseBitmap=BaseBitmap.create("public_9_bg15");
		timeBg.width=titleW;
		timeBg.setPosition(title.x+(timeBg.width-titleW)/2,title.y+titleH+3);
		this.addChildToContainer(timeBg);

        let timeTxt:BaseTextField=ComponentManager.getTextField(this.getStatusStr(),TextFieldConst.FONTSIZE_TITLE_SMALL);
		
		if(PlatformManager.checkIsEnLang()){
			timeBg.width = timeTxt.width;
			timeBg.x = GameConfig.stageWidth / 2 - timeBg.width / 2;
		} else {
			timeTxt.width=timeBg.width;
		}
		timeTxt.textAlign=egret.HorizontalAlign.CENTER;
		timeTxt.setPosition(timeBg.x+(timeBg.width-timeTxt.width)/2,timeBg.y+(timeBg.height-timeTxt.height)/2);
		this.addChildToContainer(timeTxt);
		this._leftTimeTxt=timeTxt;


        let buttomBg:BaseBitmap=BaseBitmap.create("public_9_downbg");
		buttomBg.width=GameConfig.stageWidth;
		buttomBg.height=142;
		buttomBg.setPosition(0,GameConfig.stageHeigth-this.container.y-buttomBg.height);

		if(!Api.switchVoApi.checkOpenShenhe())
		{
			let rankBtn:BaseButton=ComponentManager.getButton("dailybossnew_rank","",this.showRankView,this);
			rankBtn.setPosition(10,buttomBg.y-rankBtn.height);
			this.addChildToContainer(rankBtn);
			this._rankBtn = rankBtn;
		}

		let scoreBtn:BaseButton=ComponentManager.getButton("dailybossnew_score","",this.showScoreView,this);
		scoreBtn.setPosition(GameConfig.stageWidth-scoreBtn.width-10,buttomBg.y-scoreBtn.height);
		this.addChildToContainer(scoreBtn);

		this.addChildToContainer(buttomBg);


		let str1 = LanguageManager.getlocal("dailybossLocalTimeDesc",[LanguageManager.getlocal("dailybossTimeTitleNew"),Config.DailybossnewCfg.getInTimeStr(1)]);

		let buttomTxt:BaseTextField=ComponentManager.getTextField(str1,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		buttomTxt.lineSpacing=5;
		buttomTxt.setPosition(buttomBg.x+20,buttomBg.y+16);
		this.addChildToContainer(buttomTxt);

		let buttomTxt2:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossnewBottomDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		buttomTxt2.lineSpacing=5;
		buttomTxt2.width = 600;
		buttomTxt2.setPosition(buttomTxt.x,buttomTxt.y+buttomTxt.height+10);
		this.addChildToContainer(buttomTxt2);


		this.resetBtn();
		this.tick();
    }

	 private resetBtn():void
    {
        let f = Api.dailybossnewVoApi.getRewardFlag();
        if (f == 1)
        {
            App.CommonUtil.addIconToBDOC(this._rankBtn);
			this._rankBtn.getChildByName("reddot").x = this._rankBtn.width-30;
            this._rankBtn.getChildByName("reddot").y = 50;
        }
        else 
        {
            App.CommonUtil.removeIconFromBDOC(this._rankBtn);
        }
    }

	private showRankView():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSNEWRANKPOPUPVIEW,{});
	}

	private showScoreView():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSNEWSCROEPOPUPVIEW);
	}

	private _lastStatus:number=0;
	private tick():void
	{
		if(this._leftTimeTxt)
		{
			this._leftTimeTxt.text=this.getStatusStr();
		}
		//0开始状态,1开始,2结束等待下一轮
		let status:number=this.getBossStatus();
		if(status==1)
		{
			if(!this._enterBtn)
			{
				this._enterBtn=ComponentManager.getButton("dailyboss_enter","",this.enterBattle,this,null,1);
				this._enterBtn.setPosition((GameConfig.stageWidth)/2 - 12,-this.container.y+(GameConfig.stageHeigth-540));
				this._enterBtn.anchorOffsetX = this._enterBtn.width/2;
				this._enterBtn.anchorOffsetY = this._enterBtn.height/2;
				this.addChildToContainer(this._enterBtn);
				egret.Tween.get(this._enterBtn,{loop:true}).to({scaleX:0.9,scaleY:0.9}, 600).to({scaleX:1,scaleY:1}, 600);
				this._gate.visible = true;
			}
		}
		else
		{
			if(this._enterBtn)
			{
				this._enterBtn.dispose();
				this._enterBtn=null;
			}
			this._gate.visible = false;
		}
		this._lastStatus=status;
	}

	private enterBattle():void
	{	
		if (this.getBossStatus()== 0)
		{
			return ;
		}
		ViewController.getInstance().openView(ViewConst.BATTLE.DAILYBOSSNEWBATTLEVIEW);
		
	}

	private getBossStatus():number
	{
		return Api.dailybossnewVoApi.getStatus();
	}


    private getStatusStr():string
	{
		let statusStr:string="";
		let status:number=this.getBossStatus();
		if(status==0)
		{	
			statusStr = LanguageManager.getlocal("dailybossnewLeftTimeDesc",[App.DateUtil.getFormatBySecond(this.getNextStartLeftTime(),1)]);
		}
		else if(status==1)
		{	
			 statusStr = LanguageManager.getlocal("dailybossnewEndTimeDesc",[App.DateUtil.getFormatBySecond(Api.dailybossnewVoApi.getEndTimeByName("boss2"),1)]);
		}
		else
		{	
			
		}
		return statusStr;
	}

	private getNextStartLeftTime():number
	{
		return Api.dailybossnewVoApi.getNextStartLeftTime();
	}

    protected getTitleStr():string
	{
		return "dailybossNew";
	}

    protected getRuleInfo():string{

		return "dailybossnewRuleInfo";
    } 

    public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWBOSS_GETREWARD),this.resetBtn,this);
		this._gate = null;
		this._enterBtn = null;
		this._leftTimeTxt = null;
		this._rankBtn = null;

		super.dispose();
	}
}