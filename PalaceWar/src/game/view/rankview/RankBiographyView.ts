/**
 * 排行榜 列传本纪
 * author shaoliang
 * date 2020/2/4
 * @class RankBiographyView
 */

class RankBiographyView  extends CommonView
{   
    private _worshipBtn:BaseButton = null;
    private _worshipFlag:BaseBitmap = null;

    private _biographylist:any[] = [];

    private _type1Num:number = 0;

    public constructor() {
        super();
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
           "biographyview","arena_bottom","rank_visited","biographyview_bg6","biographyview_bg7",
           "biographyview_bg5"
        ]);
	}

    protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_RANK_GETBIOGRAPHY,requestData:{}};
	}

    protected getTitleStr():string
	{
		return "biography_title";
	}

    protected getBgName():string
	{
		return "rankview_bg";
	}

	public initView():void
    {

        let downBottom:BaseBitmap = BaseBitmap.create("arena_bottom");
		downBottom.y =GameConfig.stageHeigth-downBottom.height;
		downBottom.x = 0;  
		this.addChild(downBottom);

        let worshipTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        worshipTxt.text = LanguageManager.getlocal("rankview_biographyWorshipTip");
        worshipTxt.x = downBottom.x + 30;
        worshipTxt.y = downBottom.y + downBottom.height/2 - worshipTxt.height/2;
        this.addChild(worshipTxt);

        let worshipBtn = ComponentManager.getButton( ButtonConst.BTN_SMALL_YELLOW,"rankworship",this.worshipBtnHandler,this);
        worshipBtn.x = downBottom.x + downBottom.width - worshipBtn.width - 30;
        worshipBtn.y = downBottom.y + downBottom.height/2 - worshipBtn.height/2;
        worshipBtn.visible = false;
        this.addChild(worshipBtn);
        // App.CommonUtil.addIconToBDOC(worshipBtn);
        this._worshipBtn = worshipBtn;

        
        this._worshipFlag = BaseBitmap.create("rank_visited");
        this._worshipFlag.anchorOffsetX = this._worshipFlag.width/2;
        this._worshipFlag.anchorOffsetY = this._worshipFlag.height/2;
        this._worshipFlag.setScale(0.7);
        this._worshipFlag.x = worshipBtn.x+60;
        this._worshipFlag.y = worshipBtn.y+20;
        this._worshipFlag.visible = false;
        this.addChild(this._worshipFlag);

        if (Api.otherInfoVoApi.isRankVisited(5)){
            this._worshipFlag.visible = true;
            this._worshipBtn.visible = false;
        }else{
            this._worshipFlag.visible = false;
            this._worshipBtn.visible = true;    
        }

        let rect = egret.Rectangle.create();
		rect.setTo(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth-154);

        let tempArray = [];
        let type1Array = [];
        let type2Array = [];

        for (let i=0; i<this._biographylist.length; i++)
        {
            let cfg = Config.BiographyCfg.getCfgBgId(this._biographylist[i].id);
            if (cfg.type == 1)
            {
                type1Array.push(this._biographylist[i]);
            }
            else
            {
                type2Array.push(this._biographylist[i]);
            }
        }

        type1Array.sort(function(a: any,b: any):number
        {
            if(a.sortID > b.sortID) 
            {
                return 1;
            }
            else if(a.sortID == b.sortID) 
            {   
                if (App.DateUtil.isSameDay(b.st,a.st))
                {
                    return b.power-a.power;
                }
                else
                {
                    return b.st-a.st;
                }
            }
            return -1;
        });

        type2Array.sort(function(a: any,b: any):number
        {
            if(a.sortID > b.sortID) 
            {
                return 1;
            }
            else if(a.sortID == b.sortID) 
            {
                if (App.DateUtil.isSameDay(b.st,a.st))
                {
                    return b.power-a.power;
                }
                else
                {
                    return b.st-a.st;
                }
            }
            return -1;
        });

        for (let i=0; i<type2Array.length; i+=2)
        {
            let oneArray = [];
            oneArray.push(type2Array[i]);
            if (type2Array[i+1])
            {
                oneArray.push(type2Array[i+1]);
            }
            let type = 0;
            if (i == 0)
            {
                type=6;
            }
            tempArray.push({data:oneArray,t:type});
        }
        this._type1Num = type2Array.length;

        for (let i=0; i<type1Array.length; i+=2)
        {
            let oneArray = [];
            oneArray.push(type1Array[i]);
            if (type1Array[i+1])
            {
                oneArray.push(type1Array[i+1]);
            }
            let type = 0;
            if (i == 0)
            {
                type=7;
            }
            tempArray.push({data:oneArray,t:type});
        }

        let scrollList = ComponentManager.getScrollList(RankBiographyScrollItem,tempArray,rect);
        scrollList.setPosition(0,-12);
        this.addChildToContainer(scrollList);
        scrollList.bounces = false;
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

        if (this._biographylist.length == 0)
        {
            worshipBtn.setEnable(false);
        }
    }

    protected worshipBtnHandler()
    {       


        let maxV = this._biographylist.length;
        if (this._type1Num>0)
        {
            maxV = this._type1Num;
        }

        let ranIdx = App.MathUtil.getRandom(0,maxV);
        if (!this._biographylist[ranIdx])
        {
            return;
        }
        let taruid = this._biographylist[ranIdx].uid;
        let tarzid = this._biographylist[ranIdx].zid;

        Api.biographyVoApi.showInfo = this._biographylist[ranIdx];

        this.request(NetRequestConst.REQUEST_RANKG_VISIT,{dtype:3,ruid:taruid,rzid:tarzid});//
    }

    protected receiveData(data: { ret: boolean, data: any }): void 
    {
        if (data.data.cmd == NetRequestConst.REQUEST_RANKG_VISIT)
        {
            if (data.ret)
            {   
                if(data.ret==true && data.data.data.lucky)
                {
                    App.CommonUtil.showGodbless("rank");
                }

                this._worshipBtn.visible = false;   
                this._worshipFlag.setScale(1.3);
                this._worshipFlag.visible = true;
                egret.Tween.get(this._worshipFlag,{loop:false}).to({scaleX:0.7,scaleY:0.7},400).wait(600).call(function(){
                    //ViewController.getInstance().openView(ViewConst.BASE.RANKWORSHIPVIEW,data);
                    Api.biographyVoApi.showNum = data.data.data.getnum;
                    ViewController.getInstance().openView(ViewConst.COMMON.BIOGRAPHYSHOWVIEW,{});
                });
            }
            else
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("rankview_crossWorshipFailed"));
                return;
            }
        }
		else if (data.data.cmd == NetRequestConst.REQUEST_RANK_GETBIOGRAPHY)
        {
            if (data.ret)
            {   
                if (data.data.data.biographylist && data.data.data.biographylist.length>0)
                {
                    this._biographylist = data.data.data.biographylist;
                }
            }
        }
	}

    public hide()
    {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RANKVIEW_CLOSE_ANI,{ani:true,index:3});
        super.hide();
    }

    public dispose():void
	{
        this._worshipBtn = null;
        this._worshipFlag = null;
        this._biographylist.length =0;
        this._type1Num = 0;

        super.dispose();
    }
}