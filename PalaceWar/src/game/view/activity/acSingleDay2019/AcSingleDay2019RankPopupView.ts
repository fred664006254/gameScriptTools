/**
 * 冲榜排行
 * author yanyuling
 * date 2017/11/06
 * @class AcRankListPopupView
 */

class AcSingleDay2019RankPopupView  extends PopupView
{
	private _nodeContainer:BaseDisplayObjectContainer;
    private _scrollView:ScrollList;
    private _listdata = [];

	public constructor() {
		super();
    }

    protected getTitleStr():string{
        return `buildtxt1Tab4_1`;
    }
    
    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
			case 2:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
	
	private get cfg() : Config.AcCfg.SingleDay2019Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcSingleDay2019Vo{
        return <AcSingleDay2019Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
    }

    protected getRequestData():{requestType:string,requestData:any}{	
		return {
            requestType:NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRANK,
            requestData:{
                activeId : this.acTivityId
            }
        };
	}

	protected receiveData(data:{ret:boolean,data:any}):void{
        if(data.data.data){ 
            this.vo.setRankInfo(data.data.data);
            this._listdata = data.data.data.rankArr;
        } 
    }

	public initView():void
	{	
        let rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid,String(this.code));

        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.height = 800;
        this.addChildToContainer(this._nodeContainer);
        let startY = 20;
        
        let bg1= BaseBitmap.create("public_9_bg36");
        bg1.width = 520;
        bg1.height = 650;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        
        this._nodeContainer.addChild(bg1);

        let titleTxt2Str = LanguageManager.getlocal("acRankPop_title2");
        // if(rankcfg.type == 4)
        // {
        //     titleTxt2Str = LanguageManager.getlocal("acRankPop_titleAlliance");
        // }
        // else 
        // if(rankcfg.type == 12||rankcfg.type == 13||rankcfg.type == 14||rankcfg.type == 4)
        // {
        //     titleTxt2Str = LanguageManager.getlocal("acRankPop_titleAlliance");
        //     let deltaH = 30
        //     bg1.height -= deltaH;
        //     startY += deltaH;
        //     let tabName = ["acRankListTab1","acRankListTab2"];
           
        //     let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
        //     tabbarGroup.setSpace(2);
        //     tabbarGroup.x = 30;
        //     tabbarGroup.y = 9;
        //     this._nodeContainer.addChild(tabbarGroup);
        // }
        
        let bg2= BaseBitmap.create("public_9_bg33");
        bg2.width = bg1.width;
        bg2.height = 40;
        bg1.y = startY;
        bg2.x = bg1.x;
        bg2.y = bg1.y;
        this._nodeContainer.addChild(bg2);
        
        let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt1.x = bg2.x+40;
        titleTxt1.y = bg2.y + 8;
        this._nodeContainer.addChild(titleTxt1);

        let titleTxt2 = ComponentManager.getTextField(titleTxt2Str,titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt2.name = "titleTxt2"
        titleTxt2.x = bg2.x+175;
        titleTxt2.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt2);

        let titleStr3:string;
        titleStr3 = LanguageManager.getlocal("acSingleDay2019UseGem-"+ this.getUiCode());

        let titleTxt3 = ComponentManager.getTextField(titleStr3,titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt3.x = bg2.x+430 - titleTxt3.width/2;
        titleTxt3.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt3);
        titleTxt3.name = "titleTxt3"

        let bg3= BaseBitmap.create("public_9_bg1");
        bg3.width = bg1.width;
        bg3.height = 100;
        bg3.x = bg1.x;
        bg3.y = bg1.y + bg1.height + 9;
        this._nodeContainer.addChild(bg3);

        let nickTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        nickTxt.text = LanguageManager.getlocal("acRank_mynick") + Api.playerVoApi.getPlayerName();
        nickTxt.x = bg3.x+20;
        nickTxt.y = bg3.y + 20;
        this._nodeContainer.addChild(nickTxt);

