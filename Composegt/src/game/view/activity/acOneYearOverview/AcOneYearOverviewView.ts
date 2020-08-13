/*
author : yanyuling
desc : 周年庆 总览
*/

class AcOneYearOverviewView extends AcCommonView
{
	public constructor() 
	{
		super();
    }

    private _collectTxtList:OneyearOverviewCard[] = [];
	protected initView():void
	{ 
        let titletxt = BaseBitmap.create("oneyearoverview_txt");
        titletxt.x = GameConfig.stageWidth/2 - titletxt.width/2;
        this.addChild(titletxt);

		//顶部背景图片
		let forpeople_top = BaseBitmap.create('oneyearoverview_topbg2');
        this.addChildToContainer(forpeople_top);
        forpeople_top.y = 70;

        let bottomBg = BaseBitmap.create("oneyearoverview_bottom");
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;

        let _scrollContiner = new BaseDisplayObjectContainer();
        _scrollContiner.width = GameConfig.stageWidth;
        let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth, bottomBg.y -forpeople_top.y - forpeople_top.height + 80);

        let startY = 0;
        let startIdx = 0;
        let Overview = this.cfg.Overview;
        Overview.sort((dataA:any,dataB:any)=>{
            return dataA.sortID - dataB.sortID;
        } );
        let len = Overview.length;
        for (var index = 0; index < len; index++) {
            let accfg = Overview[index];
            let textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            let isLeft:boolean = (index% 2 == 0);

            if( accfg.aid == "examAnswer" ){
                textColor = TextFieldConst.COLOR_BLACK;
            }
            if( accfg.aid == "lantern" ){
                textColor = TextFieldConst.COLOR_WARN_RED2;
            }

            let card = new OneyearOverviewCard();
            card.init(accfg,this.aid,this.code,textColor,isLeft);

            if(isLeft){
                card.x = 0;
            }else{
                card.x = GameConfig.stageWidth - card.width;
            }

            card.y = startY;
            
            _scrollContiner.addChild(card);
            this._collectTxtList[""+accfg.sortID] = card;
            startY += card.height/2 + 5; 
        }
        
        let flower1 = BaseBitmap.create("oneyearoverview_flower");
        flower1.x = GameConfig.stageWidth/2 - 10;
        flower1.y = 15;
        _scrollContiner.addChildAt(flower1,0);

        let flower2 = BaseBitmap.create("oneyearoverview_flower");
        flower2.x = flower1.x;
        flower2.y = _scrollContiner.height - flower1.y;
        flower2.scaleY = -1;
        _scrollContiner.addChildAt(flower2,0);

		let _scrollView = ComponentManager.getScrollView( _scrollContiner,rect);
		_scrollView.x = 0;
		_scrollView.y = forpeople_top.y + forpeople_top.height + 0;
		_scrollView.horizontalScrollPolicy="off";
        this.addChildToContainer(_scrollView);
        this.addChildToContainer(bottomBg);

        let oneyearoverview_bg2 = BaseBitmap.create("oneyearoverview_bg2");
        oneyearoverview_bg2.y = 60;
        this.addChild(oneyearoverview_bg2);
        
        this.checkSinReward();
    }

    private checkSinReward()
    {
        let signvo = <AcOneYearSignVo>Api.acVoApi.getActivityVoByAidAndCode("oneYearSign");
        if(signvo && signvo.isShowRedDot){
            ViewController.getInstance().openView("AcOneYearSignView",signvo.code);
        }
    } 

    private get cfg() : Config.AcCfg.OneYearOverviewCfg{
        return this.acVo.config;
    }

    private get vo() : AcOneYearOverviewVo{
        return <AcOneYearOverviewVo>this.acVo;
    }
    protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUST_ACTIVITY_YEAR_OVERVIEW,requestData:{activeId:this.vo.aidAndCode}};
	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{
	}
    protected isShowTitleBgShadow()
	{
		return false;
	}
    protected getBgName(): string {
        return "oneyearoverview_bg";
    }

    protected getTitleBgName(): string {
        return  "oneyearoverview_topbg1";
    }
    protected getTitleStr(): string {
        return null;
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "oneyearoverview_topbg2","oneyear_flag",
            // "oneyearoverview_acransackTraitorSP_icon", "oneyearoverview_acarcade_icon", "oneyearoverview_aclantern_icon",
            // "oneyearoverview_acnewYear_icon", "oneyearoverview_aconeYearPack_icon","oneyearoverview_aconeYearRank_icon",
            // "oneyearoverview_acrechargeBoxSP_icon","oneyearoverview_aconeYearSign_icon","oneyearoverview_acexamAnswer_icon",
            "oneyearoverview_bg","oneyearoverview_blackbg","oneyearoverview_bottom",
            "oneyearoverview_flag1","oneyearoverview_flag2","oneyearoverview_flower","oneyearoverview_topbg1","oneyearoverview_txt",
            "oneyearoverview_bg2","oneyearoverview_txtbg",
         ]);
	} 

	public dispose():void
	{	 
        this._collectTxtList = [];
        super.dispose();
	}
}


