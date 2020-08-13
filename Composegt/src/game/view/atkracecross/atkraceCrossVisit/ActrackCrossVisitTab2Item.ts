
class ActrackCrossVisitTab2Item extends ScrollListItem {

	private uid:string ="";
	private zid:number =0;
	public constructor() {
		super();
	}

	protected initItem(index: number, data: any) 
    {	

		this.width = 640;
		this.height = 120;
		// 0:{uid:uid,name:xx,point:分数,st:攻击时间,power:势力,level:官品}
		this.uid=data.uid;
		this.zid =data.zid;
		let bg = BaseBitmap.create("public_listbg");
		bg.width=516;
		bg.height=120;
		// bg.x =60;
		this.addChild(bg);
		bg.visible = false;
		// let line = BaseBitmap.create("public_line1");
		// line.x =60;
		// line.y =120;
		// this.addChild(line);
		if(index > 0){
			let line = BaseBitmap.create("public_line4");
			line.width = 503;
			line.x = GameConfig.stageWidth/2- line.width/2;
			line.y = bg.y - line.height/2;
			this.addChild(line);
		}		

		let rankImg = BaseBitmap.create("rankinglist_rankbg");
		rankImg.x = bg.x+10
		rankImg.y = 10;
		this.addChild(rankImg);
		rankImg.visible =false;

		let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		rankTxt.text = String(index+1);
		rankTxt.x = rankImg.x+(rankImg.width-rankTxt.width)/2;
		rankTxt.y = rankImg.y+10;
		this.addChild(rankTxt);

		//名称  
		let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		nameTxt.text =data.name;
		nameTxt.x = rankImg.x+45
		nameTxt.y = rankImg.y+10;
		this.addChild(nameTxt);
		
		//衙门分数
		let atkraceyamenScoreTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		atkraceyamenScoreTxt.text =LanguageManager.getlocal("atkraceyamenscore",[data.point]);
		atkraceyamenScoreTxt.x = nameTxt.x+nameTxt.width;// 220;
		atkraceyamenScoreTxt.y = rankImg.y+10;
		this.addChild(atkraceyamenScoreTxt);
		
		let str3= LanguageManager.getlocal("powerDes",[data.power]);
		//势力    
		let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		powerTxt.text = str3;
		powerTxt.x = nameTxt.x;
		powerTxt.y = nameTxt.y+30;
		powerTxt.width =400;
		this.addChild(powerTxt);
		
		//对战信息    
		let warInforMationTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		if(data.point>=0)
		{
			var str =LanguageManager.getlocal("atkracewardes",[data.point]);
			warInforMationTxt.text=str;
			warInforMationTxt.textColor =TextFieldConst.COLOR_WARN_GREEN;
		}else
		{
		   var str =LanguageManager.getlocal("atkracewardes2",[data.point]);
			warInforMationTxt.text =str;
			warInforMationTxt.textColor =TextFieldConst.COLOR_QUALITY_RED;
		}
		warInforMationTxt.text = str;
		warInforMationTxt.x = powerTxt.x;
		warInforMationTxt.y = powerTxt.y+30;
		this.addChild(warInforMationTxt);

		//时间  
		let timerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		timerTxt.text =App.DateUtil.getFormatBySecond(GameData.serverTime-data.st, 4);
		timerTxt.x =this.width -timerTxt.width-10;
		timerTxt.y =nameTxt.y;
		this.addChild(timerTxt);
		
		//复仇按钮
		let revengeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"atkraceRevenge",this.revengeBtnHandler,this);
		revengeBtn.setScale(0.85);
		revengeBtn.x = bg.x + bg.width - revengeBtn.width * revengeBtn.scaleX  - 10; //this.width - revengeBtn.width*0.85 - 30;
		revengeBtn.y = timerTxt.y+40;
		this.addChild(revengeBtn);


	}
	private revengeBtnHandler(evt:egret.TouchEvent):void
	{
		var data:any =[];
		data.type=2;//复仇
		data.uid=this.uid;
		data.zid =this.zid;
		AtkraceCrossChallengeItem.data =data;
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