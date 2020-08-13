/**
 * author:qianjun
 * desc:活动弹窗
*/
class AcAnnualPrayGetRewardPopupView extends PopupView{

    private _stop = false;
	public constructor() {
		super();
	}
	
    private get cfg() : Config.AcCfg.AnnualPray2020Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcAnnualPray2020Vo{
        return <AcAnnualPray2020Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    private get aid() : string{
        return `${this.param.data.aid}`;
    }

    private get code() : string{
        return `${this.param.data.code}`;
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

    protected getBgName():string{
        return App.CommonUtil.getResByCode(`annualpraygetrewardbg`, this.getUiCode());
    }

    protected getResourceList():string[]
	{
        let view = this;
        let arr = [];
        return super.getResourceList().concat([
           `annualpraygetrewardbg-1`,
        ]).concat(arr);
    }


	protected initView():void{	
        let view = this;
    }
    
    protected getShowWidth():number{
		return 600;
    }

	protected getShowHeight():number{
		return 728;
    }

    protected getTitleStr(): string {
        return null;
    }

    protected getCloseBtnName(): string {
        return null;
    }


    protected isTouchMaskClose() : boolean{
        return true;
    }

    protected resetBgSize():void{
        let view = this;
        super.resetBgSize();
        let index = view.param.data.index;
        let code = view.getUiCode();
        let titleImg = BaseBitmap.create(App.CommonUtil.getResByCode(`annualpraygetrewardtitle`, code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleImg, this.viewBg, [0,70]);
        view.addChild(titleImg);

        if(!index){
            index = App.MathUtil.getRandom(1,5);
        }
        let str = `annualpraybless${index}-${code}`;
        if(!RES.hasRes(str)){
            str = `annualpraybless1-${code}`;
        }
        let flag = BaseLoadBitmap.create(str);
        flag.width = 197;
        flag.height = 166;
        flag.anchorOffsetX = flag.width / 2;
        flag.anchorOffsetY = flag.height / 2;
        view.addChild(flag);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, flag, this.viewBg, [25+GameData.popupviewOffsetX,60]);


        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acAnnualPrayPrayTip7`, code)), 20, TextFieldConst.COLOR_BLACK);
        tipTxt.lineSpacing = 18;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, titleImg, [0,titleImg.height + 20]);

        let tipBg = BaseBitmap.create(`public_9_bg87`);
        view.addChild(tipBg);

        let getTotalTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acAnnualPrayPrayTip8`, code), [view.param.data.add]), 20, TextFieldConst.COLOR_WARN_YELLOW);
        view.addChild(getTotalTxt);

        tipBg.width = getTotalTxt.textWidth + 80;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, tipTxt, [0,tipTxt.textHeight + 15]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, getTotalTxt, tipBg);

        let group = new BaseDisplayObjectContainer();
        group.width = 550;
        view.addChild(group);

        let icons = GameData.getRewardItemIcons(view.param.data.rewards, true);
        let tmpX = 0;
        let tmpY = 0;
        let len = icons.length;
        if(len <= 5){
            tmpX = (group.width - len * (109)) / 2;
            tmpY = (245 - 108) / 2;
        }
        else{
            tmpX = 0;
            tmpY = 10;
        }
        for(let i = 0; i < len; ++ i){
            let element = icons[i];
            element.x = tmpX + (109) * (i % 5);
            element.y = tmpY + (111) * (Math.floor(i / 5));
            group.addChild(element);
        }
        group.height += 20;

        let scrollview = ComponentManager.getScrollView(group, new egret.Rectangle(0,0, 550, 245));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, tipBg, [0,tipBg.height + 10]);
        view.addChild(scrollview);
        
        let btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `sysConfirm`, view.hide, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, this.viewBg, [0,100]);
        view.addChild(btn);

        view._stop = true;
        flag.alpha = 0;
        flag.setScale(4);
        egret.Tween.get(flag).wait(500).to({alpha : 1, scaleX : 1, scaleY : 1}, 400).call(()=>{
            egret.Tween.removeTweens(flag);
            view._stop = false;
        }, view);
    }

    public hide():void{
        let view = this;
        if(view._stop){
            return;
        }
        if (this.param.data.callObj && this.param.data.callFunc) {
			this.param.data.callFunc.apply(this.param.data.callObj);
		}
        super.hide();
    }

	public dispose():void{
        let view = this;
        view._stop = false;
		super.dispose();
	}
}