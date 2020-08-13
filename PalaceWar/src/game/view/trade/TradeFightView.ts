
class TradeFightView  extends CommonView
{
  
  	private _dialogueBg:BaseBitmap =null;
	private _dialogueBg2:BaseBitmap =null;
    private dialogueContainer:BaseDisplayObjectContainer =null;
    private dialogueDesTxt:BaseTextField= null;
	private mysilverTxt:BaseTextField =null;
	private othersSilverTxt:BaseTextField =null;

	private animationTime:number =0;
	private tradeGoldNum:number =0;
	private txtScalse:number =0;
	private _timerNum:number =0;

    public constructor() 
    {
		super();
	}
    public initView():void
	{
		this.animationTime = 1*100;
		this.tradeGoldNum =0;
		this.txtScalse =1.2;

		let bg = BaseBitmap.create("trade_bg2");
		this.addChild(bg);
		
    	this.dialogueContainer = new BaseDisplayObjectContainer();
		this.addChild(this.dialogueContainer);
        this.showDialogue();
		
		let biddingBg = BaseBitmap.create("trade_pb_bottombg");
		this.addChild(biddingBg);
		biddingBg.setPosition(0,GameConfig.stageHeigth-230);

		//名字背景
		let tradeFight_name_bg = BaseBitmap.create("atkrace_name_bg");
		this.addChild(tradeFight_name_bg);
		tradeFight_name_bg.width =200;
		tradeFight_name_bg.height =40;
		tradeFight_name_bg.setPosition(30,GameConfig.stageHeigth-200);

		//名字
		let myNameTxt =ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		myNameTxt.text =Api.playerVoApi.getPlayerName();
		myNameTxt.setPosition(tradeFight_name_bg.x+60,tradeFight_name_bg.y+10);
		this.addChild(myNameTxt);
	 
		//银两
		let leftBg = BaseBitmap.create("public_9_resbg");
		leftBg.scaleX = -1;
		this.addChild(leftBg);
		leftBg.setPosition(200,GameConfig.stageHeigth-150);
		
		let silverIcon = BaseBitmap.create("public_icon2");
		this.addChild(silverIcon);
		silverIcon.setPosition(155,leftBg.y);

		var mygoldNumber:number=0;
		if(this.param.data&&this.param.data.consumeGold)
		{
			mygoldNumber = this.param.data.consumeGold + Api.playerVoApi.getPlayerGold();
		}

		let silverTxt =ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		silverTxt.text = mygoldNumber+"";
		silverTxt.setPosition(70,GameConfig.stageHeigth-138);
		silverTxt.x=-250;
		silverTxt.width=400;
		silverTxt.textAlign ="right";
		this.addChild(silverTxt);
		this.mysilverTxt =silverTxt;

		//智力
		let leftBg2 = BaseBitmap.create("public_9_resbg");
		leftBg2.scaleX =-1;
		this.addChild(leftBg2);
		leftBg2.setPosition(200,GameConfig.stageHeigth-100);

		let servant_infoPro2 = BaseBitmap.create("public_icon_zhi");
		this.addChild(servant_infoPro2);
		servant_infoPro2.scaleX=0.9;
		servant_infoPro2.scaleY=0.9;
		servant_infoPro2.setPosition(158,GameConfig.stageHeigth-98);

		 let addInfo = Api.tradeVoApi.getDecreePolicyAddAttrInfo();
        let addV = 0
        if(addInfo && addInfo.lastTimes > 0)
        {
        	addV =  Math.floor(Api.playerVoApi.getInte() * addInfo.addExtent);
        }

		if (Api.otherInfoVoApi.isHasScene("303","searchScene"))
		{
			let abilitycfg = Config.SceneCfg.getSceneCfgBySceneName("searchScene","303").personalityCfg;
			if (abilitycfg.buffValue)
			{
				addV += Api.playerVoApi.getInte()*abilitycfg.buffValue;
				addV= Math.floor(addV+0.5);
			}
		}

		let intelligenceTxt =ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		intelligenceTxt.text = (Api.playerVoApi.getInte() + addV).toFixed(0);
		intelligenceTxt.setPosition(150,servant_infoPro2.y+10);
		this.addChild(intelligenceTxt);
		intelligenceTxt.anchorOffsetX = intelligenceTxt.width;
	
		this.showOpponentInfo(); 

		this._timerNum =egret.setInterval(()=> 
		{
			if(!this.isInit())
			{
				egret.clearInterval(this._timerNum);
				return;
			} 
			this.playgoldAnimalition(); 

		} ,this, 200); 
    }
	private playgoldAnimalition():void
	{	
		var moveY = GameConfig.stageHeigth-230 -169;  
		// var arrX:Array<number> =[100,160,140,300,360,400,420];
		// var arrY:Array<number> =[-100,-190,-20,-90,-10,-40,-50];
		// var moveTime:Array<number> =[500,600,400,800,900,820,320];
	
		for(var i:number=0;i<3;i++)
		{
			var _x:number =  App.MathUtil.getRandom(1,7);  
			var num  = App.MathUtil.getRandom(1,3); 
			var goldB :BaseBitmap = BaseBitmap.create("jpgold_"+num);
			goldB.setScale(1.5);
			goldB.x = App.MathUtil.getRandom(40,500);  //arrX[_x];
			goldB.y = App.MathUtil.getRandom(-5,-210);
			this.addChild(goldB);
			var moveTimer =App.MathUtil.getRandom(300,400);
			egret.Tween.get(goldB).to({y:moveY},moveTimer )
			.call(this.playgoldHandler,this,[goldB]); 
		}		 
	}
	private playgoldHandler(_obj:any=null):void
	{

		var _moveX = _obj.x;
		if(_obj)
		{
			_obj.dispose();
		}
	
		var playNum = App.MathUtil.getRandom(1,2);
		if(playNum==1)
		{
			var moveY = GameConfig.stageHeigth-230 -149;  
			var mathNum = App.MathUtil.getRandom(1,2);
			if(mathNum==1)
			{
				let fireAnim = ComponentManager.getCustomMovieClip("goldjump1_",8,70);
				fireAnim.x = _moveX;
				fireAnim.y = moveY;    
				this.addChild(fireAnim);
				fireAnim.setEndCallBack(()=>{
					this.removeChild(fireAnim);
					fireAnim.dispose();
					fireAnim = null;
				},this);
				fireAnim.playWithTime(1);
			}
			else
			{
				let fireAnim2 = ComponentManager.getCustomMovieClip("goldjump2_",9,70);
				fireAnim2.x = _moveX;
				fireAnim2.y = moveY;   
				this.addChild(fireAnim2); 
				fireAnim2.playWithTime(1);
					fireAnim2.setEndCallBack(()=>{
					this.removeChild(fireAnim2);
					fireAnim2.dispose();
					fireAnim2 = null;
				},this);
			}
			
		} 
	}
	private showOpponentInfo():void
	{
		let cid = Number(Api.tradeVoApi.getCurrentCid())
		if(this.param.data.rdata.data.fightflag==1)
		{
			cid -= 1;
		}
		let tradeCfg = <Config.TradeItemCfg>Config.TradeCfg.getTradeCfgById(cid.toString());
		if(tradeCfg)
		{
		//对方名字
		let tradeFight_name_bg = BaseBitmap.create("atkrace_name_bg");
		this.addChild(tradeFight_name_bg);
		tradeFight_name_bg.width =200;
		tradeFight_name_bg.height =40;
		tradeFight_name_bg.setPosition(410,GameConfig.stageHeigth-200);

		let myNameTxt =ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		myNameTxt.text = this.param.data.tradeName;//tradeCfg.tradeName;
		myNameTxt.setPosition(tradeFight_name_bg.x+60,tradeFight_name_bg.y+10);
		this.addChild(myNameTxt);

		//对方银两
		let leftBg = BaseBitmap.create("public_9_resbg");
		this.addChild(leftBg);
		leftBg.setPosition(430,GameConfig.stageHeigth-150);

		let silverIcon = BaseBitmap.create("public_icon2");
		this.addChild(silverIcon);
		silverIcon.setPosition(leftBg.x-5,leftBg.y);

		let silverTxt =ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		silverTxt.text =  App.StringUtil.changeIntToText(this.param.data.tradeGold);//tradeCfg.tradeGold+"";
		silverTxt.setPosition(480,leftBg.y+12);
		silverTxt.width=300;
		silverTxt.textAlign ="left";
		this.addChild(silverTxt);
		this.othersSilverTxt = silverTxt;
		this.tradeGoldNum=tradeCfg.tradeGold;

		//对方智力
		let leftBg2 = BaseBitmap.create("public_9_resbg");
		this.addChild(leftBg2);
		leftBg2.setPosition(430,GameConfig.stageHeigth-100);

		let servant_infoPro2 = BaseBitmap.create("public_icon_zhi");
		this.addChild(servant_infoPro2);
		servant_infoPro2.scaleX=0.9;
		servant_infoPro2.scaleY=0.9;
		servant_infoPro2.setPosition(430,GameConfig.stageHeigth-98);

		let intelligenceTxt =ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		intelligenceTxt.text =this.param.data.tradeInte+"";
		intelligenceTxt.setPosition(480,servant_infoPro2.y+10);
		this.addChild(intelligenceTxt);
		}
	}

