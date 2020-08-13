/**
 * 防沉迷
 * author zsl
 * date 2018/07/30
 * @class AntiaddictionPopupView
 */

class AntiaddictionPopupView  extends PopupView
{   
    private _type:number = 0;  // 1 : 1~3小时   2:3～5小时

    public constructor() {
		super();
	}

	public initView():void
	{	
        let rankBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		rankBg.width = 520;
		rankBg.height = 318;
		rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, 30);
		this.addChildToContainer(rankBg);

        let titleText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dearUser"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		titleText.setPosition(rankBg.x+25 , rankBg.y+25);
		this.addChildToContainer(titleText);


        let timeStr:string = "";
        if (this.param.data.level)
        {
            if (this.param.data.level >= 7) 
            {
                this._type = 3;
            }
            else  if (this.param.data.level >= 3) 
            {
                this._type = 2;
            }
            else 
            {
                 this._type = 1;
            }
            timeStr = App.DateUtil.getFormatBySecond(Api.playerVoApi.adictionTab[this.param.data.level-1],8);
        }
        if (this.param.data.type)
        {
            this._type = this.param.data.type;
        }
        
        let desc:string = LanguageManager.getlocal("antiaddictionTip"+this._type,[timeStr]);
        let descText:BaseTextField = ComponentManager.getTextField(desc,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		descText.width = rankBg.width - 50;
		descText.lineSpacing = 6;
		descText.setPosition(titleText.x , titleText.y+titleText.height + 30);
		this.addChildToContainer(descText);

        let confirmButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"sysConfirm",this.hide,this);
       	confirmButton.setPosition(this.viewBg.width/2-confirmButton.width/2, rankBg.y+rankBg.height+20);
		this.addChildToContainer(confirmButton);

        if ( this._type == 3)
        {
             this.closeBtn.visible = false;
        }   
       
    }

    public hide():void
    {   
        let t:number = this._type;
        super.hide();
        if (t == 3)
        {
            PlatformManager.logout();
        }
    }

    protected getParent():egret.DisplayObjectContainer
	{
		return LayerManager.msgLayer;
	}

    public dispose()
    {
        this._type = 0;

        super.dispose()
    }
}