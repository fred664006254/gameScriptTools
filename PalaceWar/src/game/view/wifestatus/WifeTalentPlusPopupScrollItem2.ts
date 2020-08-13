/**
 * 文思泉涌Item
 * author qianjun
 */
class WifeTalentPlusPopupScrollItem2 extends ScrollListItem
{

	private _data:any;
    private _caiyiTF:BaseTextField = null;
    private _caiqingTF:BaseTextField = null;
	private _param:any;
	public constructor() 
	{
		super();
	}

	public initItem(index: number, data: any, param:any):void
	{
		this._param = param;
		this.width = 600;
        this.height = 156;
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 600;
        bg.height = 151;
		bg.x = 0;
        this.addChild(bg);

        this._data = data;
        let icon = this.getWifestatusIcon(this._data.wid);
        icon.x = 10;
        icon.y = (bg.height - icon.height) / 2;
        this.addChild(icon);

		
		let statusLv = Api.wifestatusVoApi.getWifestatusLevelById(this._data.wid);
        let statusTF = ComponentManager.getTextField(LanguageManager.getlocal("wifestatusTitle"+statusLv),18,TextFieldConst.COLOR_BROWN);
		if(statusLv == `1`){
			statusTF.textColor = TextFieldConst.COLOR_WARN_RED2;
		}
		statusTF.width = 80;
        statusTF.x = 175 - statusTF.width/2;
        statusTF.y = bg.y + bg.height/2 - statusTF.height/2;
		statusTF.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(statusTF);
		// let wifeVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById();
		let caiyi:number = data.artadd?data.artadd:0;//Api.wifeVoApi.getWifeInfoVoById(this._data.wid).artistry;
        let caiyiTF = ComponentManager.getTextField(String(caiyi),18,TextFieldConst.COLOR_BROWN);
        caiyiTF.x = 275 - caiyiTF.width/2;
        caiyiTF.y = bg.y + bg.height/2 - caiyiTF.height/2;
        this._caiyiTF = caiyiTF;
        this.addChild(caiyiTF);

        let caiqing:number = this._data.talentadd;

        let caiqingp:number = this._data.taddnum?this._data.taddnum:0;

		
		let cqStr = this.checkHaveBuff()?App.StringUtil.changeIntToText(caiqing)+"\n<font color=0x3e9b00>(+"+caiqingp+")</font>":App.StringUtil.changeIntToText(caiqing);
        let caiqingTF = ComponentManager.getTextField(cqStr,18,TextFieldConst.COLOR_BROWN);
        caiqingTF.x = 395 - caiqingTF.width/2;
		caiqingTF.y = bg.y + bg.height/2 - caiqingTF.height/2;
		caiqingTF.textAlign = egret.HorizontalAlign.CENTER;
        this._caiqingTF = caiqingTF;
        this.addChild(caiqingTF);

		let upBtn = ComponentManager.getButton(statusLv == `1` ? ButtonConst.BTN_SMALL_RED : ButtonConst.BTN_SMALL_YELLOW,statusLv == `1` ? "wifestatusViewTitle" : "wifeTalentUpBtn",this.upBtnClick,this);

        upBtn.x = bg.x + bg.width - 20- upBtn.width;
        upBtn.y = bg.y + bg.height/2 - upBtn.height/2;
		this.addChild(upBtn);
	}

	private checkHaveBuff():boolean
	{
		if(this._param){
			return true;
		}
		let modelList:AcBaseVo[] = Api.acVoApi.getRanActives();
		for(let i in modelList){
			let unit = modelList[i];
			if(unit.atype == `22`){
				let t = unit.et - GameData.serverTime - 86400 * 1;
				if(t>0){
					return true;
				}
			}
		}
		return false;
	}

    private refreshUI(){
        let wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._data.wid);
        let caiyi:number = this._data.artadd?this._data.artadd:0;
        this._caiyiTF.text = String(caiyi);

