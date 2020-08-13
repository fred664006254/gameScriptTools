/**
 * 册封Item
 * author dky
 * date 2018/4/24
 * @class WifestatusScrollItem
 */
class AcCrossServerWifeAllTalentScrollItem extends ScrollListItem
{

	private _data:any;
    private _caiyiTF:BaseTextField = null;
    private _caiqingTF:BaseTextField = null;
	private aid:string = null;
	private code:string = null;
	public constructor() 
	{
		super();
	}

	public initItem(index: number, data: any,itemParam:any):void
	{
		this.aid = itemParam.aid;
		this.code = itemParam.code;
		this.width = 640;
        this.height = 151;
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 590;
        bg.height = 141;
		bg.x = this.width/2 - bg.width/2;
        this.addChild(bg);

        this._data = data;
        let icon = this.getWifestatusIcon(this._data.wid);
        icon.x = 25;
        icon.y = 0;
        this.addChild(icon);

		
		let statusLv = Api.wifestatusVoApi.getWifestatusLevelById(this._data.wid);
        let statusTF = ComponentManager.getTextField(LanguageManager.getlocal("wifestatusTitle"+statusLv),18,TextFieldConst.COLOR_BROWN);
		statusTF.width = 80;
        statusTF.x = 188 - statusTF.width/2;
        statusTF.y = bg.y + bg.height/2 - statusTF.height/2;
		statusTF.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(statusTF);
		// let wifeVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById();
		let caiyi:number = Api.wifeVoApi.getWifeInfoVoById(this._data.wid).artistry;
        let caiyiTF = ComponentManager.getTextField(String(caiyi),18,TextFieldConst.COLOR_BROWN);
        caiyiTF.x = 275 - caiyiTF.width/2;
        caiyiTF.y = bg.y + bg.height/2 - caiyiTF.height/2;
        this._caiyiTF = caiyiTF;
        this.addChild(caiyiTF);

        let caiqing:number = this._data.talentadd;

        let caiqingp:number = this._data.taddnum?this._data.taddnum:0;

		
		let cqStr = caiqingp > 0?App.StringUtil.changeIntToText(caiqing)+"<font color=0x2b8729>(+"+caiqingp+")</font>":App.StringUtil.changeIntToText(caiqing);
        let caiqingTF = ComponentManager.getTextField(cqStr,18,TextFieldConst.COLOR_BROWN);
        caiqingTF.x = 381 - caiqingTF.width/2;
        caiqingTF.y = bg.y + bg.height/2 - caiqingTF.height/2;
        this._caiqingTF = caiqingTF;
        this.addChild(caiqingTF);

        let upBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"wifeTalentUpBtn",this.upBtnClick,this);

        upBtn.x = bg.x + bg.width - 10- upBtn.width;
        upBtn.y = bg.y + bg.height/2 - upBtn.height/2;
        this.addChild(upBtn);

	}
    private refreshUI(){
        let wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._data.wid);
        let caiyi:number = wifeVo.artistry;
        this._caiyiTF.text = String(caiyi);

        let caiqing:number = this._data.talentadd;
        let caiqingp:number = this._data.taddnum;
        let cqStr = caiqing+"<font color=0x2b8729>(+"+caiqingp+")</font>";
        this._caiqingTF.text = cqStr;
        this._caiqingTF.x = 360 - this._caiqingTF.width/2;
    }
    
    private upBtnClick(){
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIFETALENTUPPOPUPVIEW,{d:this._data,aid:this.aid,code:this.code});
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
		nameBg.visible = false;

		let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
		let nameTF = ComponentManager.getTextField(wifeCfg.name,18);
		nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2 ;
		nameTF.y = nameBg.y + nameBg.height/2 - nameTF.height/2 + 3;
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

		// ViewController.getInstance().openView(ViewConst.POPUP.WIFESTATUSWIFEPOPUPVIEW,{wifeId:wifeId,level:this._data.id});

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

		this._data = null;
    	this._caiyiTF = null;
    	this._caiqingTF = null;
		this.aid = null;
		this.code = null;
		super.dispose();
	}
}