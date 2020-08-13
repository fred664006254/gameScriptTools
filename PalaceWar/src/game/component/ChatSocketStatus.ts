class ChatSocketStatus extends BaseDisplayObjectContainer
{
    private _txt:BaseTextField=null;
    private _bg:BaseShape=null;
    private _bgSize:{w:number,h:number}=null;
	public constructor(bgSize?:{w:number,h:number})
	{
        super();
        this._bgSize=bgSize;
        this.init();
    }

    private init():void
    {
        let bigBg:BaseBitmap=null;
        if(this._bgSize)
        {
            bigBg=BaseBitmap.create("public_9_viewmask");
            bigBg.width=this._bgSize.w;
            bigBg.height=this._bgSize.h;
            this.addChild(bigBg);
        }
        let bg:BaseShape=new BaseShape();
        bg.graphics.beginFill(0,0.8);
        bg.graphics.drawRoundRect(0,0,GameConfig.stageWidth-50,35,5,5);
        bg.graphics.endFill();
        this.addChild(bg);
        this._bg=bg;
        if(bigBg)
        {
            bg.setPosition(bigBg.x+(bigBg.width-bg.width)/2,bigBg.y+(bigBg.height-bg.height)/2);
        }

        this._txt=ComponentManager.getTextField("1",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._txt.textAlign=egret.HorizontalAlign.CENTER;
        this._txt.width=bg.width;
        this.setText("1");
        this.addChild(this._txt);
        this.checkShowReConnectStatus(NetManager.chat.getSocketStatus());
        NetManager.chat.addStatusCallback(this.checkShowReConnectStatus,this);
        this.addTouchTap(()=>{
            NetManager.chat.checkAndReConnect();
        },this);
    }

    private checkShowReConnectStatus(status:SocketStateEnum.STATE_RECONNECTING|SocketStateEnum.STATE_RECONNECTED|SocketStateEnum.STATE_NOCONNECT):void
    {
        switch(status)
			{
				case SocketStateEnum.STATE_RECONNECTING:
                    this.setText(LanguageManager.getlocal("chatWsReconnecting"));
                    this.visible=true;
                    break;
				case SocketStateEnum.STATE_RECONNECTED:
                    // App.CommonUtil.showTip(LanguageManager.getlocal("chatWsReconnectSuccess"));
                    this.visible=false;
                    break;
				case SocketStateEnum.STATE_NOCONNECT:
                    let textFlow = new Array<egret.ITextElement>(
                        { text: LanguageManager.getlocal("chatWsReconnecFail"), style: { "underline": true,"textColor":TextFieldConst.COLOR_WARN_YELLOW} }
                        );
                    this.setText(textFlow);
                    this.visible=true;
					break;
				default:
                    this.visible=false;
					break;
			}
    }

    private setText(text:string|Array<egret.ITextElement>):void
    {
        if(this._txt)
        {
            if(typeof(text)=="string")
            {
                this._txt.text=text;
            }
            else
            {
                this._txt.textFlow=text;
            }
            this._txt.setPosition(this._bg.x+(this._bg.width-this._txt.width)/2,this._bg.y+(this._bg.height-this._txt.height)/2);
        }
    }

    public dispose():void
    {
        NetManager.chat.removeStatusCallback(this.checkShowReConnectStatus,this);
        this._txt=null;
        this._bg=null;
        this._bgSize=null;
        super.dispose();
    }
}