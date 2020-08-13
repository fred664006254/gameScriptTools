/**
 * author jiangliuyang
 * date 2018/12/17
 * @class BattleAuto
 * 门客战斗 自动上阵蒙版
 */

class BattleAuto extends BaseDisplayObjectContainer
{
    private _callbackF:Function = null;
	private _obj:any = null;

    public constructor() {
		super();
	}

    public init(type:number,f:Function,o:any):void
	{
        this._obj = o;
        this._callbackF = f;  

        let viewBg = BaseBitmap.create("public_alphabg");
        viewBg.width = GameConfig.stageWidth;
        viewBg.height = GameConfig.stageHeigth;
        viewBg.addTouchTap(this.touchTap,this,null);
        this.addChild(viewBg);

        let posY:number = GameConfig.stageHeigth - 580;
        if (type == 2)
        {
            posY = GameConfig.stageHeigth - 540;
        }
        else if (type == 3)
        {
            posY = GameConfig.stageHeigth - 360;
        }

        let bg:BaseBitmap = BaseBitmap.create("public_lockbg");
        bg.width = 408;
        bg.height = 72;
        bg.setPosition(GameConfig.stageWidth/2-180, posY);
        this.addChild(bg);

        let str1 = LanguageManager.getlocal("autoBattleIng");
        let text1:BaseTextField = ComponentManager.getTextField(str1,28,TextFieldConst.COLOR_QUALITY_YELLOW);
        text1.x = bg.x + bg.width/2 - text1.width/2;
        text1.y = bg.y + bg.height/2 - text1.height;
        this.addChild(text1);

    

        let str2 = LanguageManager.getlocal("autoBattleStop");
        let text2:BaseTextField = ComponentManager.getTextField(str2,24,TextFieldConst.COLOR_LIGHT_YELLOW);
        text2.x = bg.x + bg.width/2 - text2.width/2;
        text2.y = bg.y + bg.height/2;
        this.addChild(text2);


    }

    private touchTap():void
	{
       this._callbackF.apply(this._obj);
    }

    public dispose():void
	{
        this._callbackF = null;
		this._obj = null;

        super.dispose();
    }
}