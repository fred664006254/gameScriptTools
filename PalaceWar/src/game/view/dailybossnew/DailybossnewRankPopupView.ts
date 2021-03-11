class DailybossnewRankPopupView extends PopupView
{
	private _todayRank:{rankList:{uid:number,value:number,name:string}[],myrank:{uid:number,value:number,myrank:number}} = null;
	private _yesterdayRank:{rankList:{uid:number,value:number,name:string}[],myrank:{uid:number,value:number,myrank:number}} = null;
    private _desc1:BaseTextField = null;
    private _desc2:BaseTextField = null;
    private _rewardBtn:BaseButton = null;
    private _scrollList:ScrollList = null;
    private _desc3:BaseTextField = null;
    private _yesterdayEt:number = 0;

	public constructor()
	{
		super();
	}

    protected getResourceList():string[]
	{
        let view = this;
        let arr = [];
        return super.getResourceList().concat([
            `rankbg_1`,`rankbg_2`,`rankbg_3`,`rankinglist_rankn1`,`rankinglist_rankn2`,"rankbg_4",
            `rankinglist_rankn3`,`rank_line`
        ]).concat(arr);
    }

	protected getTabbarTextArr():string[]
	{	
		return ["dailybossnewRankTitle1","dailybossnewRankTitle2"];
	}

    protected getTitleStr():string
    {
        return "rankViewTitle";
    }

	protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_NEWBOSS_GETATTACKRANK,requestData:{yesterday:false}};
	}

	protected receiveData(data:{ret:boolean,data:any})
	{   

        if (this._selectedTabIndex == 0)
        {   
            if (this._todayRank)
            {
                this._todayRank=data.data.data.bossData;
                this.resetInfo();
            }
            else
            {
                this._todayRank=data.data.data.bossData;
            }
        }
        else
        {
            this._yesterdayRank=data.data.data.bossData;
            this._yesterdayEt = data.data.ts -86400;
            this.resetInfo();
        }
	}

	protected getScrollInfo():{rankList:{uid:number,value:number,name:string}[],myrank:{uid:number,value:number,myrank:number}}
	{
		if(this._selectedTabIndex==0)
		{
			return this._todayRank;
		}
		else if(this._selectedTabIndex==1)
		{
			return this._yesterdayRank;
		}
	}

    protected changeTab():void
	{
		this.request(NetRequestConst.REQUEST_NEWBOSS_GETATTACKRANK,{yesterday:this._selectedTabIndex==1});
	}

    protected initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWBOSS_GETREWARD),this.resetBtn,this);

        let scrollListBgRect=egret.Rectangle.create();
		scrollListBgRect.setTo(0,0,526,630);

        let bg1= BaseBitmap.create("public_9_bg36");
        bg1.width = scrollListBgRect.width;
        bg1.height = scrollListBgRect.height;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = 55+3;
		scrollListBgRect.x=bg1.x;
		scrollListBgRect.y=bg1.y;
        this.addChildToContainer(bg1);

        let bg2= BaseBitmap.create("public_9_bg33");
        bg2.width = bg1.width;
        bg2.height = 40;
        bg2.x = bg1.x;
        bg2.y = bg1.y;
        this.addChildToContainer(bg2);

        let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt1.x = bg2.x+40;
        titleTxt1.y = bg2.y + 8;
        this.addChildToContainer(titleTxt1);

        let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt2.x = bg2.x+175;
        titleTxt2.y = titleTxt1.y;
        this.addChildToContainer(titleTxt2);

        let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("dailybossnewRankValueDesc"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
		titleTxt3.textAlign=egret.HorizontalAlign.CENTER;
		titleTxt3.width=200;
        titleTxt3.x = bg2.x+bg2.width-titleTxt3.width;
        titleTxt3.y = titleTxt1.y;
        this.addChildToContainer(titleTxt3);

		let bg3= BaseBitmap.create("public_9_bg1");
		bg3.name="buttomBg";
		bg3.width = bg1.width;
		bg3.height = 90;
		bg3.setPosition(bg1.x,bg1.y + bg1.height + 40);
		this.addChildToContainer(bg3);

        let rect = egret.Rectangle.create();
        rect.setTo(0,0,scrollListBgRect.width-10,scrollListBgRect.height - 43);
        let scrollList = ComponentManager.getScrollList(DailybossnewRankList1Item,[],rect);
        this.addChildToContainer(scrollList);
        scrollList.setPosition(scrollListBgRect.x+5, scrollListBgRect.y+41);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this._scrollList = scrollList;

        let myRankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTxt.x = bg3.x+25;
        myRankTxt.y = bg3.y+20;
        this.addChildToContainer(myRankTxt);

        let addvalueTxt = ComponentManager.getTextField( "",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        addvalueTxt.x = myRankTxt.x;
        addvalueTxt.y = myRankTxt.y+38;
        this.addChildToContainer(addvalueTxt);

        this._desc1 = myRankTxt;
        this._desc2 = addvalueTxt;

        this._rewardBtn=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acwipeBossRank",this.rewardHandle,this);
		this._rewardBtn.setPosition(bg3.x+bg3.width -this._rewardBtn.width - 26,bg3.y+bg3.height/2 - this._rewardBtn.height/2);
		this.addChildToContainer(this._rewardBtn);

        let descTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_RED2);
        descTxt.setPosition(bg1.x,bg1.y + bg1.height);
        descTxt.width = bg1.width;
        descTxt.height = 40;
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        descTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChildToContainer(descTxt);
        this._desc3 = descTxt;

        this.resetInfo();

        this.resetBtn();
	}

    private resetBtn():void
    {
        let f = Api.dailybossnewVoApi.getRewardFlag();
        if (f == 1)
        {
            App.CommonUtil.addIconToBDOC(this._rewardBtn);
             this.tabbarGroup.addRedPoint(1);
        }
        else 
        {
            App.CommonUtil.removeIconFromBDOC(this._rewardBtn);
             this.tabbarGroup.removeRedPoint(1);
        }
    }

    private resetInfo():void
    {
        let info = this.getScrollInfo();


        let rankV = "10000+";
        let addV = 0;
        if(info.myrank.myrank)
        {
            rankV = String(info.myrank.myrank);
            addV = info.myrank.value;
        }
        this._desc1.text = LanguageManager.getlocal("dailybossnewRankDesc1",[String(addV)]);
        this._desc2.text = LanguageManager.getlocal("dailybossnewRankDesc2",[rankV]);
        if (this._selectedTabIndex == 0)
        {
             this._desc3.text = LanguageManager.getlocal("dailybossnewRankTip1");
             this._rewardBtn.visible = false;
        }
        else
        {   
            let datastr = App.DateUtil.getFormatBySecond(this._yesterdayEt,7);
            let timestr = datastr+" "+Config.DailybossnewCfg.getInTimeStr(1);
            this._desc3.text = LanguageManager.getlocal("dailybossnewRankTip2",[timestr]);
            this._rewardBtn.visible = true;
        }
        this._scrollList.refreshData(info.rankList);
        this._scrollList.setScrollTop(0);
    }

    private rewardHandle():void
    {
        ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSNEWAWARDPOPUPVIEW,{myrank:this._yesterdayRank.myrank});
    }

	protected getBgExtraHeight():number
	{
		return 40;
	}

    public dispose():void
	{

        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWBOSS_GETREWARD),this.resetBtn,this);

		this._todayRank = null;
        this._yesterdayRank = null;
        this._desc1 = null;
        this._desc2 = null;
        this._rewardBtn = null;
        this._scrollList = null;
        this._desc3 = null;
        this._yesterdayEt = 0;

		super.dispose();
	}
}
class DailybossnewRankList1Item extends RankPopupListItem
{
	public constructor()
	{
		super();
	}

