/**
 * 皇宫历史
 * author yanyuling
 * date 2017/11/02
 * @class PalaceHistoryPopupView
 */
class PalaceHistoryPopupView  extends PopupView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    static titleId:string = ""
    private _rankData = [];
    public constructor() 
	{
		super();
	}

	public initView():void
	{	
        this._nodeContainer = new BaseDisplayObjectContainer();
       
        let titleId = this.param.data.titleId;
        let titlecfg = Config.TitleCfg.getTitleCfgById(titleId);
        let isCross = titlecfg.isCross;
        let isOnly = titlecfg.isOnly;

        // let startY = 40;


		let bg = BaseBitmap.create("popupview_bg3");
		bg.x = this.viewBg.width/2 - bg.width/2;
		bg.y = -5;
		this.addChildToContainer(bg);

		let line = BaseBitmap.create("commonview_border3");
		line.width = bg.width;
		line.x = bg.x;
		line.y = 10;
		this.addChildToContainer(line);

		let topbg = BaseBitmap.create("popupview_bg4");
		topbg.x = this.viewBg.width/2 - topbg.width/2;
		topbg.y = 10;
		this.addChildToContainer(topbg);

        let bg1= BaseBitmap.create("public_9v_bg12");
        bg1.width = 520;
        bg1.height = 640;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = topbg.y + topbg.height -7;
        this.addChildToContainer(bg1);

        // let bg2= BaseBitmap.create("rank_biao");
        // bg2.width = bg1.width - 30;
        // // bg2.height = 40;
        // bg2.x = this.viewBg.width/2 - bg2.width/2;
        // bg2.y = bg1.y + 14;
        // this.addChildToContainer(bg2);
        
        // startY = bg2.y ;
        let rank = this._rankData;
        if(rank.length == 0 || Object.keys(rank).length == 0)
        {
            let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("palace_history_empty"),24,TextFieldConst.COLOR_BROWN)
            tipTxt.x = bg1.x+bg1.width/2 - tipTxt.width/2;
            tipTxt.y = bg1.y+bg1.height/2 - tipTxt.height/2+10;
            this.addChildToContainer(tipTxt);
        }
        // startY += 12;
        let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("palace_history_title1"),24,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt1.x = topbg.x + 25 - titleTxt1.width/2 + 33; //bg2.x+20;
        titleTxt1.y = topbg.y + 25;//bg2.y+bg2.height/2 - titleTxt1.height/2;
        this.addChildToContainer(titleTxt1);

        let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("palace_history_title2"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        //bg2.x+150;
        titleTxt2.x = topbg.x + 160 - titleTxt2.width/2 +40;
        // if(PlatformManager.checkIsTextHorizontal())
        // {
        //     titleTxt2.x = bg2.x + 120;
        // } else {
        //     titleTxt2.x = bg2.x + 150;
        // }
        titleTxt2.y = titleTxt1.y;
        this.addChildToContainer(titleTxt2);

        let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("palace_history_title3"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        //权势
        if(isOnly == 0)
        {
            titleTxt3.text = LanguageManager.getlocal("rankpower")
        }
        // if(PlatformManager.checkIsTextHorizontal())
        // {
        //     titleTxt3.x = topbg.x+370;
        // } else {
        //     titleTxt3.x = topbg.x+380;
        // }
        titleTxt3.x = topbg.x+380 - titleTxt3.width/2 + 33;

        titleTxt3.y = titleTxt1.y;
        this.addChildToContainer(titleTxt3);

        let titleTxt4;
        if(isCross == 1)
        {
            titleTxt2.x -= 40;
            titleTxt3.x += 5;
             //区服
            titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
            titleTxt4.x = topbg.x+235 -titleTxt4.width/2 + 27;
            titleTxt4.y = titleTxt1.y;
            this.addChildToContainer(titleTxt4);
        }

        let startY = -2;
        let totalLen = rank.length;
        let baseColor = TextFieldConst.COLOR_BROWN;

        for (let index = 0; index < totalLen; index++) {


            // if(index % 2 == 1){
            //     let bg = BaseBitmap.create("public_tc_bg05");
            //     bg.width = 510;
            //     bg.height = 40;
            //     bg.x = this.viewBg.width/2 - bg.width/2;
            //     bg.y = startY + titleTxt1.height/2 - bg.height/2;
            //     this._nodeContainer.addChild(bg);
            //  }
            //  index = i;
            if(index != 0){
                let bg = BaseBitmap.create("public_line4");
                bg.width = 500;
                bg.x = this.viewBg.width/2 - bg.width/2;
                bg.y = startY - bg.height/2;
                this._nodeContainer.addChild(bg);
            }


            if(rank[index][0] == Api.playerVoApi.getPlayerID())
            {
                baseColor = TextFieldConst.COLOR_WARN_GREEN_NEW;
            } else {
                baseColor = TextFieldConst.COLOR_BROWN_NEW;
            }
            let rankTxt = ComponentManager.getTextField(String(index+1),titleTxt1.size,baseColor)
            rankTxt.x = titleTxt1.x+titleTxt1.width/2 - rankTxt.width/2;
            rankTxt.y = startY + 25 - rankTxt.height/2 ;
            this._nodeContainer.addChild(rankTxt);

            let nameTxt = ComponentManager.getTextField(rank[index][1],titleTxt1.size,baseColor);
            nameTxt.width = 600;
            nameTxt.textAlign = egret.HorizontalAlign.CENTER
            nameTxt.anchorOffsetX = nameTxt.width/2;
            nameTxt.x = titleTxt2.x+titleTxt2.width/2;// - nameTxt.width/2;
            nameTxt.y = rankTxt.y;
            this._nodeContainer.addChild(nameTxt);

            let timeTxt = ComponentManager.getTextField("",titleTxt1.size,baseColor)
            if(isOnly == 0)
            {
                timeTxt.text =  rank[index][2] ;
            }else{
                timeTxt.text = App.DateUtil.getFormatBySecond(rank[index][2],2);
            }
            timeTxt.x = titleTxt3.x+titleTxt3.width/2 - timeTxt.width/2;
            timeTxt.y = rankTxt.y;
            this._nodeContainer.addChild(timeTxt);

            if(isCross == 1)
            {
                let zoneTxt = ComponentManager.getTextField("",titleTxt1.size,baseColor)
                zoneTxt.text =  Api.mergeServerVoApi.getAfterMergeSeverName(rank[index][0]);;
                zoneTxt.x = titleTxt4.x+titleTxt4.width/2 - zoneTxt.width/2;
                zoneTxt.y = rankTxt.y;
                this._nodeContainer.addChild(zoneTxt);
            }

            // let lineImg = BaseBitmap.create("public_line1");
            // lineImg.x = this.viewBg.width/2 - lineImg.width/2;
            // lineImg.y = startY+30;
            // this._nodeContainer.addChild(lineImg);
            startY += 50;
        }

        this._nodeContainer.height += 20;
        // this._nodeContainer.touchEnabled = true;
        let rect = new egret.Rectangle(0,0,this.viewBg.width,bg1.height - (topbg.y - bg1.y) - topbg.height - 10);
        let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
        scrollView.horizontalScrollPolicy = "off";
        scrollView.y = topbg.y + topbg.height + 1;
        this.addChildToContainer(scrollView);
    }

    protected getShowHeight():number
	{
		return 840;
	}

    protected getRequestData():{requestType:string,requestData:any}
	{ 
        let titleId = this.param.data.titleId;
        return {requestType:NetRequestConst.REQUEST_PALACE_GETPALACERANK,requestData:{titleId:titleId}};
	}
    protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (data.ret == true)
        {
            this._rankData = data.data.data.palacerank;
        }
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rank_biao",
            "popupview_bg4",
			"commonview_border3",
			"popupview_bg3"
		]);
	}
    	// 标题背景名称
	protected getTitleStr():string
	{
        return "palaceHistoryPopupViewTitle2";
	}
    protected getTitleParams():string[]
    {
        return [LanguageManager.getlocal("palace_titleName"+this.param.data.titleId)];
    }
    
	public dispose():void
	{
        this._nodeContainer = null;
        this._rankData = [];
        super.dispose();
    }
}