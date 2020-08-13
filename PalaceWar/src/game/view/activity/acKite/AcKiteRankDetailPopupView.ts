/**
 * 排行榜
 * author ycg
 * date 2020.4.2
 * @class AcKiteRankDetailPopupView
 */
class AcKiteRankDetailPopupView extends PopupView{
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
		return {requestType:NetRequestConst.REQUEST_ACKITE_GETRANK, requestData:{activeId:this.vo.aidAndCode}};
    }
    
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (!data.ret){
            return;
        }
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
        let rankTF  = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteRankListRank", this.getTypeCode())),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        rankTF.setPosition(rankTopBg.x + 47, rankTopBg.y + rankTopBg.height / 2 - rankTF.height / 2 + 3);
        topContainer.addChild(rankTF);
        // 玩家昵称 
        let rankPlayNameTF  = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteRankListTopName", this.getTypeCode())),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        rankPlayNameTF.setPosition(rankTopBg.x + rankTopBg.width / 2 - rankPlayNameTF.width / 2 - 10, rankTF.y);
        topContainer.addChild(rankPlayNameTF);
        // 积分
        let scoreTF  = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteRankListTopScoreName", this.getTypeCode())),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreTF.setPosition(rankTopBg.x + rankTopBg.width - scoreTF.width  - 45, rankTF.y);
        topContainer.addChild(scoreTF);

        //排行榜的ScrollList
        let data = this._rankData.acrank.rankList;
		let rect = new egret.Rectangle(0, 0, topContainer.width, bg.height - topContainer.height);
		let rankScrollList = ComponentManager.getScrollList(AcKiteRankDetailItem, data, rect, {aid: this.aid, code: this.code});
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
        let rankNiceNameTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteRankListPlayerName", this.getTypeCode()), [nickName]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        rankNiceNameTF.setPosition(bottomBg.x + 40, bottomBg.y + 30);
        this.addChildToContainer(rankNiceNameTF);

        // 我的排名 
		let myRank:any = null;
		let score = 0;
        if( this._rankData && this._rankData.acrank && this._rankData.acrank.myrank)
        {
            if (this._rankData.acrank.myrank.myrank){
                myRank = this._rankData.acrank.myrank.myrank;
                if (myRank > 10000){
                    myRank = "10000+";
                }
            }
            else{
                myRank = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteRankNotInRank", this.getTypeCode()));
            }
            if (this._rankData.acrank.myrank.value){
                score = this._rankData.acrank.myrank.value * this.cfg.unitLength;
            }
            else{
                score = this.vo.maxhight * this.cfg.unitLength;
            }
        }
        else{
            //未上榜
            myRank = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteRankNotInRank", this.getTypeCode()));
        }
        let myRankTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteRankListPlayerRank", this.getTypeCode()),[String(myRank)]),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(rankNiceNameTF.x, rankNiceNameTF.y + rankNiceNameTF.height + 15);
        this.addChildToContainer(myRankTF);
    
        //积分
        let myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteRanklistPlayerScore", this.getTypeCode()),[String(score)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(bottomBg.width - 170, myRankTF.y);
		this.addChildToContainer(myScoreTF);
		
		let tip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKitefRankListTip", this.getTypeCode()), [""+this.cfg.height]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip.setPosition(bottomBg.x + bottomBg.width - tip.width + 10, bottomBg.y + bottomBg.height + 30);
        this.addChildToContainer(tip);
    }

    private get vo():AcKiteVo{
        return <AcKiteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.KiteCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
	}

	private getTypeCode():string{
		if (this.code == "2"){
			return "1";
		}
		return this.code;
	}

    protected getShowHeight():number{
        return 780;
    }

    protected getTitleStr():string{
        return App.CommonUtil.getCnByCode("acKiteRankTitle", this.getTypeCode());
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