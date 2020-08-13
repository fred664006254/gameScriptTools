
class AcWeaponPrisonRankDetailPopupView extends PopupView{
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
		return {requestType:NetRequestConst.REQUEST_WEAPONPRISON_GETRANK, requestData:{activeId:this.vo.aidAndCode}};
    }
    
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (!data.ret){
            return;
        }
        this._rankData = data.data.data;
	}

    public initView():void{
        let bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 575;
        bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
        bg.y = 5;
        this.addChildToContainer(bg);

        let rankbg = BaseBitmap.create("public_popupscrollitembg");
        rankbg.width = 510;
        rankbg.height = 540;
        rankbg.x = this.viewBg.x + this.viewBg.width/2 - rankbg.width/2;
        rankbg.y = 30;
        this.addChildToContainer(rankbg);          

        let topContainer = new BaseDisplayObjectContainer();
        topContainer.width = 510;
        topContainer.height = 35;
        topContainer.setPosition(this.viewBg.x + this.viewBg.width/2 - topContainer.width/2, bg.y+10);
        this.addChildToContainer(topContainer);

        // 排行榜的topbg 
        let rankTopBg = BaseBitmap.create("public_9_bg37");
        rankTopBg.width = topContainer.width;
        rankTopBg.height = 35;
        topContainer.addChild(rankTopBg);
        // 排名 
        let code = "1"
        let rankTF  = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRankListRank", code)),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        rankTF.setPosition(rankTopBg.x + 47, rankTopBg.y + rankTopBg.height / 2 - rankTF.height / 2 + 3);
        topContainer.addChild(rankTF);
        // 玩家昵称 
        let rankPlayNameTF  = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRankListTopName", code)),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        rankPlayNameTF.setPosition(rankTopBg.x + rankTopBg.width / 2 - rankPlayNameTF.width / 2 - 10, rankTF.y);
        topContainer.addChild(rankPlayNameTF);
        // 积分
        let scoreTF  = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRankListTopScoreName", code)),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreTF.setPosition(rankTopBg.x + rankTopBg.width - scoreTF.width  - 48, rankTF.y);
        topContainer.addChild(scoreTF);

        //排行榜的ScrollList
        let data = this._rankData.rankArr;
		let rect = new egret.Rectangle(0, 0, topContainer.width, bg.height - topContainer.height-30);
		let rankScrollList = ComponentManager.getScrollList(AcSkyArmorRankDetailItem, data, rect, {aid: this.aid, code: this.code});
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
        let rankNiceNameTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRankListPlayerName", code), [nickName]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        rankNiceNameTF.setPosition(bottomBg.x + 30, bottomBg.y + 30);
        this.addChildToContainer(rankNiceNameTF);

        // 我的排名 
		let myRank:any = null;
		let score = 0;
        if(this._rankData && this._rankData.myrankArr && this._rankData.myrankArr.myrank)
        {
            myRank = this._rankData.myrankArr.myrank;
            if (myRank > 10000){
                myRank = "10000+";
            }
            if (this._rankData.myrankArr.value){
                score = this._rankData.myrankArr.value;
            }
            else{
                score = this.vo.getScore();
            }
        }
        else{
            //未上榜
            myRank = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRankNotInRank", this.getTypeCode()));
            score = this.vo.getScore();
        }
        let myRankTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRankListPlayerRank", this.getTypeCode()),[String(myRank)]),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(rankNiceNameTF.x, rankNiceNameTF.y + rankNiceNameTF.height + 15);
        this.addChildToContainer(myRankTF);
    
        //积分
        let myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRanklistPlayerScore", this.getTypeCode()),[String(score)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(bottomBg.width - 100, myRankTF.y);
		this.addChildToContainer(myScoreTF);
		
		let tip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponPrisonRankListTip", this.getTypeCode()), [""+this.cfg.needScore]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip.setPosition(bottomBg.x + bottomBg.width - tip.width + 10, bottomBg.y + bottomBg.height + 30);
        this.addChildToContainer(tip);
    }

    private get vo():AcWeaponPrisonVo{
        return <AcWeaponPrisonVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.WeaponPrisonCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
	}

	private getTypeCode():string{
		return this.param.data.uicode;
	}

    protected getShowHeight():number{
        return 780;
    }

    protected getTitleStr():string{
        return App.CommonUtil.getCnByCode("acMouseGoldRankTitle", "1");
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