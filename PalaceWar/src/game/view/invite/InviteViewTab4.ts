/**
 * 邀请有礼，关系界面
 * 
 */
class InviteViewTab4 extends CommonViewTab
{
	private _scrollList:ScrollList;
	public constructor() 
	{
		super();
		this.initView();
	}

	protected initView():void
	{

        let innerBg = BaseBitmap.create("public_9_bg32");
        innerBg.height = GameConfig.stageHeigth - 350 - 80;
        innerBg.width = 590;
        innerBg.x = GameConfig.stageWidth/2 - innerBg.width/2;
        innerBg.y = 80;
        this.addChild(innerBg);

        let titleBg = BaseBitmap.create("public_9_bg33");
        titleBg.width = innerBg.width;
        titleBg.height = 50;
        titleBg.x = innerBg.x;
        titleBg.y = innerBg.y;
		this.addChild(titleBg);


        //标题信息
        //底部个人排行信息
        let  title_rankTxt  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_rankTxt.text = LanguageManager.getlocal("rankorder");
        title_rankTxt.x = titleBg.x + 20; 
        title_rankTxt.y =   titleBg.y  + titleBg.height/2 -title_rankTxt.height+15 ;
        this.addChild(title_rankTxt);

        let title_nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_nameTxt.text = LanguageManager.getlocal("ranknickName");
        title_nameTxt.x = title_rankTxt.x + 110;
        title_nameTxt.y = title_rankTxt.y
        this.addChild(title_nameTxt);

        let title_serverTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_serverTxt.text = LanguageManager.getlocal("serverListServer2");
        title_serverTxt.x = title_nameTxt.x + 200;
        title_serverTxt.y = title_rankTxt.y;
        this.addChild(title_serverTxt);

        let title_powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_powerTxt.text = LanguageManager.getlocal("rankpower");
        title_powerTxt.x = title_serverTxt.x + 150;
        title_powerTxt.y = title_rankTxt.y;
        this.addChild(title_powerTxt);


		// 列表
		let friendList = Api.inviteVoApi.sortedByPower;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth,GameConfig.stageHeigth - 500);
		this._scrollList  = ComponentManager.getScrollList(InviteViewTab4ScrollItem,friendList,rect);
		this._scrollList.y = titleBg.y + titleBg.height + 10;
		this.addChild(this._scrollList);

	}

	public dispose():void
	{
		super.dispose();
	}
}