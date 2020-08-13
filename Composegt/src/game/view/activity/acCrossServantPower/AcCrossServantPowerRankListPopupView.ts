/**
 * 跨服权势排行榜
 */

class AcCrossServantPowerRankListPopupView extends PopupView
{	
	private _scrollList:ScrollList;
	private _scrollList2:ScrollList;
	private _infoList:any[] = [];
	protected _scroRect:egret.Rectangle;
	private atkracedes5:any =null;
	private isShowTextBoo:boolean =false;
	private _curTabIdx : number = 0;
	private _nickName : BaseTextField = null;
	private _nickNameTxt : BaseTextField = null;
	private _serverTxt : BaseTextField = null;
	private _playerName : BaseTextField = null;
	private _playerServer : BaseTextField = null;
	private _playerRank : BaseTextField = null;
	private _playerScore : BaseTextField = null;
	private _atkracedes5 : BaseTextField = null;
	private _currZidTxt: BaseTextField = null;

    public constructor() 
	{
		super();
	}

	protected getTitleStr():string
	{
		return "acRankBtnTxt";
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rankinglist_line",
			"rankinglist_rankbg",
			"rank_biao",
			"rank_1","rank_2","rank_3","public_tc_bg05",
			
        ]);
	}
	// private get api() : CrossPowerVoApi{
    //     return Api.crossPowerVoApi;
    // }
	
	// private get cfg() : Config.AcCfg.CrossServerPowerCfg{
    //     return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    // }

    private get vo() : AcCrossServantPowerVo{
        return <AcCrossServantPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    public initView():void
	{

		let rankBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		rankBg.width = 540;
		rankBg.height = 720;
		rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, 10);
		this.addChildToContainer(rankBg);
		
		let tcbg2= BaseBitmap.create("public_tc_bg03");
        tcbg2.width = rankBg.width-20;
        tcbg2.height = 590;
        tcbg2.x = rankBg.x+10;
        tcbg2.y = rankBg.y + 10;
        this.addChildToContainer(tcbg2);


		let bottomBg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		bottomBg.width = 516;
		bottomBg.height = 100;
		bottomBg.setPosition(this.viewBg.width/2  - bottomBg.width/2, tcbg2.y + tcbg2.height+10);
		this.addChildToContainer(bottomBg);


		let titleBg:BaseBitmap = BaseBitmap.create("rank_biao");
		titleBg.setPosition(this.viewBg.width/2  - titleBg.width/2 , tcbg2.y+10);
		this.addChildToContainer(titleBg);

		let deltaX = 30;
		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(65 + deltaX , titleBg.y+titleBg.height/2 - rankText.height/2+2);
		this.addChildToContainer(rankText);

	
		//玩家昵称
		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(190+deltaX , rankText.y);
		this.addChildToContainer(nameText); 
		this._nickNameTxt = nameText;
		// this._nickNameTxt.visible = false;

		let quText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServantPower_rankProtxt"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		quText.setPosition(516 - quText.textWidth , rankText.y);
		this.addChildToContainer(quText); 
		this._serverTxt = quText;


		//玩家名字
		let nickName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		nickName.setPosition(rankText.x-20 , bottomBg.y+10);
		this.addChildToContainer(nickName);
		this._nickName = nickName;
		// this._nickName.visible = false;
		let name:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		name.setPosition(nickName.x + nickName.width +12 , nickName.y);
		this.addChildToContainer(name);
		this._playerName = name;
		
		//涨幅
		let str:string =""+this.vo.v;;
		let socreText:BaseTextField = ComponentManager.getTextField((LanguageManager.getlocal(`acCrossServantPower_rankProtxt`)+': '), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		socreText.setPosition(nickName.x , nickName.y + nickName.height + 7);
		this.addChildToContainer(socreText);

		let socre:BaseTextField = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		socre.setPosition(socreText.x + socreText.width, socreText.y);
		this.addChildToContainer(socre);
		this._playerScore = socre;


		//排行
		let rankStr:string;
		let rankOrder = this.vo.myrank;

		if(rankOrder)
		{
			if (rankOrder > 300) {
				rankStr = "10000+";
			}
			else {
				rankStr = rankOrder.toString();
			}
		}
		else
		{	//未上榜
			rankStr =LanguageManager.getlocal("atkracedes4");// this._merank.toString();
		}
		//排名
		let rankText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		rankText2.setPosition(this._nickName.x , socreText.y+socreText.height + 7);
		this.addChildToContainer(rankText2);
		let rank:BaseTextField = ComponentManager.getTextField(rankStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		rank.setPosition(rankText2.x + rankText2.width + 12 , rankText2.y);
		this.addChildToContainer(rank);
		this._playerRank = rank;

		this._infoList = this.vo.ranks;
		// for(let i in this.api.zonerankinfos){
		// 	let unit = this.api.zonerankinfos[i];
		// 	this._infoList.push({
		// 		zid : unit.zid,
		// 		point : unit.point,
		// 		type : 'rank',
		// 		acid : this.vo.aid
		// 	});
		// }
		AcCrossServantPowerRankScrollItem._ACVO = this.vo;
		this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, 520,530);
		// AcCrossServantPowerScrollItem._ACVO = this.vo;
		this._scrollList = ComponentManager.getScrollList(AcCrossServantPowerRankScrollItem,this._infoList,this._scroRect);
		this._scrollList.x = tcbg2.x;
		this._scrollList.y =  titleBg.y + titleBg.height;
		this.addChildToContainer(this._scrollList);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") ,TextFieldConst.COLOR_BROWN);

    }

    public dispose():void
	{	
		this._scrollList = null;
		this._scrollList2 = null;
		this. _scroRect = null;
		this._nickName = null;
		this._nickNameTxt = null;
	 	this._serverTxt = null;
		this._playerName = null;
		this._playerServer = null;
		this._playerRank = null;
		this._playerScore = null;
		this._atkracedes5  = null;
		this._infoList = [];
		super.dispose();
	}
}