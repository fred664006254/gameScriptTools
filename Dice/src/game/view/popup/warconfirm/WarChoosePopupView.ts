/**
 * 选择对战模式
 * author qianjun
 * 
 */
class WarChoosePopupView extends PopupView{
    public findBtn : BaseButton = null;

	public constructor() {
		super();
    }
    
	// 打开该面板时，需要传参数msg
	public initView():void{
        let view = this;
        view.name = ViewConst.WARCHOOSEPOPUPVIEW;
        let param = view.param.data;
        //type 1对战 2协同
        let type = param.type;
    }

    protected preInit():void{
        super.preInit();

    }

	protected resetBgSize():void{
        let view = this;

        view.viewBg.width = this.getShowWidth();
        view.viewBg.height = this.getShowHeight();
        super.resetBgSize();
        
        let param = view.param.data;
        //type 1对战 2协同
        let type = param.type;

        // let titlebg = BaseBitmap.create(`public_poptittle${this.isWave ? `purple` : `red`}`);
        // view.addChildAt(titlebg, view.getChildIndex(view.titleTF));
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, view.viewBg);
        // let icon:BaseBitmap = null;
        // if(this.isWave){
        //     icon = BaseBitmap.create(`joinwarwave`);
        // } else {
        //     icon = BaseBitmap.create(`trophy_icon`);
        //     icon.setScale(0.42);
        // }
        // view.addChild(icon);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, view._titleBg, [15,0]);

        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.titleTF, titlebg);

        let tipTxt = ComponentMgr.getTextField(LangMger.getlocal(`wartip1type${type}`), TextFieldConst.SIZE_CONTENT_SMALL_POPUP, ColorEnums.fight_color_1);
        view.addChild(tipTxt);
        tipTxt.bold = true;
        tipTxt.stroke = 1.5;
        tipTxt.strokeColor = ColorEnums.fight_strokeColor_1;
        tipTxt.width = 355;
        tipTxt.lineSpacing = 11;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.x = view.container.x + (view.viewBg.width - tipTxt.width) / 2; 
        tipTxt.y = view.container.y + 45;

        //好友战斗
        let btn1 = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, ``, ()=>{
            //好友战斗弹窗
            ViewController.getInstance().openView(ViewConst.WARFRIENDPOPVIEW,{
                type : type,
                cancelcallback : ()=>{
                    view.alpha = 1;
                },
                findcallback : ()=>{
                    if(param.findcallback){
                        param.findcallback.apply(param.handler,[this]);
                    }
                    view.hide();
                },
                handler : view
            });
            view.alpha = 0;
        }, view);
        view.addChild(btn1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, btn1, tipTxt, [0,tipTxt.textHeight+80]);

        let group1 = new BaseDisplayObjectContainer();
        group1.width = btn1.width;
        group1.height = btn1.height;

        let btn1Txt = ComponentMgr.getTextField(LangMger.getlocal(`warfriend`), TextFieldConst.SIZE_28, ColorEnums.white);
        group1.addChild(btn1Txt);
        // btn1Txt.strokeColor = type == 1 ? ColorEnums.btnStrokeRed : ColorEnums.btnStrokePurple;
        btn1Txt.strokeColor = ColorEnums.strokeBlue;
        btn1Txt.stroke = 1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn1Txt, group1, [0,15], true);

        let icon1 = BaseBitmap.create(`joinwarfriend`);
        group1.addChild(icon1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon1, group1, [0,-25], true);

        btn1.addGroup(group1);

        //快速匹配
        let btn2 = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, ``, ()=>{
            App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
            //快速匹配战斗弹窗
            ViewController.getInstance().openView(ViewConst.WARWAITINGPOPVIEW,{
                type : type,
                cancelcallback : ()=>{
                    view.alpha = 1;
                },
                findcallback : ()=>{
                    if(param.findcallback){
                        param.findcallback.apply(param.handler,[this]);
                    }
                    Api.AdvertiseVoApi.notfriend = true;
                    view.hide();
                },
                handler : view
            });
            view.alpha = 0;
        }, view);
        view.addChild(btn2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, btn2, tipTxt, [0,tipTxt.textHeight+80]);
        view.findBtn = btn2;

        if(type == 1 && Api.AdvertiseVoApi.getPlayHuo()){
            // 对战模式下加特效
            let huo= ComponentMgr.getCustomMovieClip("huo",10, 80);
            huo.scaleX = 0.7;
            huo.scaleY = 0.64;
            huo.playWithTime(0);
            btn2.addChild(huo);
            huo.x = -37;
            huo.y = -48;
        }

        let group2= new BaseDisplayObjectContainer();
        group2.width = btn2.width;
        group2.height = btn2.height;

        let btn2Txt = ComponentMgr.getTextField(LangMger.getlocal(`warquiclplay`), TextFieldConst.SIZE_28, ColorEnums.white);
        group2.addChild(btn2Txt);
        btn2Txt.strokeColor = ColorEnums.btnStrokeBlue;;
        btn2Txt.stroke = 1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn2Txt, group2, [0,15], true);

        let icon2 = BaseBitmap.create(`joinwarquickplay`);
        group2.addChild(icon2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon2, btn2, [0,-25], true);
        if(type == 1 && Api.AdvertiseVoApi.getPlayHuo()){
            group2.setPosition(30, 0);
            btn2Txt.setPosition(-10, 40);
            icon2.setPosition(5, -25);
        }

        btn2.addGroup(group2);
    }
    
    // protected getTitleBgName():string{
    //     return `public_poptittle${this.isWave ? `purple` : `red`}`;
    // }
    
	protected isTouchMaskClose():boolean{
		return true;
    }

    protected getTitleStr(){
        let param = this.param.data;
        //type 1对战 2协同
        let type = param.type;
		return LangMger.getlocal(type == 1 ? `fight_model` : `operation_model_title`);
	}
    
    // protected getCloseBtnName():string{
    //     return `popupview_closebtn${this.isWave ? `purple` : `red`}`;
    // }
    
	protected closeHandler(){
		super.closeHandler();
    }
    
    // protected getShowWidth():number{
	// 	return 552;
	// }

	protected getShowHeight():number{
		return 350;
	}

	public hide(){		
		super.hide()
	}

	protected getResourceList():string[]{	
		let array:string[] = [];
        array.concat(super.getResourceList());
        let param = this.param.data;
        //type 1对战 2协同
        let type = param.type;
		return array.concat([
            // `joinwarfriend${this.isWave ? `_wave` : ``}`,`joinwarquickplay`, `joinwarwave`
            `joinwarfriend`,`joinwarquickplay`
		]);
    }
    
    private get isWave():boolean{
        let view = this;
        let param = view.param.data;
        //type 1对战 2协同
        let type = param.type;
        return type == 2;
    }

	protected getParent():egret.DisplayObjectContainer{
		if(this.param.data.inLayer){
			return this.param.data.inLayer;
		} 
		else{
			return super.getParent();
		}
    }

	public dispose():void{
        let view = this;
        view.findBtn = null;
		super.dispose();
	}
}