class OneyearOverviewCard extends BaseDisplayObjectContainer
{
    constructor()
    {
        super();
    }
    private aid:string = undefined;
    private code:string = undefined;
    private _vo:AcOneYearOverviewVo = undefined;
    private _accfg:{aid:string,code:number,sortID:number} = undefined;
    private _oriTextcolor:number = 0;
    private _lightClip:CustomMovieClip = undefined;
    public init(accfg:{aid:string,code:number,sortID:number},aid:string,code:string,textColor:number,isLeft:boolean = true):void
	{

        this._accfg = accfg
        this.aid = aid;
        this.code = ""+code;
        this._vo = <AcOneYearOverviewVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,""+this.code);
        this._oriTextcolor = textColor;

        let blackbg = BaseBitmap.create("oneyearoverview_blackbg");
        let rewardbg = BaseLoadBitmap.create("oneyearoverview_ac"+ this._accfg.aid + "_icon");
        rewardbg.width = 326;
        rewardbg.height =123;
        let txt1 = ComponentManager.getTextField(LanguageManager.getlocal("acOneYear_overview_txt1"), 18, TextFieldConst.COLOR_WARN_RED2 );
        let txt2 = ComponentManager.getTextField(LanguageManager.getlocal("acOneYear_overview_txt2"), 18, TextFieldConst.COLOR_WARN_RED2);
        blackbg.x = blackbg.y = 0;
        let txtbg = BaseBitmap.create("oneyearoverview_txtbg");
        txtbg.width = 300;
        let acfvo = this._vo.activeinfo[this._accfg.aid + "-"+this._accfg.code];
        if(acfvo){
		    txt2.text =  App.DateUtil.getOpenLocalTime(acfvo.st,acfvo.et,true);
            if(this._accfg.aid == "arcade" || this._accfg.aid == "newYear"){
                //策划要启用有展示期的活动，外部时间自行减一天
                txt2.text =  App.DateUtil.getOpenLocalTime(acfvo.st,acfvo.et-86400,true);
            }
        }else{
            txt2.text = "";
            txt1.text = ""
        }

        if( isLeft){
            txt1.x = blackbg.x + blackbg.width - txt1.width - 40;
            txt2.x = txt1.x + txt1.width - txt2.width;
            txtbg.scaleX = -1;
            txtbg.x =  blackbg.x + blackbg.width  - 20 ;
        }else{
            txt1.x = blackbg.x + 40;
            txt2.x = txt1.x ;
            txtbg.x =  blackbg.x +  20 ;
        }

        txt2.textColor =txt1.textColor = textColor
        txt1.y = blackbg.y + 58;
        rewardbg.x = blackbg.x;
        rewardbg.y = blackbg.y;
        txt2.y = txt1.y +  txt1.height + 5;
        
        txtbg.y = txt2.y - 5;

        this.addChild(rewardbg);
        this.addChild(txtbg);
        this.addChild(txt1);
        this.addChild(txt2);
        this.addChild(blackbg);
        // blackbg.visible = false;

        let flag = BaseBitmap.create("oneyearoverview_flag1");
        flag.setScale(0.8);
        flag.y = rewardbg.y + 3 ;
        flag.x = rewardbg.x - 5;
        flag.name = "flag";
        this.addChild(flag);
        this["flag"] = flag;
        // flag.visible = !acfvo;

