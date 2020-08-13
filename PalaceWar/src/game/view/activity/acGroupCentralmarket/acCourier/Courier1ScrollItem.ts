
class Courier1ScrollItem  extends ScrollListItem
{
	private public_dot:BaseBitmap =null;
	private _data:any = null;
	private _packageStateTxt:BaseTextField =null;
	private _typeBg:BaseBitmap =null;
	private _myScore:number =0;
	private _rewardNum:number =0;
	private _btnTypeNum:number=0;
	private _code ="";

	public constructor() 
	{
		super();
	}
	/**
     * 使用的code 仅仅使用资源，cn
     */
	public get nowCode():string
    {
        if(this._code == "6")
        {
            return "4";
        }
        else
        {
            return this._code;
        }
    }
	protected initItem(index:number,data:any,itemParam?:any)
    {
		this._code = itemParam;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_COURIER_ITEM,this.update,this);  
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCOURIERREWARD),this.update,this);
		let curr_AcCourierVo = <AcCourierVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_COURIER,this._code);
		this._myScore = curr_AcCourierVo.getScore();


		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg1");  
		wordsBg.width = 474;
		wordsBg.height = 92; 
		this.addChild(wordsBg);
 
		//礼包背景
		let small_package_bg:BaseBitmap = BaseBitmap.create("progress6_bg");   
		this.addChild(small_package_bg);
		small_package_bg.scaleX =0.75;
		small_package_bg.scaleY =0.75;
		small_package_bg.x=20;
		small_package_bg.y=5;
		this._data =data;

		// if(index==0)
		// {
			// this.rechargevie_effects = BaseBitmap.create("rechargevie_effects"); 
			// this.rechargevie_effects.anchorOffsetX =this.rechargevie_effects.width/2;
			// this.rechargevie_effects.anchorOffsetY =this.rechargevie_effects.height/2;
			// this.rechargevie_effects.x=68;
			// this.rechargevie_effects.y=50;
			// this.rechargevie_effects.scaleX =0.6;
			// this.rechargevie_effects.scaleY =0.6; 
			// egret.Tween.get(this.rechargevie_effects,{loop:true}).to({rotation:	this.rechargevie_effects.rotation+360},10000);
			// this.addChild(this.rechargevie_effects);
		// }
		
		var big_package:BaseBitmap =null;
		if(index==0)
		{
			big_package= BaseBitmap.create("acnewyear_big_package"); 
			big_package.x=small_package_bg.x+5;
			big_package.y=small_package_bg.y;
		}
		else
		{
			big_package= BaseBitmap.create("acnewyear_small_package");   
			big_package.x=30;
			big_package.y=5;  
		}

		big_package.scaleX =0.8;
		big_package.scaleY =0.8; 
	 	//礼包 
		big_package.addTouchTap(this.big_packageHandler,this);
		this.addChild(big_package);

		//领取状态背景
		let typeBg:BaseBitmap = BaseBitmap.create("acnewyear_bottom3");   
		typeBg.x= big_package.x;
		typeBg.y= big_package.y+big_package.height-40; 
		this.addChild(typeBg);
		this._typeBg = typeBg;
		this._typeBg.visible =false;
	 


		this.public_dot =BaseBitmap.create("public_dot2");
		this.addChild(this.public_dot);
		this.public_dot.x = big_package.x+big_package.width-40;
		this.public_dot.y = big_package.y-3+8;
		this.public_dot.visible =false;
	 
		//礼包状态文字
		let packageStateTxt = ComponentManager.getTextField("",18,TextFieldConst.COLOR_QUALITY_WHITE);
		packageStateTxt.text = LanguageManager.getlocal("taskCollect");
		packageStateTxt.x = typeBg.x-5;
		packageStateTxt.y = 70;
		packageStateTxt.width =typeBg.width;
		packageStateTxt.textAlign ="center";
		this._packageStateTxt = packageStateTxt;
		this._packageStateTxt.visible =false;
		this.addChild(packageStateTxt);

		
		// //中国结
		let chineseknot:BaseBitmap = BaseBitmap.create("accourier_chineseknot2_"+this.nowCode);   
		chineseknot.x=200;
		chineseknot.y=5;  
		this.addChild(chineseknot);
 

		//拥有多少个中国结
		let needNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_WHITE);
		needNumTxt.text = data.needScore+"";
		needNumTxt.x =chineseknot.x+50;
		needNumTxt.y = 20;
		this.addChild(needNumTxt);


		//可领取完美春节礼包
		let PackageTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		let num = index+1;
		var str =LanguageManager.getlocal("courierDes"+num+"_"+this.nowCode);
		PackageTxt.text = str; 
		PackageTxt.x =170;
		PackageTxt.y = 60;
		this.addChild(PackageTxt);
		if(index==0)
		{
			PackageTxt.setColor(TextFieldConst.COLOR_WARN_YELLOW);
		}
	
		this.update();
		

	}
	private big_packageHandler(evt:egret.TouchEvent):void
	{
		let tmpVo = <AcCourierVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_COURIER,this._code); 
		if(tmpVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return
		}
		
		var data:any ={};
		data.reward =this._data.getReward;
		data._name ="newYear1";
	
		var index = AcCourierViewTab1.SCOREARR.indexOf(this._data.needScore);
		data.rewardNum =index+1;
		data._btnTypeNum = this._btnTypeNum;
		data.code =this._code;
		ViewController.getInstance().openView(ViewConst.POPUP.ACCOURIERPOPUPVIEW,data);
	
		
	}
	public update():void
	{
		let curr_AcCourierVo = <AcCourierVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_COURIER,this._code);
		if(this._packageStateTxt)
		{
			if(AcCourierViewTab1.SCOREARR[0]==3200)
			{
				AcCourierViewTab1.SCOREARR.reverse();
			}
			
			var index = AcCourierViewTab1.SCOREARR.indexOf(this._data.needScore); 
			this._packageStateTxt.visible =true;
			let num =index+=1;
			if(this._myScore>=this._data.needScore)
			{
				if(curr_AcCourierVo.getBtnType(num))
				{
					this._packageStateTxt.text=LanguageManager.getlocal("candyGetAlready");
					this._packageStateTxt.textColor =TextFieldConst.COLOR_WHITE;
					this.public_dot.visible = false;
				}
				else
				{
					this._packageStateTxt.text=LanguageManager.getlocal("ac_recharge_Btntxt2"); 
					this._packageStateTxt.textColor =TextFieldConst.COLOR_WARN_GREEN;
					this._btnTypeNum=2;
					this.public_dot.visible = true;
				} 
				this._typeBg.visible = true;
			}
			else
			{ 
				this._packageStateTxt.visible =false;
			}

		}
	}
   
	public getSpaceY():number
	{
		return 5;
	}
	
	public dispose():void
    {	
		this.public_dot =null;
		this._data =null;
		this._packageStateTxt=null;
		this._typeBg =null;
		this._myScore = 0;
		this._rewardNum =0;
		this._btnTypeNum=0; 
		this._code  =null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_COURIER_ITEM,this.update,this);  
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCOURIERREWARD),this.update,this);
		super.dispose();
	}
}