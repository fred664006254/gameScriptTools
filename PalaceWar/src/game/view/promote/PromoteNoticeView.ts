class PromoteNoticeView extends PopupView
{
    
    private _szhi_g : BaseDisplayObjectContainer = null;
    private _nameTxt : BaseTextField = null;
    private _wenziTxt : BaseTextField = null;
    private canTouch : boolean = false;

    public constructor() 
	{
		super();
    }
    
    private get api(){
        return Api.promoteVoApi;
    }

    private get cfg(){
        return Config.PromoteCfg;
    }

    protected getBgName():string{
        return '';
    }

	protected initView():void
	{
        let view = this;

        let szhi_g = new BaseDisplayObjectContainer();
        szhi_g.width = 640;
        szhi_g.height = 355;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, szhi_g, view);
        view.addChild(szhi_g);
        view._szhi_g = szhi_g;

        // let rect = ComponentManager.getr
        let light1 : BaseBitmap = BaseBitmap.create("emperor_win_light");
        light1.anchorOffsetX = light1.width/2;
        light1.anchorOffsetY = light1.height/2;
        light1.setScale(0.82);
        view.setLayoutPosition(LayoutConst.lefttop, light1, szhi_g, [szhi_g.width/2, 70], true);
        light1.alpha = 0;
        szhi_g.addChild(light1);
        egret.Tween.get(light1,{loop:true}).to({rotation:360},6000);

        let light2 : BaseBitmap = BaseBitmap.create("promotelight");
        light2.anchorOffsetX = light2.width/2;
        light2.anchorOffsetY = light2.height/2;
        light2.setScale(0.73);
        view.setLayoutPosition(LayoutConst.lefttop, light2, szhi_g, [szhi_g.width/2, 70], true);
        light2.alpha = 0;
        szhi_g.addChild(light2);
        egret.Tween.get(light2,{loop:true}).to({rotation:-360},6000);

        let szhibg = BaseBitmap.create('promoteszhibg');
        view.setLayoutPosition(LayoutConst.horizontalCentertop, szhibg, szhi_g, [0,0], true);
        szhi_g.addChild(szhibg);
        szhibg.mask = egret.Rectangle.create().setTo(320,0,0,GameConfig.stageHeigth);

        let promotefnt = BaseBitmap.create('promotefnt');
        view.setLayoutPosition(LayoutConst.horizontalCentertop, promotefnt, szhibg, [0,-20]);
        promotefnt.alpha = 0;
        szhi_g.addChild(promotefnt);

        let nameTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), 24, 0xfedb38);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, nameTxt, szhibg, [0,105]);
        szhi_g.addChild(nameTxt);
        nameTxt.alpha = 0;
        view._nameTxt = nameTxt;

        let descTxt1 = ComponentManager.getTextField('', 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt1.width = 530;
        descTxt1.lineSpacing = 5;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt1, nameTxt, [0,nameTxt.textHeight + 5]);
        szhi_g.addChild(descTxt1);


        let descTxt2 = ComponentManager.getTextField('', 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt2.width = 530;
        descTxt2.lineSpacing = 5;
        szhi_g.addChild(descTxt2);

        let descTxt3 = ComponentManager.getTextField('', 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt3.width = 530;
        descTxt3.lineSpacing = 5;
        szhi_g.addChild(descTxt3);
        
        // let goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'PromoteGoPromote', ()=>{
        //     if(view.canTouch){
        //         ViewController.getInstance().openView(ViewConst.COMMON.PROMOTEVIEW);
        //         view.hide();
        //     }
        // }, view);
        // view.setLayoutPosition(LayoutConst.leftbottom, goBtn, szhibg, [80,55]);
        // goBtn.alpha = 0;
        // szhi_g.addChild(goBtn);

        let lzhiBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, 'PromoteConfirm', ()=>{
            if(view.canTouch){
                ViewController.getInstance().openView(ViewConst.COMMON.PROMOTEVIEW);
                view.hide();
            }
        }, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, lzhiBtn, szhibg, [0,55]);
        lzhiBtn.alpha = 0;
        szhi_g.addChild(lzhiBtn);

        let juanzhou1 = BaseBitmap.create('promotejzhou');
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, juanzhou1, szhi_g, [-17,0]);
        juanzhou1.alpha = 0;
        view.addChild(juanzhou1);

        let juanzhou2 = BaseBitmap.create('promotejzhou');
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, juanzhou2, szhi_g, [17,0]);
        juanzhou2.alpha = 0;
        view.addChild(juanzhou2);

        view._maskBmp.alpha = 0;
        egret.Tween.get(juanzhou1).to({'alpha' : 1}, 500).wait(500).to({x : 0}, 1000).call(()=>{
            juanzhou1.visible = false;
            egret.Tween.removeTweens(juanzhou1);
            view.removeChild(juanzhou1);
            juanzhou1 = null;
        },view);

        egret.Tween.get(juanzhou2).to({'alpha' : 1}, 500).wait(500).to({x : GameConfig.stageWidth - 33}, 1000).call(()=>{
            juanzhou2.visible = false;
            egret.Tween.removeTweens(juanzhou2);
            view.removeChild(juanzhou2);
            juanzhou2 = null;
        },view);
        
        egret.Tween.get(view._maskBmp).to({'alpha' : 1} , 1000).call(()=>{
            //播放卷轴动画
            egret.Tween.get(szhibg.mask,{onChange : ()=>{
                if(szhibg.mask){
                    szhibg.mask.x = (640 - szhibg.mask.width) / 2;
                }
            }, onChangeObj : view}).to({width : 640}, 1000).call(()=>{
                //文字出现
                szhibg.mask = null;
                light1.alpha = light2.alpha = promotefnt.alpha = nameTxt.alpha = 1;
                let position = LanguageManager.getlocal(`promoteType${view.api.getSelfPosition()}`);
                if(PlatformManager.checkIsThSp()){
                    descTxt1.text = LanguageManager.getlocal('PromoteNotice3', [position]);
                    view.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt1, nameTxt, [20,nameTxt.textHeight + 5]);
                    lzhiBtn.alpha = 1;
                    view.canTouch = true;
                }
                else{
                    //打印效果
                    let tempstr1 = LanguageManager.getlocal('PromoteNotice1');
                    let tempstr2 = LanguageManager.getlocal('PromoteNotice2');
                    let totalNum = tempstr1.length + position.length + tempstr2.length;
                    let now = 0;
                    egret.Tween.get(descTxt1,{onChange : ()=>{
                        ++ now;
                        if(now <= tempstr1.length){
                            descTxt1.text = tempstr1.substring(0, now);
                        }
                        else if(now > tempstr1.length && now <= tempstr1.length + position.length){
                            descTxt2.textColor = 0x21eb39;
                            descTxt2.text = position.substring(0, now);
                            if(PlatformManager.checkIsEnSp())
                            {
                                view.setLayoutPosition(LayoutConst.lefttop, descTxt2, descTxt1, [184,29]);
                            }
                            else 
                            {
                                view.setLayoutPosition(LayoutConst.lefttop, descTxt2, descTxt1, [144,29]);
                            }
                       
                        }
                        else if(now > tempstr1.length + position.length && now <= totalNum){
                            descTxt3.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                            descTxt3.text = tempstr2.substring(0, now);
                            view.setLayoutPosition(LayoutConst.lefttop, descTxt3, descTxt2, [descTxt2.textWidth,0]);
                        }
                    }, onChangeObj : view}).to({'alpha' : 1} , totalNum * 15).wait(1000).call(()=>{
                        lzhiBtn.alpha = 1;
                        view.canTouch = true;
                    },view);
                }
            },view);
        });
	}

	protected getResourceList():string[]
	{
		return ["promotefnt","promotejzhou","promoteszhibg","promotelight","emperor_win_light"];
    }
    

    // protected isTouchMaskClose():boolean{
    //     return true;
    // }

    protected getTitleStr(){
        
        return null;
    }

	protected getCloseBtnName():string
	{
		return  null;
    }
    
    public dispose():void{
        super.dispose();
    }
}