/**
 * 与好友一起对战
 * author qianjun
 * 
 */
class WarFriendPopupView extends PopupView{

	public constructor() {
		super();
    }

	// 打开该面板时，需要传参数msg
	public initView():void{
        let view = this;
        let param = view.param.data;
        //type 1对战 2协同
        let type = param.type;
    }
    
    private get isWave():boolean{
        let view = this;
        let param = view.param.data;
        //type 1对战 2协同
        let type = param.type;
        return type == 2;
    }

	protected resetBgSize():void{
        let view = this;

        view.viewBg.width = this.getShowWidth();
        view.viewBg.height = this.getShowHeight();
        super.resetBgSize();
        
        let param = view.param.data;
        //type 1对战 2协同
        let type = param.type;

        // let titlebg = BaseBitmap.create(`public_poptittle${view.isWave ? `purple` : `red`}`);
        // view.addChildAt(titlebg, view.getChildIndex(view.titleTF));
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, view.viewBg);

        // let icon = BaseBitmap.create(`joinwarfriend`);
        // view.addChild(icon);
        // icon.setScale(0.8);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, view._titleBg, [15,-5]);

        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.titleTF, titlebg);
		// if(view._line){
        //     view._line.visible = false;
        // }
        // view.closeBtn.y += 5;

        let tipTxt = ComponentMgr.getTextField(LangMger.getlocal(`wartip2type${type}`), TextFieldConst.SIZE_CONTENT_SMALL_POPUP, ColorEnums.fight_color_1);
        view.addChildToContainer(tipTxt);
        tipTxt.bold = true;
        tipTxt.stroke = 1.5;
        tipTxt.strokeColor = ColorEnums.fight_strokeColor_1;
        tipTxt.x = (view.viewBg.width - tipTxt.width) / 2; 
        tipTxt.y = 45;

        //创建房间
        let btn1 = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, ``, ()=>{
            //创建房间弹窗
            ViewController.getInstance().openView(ViewConst.WARCREATEROOMPOPVIEW,{
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
        view.addChildToContainer(btn1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, btn1, tipTxt, [0,tipTxt.textHeight+110]);

        let group1 = new BaseDisplayObjectContainer();
        group1.width = btn1.width;
        group1.height = btn1.height;

        let btn1Txt = ComponentMgr.getTextField(LangMger.getlocal(`warcreateroom`), TextFieldConst.SIZE_28, ColorEnums.white);
        group1.addChild(btn1Txt);
        btn1Txt.strokeColor = ColorEnums.strokeBlue;
        btn1Txt.stroke = 1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn1Txt, group1, [0,15], true);

        let icon1 = BaseBitmap.create(`joinwarcreateroom`);
        group1.addChild(icon1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon1, group1, [0,-25], true);

        btn1.addGroup(group1);

        //加入
        let btn2 = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, ``, ()=>{
            //加入弹窗
            ViewController.getInstance().openView(ViewConst.WARJOINROOMPOPVIEW,{
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
        view.addChildToContainer(btn2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, btn2, tipTxt, [0,tipTxt.textHeight+110]);

        let group2= new BaseDisplayObjectContainer();
        group2.width = btn2.width;
        group2.height = btn2.height;

        let btn2Txt = ComponentMgr.getTextField(LangMger.getlocal(`warjoinroom`), TextFieldConst.SIZE_28, ColorEnums.white);
        group2.addChild(btn2Txt);
        btn2Txt.strokeColor = ColorEnums.btnStrokeOrange;;
        btn2Txt.stroke = 1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn2Txt, group2, [0,15], true);

        let icon2 = BaseBitmap.create(`joinwarjoinroom`);
        group2.addChild(icon2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon2, btn2, [0,-25], true);

        btn2.addGroup(group2);
	}

	protected isTouchMaskClose():boolean{
		return false;
    }

    // protected getTitleBgName():string{
    //     return `public_poptittle${this.isWave ? `purple` : `red`}`;
    // }

    protected getTitleStr(){
        let param = this.param.data;
        //type 1对战 2协同
        let type = param.type;
		return LangMger.getlocal(`warfriendtitle`);
	}
	
	// protected getCloseBtnName():string{
    //     return `popupview_closebtn${this.isWave ? `purple` : `red`}`;
    // }

	protected closeHandler(){
        let param = this.param;
        if(param.data.cancelcallback){
			param.data.cancelcallback.apply(param.data.handler,[this]);
		}
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
		return array.concat([
            `joinwarfriend`,`joinwarcreateroom`,`joinwarjoinroom`
		]);
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
		super.dispose();
	}
}