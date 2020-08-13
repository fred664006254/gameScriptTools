
class AcNewYearSevenDays1ScrollItem  extends ScrollListItem
{
	private public_dot:BaseBitmap =null;
	private _data:any = null;
	private _packageStateTxt:BaseTextField =null;
	private _typeBg:BaseBitmap =null;
	private _myScore:number =0;
	private _rewardNum:number =0;
	private _btnTypeNum:number=0;
	private _code ="";
	private big_package :BaseBitmap = null;

	public constructor() 
	{
		super();
	}
	/**
     * 使用的code 仅仅使用资源，cn
     */
	public get nowCode():string
    {
        return this._code;
    }
	protected initItem(index:number,data:any,itemParam?:any)
    {
		this._code = itemParam.code;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM,this.update,this);  
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.update,this);
		let curr_AcNewYearSevenDaysVo = <AcNewYearSevenDaysVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR7DAYS,this._code);
		this._myScore = curr_AcNewYearSevenDaysVo.getScore();


		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg1");  
		wordsBg.width = 440;
		wordsBg.height = itemParam.height; 
		this.addChild(wordsBg);
 
		//礼包背景
		let newPakImg = "acnewyear7days_bigboxbg-"+this._code;
		let packageBgImg = ResourceManager.hasRes(newPakImg) ? newPakImg : "progress6_bg";
		let small_package_bg:BaseBitmap = BaseBitmap.create(packageBgImg);   
		this.addChild(small_package_bg);
		small_package_bg.scaleX =0.75;
		small_package_bg.scaleY =0.75;
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, small_package_bg, wordsBg, [20,0]);
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
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, big_package, small_package_bg);
		if (this._code == "2"){
			big_package.scaleX =0.9;
			big_package.scaleY =0.9;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, big_package, small_package_bg, [-3, 0]);
		}
		this.big_package = big_package;
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
		packageStateTxt.width =typeBg.width;
		packageStateTxt.textAlign ="center";
		this._packageStateTxt = packageStateTxt;
		this._packageStateTxt.visible =false;
		this.addChild(packageStateTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, packageStateTxt, typeBg);

		
		// //中国结
		let chineseknot:BaseBitmap =  BaseBitmap.create(App.CommonUtil.getResByCode(`acnewyear7daysicon`, this.nowCode));
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, chineseknot, small_package_bg, [small_package_bg.width + 100, 10]); 
		this.addChild(chineseknot);
		if (this._code == "2"){
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, chineseknot, small_package_bg, [small_package_bg.width + 60, 10]);
		}

		//拥有多少个中国结
		let needNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_WHITE);
		needNumTxt.text = data.needScore+"";
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, needNumTxt, chineseknot, [chineseknot.width, 0]); 
		this.addChild(needNumTxt);

		//可领取完美春节礼包
		let PackageTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		let num = index+1;
		var str =LanguageManager.getlocal("acNewYear7daysfestival"+num+"-"+this.nowCode);
		PackageTxt.text = str; 

		let tmpX = (chineseknot.width + needNumTxt.width - PackageTxt.width) / 2;
		PackageTxt.x = chineseknot.x + tmpX;
		if (this._code == "2"){
			PackageTxt.x = chineseknot.x + tmpX + 10;
		}
		PackageTxt.y = chineseknot.y + chineseknot.height + 7;
		this.addChild(PackageTxt);
		if(index==0)
		{
			PackageTxt.setColor(TextFieldConst.COLOR_WARN_YELLOW);
		}
	
		this.update();
		

	}
	private big_packageHandler(evt:egret.TouchEvent):void
	{
		let tmpVo = <AcNewYearSevenDaysVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR7DAYS,this._code); 
		if(tmpVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return
		}
		
		var data:any ={};
		data.reward =this._data.reward;
		data._name ="newYear1";
	
		var index = AcNewYearSevenDaysViewTab1.SCOREARR.indexOf(this._data.needScore);
		data.rewardNum =index+1;
		data._btnTypeNum = this._btnTypeNum;
		data.code =this._code;
		ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARSEVENDAYSPOPUPVIEW,data);
	
		
	}
	public update():void
	{
		let curr_AcNewYearSevenDaysVo = <AcNewYearSevenDaysVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR7DAYS,this._code);
		if(this._packageStateTxt)
		{
			if(AcNewYearSevenDaysViewTab1.SCOREARR[0]==3100)
			{
				AcNewYearSevenDaysViewTab1.SCOREARR.reverse();
			}
			
			var index = AcNewYearSevenDaysViewTab1.SCOREARR.indexOf(this._data.needScore); 
			this._packageStateTxt.visible =true;
			let num =index+=1;
			if(this._myScore>=this._data.needScore)
			{
				if(curr_AcNewYearSevenDaysVo.getBtnType(num))
				{
					this._packageStateTxt.text=LanguageManager.getlocal("candyGetAlready");
					this._packageStateTxt.textColor =TextFieldConst.COLOR_WHITE;
					this.public_dot.visible = false;
					App.DisplayUtil.changeToGray(this._packageStateTxt);
					App.DisplayUtil.changeToGray(this._typeBg);
					App.DisplayUtil.changeToGray(this.big_package);
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
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._packageStateTxt, this._typeBg);

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
		this.big_package = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM,this.update,this);  
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.update,this);
		super.dispose();
	}
}