        this.width = blackbg.width;
        this.height = blackbg.height;
        rewardbg.touchEnabled = true;
        // rewardbg.addTouchTap(this.activitydHandler,this);
        this["blackbg"] = blackbg;
        this["rewardbg"] = rewardbg;
        this["txt1"] = txt1;
        this["txt2"] = txt2;
        this["txtbg"] = txtbg;
        if(this.isAidShieldByIp() ){
            txt1.text = "";
            txt2.text = "";
            txtbg.visible = false;
        }else{
            rewardbg.addTouchTap(this.activitydHandler,this);
        }
        TickManager.addTick(this.tick,this);
        this.refreshActiStat();
    }

    private isAidShieldByIp()
    {
        return this._vo.isAidShieldByIp(this._accfg.aid);
    }
    private refreshActiStat()
    {
        let acfvo = this._vo.activeinfo[this._accfg.aid + "-"+this._accfg.code];
        if(!acfvo)
        {
            this["txtbg"].visible = false;
            return ;
        }
        let tmp_vo = <AcOneYearOverviewVo>Api.acVoApi.getActivityVoByAidAndCode(this._accfg.aid,""+this._accfg.code);
        if(tmp_vo && tmp_vo.isShowRedDot &&  tmp_vo.isStart && !this.isAidShieldByIp()){
            App.CommonUtil.addIconToBDOC(this,null,false,-17,0);
        }else{
            App.CommonUtil.removeIconFromBDOC(this);
        }
        if( this.isAidShieldByIp() ){
            return ;
        }
        this["blackbg"].visible = false;
        if( GameData.serverTime < acfvo.st  ){
            this["flag"].visible = true;
            this["flag"].texture =  ResourceManager.getRes("oneyearoverview_flag1");
            if(this._lightClip){
                this.removeChild(this._lightClip);
                this._lightClip = null;
            }
        }else if(  GameData.serverTime > acfvo.et ){
            if(this._lightClip){
                this.removeChild(this._lightClip);
                this._lightClip = null;
            }
            this["blackbg"].visible = true;
            this["flag"].visible = true;
            this["flag"].texture =  ResourceManager.getRes("oneyearoverview_flag2");
            App.DisplayUtil.changeToGray(this["blackbg"]);
            App.DisplayUtil.changeToGray(this["rewardbg"]);
            App.DisplayUtil.changeToGray(this["txt1"]);
            App.DisplayUtil.changeToGray(this["txt2"]);
            // this["txt1"].textColor = this["txt2"].textColor = TextFieldConst.COLOR_QUALITY_GRAY;
        }else{
            this["flag"].visible = false;
            App.DisplayUtil.changeToNormal(this["blackbg"]);
            App.DisplayUtil.changeToNormal(this["rewardbg"]);
            App.DisplayUtil.changeToNormal(this["txt1"]);
            App.DisplayUtil.changeToNormal(this["txt2"]);
            if(! this._lightClip){
            // this["txt1"].textColor = this["txt2"].textColor =  this._oriTextcolor;
                this._lightClip = ComponentManager.getCustomMovieClip("oneyearover_ani",8,100);
                let deltaS2 = 2;
                this._lightClip.width = 168*deltaS2;
                this._lightClip.height = 61*deltaS2;
                this._lightClip.anchorOffsetY = this._lightClip.height/2 ;
                this._lightClip.anchorOffsetX = this._lightClip.width/2 ;
                this._lightClip.blendMode = egret.BlendMode.ADD;
                this._lightClip.x = this["rewardbg"].x + this["rewardbg"].width/2 ;
                this._lightClip.y = this["rewardbg"].y + this["rewardbg"].height/2-5 ;
                this.addChild(this._lightClip);
                this._lightClip.playWithTime(0);
            }
        }
       
    }

    public tick(): boolean {
        this.refreshActiStat();
		return false;
	}
    private activitydHandler(event:any,cfg:any)
    {
        let acfvo = this._vo.activeinfo[this._accfg.aid + "-"+this._accfg.code];
        if(!acfvo ){
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYear_overview_txt2"));
            return;
        }
         if(PlatformManager.checkHideIconByIP() &&( this._accfg.aid == "rechargeBoxSP" || this._accfg.aid == "lantern" || this._accfg.aid == "ransackTraitorSP") ){
            return ;
        }
        if(  acfvo.st > GameData.serverTime ){
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYear_overview_txt3"));
            return;
        }

        if( acfvo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYear_overview_txt4"));
            return;
        }

        let vo =  Api.acVoApi.getActivityVoByAidAndCode(acfvo.aid,""+acfvo.code);
        let viewClassName:string = "Ac"+App.StringUtil.firstCharToUper(acfvo.aid)+"View";
        if(vo && vo.isStart && viewClassName){
            ViewController.getInstance().openView(viewClassName,acfvo.code);
        }else{
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYear_overview_txt2"));
        }
    }
   
    public dispose():void
	{
        this.aid = null;
        this.code = null;
        this._accfg = null;
        this._vo = null;
        this._oriTextcolor  = null;
        this["blackbg"] = null;
        this["rewardbg"] = null;
        this["txt1"] = null;
        this["txt2"] = null;
        this["txtbg"]= null;
        TickManager.removeTick(this.tick,this);
        this._lightClip = null;

		super.dispose();
	}

}