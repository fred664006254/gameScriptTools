/**
 * 帮会争霸的logItem
 * author 张朝阳
 * date 2018/10/13
 * @class AllianceWarLogScrollItem
 */
class AllianceWarLogScrollItem extends ScrollListItem
{

	private _data : any;
	public constructor() 
	{
		super();
	}

	public initItem(index:number,data:any):void
	{
		this._data = data;
		this.width = 640;
		let rankImg = BaseBitmap.create("rankinglist_rankbg");
		rankImg.setPosition(10,15);
        this.addChild(rankImg);

		let rankTxt = ComponentManager.getTextField(String(index + 1),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
		rankTxt.setPosition(rankImg.x + rankImg.width / 2 - rankTxt.width / 2,rankImg.y + rankImg.height / 2 - rankTxt.height / 2);
		this.addChild(rankTxt);

		let descTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarViewFirestLog1",[data.zid,data.name]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
		descTxt1.setPosition(rankImg.x + rankImg.width + 20 ,rankImg.y + rankImg.height / 2 - descTxt1.height / 2 );
		this.addChild(descTxt1);

		let descTxt2Str = "";
		if(data.tinfo&&data.tinfo.zid)
		{
			descTxt2Str = LanguageManager.getlocal("allianceWarViewFirestLog2_" + data.win,[App.StringUtil.changeIntToText(data.totaldps),data.tinfo.zid, data.tinfo.name]);
		}
		else
		{
			descTxt2Str = LanguageManager.getlocal("allianceWarViewFirestLog2_3",[App.StringUtil.changeIntToText(data.totaldps)]);
		}
		let descTxt2 = ComponentManager.getTextField(descTxt2Str,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		descTxt2.setPosition(descTxt1.x,descTxt1.y + descTxt1.height + 3);
		this.addChild(descTxt2);

		// lastday
		let timeStr = App.DateUtil.getFormatBySecond(data.lastday,2)
		let timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarViewLogTime",[timeStr]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		timeTxt.setPosition(descTxt2.x,descTxt2.y + descTxt2.height + 25);
		this.addChild(timeTxt);

		let playBackBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceWarPlayBack",this.playBackClick,this);
		playBackBtn.setPosition(this.width - playBackBtn.width - 20,timeTxt.y + timeTxt.height / 2 - playBackBtn.height / 2);
		this.addChild(playBackBtn);
		
		let line:BaseBitmap = BaseBitmap.create("rankinglist_line");
		line.setPosition(this.width / 2 - line.width / 2 ,playBackBtn.y +  playBackBtn.height + 15);
		this.addChild(line);
	}
	private playBackClick()
	{
		let view = this;
		ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCEWARSHOWANTIVIEW, view._data);
	}

	public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
	{

		super.dispose();
	}
}