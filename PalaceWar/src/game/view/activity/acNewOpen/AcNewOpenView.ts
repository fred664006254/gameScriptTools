/*
    author : shaoliang
    date : 2020.4.16
    desc : 粽叶飘香-端午节活动
*/

class AcNewOpenView extends AcCommonView
{   
    private _timeCountTxt : BaseTextField = null;

    public constructor(){
        super();
    }

    protected  getUiCode():string
	{   
        if (this.code == "2")
        {
            return "1";
        }
		return this.code;
	}

    protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_NEWOPENGETACTIVE,requestData:{activeId:this.acTivityId}};
	}

     // 标题背景名称
	protected getTitleBgName():string
	{
		return "acnewopen_title-" + this.getUiCode();
	}

    protected getTitleStr():string
	{
		return null;
	}

    protected isHideTitleBgShadow():boolean
	{
		return true;
	}

    protected getResourceList():string[]{
        let view = this;
        let code = view.getUiCode();
        return super.getResourceList().concat([
            `acnewopen_reward_title-${code}`,`acnewopen_title-${code}`,`acnewopen_topbg-${code}`,
            "public_scrollitembg","acnewopen_specialitem2-"+code,"shopview_itemtitle","destroysametaskbg",
            "progress3", "progress3_bg","shopviewtimebg",
        ]);
    }

    private get cfg() : Config.AcCfg.NewOpenCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcNewOpenVo{
        return <AcNewOpenVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}

    protected getTabbarTextArr():Array<string>{
        let code = this.getUiCode();
		return [`acNewOpenTab1-${code}`, 
                `acNewOpenTab2-${code}`,
                `acNewOpenTab3-${code}`,
		];
    } 

    protected getTabbarGroupY():number
    {
        return 225;
    }

    protected getBigFrame():string
	{	
		return `commonview_bigframe`;
	}

    protected addTabbarGroupBg():boolean{
		return true;
	}

    protected changeTab():void
    {
        super.changeTab();
		//new ui
		if (this.tabViewData[this.selectedTabIndex])
        {
            this.tabViewData[this.selectedTabIndex].y = 377;
        }
    }

    public initView()
    {   
        

        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        let code = view.getUiCode();
        let topbg = BaseBitmap.create(`acnewopen_topbg-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0,view.titleBg.height-0]);
        view.addChildAt(topbg,this.getChildIndex(this.container));

        let timebg = BaseBitmap.create("shopviewtimebg");
        // timebg.width = 280;
        timebg.setPosition(GameConfig.stageWidth-timebg.width,topbg.y+topbg.height-10-timebg.height);
        this.addChild(timebg);
        
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        tip2Text.setPosition(timebg.x,timebg.y+timebg.height/2-tip2Text.height/2);
        tip2Text.width = timebg.width;
        tip2Text.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(tip2Text);
        view._timeCountTxt = tip2Text;

        this.freshView();
    }

     public tick():void{
        let view = this;
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
    }

    public freshView():void{
        let view = this;
        if(view.vo.getpublicRedhot1()){
            view.tabbarGroup.addRedPoint(0);
        }
        else{
            view.tabbarGroup.removeRedPoint(0);
        }

        if(view.vo.getpublicRedhot2()){
            view.tabbarGroup.addRedPoint(1);
        }
        else{
            view.tabbarGroup.removeRedPoint(1);
        }

        if(view.vo.getpublicRedhot3()){
            view.tabbarGroup.addRedPoint(2);
        }
        else{
            view.tabbarGroup.removeRedPoint(2);
        }

    }

    public dispose():void
    {   
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        view._timeCountTxt = null;

        super.dispose();
    }
}