/*
author : yanyuling
desc : 周年庆特惠转盘活动
*/

class AcOneYearPackBoxPreviewPopupView extends PopupView
{
    
	public constructor() 
	{
		super();
    }
   
	protected initView():void
	{ 
        let bg = BaseBitmap.create("oneyearpack_previewbg");
        bg.x = GameConfig.stageWidth/2 - bg.width/2;
        bg.y = GameConfig.stageHeigth/2 - bg.height/2;
        this.addChild(bg);

        let clostBtn1 = ComponentManager.getButton("btn_closebtn4",null,this.hide,this);
        clostBtn1.x = bg.x + bg.width -clostBtn1.width + 15;
        clostBtn1.y = bg.y + 40;
        this.addChild(clostBtn1);

        let data = this.param.data.data;
        let txt1 = ComponentManager.getTextField(LanguageManager.getlocal("acOneYearPack_boxpreviewtxt1"), 22,TextFieldConst.COLOR_LIGHT_YELLOW);
        txt1.x = bg.x + bg.width/2 - txt1.width/2 ;
        txt1.y =  bg.y + 68 ;
        this.addChild(txt1);

        let txt2 = ComponentManager.getTextField(LanguageManager.getlocal("acOneYearPack_boxpreviewtxt2",[""+data[0]]), 20,TextFieldConst.COLOR_BROWN);
        txt2.x = bg.x + bg.width/2 - txt2.width/2 ;
        txt2.y =  txt1.y  + 40 ;
        this.addChild(txt2);

        let txt3 = ComponentManager.getTextField(LanguageManager.getlocal("acOneYearPack_boxpreviewtxt3",[""+data[1]]), 20,TextFieldConst.COLOR_BROWN);
        txt3.x = bg.x + bg.width/2 - txt3.width/2 ;
        txt3.y =  txt2.y + 30 ;
        this.addChild(txt3);

        let txt4 = ComponentManager.getTextField(LanguageManager.getlocal("acOneYearPack_boxpreviewtxt4"), 20,TextFieldConst.COLOR_BROWN);
        txt4.x = bg.x + bg.width/2 - txt4.width/2 ;
        txt4.y =  txt3.y + 35 ;
        this.addChild(txt4);

        let boxImg = BaseBitmap.create("oneyearpack_box");
        boxImg.x = bg.x + bg.width/2 - boxImg.width/2 ;
        boxImg.y = txt4.y + 20;
        this.addChild(boxImg);
        let restr = "6_"+ data[2] + "_1";
        let tmpItemvo = GameData.formatRewardItem(restr)[0];
        boxImg.addTouchTap((event:egret.TouchEvent,item:string|number|RewardItemVo)=>{
				ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,item);
			},this,[ tmpItemvo ]);

        let txt5 = ComponentManager.getTextField("", 16,TextFieldConst.COLOR_BROWN);
        txt5.width = bg.width - 90;
        txt5.multiline = true;
        txt5.lineSpacing = 3;
        txt5.text = LanguageManager.getlocal("acOneYearPack_boxtxt");// tmpItemvo.desc;
        // LanguageManager.getlocal("acOneYearPack_boxpreviewtxt4")
        txt5.x = bg.x + bg.width/2 - txt5.width/2 ;
        txt5.y =  boxImg.y + boxImg.height + 35 ;
        this.addChild(txt5);

    }
    protected getCloseBtnName():string
	{
		return null;
	}
   	protected getBgName():string
	{
		return null;
	}
    protected getTitleStr(): string {
        return null;
    }
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "oneyearpack_previewbg",
         ]);
	} 

	public dispose():void
	{	 
        let view = this;
        
        super.dispose();
	}
}