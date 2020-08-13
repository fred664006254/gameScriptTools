class PrestigeLogPopupScollItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		this.width = 526;
        this.height = 75;

         let bgImg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bgImg.width = 526;
		bgImg.height = 71;
		this.addChild(bgImg);

		/**
		--log
		--{dtype:类型 ,st:时间,v:值}
		--0做成 每日任务
		--1-14 各种冲榜
		 */

		let typeStr:string;
		if (data.dtype == 0){
			typeStr = LanguageManager.getlocal("dailyTaskViewTitle");
		}
		else if (data.dtype >= 31){
			typeStr = LanguageManager.getlocal("prestigeLogDescTxt"+data.dtype);
		}else {
			typeStr = LanguageManager.getlocal("acRankActive-"+data.dtype+"_Title");
		}

		let addV = "" + data.v;
		let descTxt:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		if(Api.switchVoApi.checkEmperorOpen()){
			descTxt.text = LanguageManager.getlocal("prestigeLogDesc2",[typeStr,addV,addV]);
		}else{
			descTxt.text = LanguageManager.getlocal("prestigeLogDesc",[typeStr,addV]);
		}
		descTxt.x = 13;
		descTxt.y = 10;
		descTxt.width = 500;
		descTxt.lineSpacing = 5;
		this.addChild(descTxt);
		

		let timeTxt = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(data.st,2),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		timeTxt.x = bgImg.width - timeTxt.width - 10;
        timeTxt.y = 43;
        this.addChild(timeTxt);
		
	}

	public dispose():void
    {
        super.dispose();
    }
}