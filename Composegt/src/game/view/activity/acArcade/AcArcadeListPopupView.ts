/**
  * 电玩十连 中奖名单
  yanyuling
  * @class AcArcadeListPopupView
  */
  
class AcArcadeListPopupView  extends PopupView
{
	private _infoList:any[] = [];

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"rank_biao",
			]);
	}

	protected initView():void
	{	

		let rankBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		rankBg.width = 540;
		rankBg.height = 600;
		rankBg.setPosition(40,20);
		this.addChildToContainer(rankBg);

		let titleBg:BaseBitmap = BaseBitmap.create("rank_biao");
		titleBg.width = 502;
		titleBg.height = 36;
		titleBg.setPosition(59 ,30);
		this.addChildToContainer(titleBg);
		
		//玩家昵称
		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(titleBg.x+40, titleBg.y+10);
		this.addChildToContainer(nameText);

		//擂台分数
		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeListPopup_Title2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(titleBg.x+ titleBg.width/2 - scoreText.width/2-20 , nameText.y);
		this.addChildToContainer(scoreText);
		//时间戳
		let timeText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeListPopup_Title3"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		timeText.setPosition(titleBg.x + titleBg.width -130 , nameText.y );
		this.addChildToContainer(timeText);

		let innerBg = BaseBitmap.create("public_tc_bg03");
        innerBg.width = rankBg.width - 20;
        innerBg.height  = 530;
		innerBg.x = rankBg.x+10;
		innerBg.y = titleBg.y+titleBg.height + 5; 
        this.addChildToContainer(innerBg);

		let _scrollContiner = new BaseDisplayObjectContainer();
		let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,innerBg.width-20, innerBg.height - 20);

		let _scrollView = ComponentManager.getScrollView( _scrollContiner,rect);
		_scrollView.x = innerBg.x + 10;
		_scrollView.y = innerBg.y + 10;
		this.addChildToContainer(_scrollView);
		_scrollView.horizontalScrollPolicy="off";

		let startY = 10;
		
		for (let i = 0 ; i < this._infoList.length; i++)
		{
			let data =  this._infoList[i];
			let tarcolor = TextFieldConst.COLOR_BROWN;
			if(data[0] == Api.playerVoApi.getPlayerID()){
				tarcolor = TextFieldConst.COLOR_WARN_GREEN;
			}
			//玩家昵称
			let txt1:BaseTextField = ComponentManager.getTextField(data[1],20, tarcolor);
			txt1.setPosition(80 - txt1.width/2, startY);
			_scrollContiner.addChild(txt1);

			//擂台分数
			let txt2:BaseTextField = ComponentManager.getTextField(data[2],20,tarcolor );
			txt2.setPosition(230 - txt2.width/2 , txt1.y);
			_scrollContiner.addChild(txt2);
			
			//时间戳
			let time = App.DateUtil.getFormatBySecond(data[3], 2);
			let txt3:BaseTextField = ComponentManager.getTextField(time ,20,tarcolor );
			txt3.setPosition(400 -txt3.width/2 ,  txt1.y);
			_scrollContiner.addChild(txt3);
			startY += 30;
		}
		if( !this._infoList || ! this._infoList.length ||this._infoList.length == 0){
			let emptyTxt=ComponentManager.getTextField(LanguageManager.getlocal("acArcadeListPopup_nodata"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
			emptyTxt.x = innerBg.x + innerBg.width/2 - emptyTxt.width/2;
			emptyTxt.y = innerBg.y + innerBg.height/2 - emptyTxt.height/2;
			this.addChildToContainer(emptyTxt);
			emptyTxt.name="emptyTxt";
		}

	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUST_ACTIVITY_WININFO,requestData:{activeId: this.param.data.activeId}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		this._infoList = data.data.data.allwinfos;
	}

	// 计算背景高度时使用，在container高度的基础上添加该高度
	protected getBgExtraHeight():number
	{
		return 20;
	}

	public dispose():void
	{	
		this._infoList = [];
		super.dispose();
	}
}