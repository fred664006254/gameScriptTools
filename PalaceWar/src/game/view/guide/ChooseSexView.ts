/**
 * 选择青梅竹马
 * author qianjun
 */

class ChooseSexView extends BaseView
{
    private _sexType = 0;//0女 1男
    private _femalebtn : BaseButton = null;
    private _malebtn : BaseButton = null;

    public constructor() {
		super();
	}

    protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
    }
    
    // 初始化背景
	protected initBg():void
	{
		let bgName:string=this.getBgName();
        this.viewBg = BaseLoadBitmap.create(bgName);
        this.addChild(this.viewBg);
        this.viewBg.width = GameConfig.stageWidth;
        this.viewBg.height = GameConfig.stageHeigth;
	}

	protected getBgName():string{
		return "story_bg1";
	}

    protected getResourceList():string[]{
        let guidePic:string[] = [];

        return guidePic.concat([
            `guidechoosesex`
        ]);	
    }

    protected initView():void{   
        let view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USER_REVERSIONSETTING,this.setCallBack,this);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;

        let wordbg = BaseBitmap.create(`guidechoosesexwordbg`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, wordbg, view);
        view.addChild(wordbg);

        let wordTxt = ComponentManager.getTextField(LanguageManager.getlocal(`chooseSexTipTxt`), 20, TextFieldConst.COLOR_BLACK);
        wordTxt.width = 585;
        wordTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wordTxt, wordbg, [0,30]);
        view.addChild(wordTxt);

        let warnTxt = ComponentManager.getTextField(LanguageManager.getlocal(`chooseSexTipTxt2`), 20, TextFieldConst.COLOR_WARN_RED2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, warnTxt, wordbg, [0,35]);
        view.addChild(warnTxt);

        let npc1 = BaseLoadBitmap.create(`wife_full_101_male`);
        let npc2 = BaseLoadBitmap.create(`wife_full_101`);
        npc1.width = npc2.width = 640;
        npc1.height = npc2.height = 840;
        view.addChild(npc1);
        view.addChild(npc2);
        npc1.setScale(0.7);
        npc2.setScale(0.7);

        view._sexType = 1;
        let malebtn = ComponentManager.getButton(`guidechoosesexbtn1`, `chooseSexTxt1`, ()=>{
                view._sexType = 1;
                view.freshView();
        }, view, null, 3);
        malebtn.setTextSize(28);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, malebtn, wordbg, [50,-malebtn.height-15]);
        view.addChild(malebtn);
        view._malebtn = malebtn;

        let femalebtn = ComponentManager.getButton(`guidechoosesexbtn2_down`, `chooseSexTxt2`, ()=>{
                view._sexType = 0;
                view.freshView();
        }, view, null, 3);
        femalebtn.setTextSize(28);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, femalebtn, wordbg, [50,-femalebtn.height-15]);
        view.addChild(femalebtn);
        view._femalebtn = femalebtn;

        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, npc1, wordbg, [0,wordbg.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, npc2, wordbg, [0,wordbg.height]);
        npc1.x = -50;
        npc2.x = 240;

        let name1 = BaseBitmap.create(`guidechoosesexname1`);
        let txt1 = ComponentManager.getTextField(LanguageManager.getlocal(`chooseSexDescTxt1`), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, name1, npc1, [0,-name1.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt1, name1, [0,-txt1.height]);
        view.addChild(name1);
        view.addChild(txt1);

        let name2 = BaseBitmap.create(`guidechoosesexname2`);
        let txt2 = ComponentManager.getTextField(LanguageManager.getlocal(`chooseSexDescTxt2`), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, name2, npc2, [0,-name2.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt2, name2, [0,-txt2.height]);
        view.addChild(name2);
        view.addChild(txt2);
    }
    
    private freshView():void{
        let view = this;
        view._malebtn.setBtnBitMap(view._sexType == 1 ? `guidechoosesexbtn1` : `guidechoosesexbtn1_down`);
        view._femalebtn.setBtnBitMap(view._sexType == 0 ? `guidechoosesexbtn2` : `guidechoosesexbtn2_down`);
        NetManager.request(NetRequestConst.REQUEST_USER_REVERSIONSETTING,{stype:2,sflag:view._sexType});
    }
    
    private showOldGuide():void{
        
        Api.rookieVoApi.isInGuiding = true;
        ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW,{idx:"1",f:this.param.data.f,o:this.param.data.o});
        this.hide();
    }

    private setCallBack(evt : egret.Event):void{
        if(evt.data.data.data){
            this.showOldGuide();
        }
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USER_REVERSIONSETTING,this.setCallBack,this);
        this._femalebtn = null;
        this._malebtn = null;
        this._sexType = 1;
        super.dispose();
    }
}