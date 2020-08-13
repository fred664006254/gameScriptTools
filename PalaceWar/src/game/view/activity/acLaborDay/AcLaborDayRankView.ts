/**
 * 活动排名
 * author qianjun
 */
class AcLaborDayRankView extends PopupView
{
	// 滑动列表
	public constructor() 
	{
		super();
	}
	
	private get cfg() : Config.AcCfg.LaborDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLaborDayVo{
        return <AcLaborDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    private get aid() : string{
        return `${this.param.data.aid}`;
    }

    private get code() : string{
        return `${this.param.data.code}`;
	}

	protected getResourceList():string[]
	{
        let view = this;
        let arr = [];
        return super.getResourceList().concat([
            `rankbg_1`,`rankbg_2`,`rankbg_3`,`rankinglist_rankn1`,`rankinglist_rankn2`,
            `rankinglist_rankn3`,`rank_line`
        ]).concat(arr);
    }
	
	public initView():void
	{		
		let view = this;
		let contentBg = BaseBitmap.create("public_9_bg39");
		contentBg.width = 530;
		contentBg.height = 610;
		contentBg.x = view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
		contentBg.y = 20;
		view.addChildToContainer(contentBg);

		let bottomBg = BaseBitmap.create("public_9_bg1");
		bottomBg.width = 528;
		bottomBg.height = 70;
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = contentBg.y + contentBg.height + 15;
		view.addChildToContainer(bottomBg);

		let titlebg = BaseBitmap.create("public_9_bg33");
		titlebg.width = 528;
		titlebg.height = 30;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, contentBg);
		view.addChildToContainer(titlebg);

		//acwipeBossAllianceName acwipeBossPlayerName
		let myNameTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossPlayerName', [Api.playerVoApi.getPlayerName()]), 22); 
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myNameTxt, bottomBg, [25,10]);
		view.addChildToContainer(myNameTxt);

		let rankV = view.vo.getMyPrank();
		let addV = view.vo.getMyPScore();
		
		let str = '';
		if(rankV == 0){
			str = LanguageManager.getlocal('atkracedes4');
		}
		else{
			str = rankV.toString();
		}
		let color = TextFieldConst.COLOR_WARN_GREEN;
		let myRankStr =  ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossPlayerRank",[str.toString()]), 22, color); 
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, myRankStr, bottomBg, [25,10]);
		view.addChildToContainer(myRankStr);

		let scoreStr =  ComponentManager.getTextField(LanguageManager.getlocal(`acLaborranknum-${view.code}`,[addV.toString()]), 22, TextFieldConst.COLOR_WARN_GREEN); 
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoreStr, bottomBg, [100,10]);
		view.addChildToContainer(scoreStr);

		let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal(`acLaborBoxRankTip-${view.code}`, [this.cfg.rankNeed.toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTxt3.x = scoreStr.x;
		titleTxt3.y = myNameTxt.y;
		view.addChildToContainer(titleTxt3);

	// 	cRankPop_title1":"排名",
    // "acRankPop_title2":"玩家名称",
	// "acRankPop_titleAlliance":"帮会名称",
	// "acRankPop_title3_11":"积分",
	
		let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = contentBg.x + 40;
        titleTxt1.y = contentBg.y + 5;
        view.addChildToContainer(titleTxt1);

        let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt2.x = contentBg.x + 175;
        titleTxt2.y = titleTxt1.y;
		view.addChildToContainer(titleTxt2);

		let titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal(`acLaboriconname-${view.code}`), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
		titleTxt4.x = contentBg.x + 375;
        titleTxt4.y = titleTxt1.y;
		view.addChildToContainer(titleTxt4);

		let rankList = [];
		let rankInfo = view.vo.getRankInfo();
		// if(rankInfo.rankList && rankInfo.rankList.length){
		// 	rankList = rankInfo.rankList;
		// 	// for(let i in view.vo.getRankInfo().rankList){
		// 	// 	let unit = view.vo.getRankInfo().rankList[i];
		// 	// 	rankList.push({
		// 	// 		uid : unit.uid,
		// 	// 		name : unit.name,
		// 	// 		score : unit.score
		// 	// 	});
		// 	// }
		// }
		
		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,526,545);
		let scrollList = ComponentManager.getScrollList(AcLaborRankScrollItem,rankInfo,rect2);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, titlebg, [0,titlebg.height]);
		view.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
	}
	

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_LABORRANK,requestData:{
			activeId : view.vo.aidAndCode,
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		view.vo.setRankInfo(data.data.data);
	}


	protected getShowHeight():number{
		return 805;
	}
	
	protected getTitleStr():string{
		return 'rankViewTitle';
	}


	public hide():void{
		super.hide();
	}


	public dispose():void{
		let view = this;
		super.dispose();
	}
}