/**
 * 排行榜
 * author yanyuling
 * date 2017/10/25
 * @class RankView
 */

class RankView  extends CommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _isAni:boolean = false;
    public constructor() {
        super();
	}

    protected get uiType():string
	{
		return "2";
	}

	public initView():void
	{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RANKVIEW_CLOSE_ANI,this.doCloseAni,this);
        


        let topBg:BaseBitmap = BaseBitmap.create("rank_topbg");
        topBg.y = - this.container.y;
		this.addChildToContainer(topBg);

        let topmask = BaseBitmap.create("rank_top_mask");
        topmask.width = GameConfig.stageWidth;
        topmask.y = 154;
        this.addChildToContainer(topmask);

         //最底部背景
        this._nodeContainer = new BaseDisplayObjectContainer();

        let rect = new egret.Rectangle(0,0,640,GameConfig.stageHeigth-this.container.y-165);
        let scrollview = ComponentManager.getScrollView(this._nodeContainer,rect);
        this.addChildToContainer(scrollview);
        scrollview.bounces = false;
        scrollview.horizontalScrollPolicy = "off";
        scrollview.y = 160;

        Api.mainTaskVoApi.isKeepGuide = true;
        Api.mainTaskVoApi.checkShowGuide();

       
       
        //装饰
        // let ornament = BaseBitmap.create("rank_ornament_line");
        // ornament.setPosition(0,150);
        // this.addChildToContainer(ornament);

        //本服
        let openLeft1 = BaseBitmap.create("rank_openleft1");
        openLeft1.name = "openLeft1";
        openLeft1.anchorOffsetX = openLeft1.width;
        openLeft1.x = GameConfig.stageWidth/2;
        openLeft1.y = 15;//GameConfig.stageHeigth/2 - this.container.y /2 - 340;

        let openRight1 = BaseBitmap.create("rank_openright1");
        openRight1.name = "openRight1";
        openRight1.x = openLeft1.x;
        openRight1.y = openLeft1.y;
		
        let rank_boxbg1 = BaseBitmap.create("rank_boxbg");
        rank_boxbg1.name = "rank_boxbg1";
        rank_boxbg1.anchorOffsetX = rank_boxbg1.width/2 ;
        rank_boxbg1.x = openLeft1.x;
        rank_boxbg1.y = openLeft1.y-10;
       
        let openBox1 = BaseBitmap.create("rank_bigbox1");
        openBox1.name = "openBox1";
        openBox1.x = 0;// openLeft1.x;
        openBox1.y = openLeft1.y-10;
		
        this._nodeContainer.addChild(rank_boxbg1);
        this._nodeContainer.addChild(openLeft1);
        this._nodeContainer.addChild(openRight1);
        this._nodeContainer.addChild(openBox1);

        let btn1 = ComponentManager.getButton("rank_btn1","",this.btnHandler,this,[1]);
        btn1.anchorOffsetX = btn1.width/2;
        btn1.anchorOffsetY = btn1.height/2;
        btn1.x = openLeft1.x ;
        btn1.y = openBox1.y + openBox1.height/2 ;
        btn1.name = "btn1";
        this._nodeContainer.addChild(btn1);

        //跨服
        let openLeft2 = BaseBitmap.create("rank_openleft2");
        openLeft2.anchorOffsetX = openLeft2.width;
        openLeft2.name = "openLeft2";
        openLeft2.x = openLeft1.x;
        openLeft2.y = openLeft1.y + openLeft1.height + 40; //GameConfig.stageHeigth/2 - this.container.y /2 + 7;
		
        let openRight2 = BaseBitmap.create("rank_openright2");
        openRight2.name = "openRight2";
        openRight2.x = openLeft2.x;
        openRight2.y = openLeft2.y;
		
        let rank_boxbg2 = BaseBitmap.create("rank_boxbg");
        rank_boxbg2.name = "rank_boxbg2";
        rank_boxbg2.anchorOffsetX = rank_boxbg2.width/2 ;
        rank_boxbg2.x = openLeft2.x;
        rank_boxbg2.y = openLeft2.y-10;

        let openBox2 = BaseBitmap.create("rank_bigbox2");
        openBox2.name = "openBox2";
        openBox2.x = openBox1.x;
        openBox2.y = openLeft2.y-10;

        this._nodeContainer.addChild(rank_boxbg2);
        this._nodeContainer.addChild(openRight2);
        this._nodeContainer.addChild(openLeft2);
		this._nodeContainer.addChild(openBox2);

        let btn2 = ComponentManager.getButton("rank_btn2","",this.btnHandler,this,[2]);
        btn2.anchorOffsetX = btn2.width/2;
        btn2.anchorOffsetY = btn2.height/2;
        btn2.x = btn1.x;
        btn2.y = openBox2.y + openBox2.height/2;
        this._nodeContainer.addChild(btn2);
        btn2.name = "btn2";

        let posY3 = openLeft2.y + openLeft2.height + 40;
        if(!Api.switchVoApi.checkOpenCrossRank())
        {
            App.DisplayUtil.changeToGray(openLeft2);
            App.DisplayUtil.changeToGray(openRight2);
            App.DisplayUtil.changeToGray(openBox2);
            App.DisplayUtil.changeToGray(btn2);

            posY3 = openLeft2.y;
        }

        if (Api.switchVoApi.checkOpenBiography())
        {
            //列传本纪
            let openLeft3 = BaseBitmap.create("rank_openleft3");
            openLeft3.anchorOffsetX = openLeft3.width;
            openLeft3.name = "openLeft3";
            openLeft3.x = openLeft1.x;
            openLeft3.y = posY3;
            
            let openRight3 = BaseBitmap.create("rank_openright3");
            openRight3.name = "openRight3";
            openRight3.x = openLeft3.x;
            openRight3.y = openLeft3.y;
            
            let rank_boxbg3 = BaseBitmap.create("rank_boxbg");
            rank_boxbg3.name = "rank_boxbg3";
            rank_boxbg3.anchorOffsetX = rank_boxbg3.width/2 ;
            rank_boxbg3.x = openLeft3.x;
            rank_boxbg3.y = openLeft3.y-10;

            let openBox3 = BaseBitmap.create("rank_bigbox3");
            openBox3.name = "openBox3";
            openBox3.x = openBox1.x;
            openBox3.y = openLeft3.y-10;

            this._nodeContainer.addChild(rank_boxbg3);
            this._nodeContainer.addChild(openRight3);
            this._nodeContainer.addChild(openLeft3);
            this._nodeContainer.addChild(openBox3);

            let btn3 = ComponentManager.getButton("rank_btn3","",this.btnHandler,this,[3]);
            btn3.anchorOffsetX = btn3.width/2;
            btn3.anchorOffsetY = btn3.height/2;
            btn3.x = btn1.x;
            btn3.y = openBox3.y + openBox3.height/2;
            this._nodeContainer.addChild(btn3);
            btn3.name = "btn3";
        }
    }

    public doCloseAni(event:egret.Event)
    {
        let index = event.data.index;
        this._isAni = true;
        let leftNode = this._nodeContainer.getChildByName("openLeft" + index);
        let rightNode = this._nodeContainer.getChildByName("openRight" + index);
        let btnNode = this._nodeContainer.getChildByName("btn" + index);
        egret.Tween.get(leftNode,{loop:false}).to({x:GameConfig.stageWidth/2},700);
        egret.Tween.get(rightNode,{loop:false}).to({x:GameConfig.stageWidth/2},700).call(()=>{
            this._isAni = false;
        },this);
        egret.Tween.get(btnNode,{loop:false}).wait(700).set({visible:true,scaleX:3,scaleY:3}).to({scaleX:1,scaleY:1},200);
    }

    protected btnHandler(params:any)
    {
        if(this._isAni)
            return;
        let tarView = ViewConst.COMMON.RANKSINGLEVIEW;
        if(params == 2){
            tarView = ViewConst.COMMON.RANKCROSSVIEW;
            if(!Api.switchVoApi.checkOpenCrossRank())
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("rankview_crossOpenTip1"));
                return;
            }
        }
        else if(params == 3)
        {
            tarView = ViewConst.COMMON.RANKBIOGRAPHYVIEW;
        }
        this._isAni = true;
        let leftNode = this._nodeContainer.getChildByName("openLeft" + params);
        let rightNode = this._nodeContainer.getChildByName("openRight" + params);
        let btnNode = this._nodeContainer.getChildByName("btn" + params);
        btnNode.visible = false;
        egret.Tween.get(this,{loop:false}).wait(600).call(()=>{
             this._isAni = false;
            ViewController.getInstance().openView(tarView);
        },this);

        egret.Tween.get(leftNode,{loop:false}).to({x:0},700)
        egret.Tween.get(rightNode,{loop:false}).to({x:GameConfig.stageWidth},700);
        // egret.Tween.get(btnNode,{loop:false}).to({scaleX:3,scaleY:3,alpha:0},400);
    }

    protected closeHandler():void
	{
        if(this._isAni){
            return;
        }
		this.hide();
	}

    protected getResourceList():string[]
    {   

        let resArray:string[] = [
            "rank_btn1", "rank_btn1_down","rank_bigbox1","rank_boxbg","rank_topbg",
            "rank_openleft1","rank_openright1","rank_btn2","rank_btn2_down","rank_bigbox2","rank_openright2","rank_openleft2",
            "rankbg_1","rankbg_2","rankbg_3","rankinglist_rankn1","rankinglist_rankn2","rankinglist_rankn3","rankbg_4","rank_top_mask"
        ];

        if (Api.switchVoApi.checkOpenBiography())
        {
            resArray = resArray.concat(["rank_bigbox3","rank_btn3","rank_openleft3","rank_openright3"]);
        }

		return super.getResourceList().concat(resArray);
	}

	public dispose():void
	{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RANKVIEW_CLOSE_ANI,this.doCloseAni,this);
        this._nodeContainer = null;
        this._isAni = false;
        Api.mainTaskVoApi.isKeepGuide = false;
        Api.mainTaskVoApi.hideGuide();
        super.dispose();
    }
}