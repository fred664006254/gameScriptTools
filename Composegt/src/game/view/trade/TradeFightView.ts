
class TradeFightView  extends BaseView
{
  
  	private _dialogueBg:BaseBitmap =null;
	// private _dialogueBg2:BaseBitmap =null;
    private dialogueContainer:BaseDisplayObjectContainer =null;
    private dialogueDesTxt:BaseTextField= null;
	private mysilverTxt:BaseBitmapText =null;
	private othersSilverTxt:BaseBitmapText =null;

	private animationTime:number =0;
	private tradeGoldNum:number =0;
	private txtScalse:number =0;
	private _biddingBg:BaseBitmap;
	
    public constructor() 
    {
		super();
	}
	protected getTitleStr():string
	{
		return "";
	}
    public initView():void
	{
		this.animationTime = 1*100;
		this.tradeGoldNum =0;
		this.txtScalse =1.2;

		// let bg = BaseBitmap.create("trade_bg2");
		// this.addChild(bg);
		
    	this.dialogueContainer = new BaseDisplayObjectContainer();
		this.addChild(this.dialogueContainer);
        
		
		let biddingBg = BaseBitmap.create("trade_pb_bottombg");
		this.addChild(biddingBg);
		biddingBg.setPosition(0,GameConfig.stageHeigth/2-270);
		this._biddingBg = biddingBg;
		//名字背景
		let trade_biaoti = BaseBitmap.create("trade_biaoti");
		this.addChild(trade_biaoti);
		trade_biaoti.setPosition(GameConfig.stageWidth/2-trade_biaoti.width/2+5,biddingBg.y + 142);

		//名字
		let myNameTxt =ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,0x311712);
		myNameTxt.text =Api.playerVoApi.getPlayerName();
		myNameTxt.setPosition(biddingBg.x+120 - myNameTxt.width/2,biddingBg.y+380);
		this.addChild(myNameTxt);

		let silverIcon = BaseBitmap.create("public_icon2");
		this.addChild(silverIcon);
		silverIcon.setPosition(biddingBg.x+20,biddingBg.y+ 250);

		var mygoldNumber:number=0;
		if(this.param.data&&this.param.data.consumeGold)
		{
			mygoldNumber = this.param.data.consumeGold + Api.playerVoApi.getPlayerGold();
		}

		let silverTxt =	undefined;
		if(PlatformManager.checkIsViSp()){
			silverTxt = ComponentManager.getTextField("",20);
		}else{
			silverTxt = ComponentManager.getBitmapText("","recharge2_fnt");
			silverTxt.setScale(0.65);
		}
		
		// ComponentManager.getTextField("12345",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		silverTxt.text = mygoldNumber+"";
		silverTxt.y = silverIcon.y + 15;
		silverTxt.x= silverIcon.x + silverIcon.width ;
		silverTxt.width=400;
		this.addChild(silverTxt);
		this.mysilverTxt =silverTxt;

		let servant_infoPro2 = BaseBitmap.create("trade_zhi");
		this.addChild(servant_infoPro2);
		servant_infoPro2.setPosition(silverIcon.x+35, silverIcon.y + 30);

		let intelligenceTxt =ComponentManager.getTextField("12345",20,TextFieldConst.COLOR_WHITE);
		intelligenceTxt.text = App.StringUtil.changeIntToText(Api.playerVoApi.getInte()) ;
		intelligenceTxt.setPosition(servant_infoPro2.x + servant_infoPro2.width  ,servant_infoPro2.y+15);
		this.addChild(intelligenceTxt);

		let cid = Number(Api.tradeVoApi.getCurrentCid())
		if(this.param.data.rdata.data.fightflag==1)
		{
			cid -= 1;
		}
		let tradeCfg = <Config.TradeItemCfg>Config.TradeCfg.getTradeCfgById(cid.toString());
		if(tradeCfg)
		{
			let myNameTxt2 =ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,0x311712);
			myNameTxt2.text = this.param.data.tradeName;//tradeCfg.tradeName;
			myNameTxt2.setPosition(biddingBg.x+520 - myNameTxt2.width/2,myNameTxt.y);
			this.addChild(myNameTxt2);

			let silverIcon2 = BaseBitmap.create("public_icon2");
			this.addChild(silverIcon2);
			silverIcon2.setPosition(biddingBg.x+425,silverIcon.y);
			
			let silverTxt2 = undefined;
			if(PlatformManager.checkIsViSp()){
				silverTxt2 = ComponentManager.getTextField("",20);
			}else{
				silverTxt2 = ComponentManager.getBitmapText("","recharge2_fnt");
				silverTxt2.setScale(0.65);
			}
			silverTxt2.setScale(silverTxt.scaleX);
			// ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
			silverTxt2.text =  App.StringUtil.changeIntToText(this.param.data.tradeGold);//tradeCfg.tradeGold+"";
			silverTxt2.setPosition(silverIcon2.x + silverIcon2.width  ,silverTxt.y );
			silverTxt2.width=300;
			this.addChild(silverTxt2);
			this.othersSilverTxt = silverTxt2;
			this.tradeGoldNum=tradeCfg.tradeGold;

			let servant_infoPro21 = BaseBitmap.create("trade_zhi");
			this.addChild(servant_infoPro21);
			servant_infoPro21.scaleX= servant_infoPro2.scaleX;
			servant_infoPro21.scaleY= servant_infoPro2.scaleY;
			servant_infoPro21.setPosition(silverIcon2.x+35,servant_infoPro2.y);

