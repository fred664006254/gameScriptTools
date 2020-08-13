/**
 * 选择语言列表
 * author 陈可
 * date 2019/08/15
 * @class SettingPopopView
 */
class SettingLangPopupView extends PopupView
{
    private _checkBoxList:CheckBox[]=[];
    constructor()
    {
        super();
    }
    protected initView():void
    {
		let bg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = 520;
		bg.height = 300;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 25;
		this.addChildToContainer(bg);
        let arr=GameConfig.langList;
		let i=0;
		let bgMaxH=0;
		let curKey=PlatformManager.getSpidKey();
		if(arr.indexOf(curKey)<0)
		{
			curKey="en";
		}
        for (const key in arr) 
        {
            if (arr.hasOwnProperty(key)) 
            {
                const langItem = arr[key];
                let checkBox=ComponentManager.getCheckBox(GameConfig.localLangCfg[langItem]);
                checkBox.setPosition(100,(checkBox.height+10)*i+bg.y+20);
                this.addChildToContainer(checkBox);
				checkBox.addChangeStatusHanlder(this.changeLangHandler,this,[langItem]);
				this._checkBoxList.push(checkBox);
				i++;
				bgMaxH=checkBox.y+checkBox.height-bg.y;
				if(curKey==langItem)
				{
					checkBox.setSelected(true);
					checkBox.touchChildren=false;
				}
            }
		}
		bg.height=bgMaxH+20;
    }
    private changeLangHandler(target:CheckBox,params:any[]):void
    {
        let list =this._checkBoxList
        if(target.checkSelected())
        {
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
				msg: LanguageManager.getlocal("switchAreaLangTip"), title: "itemUseConstPopupViewTitle", needCancel: true, handler: this, callback: () => {
					for (const key in list) {
						if (list.hasOwnProperty(key)) {
							const checkBox = list[key];
							if(checkBox.hashCode==target.hashCode)
							{
								checkBox.touchChildren=false;
								
							}
							else
							{
								if(checkBox.checkSelected())
								{
									checkBox.setSelected(false);
								}
								if(checkBox.touchChildren==false)
								{
									checkBox.touchChildren=true;
								}
							}
						}
					}
					PlatformManager.switchAreaOrLanguage(PlatformManager.getGameArea(),params[0]);
				}, cancelcallback: () => {
					if(target)
					{
						target.setSelected(false);
					}
				}
			});

            
		}
    }
    public dispose():void
    {
        this._checkBoxList.length=0;
        super.dispose();
    }
}