    private showDialogue():void
	{
		 
		this._dialogueBg = BaseBitmap.create("public_9_bg42");
		this.dialogueContainer.addChild(this._dialogueBg);
		this._dialogueBg.width = 220;
		this._dialogueBg.height = 83;
		this._dialogueBg.x=50;
		this._dialogueBg.y=300;
		
		this._dialogueBg2 = BaseBitmap.create("public_9_bg42_tail");
		this.dialogueContainer.addChild(this._dialogueBg2);
		this._dialogueBg2.scaleX =-1;
		this._dialogueBg2.x =this._dialogueBg.x+this._dialogueBg.width;
		this._dialogueBg2.y =this._dialogueBg.y+this._dialogueBg.height-5;
		
		// 商贸对话文字
		this.dialogueDesTxt =ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		this.dialogueDesTxt.text = LanguageManager.getlocal("dialogueDes");
		this.dialogueDesTxt.width =this._dialogueBg.width-15;
		this.dialogueDesTxt.setPosition(this._dialogueBg.x+10,this._dialogueBg.y+15);
		this.dialogueContainer.addChild(this.dialogueDesTxt);

		this.closeBtn.touchEnabled =false;
		App.DisplayUtil.changeToGray(this.closeBtn);

        let ths=this;	
        let timerNum2:number =egret.setTimeout(()=> 
        {
            if(!ths.isInit())
            {
                egret.clearTimeout(timerNum2);
                return;
            }
            this.dialogueContainer.visible =false;
			this.playSilver();
		

         } ,ths, 800,1);
    }

