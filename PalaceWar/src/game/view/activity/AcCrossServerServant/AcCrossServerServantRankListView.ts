/**
 * 门客pk排行榜
 */

class AcCrossServerServantRankListView extends PopupView
{	
    public constructor() 
	{
		super();
	}

	protected getTitleStr() : string{
		return 'allianceBtnRank';
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rankinglist_line",
			"rankinglist_rankbg",
			"rankinglist_rank1",
			"rankinglist_rank2",
			"rankinglist_rank3",
			
        ]);
	}

	private get api() : AcCrossServerServantVoApi{
        return Api.crossServerServantVoApi;
	}

	private get vo() : AcCrossServerServantVo{
        return <AcCrossServerServantVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_SERVANTPK);
	}

	private _data : any;

	protected getRequestData():{requestType:string,requestData:any}
	{
		let view = this;
		return {requestType:NetRequestConst.REQUST_SERVANTPK_RANK,requestData:{
			activeId : `${view.vo.aid}-${view.vo.code}`,
			sid : view.api.getWinServantId()
        }};
    }
    

	protected receiveData(data:{ret:boolean,data:any}):void
	{
        let view = this;
		view._data = data.data.data;
		//view.api.setZoneRankInfo(data.data.data);
	}

    public initView():void
	{
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK), this.fresh_view, this);
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK), this.fresh_view, this);
		//let tabName = ["crossServerImacyRankListViewTab1", "crossServerImacyRankListViewTab2"];

		let rankBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		rankBg.width = 516;
		rankBg.height = 550;
		rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, 10);
		this.addChildToContainer(rankBg);

		let titleBg:BaseBitmap = BaseBitmap.create("public_9_bg41");
		titleBg.width = rankBg.width;
		titleBg.height = 36;
		titleBg.setPosition(rankBg.x , rankBg.y);
		this.addChildToContainer(titleBg);

		let bottomBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bottomBg.width = 516;
		bottomBg.height = 100;
		bottomBg.setPosition(this.viewBg.width/2  - bottomBg.width/2, rankBg.y + rankBg.height+8);
		this.addChildToContainer(bottomBg);

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(65+GameData.popupviewOffsetX , titleBg.y+titleBg.height/2 - rankText.height/2);
		this.addChildToContainer(rankText);

		//玩家昵称
		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(160+GameData.popupviewOffsetX , rankText.y);
		this.addChildToContainer(nameText); 
		
		//标题区服
		let quText : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		quText.setPosition(300+GameData.popupviewOffsetX, rankText.y);
		this.addChildToContainer(quText); 

		//门客属性
		let scoreText : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`crossserverServantattr1`),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(407+GameData.popupviewOffsetX , rankText.y);
		this.addChildToContainer(scoreText);

		//玩家名字
		let nickName : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this.setLayoutPosition(LayoutConst.lefttop, nickName, bottomBg, [10,20]);
		this.addChildToContainer(nickName);

		let name:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.setLayoutPosition(LayoutConst.lefttop, name, nickName, [nickName.textWidth + 3,0]);
		this.addChildToContainer(name);
		//排行
		let rankStr:string;
		let rankOrder = 0;
		let rankPoint = 0;
		for(let i in this._data.sinfo){
			let unit = this._data.sinfo[i];
			if(unit.uid == Api.playerVoApi.getPlayerID()){
				rankOrder = Number(i) + 1;
				rankPoint = Number(unit.point);
				break;
			}
		}
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
		let rankText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText2.x = 342+GameData.popupviewOffsetX;
		rankText2.y = 626;
		this.addChildToContainer(rankText2);

		let rank:BaseTextField = ComponentManager.getTextField(rankStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.setLayoutPosition(LayoutConst.lefttop, rank, rankText2, [rankText2.textWidth + 3,0]);
		this.addChildToContainer(rank);

		//亲密涨幅
		let str:string ="";
		if(this.api.vo.v)
		{
			str	= App.StringUtil.changeIntToText(this.api.vo.v);
		}else
		{
			str = LanguageManager.getlocal('emperorWarCheerNot');
		}
		let socreText : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`crossserverServantattr2`,[str]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		socreText.x = 37+GameData.popupviewOffsetX;
		socreText.y = 626;
		this.addChildToContainer(socreText);

		// let socre:BaseTextField = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		// this.setLayoutPosition(LayoutConst.lefttop, socre, socreText, [socreText.textWidth + 3,0]);
		// this.addChildToContainer(socre);
		
		//玩家区服
		let serveText:BaseTextField = ComponentManager.getTextField('',TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		serveText.x = 342+GameData.popupviewOffsetX;
		serveText.y = 588
		let currZid:any = Api.mergeServerVoApi.getTrueZid();
		let servaername = Api.mergeServerVoApi.getAfterMergeSeverName();
		serveText.text = LanguageManager.getlocal("crossranserver",[servaername]);
		this.addChildToContainer(serveText);

		let arr = [];
		for(let i in this._data.sinfo){
			let unit = this._data.sinfo[i];
			arr.push({
				zid : unit.zid,
				point : unit.point,
				type : 'rank',
				acid : this.vo.aid,
				name : unit.name,
				uid : unit.uid
			});
		}
		let scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width,rankBg.height -titleBg.height - 8);
		let scrollList = ComponentManager.getScrollList(AcCorssImacyPRankItem,arr,scroRect);
		scrollList.x = titleBg.x;
		scrollList.y = titleBg.y + titleBg.height;
		this.addChildToContainer(scrollList);
	}
	

    public dispose():void
	{	
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK), this.fresh_view, this);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK), this.fresh_view, this);
		super.dispose();
	}
}