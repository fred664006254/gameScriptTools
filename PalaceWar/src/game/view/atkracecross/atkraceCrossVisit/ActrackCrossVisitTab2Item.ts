
class ActrackCrossVisitTab2Item extends ScrollListItem {

	private uid:string ="";
	private zid:number =0;
	public constructor() {
		super();
	}

	protected initItem(index: number, data: any) 
    {	

		// 0:{uid:uid,name:xx,point:分数,st:攻击时间,power:势力,level:官品}
		this.uid=data.uid;
		this.zid =data.zid;
		
		let bg = BaseBitmap.create("");
		bg.width=516;
		bg.height=126;
		bg.x =60;
		this.addChild(bg);

		let line = BaseBitmap.create("public_line1");
		line.x =60;
		line.y =120;
		this.addChild(line);
		

		let rankImg = BaseBitmap.create("rankinglist_rankbg");
		rankImg.x = bg.x+20
		rankImg.y = 10;
		this.addChild(rankImg);

		let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		rankTxt.text = String(index+1);
		rankTxt.x = rankImg.x+(rankImg.width-rankTxt.width)/2;
		rankTxt.y = rankImg.y+10;
		this.addChild(rankTxt);

		//名称  
		let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
		nameTxt.text =data.name;
		nameTxt.x = rankImg.x+60
		nameTxt.y = rankImg.y+10;
		this.addChild(nameTxt);
		
		//衙门分数
		let atkraceyamenScoreTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
		atkraceyamenScoreTxt.text =LanguageManager.getlocal("atkraceyamenid",[data.uid]);
		atkraceyamenScoreTxt.x = nameTxt.x+nameTxt.width;// 220;
		atkraceyamenScoreTxt.y = rankImg.y+10;
		this.addChild(atkraceyamenScoreTxt);
		
		//势力    
		let str3= LanguageManager.getlocal("powerDes",[data.power]);
		let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		powerTxt.text = str3;//+data.power;
		powerTxt.x = nameTxt.x;
		powerTxt.y = nameTxt.y+30;
		powerTxt.width =400;
		this.addChild(powerTxt);
		
		//对战信息    
		let warInforMationTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		let newPoint:number = Number(data.point);
		if (data.retscore != null)
		{
			newPoint =  Number(data.retscore);
		}

		if(newPoint>=0)
		{
			var str =LanguageManager.getlocal("atkracewardes",[String(newPoint)]);
			warInforMationTxt.text=str;
			warInforMationTxt.textColor =TextFieldConst.COLOR_WARN_GREEN;
		}else
		{
		   var str =LanguageManager.getlocal("atkracewardes2",[String(newPoint)]);
			warInforMationTxt.text =str;
			warInforMationTxt.textColor =TextFieldConst.COLOR_QUALITY_RED;
		}
		warInforMationTxt.text = str;
		warInforMationTxt.x = powerTxt.x;
		warInforMationTxt.y = powerTxt.y+30;
		this.addChild(warInforMationTxt);

		//时间  
		let timerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_ORANGE);
		timerTxt.text =App.DateUtil.getFormatBySecond(GameData.serverTime-data.st, 4);
		timerTxt.x =485;
		timerTxt.y =nameTxt.y;
		this.addChild(timerTxt);
		
		//复仇按钮
		let revengeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"atkraceRevenge",this.revengeBtnHandler,this);
		revengeBtn.setScale(0.85);
		revengeBtn.x = timerTxt.x-30;
		revengeBtn.y = timerTxt.y+40;
		this.addChild(revengeBtn);

		if (data.expired)
		{
			let expired:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("atkrace_timeout"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			expired.x =nameTxt.x ;
			expired.y = warInforMationTxt.y+warInforMationTxt.height+5;
			this.addChild(expired);

			line.y+=12;
			bg.height+=12;

		}
	}
	private revengeBtnHandler(evt:egret.TouchEvent):void
	{
		var data:any =[];
		data.type=2;//复仇
		data.uid=this.uid;
		data.zid =this.zid;
		AtkraceCrossChallengeItem.data =data;
		Api.atkracecrossVoApi.revengeIdx = this._index + 1;
		ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECROSSCHALLENGEVIEW);
	}
    
	public getSpaceY(): number {
		return 10;
	}
	public getSpaceX(): number {
		return 0;
	}
	public dispose(): void {
		AtkraceCrossChallengeItem.data=null;
		super.dispose();
	}
}