	private playSilver():void
	{
	
		let ths=this;
		let tradeCfg = Api.tradeVoApi.getCurrentTradeCfg();

		// 我方钱数开始值
		let myStartNum = this.param.data.consumeGold + Api.playerVoApi.getPlayerGold();
		// 我方钱数结束值
		let myEndNum = Api.playerVoApi.getPlayerGold();
		// 对方钱数开始值
		let otherStartNum = this.param.data.tradeGold;
		// 对方钱数结束值
		let otherEndNum = Api.tradeVoApi.getBattleResult(Api.playerVoApi.getInte(), myStartNum, this.param.data.tradeInte, this.param.data.tradeGold).left2;
		// 开始时间
		let startTime = egret.getTimer();
		// 结束时间 （播放2秒）
		let endTime = startTime + 2000;

	

		let timerNum:number =egret.setInterval(()=> 
        {
		
			// 当前时间
			let curTime = egret.getTimer();
			// 当前时间走了多少了，百分比
			let curTimePre = (curTime - startTime) / (endTime - startTime);

			if(!ths.isInit())
			{
				egret.clearInterval(timerNum);
				return;
			} 
			// //我的钱减少
			// console.log(mySilverNum+"钱");
			
			// console.log(countNum+"每次减少");
			let mySilverNum = myStartNum - curTimePre * (myStartNum - myEndNum);
			if(this.mysilverTxt)
			{
				this.mysilverTxt.text =Math.floor(mySilverNum)+"";
				this.mysilverTxt.scaleX=this.txtScalse;
				this.mysilverTxt.scaleY=this.txtScalse;
				this.mysilverTxt.x=-330;
			}
			
			//对方的钱减少
			let otherSilverNum = otherStartNum - curTimePre * (otherStartNum - otherEndNum);
			if(this.othersSilverTxt)
			{
				this.othersSilverTxt.text =Math.floor(otherSilverNum) + "";
				this.othersSilverTxt.scaleX=this.txtScalse;
				this.othersSilverTxt.scaleY=this.txtScalse;
			}

			if(curTime >= endTime)
			{	
				egret.clearInterval(timerNum);
				
				if(this.othersSilverTxt)
				{
					this.othersSilverTxt.scaleX=1;
					this.othersSilverTxt.scaleY=1;
				}
				
				this.mysilverTxt.scaleX=1;
				this.mysilverTxt.scaleY=1;
				this.mysilverTxt.x=-250;

				this.closeBtn.touchEnabled =true;
				App.DisplayUtil.changeToNormal(this.closeBtn);
				if(this.param.data.rdata.data.fightflag==0)
				{
				
					// console.log("失败");
					this.mysilverTxt.text ="0";
					this.mysilverTxt.textColor =TextFieldConst.COLOR_WARN_RED2;
					if(this.othersSilverTxt)
					{
						this.othersSilverTxt.text =App.StringUtil.changeIntToText(otherEndNum);
					}
					this.isWin();
					return
				}
				else
				{
					 
					// console.log("胜利");
					this.mysilverTxt.text =Api.playerVoApi.getPlayerGoldStr();
					if(this.othersSilverTxt)
					{
						this.othersSilverTxt.text ="0";
						this.othersSilverTxt.textColor =TextFieldConst.COLOR_WARN_RED2;
					}
					this.isWin();
					return
				}
			
			}

         } ,ths, 10,1);
	}
	private isWin():void
	{	
	
		let ths=this;	

		egret.clearInterval(ths._timerNum); 

		let timerNum3:number =egret.setTimeout(()=> 
		{
			if(!ths.isInit())
			{
				egret.clearTimeout(timerNum3);
				return;
			} 

			this.openIsWin();
		} ,ths, 2000,1);
	}
	private openIsWin():void
	{
		let data =this.param.data; 
		if(data)
		{
			if(data.rdata.data.fightflag==1)
			{	
				ViewController.getInstance().openView(ViewConst.COMMON.TRADEINFOPOPUPVIEW,data);
			}
			else if(data.rdata.data.fightflag==0)
			{
				ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:5,f:this.endCallBack,o:this});
			}
			ViewController.getInstance().hideView(ViewConst.COMMON.TRADEFIGHTVIEW);		
		}
	}
	private endCallBack():void
	{
		ViewController.getInstance().hideView(ViewConst.COMMON.TRADEFIGHTVIEW);		
	}
	
    public dispose():void
	{
		this.tradeGoldNum= 0;
		this.txtScalse =0;
        this.dialogueContainer =null;
		this.mysilverTxt =null;
		this.othersSilverTxt =null;
		this.animationTime =0;
		this._dialogueBg=null;
		this._dialogueBg2=null;
        super.dispose();
    }
}