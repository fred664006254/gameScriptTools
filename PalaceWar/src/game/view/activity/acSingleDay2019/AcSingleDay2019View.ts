/*
author : qianjun
desc : 2019双十一
*/
class AcSingleDay2019View extends AcCommonView{
    private _stop = false;
    private _btn1 : BaseButton = null;
    private _btn2 : BaseButton = null;
    private _btn3 : BaseButton = null;
    private _btn4 : BaseButton = null;
    private _btn5 : BaseButton = null;

    public constructor(){
        super();
    }

    private get cfg() : Config.AcCfg.SingleDay2019Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcSingleDay2019Vo{
        return <AcSingleDay2019Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
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

    protected getRuleInfo():string{
        let code = this.getUiCode();
		return `acSingleDay2019Rule-${code}`;
    } 

    protected getRuleInfoParam():string[]
	{
		return [
            this.cfg.needGemCost.toString(),
            this.cfg.getMaxRank().toString(),
        ];
	}


    protected ru;e
    
    protected isHideTitleBgShadow():boolean{
		return true;
	}

    //背景图名称
	protected getBgName():string{
		return null;
    }

    protected getTitleBgName():string{
        return null;
    }

    protected getTitleStr():string{
        return null;
    }

    // /**
	//  * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	//  */
    // protected getReportTipData(): { title: { key: string, param?: string[] }, msg: { key: string, param?: string[] } } {
    //     return { title: { key: `acDechuanshidaireporttitle-${this.getUiCode()}` }, msg: { key: `acDechuanshidaireportmsg-${this.getUiCode()}` } };
    // }
    
    protected getResourceList():string[]{
        let view = this;
        let code = view.getUiCode();
        return super.getResourceList().concat([
            `singleday2019code${code}`
        ]);
    }

    protected getContainerY():number{
        return 0;
    }

    public initView(){
		let view = this;
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.width = view.width;
        view.container.height = view.height;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE, view.makePointLine, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_REMIND),view.attackCallback,view);
        //top背景图
        let topbg = BaseBitmap.create(`newsingledaytopbg-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.container, [0,0], true);

        let midbg = BaseBitmap.create(`newsingledaybg-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midbg, topbg, [0,topbg.height-50]);
        view.addChildToContainer(midbg);
        view.addChildToContainer(topbg);

        let eff = ComponentManager.getCustomMovieClip(`newsingledaytitleeff`, 12);
        eff.width = 430;
        eff.height = 250;
        eff.blendMode = egret.BlendMode.ADD;
        eff.playWithTime(-1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, eff, topbg, [0,170]);
        view.addChildToContainer(eff);

        let bottombg = BaseBitmap.create(`newsingledaybottombg-${code}`);
        view.addChildToContainer(bottombg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view.container, [0,0], true);

        let selectbg = BaseBitmap.create(`newsingledaybtnselect-${code}`);
        for(let i = 1; i < 6; ++ i){
            let group = new BaseDisplayObjectContainer();
            group.width = 337;
            group.height = 142;
            view.addChildToContainer(group);
            group.setScale(0.9);
            group.x = i & 1 ? 7 : 320;
            group.y = topbg.y + topbg.height + 10 + (i - 1)* 85;
            if(i == 1){
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, selectbg, group);
            }

            let btn = ComponentManager.getButton(`newsingledaybtn${i}-${code}`, ``, ()=>{
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, selectbg, group);
                ViewController.getInstance().openView(ViewConst.POPUP[`ACSINGLEDAY2019DETAILVIEW${i}`], {
                    aid : view.aid,
                    code : view.code
                })
            }, view);
            group.addChild(btn);
            view[`_btn${i}`] = btn;

            let txt = ComponentManager.getTextField(LanguageManager.getlocal(`acSingleDay2019btn${i}-${code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, txt, btn, [i & 1 ? 40 : -40 ,30]);
            group.addChild(txt);

            let eff = ComponentManager.getCustomMovieClip(i & 1 ? `newsingledaybtnlefteff` : `newsingledaybtnrighteff`, 12);
            eff.width = i & 1 ? 400 : 420;
            eff.height = i & 1 ? 200 : 300;
            eff.anchorOffsetX = eff.width / 2;
            eff.anchorOffsetY = eff.height / 2;
            eff.blendMode = egret.BlendMode.ADD;
            eff.playWithTime(-1);
            eff.scaleX = 1.15;
            eff.scaleY = 1.2;
            eff.x = i & 1 ? 160 : 165;
            eff.y = i & 1 ? 66 : 77;
            group.addChild(eff);
        } 
        view.addChildToContainer(selectbg);
        view.freshView();
    }
    
    private freshView():void{
        let view = this;
        if(view.vo.getpublicRedhot1()){
            App.CommonUtil.addIconToBDOC(view._btn1);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._btn1);
        }

        if(view.vo.getpublicRedhot2()){
            App.CommonUtil.addIconToBDOC(view._btn2);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._btn2);
        }
    }

    public tick():void{
        let view = this;
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
    }

    public hide():void{
        if(this._stop){
            return;
        }
        super.hide();
    }

    private attackCallback(evt : egret.Event):void{
        let view = this;
        let data = evt.data.data.data;
        view._stop = false;
        if(data){
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYREWARDSHOWVIEW, {
                aid: view.aid,
                code: view.code,
                rewards: data.rewards,
                msg : LanguageManager.getlocal(`acDechuanshidaitip4-${this.getUiCode()}`),
            });
        }
    }

    public dispose():void{   
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_REMIND),view.attackCallback,view);
        view._stop = false;
        view._btn1 = null;
        view._btn2 = null;
        view._btn3 = null;
        view._btn4 = null;
        view._btn5 = null;
        super.dispose();
    }
}