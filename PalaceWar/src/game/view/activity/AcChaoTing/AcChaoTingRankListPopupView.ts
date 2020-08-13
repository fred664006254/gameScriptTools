/**
 * 朝廷诏令排行榜
 * author ycg
 * date 2020.3.24
 * @class AcChaoTingRankListPopupView
 */
class AcChaoTingRankListPopupView extends PopupView{
    private _rankData:any = null;

    public constructor(){
        super();
    }

    protected get uiType():string
	{
		return "2";
	}

	protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_ACCHAOTING_GETRANK, requestData:{activeId:this.vo.aidAndCode}};
    }
    
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (!data.ret){
            return;
        }
        // console.log(data.data.data);
        this._rankData = data.data.data;
	}

    public initView():void{
        let bg = BaseBitmap.create("public_9_bg36");
        bg.width = 520;
        bg.height = 575;
        bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
        bg.y = 5;
        this.addChildToContainer(bg);

        let topContainer = new BaseDisplayObjectContainer();
        topContainer.width = 520;
        topContainer.height = 35;
        topContainer.setPosition(this.viewBg.x + this.viewBg.width/2 - topContainer.width/2, bg.y);
        this.addChildToContainer(topContainer);

        // 排行榜的topbg 
        let rankTopBg = BaseBitmap.create("public_9_bg37");
        rankTopBg.width = topContainer.width;
        rankTopBg.height = 35;
        topContainer.addChild(rankTopBg);
        // 排名 
        let rankTF  = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRankListRank"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        rankTF.setPosition(rankTopBg.x + 47, rankTopBg.y + rankTopBg.height / 2 - rankTF.height / 2 + 3);
        topContainer.addChild(rankTF);
        // 玩家昵称 
        let rankPlayNameTF  = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRankListTopName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        rankPlayNameTF.setPosition(rankTopBg.x + rankTopBg.width / 2 - rankPlayNameTF.width / 2 - 10, rankTF.y);
        topContainer.addChild(rankPlayNameTF);
        // 积分
        let scoreTF  = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRankListTopToolNumName-"+this.getTypeCode()),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreTF.setPosition(rankTopBg.x + rankTopBg.width - scoreTF.width  - 45, rankTF.y);
        topContainer.addChild(scoreTF);

        //排行榜的ScrollList
        let data = this._rankData.rankArr;
		let rect = new egret.Rectangle(0, 0, topContainer.width, bg.height - topContainer.height);
		let rankScrollList = ComponentManager.getScrollList(AcChaoTingRankScrollItem, data, rect);
		rankScrollList.setPosition(topContainer.x, topContainer.y + topContainer.height);
		this.addChildToContainer(rankScrollList);
		rankScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

        // 底部bg 
        let bottomBg = BaseBitmap.create("public_9_bg1");
        bottomBg.width = 520;
        bottomBg.height = 112;
        bottomBg.setPosition(bg.x + bg.width/2 - bottomBg.width/2, bg.y + bg.height + 5);
        this.addChildToContainer(bottomBg);
        
        //昵称
        let nickName = Api.playerVoApi.getPlayerName();
        let rankNiceNameTF = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRankListPlayerName", [nickName]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        rankNiceNameTF.setPosition(bottomBg.x + 40, bottomBg.y + 30);
        this.addChildToContainer(rankNiceNameTF);

        // 我的排名 
        let myRank:any = null;
        if(this._rankData && this._rankData.myrankArr && this._rankData.myrankArr.myrank)
        {
            myRank = this._rankData.myrankArr.myrank;
            if (myRank > 10000){
                myRank = "10000+";
            }
        }
        else{
            //未上榜
            myRank = LanguageManager.getlocal("acChaotingRankNotInRank");
        }
        let myRankTF = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRankListPlayerRank",[String(myRank)]),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(rankNiceNameTF.x, rankNiceNameTF.y + rankNiceNameTF.height + 15);
        this.addChildToContainer(myRankTF);
    
        //积分
        let score = this.vo.getToolNum();
        let myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRanklistPlayerToolNum-"+this.getTypeCode(),[String(score)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(bottomBg.width - 170, myRankTF.y);
        this.addChildToContainer(myScoreTF);

        let tip = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingfRankListTip-"+this.getTypeCode(), [""+this.cfg.number]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip.setPosition(bottomBg.x + bottomBg.width - tip.width + 10, bottomBg.y + bottomBg.height + 30);
        this.addChildToContainer(tip);

        // if (this.vo.getToolNum() < this.cfg.number){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("acChaotingfRankListTip-"+this.getTypeCode(), [""+this.cfg.number]));
        // }
    }

    private get vo():AcChaoTingVo{
        return <AcChaoTingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.ChaoTingCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private getTypeCode():string{
        return this.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }

    protected getShowHeight():number{
        return 780;
    }

    protected getTitleStr():string{
        return "acChaotingRankListPopupTitle";
    }

    protected getResourceList():string[]{

        return super.getResourceList().concat([
            "rankinglist_rankn1",
            "rankinglist_rankn2",
            "rankinglist_rankn3",
            "rankbgs_1",
            "rankbgs_2",
            "rankbgs_3",
            "rankbgs_4",
            "rank_line",
        ]);
    }

    public dispose():void{
        this._rankData = null;

        super.dispose();
    }
}