        let caiqing:number = this._data.talentadd;
        let caiqingp:number = this._data.taddnum;
        let cqStr = caiqing+"\n<font color=0x3e9b00>(+"+caiqingp+")</font>";
        this._caiqingTF.text = cqStr;
        this._caiqingTF.x = 360 - this._caiqingTF.width/2;
    }
    
    private upBtnClick(){
		let statusLv = Api.wifestatusVoApi.getWifestatusLevelById(this._data.wid);
		if(statusLv == `1`){
			let viewList : any = ViewController.getInstance().getView(ViewConst.COMMON.WIFESTATUSVIEW);
			if(this._param){
				if(viewList && viewList._isShow){
					// let WifeTalentView = ViewController.getInstance().getView(ViewConst.COMMON.ACCROSSSERVERWIFEALLTALENTVIEW);
					// if(WifeTalentView){
					// 	WifeTalentView.hide();
					// }
				}
				else{
					ViewController.getInstance().openView(ViewConst.COMMON.WIFESTATUSVIEW);
	
					let WifeTalentView = ViewController.getInstance().getView(ViewConst.COMMON.ACCROSSSERVERWIFEALLTALENTVIEW);
					if(WifeTalentView){
						WifeTalentView.hide();
					}
	
					let wifebattle = ViewController.getInstance().getView(ViewConst.COMMON.ACCROSSSERVERWIFEBATTLEVIEW);
					if(wifebattle){
						wifebattle.hide();
					}
				}
			}
			else{
				if(viewList && viewList._isShow){
					let WifeTalentView = ViewController.getInstance().getView(`WifeTalentView`);
					if(WifeTalentView){
						WifeTalentView.hide();
					}
				}
				else{
					ViewController.getInstance().openView(ViewConst.COMMON.WIFESTATUSVIEW);

					let WifeTalentView = ViewController.getInstance().getView(`WifeTalentView`);
					if(WifeTalentView){
						WifeTalentView.hide();
					}

					let wifebattle = ViewController.getInstance().getView(ViewConst.COMMON.WIFEBATTLEVIEW);
					if(wifebattle){
						wifebattle.hide();
					}
				}
			}
		}
		else{
			if(this._param){
				ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIFETALENTUPPOPUPVIEW,{
					d:this._data,
					aid:this._param.aid,
					code:this._param.code
				});
			}
			else{
				ViewController.getInstance().openView(ViewConst.POPUP.WIFETALENTUPPOPUPVIEW,this._data);
			}
		}
    }
	private getWifestatusIcon(wifeId:string):BaseDisplayObjectContainer
	{
		let iconContainer = new BaseDisplayObjectContainer();
		let iconBg:BaseBitmap = BaseBitmap.create("wifestatus_headbg");

		iconBg.name = "bg2";
		iconContainer.addChild(iconBg);

			
        let iconStr = Api.wifeVoApi.getWifeIcon(wifeId);

		let icon = BaseLoadBitmap.create(iconStr);

		icon.setPosition(10,8)

			
        icon.setScale(0.52);

		
		iconContainer.cacheAsBitmap = true;
		
		iconContainer.addChild(icon);

		// iconContainer.addTouchTap(this.clickItemHandler,this,[wifeId]);

		let nameBg = BaseBitmap.create("wifestatus_namebg");
		nameBg.setPosition(iconContainer.width/2 - nameBg.width/2,105)
		iconContainer.addChild(nameBg);
		// nameBg.visible = false;

		let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
		let nameTF = ComponentManager.getTextField(wifeCfg.name,18);
		nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2 ;
		nameTF.y = nameBg.y + nameBg.height/2 - nameTF.height/2;
		iconContainer.addChild(nameTF); 


		// if(Api.wifestatusVoApi.getIsConferById(wifeId))
		// {
		// 	let redDotSp = BaseBitmap.create("public_dot2");
		// 	redDotSp.x = 100;
		// 	redDotSp.y = 10;
		// 	iconContainer.addChild(redDotSp); 
		// }


		return iconContainer;
	}

	private clickItemHandler(event: egret.TouchEvent,wifeId:string): void {

		ViewController.getInstance().openView(ViewConst.POPUP.WIFESTATUSWIFEPOPUPVIEW,{wifeId:wifeId,level:this._data.id});

	}

	public refreshData(index:number)
	{	


	}


	public getSpaceY():number
	{
		return 0;
	}

	public dispose():void
	{
		this._param = null;
		this._data = null;
    	this._caiyiTF = null;
    	this._caiqingTF = null;
		super.dispose();
	}
}