			let intelligenceTxt2 =ComponentManager.getTextField("1234",20,TextFieldConst.COLOR_WHITE);
			intelligenceTxt2.text = App.StringUtil.changeIntToText(this.param.data.tradeInte) ;
			intelligenceTxt2.setPosition(servant_infoPro21.x + servant_infoPro21.width ,intelligenceTxt.y);
			this.addChild(intelligenceTxt2);
		}
		
		// 商贸对话文字
		this.dialogueDesTxt =ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this.dialogueDesTxt.text = LanguageManager.getlocal("dialogueDes");
		// this.dialogueDesTxt.width =this._dialogueBg.width-15;
		this.dialogueDesTxt.setPosition(GameConfig.stageWidth/2 -this.dialogueDesTxt.width/2 ,biddingBg.y +biddingBg.height + 50);
		this.addChild(this.dialogueDesTxt);

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
		let curTimePre2 = egret.getTimer()-1200;
		let timerNum:number =egret.setInterval(()=> {
			// 当前时间
			let curTime = egret.getTimer();
			let curTimePre = (curTime - startTime) / (endTime - startTime);

			if(!ths.isInit()){
				egret.clearInterval(timerNum);
				return;
			}
			let mySilverNum = myStartNum - curTimePre * (myStartNum - myEndNum);
			//对方的钱减少
			let otherSilverNum = otherStartNum - curTimePre * (otherStartNum - otherEndNum);
			let isGoldAni = false;
			if( curTime -curTimePre2  >= 1200 && mySilverNum > 0 && otherSilverNum > 0){
				isGoldAni = true;
				curTimePre2 = curTime - 1200;
			}
			if(this.mysilverTxt){
				this.mysilverTxt.text =Math.floor(mySilverNum)+"";
				if(isGoldAni ){
					this.showGoldAni(true);
				}
			}
			
			
			if(this.othersSilverTxt){
				this.othersSilverTxt.text =Math.floor(otherSilverNum) + "";
				if(isGoldAni ){
					this.showGoldAni(false);
				}
				
			}
			if(curTime >= endTime){	
				egret.clearInterval(timerNum);
				this.closeBtn.touchEnabled =true;
				App.DisplayUtil.changeToNormal(this.closeBtn);
				if(this.param.data.rdata.data.fightflag==0){
					this.mysilverTxt.text ="0";
					if(this.othersSilverTxt)
					{
						this.othersSilverTxt.text =App.StringUtil.changeIntToText(otherEndNum);
						if(isGoldAni ){
							this.showGoldAni(false);
						}
					}
					this.isWin();
					return
				}else{
					this.mysilverTxt.text =Api.playerVoApi.getPlayerGoldStr();
					if(isGoldAni ){
						this.showGoldAni();
					}
					if(this.othersSilverTxt){
						this.othersSilverTxt.text ="0";
					}
					this.isWin();
					return
				}
			}

         } ,ths, 10,1);
	}

	public showGoldAni(isSelf:boolean = true)
	{
		let bezierlICon = new BezierlIcon();
		this.addChild(bezierlICon);
		let delay = App.MathUtil.getRandom();
		let mH = App.MathUtil.getRandom(40,70);
		if(!isSelf){
			bezierlICon.x = this._biddingBg.x + 100;
			bezierlICon.y = this._biddingBg.y + 315;
			bezierlICon.startBezier(190,-10,70,-mH,delay);
		}else{
			bezierlICon.x = this._biddingBg.x + 500;
			bezierlICon.y = this._biddingBg.y + 315;
			bezierlICon.startBezier(-190,-10,-110,-mH,delay*1.5);
		}
	}

	private isWin():void
	{
		let ths=this;	
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
		this._biddingBg = null;
		// this._dialogueBg2=null;
        super.dispose();
    }
}

class BezierlIcon  extends BaseDisplayObjectContainer
{
 	public constructor() 
    {
		super();
		this.visible = false;
	}
	public prePosX:number = 0;
	public prePosY:number = 0;
	public endPosX:number = 0;
	public endPosY:number = 0;

	public midPosX:number = 0;
	public midPosY:number = 0;
	public startBezier(endPosX:number,endPosY:number,midPosX:number,midPosY:number,delayTime:number)
	{
		this.endPosX = endPosX;//180;
		this.endPosY = endPosY;//-20
		this.midPosX = midPosX;//180;
		this.midPosY = midPosY;//-20

		this.prePosX = this.x;
		this.prePosY = this.y;
		let silverIcon = BaseBitmap.create("public_icon2");
		delayTime = delayTime || 0 ;
		this.addChild(silverIcon);
		
		let silverIcon2 = BaseBitmap.create("public_icon2");
		silverIcon2.x = App.MathUtil.getRandom(0,40);
		silverIcon2.y = -App.MathUtil.getRandom(10,50);
		this.addChild(silverIcon);

		let silverIcon3 = BaseBitmap.create("public_icon2");
		silverIcon3.x = -App.MathUtil.getRandom(10,30);
		silverIcon3.y = -App.MathUtil.getRandom(20,40);
		this.addChild(silverIcon);

		egret.Tween.get(this,{loop:false}).wait(delayTime).set({visible:true}).to({factor: 1},160).call(()=>{
			this.visible = false;
			this.parent.removeChild(this);
		},this);
	}
	
	public get factor():number {
        return 0;
    }
	
    public set factor(value:number) {
        // this.x += (1 - value) * (1 - value) * 100 + 2 * value * (1 - value) * 300 + value * value * 100;
        // this.y += (1 - value) * (1 - value) * 100 + 2 * value * (1 - value) * 300 + value * value * 500;
		this.x = this.prePosX +  (1 - value) * (1 - value) * 0 + 2 * value * (1 - value) * this.midPosX + value * value * this.endPosX;
        this.y = this.prePosY + (1 - value) * (1 - value) * 0 + 2 * value * (1 - value) * this.midPosY + value * value * this.endPosY;
    }
}