    protected initItem(index:number,data:any):void
	{
		this.width = 526;
        this.height =  62;  //rankbg_1

        let tarColor = TextFieldConst.COLOR_BROWN
        if(data.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }

        if (index < 3)
        {    
            this.height =  76; 
            let rankbg = BaseBitmap.create("rankbg_"+String(index+1));
            rankbg.width = this.width;
            rankbg.height = 76;
            rankbg.x =0;
            rankbg.y = this.height/2 - rankbg.height/2;
            this.addChild(rankbg);

            let rankImg = BaseBitmap.create("rankinglist_rankn"+String(index+1))
            rankImg.x = 60-rankImg.width/2;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {   
            let rankbg = BaseBitmap.create("rankbg_4");
            rankbg.width = this.width;
            rankbg.height = 62;
            rankbg.x =0;
            rankbg.y = this.height/2 - rankbg.height/2;
            this.addChild(rankbg);

            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
            rankTxt.text = String(index+1);
            rankTxt.x = 60 - rankTxt.width/2;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }
       

        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        nameTxt.text =  data.name;
        nameTxt.x = 220 - nameTxt.width/2;
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);

        let titleTxt3 = ComponentManager.getTextField(String(data.value),TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        titleTxt3.textAlign=egret.HorizontalAlign.CENTER;
        titleTxt3.width=200;
        titleTxt3.x = 510-titleTxt3.width;
        titleTxt3.y=nameTxt.y;
        this.addChild(titleTxt3);
	}
}