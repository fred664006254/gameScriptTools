/**
  * 赵云排行榜Tab1
  * author 张朝阳
  * date 2018/7/10
  * @class AcMazeViewTab3
  */
class AcMazeRankPopupViewTab1 extends AcCommonViewTab {

	private _rankScrollList:ScrollList = null;

	private _rankMyTF :BaseTextField = null;
	public constructor() {
		super();
		this.initView();
	}
	/**
	 * 配置文件数据
	 */
	private get cfg() : Config.AcCfg.MazeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMazeView.AID, AcMazeView.CODE);
    }
	/**
	 * 服务器返回数据
	 */
	private get vo() : AcMazeVo{
        return <AcMazeVo>Api.acVoApi.getActivityVoByAidAndCode(AcMazeView.AID, AcMazeView.CODE);
    }
	public initView()
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZERANK,this.rankClickHandler,this);


		let rankBg = BaseBitmap.create("public_9_probiginnerbg");
		rankBg.width = 516;
		rankBg.height = 520;
		rankBg.setPosition(30,55);
		this.addChild(rankBg);

		let rankTopBg = BaseBitmap.create("public_9_bg37");
		rankTopBg.width = rankBg.width;
		rankTopBg.height = 35;
		rankTopBg.setPosition(rankBg.x,rankBg.y);
		this.addChild(rankTopBg);
		// 排名 
		let rankTF  = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankTF.setPosition(rankTopBg.x + 35,rankTopBg.y + rankTopBg.height / 2 - rankTF.height / 2);
		this.addChild(rankTF);
		// 玩家昵称 
		let rankPlayNameTF  = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankPlayNameTF.setPosition(rankTopBg.x + rankTopBg.width / 2 - rankPlayNameTF.width / 2 - 30,rankTF.y);
		this.addChild(rankPlayNameTF);
		// 杀敌数 
		let rankKillNumTF  = ComponentManager.getTextField(LanguageManager.getlocal("acMazeRankKillNum"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankKillNumTF.setPosition(rankTopBg.x + rankTopBg.width - rankKillNumTF.width  - 75,rankTF.y);
		this.addChild(rankKillNumTF);

		//排行榜的ScrollList
		let rect = new egret.Rectangle(0,0,rankBg.width,rankBg.height - rankTopBg.height - 10)
		this._rankScrollList = ComponentManager.getScrollList(AcMazeRankScrollItem,null,rect);
		this._rankScrollList.setPosition(rankTopBg.x,rankTopBg.y + rankTopBg.height);
		this.addChild(this._rankScrollList);

		// 底部的bg 
		let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
		buttomBg.width = 516;
		buttomBg.height = 112;
		buttomBg.setPosition(rankBg.x,rankBg.y + rankBg.height + 10);
		this.addChild(buttomBg);
		// 我的昵称 
		let niceName = Api.playerVoApi.getPlayerName();
		let rankNiceNameTF = ComponentManager.getTextField(LanguageManager.getlocal("acRank_mynick") + niceName,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankNiceNameTF.setPosition(buttomBg.x + 40,buttomBg.y + 20);
		this.addChild(rankNiceNameTF);
		// 上榜条件 
		let rankUpTF = ComponentManager.getTextField(LanguageManager.getlocal("AcMazeRankPopupViewTip",[String(this.cfg.rankNeedNum)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankUpTF.setPosition(buttomBg.x + buttomBg .width - rankUpTF.width - 40,rankNiceNameTF.y);
		this.addChild(rankUpTF);
		if(PlatformManager.checkIsTextHorizontal())
		{
			rankNiceNameTF.setPosition(buttomBg.x + 10,buttomBg.y + 20);
			rankUpTF.width = 250;
			rankUpTF.setPosition(buttomBg.x + buttomBg .width - rankUpTF.width - 10,rankNiceNameTF.y);
		}
		// 我的排名 rankorder2
		this._rankMyTF = ComponentManager.getTextField(LanguageManager.getlocal("rankorder2",[LanguageManager.getlocal("atkracedes4")]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rankMyTF.setPosition(rankNiceNameTF.x,buttomBg.y + buttomBg.height - this._rankMyTF.height -20);
		this.addChild(this._rankMyTF);
		// 转的次数
		let mazeNum = ComponentManager.getTextField(LanguageManager.getlocal("acMazeRankNum",[String(this.vo.getMazeNum())]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		mazeNum.setPosition(rankUpTF.x,this._rankMyTF.y);
		this.addChild(mazeNum);
		
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAZERANK,{"activeId":AcMazeView.ACTIVEID});
	}
	
	private rankClickHandler(event:egret.Event)
	{
		let data = event.data.data.data;
		if(data.rankArr.length == null)
		{
			this._rankScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") );
		}
		else
		{
			this._rankScrollList.refreshData(data.rankArr);
		}
		let myRank = data.myrankArr.myrank;
		let str:string;
		if(myRank == null)
		{
			str = LanguageManager.getlocal("atkracedes4");
		}
		else if(myRank > 10000)
		{
			str = "10000+";
		}
		else
		{
			str = myRank;
		}
		this._rankMyTF.text = LanguageManager.getlocal("rankorder2",[str])
	}

	public dispose()
	{
		this._rankScrollList = null;
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZERANK,this.rankClickHandler,this);
		super.dispose();
	}

}