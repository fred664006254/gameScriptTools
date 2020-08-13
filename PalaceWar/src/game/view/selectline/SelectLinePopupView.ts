class SelectLinePopupView extends PopupView
{
    private _checkBoxList:CheckBox[]=[];
    public constructor()
    {
        super();
    }

    protected initView():void
    {
        let lineArr:string[]=window["gameLineArr"]||[];
        let l=lineArr.length;
        for (let i = 0; i < l; i++) 
        {
            let checkBox:CheckBox=ComponentManager.getCheckBox(LanguageManager.getlocal("selectLine"+i+"Desc"),null,NaN,TextFieldConst.COLOR_BROWN);
            this.addChildToContainer(checkBox);
            checkBox.addTouchTap(this.selectLineHandler,this,[i]);
            checkBox.setPosition(150,50+(checkBox.height+20)*i);
            this._checkBoxList.push(checkBox);
            if(window["gameproxyline"]==lineArr[i])
            {
                checkBox.setSelected(true);
            }
            else if(!window["gameproxyline"]&&(lineArr[i].indexOf("web01")>-1 || lineArr[i].indexOf("game01")>-1))
            {
                checkBox.setSelected(true);
            }
        }
    }

    private selectLineHandler(e:egret.TouchEvent,line:number):void
    {
        let checkBox=<CheckBox>e.currentTarget;
        if(!checkBox.checkSelected())
        {
            checkBox.setSelected(true);
        }
        let lineArr:string[]=window["gameLineArr"]||[];
        let linehost=window["gameproxyline"];
        if(lineArr[line]&&lineArr[line]!=linehost)
        {
            window["selectGameLine"](lineArr[line]);
            let newLineHost=window["gameproxyline"];
            if(linehost!=newLineHost)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinchangebgsuc"));
            }
            // NetManager.socket.closeAndReconnect();
            // NetManager.chat.closeAndReconnect();
        }
        let l=this._checkBoxList.length;
        for (let i = 0; i < l; i++) {
            const tcheckBox = <CheckBox>this._checkBoxList[i];
            if(tcheckBox.hashCode!=checkBox.hashCode)
            {
                tcheckBox.setSelected(false);
            }
            
        }
    }
    public dispose():void
    {
        this._checkBoxList.length=0;
        super.dispose();
    }
}