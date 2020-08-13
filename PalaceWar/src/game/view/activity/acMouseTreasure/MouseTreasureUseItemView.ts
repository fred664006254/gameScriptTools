/**
 * 购买体力
 * author shaoliang
 * @class MouseTreasureUseItemView
 */
class MouseTreasureUseItemView  extends PopupView
{   
    protected _desc:BaseTextField = null;
    protected _effect:BaseTextField = null;
    protected _numBg:BaseBitmap = null;
    protected _selectedNumTF:BaseTextField;
    protected _useNum:number = 1;
    protected _maxNum:number = 0;
    protected _maxNumTF:BaseTextField;

    public constructor() 
	{
		super();
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"progress20_bg","progress2","popupview_itemsbg"
		]);
	}

    protected getBgExtraHeight():number
	{
		return 25;
	}

    protected get uiType():string
	{
		return "2";
	}

	protected getFrameName():string
	{
		return "popup_frame1";
	}

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get vo():AcMouseTreasureVo{
        return <AcMouseTreasureVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.MouseTreasureCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    protected getTitleStr():string{
        return "itemUsePopupViewTitle";
    }

    protected initView():void
    {
        let code = this.param.data.uicode;
        let bg:BaseBitmap = BaseBitmap.create("popupview_itemsbg");
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 0;
		this.addChildToContainer(bg);

        

        let itemVo = this.cfg.getAddItemVo();
        let itemCfg : any  = Config.ItemCfg.getItemCfgById(Number(itemVo.id));
		let itemnum = Api.itemVoApi.getItemNumInfoVoById(itemVo.id);
        //let itemInfoVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(itemVo.id);
		if(!itemCfg){
			itemCfg = GameData.getRewardItemVoByIdAndType(itemVo.id);
		}
		let iconItem = GameData.getItemIcon(itemCfg,true,null,null,itemnum);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconItem, bg);
		this.addChildToContainer(iconItem);

        this._maxNum = itemnum;
		if(this._maxNum >100)
		{
			this._maxNum = 100;
		}

        let nameTF:BaseTextField = ComponentManager.getTextField(itemVo.name,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		let namebg = BaseBitmap.create(`public_9_bg95`);
		namebg.width = nameTF.width+80;
		namebg.x = this.viewBg.x + this.viewBg.width/2 - namebg.width/2;
		namebg.y = bg.y+bg.height+ 10;
		this.addChildToContainer(namebg);

		
		nameTF.setColor(TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF, namebg);
		this.addChildToContainer(nameTF);

		let effect = ComponentManager.getTextField(LanguageManager.getlocal("effectTitle"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_BLACK);
		effect.setPosition(64,namebg.y + namebg.height + 10);
		this.addChildToContainer(effect);
		this._effect = effect;

        let effectDescStr = itemCfg.desc;
		let effectDescTF:BaseTextField=ComponentManager.getTextField(effectDescStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
		effectDescTF.lineSpacing=4;
		effectDescTF.x = effect.x+effect.width;
		effectDescTF.y = effect.y;
		effectDescTF.width = this.viewBg.width-effect.x-effect.width-60;
		this.addChildToContainer(effectDescTF);
		this._desc = effectDescTF;

		let descH = effectDescTF.y + effectDescTF.height;
		if (descH<80)
		{
			descH = 80;
		}
		let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("progress2","progress20_bg",this._maxNum,this.dragCallback,this);
		dragProgressBar.x = 115;
		dragProgressBar.y = descH + 30;
		this.addChildToContainer(dragProgressBar);

		this._numBg = BaseBitmap.create("public_9_bg5");
		this._numBg.width = 90;
		this._numBg.x = bg.x + bg.width - 20 - this._numBg.width;
		this._numBg.y = effectDescTF.y + effectDescTF.height + 20;
		this.addChildToContainer(this._numBg);

		this._selectedNumTF = ComponentManager.getTextField(this._useNum + "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
		this._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
		
		this._selectedNumTF.y = this._numBg.y + this._numBg.height/2 - this._selectedNumTF.height/2;
		this.addChildToContainer(this._selectedNumTF);

		this._maxNumTF = ComponentManager.getTextField("/" + this._maxNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
		this._maxNumTF.y = this._numBg.y + this._numBg.height/2 - this._maxNumTF.height/2;
		this.addChildToContainer(this._maxNumTF);
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;

		let line = BaseBitmap.create("public_cut_line");
		line.x = bg.x + bg.width/2 - line.width/2;
		line.y = dragProgressBar.y + 40;
		this.addChildToContainer(line);

		let useBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW,"useBtn",this.useHandler,this);
		useBtn.x = bg.x + bg.width/2 - useBtn.width/2;
		useBtn.y = dragProgressBar.y + 58;
		useBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(useBtn);
    }

    protected dragCallback(curNum:number):void
	{
		this._useNum = curNum;
		this._selectedNumTF.text = this._useNum + "";
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
	}

	protected useHandler(param:any):void
	{
		  if (this.vo.getAddItemNum() <=0)
            {
                 let message: string = LanguageManager.getlocal("mouseTreasure_useItemTip");
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                        msg : message,
                        title : "itemUseConstPopupViewTitle",
                        touchMaskClose : true,
                        callback : ()=>
                        {
                            if (!this.vo.isInActivity()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                                return;
                            }
                            ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSETREASUREREWARDPOPVIEW,{
                                aid:this.vo.aid, 
                                code:this.vo.code,
                                uicode:this.param.data.uicode,
                            });
							this.hide();
                        },            
                        handler : this,
                        needClose : 1,
                        needCancel : true,
						cancelcallback:()=>{
							this.hide();
						},
                    });  
				
				return;
            }

		NetManager.request(NetRequestConst.REQUEST_MOUSETREASURE_USEITEM, 
        {
            activeId: this.param.data.aid + "-" + this.param.data.code,
            num: this._useNum
        });
		this.hide();
	}


    public dispose():void
	{
		this._effect = null;
        this._desc = null;
        this._numBg = null;
        this._selectedNumTF = null;
        this._maxNumTF = null;
		this._useNum = 1;

		super.dispose();
	}
}