        let tipStr = "";
        tipStr = LanguageManager.getlocal(`acSingleDay2019Tip1-${this.getUiCode()}`,[this.cfg.needGemCost.toString()]);
        if(tipStr != ""){
            let tipTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN)
            tipTxt.text = tipStr
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, bg3, [0,bg3.height+10]);
            this._nodeContainer.addChild(tipTxt);
        }

        let addV = this.vo.getUseGemNum();
        let rankV = this.vo.getMyPrank();
		let str = '';
		if(rankV == 0){
			str = LanguageManager.getlocal('atkracedes4');
		}
		else{
			str = rankV.toString();
        }
        let myRankTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        myRankTxt.text = LanguageManager.getlocal("acRank_myrank",[str]);
        myRankTxt.x = nickTxt.x;
        myRankTxt.y = nickTxt.y+40;
        myRankTxt.name = "myRankTxt";
        this._nodeContainer.addChild(myRankTxt);

        let addStr = ""
        let addvalueTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_LIGHT_YELLOW);
        addvalueTxt.text = LanguageManager.getlocal("acRank_myaddV",[titleStr3,String(addV)]);
        addvalueTxt.x = myRankTxt.x + 240;
        addvalueTxt.y = myRankTxt.y ;
        addvalueTxt.name = "addvalueTxt";
        this._nodeContainer.addChild(addvalueTxt);

        let isShowFloor:boolean = false;
        // if(Api.switchVoApi.checkOpenAtkracegChangegpoint()&& rankcfg.type == 6)
        // {
        //     isShowFloor = true;
        // }
        let rect = new egret.Rectangle(0,0,this.viewBg.width,bg1.height -  60);
        let dataList = this._listdata;
        let scrollView = ComponentManager.getScrollList(AcRankListScrollItem,dataList,rect,{isShowFloor:isShowFloor});
        scrollView.x = GameData.popupviewOffsetX;
        scrollView.y = bg2.y+bg2.height;
        this._nodeContainer.addChild(scrollView);
       	scrollView.setEmptyTip(LanguageManager.getlocal("acPunishNoData") )
        this._scrollView = scrollView;
    }
    protected resetBgSize()
    {
        super.resetBgSize();
        let rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid,String(this.code));
        if (Api.switchVoApi.checkOpenAtkracegChangegpoint()&&(rankcfg.type == 14))
		{
			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acRankActivePointTip"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
			tipTxt.x = this.viewBg.x + this.viewBg.width - tipTxt.width - 40;
			tipTxt.y = 845;
			this.addChildToContainer(tipTxt);
		}
    }
    
    // protected tabBtnClickHandler(params:any)
    // {
    //     let titleTxt2 = <BaseTextField>this._nodeContainer.getChildByName("titleTxt2");
        
    //     let titleTxt3 = <BaseTextField>this._nodeContainer.getChildByName("titleTxt3");
    //     let addvalueTxt  = <BaseTextField>this._nodeContainer.getChildByName("addvalueTxt");
    //     let myRankTxt =  <BaseTextField>this._nodeContainer.getChildByName("myRankTxt");

    //     let index = params.index;
    //     let dataList = [];
    //     let titleStr2 = "";
    //     let titleStr3 = "";
    //     let addV = 0;
    //     let rankV = "10000+";

    //     let isShowFloor:boolean = false;
    //     let rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid,String(this._code));
    //     if(index == 0)
    //     {
    //         titleStr2 =LanguageManager.getlocal("acRankPop_titleAlliance");
    //         dataList = this._listdata;
    //         titleStr3 = LanguageManager.getlocal("acRankPop_title3_12");
    //         if(this.vo.getMyPrank())
    //         {
    //             addV = this.vo.getMyPScore();
    //             rankV = String(this.vo.getMyPrank());
    //         }
            
    //         // let rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid,String(this._code));
    //         if(rankcfg.type==13||rankcfg.type==14||rankcfg.type==4)
    //         {
    //             titleStr3 = LanguageManager.getlocal("acRankPop_title3_"+rankcfg.type); 
    //         }
    //         isShowFloor = false;

    //     }else{
    //         titleStr2 =LanguageManager.getlocal("acRankPop_title2");
    //         // dataList = this._acRankInfoVo.rankList;
    //         dataList = this._allirank?this._allirank.rankList:null;
    //         titleStr3 = LanguageManager.getlocal("acRankPop_title3_12_1");
    //         if(this._allirank&&this._allirank.myrank && this._allirank.myrank.myrank)
    //         {
    //             addV = this._allirank.myrank.value;
    //             rankV = String(this._allirank.myrank.myrank);
    //         }
    //         if(Api.switchVoApi.checkOpenAtkracegChangegpoint()&& (rankcfg.type == 14)) //||rankcfg.type == 6
    //         {
    //             isShowFloor = true;
    //         }
    //     }
    //     titleTxt2.text = titleStr2; 
    //     titleTxt3.text = titleStr3;
       
    //     addvalueTxt.text = LanguageManager.getlocal("acRank_myaddV",[titleStr3,String(addV)]);
    //     myRankTxt.text = LanguageManager.getlocal("acRank_myrank",[rankV]);

    //     if (index == 1)
    //     {
    //         this._scrollView.refreshData(dataList,{isShowFloor:isShowFloor,type:rankcfg.type});
    //     }
    //     else
    //     {
    //         this._scrollView.refreshData(dataList,{isShowFloor:isShowFloor});
    //     }

        
    // }

    protected getResourceList():string[]
	{   
		return super.getResourceList().concat(["activity_rank_ask",
        "rankinglist_rankn1",
        "rankinglist_rankn2",
        "rankinglist_rankn3",
        "rankbgs_1",
        "rankbgs_2",
        "rankbgs_3",
        "rankbgs_4",
        
        
        
		]);
	}
    public dispose()
    {
        this._nodeContainer =null;
        this._scrollView = null;
        this._listdata = [];

        super.dispose()
    }
}